<template>
  <div class="seedance-tool">
    <div class="tool-header">
      <div class="tool-avatar">
        <img src="/tools-logo/Seedance.png" alt="Seedance" />
      </div>
      <div class="tool-details">
        <h3>Seedance</h3>
        <p class="tool-description">Seedance is a multimodal AI video model by ByteDance that generates consistent, cinematic videos with strong multi-shot consistency and native audio using text, image, video, and audio references.</p>
      </div>
    </div>

    <div class="mode-tabs-wrap">
      <div class="mode-tabs">
        <div
          v-for="m in modeList"
          :key="m.id"
          class="mode-tab"
          :class="{ active: mode === m.id }"
          @click="goToTab(m.id)"
        >
          <i :class="m.icon"></i>
          <span>{{ m.label }}</span>
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
              <label for="seedance-prompt" class="form-label">
                Prompt <span class="required">*</span>
              </label>
              <textarea
                id="seedance-prompt"
                v-model="formData.prompt"
                class="form-input"
                rows="4"
                placeholder="The text prompt used to generate the video (max 10000 characters)"
                maxlength="10000"
                required
              ></textarea>
              <div class="char-count" v-if="formData.prompt">{{ formData.prompt.length }}/10000</div>
            </div>

            <!-- Image modes: imageUrl (required) -->
            <div v-if="isImageMode" class="form-group">
              <label class="form-label">
                Image URL <span class="required">*</span>
              </label>
              <UploadImage
                ref="imageUploadRef"
                input-id="seedance-image-upload"
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

            <!-- v1-lite-image-to-video: optional endImageUrl -->
            <div v-if="mode === 'v1-lite-image-to-video'" class="form-group">
              <label class="form-label">End Image URL (optional)</label>
              <UploadImage
                ref="endImageUploadRef"
                input-id="seedance-end-image-upload"
                label=""
                upload-text="Click to upload end frame image"
                upload-hint="Optional; JPEG, PNG, WebP; max 10MB"
                :max-files="1"
                :max-file-size="10 * 1024 * 1024"
                accept="image/jpeg,image/png,image/webp"
                :multiple="false"
                @update:files="handleEndImageFile"
              />
              <span v-if="isUploadingEndImage" class="form-hint">Uploading...</span>
            </div>

            <!-- Aspect ratio: text-to-video modes only -->
            <div v-if="isTextToVideoMode" class="form-group">
              <label for="seedance-aspect" class="form-label">Aspect Ratio</label>
              <div class="select-with-arrow">
                <select id="seedance-aspect" v-model="formData.aspectRatio" class="form-input">
                  <template v-if="mode === 'v1-lite-text-to-video'">
                    <option value="16:9">16:9</option>
                    <option value="4:3">4:3</option>
                    <option value="1:1">1:1</option>
                    <option value="3:4">3:4</option>
                    <option value="9:16">9:16</option>
                    <option value="9:21">9:21</option>
                  </template>
                  <template v-else>
                    <option value="21:9">21:9</option>
                    <option value="16:9">16:9</option>
                    <option value="4:3">4:3</option>
                    <option value="1:1">1:1</option>
                    <option value="3:4">3:4</option>
                    <option value="9:16">9:16</option>
                  </template>
                </select>
                <i class="fas fa-chevron-down select-arrow-icon"></i>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Resolution</label>
              <div class="tab-group">
                <button v-if="mode !== 'v1-pro-fast-image-to-video'" type="button" class="tab-option" :class="{ active: formData.resolution === '480p' }" @click="formData.resolution = '480p'">480p</button>
                <button type="button" class="tab-option" :class="{ active: formData.resolution === '720p' }" @click="formData.resolution = '720p'">720p</button>
                <button type="button" class="tab-option" :class="{ active: formData.resolution === '1080p' }" @click="formData.resolution = '1080p'">1080p</button>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Duration</label>
              <div class="tab-group">
                <button type="button" class="tab-option" :class="{ active: formData.duration === '5' }" @click="formData.duration = '5'">5s</button>
                <button type="button" class="tab-option" :class="{ active: formData.duration === '10' }" @click="formData.duration = '10'">10s</button>
              </div>
            </div>

            <!-- cameraFixed, seed, enableSafetyChecker: not in pro-fast -->
            <template v-if="mode !== 'v1-pro-fast-image-to-video'">
              <div class="form-group">
                <label class="checkbox-label">
                  <input v-model="formData.cameraFixed" type="checkbox" />
                  <span>Camera fixed</span>
                </label>
              </div>
              <div class="form-group">
                <label for="seedance-seed" class="form-label">Seed</label>
                <input
                  id="seedance-seed"
                  v-model.number="formData.seed"
                  type="number"
                  class="form-input"
                  placeholder="-1 for random"
                  min="-1"
                  :max="2147483647"
                />
                <div class="form-hint">Use -1 for random.</div>
              </div>
              <div v-if="isTextToVideoMode || mode === 'v1-pro-image-to-video'" class="form-group">
                <label class="checkbox-label">
                  <input v-model="formData.enableSafetyChecker" type="checkbox" />
                  <span>Enable safety checker</span>
                </label>
              </div>
            </template>

            <div class="form-actions">
              <button type="submit" class="btn-primary" :disabled="!canGenerate || isGenerating || isDetailView">
                <i v-if="isGenerating" class="fas fa-spinner fa-spin"></i>
                <i v-else class="fas fa-play"></i>
                {{ isGenerating ? 'Generating...' : 'Generate Video' }}
                <span v-if="seedancePriceText" class="price-tag">{{ seedancePriceText }}</span>
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

const modeList = [
  { id: 'v1-lite-text-to-video', label: 'v1 Lite T2V', icon: 'fas fa-font' },
  { id: 'v1-lite-image-to-video', label: 'v1 Lite I2V', icon: 'fas fa-image' },
  { id: 'v1-pro-text-to-video', label: 'v1 Pro T2V', icon: 'fas fa-font' },
  { id: 'v1-pro-image-to-video', label: 'v1 Pro I2V', icon: 'fas fa-image' },
  { id: 'v1-pro-fast-image-to-video', label: 'v1 Pro Fast I2V', icon: 'fas fa-bolt' }
]

const modeTabToPath = {
  'v1-lite-text-to-video': '/home/seedance/v1-lite-text-to-video',
  'v1-lite-image-to-video': '/home/seedance/v1-lite-image-to-video',
  'v1-pro-text-to-video': '/home/seedance/v1-pro-text-to-video',
  'v1-pro-image-to-video': '/home/seedance/v1-pro-image-to-video',
  'v1-pro-fast-image-to-video': '/home/seedance/v1-pro-fast-image-to-video'
}
const pathToMode = {}
Object.keys(modeTabToPath).forEach(k => { pathToMode[modeTabToPath[k]] = k })

const mode = ref('v1-lite-text-to-video')
function goToTab(m) {
  mode.value = m
  router.push(modeTabToPath[m] || modeTabToPath['v1-lite-text-to-video'])
}

watch(() => route.path, (path) => {
  const m = pathToMode[path]
  if (m && mode.value !== m) mode.value = m
}, { immediate: true })

const formData = reactive({
  prompt: '',
  imageUrl: '',
  endImageUrl: '',
  aspectRatio: '16:9',
  resolution: '720p',
  duration: '5',
  cameraFixed: false,
  seed: -1,
  enableSafetyChecker: true
})

// 折扣文本
const discountText = computed(() => {
  const rate = Number(discount?.value ?? 1)
  if (Number.isNaN(rate) || rate <= 0 || rate === 1) return ''
  const percent = (rate * 100).toFixed(0)
  return ` · ${percent}%`
})

// 价格：按 Duration + Resolution 匹配，与 Veo3/Runway 等视频模型定价规则一致
const seedancePriceModelKeyMap = {
  'v1-lite-text-to-video': 'seedance-v1-lite-text-to-video',
  'v1-lite-image-to-video': 'seedance-v1-lite-image-to-video',
  'v1-pro-text-to-video': 'seedance-v1-pro-text-to-video',
  'v1-pro-image-to-video': 'seedance-v1-pro-image-to-video',
  'v1-pro-fast-image-to-video': 'seedance-v1-pro-fast-image-to-video'
}
const seedancePriceText = computed(() => {
  const modelKey = seedancePriceModelKeyMap[mode.value]
  if (!modelKey) return ''
  const credits = getPrice(modelKey, {
    duration: formData.duration,
    quality: formData.resolution
  })
  const str = formatCredits(credits)
  if (!str) return ''
  return `· ${str} credits${discountText.value}`
})

const imageUploadRef = ref(null)
const endImageUploadRef = ref(null)
const isUploadingImage = ref(false)
const isUploadingEndImage = ref(false)
const result = ref(null)
const isGenerating = ref(false)
const routeRecordId = computed(() => route.query['record-id'] || '')
const isDetailView = computed(() => !!routeRecordId.value)
const detailData = ref(null)

const isTextToVideoMode = computed(() => mode.value === 'v1-lite-text-to-video' || mode.value === 'v1-pro-text-to-video')
const isImageMode = computed(() => [
  'v1-lite-image-to-video',
  'v1-pro-image-to-video',
  'v1-pro-fast-image-to-video'
].includes(mode.value))

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
  const url = Array.isArray(urls) && urls.length ? urls[0] : ''
  return typeof url === 'string' ? url : (url?.url || '')
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

async function handleEndImageFile(files) {
  if (!files?.length) {
    formData.endImageUrl = ''
    return
  }
  const file = Array.isArray(files) ? files[0] : files
  isUploadingEndImage.value = true
  try {
    formData.endImageUrl = await uploadFileToUrl(file)
  } catch (e) {
    showError(e?.message || 'Upload failed')
    formData.endImageUrl = ''
    endImageUploadRef.value?.clearFiles?.()
  } finally {
    isUploadingEndImage.value = false
  }
}

const canGenerate = computed(() => {
  const p = (formData.prompt || '').trim()
  if (!p || p.length > 10000) return false
  if (isImageMode.value) return !!formData.imageUrl
  return true
})

const displayResult = computed(() => {
  if (isDetailView.value && detailData.value?.status === 2 && detailData.value?.outputUrls?.length) {
    const url = typeof detailData.value.outputUrls[0] === 'string' ? detailData.value.outputUrls[0] : detailData.value.outputUrls[0]?.url
    return { videoUrl: url }
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
  } catch (e) { console.error('Seedance load record detail failed:', e) }
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
    const modeVal = mode.value
    let apiPath, body

    const toSeed = (v) => {
      if (v == null || v === '') return -1
      const n = Number(v)
      return Number.isNaN(n) ? -1 : n
    }

    if (modeVal === 'v1-lite-text-to-video') {
      apiPath = '/api/video/seedance/lite-text-to-video'
      body = {
        model: 'seedance-v1-lite-text-to-video',
        prompt: p,
        aspectRatio: formData.aspectRatio,
        resolution: formData.resolution,
        duration: String(formData.duration),
        cameraFixed: !!formData.cameraFixed,
        seed: toSeed(formData.seed),
        enableSafetyChecker: !!formData.enableSafetyChecker
      }
    } else if (modeVal === 'v1-lite-image-to-video') {
      apiPath = '/api/video/seedance/lite-image-to-video'
      body = {
        model: 'seedance-v1-lite-image-to-video',
        prompt: p,
        imageUrl: formData.imageUrl,
        resolution: formData.resolution,
        duration: String(formData.duration),
        cameraFixed: !!formData.cameraFixed,
        seed: toSeed(formData.seed),
        endImageUrl: (formData.endImageUrl || '').trim() || undefined
      }
    } else if (modeVal === 'v1-pro-text-to-video') {
      apiPath = '/api/video/seedance/pro-text-to-video'
      body = {
        model: 'seedance-v1-pro-text-to-video',
        prompt: p,
        aspectRatio: formData.aspectRatio,
        resolution: formData.resolution,
        duration: String(formData.duration),
        cameraFixed: !!formData.cameraFixed,
        seed: toSeed(formData.seed),
        enableSafetyChecker: !!formData.enableSafetyChecker
      }
    } else if (modeVal === 'v1-pro-image-to-video') {
      apiPath = '/api/video/seedance/pro-image-to-video'
      body = {
        model: 'seedance-v1-pro-image-to-video',
        prompt: p,
        imageUrl: formData.imageUrl,
        resolution: formData.resolution,
        duration: String(formData.duration),
        cameraFixed: !!formData.cameraFixed,
        seed: toSeed(formData.seed),
        enableSafetyChecker: !!formData.enableSafetyChecker
      }
    } else {
      apiPath = '/api/video/seedance/pro-fast-image-to-video'
      body = {
        model: 'seedance-v1-pro-fast-image-to-video',
        prompt: p,
        imageUrl: formData.imageUrl,
        resolution: formData.resolution,
        duration: String(formData.duration)
      }
    }

    const data = await post(apiPath, body)
    const rid = data?.recordId ?? data?.data?.recordId
    if (rid) {
      router.push((modeTabToPath[modeVal] || '/home/seedance/v1-lite-text-to-video') + '?record-id=' + encodeURIComponent(rid))
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
    a.download = `seedance-video-${Date.now()}.mp4`
    a.click()
  }
}

watch(mode, (m) => {
  const path = modeTabToPath[m]
  if (path && route.path !== path) router.replace(path)
})
</script>

<style scoped>
.seedance-tool {
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

.checkbox-label { display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px; color: #374151; }
.checkbox-label input[type="checkbox"] { width: 16px; height: 16px; accent-color: #3b82f6; }

.form-actions { margin-top: 24px; padding-bottom: 20px; }
.price-tag { font-size: 15px; opacity: 0.8; margin-left: 4px; }
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
.video-result { display: flex; flex-direction: column; gap: 16px; }
.video-player { background: #000; border-radius: 8px; overflow: hidden; }
.video-element { width: 100%; height: auto; display: block; }
.video-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 200px; color: #6b7280; }
.video-actions { display: flex; gap: 8px; }
.action-btn { background: #f3f4f6; color: #374151; border: 1px solid #d1d5db; padding: 8px 12px; border-radius: 6px; font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 4px; }
.action-btn:hover { background: #e5e7eb; }

.detail-loading-state, .detail-failure-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; padding: 40px; text-align: center;
}
.detail-spinner { font-size: 48px; color: #3b82f6; }
.detail-loading-state p, .detail-failure-state p { margin: 0; font-size: 16px; color: #64748b; }
.detail-failure-state .failure-icon { font-size: 56px; color: #ef4444; }

@media (max-width: 1200px) {
}
@media (max-width: 1024px) {
  .main-content { flex-direction: column; }
  .config-panel, .result-panel { width: 100%; }
}
@media (max-width: 768px) {
  .mode-tabs {
    gap: 6px;
  }
  .mode-tab {
    padding: 8px 12px;
    font-size: 13px;
  }
}
</style>
