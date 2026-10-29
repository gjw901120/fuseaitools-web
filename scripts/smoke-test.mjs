/**
 * 部署前冒烟测试（prebuild 闸门）
 * 用法：node scripts/smoke-test.mjs
 *
 * 覆盖六类「上线即坏」的常见问题：
 *   1. 路由登记不全：新增工具页没同步 sitemap / prerender / 面包屑，或首页画廊漏加入口卡片
 *   2. API 白名单漏登记：前端调用了未放行的后端路径 → 线上 404
 *   3. 白名单格式错误：METHOD /path 写错导致永远匹配不上
 *   4. SEO 数据化完整性：数据文件缺字段、薄壳组件找不到数据源
 *   5. SEO 文案一致性：数据化迁移过程中丢字
 *   6. 前后端契约：白名单路由、请求体字段、枚举传值与隔壁 Java 服务源码对齐（后端不存在时跳过）
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { API_PROXY_ROUTES } from '../server/utils/apiProxyRoutes.js'

const ROOT = process.cwd()
const SRC_DIRS = ['components', 'pages', 'composables', 'layouts', 'middleware', 'plugins']
// 走独立代理文件、不在白名单体系内的路径（已去掉 /api 前缀，与白名单同形）
const INDEPENDENT_PROXY = new Set(['/user/send-email-code', '/user/login-by-email'])

let failures = 0
const fail = (msg) => { console.error(`  ✗ ${msg}`); failures += 1 }
const ok = (msg) => console.log(`  ✓ ${msg}`)

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, out)
    else if (/\.(vue|js|ts)$/.test(entry.name)) out.push(full)
  }
  return out
}

/** server/api 下的 Nitro 文件路由（带特殊逻辑的独立代理），路径由文件名决定 */
function collectNitroApiRoutes() {
  const base = path.join(ROOT, 'server', 'api')
  const out = new Set()
  for (const file of walk(base)) {
    const rel = path.relative(base, file).split(path.sep).join('/')
    if (rel.startsWith('[...')) continue // catch-all 兑底不算具体路由
    const route = '/' + rel.replace(/\.(get|post|put|delete|patch)?\.?js$/, '')
    if (route !== '/') out.add(route)
  }
  return out
}

// —— 1. 路由登记表（sitemap / prerender / 面包屑）+ 首页画廊入口 ——
console.log('\n[1/6] 路由登记表与首页入口')
try {
  execFileSync(process.execPath, ['scripts/check-route-registry.mjs'], { stdio: 'pipe' })
  ok('sitemap / prerender / 面包屑 三张登记表完整，首页画廊入口无缺失/悬空')
} catch (e) {
  const detail = (e.stdout?.toString() || '') + (e.stderr?.toString() || '')
  fail('路由登记表不完整')
  console.error(detail.trim().split('\n').map((l) => `    ${l}`).join('\n'))
}

// —— 2. 白名单格式 ——
console.log('\n[2/6] API 白名单格式')
const routes = [...API_PROXY_ROUTES]
const badFormat = routes.filter((r) => !/^(GET|POST|PUT|DELETE|PATCH) \/\S*[^/\s]$/.test(r))
if (badFormat.length) badFormat.forEach((r) => fail(`格式异常（应为 "POST /path"）: ${r}`))
else ok(`${routes.length} 条白名单格式正确`)

// —— 3. 前端调用路径是否都在白名单内 ——
console.log('\n[3/6] 前端调用 vs 白名单')
const allowed = new Set([
  ...routes.map((r) => r.split(' ')[1]),
  ...collectNitroApiRoutes() // 独立代理文件（records/chat/news/refund/stripe...）
])
const files = SRC_DIRS.flatMap((d) => walk(path.join(ROOT, d)))
const API_LITERAL = /['"`](\/api\/[A-Za-z0-9\-_/${}]*)/g
const calls = new Map()

for (const file of files) {
  const rel = path.relative(ROOT, file)
  const text = fs.readFileSync(file, 'utf8')
  for (const m of text.matchAll(API_LITERAL)) {
    let p = m[1]
    const tpl = p.indexOf('${')
    if (tpl !== -1) p = p.slice(0, tpl)
    const key = p.replace(/^\/api/, '').replace(/\/$/, '')
    if (!key || key === '/' || INDEPENDENT_PROXY.has(key)) continue
    if (!calls.has(key)) calls.set(key, new Set())
    calls.get(key).add(rel)
  }
}

const missing = []
for (const [p, where] of calls) {
  if (allowed.has(p)) continue
  // 模板拼接路径只校验前缀（如 /api/image/seedream/${m}）
  const prefixHit = [...allowed].some((a) => a.startsWith(p) && a !== p)
  if (prefixHit) continue
  missing.push({ p, where: [...where].slice(0, 3) })
}
if (missing.length) {
  missing.forEach(({ p, where }) => fail(`${p} 未列入白名单（${where.join(', ')}）`))
} else {
  ok(`${calls.size} 个前端调用路径均有白名单条目`)
}

// 白名单里的死条目只提示，不阻断（动态拼接可能识别不到）
const callList = [...calls.keys()]
const unused = [...allowed].filter(
  (a) => !callList.some((p) => a === p || a.startsWith(p))
)
if (unused.length) console.log(`  ! ${unused.length} 条白名单暂无静态调用（可能由动态路径拼接使用）：\n    ${unused.join('\n    ')}`)

// —— 4. SEO 数据化完整性 ——
console.log('\n[4/6] SEO 内容数据')
const SEO_DATA_DIR = path.join(ROOT, 'data', 'seo')
const REQUIRED_FIELDS = ['rootId', 'meta', 'badge', 'sections']
if (!fs.existsSync(SEO_DATA_DIR)) {
  console.log('  · data/seo 尚未启用，跳过')
} else {
  const dataFiles = fs.readdirSync(SEO_DATA_DIR).filter((f) => f.endsWith('.js'))
  let bad = 0
  for (const f of dataFiles) {
    const full = path.join(SEO_DATA_DIR, f)
    const text = fs.readFileSync(full, 'utf8')
    const miss = REQUIRED_FIELDS.filter((k) => !new RegExp(`\\b${k}\\s*:`).test(text))
    if (miss.length) { fail(`${f} 缺少字段: ${miss.join(', ')}`); bad += 1 }
    // 薄壳组件必须存在且引用该数据文件
    const comp = (text.match(/component:\s*'([^']+)'/) || [])[1]
    if (!comp) { fail(`${f} 缺少 component 字段（对应薄壳组件名）`); continue }
    const shell = path.join(ROOT, 'components', 'tools', `${comp}.vue`)
    if (!fs.existsSync(shell)) fail(`${f} 找不到对应薄壳组件 components/tools/${comp}.vue`)
    else {
      const shellText = fs.readFileSync(shell, 'utf8')
      if (!shellText.includes('ToolSeoContent')) fail(`components/tools/${comp}.vue 未使用 ToolSeoContent 渲染器`)
      if (!shellText.includes(`data/seo/${f}`)) fail(`components/tools/${comp}.vue 未引用 data/seo/${f}`)
      // components/tools 下的自动导入名是 ToolsXxx，薄壳必须显式 import
      if (!shellText.includes("from '~/components/tools/ToolSeoContent.vue'") && !shellText.includes('from "~/components/tools/ToolSeoContent.vue"')) {
        fail(`components/tools/${comp}.vue 需显式 import ToolSeoContent（自动导入名为 ToolsToolSeoContent）`)
      }
    }
  }
  if (!bad) ok(`${dataFiles.length} 个 SEO 数据文件字段完整，薄壳组件齐全`)
}

// —— 5. 已迁移组件的文案一致性（防止数据化过程中丢字） ——
console.log('\n[5/6] SEO 文案一致性')
if (!fs.existsSync(SEO_DATA_DIR)) {
  console.log('  · data/seo 尚未启用，跳过')
} else {
  try {
    execFileSync(process.execPath, ['scripts/check-seo-content.mjs', '--all'], { stdio: 'pipe' })
    ok('已迁移组件与 git HEAD 旧版本文案一致')
  } catch (e) {
    const detail = (e.stdout?.toString() || '') + (e.stderr?.toString() || '')
    fail('迁移组件存在文案差异')
    console.error(detail.trim().split('\n').slice(-40).map((l) => `    ${l}`).join('\n'))
  }
}

// —— 6. 前后端契约（读取隔壁 Java 服务源码，目录不存在时自动跳过） ——
console.log('\n[6/6] 前后端契约')
try {
  const out = execFileSync(process.execPath, ['scripts/check-backend-contract.mjs'], { stdio: 'pipe' }).toString()
  if (out.includes('跳过契约校验')) console.log('  · 未找到后端源码，跳过契约校验')
  else ok('白名单路由 / 请求字段 / 枚举传值与后端源码一致')
  // 已知但尚未在后端修复的问题只提示，不阻断构建
  for (const line of out.split('\n').filter((l) => l.trim().startsWith('! '))) {
    console.log(`  ${line.trim()}`)
  }
} catch (e) {
  const detail = (e.stdout?.toString() || '') + (e.stderr?.toString() || '')
  fail('前后端契约不一致')
  console.error(detail.trim().split('\n').slice(-30).map((l) => `    ${l}`).join('\n'))
}

console.log('')
if (failures) {
  console.error(`✗ 冒烟测试未通过：${failures} 项失败。请修复后再构建。\n`)
  process.exit(1)
}
console.log('✓ 冒烟测试全部通过。\n')
