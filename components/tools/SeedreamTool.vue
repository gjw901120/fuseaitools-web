<template>
  <div class="seedream-tool">
    <div class="tool-header">
      <div class="tool-avatar">
        <img src="/tools-logo/Seedream.png" alt="Seedream" />
      </div>
      <div class="tool-details">
        <h3>Seedream</h3>
        <p class="tool-description">Seedream is a unified multimodal image generation model by ByteDance, designed for multimodal reasoning, deep understanding, and controllable visual creation. It supports text-to-image and image editing workflows with improved consistency and real-time knowledge integration.</p>
      </div>
    </div>

    <div class="mode-section">
      <div class="mode-tabs">
        <div
          class="mode-tab"
          :class="{ active: mode === '1-5-lite-text-to-image' }"
          @click="goToTab('1-5-lite-text-to-image')"
        >
          <i class="fas fa-font"></i>
          <span>1.5 Lite Text to Image</span>
        </div>
        <div
          class="mode-tab"
          :class="{ active: mode === '2-5-lite-image-to-image' }"
          @click="goToTab('2-5-lite-image-to-image')"
        >
          <i class="fas fa-image"></i>
          <span>2.5 Lite Image to Image</span>
        </div>
      </div>
    </div>

    <div class="main-content">
      <div class="config-panel">
        <div class="config-header">
          <h4>Configuration</h4>
        </div>
        <form class="config-form" @submit.prevent="generate">
          <fieldset class="config-fieldset" :disabled="isGenerating">
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
                :maxlength="mode === '2-5-lite-image-to-image' ? 2996 : 2995"
                required
              ></textarea>
              <div class="char-count" v-if="formData.prompt">
                {{ formData.prompt.length }}/{{ mode === '2-5-lite-image-to-image' ? 2996 : 2995 }}
              </div>
            </div>

            <div v-if="mode === '2-5-lite-image-to-image'" class="form-group">
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
              <button type="submit" class="btn-primary" :disabled="!canGenerate || isGenerating">
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
        <div v-if="isDetailView && detailData?.status === 3" class="detail-failure-state">
          <div class="failure-icon"><i class="fas fa-exclamation-circle"></i></div>
          <p class="failure-message">Generation failed. You can try again with different parameters.</p>
        </div>
        <div v-else-if="isDetailView && (!detailData || detailData.status === 1)" class="detail-loading-state">
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
const { fetchPrices, getPrice, formatCredits } = useModelPrice()
onMounted(() => { fetchPrices() })
const batchUploadUrl = useBatchUploadUrl()

const modeTabToPath = {
  '1-5-lite-text-to-image': '/home/seedream/1-5-lite-text-to-image',
  '2-5-lite-image-to-image': '/home/seedream/2-5-lite-image-to-image'
}
const pathToMode = {
  '/home/seedream/1-5-lite-text-to-image': '1-5-lite-text-to-image',
  '/home/seedream/2-5-lite-image-to-image': '2-5-lite-image-to-image'
}

const mode = ref('1-5-lite-text-to-image')
function goToTab(m) {
  mode.value = m
  router.push(modeTabToPath[m] || modeTabToPath['1-5-lite-text-to-image'])
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

// 价格：按 mode 取 modelKey，可选按 aspectRatio + quality 匹配 RULE
const seedreamPriceModelKeyMap = {
  '1-5-lite-text-to-image': 'seedream-5-lite-text-to-image',
  '2-5-lite-image-to-image': 'seedream-5-lite-image-to-image'
}
const seedreamPriceText = computed(() => {
  const modelKey = seedreamPriceModelKeyMap[mode.value]
  if (!modelKey) return ''
  const credits = getPrice(modelKey, {
    aspectRatio: formData.aspectRatio,
    quality: formData.quality
  })
  const str = formatCredits(credits)
  return str ? `(${str})` : ''
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
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.errorMessage || err?.message || 'Upload failed')
  }
  const data = await res.json()
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
    formData.imageUrls = await uploadFilesToUrls(list)
  } catch (e) {
    showError(e?.message || 'Upload failed')
    formData.imageUrls = []
    imageUploadRef.value?.clearFiles?.()
  } finally {
    isUploadingImages.value = false
  }
}

const maxPromptLen = computed(() => mode.value === '2-5-lite-image-to-image' ? 2996 : 2995)
const canGenerate = computed(() => {
  const p = (formData.prompt || '').trim()
  if (!p || p.length > maxPromptLen.value) return false
  if (mode.value === '2-5-lite-image-to-image') return formData.imageUrls.length > 0
  return true
})

const displayResult = computed(() => {
  if (isDetailView.value && detailData.value?.status === 2 && detailData.value?.outputUrls?.length) {
    const url = typeof detailData.value.outputUrls[0] === 'string' ? detailData.value.outputUrls[0] : detailData.value.outputUrls[0]?.url
    return { imageUrl: url }
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
    if (data != null && Number(data.status) === 1) {
      const res = await pollRecordByStatus(recordId, { getIsCancelled: () => routeRecordId.value !== recordId })
      if (routeRecordId.value === recordId) detailData.value = res
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
    const isTextMode = mode.value === '1-5-lite-text-to-image'
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
      router.push((modeTabToPath[mode.value] || '/home/seedream/1-5-lite-text-to-image') + '?record-id=' + encodeURIComponent(rid))
      return
    }
    const url = data?.imageUrl ?? data?.outputUrl ?? (Array.isArray(data?.outputUrls) && data.outputUrls?.length ? data.outputUrls[0] : null)
    result.value = url ? { imageUrl: url } : data
  } catch (err) {
    showError(err?.message || 'Generation failed')
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
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
}
.tool-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
}
.tool-avatar { width: 48px; height: 48px; border-radius: 12px; overflow: hidden; flex-shrink: 0; }
.tool-avatar img { width: 100%; height: 100%; object-fit: contain; }
.tool-details h3 { margin: 0 0 4px 0; font-size: 20px; font-weight: 600; color: #1f2937; }
.tool-details p { margin: 0; font-size: 13px; color: #6b7280; line-height: 1.5; }
.tool-details p.tool-description { line-height: 1.55; }

.mode-section { margin-bottom: 24px; padding: 20px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; }
.mode-tabs { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
.mode-tab {
  display: flex; flex-direction: column; align-items: center; padding: 12px 8px;
  background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; cursor: pointer; transition: all 0.2s; text-align: center;
}
.mode-tab:hover { border-color: #3b82f6; background: rgba(59,130,246,0.05); }
.mode-tab.active { border-color: #3b82f6; background: #3b82f6; color: #fff; }
.mode-tab i { font-size: 16px; margin-bottom: 4px; }
.mode-tab span { font-size: 12px; font-weight: 500; }

.main-content { display: flex; flex: 1; min-height: 0; gap: 20px; }
.config-panel {
  width: 35%; background: #f8fafc; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0;
  display: flex; flex-direction: column; min-height: 0;
}
.config-header { margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid #e2e8f0; }
.config-header h4 { margin: 0; font-size: 18px; font-weight: 600; color: #1f2937; }
.config-fieldset { border: none; margin: 0; padding: 0; }
.config-form { display: flex; flex-direction: column; gap: 16px; flex: 1; overflow-y: auto; }

.form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 24px; }
.form-group:last-of-type { margin-bottom: 0; }
.form-label { font-size: 14px; font-weight: 500; color: #374151; }
.required { color: #ef4444; }
.form-input { padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; }
.form-input:focus { outline: none; border-color: #3b82f6; }
.form-hint { font-size: 12px; color: #6b7280; line-height: 1.4; }
.char-count { font-size: 12px; color: #6b7280; text-align: right; }
.select-with-arrow { position: relative; }
.select-with-arrow .form-input { width: 100%; appearance: none; padding-right: 32px; }
.select-arrow-icon { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); pointer-events: none; color: #6b7280; }

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
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  color: #64748b;
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
  background: #f8fafc;
  border-color: #3b82f6;
  color: #3b82f6;
}
.tab-option.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

.form-actions { margin-top: 24px; padding-bottom: 20px; }
.price-tag { font-size: 12px; opacity: 0.8; margin-left: 4px; }
.btn-primary {
  width: 100%; padding: 16px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: #fff; border: none;
  border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
}
.btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(59,130,246,0.3); }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

.result-panel {
  width: 65%; background: #fff; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; min-height: 400px; display: flex; flex-direction: column;
}
.empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; text-align: center; color: #6b7280; gap: 16px; }
.empty-state h4 { margin: 0; font-size: 18px; color: #374151; }
.image-result { display: flex; flex-direction: column; gap: 16px; }
.result-image { max-width: 100%; height: auto; border-radius: 8px; display: block; }
.image-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 200px; color: #6b7280; }
.image-actions { display: flex; gap: 8px; }
.action-btn { background: #f3f4f6; color: #374151; border: 1px solid #d1d5db; padding: 8px 12px; border-radius: 6px; font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 4px; }
.action-btn:hover { background: #e5e7eb; }

.detail-loading-state, .detail-failure-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; padding: 40px; text-align: center;
}
.detail-spinner { font-size: 48px; color: #3b82f6; }
.detail-loading-state p, .detail-failure-state p { margin: 0; font-size: 16px; color: #64748b; }
.detail-failure-state .failure-icon { font-size: 56px; color: #ef4444; }

@media (max-width: 1024px) {
  .main-content { flex-direction: column; }
  .config-panel, .result-panel { width: 100%; }
}
</style>
