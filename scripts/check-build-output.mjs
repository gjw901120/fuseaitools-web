/**
 * 构建产物校验（postbuild 闸门）
 * 用法：node scripts/check-build-output.mjs
 *
 * 预渲染产物带病上线后，用户与搜索引擎拿到的是 404 或错误链接：
 *   1. 相对链接：<a href="home/qwen/x"> 会按当前页 URL 解析成嵌套路径
 *      （/home/qwen/v2-image-edit → /home/qwen/home/qwen/x），爬虫必现 404
 *   2. 404 页面：nitro.prerender.failOnError=false 时坏链会被写成静态页，
 *      需要从产物里清掉，避免被 CDN / 搜索引擎当作真实页面
 *   3. 站内死链：href 指向的路由在产物中既无 html 也无静态文件（仅提示）
 */
import fs from 'node:fs'
import path from 'node:path'

const PUBLIC_DIR = path.join(process.cwd(), '.output', 'public')
const HTML_EXT = /\.html$/
const SKIP_PREFIX = ['/api/', '/_nuxt/', '/__nuxt', '/_payload.json']

let failures = 0
const fail = (msg) => { console.error(`  ✗ ${msg}`); failures += 1 }
const ok = (msg) => console.log(`  ✓ ${msg}`)

if (!fs.existsSync(PUBLIC_DIR)) {
  console.log('\n[build-output] 未找到 .output/public，跳过产物校验（非 build 流程）。\n')
  process.exit(0)
}

function walk(dir, re, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, re, out)
    else if (re.test(entry.name)) out.push(full)
  }
  return out
}

const htmlFiles = walk(PUBLIC_DIR, HTML_EXT)
const rel = (file) => path.relative(PUBLIC_DIR, file).split(path.sep).join('/')

/** 产物中是否存在某个站内路径对应的文件 */
function routeExists(urlPath) {
  const clean = decodeURI(urlPath.split('#')[0].split('?')[0])
  if (!clean.startsWith('/')) return true
  if (SKIP_PREFIX.some((p) => clean.startsWith(p))) return true
  const target = path.join(PUBLIC_DIR, clean)
  if (fs.existsSync(target) && fs.statSync(target).isFile()) return true
  return (
    fs.existsSync(path.join(target, 'index.html')) ||
    fs.existsSync(`${target}.html`)
  )
}

// —— 1. 相对链接：必须带前导斜杠 ——
console.log('\n[build-output] 相对链接')
const relativeLinks = []
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8')
  for (const m of html.matchAll(/href="([^"]*)"/g)) {
    const href = m[1].trim()
    if (!href) continue
    if (href.startsWith('/') || href.startsWith('#') || href.startsWith('?')) continue
    if (/^(?:https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(href)) continue
    relativeLinks.push(`${rel(file)} → ${href}`)
  }
}
if (relativeLinks.length) {
  fail(`${relativeLinks.length} 处相对链接（会解析成嵌套路径导致 404）`)
  relativeLinks.slice(0, 20).forEach((line) => console.error(`    ${line}`))
  if (relativeLinks.length > 20) console.error(`    …另有 ${relativeLinks.length - 20} 处`)
} else {
  ok(`${htmlFiles.length} 个页面无相对链接`)
}

// —— 2. 404 页面：从产物中清除 ——
console.log('\n[build-output] 404 产物页')
const errorPages = htmlFiles.filter((file) => /<title>[^<]*404[^<]*<\/title>/i.test(fs.readFileSync(file, 'utf8')))
if (errorPages.length) {
  for (const file of errorPages) {
    const dir = path.dirname(file)
    fs.rmSync(file, { force: true })
    // payload 与空目录一并清掉，避免静态服务把 /xxx /_payload.json 当成有效数据
    fs.rmSync(path.join(dir, '_payload.json'), { force: true })
    try {
      if (fs.readdirSync(dir).length === 0) fs.rmdirSync(dir)
    } catch { /* 目录可能已被上级清理 */ }
    console.log(`  ! 已清除 404 产物：${rel(file)}`)
  }
  console.log(`  · 共 ${errorPages.length} 个坏链页面；请修正对应链接，避免每次构建重复产生`)
} else {
  ok('产物中无 404 页面')
}

// —— 3. 站内死链：仅提示，不阻断 ——
console.log('\n[build-output] 站内死链')
const deadLinks = new Map()
// 404 产物刚被删除，重新过滤一次，避免读到不存在的文件
for (const file of htmlFiles.filter((f) => fs.existsSync(f))) {
  const html = fs.readFileSync(file, 'utf8')
  for (const m of html.matchAll(/href="(\/[^"]*)"/g)) {
    const href = m[1]
    if (routeExists(href)) continue
    if (!deadLinks.has(href)) deadLinks.set(href, new Set())
    deadLinks.get(href).add(rel(file))
  }
}
if (deadLinks.size) {
  console.log(`  ! ${deadLinks.size} 个站内路径在产物中不存在（可能是动态路由或坏链）：`)
  for (const [href, from] of [...deadLinks].slice(0, 15)) {
    console.log(`    ${href}  ← ${[...from].slice(0, 3).join(', ')}`)
  }
  if (deadLinks.size > 15) console.log(`    …另有 ${deadLinks.size - 15} 个`)
} else {
  ok('所有站内链接均有对应产物')
}

console.log('')
if (failures) {
  console.error(`✗ 产物校验未通过：${failures} 项失败。请修复后再部署。\n`)
  process.exit(1)
}
console.log('✓ 产物校验通过。\n')
