<template>
  <div class="wan-tool">
    <div class="tool-header">
      <div class="tool-avatar">
        <img src="/tools-logo/Wan.png" alt="Wan" />
      </div>
      <div class="tool-details">
        <h3>Wan</h3>
        <p class="tool-description">Wan is Alibaba's AI video model, offering affordable multi-shot 1080p generation with stable characters and synchronized native audio. Through the Wan—including T2V, I2V, and reference-guided modes—you can create up to 15-second cinematic videos with improved motion logic, consistent visuals, and production-ready quality.</p>
      </div>
    </div>

    <div class="mode-tabs-wrap">
      <div class="mode-tabs">
        <div
          class="mode-tab"
          :class="{ active: mode === 'text-to-video' }"
          @click="goToTab('text-to-video')"
        >
          <i class="fas fa-font"></i>
          <span>Text to Video</span>
        </div>
        <div
          class="mode-tab"
          :class="{ active: mode === 'image-to-video' }"
          @click="goToTab('image-to-video')"
        >
          <i class="fas fa-image"></i>
          <span>Image to Video</span>
        </div>
        <div
          class="mode-tab"
          :class="{ active: mode === 'video-to-video' }"
          @click="goToTab('video-to-video')"
        >
          <i class="fas fa-video"></i>
          <span>Video to Video</span>
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
              <label for="wan-prompt" class="form-label">
                Prompt <span class="required">*</span>
              </label>
              <textarea
                id="wan-prompt"
                v-model="formData.prompt"
                class="form-input"
                rows="4"
                :placeholder="promptPlaceholder"
                :maxlength="5000"
                required
              ></textarea>
              <div class="char-count" v-if="formData.prompt">{{ formData.prompt.length }}/5000</div>
              <div class="form-hint">{{ promptHint }}</div>
            </div>

            <!-- Image to Video: image URLs -->
            <div v-if="mode === 'image-to-video'" class="form-group">
              <label class="form-label">
                Image URLs <span class="required">*</span>
              </label>
              <UploadImage
                ref="imageUploadRef"
                input-id="wan-image-upload"
                label=""
                upload-text="Click to upload image(s)"
                upload-hint="JPEG, PNG, WebP; min 256×256px; max 10MB per image"
                :max-files="5"
                :max-file-size="10 * 1024 * 1024"
                accept="image/jpeg,image/png,image/webp"
                :multiple="true"
                @update:files="handleImageFiles"
              />
              <span v-if="isUploadingImages" class="form-hint">Uploading...</span>
              <div v-if="isDetailView && mode === 'image-to-video' && formData.imageUrls?.length" class="detail-ref-urls">
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

            <!-- Video to Video: video URL -->
            <div v-if="mode === 'video-to-video'" class="form-group">
              <label class="form-label">
                Video <span class="required">*</span>
              </label>
              <input
                ref="videoInputRef"
                type="file"
                accept="video/mp4,video/quicktime,video/x-matroska"
                class="wan-video-input"
                @change="handleVideoFile"
              />
              <div class="wan-video-upload" @click="triggerVideoInput">
                <div v-if="isUploadingVideo" class="wan-video-uploading">
                  <i class="fas fa-spinner fa-spin"></i> Uploading...
                </div>
                <template v-else-if="formData.videoUrls.length">
                  <div class="wan-video-preview-wrap">
                    <video :src="formData.videoUrls[0]" class="wan-video-preview" controls></video>
                    <button type="button" class="wan-video-remove" title="Remove" @click.stop="clearVideo">×</button>
                  </div>
                </template>
                <div v-else class="wan-video-placeholder">
                  <i class="fas fa-cloud-upload-alt"></i>
                  <span>Click to upload video (MP4, MOV, MKV; max 10MB)</span>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Duration</label>
              <div class="tab-group">
                <button type="button" class="tab-option" :class="{ active: formData.duration === '5' }" @click="formData.duration = '5'">5s</button>
                <button type="button" class="tab-option" :class="{ active: formData.duration === '10' }" @click="formData.duration = '10'">10s</button>
                <button v-if="mode !== 'video-to-video'" type="button" class="tab-option" :class="{ active: formData.duration === '15' }" @click="formData.duration = '15'">15s</button>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Resolution</label>
              <div class="tab-group">
                <button type="button" class="tab-option" :class="{ active: formData.resolution === '720p' }" @click="formData.resolution = '720p'">720p</button>
                <button type="button" class="tab-option" :class="{ active: formData.resolution === '1080p' }" @click="formData.resolution = '1080p'">1080p</button>
              </div>
            </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input v-model="formData.multiShots" type="checkbox" />
                <span>Multi shots (multiple shots with transitions)</span>
              </label>
              <div class="form-hint">When unchecked, generates a single continuous shot.</div>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn-primary" :disabled="!canGenerate || isGenerating || isDetailView">
                <i v-if="isGenerating" class="fas fa-spinner fa-spin"></i>
                <i v-else class="fas fa-play"></i>
                {{ isGenerating ? 'Generating...' : 'Generate Video' }}
                <span v-if="wanPriceText" class="price-tag">{{ wanPriceText }}</span>
              </button>
            </div>
          </fieldset>
        </form>
      </div>

      <div class="result-panel">
        <div v-if="isDetailView && Number(detailData?.status) === 3" class="detail-failure-state">
          <div class="failure-icon"><i class="fas fa-exclamation-circle"></i></div>
          <p class="failure-message">Generation failed. You can try again with different parameters.</p>
        </div>
        <div v-else-if="isDetailView && (!detailData || [0, 1].includes(Number(detailData.status)))" class="detail-loading-state">
          <i class="fas fa-spinner fa-spin detail-spinner"></i>
          <p>Generating...</p>
        </div>
        <div v-else-if="!displayResult" class="empty-state">
          <h4>No video generated yet</h4>
          <p>Fill in the form and click "Generate Video" to start.</p>
        </div>
        <div v-else class="result-display">
          <div class="video-result">
            <div class="video-player">
              <video v-if="displayResult.videoUrl" :src="displayResult.videoUrl" controls class="video-element"></video>
              <div v-else class="video-placeholder">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Generating...</p>
              </div>
            </div>
            <div class="video-actions">
              <button v-if="displayResult.videoUrl" @click="downloadVideo" class="action-btn">
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
const { fetchPrices, getPrice, formatCredits, discount } = useModelPrice()
onMounted(() => { fetchPrices() })
const batchUploadUrl = useBatchUploadUrl()

const modeTabToPath = {
  'text-to-video': '/home/wan/text-to-video',
  'image-to-video': '/home/wan/image-to-video',
  'video-to-video': '/home/wan/video-to-video'
}
const pathToMode = {
  '/home/wan/text-to-video': 'text-to-video',
  '/home/wan/image-to-video': 'image-to-video',
  '/home/wan/video-to-video': 'video-to-video'
}

const mode = ref('text-to-video')
function goToTab(m) {
  mode.value = m
  router.push(modeTabToPath[m] || modeTabToPath['text-to-video'])
}

watch(() => route.path, (path) => {
  const m = pathToMode[path]
  if (m && mode.value !== m) mode.value = m
}, { immediate: true })

const formData = reactive({
  prompt: '',
  imageUrls: [],
  videoUrls: [],
  duration: '5',
  resolution: '1080p',
  multiShots: false
})

const imageUploadRef = ref(null)
const videoInputRef = ref(null)
const isUploadingImages = ref(false)
const isUploadingVideo = ref(false)
const result = ref(null)
const isGenerating = ref(false)
const routeRecordId = computed(() => route.query['record-id'] || '')
const isDetailView = computed(() => !!routeRecordId.value)
const detailData = ref(null)

function fillFormFromOriginalData(o) {
  if (!o || typeof o !== 'object') return
  if (o.prompt != null) formData.prompt = String(o.prompt)
  if (o.duration != null) formData.duration = String(o.duration)
  if (o.resolution) formData.resolution = String(o.resolution)
  if ('multiShots' in o) formData.multiShots = !!o.multiShots
  if (Array.isArray(o.imageUrls)) formData.imageUrls = [...o.imageUrls]
  else if (Array.isArray(o.image_urls)) formData.imageUrls = [...o.image_urls]
  if (Array.isArray(o.videoUrls)) formData.videoUrls = [...o.videoUrls]
  else if (Array.isArray(o.video_urls)) formData.videoUrls = [...o.video_urls]
}

function pickDetailVideoUrl(d) {
  if (!d || typeof d !== 'object') return ''
  let url = d.outputUrl || d.videoUrl
  if (url) return typeof url === 'string' ? url : url?.url || ''
  const ou = d.outputUrls
  if (typeof ou === 'string' && ou) return ou
  if (Array.isArray(ou) && ou.length) {
    const first = ou[0]
    return typeof first === 'string' ? first : first?.url || ''
  }
  return ''
}

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
  } catch (e) { console.error('Wan load record detail failed:', e) }
}
watch(() => route.query['record-id'], (recordId) => {
  if (recordId) loadDetailByRecordId(recordId)
  else detailData.value = null
}, { immediate: true })

// 折扣文本
const discountText = computed(() => {
  const rate = Number(discount?.value ?? 1)
  if (Number.isNaN(rate) || rate <= 0 || rate === 1) return ''
  const percent = (rate * 100).toFixed(0)
  return ` · ${percent}%`
})

// 价格：按 Duration + Resolution 匹配，与 Veo3/Runway 等视频模型定价规则一致
const wanPriceModelKeyMap = {
  'text-to-video': 'wan-2-6-text-to-video',
  'image-to-video': 'wan-2-6-image-to-video',
  'video-to-video': 'wan-2-6-video-to-video'
}
const wanPriceText = computed(() => {
  const modelKey = wanPriceModelKeyMap[mode.value]
  if (!modelKey) return ''
  const credits = getPrice(modelKey, {
    duration: formData.duration,
    quality: formData.resolution
  })
  const str = formatCredits(credits)
  if (!str) return ''
  return `· ${str} credits${discountText.value}`
})

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

function triggerVideoInput() {
  videoInputRef.value?.click()
}
function clearVideo() {
  formData.videoUrls = []
  if (videoInputRef.value) videoInputRef.value.value = ''
}
async function handleVideoFile(e) {
  const file = e.target.files?.[0]
  if (!file) return
  if (file.size > 10 * 1024 * 1024) {
    showError('Video max 10MB')
    e.target.value = ''
    return
  }
  isUploadingVideo.value = true
  try {
    formData.videoUrls = await uploadFilesToUrls([file])
  } catch (err) {
    showError(err?.message || 'Upload failed')
    formData.videoUrls = []
  } finally {
    isUploadingVideo.value = false
    e.target.value = ''
  }
}

const promptPlaceholder = computed(() => {
  if (mode.value === 'text-to-video') return 'Describe the video you want (1–5000 characters, Chinese or English).'
  return 'Describe how to animate or transform the media (2–5000 characters).'
})
const promptHint = computed(() => {
  if (mode.value === 'text-to-video') return 'Min 1 character, max 5000. Supports Chinese and English.'
  return 'Min 2 characters, max 5000.'
})

const canGenerate = computed(() => {
  const p = (formData.prompt || '').trim()
  if (mode.value === 'text-to-video') return p.length >= 1 && p.length <= 5000
  if (mode.value === 'image-to-video') return p.length >= 2 && p.length <= 5000 && formData.imageUrls.length > 0
  if (mode.value === 'video-to-video') return p.length >= 2 && p.length <= 5000 && formData.videoUrls.length > 0
  return false
})

const displayResult = computed(() => {
  if (isDetailView.value && detailData.value && Number(detailData.value.status) === 2) {
    const url = pickDetailVideoUrl(detailData.value)
    if (url) return { videoUrl: url }
  }
  return result.value
})

async function generate() {
  const p = (formData.prompt || '').trim()
  if (!canGenerate.value) return

  isGenerating.value = true
  try {
    const modeVal = mode.value
    let apiPath, body

    if (modeVal === 'text-to-video') {
      apiPath = '/api/video/wan/text-to-video'
      body = {
        model: 'wan-2-6-text-to-video',
        prompt: p,
        duration: String(formData.duration),
        resolution: formData.resolution,
        multiShots: !!formData.multiShots
      }
    } else if (modeVal === 'image-to-video') {
      apiPath = '/api/video/wan/image-to-video'
      body = {
        model: 'wan-2-6-image-to-video',
        prompt: p,
        imageUrls: formData.imageUrls,
        duration: String(formData.duration),
        resolution: formData.resolution,
        multiShots: !!formData.multiShots
      }
    } else {
      apiPath = '/api/video/wan/video-to-video'
      const duration = formData.duration === '15' ? '10' : String(formData.duration)
      body = {
        model: 'wan-2-6-video-to-video',
        prompt: p,
        videoUrls: formData.videoUrls,
        duration,
        resolution: formData.resolution,
        multiShots: !!formData.multiShots
      }
    }

    const data = await post(apiPath, body)
    const rid = data?.recordId ?? data?.data?.recordId
    if (rid) {
      router.push((modeTabToPath[modeVal] || '/home/wan/text-to-video') + '?record-id=' + encodeURIComponent(rid))
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
    a.download = `wan-video-${Date.now()}.mp4`
    a.click()
  }
}

// Sync route on mode change (e.g. from sub-page)
watch(mode, (m) => {
  const path = modeTabToPath[m]
  if (path && route.path !== path) router.replace(path)
  if (m === 'video-to-video' && formData.duration === '15') formData.duration = '10'
})
</script>

<style scoped>
.wan-tool {
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

/* 模式选择区域：统一 mode-tabs-wrap 样式，主色 #3b82f6 */
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
.mode-tab i {
  font-size: 1em;
}
.mode-tab span {
  font-weight: 500;
}

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
.form-input, .form-select { padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; }
.form-input:focus { outline: none; border-color: #3b82f6; }
.form-hint { font-size: 12px; color: #6b7280; line-height: 1.4; }
.char-count { font-size: 12px; color: #6b7280; text-align: right; }
.select-with-arrow { position: relative; }
.select-with-arrow .form-input { width: 100%; appearance: none; padding-right: 32px; }
.select-arrow-icon { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); pointer-events: none; color: #6b7280; }

.checkbox-label { display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px; color: #374151; }
.checkbox-label input[type="checkbox"] { width: 16px; height: 16px; accent-color: #3b82f6; }

.form-actions { margin-top: 24px; padding-bottom: 20px; }
.price-tag { font-size: 15px; opacity: 0.8; margin-left: 4px; }
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
.btn-primary {
  width: 100%; padding: 16px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: #fff; border: none;
  border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
}
.btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(59,130,246,0.3); }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

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
  color: #3b82f6;
  text-decoration: none;
}
.detail-ref-link:hover {
  text-decoration: underline;
}

.result-panel {
  width: 65%; background: #fff; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; min-height: 400px; display: flex; flex-direction: column;
}
.empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; text-align: center; color: #6b7280; gap: 16px; }
.empty-state h4 { margin: 0; font-size: 18px; color: #374151; }
.video-result { display: flex; flex-direction: column; gap: 16px; }
.video-player { background: #000; border-radius: 8px; overflow: hidden; }
.video-element { width: 100%; height: auto; display: block; }
.video-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 200px; color: #6b7280; }
.video-actions { display: flex; gap: 8px; }
.action-btn { background: #f3f4f6; color: #374151; border: 1px solid #d1d5db; padding: 8px 12px; border-radius: 6px; font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 4px; }
.action-btn:hover { background: #e5e7eb; }

.wan-video-input { position: absolute; width: 0; height: 0; opacity: 0; pointer-events: none; }
.wan-video-upload { border: 2px dashed #d1d5db; border-radius: 12px; padding: 20px; text-align: center; cursor: pointer; min-height: 80px; display: flex; align-items: center; justify-content: center; }
.wan-video-upload:hover { border-color: #3b82f6; background: #f0f7ff; }
.wan-video-uploading { color: #64748b; }
.wan-video-placeholder { display: flex; flex-direction: column; align-items: center; gap: 8px; color: #64748b; }
.wan-video-preview-wrap { position: relative; width: 100%; max-width: 280px; margin: 0 auto; }
.wan-video-preview { width: 100%; max-height: 160px; display: block; border-radius: 8px; }
.wan-video-remove { position: absolute; top: 6px; right: 6px; width: 28px; height: 28px; border: none; border-radius: 50%; background: rgba(0,0,0,0.6); color: #fff; cursor: pointer; font-size: 18px; line-height: 1; }
.wan-video-remove:hover { background: #dc2626; }

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
