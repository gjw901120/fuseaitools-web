/**
 * 将 pricing / news / about 深色样式注入到 document.head 末尾，覆盖页面 scoped 浅色样式。
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
  appendFluxContentStyles()

  nuxtApp.hook('page:finish', () => {
    appendFluxContentStyles()
  })
})
