/**
 * 将工具表单深色样式注入到 document.head 末尾，覆盖各 *Tool.vue 的 scoped 浅色输入框。
 * 在每次路由切换后重新 append，确保晚于异步加载的组件 CSS。
 */
import fluxToolFormOverrides from '@/assets/css/flux-tool-form-overrides.css?inline'

const STYLE_ID = 'flux-tool-form-overrides'

function appendFluxFormStyles() {
  if (typeof document === 'undefined') return

  let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null
  if (!el) {
    el = document.createElement('style')
    el.id = STYLE_ID
    el.textContent = fluxToolFormOverrides
    document.head.appendChild(el)
  } else {
    document.head.appendChild(el)
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const route = useRoute()

  // 只有工具页（/home 及其子路由）需要覆盖，营销页/资讯页注入是纯浪费
  const isToolRoute = (path: string) => path === '/home' || path.startsWith('/home/')

  const sync = () => {
    if (isToolRoute(route.path)) appendFluxFormStyles()
  }

  sync()
  // 工具组件已改异步加载，其 CSS 可能晚于本插件到达，路由切换后需重新排到 head 末尾
  nuxtApp.hook('page:finish', sync)
})
