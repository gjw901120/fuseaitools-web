/**
 * 全屏媒体预览 Lightbox（命令式，Teleport 到 body 的原生 DOM 实现）
 *
 * 从 components/tools/common/UploadImage.vue 的 previewImage 抽出，供两处复用：
 * 1. 上传组件点击缩略图放大（UploadImage 显式调用 openImageLightbox）；
 * 2. plugins/media-lightbox.client.js 文档级事件委托，
 *    让所有工具工作台（.home-layout--flux）结果区的 <img> 点击即放大，无需逐工具改模板。
 *
 * 移动端手势（图片模式）：双指捏合缩放 / 双击或双触缩放 / 放大后单指平移 /
 * 未放大时下滑关闭；桌面端附加滚轮缩放与 dblclick。全部基于 Pointer Events 统一三端。
 * 视频模式不做手势劫持：内嵌原生 <video controls>，保留浏览器自带的播放与全屏能力。
 */

const MAX_SCALE = 5

function clampScale(s) {
  return Math.max(1, Math.min(MAX_SCALE, s))
}

/** 共用外壳：遮罩 + 安全区关闭按钮 + 背景点击/ESC 关闭 + 锁背景滚动 */
function createShell({ onClose }) {
  const modal = document.createElement('div')
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    z-index: var(--z-lightbox);
  `

  const closeBtn = document.createElement('div')
  closeBtn.style.cssText = `
    position: absolute;
    top: calc(16px + env(safe-area-inset-top, 0px));
    right: calc(16px + env(safe-area-inset-right, 0px));
    width: 44px;
    height: 44px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 20px;
    color: #333;
    touch-action: manipulation;
  `
  closeBtn.setAttribute('role', 'button')
  closeBtn.setAttribute('aria-label', 'Close preview')
  closeBtn.innerHTML = '×'

  modal.appendChild(closeBtn)
  document.body.appendChild(modal)

  const prevBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'

  let closed = false
  const close = () => {
    if (closed) return
    closed = true
    document.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = prevBodyOverflow
    if (modal.parentNode) modal.parentNode.removeChild(modal)
    onClose?.()
  }

  const handleKeydown = (e) => {
    if (e.key === 'Escape') close()
  }
  document.addEventListener('keydown', handleKeydown)

  // 仅点击遮罩背景关闭（内容自身 stopPropagation，见各模式）
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close()
  })
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    close()
  })

  return { modal, close }
}

/**
 * 图片全屏预览：捏合/双击/滚轮缩放 + 平移 + 下滑关闭
 * @param {string} src 图片地址（objectURL 或远端 URL）
 * @param {{ alt?: string, revoke?: boolean }} [opts] revoke=true 时关闭后回收 objectURL
 */
export function openImageLightbox(src, opts = {}) {
  const { alt = 'preview', revoke = false } = opts

  const img = document.createElement('img')
  img.src = src
  img.alt = alt
  img.style.cssText = `
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    will-change: transform;
    touch-action: none;
    user-select: none;
    -webkit-user-drag: none;
    cursor: grab;
  `

  const { modal, close } = createShell({
    onClose: () => {
      if (revoke) URL.revokeObjectURL(src)
    }
  })
  modal.style.cursor = 'zoom-in'
  modal.insertBefore(img, modal.firstChild)

  let scale = 1
  let tx = 0
  let ty = 0
  const pointers = new Map()
  let pinchBaseDist = 0
  let pinchBaseScale = 1
  let panStart = null   // 单指平移（仅放大后）：{ x, y, tx, ty }
  let swipeStart = null // 单指下滑关闭（未放大时）：{ y }
  let lastTapTime = 0

  const applyTransform = () => {
    img.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`
  }
  const zoomIn = () => {
    img.style.transition = 'transform 0.2s ease'
    scale = 2.5
    applyTransform()
    modal.style.cursor = 'default'
    img.style.cursor = 'grabbing'
  }
  const resetZoom = () => {
    scale = 1
    tx = 0
    ty = 0
    img.style.transition = 'transform 0.2s ease'
    applyTransform()
    modal.style.cursor = 'zoom-in'
    img.style.cursor = 'grab'
  }

  img.addEventListener('click', (e) => e.stopPropagation())

  img.addEventListener('dblclick', (e) => {
    e.preventDefault()
    if (scale > 1) resetZoom()
    else zoomIn()
  })

  img.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault()
      img.style.transition = 'none'
      scale = clampScale(scale * (e.deltaY < 0 ? 1.15 : 0.87))
      if (scale === 1) {
        tx = 0
        ty = 0
      }
      applyTransform()
      modal.style.cursor = scale > 1 ? 'default' : 'zoom-in'
    },
    { passive: false }
  )

  img.addEventListener('pointerdown', (e) => {
    img.setPointerCapture?.(e.pointerId)
    img.style.transition = 'none'
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (pointers.size === 2) {
      // 进入捏合缩放，取消平移/下滑意图
      const [a, b] = [...pointers.values()]
      pinchBaseDist = Math.hypot(a.x - b.x, a.y - b.y)
      pinchBaseScale = scale
      panStart = null
      swipeStart = null
    } else if (pointers.size === 1) {
      if (scale > 1) {
        panStart = { x: e.clientX, y: e.clientY, tx, ty }
      } else {
        swipeStart = { y: e.clientY }
      }
    }
  })

  img.addEventListener('pointermove', (e) => {
    if (!pointers.has(e.pointerId)) return
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })

    if (pointers.size === 2 && pinchBaseDist > 0) {
      const [a, b] = [...pointers.values()]
      const dist = Math.hypot(a.x - b.x, a.y - b.y)
      scale = clampScale(pinchBaseScale * (dist / pinchBaseDist))
      if (scale === 1) {
        tx = 0
        ty = 0
      }
      applyTransform()
      return
    }

    if (pointers.size === 1) {
      if (panStart) {
        tx = panStart.tx + (e.clientX - panStart.x)
        ty = panStart.ty + (e.clientY - panStart.y)
        applyTransform()
      } else if (swipeStart) {
        // 只在明显向下时跟手，避免误触
        ty = Math.max(0, e.clientY - swipeStart.y)
        applyTransform()
      }
    }
  })

  const endPointer = (e) => {
    if (!pointers.has(e.pointerId)) return
    pointers.delete(e.pointerId)
    img.releasePointerCapture?.(e.pointerId)

    if (pointers.size < 2) pinchBaseDist = 0

    if (pointers.size === 0) {
      // 下滑关闭判定
      if (swipeStart && scale === 1 && ty > 120) {
        close()
        return
      }
      // 双触缩放（兼容无 dblclick 的触摸端）：轻点且未拖动
      const now = Date.now()
      if (swipeStart && scale === 1 && ty === 0 && now - lastTapTime < 300) {
        zoomIn()
      }
      lastTapTime = now

      panStart = null
      swipeStart = null
      // 回弹：缩放后至少为 1，否则归位
      if (scale <= 1.02) {
        resetZoom()
      } else {
        img.style.transition = 'none'
        applyTransform()
      }
    }
  }
  img.addEventListener('pointerup', endPointer)
  img.addEventListener('pointercancel', endPointer)
}

/**
 * 视频全屏预览：内嵌原生 controls 播放器，不做手势劫持；
 * 供工具显式调用（如自定义「放大」按钮），事件委托插件不对 <video> 生效。
 * @param {string} src 视频地址
 * @param {{ poster?: string, autoplay?: boolean }} [opts]
 */
export function openVideoLightbox(src, opts = {}) {
  const { poster = '', autoplay = true } = opts

  const video = document.createElement('video')
  video.src = src
  if (poster) video.poster = poster
  video.controls = true
  video.playsInline = true
  if (autoplay) video.autoplay = true
  video.style.cssText = `
    max-width: 94%;
    max-height: 86vh;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    background: #000;
  `

  // 关闭由 shell 的背景/按钮/ESC 统一处理，此处仅需 modal 引用与 onClose 回收播放器
  const { modal } = createShell({
    onClose: () => {
      video.pause()
      video.removeAttribute('src')
      video.load()
    }
  })
  modal.insertBefore(video, modal.firstChild)

  // 移动端返回手势之外，双击遮罩也可快速关闭桌面用户习惯
  video.addEventListener('click', (e) => e.stopPropagation())
}

/**
 * 组合式入口（自动导入）：返回两个打开方法，调用方按需解构。
 * lightbox 为无状态命令式实现，可全局直接调用。
 */
export function useMediaLightbox() {
  return { openImageLightbox, openVideoLightbox }
}
