/**
 * 路由登记自检：对比 pages/home/**\/*.vue 的实际路由与三张 SEO 登记表
 * 用法：node scripts/check-route-registry.mjs
 *
 * 三张登记表（详见 docs/NEW_MODEL_CHECKLIST.md 第 6.7 节）：
 *   - server/routes/sitemap.xml.js  → staticPages 的 loc 列表
 *   - nuxt.config.js                → nitro.prerender.routes
 *   - utils/toolBreadcrumbs.js      → CHILD_LABEL_OVERRIDES_BY_ROUTE
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

for (const { key, file, minSegments } of REGISTERS) {
  const text = fs.readFileSync(path.join(ROOT, file), 'utf8')
  const missing = routes
    .filter((r) => r.split('/').filter(Boolean).length >= minSegments)
    .filter((r) => !text.includes(`'${r}'`) && !text.includes(`"${r}"`))
  missingTotal += missing.length
  console.log(`\n[${key}] ${file} — 缺 ${missing.length} 条`)
  missing.forEach((r) => console.log(`  - ${r}`))
}

console.log(`\n共 ${routes.length} 条 pages/home 路由，未登记合计 ${missingTotal} 条。`)
console.log('注：孤儿旧别名页与 chat 工具页（无 TOOL_PARENT_LABEL_BY_SLUG 映射）可保留为“缺”。\n')
