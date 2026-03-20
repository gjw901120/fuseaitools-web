<template>
  <div class="hailuo-tool">
    <div class="tool-header">
      <div class="tool-avatar">
        <img src="/tools-logo/Hailuo.png" alt="Hailuo" />
      </div>
      <div class="tool-details">
        <h3>Hailuo</h3>
        <p class="tool-description">Hailuo is MiniMax's high-fidelity AI video generation model designed to create realistic motion, expressive characters, and cinematic visuals. It supports both text-to-video and image-to-video, handling complex movements, lighting changes, and detailed facial expressions with stability and consistency.</p>
      </div>
    </div>

    <div class="mode-tabs-wrap">
      <div class="mode-tabs">
        <div
          class="mode-tab"
          :class="{ active: mode === 'image-to-video-pro' }"
          @click="goToTab('image-to-video-pro')"
        >
          <i class="fas fa-image"></i>
          <span>image-to-video-pro</span>
        </div>
        <div
          class="mode-tab"
          :class="{ active: mode === 'image-to-video-standard' }"
          @click="goToTab('image-to-video-standard')"
        >
          <i class="fas fa-image"></i>
          <span>image-to-video-standard</span>
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
              <label for="hailuo-prompt" class="form-label">
                Prompt <span class="required">*</span>
              </label>
              <textarea
                id="hailuo-prompt"
                v-model="formData.prompt"
                class="form-input"
                rows="4"
                placeholder="Text prompt describing the desired video animation (max 5000 characters)"
                :maxlength="5000"
                required
              ></textarea>
              <div class="char-count" v-if="formData.prompt">{{ formData.prompt.length }}/5000</div>
            </div>

            <div class="form-group">
              <label class="form-label">
                Input Image <span class="required">*</span>
              </label>
              <UploadImage
                ref="imageUploadRef"
                input-id="hailuo-image-upload"
                label=""
                upload-text="Click to upload image"
                upload-hint="JPEG, PNG, WebP; max 10MB"
                :max-files="1"
                :max-file-size="10 * 1024 * 1024"
                accept="image/jpeg,image/png,image/webp"
                :multiple="false"
                @update:files="handleImageFile"
              />
              <span v-if="isUploadingImage" class="form-hint">Uploading...</span>
            </div>

            <div class="form-group">
              <label class="form-label">Duration</label>
              <div class="tab-group">
                <button type="button" class="tab-option" :class="{ active: formData.duration === '6' }" @click="setDuration('6')">6s</button>
                <button type="button" class="tab-option" :class="{ active: formData.duration === '10' }" @click="setDuration('10')">10s</button>
              </div>
              <div class="form-hint">10 seconds videos are not supported for 1080P resolution.</div>
            </div>

            <div class="form-group">
              <label class="form-label">Resolution</label>
              <div class="tab-group">
                <button type="button" class="tab-option" :class="{ active: formData.resolution === '768P' }" @click="formData.resolution = '768P'">768P</button>
                <button
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.resolution === '1080P', disabled: formData.duration === '10' }"
                  :disabled="formData.duration === '10'"
                  @click="formData.duration !== '10' && (formData.resolution = '1080P')"
                >1080P</button>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn-primary" :disabled="!canGenerate || isGenerating">
                <i v-if="isGenerating" class="fas fa-spinner fa-spin"></i>
                <i v-else class="fas fa-play"></i>
                <span v-if="isGenerating">Generating...</span>
                <span v-else>
                  Generate Video
                  <span v-if="hailuoPriceText" class="price-tag">{{ hailuoPriceText }}</span>
                </span>
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
        <div v-else-if="displayResult?.videoUrl" class="video-result">
          <div class="video-player">
            <video :src="displayResult.videoUrl" controls class="video-element"></video>
          </div>
          <div class="video-actions">
            <button @click="downloadVideo" class="action-btn">
              <i class="fas fa-download"></i> Download
            </button>
          </div>
        </div>
        <div v-else class="empty-state">
          <h4>No video generated yet</h4>
          <p>Fill in the form and click "Generate Video" to start.</p>
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
const batchUploadUrl = useBatchUploadUrl()

const modeTabToPath = {
  'image-to-video-pro': '/home/hailuo/image-to-video-pro',
  'image-to-video-standard': '/home/hailuo/image-to-video-standard'
}
const pathToMode = {
  '/home/hailuo/image-to-video-pro': 'image-to-video-pro',
  '/home/hailuo/image-to-video-standard': 'image-to-video-standard'
}

const mode = ref('image-to-video-pro')
function goToTab(m) {
  mode.value = m
  router.push(modeTabToPath[m] || modeTabToPath['image-to-video-pro'])
}

function setDuration(d) {
  formData.duration = d
  if (d === '10' && formData.resolution === '1080P') formData.resolution = '768P'
}

watch(() => route.path, (path) => {
  const m = pathToMode[path]
  if (m && mode.value !== m) mode.value = m
}, { immediate: true })

const formData = reactive({
  prompt: '',
  imageUrl: '',
  duration: '6',
  resolution: '768P'
})

onMounted(() => { fetchPrices() })

const imageUploadRef = ref(null)
const isUploadingImage = ref(false)
const result = ref(null)
const isGenerating = ref(false)
const routeRecordId = computed(() => route.query['record-id'] || '')
const isDetailView = computed(() => !!routeRecordId.value)
const detailData = ref(null)

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
  } catch (e) { console.error('Hailuo load record detail failed:', e) }
}
watch(() => route.query['record-id'], (recordId) => {
  if (recordId) loadDetailByRecordId(recordId)
  else detailData.value = null
}, { immediate: true })

async function uploadFileToUrl(file) {
  if (!file) return ''
  const form = new FormData()
  form.append('file', file)
  const headers = { Accept: 'application/json' }
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('auth_token') : null
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
  const url = Array.isArray(urls) && urls.length ? urls[0] : (data?.data?.url || '')
  return typeof url === 'string' ? url : ''
}

async function handleImageFile(files) {
  if (!files?.length) {
    formData.imageUrl = ''
    return
  }
  const file = Array.isArray(files) ? files[0] : files
  isUploadingImage.value = true
  try {
    formData.imageUrl = await uploadFileToUrl(file)
  } catch (e) {
    showError(e?.message || 'Upload failed')
    formData.imageUrl = ''
    imageUploadRef.value?.clearFiles?.()
  } finally {
    isUploadingImage.value = false
  }
}

const canGenerate = computed(() => {
  const p = (formData.prompt || '').trim()
  return p.length >= 1 && p.length <= 5000 && !!formData.imageUrl
})

const displayResult = computed(() => {
  if (isDetailView.value && detailData.value && Number(detailData.value.status) === 2) {
    const url = detailData.value?.outputUrl || detailData.value?.videoUrl || (detailData.value?.outputUrls && detailData.value.outputUrls[0])
    return url ? { videoUrl: url } : result.value
  }
  return result.value
})

const discountText = computed(() => {
  const rate = Number(discount?.value ?? 1)
  if (Number.isNaN(rate) || rate <= 0 || rate === 1) return ''
  const percent = (rate * 100).toFixed(0)
  return ` · ${percent}%`
})

const hailuoPriceText = computed(() => {
  const modelKey = mode.value === 'image-to-video-pro'
    ? 'hailuo-2-3-image-to-video-pro'
    : 'hailuo-2-3-image-to-video-standard'
  const durationNum = Number(formData.duration) || 0
  const quality = String(formData.resolution || '').toLowerCase() // 768P -> 768p
  const credits = getPrice(modelKey, {
    duration: durationNum,
    quality,
    scene: 'generate'
  })
  const str = formatCredits(credits)
  if (!str) return ''
  return `· ${str} credits${discountText.value}`
})

async function generate() {
  if (!canGenerate.value) return
  isGenerating.value = true
  try {
    const apiPath = mode.value === 'image-to-video-pro'
      ? '/api/video/hailuo/image-to-video-pro'
      : '/api/video/hailuo/image-to-video-standard'
    const modelName = mode.value === 'image-to-video-pro'
      ? 'hailuo-2-3-image-to-video-pro'
      : 'hailuo-2-3-image-to-video-standard'
    const body = {
      model: modelName,
      prompt: (formData.prompt || '').trim(),
      imageUrl: formData.imageUrl,
      duration: formData.duration,
      resolution: formData.resolution
    }
    const data = await post(apiPath, body)
    const rid = data?.recordId ?? data?.data?.recordId
    if (rid) {
      router.push((modeTabToPath[mode.value] || '/home/hailuo/image-to-video-pro') + '?record-id=' + encodeURIComponent(rid))
      return
    }
    const url = data?.videoUrl ?? data?.outputUrl ?? (Array.isArray(data?.outputUrls) && data.outputUrls?.length ? data.outputUrls[0] : null)
    result.value = url ? { videoUrl: url } : data
  } catch (err) {
    if (!err?.__fromApi) showError(err?.message || 'Generation failed')
  } finally {
    isGenerating.value = false
  }
}

function downloadVideo() {
  if (displayResult.value?.videoUrl) {
    const a = document.createElement('a')
    a.href = displayResult.value.videoUrl
    a.download = `hailuo-video-${Date.now()}.mp4`
    a.click()
  }
}

watch(mode, (m) => {
  const path = modeTabToPath[m]
  if (path && route.path !== path) router.replace(path)
})
</script>

<style scoped>
.hailuo-tool {
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
.tool-avatar img { width: 100%; height: 100%; object-fit: cover; }
.tool-details h3 { margin: 0 0 4px 0; font-size: 20px; font-weight: 600; color: #1f2937; }
.tool-details p { margin: 0; font-size: 13px; color: #6b7280; line-height: 1.5; }
.tool-details p.tool-description { line-height: 1.55; }

.mode-tabs-wrap {
  padding-bottom: 20px;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 20px;
}
.mode-tabs { display: flex; flex-wrap: wrap; gap: 8px; }
.mode-tab {
  padding: 9px 14px;
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #64748b;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}
.mode-tab:hover { border-color: #3b82f6; color: #3b82f6; }
.mode-tab.active { background: #3b82f6; color: #fff; border-color: #3b82f6; }
.mode-tab i { font-size: 1em; }
.mode-tab span { font-weight: 500; }

.main-content { display: flex; flex: 1; min-height: 0; gap: 20px; }
.config-panel {
  width: 35%;
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.config-header { margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid #e2e8f0; }
.config-header h4 { margin: 0; font-size: 18px; font-weight: 600; color: #1f2937; }
.config-fieldset { border: none; margin: 0; padding: 0; }
.config-form { display: flex; flex-direction: column; gap: 16px; flex: 1; overflow-y: auto; }

.form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 24px; }
.form-group:last-of-type { margin-bottom: 0; }
.form-label { font-size: 14px; font-weight: 500; color: #374151; }
.required { color: #ef4444; }
.form-input { width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; resize: vertical; box-sizing: border-box; }
.form-input:focus { outline: none; border-color: #3b82f6; }
.form-hint { font-size: 12px; color: #6b7280; line-height: 1.4; }
.char-count { font-size: 12px; color: #6b7280; text-align: right; }

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
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: #f8fafc;
  color: #374151;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.tab-option:hover { background: rgba(59, 130, 246, 0.05); border-color: #3b82f6; color: #3b82f6; }
.tab-option.active { border-color: #3b82f6; background: #3b82f6; color: white; }
.tab-option.disabled { opacity: 0.5; cursor: not-allowed; }

.form-actions { margin-top: 24px; padding-bottom: 20px; }
.btn-primary {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(59,130,246,0.3); }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

.price-tag {
  font-size: 15px;
  opacity: 0.8;
  margin-left: 4px;
}

.result-panel {
  width: 65%;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e2e8f0;
  min-height: 400px;
  display: flex;
  flex-direction: column;
}
.empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; text-align: center; color: #6b7280; gap: 16px; }
.empty-state h4 { margin: 0; font-size: 18px; color: #374151; }
.empty-state p { margin: 0; font-size: 14px; }
.video-result { display: flex; flex-direction: column; gap: 16px; }
.video-player { background: #000; border-radius: 8px; overflow: hidden; }
.video-element { width: 100%; height: auto; display: block; }
.video-actions { display: flex; gap: 8px; }
.action-btn { background: #f3f4f6; color: #374151; border: 1px solid #d1d5db; padding: 8px 12px; border-radius: 6px; font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 4px; }
.action-btn:hover { background: #e5e7eb; }

.detail-loading-state, .detail-failure-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px;
  text-align: center;
}
.detail-spinner { font-size: 48px; color: #3b82f6; }
.detail-loading-state p, .detail-failure-state p { margin: 0; font-size: 16px; color: #64748b; }
.detail-failure-state .failure-icon { font-size: 56px; color: #ef4444; }

@media (max-width: 1024px) {
  .main-content { flex-direction: column; }
  .config-panel, .result-panel { width: 100%; }
}
@media (max-width: 768px) {
  .mode-tabs { gap: 6px; }
  .mode-tab { padding: 8px 12px; font-size: 13px; }
}
</style>
