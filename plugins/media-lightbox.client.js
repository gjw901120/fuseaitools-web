/**
 * 工具结果图「点击放大」全局委托插件
 *
 * 不逐工具改模板：在 document 上做事件委托，命中工作台（.home-layout--flux，
 * HomeLayout 根节点恒定携带）结果区的 <img> 即打开 useMediaLightbox 全屏预览，
 * 一次性覆盖全部 21 个工具的图片结果。
 *
 * 排除项（保留各自交互语义）：
 * - <a> / <button> 内的图：如 Midjourney 变体选择 tile 整体是 button；
 * - .config-panel 内的图：上传缩略图由 UploadImage 自己的 .file-preview click 处理；
 * - .tool-header / .timeline-container：工具 logo、记录图标等装饰图；
 * - 渲染尺寸 < 64px 的图：兜底过滤图标类小图；
 * - <video> 不劫持单击（与原生播放/暂停冲突），移动端/桌面端均已有原生全屏按钮；
 *   需要自定义放大入口的工具可显式调用 openVideoLightbox。
 */
import { openImageLightbox } from '~/composables/useMediaLightbox'

export default defineNuxtPlugin(() => {
  const onClick = (e) => {
    // 业务处理器已消费该事件（preventDefault）则让位
    if (e.defaultPrevented) return

    const el = e.target
    if (!(el instanceof Element)) return
    const img = el.closest('img')
    if (!img) return
    if (!img.closest('.home-layout--flux')) return
    if (img.closest('a, button, .config-panel, .tool-header, .timeline-container')) return

    const rect = img.getBoundingClientRect()
    if (rect.width < 64 || rect.height < 64) return

    const src = img.currentSrc || img.src
    if (!src || src === 'about:blank') return

    openImageLightbox(src, { alt: img.alt || 'Result preview' })
  }

  document.addEventListener('click', onClick)

  const nuxtApp = useNuxtApp()
  nuxtApp.hook('app:destroy', () => {
    document.removeEventListener('click', onClick)
  })
})
