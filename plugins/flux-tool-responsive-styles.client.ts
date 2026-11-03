/**
 * 将工具工作台响应式布局样式注入到 document.head 末尾，覆盖各 *Tool.vue / HomeLayout 的
 * scoped 桌面布局（固定视口高度、嵌套滚动、多列网格）。
 *
 * 文件名排在 flux-tool-form-styles.client.ts 之后，注入亦在其后，
 * 故与配色覆盖层同类名冲突时本层布局规则胜出。
 */
import fluxToolResponsive from '@/assets/css/flux-tool-responsive.css?inline'

const STYLE_ID = 'flux-tool-responsive'

function appendFluxResponsiveStyles() {
  if (typeof document === 'undefined') return

  const el = document.getElementById(STYLE_ID) as HTMLStyleElement | null
  if (el) {
    // 重新排到 head 末尾，确保晚于异步加载的工具组件 CSS
    document.head.appendChild(el)
    return
  }

  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = fluxToolResponsive
  document.head.appendChild(style)
}

export default defineNuxtPlugin((nuxtApp) => {
  const route = useRoute()

  // 仅工具页（/home 及其子路由）需要，营销/资讯页注入是纯浪费
  const isToolRoute = (path: string) => path === '/home' || path.startsWith('/home/')

  const sync = () => {
    if (isToolRoute(route.path)) appendFluxResponsiveStyles()
  }

  sync()
  nuxtApp.hook('page:finish', sync)
})
