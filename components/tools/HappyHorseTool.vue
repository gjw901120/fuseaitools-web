<template>
  <div class="happyhorse-tool">
    <div class="tool-header">
      <div class="tool-avatar">
        <img src="/tools-logo/HappyHorse.png" alt="HappyHorse" />
      </div>
      <div class="tool-details">
        <h3>HappyHorse</h3>
        <p class="tool-description">HappyHorse provides text-to-video, image-to-video, reference-to-video, and video-edit workflows for fast AI video creation.</p>
      </div>
    </div>

    <div class="mode-tabs-wrap">
      <div class="mode-tabs">
        <div class="mode-tab" :class="{ active: mode === 'v1-text-to-video' }" @click="goToTab('v1-text-to-video')">
          <i class="fas fa-keyboard"></i><span>v1-text-to-video</span>
        </div>
        <div class="mode-tab" :class="{ active: mode === 'v1-image-to-video' }" @click="goToTab('v1-image-to-video')">
          <i class="fas fa-image"></i><span>v1-image-to-video</span>
        </div>
        <div class="mode-tab" :class="{ active: mode === 'v1-reference-to-video' }" @click="goToTab('v1-reference-to-video')">
          <i class="fas fa-images"></i><span>v1-reference-to-video</span>
        </div>
        <div class="mode-tab" :class="{ active: mode === 'v1-video-edit' }" @click="goToTab('v1-video-edit')">
          <i class="fas fa-film"></i><span>v1-video-edit</span>
        </div>
      </div>
    </div>

    <div class="main-content">
      <div class="config-panel">
        <div class="config-header"><h4>Configuration</h4></div>
        <form class="config-form" @submit.prevent="generate">
          <fieldset class="config-fieldset" :disabled="isGenerating || isDetailView">
            <div v-if="requiresPrompt" class="form-group">
              <label class="form-label">Prompt <span class="required">*</span></label>
              <textarea v-model="formData.prompt" class="form-input" rows="4" maxlength="5000" :required="requiresPrompt" />
              <div class="char-count">{{ formData.prompt.length }}/5000</div>
            </div>
            <div v-else class="form-group">
              <label class="form-label">Prompt (optional)</label>
              <textarea v-model="formData.prompt" class="form-input" rows="4" maxlength="5000" />
              <div class="char-count">{{ formData.prompt.length }}/5000</div>
            </div>

            <div v-if="mode === 'v1-image-to-video'" class="form-group">
              <label class="form-label">Input Image <span class="required">*</span></label>
              <UploadImage
                ref="imageUploadRef"
                input-id="happyhorse-image-upload"
                label=""
                upload-text="Click to upload image"
                upload-hint="JPEG/JPG/PNG/WEBP, max 10MB"
                :max-files="1"
                :max-file-size="10 * 1024 * 1024"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                :multiple="false"
                @update:files="handleMainImageFiles"
              />
              <span v-if="isUploadingMainImage" class="form-hint">Uploading...</span>
            </div>

            <div v-if="mode === 'v1-reference-to-video'" class="form-group">
              <label class="form-label">Reference Images <span class="required">*</span></label>
              <UploadImage
                ref="referenceUploadRef"
                input-id="happyhorse-reference-upload"
                label=""
                upload-text="Click to upload reference images"
                upload-hint="1-9 images, JPEG/JPG/PNG/WEBP, max 10MB each"
                :max-files="9"
                :max-file-size="10 * 1024 * 1024"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                :multiple="true"
                @update:files="handleReferenceImageFiles"
              />
              <span v-if="isUploadingReferences" class="form-hint">Uploading...</span>
            </div>

            <div v-if="mode === 'v1-video-edit'" class="form-group">
              <label class="form-label">Input Video <span class="required">*</span></label>
              <div class="file-upload-area">
                <input id="happyhorse-video-upload" ref="videoInputRef" type="file" class="file-input" accept="video/mp4,video/quicktime" @change="handleVideoFile" />
                <label for="happyhorse-video-upload" class="file-upload-label">
                  <i class="fas fa-cloud-upload-alt"></i>
                  <span>Click to upload MP4/MOV</span>
                </label>
              </div>
              <span v-if="isUploadingVideo" class="form-hint">Uploading...</span>
              <div v-else-if="sourceVideoDurationSec > 0" class="form-hint">
                Source duration: {{ sourceVideoDurationSec.toFixed(2) }}s · Billing seconds: {{ Math.ceil(sourceVideoDurationSec) }}s
              </div>
            </div>

            <div v-if="mode === 'v1-video-edit'" class="form-group">
              <label class="form-label">Reference Images (optional)</label>
              <UploadImage
                ref="editReferenceUploadRef"
                input-id="happyhorse-edit-reference-upload"
                label=""
                upload-text="Click to upload reference images"
                upload-hint="0-5 images, JPEG/JPG/PNG/WEBP, max 10MB each"
                :max-files="5"
                :max-file-size="10 * 1024 * 1024"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                :multiple="true"
                @update:files="handleEditReferenceImageFiles"
              />
              <span v-if="isUploadingEditReferences" class="form-hint">Uploading...</span>
            </div>

            <div v-if="supportsAspectRatio" class="form-group">
              <label class="form-label">Aspect Ratio</label>
              <div class="tab-group">
                <button
                  v-for="ratio in ['16:9','9:16','1:1','4:3','3:4']"
                  :key="ratio"
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.aspectRatio === ratio }"
                  @click="formData.aspectRatio = ratio"
                >
                  {{ ratio }}
                </button>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Resolution</label>
              <div class="tab-group">
                <button
                  v-for="res in ['720p','1080p']"
                  :key="res"
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.resolution === res }"
                  @click="formData.resolution = res"
                >
                  {{ res }}
                </button>
              </div>
            </div>

            <div v-if="supportsDuration" class="form-group">
              <label class="form-label">Duration</label>
              <input v-model.number="formData.duration" type="range" class="duration-range" min="3" max="15" step="1" />
              <div class="form-hint">{{ formData.duration }}s</div>
            </div>

            <div class="form-group">
              <label class="form-label">Seed (optional)</label>
              <input v-model.number="formData.seed" type="number" class="text-input" min="0" max="2147483647" />
            </div>

            <div v-if="mode === 'v1-video-edit'" class="form-group">
              <label class="form-label">Audio Setting</label>
              <div class="tab-group">
                <button v-for="as in ['auto','origin']" :key="as" type="button" class="tab-option" :class="{ active: formData.audioSetting === as }" @click="formData.audioSetting = as">{{ as }}</button>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn-primary" :disabled="!canGenerate || isGenerating || isDetailView">
                <i v-if="isGenerating" class="fas fa-spinner fa-spin"></i>
                <i v-else class="fas fa-play"></i>
                <span v-if="isGenerating">Generating...</span>
                <span v-else>
                  Generate Video
                  <span v-if="happyHorsePriceText" class="price-tag">{{ happyHorsePriceText }}</span>
                </span>
              </button>
            </div>
          </fieldset>
        </form>
      </div>

      <div class="result-panel">
        <div v-if="isDetailView && Number(detailData?.status) === 3" class="state-block error">Generation failed.</div>
        <div v-else-if="isDetailView && (!detailData || [0,1].includes(Number(detailData.status)))" class="state-block">Generating...</div>
        <div v-else-if="displayResult?.videoUrl" class="video-result">
          <video :src="displayResult.videoUrl" controls class="video-element"></video>
          <div class="video-actions"><button class="action-btn" @click="downloadVideo">Download</button></div>
        </div>
        <div v-else class="state-block">Fill in the form and click Generate Video.</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import UploadImage from './common/UploadImage.vue'
import { useApi } from '~/composables/useApi'
import { useToast } from '~/composables/useToast'
import { useRecordPolling } from '~/composables/useRecordPolling'
import { useModelPrice } from '~/composables/useModelPrice'

const router = useRouter()
const route = useRoute()
const { post } = useApi()
const { showError } = useToast()
const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling()
const { fetchPrices, getPrice, formatCredits, discount } = useModelPrice()
const batchUploadUrl = useBatchUploadUrl()
const { getUrlsForFiles } = useFileUploadUrlCache()

const modeTabToPath = {
  'v1-text-to-video': '/home/happy-horse/v1-text-to-video',
  'v1-image-to-video': '/home/happy-horse/v1-image-to-video',
  'v1-reference-to-video': '/home/happy-horse/v1-reference-to-video',
  'v1-video-edit': '/home/happy-horse/v1-video-edit'
}
const pathToMode = Object.fromEntries(Object.entries(modeTabToPath).map(([k, v]) => [v, k]))

const mode = ref('v1-text-to-video')
const formData = reactive({
  prompt: '',
  imageUrls: [],
  videoUrl: '',
  referenceImage: [],
  resolution: '1080p',
  aspectRatio: '16:9',
  duration: 5,
  seed: undefined,
  audioSetting: 'auto'
})

const imageUploadRef = ref(null)
const referenceUploadRef = ref(null)
const editReferenceUploadRef = ref(null)
const videoInputRef = ref(null)

const isUploadingMainImage = ref(false)
const isUploadingReferences = ref(false)
const isUploadingVideo = ref(false)
const isUploadingEditReferences = ref(false)
const isGenerating = ref(false)
const result = ref(null)
const detailData = ref(null)
const sourceVideoDurationSec = ref(0)

const routeRecordId = computed(() => route.query['record-id'] || '')
const isDetailView = computed(() => !!routeRecordId.value)
const requiresPrompt = computed(() => mode.value !== 'v1-image-to-video')
const supportsAspectRatio = computed(() => mode.value === 'v1-text-to-video' || mode.value === 'v1-reference-to-video')
const supportsDuration = computed(() => mode.value !== 'v1-video-edit')

onMounted(() => { fetchPrices() })

function pricingModelKeyForMode(m) {
  if (m === 'v1-text-to-video') return 'happyhorse-text-to-video'
  if (m === 'v1-image-to-video') return 'happyhorse-image-to-video'
  if (m === 'v1-reference-to-video') return 'happyhorse-reference-to-video'
  return 'happyhorse-video-edit'
}

const discountText = computed(() => {
  const rate = Number(discount?.value ?? 1)
  if (Number.isNaN(rate) || rate <= 0 || rate === 1) return ''
  const percent = (rate * 100).toFixed(0)
  return ` · ${percent}%`
})

const happyHorsePriceText = computed(() => {
  const modelKey = pricingModelKeyForMode(mode.value)
  const quality = String(formData.resolution || '').toLowerCase()
  const durationSec = supportsDuration.value
    ? Math.max(3, Math.min(15, Number(formData.duration) || 5))
    : Math.max(0, Math.ceil(Number(sourceVideoDurationSec.value) || 0))
  if (durationSec <= 0) return ''
  const perSecond = Number(getPrice(modelKey, { duration: 1, quality, scene: 'generate' })) || 0
  const totalCredits = perSecond > 0 ? perSecond * durationSec : 0
  const creditsText = formatCredits(totalCredits)
  if (!creditsText) return ''
  return `· ${creditsText} credits${discountText.value}`
})

watch(() => route.path, (path) => {
  const m = pathToMode[path]
  if (m && mode.value !== m) mode.value = m
}, { immediate: true })

function goToTab(m) {
  mode.value = m
  router.push(modeTabToPath[m] || modeTabToPath['v1-text-to-video'])
}

function parseIntegerSeed(v) {
  if (v === '' || v == null) return undefined
  const n = Number(v)
  if (!Number.isInteger(n) || n < 0 || n > 2147483647) return undefined
  return n
}

const canGenerate = computed(() => {
  const promptLen = (formData.prompt || '').trim().length
  if (requiresPrompt.value && (promptLen < 1 || promptLen > 5000)) return false
  if (!requiresPrompt.value && promptLen > 5000) return false
  if (mode.value === 'v1-image-to-video' && formData.imageUrls.length !== 1) return false
  if (mode.value === 'v1-reference-to-video' && (formData.imageUrls.length < 1 || formData.imageUrls.length > 9)) return false
  if (mode.value === 'v1-video-edit' && !formData.videoUrl) return false
  if (mode.value === 'v1-video-edit' && Number(sourceVideoDurationSec.value) <= 0) return false
  if (mode.value !== 'v1-video-edit') {
    const d = Number(formData.duration)
    if (!Number.isFinite(d) || d < 3 || d > 15) return false
  }
  return true
})

async function uploadFilesToUrls(files) {
  if (!files || (Array.isArray(files) ? files.length === 0 : !files)) return []
  const list = Array.isArray(files) ? files : [files]
  const fd = new FormData()
  list.forEach(f => fd.append('file', f))
  const headers = { Accept: 'application/json' }
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('auth_token') : null
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(batchUploadUrl, { method: 'POST', headers, body: fd, credentials: 'include' })
  const data = await parseBatchUploadFetchResponse(res)
  const urls = data?.data?.urls || data?.fileUrls || (Array.isArray(data?.data) ? data.data : [])
  if (!Array.isArray(urls)) throw new Error('Invalid upload response')
  return urls
}

async function handleMainImageFiles(files) {
  if (!files || (Array.isArray(files) && files.length === 0)) {
    formData.imageUrls = []
    return
  }
  isUploadingMainImage.value = true
  try {
    const urls = await getUrlsForFiles(Array.isArray(files) ? files : [files], uploadFilesToUrls)
    formData.imageUrls = urls.slice(0, 1)
  } catch (e) {
    showError(e?.message || 'Upload failed')
    formData.imageUrls = []
    imageUploadRef.value?.clearFiles?.()
  } finally {
    isUploadingMainImage.value = false
  }
}

async function handleReferenceImageFiles(files) {
  if (!files || (Array.isArray(files) && files.length === 0)) {
    formData.imageUrls = []
    return
  }
  isUploadingReferences.value = true
  try {
    const urls = await getUrlsForFiles(Array.isArray(files) ? files : [files], uploadFilesToUrls)
    formData.imageUrls = urls.slice(0, 9)
  } catch (e) {
    showError(e?.message || 'Upload failed')
    formData.imageUrls = []
    referenceUploadRef.value?.clearFiles?.()
  } finally {
    isUploadingReferences.value = false
  }
}

async function handleEditReferenceImageFiles(files) {
  if (!files || (Array.isArray(files) && files.length === 0)) {
    formData.referenceImage = []
    return
  }
  isUploadingEditReferences.value = true
  try {
    const urls = await getUrlsForFiles(Array.isArray(files) ? files : [files], uploadFilesToUrls)
    formData.referenceImage = urls.slice(0, 5)
  } catch (e) {
    showError(e?.message || 'Upload failed')
    formData.referenceImage = []
    editReferenceUploadRef.value?.clearFiles?.()
  } finally {
    isUploadingEditReferences.value = false
  }
}

async function handleVideoFile(e) {
  const file = e?.target?.files?.[0]
  if (!file) {
    formData.videoUrl = ''
    sourceVideoDurationSec.value = 0
    return
  }
  isUploadingVideo.value = true
  try {
    sourceVideoDurationSec.value = await getFileVideoDurationSeconds(file)
    const urls = await uploadFilesToUrls([file])
    formData.videoUrl = urls[0] || ''
  } catch (err) {
    showError(err?.message || 'Video upload failed')
    formData.videoUrl = ''
    sourceVideoDurationSec.value = 0
  } finally {
    isUploadingVideo.value = false
  }
}

function getFileVideoDurationSeconds(file) {
  return new Promise((resolve) => {
    try {
      const video = document.createElement('video')
      const objectUrl = URL.createObjectURL(file)
      video.preload = 'metadata'
      video.onloadedmetadata = () => {
        const d = Number(video.duration) || 0
        URL.revokeObjectURL(objectUrl)
        resolve(d > 0 ? d : 0)
      }
      video.onerror = () => {
        URL.revokeObjectURL(objectUrl)
        resolve(0)
      }
      video.src = objectUrl
    } catch {
      resolve(0)
    }
  })
}

function modelNameForMode(m) {
  if (m === 'v1-text-to-video') return 'happyhorse-text-to-video'
  if (m === 'v1-image-to-video') return 'happyhorse-image-to-video'
  if (m === 'v1-reference-to-video') return 'happyhorse-reference-to-video'
  return 'happyhorse-video-edit'
}

function apiPathForMode(m) {
  return `/api/video/happy-horse/${m}`
}

function pickDetailVideoUrl(d) {
  if (!d || typeof d !== 'object') return ''
  const single = d.outputUrl || d.videoUrl
  if (single) return typeof single === 'string' ? single : single?.url || ''
  const list = d.outputUrls
  if (Array.isArray(list) && list.length) {
    const first = list[0]
    return typeof first === 'string' ? first : first?.url || first?.videoUrl || ''
  }
  return ''
}

const displayResult = computed(() => {
  if (isDetailView.value && Number(detailData.value?.status) === 2) {
    const url = pickDetailVideoUrl(detailData.value)
    return url ? { videoUrl: url } : result.value
  }
  return result.value
})

function fillFormFromOriginalData(o) {
  if (!o || typeof o !== 'object') return
  if (o.prompt != null) formData.prompt = String(o.prompt)
  if (Array.isArray(o.imageUrls)) formData.imageUrls = [...o.imageUrls]
  else if (Array.isArray(o.image_urls)) formData.imageUrls = [...o.image_urls]
  if (o.videoUrl) formData.videoUrl = String(o.videoUrl)
  else if (o.video_url) formData.videoUrl = String(o.video_url)
  if (Array.isArray(o.referenceImage)) formData.referenceImage = [...o.referenceImage]
  else if (Array.isArray(o.reference_image)) formData.referenceImage = [...o.reference_image]
  if (o.resolution) formData.resolution = String(o.resolution)
  if (o.aspectRatio) formData.aspectRatio = String(o.aspectRatio)
  else if (o.aspect_ratio) formData.aspectRatio = String(o.aspect_ratio)
  if (o.duration != null) formData.duration = Number(o.duration) || 5
  if (o.seed != null && o.seed !== '') formData.seed = Number(o.seed)
  if (o.audioSetting) formData.audioSetting = String(o.audioSetting)
  else if (o.audio_setting) formData.audioSetting = String(o.audio_setting)
}

async function loadDetailByRecordId(recordId) {
  if (!recordId || routeRecordId.value !== recordId) return
  detailData.value = null
  try {
    const data = await fetchRecordDetailOnce(recordId)
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
  } catch (e) {
    console.error('HappyHorse load detail failed:', e)
  }
}

watch(() => route.query['record-id'], (id) => {
  if (id) loadDetailByRecordId(id)
  else detailData.value = null
}, { immediate: true })

async function generate() {
  if (!canGenerate.value) return
  if ((formData.prompt || '').trim().length > 5000) {
    showError('Prompt cannot exceed 5000 characters')
    return
  }
  if (mode.value === 'v1-video-edit' && Number(sourceVideoDurationSec.value) <= 0) {
    showError('Unable to read uploaded video duration. Please re-upload the video.')
    return
  }
  isGenerating.value = true
  try {
    const m = mode.value
    const body = {
      model: modelNameForMode(m),
      resolution: formData.resolution
    }
    if ((formData.prompt || '').trim()) body.prompt = formData.prompt.trim()
    if (supportsAspectRatio.value) body.aspectRatio = formData.aspectRatio
    if (supportsDuration.value) {
      const durationNum = Math.max(3, Math.min(15, Number(formData.duration) || 5))
      body.duration = (m === 'v1-reference-to-video' || m === 'v1-image-to-video' || m === 'v1-text-to-video')
        ? String(durationNum)
        : durationNum
    }
    const seed = parseIntegerSeed(formData.seed)
    if (seed !== undefined) body.seed = seed

    if (m === 'v1-image-to-video' || m === 'v1-reference-to-video') {
      body.imageUrls = [...formData.imageUrls]
    }
    if (m === 'v1-video-edit') {
      body.videoUrl = formData.videoUrl
      if (formData.referenceImage.length) body.referenceImage = [...formData.referenceImage]
      body.audioSetting = formData.audioSetting
      body.duration = Math.max(3, Math.min(60, Math.ceil(Number(sourceVideoDurationSec.value) || 0)))
    }

    const data = await post(apiPathForMode(m), body)
    const rid = data?.recordId ?? data?.data?.recordId
    if (rid) {
      router.push((modeTabToPath[m] || '/home/happy-horse/v1-text-to-video') + '?record-id=' + encodeURIComponent(rid))
      return
    }
    const url = pickDetailVideoUrl(data?.data || data)
    result.value = url ? { videoUrl: url } : (data?.data || data)
  } catch (e) {
    if (!e?.__fromApi) showError(e?.message || 'Generation failed')
  } finally {
    isGenerating.value = false
  }
}

function downloadVideo() {
  const url = displayResult.value?.videoUrl
  if (!url) return
  const a = document.createElement('a')
  a.href = url
  a.download = `happyhorse-video-${Date.now()}.mp4`
  a.click()
}
</script>

<style scoped>
.happyhorse-tool { width: 100%; height: 100%; padding: 20px; background: #fff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); display: flex; flex-direction: column; }
.tool-header { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #e2e8f0; }
.tool-avatar { width: 48px; height: 48px; border-radius: 10px; overflow: hidden; flex-shrink: 0; }
.tool-avatar img { width: 100%; height: 100%; object-fit: cover; }
.tool-details h3 { margin: 0 0 4px 0; font-size: 20px; color: #1f2937; }
.tool-description { margin: 0; color: #6b7280; font-size: 13px; }
.mode-tabs-wrap {
  padding-bottom: 20px;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 20px;
}
.mode-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
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
.mode-tab:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}
.mode-tab.active {
  background: #3b82f6;
  color: #fff;
  border-color: #3b82f6;
}
.main-content { display: flex; gap: 20px; flex: 1; min-height: 0; }
.config-panel { width: 38%; background: #f8fafc; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; overflow-y: auto; }
.result-panel { width: 62%; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; display: flex; align-items: center; justify-content: center; }
.config-header h4 { margin: 0 0 14px 0; color: #1f2937; }
.config-fieldset { border: none; margin: 0; padding: 0; }
.form-group { margin-bottom: 16px; }
.form-label { font-size: 14px; color: #374151; font-weight: 500; display: block; margin-bottom: 6px; }
.required { color: #ef4444; }
.form-input, .text-input { width: 100%; box-sizing: border-box; border: 1px solid #d1d5db; border-radius: 8px; padding: 10px 12px; font-size: 14px; }
.form-input { resize: vertical; }
.char-count { font-size: 12px; color: #6b7280; text-align: right; margin-top: 4px; }
.form-hint { font-size: 12px; color: #6b7280; }
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
.tab-option:hover {
  background: rgba(59, 130, 246, 0.05);
  border-color: #3b82f6;
  color: #3b82f6;
}
.tab-option.active {
  border-color: #3b82f6;
  background: #3b82f6;
  color: white;
}
.duration-range {
  display: block;
  width: 100% !important;
  max-width: 100% !important;
  margin: 0;
  accent-color: #3b82f6;
}
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
.price-tag { font-size: 15px; opacity: 0.8; margin-left: 4px; }
.state-block { color: #6b7280; font-size: 14px; text-align: center; }
.state-block.error { color: #ef4444; }
.video-result { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.video-element { width: 100%; border-radius: 8px; background: #000; }
.video-actions { display: flex; justify-content: flex-end; }
.action-btn {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
}
.action-btn:hover { background: #e5e7eb; }
.file-upload-area { position: relative; }
.file-input { position: absolute; opacity: 0; pointer-events: none; }
.file-upload-label { border: 2px dashed #d1d5db; border-radius: 8px; padding: 10px 12px; display: flex; align-items: center; gap: 8px; cursor: pointer; color: #475569; }
@media (max-width: 1024px) {
  .main-content { flex-direction: column; }
  .config-panel, .result-panel { width: 100%; }
}
</style>
