<template>
  <div class="seedream-tool">
    <div class="tool-header">
      <div class="tool-avatar">
        <img src="/tools-logo/Seedream.png" alt="Seedream" />
      </div>
      <div class="tool-details">
        <h3>Seedream</h3>
        <p class="tool-description">Seedream 5 Lite is ByteDance's multimodal image model on FuseAITools—text-to-image and image-to-image at 2K/3K. Pair with <strong>Seedance</strong> to turn stills into video clips.</p>
      </div>
    </div>

    <div class="mode-tabs-wrap">
      <div class="mode-tabs">
        <div
          class="mode-tab"
          :class="{ active: mode === '5-lite-text-to-image' }"
          @click="goToTab('5-lite-text-to-image')"
        >
          <i class="fas fa-font"></i>
          <span>5 Lite Text to Image</span>
        </div>
        <div
          class="mode-tab"
          :class="{ active: mode === '5-lite-image-to-image' }"
          @click="goToTab('5-lite-image-to-image')"
        >
          <i class="fas fa-image"></i>
          <span>5 Lite Image to Image</span>
        </div>
      </div>
    </div>

    <div class="main-content">
      <div class="config-panel">
        <div class="config-header">
          <h4>Configuration</h4>
        </div>
        <form class="config-form" @submit.prevent="generate">
          <fieldset class="config-fieldset" :disabled="isGenerating || isDetailView">
            <div class="form-group">
              <label for="seedream-prompt" class="form-label">
                Prompt <span class="required">*</span>
              </label>
              <textarea
                id="seedream-prompt"
                v-model="formData.prompt"
                class="form-input"
                rows="4"
                placeholder="A text description of the image you want to generate"
                :maxlength="mode === '5-lite-image-to-image' ? 2996 : 2995"
                required
              ></textarea>
              <div class="char-count" v-if="formData.prompt">
                {{ formData.prompt.length }}/{{ mode === '5-lite-image-to-image' ? 2996 : 2995 }}
              </div>
            </div>

            <div v-if="mode === '5-lite-image-to-image'" class="form-group">
              <label class="form-label">
                Image(s) <span class="required">*</span>
              </label>
              <UploadImage
                ref="imageUploadRef"
                input-id="seedream-image-upload"
                label=""
                upload-text="Click to upload image(s)"
                upload-hint="JPEG, PNG, WebP; max 10MB each"
                :max-files="5"
                :max-file-size="10 * 1024 * 1024"
                accept="image/jpeg,image/png,image/webp"
                :multiple="true"
                @update:files="handleImageFiles"
              />
              <span v-if="isUploadingImages" class="form-hint">Uploading...</span>
              <div v-if="isDetailView && mode === '5-lite-image-to-image' && formData.imageUrls?.length" class="detail-ref-urls">
                <span class="form-label">Input images (this task)</span>
                <div class="detail-ref-urls-links">
                  <a
                    v-for="(u, idx) in formData.imageUrls"
                    :key="idx"
                    :href="u"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="detail-ref-link"
                  >Image {{ idx + 1 }}</a>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Aspect Ratio <span class="required">*</span></label>
              <div class="tab-group">
                <button type="button" class="tab-option" :class="{ active: formData.aspectRatio === '1:1' }" @click="formData.aspectRatio = '1:1'"><span>1:1</span></button>
                <button type="button" class="tab-option" :class="{ active: formData.aspectRatio === '4:3' }" @click="formData.aspectRatio = '4:3'"><span>4:3</span></button>
                <button type="button" class="tab-option" :class="{ active: formData.aspectRatio === '3:4' }" @click="formData.aspectRatio = '3:4'"><span>3:4</span></button>
                <button type="button" class="tab-option" :class="{ active: formData.aspectRatio === '16:9' }" @click="formData.aspectRatio = '16:9'"><span>16:9</span></button>
                <button type="button" class="tab-option" :class="{ active: formData.aspectRatio === '9:16' }" @click="formData.aspectRatio = '9:16'"><span>9:16</span></button>
                <button type="button" class="tab-option" :class="{ active: formData.aspectRatio === '2:3' }" @click="formData.aspectRatio = '2:3'"><span>2:3</span></button>
                <button type="button" class="tab-option" :class="{ active: formData.aspectRatio === '3:2' }" @click="formData.aspectRatio = '3:2'"><span>3:2</span></button>
                <button type="button" class="tab-option" :class="{ active: formData.aspectRatio === '21:9' }" @click="formData.aspectRatio = '21:9'"><span>21:9</span></button>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Quality <span class="required">*</span></label>
              <div class="tab-group">
                <button type="button" class="tab-option" :class="{ active: formData.quality === 'basic' }" @click="formData.quality = 'basic'">Basic (2K)</button>
                <button type="button" class="tab-option" :class="{ active: formData.quality === 'high' }" @click="formData.quality = 'high'">High (3K)</button>
              </div>
              <div class="form-hint">Basic outputs 2K; High outputs 3K.</div>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn-primary" :disabled="!canGenerate || isGenerating || isDetailView">
                <i v-if="isGenerating" class="fas fa-spinner fa-spin"></i>
                <i v-else class="fas fa-magic"></i>
                {{ isGenerating ? 'Generating...' : 'Generate Image' }}
                <span v-if="seedreamPriceText" class="price-tag">{{ seedreamPriceText }}</span>
              </button>
            </div>
          </fieldset>
        </form>
      </div>

      <div class="result-panel">
        <div class="image-container">
          <div v-if="!isDetailView && route.path === '/home/seedream/5-lite-text-to-image'" class="tutorial-showcase">
            <p class="tutorial-showcase-title">🎨 Tutorial Showcase</p>
            <div class="tutorial-showcase-links">
              <a href="https://fuseaitools.com/news/seedream-abstract-tech-blog-cover-tutorial" target="_blank" rel="noopener noreferrer" class="tutorial-link">Abstract tech blog cover — Seedream 5 Lite tutorial</a>
              <a href="https://fuseaitools.com/news/seedream-vertical-social-story-cover-tutorial" target="_blank" rel="noopener noreferrer" class="tutorial-link">Vertical social story cover — Seedream 5 Lite tutorial</a>
            </div>
          </div>

          <div v-if="!isDetailView && route.path === '/home/seedream/5-lite-image-to-image'" class="tutorial-showcase">
            <p class="tutorial-showcase-title">🎨 Tutorial Showcase</p>
            <div class="tutorial-showcase-links">
              <a href="https://fuseaitools.com/news/seedream-nezha-first-last-frame-tutorial" target="_blank" rel="noopener noreferrer" class="tutorial-link">First &amp; last frame images for video (Nezha &amp; Ao Bing sprint) — Seedream 5 Lite</a>
            </div>
          </div>

          <div class="image-container-main">
            <div v-if="isDetailView && Number(detailData?.status) === 3" class="detail-failure-state">
              <div class="failure-icon"><i class="fas fa-exclamation-circle"></i></div>
              <p class="failure-message">Generation failed. You can try again with different parameters.</p>
            </div>
            <div v-else-if="isDetailView && (!detailData || [0, 1].includes(Number(detailData.status)))" class="detail-loading-state">
              <i class="fas fa-spinner fa-spin detail-spinner"></i>
              <p>Generating...</p>
            </div>
            <div v-else-if="!displayResult" class="empty-state">
              <h4>No image generated yet</h4>
              <p>Fill in the form and click "Generate Image" to start.</p>
            </div>
            <div v-else class="result-display">
              <div class="image-result">
                <img v-if="displayResult.imageUrl" :src="displayResult.imageUrl" alt="Generated" class="result-image" />
                <div v-else class="image-placeholder">
                  <i class="fas fa-spinner fa-spin"></i>
                  <p>Generating...</p>
                </div>
                <div v-if="displayResult.imageUrl" class="image-actions">
                  <button @click="downloadImage" class="action-btn">
                    <i class="fas fa-download"></i> Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import UploadImage from './common/UploadImage.vue'
import { useToast } from '~/composables/useToast'
import { useApi } from '~/composables/useApi'
import { useRecordPolling } from '~/composables/useRecordPolling'
import { useModelPrice } from '~/composables/useModelPrice'

const router = useRouter()
const route = useRoute()
const { showError } = useToast()
const { post } = useApi()
const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling()
const { fetchPrices, getPrice, formatCredits, discount } = useModelPrice()
onMounted(() => { fetchPrices() })
const batchUploadUrl = useBatchUploadUrl()
const { getUrlsForFiles } = useFileUploadUrlCache()

const modeTabToPath = {
  '5-lite-text-to-image': '/home/seedream/5-lite-text-to-image',
  '5-lite-image-to-image': '/home/seedream/5-lite-image-to-image'
}
const pathToMode = {
  '/home/seedream/5-lite-text-to-image': '5-lite-text-to-image',
  '/home/seedream/5-lite-image-to-image': '5-lite-image-to-image',
  // 旧 URL（若未触发 Nitro 301，仍同步 tab）
  '/home/seedream/1-5-lite-text-to-image': '5-lite-text-to-image',
  '/home/seedream/2-5-lite-image-to-image': '5-lite-image-to-image'
}

const mode = ref('5-lite-text-to-image')
function goToTab(m) {
  mode.value = m
  router.push(modeTabToPath[m] || modeTabToPath['5-lite-text-to-image'])
}

watch(() => route.path, (path) => {
  const m = pathToMode[path]
  if (m && mode.value !== m) mode.value = m
}, { immediate: true })

const formData = reactive({
  prompt: '',
  imageUrls: [],
  aspectRatio: '1:1',
  quality: 'basic'
})

// 折扣文本
const discountText = computed(() => {
  const rate = Number(discount?.value ?? 1)
  if (Number.isNaN(rate) || rate <= 0 || rate === 1) return ''
  const percent = (rate * 100).toFixed(0)
  return ` · ${percent}%`
})

// 价格：按 mode 取 modelKey，可选按 aspectRatio + quality 匹配 RULE
const seedreamPriceModelKeyMap = {
  '5-lite-text-to-image': 'seedream-5-lite-text-to-image',
  '5-lite-image-to-image': 'seedream-5-lite-image-to-image'
}
const seedreamPriceText = computed(() => {
  const modelKey = seedreamPriceModelKeyMap[mode.value]
  if (!modelKey) return ''
  const credits = getPrice(modelKey, {
    aspectRatio: formData.aspectRatio,
    quality: formData.quality
  })
  const str = formatCredits(credits)
  if (!str) return ''
  return `· ${str} credits${discountText.value}`
})

const imageUploadRef = ref(null)
const isUploadingImages = ref(false)
const result = ref(null)
const isGenerating = ref(false)
const routeRecordId = computed(() => route.query['record-id'] || '')
const isDetailView = computed(() => !!routeRecordId.value)
const detailData = ref(null)

const getAuthToken = () => {
  if (!import.meta.client) return null
  try {
    return localStorage.getItem('auth_token')
  } catch {
    return null
  }
}

async function uploadFilesToUrls(files) {
  if (!files?.length) return []
  const form = new FormData()
  files.forEach(f => form.append('file', f))
  const headers = { Accept: 'application/json' }
  const token = getAuthToken()
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(batchUploadUrl, {
    method: 'POST',
    headers,
    body: form,
    credentials: 'include'
  })
  const data = await parseBatchUploadFetchResponse(res)
  const urls = data?.data?.urls || data?.fileUrls || (Array.isArray(data?.data) ? data.data : [])
  return Array.isArray(urls) ? urls : []
}

async function handleImageFiles(files) {
  if (!files?.length) {
    formData.imageUrls = []
    return
  }
  const list = Array.isArray(files) ? files : [files]
  isUploadingImages.value = true
  try {
    formData.imageUrls = await getUrlsForFiles(list, uploadFilesToUrls)
  } catch (e) {
    showError(e?.message || 'Upload failed')
    formData.imageUrls = []
    imageUploadRef.value?.clearFiles?.()
  } finally {
    isUploadingImages.value = false
  }
}

const maxPromptLen = computed(() => mode.value === '5-lite-image-to-image' ? 2996 : 2995)
const canGenerate = computed(() => {
  const p = (formData.prompt || '').trim()
  if (!p || p.length > maxPromptLen.value) return false
  if (mode.value === '5-lite-image-to-image') return formData.imageUrls.length > 0
  return true
})

function fillFormFromOriginalData(o) {
  if (!o || typeof o !== 'object') return
  if (o.prompt != null) formData.prompt = String(o.prompt)
  if (o.aspectRatio) formData.aspectRatio = String(o.aspectRatio)
  if (o.quality) formData.quality = String(o.quality)
  if (Array.isArray(o.imageUrls)) formData.imageUrls = [...o.imageUrls]
  else if (Array.isArray(o.image_urls)) formData.imageUrls = [...o.image_urls]
}

function pickDetailImageUrl(d) {
  if (!d || typeof d !== 'object') return ''
  let url = d.outputUrl || d.imageUrl
  if (url) return typeof url === 'string' ? url : url?.url || ''
  const ou = d.outputUrls
  if (typeof ou === 'string' && ou) return ou
  if (Array.isArray(ou) && ou.length) {
    const first = ou[0]
    return typeof first === 'string' ? first : first?.url || ''
  }
  return ''
}

const displayResult = computed(() => {
  if (isDetailView.value && detailData.value && Number(detailData.value.status) === 2) {
    const url = pickDetailImageUrl(detailData.value)
    if (url) return { imageUrl: url }
  }
  return result.value
})

async function loadDetailByRecordId(recordId) {
  if (!recordId || routeRecordId.value !== recordId) return
  detailData.value = null
  try {
    let data = await fetchRecordDetailOnce(recordId)
    if (routeRecordId.value !== recordId) return
    detailData.value = data || null
    if (data?.originalData) fillFormFromOriginalData(data.originalData)
    const status = Number(data?.status)
    if (data == null || status === 0 || status === 1) {
      const res = await pollRecordByStatus(recordId, { getIsCancelled: () => routeRecordId.value !== recordId })
      if (routeRecordId.value === recordId) {
        detailData.value = res
        if (res?.originalData) fillFormFromOriginalData(res.originalData)
      }
    }
  } catch (e) { console.error('Seedream load record detail failed:', e) }
}
watch(() => route.query['record-id'], (recordId) => {
  if (recordId) loadDetailByRecordId(recordId)
  else detailData.value = null
}, { immediate: true })

async function generate() {
  if (!canGenerate.value) return
  const p = (formData.prompt || '').trim()
  isGenerating.value = true
  try {
    const isTextMode = mode.value === '5-lite-text-to-image'
    const apiPath = isTextMode
      ? '/api/image/seedream/lite-text-to-image'
      : '/api/image/seedream/lite-image-to-image'
    const body = {
      model: isTextMode ? 'seedream-5-lite-text-to-image' : 'seedream-5-lite-image-to-image',
      prompt: p,
      aspectRatio: formData.aspectRatio,
      quality: formData.quality
    }
    if (!isTextMode) body.imageUrls = formData.imageUrls

    const data = await post(apiPath, body)
    const rid = data?.recordId ?? data?.data?.recordId
    if (rid) {
      router.push((modeTabToPath[mode.value] || '/home/seedream/5-lite-text-to-image') + '?record-id=' + encodeURIComponent(rid))
      return
    }
    const url = data?.imageUrl ?? data?.outputUrl ?? (Array.isArray(data?.outputUrls) && data.outputUrls?.length ? data.outputUrls[0] : null)
    result.value = url ? { imageUrl: url } : data
  } catch (err) {
    if (!err?.__fromApi) showError(err?.message || 'Generation failed')
  } finally {
    isGenerating.value = false
  }
}

function downloadImage() {
  if (displayResult.value?.imageUrl) {
    const a = document.createElement('a')
    a.href = displayResult.value.imageUrl
    a.download = `seedream-${Date.now()}.png`
    a.click()
  }
}

watch(mode, (m) => {
  const path = modeTabToPath[m]
  if (path && route.path !== path) router.replace(path)
})
</script>

<style scoped>
.seedream-tool {
  width: 100%;
  height: 100%;
  padding: 20px;
  background: var(--flux-card);
  border-radius: 16px;
  border: 1px solid var(--flux-border);
  box-shadow: 0 8px 32px hsla(0, 0%, 0%, 0.25);
  display: flex;
  flex-direction: column;
}
.tool-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--flux-border);
  margin-bottom: 20px;
}
.tool-avatar { width: 48px; height: 48px; border-radius: 12px; overflow: hidden; flex-shrink: 0; border: 1px solid var(--flux-border); }
.tool-avatar img { width: 100%; height: 100%; object-fit: cover; }
.tool-details h3 { margin: 0 0 4px 0; font-size: 20px; font-weight: 600; color: var(--flux-foreground); }
.tool-details p { margin: 0; font-size: 13px; color: var(--flux-muted); line-height: 1.5; }
.tool-details p.tool-description { line-height: 1.55; }

.mode-tabs-wrap {
  padding-bottom: 20px;
  border-bottom: 1px solid var(--flux-border);
  margin-bottom: 20px;
}
.mode-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 0;
}
.mode-tab {
  padding: 9px 14px;
  border: 1px solid var(--flux-border);
  background: var(--flux-bg-elevated);
  color: var(--flux-muted);
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}
.mode-tab:hover {
  border-color: var(--flux-primary);
  color: var(--flux-primary);
}
.mode-tab.active {
  background: var(--flux-primary);
  color: var(--flux-foreground);
  border-color: var(--flux-primary);
}
.mode-tab i { font-size: 1em; margin-bottom: 0; }
.mode-tab span { font-weight: 500; }

.main-content { display: flex; flex: 1; min-height: 0; gap: 20px; }
.config-panel {
  width: 35%;
  background: var(--flux-bg-elevated);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid var(--flux-border);
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.config-header { margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid var(--flux-border); }
.config-header h4 { margin: 0; font-size: 18px; font-weight: 600; color: var(--flux-foreground); }
.config-fieldset { border: none; margin: 0; padding: 0; }
.config-fieldset:disabled { opacity: 0.65; }
.config-form { display: flex; flex-direction: column; gap: 16px; flex: 1; overflow-y: auto; }

.form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 24px; }
.form-group:last-of-type { margin-bottom: 0; }
.form-label { font-size: 14px; font-weight: 500; color: var(--flux-foreground); }
.required { color: var(--flux-destructive); }
.form-input {
  padding: 10px 12px;
  border: 1px solid var(--flux-border);
  border-radius: 8px;
  font-size: 14px;
  background: var(--flux-input-bg);
  color: var(--flux-foreground);
  resize: vertical;
}
.form-input::placeholder { color: var(--flux-muted); }
.form-input:focus {
  outline: none;
  border-color: var(--flux-primary);
  box-shadow: 0 0 0 3px var(--flux-primary-muted);
}
.form-hint { font-size: 12px; color: var(--flux-muted); line-height: 1.4; }
.char-count { font-size: 12px; color: var(--flux-muted); text-align: right; }

.tab-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
}
.tab-option {
  flex: 1;
  min-width: 60px;
  padding: 10px 12px;
  border: 1px solid var(--flux-border);
  border-radius: 6px;
  background: var(--flux-input-bg);
  color: var(--flux-muted);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.tab-option:hover {
  background: var(--flux-card-hover);
  border-color: var(--flux-primary);
  color: var(--flux-primary);
}
.tab-option.active {
  background: var(--flux-primary);
  border-color: var(--flux-primary);
  color: var(--flux-foreground);
}

.form-actions { margin-top: 24px; padding-bottom: 20px; }
.price-tag { font-size: 15px; opacity: 0.85; margin-left: 4px; }
.btn-primary {
  width: 100%;
  padding: 16px;
  background: var(--flux-gradient);
  color: var(--flux-foreground);
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px var(--flux-primary-glow);
}
.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.result-panel {
  width: 65%;
  background: var(--flux-bg-elevated);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid var(--flux-border);
  min-height: 400px;
  display: flex;
  flex-direction: column;
}
.image-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  min-height: 0;
}
.image-container-main {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
.tutorial-showcase {
  border: 1px solid var(--flux-border);
  border-radius: 10px;
  background: var(--flux-card);
  padding: 12px 14px;
}
.tutorial-showcase-title {
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--flux-foreground);
}
.tutorial-showcase-links {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.tutorial-showcase-links .tutorial-link {
  color: var(--flux-primary);
  text-decoration: none;
  font-size: 13px;
}
.tutorial-showcase-links .tutorial-link:hover {
  text-decoration: underline;
}
.detail-ref-urls {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.detail-ref-urls-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.detail-ref-link {
  font-size: 13px;
  color: var(--flux-primary);
  text-decoration: none;
}
.detail-ref-link:hover {
  text-decoration: underline;
}
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
  color: var(--flux-muted);
  gap: 16px;
}
.empty-state h4 { margin: 0; font-size: 18px; color: var(--flux-foreground); }
.image-result { display: flex; flex-direction: column; gap: 16px; }
.result-image { max-width: 100%; height: auto; border-radius: 8px; display: block; border: 1px solid var(--flux-border); }
.image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: var(--flux-muted);
}
.image-actions { display: flex; gap: 8px; }
.action-btn {
  background: var(--flux-card);
  color: var(--flux-foreground);
  border: 1px solid var(--flux-border);
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease;
}
.action-btn:hover {
  background: var(--flux-card-hover);
  border-color: var(--flux-primary);
  color: var(--flux-primary);
}

.detail-loading-state, .detail-failure-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px;
  text-align: center;
}
.detail-spinner { font-size: 48px; color: var(--flux-primary); }
.detail-loading-state p, .detail-failure-state p { margin: 0; font-size: 16px; color: var(--flux-muted); }
.detail-failure-state .failure-icon { font-size: 56px; color: var(--flux-destructive); }

/* UploadImage 深色适配 */
.seedream-tool :deep(.uploaded-image label) {
  color: var(--flux-foreground);
}
.seedream-tool :deep(.file-upload-label) {
  background: var(--flux-input-bg);
  border-color: var(--flux-border);
  color: var(--flux-muted);
}
.seedream-tool :deep(.file-upload-label:hover) {
  border-color: var(--flux-primary);
  background: var(--flux-primary-muted);
}
.seedream-tool :deep(.file-upload-label i) {
  color: var(--flux-primary);
}
.seedream-tool :deep(.file-item) {
  background: var(--flux-card);
  border-color: var(--flux-border);
}
.seedream-tool :deep(.file-name) {
  color: var(--flux-foreground);
}
.seedream-tool :deep(.file-size) {
  color: var(--flux-muted);
}
.seedream-tool :deep(.file-preview) {
  background: var(--flux-bg-elevated);
}

@media (max-width: 768px) {
  .mode-tabs { gap: 6px; }
  .mode-tab { padding: 8px 12px; font-size: 13px; }
}

@media (max-width: 1024px) {
  .main-content { flex-direction: column; }
  .config-panel, .result-panel { width: 100%; }
}
</style>
