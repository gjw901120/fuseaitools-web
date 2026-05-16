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
  appendFluxFormStyles()

  nuxtApp.hook('page:finish', () => {
    appendFluxFormStyles()
  })
})
