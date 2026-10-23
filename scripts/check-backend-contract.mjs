/**
 * 前后端契约校验（读取隔壁 Java 服务源码）
 *
 * 用法：
 *   node scripts/check-backend-contract.mjs
 *   FUSE_SERVER_DIR=/path/to/fuseaitools-server node scripts/check-backend-contract.mjs
 *
 * 校验三类「前端调不通 / 静默失效」的问题：
 *   A. 路由存在性：白名单里的 METHOD /path 必须能在 Java Controller 找到
 *   B. 请求体字段：前端发送的顶层字段必须能映射到后端 @RequestBody DTO
 *   C. 枚举传值：前端大写下划线字面量若恰为某枚举常量名，而后端 @JsonCreator 只认别的值 → 反序列化得到 null
 *
 * 后端目录不存在时直接跳过（exit 0），保证前端仓库可独立构建。
 */
import fs from 'node:fs'
import path from 'node:path'
import { API_PROXY_ROUTES } from '../server/utils/apiProxyRoutes.js'

const ROOT = process.cwd()
const SERVER_DIR = process.env.FUSE_SERVER_DIR || path.resolve(ROOT, '..', 'fuseaitools-server')
const JAVA_SRC = path.join(SERVER_DIR, 'src', 'main', 'java')
const SRC_DIRS = ['components', 'pages', 'composables', 'utils']

let failures = 0
const fail = (msg) => { console.error(`  ✗ ${msg}`); failures += 1 }
const ok = (msg) => console.log(`  ✓ ${msg}`)

if (!fs.existsSync(JAVA_SRC)) {
  console.log(`\n[contract] 后端源码不存在（${SERVER_DIR}），跳过契约校验。`)
  process.exit(0)
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, out)
    else if (entry.name.endsWith('.java')) out.push(full)
  }
  return out
}
/** 前端源码（只扫可能发请求的目录） */
function walkFront(dir, out = []) {
  return walkExt(dir, /\.(vue|js)$/, out)
}
function walkExt(dir, re, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walkExt(full, re, out)
    else if (re.test(entry.name)) out.push(full)
  }
  return out
}

const javaFiles = walk(JAVA_SRC)
const byClass = new Map(javaFiles.map((f) => [path.basename(f, '.java'), f]))

// —— A. 后端路由表 ——
const backendRoutes = new Map()
for (const file of javaFiles.filter((f) => f.endsWith('Controller.java'))) {
  const src = fs.readFileSync(file, 'utf8')
  const prefix = ((src.match(/@RequestMapping\(\s*(?:value\s*=\s*)?"([^"]*)"/) || [])[1] || '').replace(/^\/api/, '')
  for (const m of src.matchAll(/@(Post|Get|Put|Delete|Patch)Mapping\(\s*(?:value\s*=\s*)?"([^"]*)"/g)) {
    const route = `${m[1].toUpperCase()} ${(prefix + m[2]).replace(/\/+/g, '/')}`
    if (!backendRoutes.has(route)) backendRoutes.set(route, { cls: path.basename(file, '.java'), file })
  }
}

console.log(`\n[contract] 后端路由 ${backendRoutes.size} 条（${SERVER_DIR}）`)
const missingRoutes = [...API_PROXY_ROUTES].filter((r) => !backendRoutes.has(r))
if (missingRoutes.length) missingRoutes.forEach((r) => fail(`白名单路由在后端不存在：${r}`))
else ok(`白名单 ${API_PROXY_ROUTES.size} 条路由全部能在 Controller 找到`)

// —— B. 请求体字段 vs DTO ——
const dtoCache = new Map()
/** DTO 字段名 → 声明类型（含 @JsonProperty 显式重命名） */
function dtoFields(cls) {
  if (dtoCache.has(cls)) return dtoCache.get(cls)
  const file = byClass.get(cls)
  if (!file) return null
  const src = fs.readFileSync(file, 'utf8')
  const body = src.slice(src.indexOf('{'))
  const map = new Map()
  for (const m of body.matchAll(/((?:@[\w.]+(?:\([^)]*\))?\s*)*)private\s+(?!static)([\w<>[\],.\s?]+?)\s+(\w+)\s*(?:=[^;]*)?;/g)) {
    map.set(m[3], m[2].trim())
    const renamed = (m[1].match(/@JsonProperty\("([^"]+)"\)/) || [])[1]
    if (renamed) map.set(renamed, m[2].trim())
  }
  dtoCache.set(cls, map)
  return map
}

/** 枚举类 → 反序列化可接受的字符串值集合 */
const enumAccept = new Map()
function acceptedValues(enumCls) {
  if (enumAccept.has(enumCls)) return enumAccept.get(enumCls)
  const file = byClass.get(enumCls)
  if (!file) return null
  const src = fs.readFileSync(file, 'utf8')
  const fields = [...src.matchAll(/private final \w+(?:<[^>]+>)? (\w+);/g)].map((m) => m[1])
  const constants = [...src.matchAll(/^\s{4}([A-Z][A-Z0-9_]*)\s*\(([^)]*)\)/gm)].map((m) => ({
    name: m[1],
    args: m[2].split(',').map((s) => s.trim().replace(/^"/, '').replace(/"$/, ''))
  }))
  const creatorBlock = (src.match(/@JsonCreator[\s\S]{0,1500}?\n\s{4}\}/) || [''])[0]
  const creatorField = (creatorBlock.match(/get(\w+)\(\)\.equalsIgnoreCase|get(\w+)\(\)\.equals\(/) || []).slice(1).find(Boolean)
  let values
  if (!/@JsonCreator/.test(src)) values = constants.map((c) => c.name) // 无 creator：按枚举名反序列化
  else if (!creatorField) return null // 非字符串/无法静态解析（如数值枚举）
  else {
    const idx = fields.findIndex((f) => f.toLowerCase() === creatorField.toLowerCase())
    if (idx === -1) return null
    values = constants.map((c) => c.args[idx])
  }
  const set = new Set(values.map((v) => String(v).toLowerCase()))
  enumAccept.set(enumCls, set)
  return set
}

/** 从对象字面量源码里取某个 key 的赋值表达式 */
function valueExpr(src, startIdx, key) {
  const bodyStart = src.indexOf('{', startIdx)
  if (bodyStart === -1) return null
  let depth = 0
  for (let i = bodyStart; i < src.length; i += 1) {
    const ch = src[i]
    if (ch === '{' || ch === '[') depth += 1
    else if (ch === '}' || ch === ']') { depth -= 1; if (depth === 0) return null }
    else if (depth === 1 && src.startsWith(key, i) && (i === 0 || /[\s{,]/.test(src[i - 1]))) {
      const rest = src.slice(i + key.length)
      const m = rest.match(/^\s*:\s*([^,\n]+)/)
      if (m) return m[1].trim()
    }
  }
  return null
}

/** 从 fromIdx 开始取一个大括号块（包含嵌套） */
function braceBlock(src, fromIdx) {
  const start = src.indexOf('{', fromIdx)
  if (start === -1) return ''
  let depth = 0
  for (let i = start; i < src.length; i += 1) {
    if (src[i] === '{') depth += 1
    else if (src[i] === '}') {
      depth -= 1
      if (depth === 0) return src.slice(start, i + 1)
    }
  }
  return ''
}

/** 收集表达式里可能出现的字符串取值（字面量 + 引用的常量表的值） */
function exprValues(src, expr) {
  const out = new Set()
  for (const m of expr.matchAll(/'([^']*)'/g)) out.add(m[1])
  // aspectRatioMap[formData.aspectRatio] → 把该常量表的所有 value 也算进来
  for (const ref of expr.matchAll(/([A-Za-z_$][\w$]*)\s*\[/g)) {
    const mapName = ref[1]
    const decl = src.indexOf(`const ${mapName} = {`)
    if (decl === -1) continue
    for (const v of braceBlock(src, decl).matchAll(/:\s*'([^']+)'/g)) out.add(v[1])
  }
  return out
}

/** 路由 → DTO 类名（同一路径可能有多处映射，取并集） */
const routeDto = new Map()
for (const file of javaFiles.filter((f) => f.endsWith('Controller.java'))) {
  const src = fs.readFileSync(file, 'utf8')
  const prefix = ((src.match(/@RequestMapping\(\s*(?:value\s*=\s*)?"([^"]*)"/) || [])[1] || '').replace(/^\/api/, '')
  for (const m of src.matchAll(/@(Post|Put|Patch)Mapping\(\s*(?:value\s*=\s*)?"([^"]*)"[^)]*\)([\s\S]{0,500}?)\{/g)) {
    const route = `${m[1].toUpperCase()} ${(prefix + m[2]).replace(/\/+/g, '/')}`
    const dto = (m[3].match(/@RequestBody\s+(?:@\w+(?:\([^)]*\))?\s+)*([A-Za-z0-9_.]+)\s+\w+/) || [])[1]
    if (!dto) continue
    routeDto.set(route, dto.split('.').pop())
  }
}

/** 从 `const body = { ... }` 提取顶层 key（跳过嵌套对象/数组内部） */
function topLevelKeys(src, startIdx) {
  const braceIdx = src.indexOf('{', startIdx)
  if (braceIdx === -1) return null
  const keys = new Set()
  let depth = 0
  for (let i = braceIdx; i < src.length; i += 1) {
    const ch = src[i]
    if (ch === '{' || ch === '[') depth += 1
    else if (ch === '}' || ch === ']') {
      depth -= 1
      if (depth === 0) break
    } else if (depth === 1) {
      // 顶层 `key:` 或 `key,`（简写）
      const rest = src.slice(i)
      const m = rest.match(/^\s*([A-Za-z_$][\w$]*)\s*(?::|,|\})/)
      if (m) {
        const prev = src.slice(Math.max(0, i - 1), i)
        if (/[\s{,]/.test(prev)) keys.add(m[1])
        i += m[0].length - 1
      }
    }
  }
  return keys
}

const frontFiles = SRC_DIRS.flatMap((d) => walkFront(path.join(ROOT, d)))
const routeKeys = [...backendRoutes.keys()]
let checkedBodies = 0
let unknownFields = 0
const enumTargets = [] // { rel, apiPath, key, enumCls, expr }
for (const file of frontFiles) {
  const rel = path.relative(ROOT, file)
  const text = fs.readFileSync(file, 'utf8')
  for (const call of text.matchAll(/\b(?:post|put|patch)\(\s*['"](\/api\/[^'"`]+)['"]\s*,\s*(['"]?\w+['"]?)/g)) {
    const apiPath = call[1].replace(/^\/api/, '')
    const bodyVar = call[2].replace(/['"]/g, '')
    const candidates = routeKeys.filter((k) => k.split(' ')[1] === apiPath)
    if (!candidates.length) continue
    const dto = candidates.map((k) => routeDto.get(k)).find(Boolean)
    if (!dto) continue
    const fields = dtoFields(dto)
    if (!fields) continue
    // 找到 body 变量的声明（必须是 `const x = {` 形式，避免命中 `x.foo` 这类引用）
    let declIdx = -1
    for (const kw of ['const', 'let', 'var']) {
      const hit = text.lastIndexOf(`${kw} ${bodyVar} = {`, call.index)
      if (hit > declIdx) declIdx = hit
    }
    if (declIdx === -1) declIdx = text.lastIndexOf(`${bodyVar} = {`, call.index)
    if (declIdx === -1 || call.index - declIdx > 8000) continue
    const eqIdx = text.indexOf('=', declIdx)
    if (eqIdx === -1) continue
    const keys = topLevelKeys(text, eqIdx)
    if (!keys || !keys.size) continue
    checkedBodies += 1
    for (const key of keys) {
      // 下划线/驼峰互认
      const camel = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase())
      const snake = key.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`)
      const type = fields.get(key) || fields.get(camel) || fields.get(snake)
      if (!type) {
        fail(`${rel} → ${apiPath} 的请求字段 ${key} 不在 ${dto} 中（后端会静默丢弃）`)
        unknownFields += 1
        continue
      }
      if (/Enum$/.test(type)) {
        const expr = valueExpr(text, eqIdx, key)
        if (expr) enumTargets.push({ rel, apiPath, key, enumCls: type, expr })
      }
    }
  }
}
if (!unknownFields) ok(`${checkedBodies} 个请求体的顶层字段均能映射到后端 DTO`)

// —— C. 枚举字段传值 ——
let echecked = 0
for (const t of enumTargets) {
  const accepted = acceptedValues(t.enumCls)
  if (!accepted) continue
  echecked += 1
  const values = exprValues(fs.readFileSync(path.join(ROOT, t.rel), 'utf8'), t.expr)
  for (const v of values) {
    if (accepted.has(v.toLowerCase())) continue
    const allowed = [...accepted].slice(0, 6).join(' / ')
    fail(`${t.rel} → ${t.apiPath} 的 ${t.key} 传 '${v}'，但 ${t.enumCls} 只接受 ${allowed}（反序列化会得到 null）`)
  }
}
if (!echecked) console.log('  · 未找到可静态解析的枚举字段请求体，跳过枚举校验')

// —— D. DTO → Request 的类型不一致字段（BeanUtils.copyProperties 会静默跳过） ——
const serviceFiles = javaFiles.filter((f) => /service[\\/]impl[\\/]/.test(f))
const gaps = []
for (const file of serviceFiles) {
  const src = fs.readFileSync(file, 'utf8')
  for (const call of src.matchAll(/BeanUtils\.copyProperties\(\s*(\w+)\s*,\s*(\w+)\s*\)/g)) {
    const before = src.slice(0, call.index)
    const declOf = (name) => {
      let last = null
      for (const m of before.matchAll(new RegExp(`([A-Z][A-Za-z0-9]*)\\s+${name}\\s*(?:=[^;]*)?[;,\\)]`, 'g'))) last = m[1]
      return last
    }
    const dtoCls = declOf(call[1])
    const reqCls = declOf(call[2])
    if (!dtoCls || !reqCls) continue
    const df = dtoFields(dtoCls)
    const rf = dtoFields(reqCls)
    if (!df || !rf) continue
    const startIdx = Math.max(before.lastIndexOf('\n    @Override'), before.lastIndexOf('\n    public '), before.lastIndexOf('\n    private '))
    const endIdx = src.indexOf('\n    @Override', call.index + 10)
    const body = src.slice(startIdx, endIdx === -1 ? src.length : endIdx)
    for (const [name, dType] of df) {
      if (!rf.has(name) || rf.get(name) === dType) continue
      const setter = `.set${name[0].toUpperCase()}${name.slice(1)}(`
      if (body.includes(setter)) continue
      gaps.push(`${path.basename(file)}  ${dtoCls} -> ${reqCls}  的 ${name}（${dType} -> ${rf.get(name)}）未显式赋值`)
    }
  }
}
if (gaps.length) {
  gaps.forEach((g) => console.log(`  ! ${g}：copyProperties 会跳过，实际使用 Request 的默认值`))
} else {
  ok('DTO → Request 的类型不一致字段均有显式赋值')
}

console.log('')
if (failures) {
  console.error(`✗ 契约校验未通过：${failures} 项。\n`)
  process.exit(1)
}
console.log('✓ 前后端契约校验通过。\n')
