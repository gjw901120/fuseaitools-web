/**
 * 路由登记自检：对比 pages/home 下的实际路由与三张 SEO 登记表 + 首页入口
 * 用法：node scripts/check-route-registry.mjs
 *
 * 三张登记表（详见 docs/NEW_MODEL_CHECKLIST.md 第 6.7 节）：
 *   - server/routes/sitemap.xml.js  → staticPages 的 loc 列表
 *   - nuxt.config.js                → nitro.prerender.routes
 *   - utils/toolBreadcrumbs.js      → CHILD_LABEL_OVERRIDES_BY_ROUTE
 *
 * 外加首页「100+ AI Models」画廊（components/ImageGallery.vue）的入口卡片：它是硬编码的四行
 * 分类列表，历史上多次出现「工具页与三张表都齐了、画廊漏加」——用户从首页点不进新工具，
 * 而只看登记表的闸门完全发现不了（Grok Chat / Kimi 上线时就是这样漏掉的）。
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const PAGES_HOME = path.join(ROOT, 'pages', 'home')

/** 收集 pages/home 下的全部路由（index.vue -> 目录本身；支持嵌套目录） */
function collectRoutes(dir, prefix = '/home') {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      out.push(...collectRoutes(full, `${prefix}/${entry.name}`))
    } else if (entry.name.endsWith('.vue')) {
      const seg = entry.name.replace(/\.vue$/, '')
      out.push(seg === 'index' ? prefix : `${prefix}/${seg}`)
    }
  }
  return out
}

const REGISTERS = [
  { key: 'sitemap', file: 'server/routes/sitemap.xml.js', minSegments: 3 },
  { key: 'prerender', file: 'nuxt.config.js', minSegments: 3 },
  // 面包屑只需三级工具页（/home/{tool}/{child}）
  { key: 'breadcrumb', file: 'utils/toolBreadcrumbs.js', minSegments: 3 }
]

const routes = [...new Set(collectRoutes(PAGES_HOME))].sort()
let missingTotal = 0

/** 工具父页 slug（pages/home/{slug}.vue，即画廊与 footer 链接的落地页） */
const overviewSlugs = fs
  .readdirSync(PAGES_HOME)
  .filter((f) => f.endsWith('.vue') && f !== 'index.vue')
  .map((f) => f.replace(/\.vue$/, ''))

for (const { key, file, minSegments } of REGISTERS) {
  const text = fs.readFileSync(path.join(ROOT, file), 'utf8')
  const missing = routes
    .filter((r) => r.split('/').filter(Boolean).length >= minSegments)
    .filter((r) => !text.includes(`'${r}'`) && !text.includes(`"${r}"`))
  missingTotal += missing.length
  console.log(`\n[${key}] ${file} — 缺 ${missing.length} 条`)
  missing.forEach((r) => console.log(`  - ${r}`))
}

const GALLERY_FILE = 'components/ImageGallery.vue'
const galleryText = fs.readFileSync(path.join(ROOT, GALLERY_FILE), 'utf8')
const gallerySlugs = new Set([...galleryText.matchAll(/route:\s*'\/home\/([a-z0-9-]+)'/g)].map((m) => m[1]))
const notInGallery = overviewSlugs.filter((s) => !gallerySlugs.has(s))
const galleryWithoutPage = [...gallerySlugs].filter((s) => !overviewSlugs.includes(s))

console.log(`\n[gallery] ${GALLERY_FILE} — 缺 ${notInGallery.length} 条、悬空 ${galleryWithoutPage.length} 条`)
notInGallery.forEach((s) => console.log(`  - /home/${s} 有工具父页，但首页画廊没有入口卡片`))
galleryWithoutPage.forEach((s) => console.log(`  - 首页画廊链到 /home/${s}，但没有 pages/home/${s}.vue`))
missingTotal += notInGallery.length + galleryWithoutPage.length

console.log(`\n共 ${routes.length} 条 pages/home 路由（其中 ${overviewSlugs.length} 个工具父页），未登记合计 ${missingTotal} 条。`)
if (missingTotal > 0) {
  console.error('\n路由登记不完整：新增/删除工具页时，请同步 sitemap、prerender、面包屑三张登记表，并在首页画廊 components/ImageGallery.vue 对应分类行加入口。')
  process.exit(1)
}
console.log('路由登记表校验通过。\n')
