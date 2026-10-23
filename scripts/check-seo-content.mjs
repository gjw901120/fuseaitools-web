/**
 * SEO 内容迁移一致性校验
 *
 * 用法：
 *   node scripts/check-seo-content.mjs QwenV3SeoContent [...其他组件名]
 *   node scripts/check-seo-content.mjs --all   # 校验 data/seo 下全部已迁移组件
 *
 * 原理：从 git HEAD 版本的旧 SeoContent 组件里提取全部可读文案（模板文本节点 + 字符串字面量），
 * 与迁移后的 data/seo/*.js 做「去标签 + 折叠空白」后的子串比对，确保数据化过程中没有丢字。
 * 差异会逐条列出，供人工确认（改写文案属于预期变更时，重新迁移该条即可）。
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const ROOT = process.cwd()

const args = process.argv.slice(2)
const all = args.includes('--all')
const targets = args.filter((a) => !a.startsWith('--'))

const norm = (s) => s.replace(/\s+/g, ' ').trim()
const stripTags = (s) => s.replace(/<[^>]+>/g, ' ')
const unescape = (s) => s
  .replace(/\\'/g, "'")
  .replace(/\\"/g, '"')
  .replace(/\\u([0-9a-fA-F]{4})/g, (m, h) => String.fromCharCode(parseInt(h, 16)))
const flatten = (s) => norm(stripTags(norm(unescape(s))))

/** 排除代码/配置类片段，只留人类可读文案 */
const IGNORE_PATTERNS = [
  /^https?:\/\//,
  /^\/[a-z0-9]/i, // 路由路径（/home/...、/pricing）
  /^~\//,
  /^[{}[\]]/,
  /navigateToToolTop\(/,
  /isCurrentMode\(/,
  /openFaqIndex/,
  /^\s*(class|style|aria-|@click|v-)/,
  /tool-seo-content\.css/,
  // 纯类名组合（“info-section workflow-definition” “model-mode-card model-mode-card--current”）
  /^[a-z][a-z0-9-]*(?:\s+[a-z][a-z0-9-]*)+$/,
  // Vue 表达式：函数调用、属性访问、v-for 子句
  /^[A-Za-z_$][\w$.]*\(/,
  /^[A-Za-z_$][\w$]*(?:\.[\w$]+)+$/,
  /^\(?[\w$]+(?:,\s*[\w$]+)?\)?\s+in\s+[\w$.]+$/,
  // JS 对象字面量片段（字符串字面量正则跨到了相邻属性名）
  /'\s*,\s*[A-Za-z_$][\w$]*\s*:/,
  /=>|===|&&|\|\|/
]
const isCopyText = (s) => !IGNORE_PATTERNS.some((re) => re.test(s))

/** 片段里可能夹着标签/半个标签（模板拼接的 HTML），只校验其中的纯文本段 */
function probeSegments(s) {
  return s
    .split(/<[^>]*>?|>/)
    .map(norm)
    .filter((t) => t.length >= 20 && !/[=<>{}]/.test(t))
}

/** 从旧组件源码中提取候选文案片段 */
function extractSnippets(source) {
  const out = new Set()
  // 模板文本节点
  for (const m of source.matchAll(/>([^<>{}]+)</g)) {
    const t = norm(m[1])
    if (t.length >= 20 && isCopyText(t)) out.add(t)
  }
  // 单引号 / 双引号字符串字面量（data、FAQ、表格单元格等）
  for (const re of [/'((?:[^'\\\n]|\\.){20,})'/g, /"((?:[^"\\\n]|\\.){20,})"/g]) {
    for (const m of source.matchAll(re)) {
      const t = norm(m[1].replace(/\\'/g, "'").replace(/\\"/g, '"'))
      if (t.length >= 20 && isCopyText(t)) out.add(t)
    }
  }
  return [...out]
}

function resolvePairs() {
  const dir = path.join(ROOT, 'data', 'seo')
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js'))
  const pairs = []
  for (const f of files) {
    const text = fs.readFileSync(path.join(dir, f), 'utf8')
    const comp = (text.match(/component:\s*'([^']+)'/) || [])[1]
    if (!comp) continue
    pairs.push({ dataFile: path.join(dir, f), component: comp })
  }
  if (all) return pairs
  return pairs.filter((p) => targets.includes(p.component))
}

function headVersion(component) {
  const rel = `components/tools/${component}.vue`
  try {
    return execFileSync('git', ['show', `HEAD:${rel}`], { cwd: ROOT, encoding: 'utf8' })
  } catch {
    return null
  }
}

const pairs = resolvePairs()
if (!pairs.length) {
  console.log('没有找到可校验的迁移组件（data/seo/*.js 中带 component 字段的文件）。')
  process.exit(0)
}

let failed = 0
for (const { dataFile, component } of pairs) {
  const old = headVersion(component)
  if (!old) {
    console.log(`· ${component}: git HEAD 中找不到，跳过`)
    continue
  }
  const newText = flatten(fs.readFileSync(dataFile, 'utf8'))
  const snippets = extractSnippets(old)
  const missing = snippets.filter((s) => {
    // 短句（类名、按钮文案、指令表达式）不作为文案丢失的判断依据
    if (flatten(s).length < 30) return false
    const segs = probeSegments(s)
    // 没有可校验的文本段（纯 markup/表达式/类名）时不计入差异
    if (!segs.length) return false
    return segs.some((seg) => !newText.includes(flatten(seg)))
  })

  console.log(`\n=== ${component} ↔ ${path.relative(ROOT, dataFile)} ===`)
  console.log(`旧组件文案片段 ${snippets.length} 段，未在新数据中找到 ${missing.length} 段`)
  missing.slice(0, 30).forEach((s) => console.log(`  - ${s.slice(0, 160)}${s.length > 160 ? '…' : ''}`))
  if (missing.length) failed += 1
}

console.log('')
if (failed) {
  console.error(`✗ ${failed} 个组件存在文案差异，请逐条确认是否为预期改写后重新迁移。\n`)
  process.exit(1)
}
console.log('✓ 迁移组件文案与旧版本一致。\n')
