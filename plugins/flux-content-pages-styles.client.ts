/**
 * 将 pricing / news / about / credits 深色样式注入到 document.head 末尾，覆盖页面 scoped 浅色样式。
 */
import fluxContentPagesCss from '@/assets/css/flux-content-pages.css?inline'

const STYLE_ID = 'flux-content-pages-overrides'

function appendFluxContentStyles() {
  if (typeof document === 'undefined') return

  let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null
  if (!el) {
    el = document.createElement('style')
    el.id = STYLE_ID
    el.textContent = fluxContentPagesCss
    document.head.appendChild(el)
  } else {
    document.head.appendChild(el)
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const route = useRoute()

  // 只有这几个页面需要覆盖，工具页注入纯属浪费（样式重算 + 无意义的 DOM 追加）
  const CONTENT_ROUTE_PREFIXES = ['/pricing', '/about', '/news', '/credits']
  const isContentRoute = (path: string) =>
    CONTENT_ROUTE_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))

  const sync = () => {
    if (isContentRoute(route.path)) appendFluxContentStyles()
  }

  sync()
  nuxtApp.hook('page:finish', sync)
})
