/**
 * 移动端静态质量闸门（并入 prebuild 冒烟测试第 7 项，也可独立运行）
 * 用法：node scripts/check-mobile.mjs
 *
 * 五项检查（口径来源：移动端适配统一断点规范 640/768/1024 + Pointer Events 交互规范）：
 *   1. 死媒体查询块：@media (...) { } 空块或仅剩注释的块（历史上 Seedance/news 都遗留过）
 *   2. 断点口径：@media 宽度条件只允许 640/768/1024；历史遗留断点进 LEGACY 豁免表，
 *      豁免项若已不存在会提示清理，新增非标准断点直接失败
 *   3. 固有宽度溢出：属性 min-width ≥ 320px（窄于主流手机视口 375px 会顶穿页面）
 *      须进 EXEMPT 表说明承载容器为何可滚动/隐藏（如带滚动外壳的表格、桌面隐藏的下拉菜单）
 *   4. mouse 专属事件：交互代码禁止 @mousedown/@mousemove/@mouseup 绑定或
 *      addEventListener('mouse...')——移动端不派发 mouse 序列，必须用 Pointer Events
 *   5. 全局配置防回归：viewport 必须含 width=device-width 与 viewport-fit=cover；
 *      mobile-base.css 必须仍排在 container.css 之后（!important 覆盖依赖加载顺序）
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()

/** 扫描范围：全局 CSS + SFC 样式块（vue 文件整体还用于 mouse 事件与 js 绑定扫描） */
const CSS_DIRS = ['assets/css', 'components', 'pages', 'layouts']
const MOUSE_SCAN_DIRS = ['components', 'pages', 'composables', 'plugins']

const STANDARD_BREAKPOINTS = new Set([640, 768, 1024])

/** 历史遗留断点豁免（收敛前的欠账；清完一条删一条） */
const LEGACY_BREAKPOINTS = [
  { file: 'components/AppFooter.vue', bp: 480 },
  { file: 'components/FAQSection.vue', bp: 480 },
  { file: 'components/LoginModal.vue', bp: 480 },
  { file: 'components/VerifyCodeModal.vue', bp: 480 },
  { file: 'components/HomeLayout.vue', bp: 900 },
  { file: 'components/HomeLayout.vue', bp: 1200 },
  { file: 'pages/home/index.vue', bp: 900 },
  { file: 'pages/home/index.vue', bp: 1200 }
]

/** min-width ≥320px 属性豁免：写明为何不会在移动端顶穿页面 */
const EXEMPT_MIN_WIDTH = [
  { file: 'assets/css/tool-seo-content.css', selector: '.seo-content .compare-table', reason: '外层 .compare-table-wrap 已有 overflow-x:auto 滚动外壳' },
  { file: 'components/AppHeader.vue', selector: '.dropdown-menu', reason: '桌面 mega 菜单，≤1024 随 .nav 整体 display:none' }
]

let failures = 0
const fail = (msg) => { console.error(`  ✗ ${msg}`); failures += 1 }

function walk(dir, re = /\.(css|vue)$/, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.nuxt' || entry.name === '.output') continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, re, out)
    else if (re.test(entry.name)) out.push(full)
  }
  return out
}

/** .vue 只取 <style> 块；.css 全文。注释整体替换为等量空白以保留行号 */
function extractCss(text, rel) {
  let css = rel.endsWith('.vue')
    ? [...text.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n')
    : text
  // 屏蔽注释但保留换行（行号可对位）
  return css.replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, ' '))
}

/** 屏蔽 @media 前奏（到 '{' 为止），保留块体与行号，用于区分「媒体条件」与「属性声明」 */
function maskMediaPrelude(css) {
  return css.replace(/@media[^{]*\{/g, (m) => m.slice(0, -1).replace(/[^\n]/g, ' ') + '{')
}

/** 找到与 openIndex 处 '{' 匹配的 '}' 下标 */
function matchBrace(css, openIndex) {
  let depth = 0
  for (let i = openIndex; i < css.length; i++) {
    if (css[i] === '{') depth++
    else if (css[i] === '}' && --depth === 0) return i
  }
  return css.length - 1
}

const files = CSS_DIRS.flatMap((d) => walk(path.join(ROOT, d)))
const usedLegacy = new Set()
const usedExempts = new Set()

for (const file of files) {
  const rel = path.relative(ROOT, file).split(path.sep).join('/')
  const css = extractCss(fs.readFileSync(file, 'utf8'), rel)
  const lineAt = (idx) => css.slice(0, idx).split('\n').length

  // —— 1. 死 @media 块 ——
  for (const m of css.matchAll(/@media[^{]*\{/g)) {
    const open = m.index + m[0].length - 1
    const close = matchBrace(css, open)
    if (!css.slice(open + 1, close).trim()) {
      fail(`死媒体查询块：${rel}:${lineAt(m.index)} → ${m[0].trim().replace(/\{$/, '')} 块体为空`)
    }
  }

  // —— 2. 断点口径 ——
  for (const m of css.matchAll(/@media[^{]*/g)) {
    for (const w of m[0].matchAll(/(?:max|min)-width:\s*(\d+)px/g)) {
      const bp = Number(w[1])
      if (STANDARD_BREAKPOINTS.has(bp)) continue
      const legacy = LEGACY_BREAKPOINTS.find((l) => l.file === rel && l.bp === bp)
      if (legacy) { usedLegacy.add(legacy); continue }
      fail(`非标准断点：${rel}:${lineAt(m.index)} 使用 ${bp}px（口径只允许 640/768/1024，历史欠账请登记 LEGACY_BREAKPOINTS）`)
    }
  }

  // —— 3. min-width 固有宽度溢出 ——
  const propsOnly = maskMediaPrelude(css)
  for (const m of propsOnly.matchAll(/(?:^|[\s;{])min-width:\s*(\d+)px/g)) {
    if (Number(m[1]) < 320) continue
    // 取该声明所在的最近选择器（向上找最近一个 '{'，再向上找其选择器行）
    const declIdx = m.index
    const open = propsOnly.lastIndexOf('{', declIdx)
    const selStart = open === -1 ? 0 : (propsOnly.lastIndexOf('}', open) + 1)
    const selector = propsOnly.slice(selStart, open).trim().replace(/\s+/g, ' ')
    const exempt = EXEMPT_MIN_WIDTH.find((e) => e.file === rel && selector.includes(e.selector))
    if (exempt) { usedExempts.add(exempt); continue }
    fail(`固有宽度溢出：${rel}:${lineAt(declIdx)} 「${selector || '?'}」min-width:${m[1]}px ≥ 320px（移动端视口 375px 会顶穿；确属滚动容器内元素请登记 EXEMPT_MIN_WIDTH 并注明滚动外壳）`)
  }
}

// —— 4. mouse 专属事件 ——
const MOUSE_BIND = /@mousedown|@mouseup|@mousemove|addEventListener\(\s*['"]mouse(down|move|up)['"]/
for (const dir of MOUSE_SCAN_DIRS) {
  for (const file of walk(path.join(ROOT, dir), /\.(vue|js|ts)$/)) {
    const rel = path.relative(ROOT, file).split(path.sep).join('/')
    const text = fs.readFileSync(file, 'utf8')
    text.split('\n').forEach((line, i) => {
      if (MOUSE_BIND.test(line)) {
        fail(`mouse 专属事件：${rel}:${i + 1} 使用 mouse 序列（移动端不派发，须改 Pointer Events：pointerdown/pointermove/pointerup + touch-action）`)
      }
    })
  }
}

// —— 5. 全局配置防回归 ——
const cfg = fs.readFileSync(path.join(ROOT, 'nuxt.config.js'), 'utf8')
const viewport = (cfg.match(/name:\s*['"]viewport['"][^\n]*/g) || []).join(' ')
if (!viewport.includes('width=device-width')) fail('viewport meta 缺少 width=device-width')
if (!viewport.includes('viewport-fit=cover')) fail('viewport meta 缺少 viewport-fit=cover（safe-area 依赖它生效）')

const cssOrder = (cfg.match(/css:\s*\[[\s\S]*?\]/) || [''])[0]
const iContainer = cssOrder.indexOf('container.css')
const iMobileBase = cssOrder.indexOf('mobile-base.css')
if (iMobileBase === -1) fail('nuxt.config css 数组缺少 mobile-base.css')
else if (iContainer !== -1 && iMobileBase < iContainer) fail('mobile-base.css 必须排在 container.css 之后加载（!important 覆盖依赖顺序）')

// —— 豁免表保鲜：已失效的条目提示清理（不阻断） ——
for (const l of LEGACY_BREAKPOINTS) {
  if (!usedLegacy.has(l)) console.log(`  ! 豁免已过期可删除：LEGACY_BREAKPOINTS ${l.file}@${l.bp}`)
}
for (const e of EXEMPT_MIN_WIDTH) {
  if (!usedExempts.has(e)) console.log(`  ! 豁免已过期可删除：EXEMPT_MIN_WIDTH ${e.file} ${e.selector}`)
}

if (failures) {
  console.error(`\n✗ 移动端检查未通过：${failures} 项。`)
  process.exit(1)
}
console.log(`移动端静态检查通过（${files.length} 个样式文件：无死媒体查询块、断点口径统一、无未豁免固有宽度、无 mouse 专属事件、全局配置完整）。`)
