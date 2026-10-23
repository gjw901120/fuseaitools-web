/**
 * Wan 图像 bbox_list 编辑逻辑（从 WanTool.vue 抽出）
 *
 * formData 由调用方传入同一个 reactive 对象，本组合式函数直接在 formData.bboxPerImage 上读写；
 * 返回的状态与事件处理函数全部供模板直接使用，不改变原有行为。
 */
import { ref, reactive, computed, watch, nextTick } from 'vue'

export function useWanBbox(formData, hasImageInput, showError) {
  const bboxActiveImageIdx = ref(0)
  const bboxThumbSizeByIdx = reactive({})

  function onBboxThumbLoad(e, idx) {
    const el = e?.target
    if (el instanceof HTMLImageElement && el.naturalWidth) {
      bboxThumbSizeByIdx[idx] = { w: el.naturalWidth, h: el.naturalHeight }
    }
  }

  const activeImageBboxCount = computed(() => (formData.bboxPerImage[bboxActiveImageIdx.value] || []).length)

  function syncBboxPerImageToImages() {
    const len = formData.imageUrls.length
    while (formData.bboxPerImage.length < len) formData.bboxPerImage.push([])
    if (formData.bboxPerImage.length > len) formData.bboxPerImage.splice(len)
    if (bboxActiveImageIdx.value >= len) bboxActiveImageIdx.value = Math.max(0, len - 1)
  }

  watch(
    () => formData.imageUrls.length,
    () => {
      syncBboxPerImageToImages()
    },
    { immediate: true }
  )

  const bboxModalOpen = ref(false)
  const bboxModalImageIdx = ref(0)
  /** @type {import('vue').Ref<number | null>} */
  const bboxModalEditIdx = ref(null)
  const bboxModalCanvasRef = ref(null)
  const bboxModalNaturalW = ref(0)
  const bboxModalNaturalH = ref(0)
  /** @type {import('vue').Ref<number[] | null>} */
  const bboxDraft = ref(null)

  let bboxModalImg = null
  let bboxCreating = false
  /** @type {{ x: number, y: number } | null} */
  let bboxDragStart = null

  watch(hasImageInput, (ok) => {
    if (!ok) bboxModalOpen.value = false
  })

  function normalizeRectCoords(x1, y1, x2, y2) {
    return [
      Math.round(Math.min(x1, x2)),
      Math.round(Math.min(y1, y2)),
      Math.round(Math.max(x1, x2)),
      Math.round(Math.max(y1, y2))
    ]
  }

  function parseBoxRow(row) {
    if (!Array.isArray(row)) return []
    const out = []
    for (const b of row) {
      if (Array.isArray(b) && b.length >= 4) {
        const x1 = Number(b[0])
        const y1 = Number(b[1])
        const x2 = Number(b[2])
        const y2 = Number(b[3])
        if ([x1, y1, x2, y2].every(Number.isFinite)) out.push(normalizeRectCoords(x1, y1, x2, y2))
      }
      if (out.length >= 2) break
    }
    return out
  }

  function applyBboxListFromApi(raw) {
    if (!Array.isArray(raw)) return
    syncBboxPerImageToImages()
    formData.bboxPerImage = formData.imageUrls.map((_, i) => parseBoxRow(raw[i]))
  }

  function buildBboxListForApi() {
    if (!hasImageInput.value) return undefined
    const out = formData.imageUrls.map((_, i) => (formData.bboxPerImage[i] || []).map((b) => [...b]))
    const any = out.some((row) => row.length > 0)
    return any ? out : undefined
  }

  function removeBboxBox(imageIdx, boxIdx) {
    const arr = formData.bboxPerImage[imageIdx]
    if (arr) arr.splice(boxIdx, 1)
  }

  function clearBboxesForActiveImage() {
    const i = bboxActiveImageIdx.value
    if (formData.bboxPerImage[i]) formData.bboxPerImage[i].splice(0, formData.bboxPerImage[i].length)
  }

  function clearAllBboxes() {
    formData.imageUrls.forEach((_, i) => {
      if (!formData.bboxPerImage[i]) formData.bboxPerImage[i] = []
      else formData.bboxPerImage[i].splice(0, formData.bboxPerImage[i].length)
    })
  }

  function openBboxModal(imageIdx, editIdx) {
    const existing = formData.bboxPerImage[imageIdx] || []
    if (editIdx == null && existing.length >= 2) {
      showError('Each image supports at most 2 boxes.')
      return
    }
    bboxModalImageIdx.value = imageIdx
    bboxModalEditIdx.value = editIdx
    bboxDraft.value = null
    bboxCreating = false
    bboxDragStart = null
    bboxModalNaturalW.value = 0
    bboxModalNaturalH.value = 0
    bboxModalImg = null
    bboxModalOpen.value = true

    const url = formData.imageUrls[imageIdx]
    const img = new Image()
    // 不设 crossOrigin：CDN 若未返回 Access-Control-Allow-Origin，anonymous 会导致 CORS 失败；
    // 此处仅用 drawImage 展示与画框，无需读像素，与缩略图 <img> 同源策略一致即可加载。
    img.onload = () => {
      bboxModalImg = img
      bboxModalNaturalW.value = img.naturalWidth
      bboxModalNaturalH.value = img.naturalHeight
      nextTick(() => {
        const c = bboxModalCanvasRef.value
        if (!c || !bboxModalImg) return
        c.width = bboxModalNaturalW.value
        c.height = bboxModalNaturalH.value
        redrawBboxModalCanvas()
      })
    }
    img.onerror = () => {
      showError('Failed to load image for bbox editor')
      bboxModalOpen.value = false
    }
    img.src = url
  }

  function closeBboxModalCancel() {
    onWindowBboxPointerUp()
    bboxModalOpen.value = false
    bboxDraft.value = null
    bboxCreating = false
    bboxDragStart = null
    bboxModalEditIdx.value = null
    bboxModalImg = null
  }

  function clearBboxModalDraft() {
    bboxDraft.value = null
    bboxCreating = false
    bboxDragStart = null
    redrawBboxModalCanvas()
  }

  const bboxDraftValid = computed(() => {
    const d = bboxDraft.value
    if (!d || d.length < 4) return false
    return d[2] - d[0] >= 2 && d[3] - d[1] >= 2
  })

  function canvasPixelFromEvent(e) {
    const canvas = bboxModalCanvasRef.value
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
    return {
      x: clamp(x, 0, canvas.width),
      y: clamp(y, 0, canvas.height)
    }
  }

  function onWindowBboxPointerMove(e) {
    if (!bboxCreating || !bboxDragStart || !bboxModalImg) return
    const p = canvasPixelFromEvent(e)
    bboxDraft.value = normalizeRectCoords(bboxDragStart.x, bboxDragStart.y, p.x, p.y)
    redrawBboxModalCanvas()
  }

  function onWindowBboxPointerUp() {
    bboxCreating = false
    bboxDragStart = null
    window.removeEventListener('mousemove', onWindowBboxPointerMove)
    window.removeEventListener('mouseup', onWindowBboxPointerUp)
  }

  function onBboxCanvasPointerDown(e) {
    if (!bboxModalImg) return
    const p = canvasPixelFromEvent(e)
    bboxCreating = true
    bboxDragStart = p
    bboxDraft.value = [p.x, p.y, p.x, p.y]
    redrawBboxModalCanvas()
    window.addEventListener('mousemove', onWindowBboxPointerMove)
    window.addEventListener('mouseup', onWindowBboxPointerUp)
  }

  function onBboxCanvasPointerUp() {
    onWindowBboxPointerUp()
  }

  function strokeBoxOnCtx(ctx, b, stroke, fill) {
    const [x1, y1, x2, y2] = b
    const w = x2 - x1
    const h = y2 - y1
    if (w <= 0 || h <= 0) return
    if (fill) {
      ctx.fillStyle = fill
      ctx.fillRect(x1, y1, w, h)
    }
    const lw = Math.max(2, Math.round((ctx.canvas?.width || 512) / 256))
    ctx.strokeStyle = stroke
    ctx.lineWidth = lw
    ctx.strokeRect(x1, y1, w, h)
  }

  function redrawBboxModalCanvas() {
    const c = bboxModalCanvasRef.value
    if (!c || !bboxModalImg) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, c.width, c.height)
    ctx.drawImage(bboxModalImg, 0, 0)
    const idx = bboxModalImageIdx.value
    const saved = formData.bboxPerImage[idx] || []
    const editI = bboxModalEditIdx.value
    saved.forEach((b, si) => {
      if (editI != null && si === editI) return
      strokeBoxOnCtx(ctx, b, '#2563eb', 'rgba(37, 99, 235, 0.12)')
      ctx.fillStyle = '#2563eb'
      ctx.font = `${Math.max(12, Math.round(c.width / 48))}px sans-serif`
      ctx.fillText(`Box ${si + 1}`, b[0] + 4, b[1] + Math.max(14, Math.round(c.width / 40)))
    })
    if (bboxDraft.value) strokeBoxOnCtx(ctx, bboxDraft.value, '#ea580c', 'rgba(234, 88, 12, 0.15)')
  }

  function saveBboxModal() {
    if (!bboxDraftValid.value) {
      showError('Drag a rectangle first (min ~2px per side).')
      return
    }
    const norm = normalizeRectCoords(bboxDraft.value[0], bboxDraft.value[1], bboxDraft.value[2], bboxDraft.value[3])
    const i = bboxModalImageIdx.value
    if (!formData.bboxPerImage[i]) formData.bboxPerImage[i] = []
    const edit = bboxModalEditIdx.value
    if (edit != null) {
      formData.bboxPerImage[i].splice(edit, 1, norm)
    } else {
      formData.bboxPerImage[i].push(norm)
    }
    closeBboxModalCancel()
  }

  watch(bboxModalOpen, (open) => {
    if (!open) return
    nextTick(() => {
      if (bboxModalImg && bboxModalCanvasRef.value) {
        const c = bboxModalCanvasRef.value
        c.width = bboxModalNaturalW.value
        c.height = bboxModalNaturalH.value
        redrawBboxModalCanvas()
      }
    })
  })

  return {
    bboxActiveImageIdx,
    bboxThumbSizeByIdx,
    onBboxThumbLoad,
    activeImageBboxCount,
    syncBboxPerImageToImages,
    applyBboxListFromApi,
    buildBboxListForApi,
    removeBboxBox,
    clearBboxesForActiveImage,
    clearAllBboxes,
    openBboxModal,
    closeBboxModalCancel,
    clearBboxModalDraft,
    bboxDraftValid,
    onBboxCanvasPointerDown,
    onBboxCanvasPointerUp,
    saveBboxModal,
    bboxModalOpen,
    bboxModalImageIdx,
    bboxModalNaturalW,
    bboxModalNaturalH,
    bboxModalCanvasRef
  }
}
