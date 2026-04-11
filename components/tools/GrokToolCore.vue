<template>
  <div class="grok-tool" :class="isVideoContext ? 'wan-like' : 'qwen-like'">
    <div class="tool-header">
      <div class="tool-avatar">
        <img src="/tools-logo/Grok.png" alt="Grok" />
      </div>
      <div class="tool-details">
        <h3>Grok</h3>
        <p class="tool-description">{{ isVideoContext ? videoDesc : imageDesc }}</p>
      </div>
    </div>

    <div class="mode-tabs-wrap">
      <div class="mode-tabs">
        <div v-for="t in tabs" :key="t.key" class="mode-tab" :class="{ active: mode === t.key }" @click="go(t.key)">
          <i :class="t.icon"></i>
          <span>{{ t.label }}</span>
        </div>
      </div>
    </div>

    <div class="main-content">
      <div class="config-panel">
        <div class="config-header">
          <h4>Configuration</h4>
        </div>
        <form class="config-form" @submit.prevent="generate">
          <fieldset class="config-fieldset" :disabled="loading">
            <div v-if="mode !== 'upscale'" class="form-group">
              <label class="form-label">Prompt <span v-if="isPromptRequired" class="required">*</span></label>
              <textarea v-model="form.prompt" class="form-input" rows="4" :maxlength="promptMaxLength" :placeholder="placeholder"></textarea>
              <div v-if="form.prompt" class="char-count">{{ form.prompt.length }}/{{ promptMaxLength }}</div>
            </div>

            <div v-if="mode === 'upscale' || mode === 'extend'" class="form-group">
              <label class="form-label">Original Task <span class="required">*</span></label>
              <div class="select-with-arrow">
                <select v-model="form.taskId" class="form-input">
                  <option disabled value="">{{ loadingExtendList ? 'Loading tasks...' : 'Select a task' }}</option>
                  <option v-for="item in extendList" :key="item.taskId" :value="item.taskId">{{ item.title || item.taskId }}</option>
                </select>
                <i class="fas fa-chevron-down select-arrow-icon"></i>
              </div>
              <div v-if="!loadingExtendList && extendList.length === 0" class="form-hint">No available tasks.</div>
            </div>

            <div v-if="mode === 'image-to-image' || mode === 'image-to-video'" class="form-group">
              <label class="form-label">
                Image URL(s) <span v-if="mode === 'image-to-image'" class="required">*</span>
              </label>
              <UploadImage
                input-id="grok-upload"
                label=""
                upload-text="Click to upload image(s)"
                upload-hint="JPEG, PNG, WEBP; max 10MB each"
                :max-files="mode === 'image-to-image' ? 5 : 7"
                :multiple="true"
                :max-file-size="10 * 1024 * 1024"
                accept="image/jpeg,image/png,image/webp"
                @update:files="handleFiles"
              />
            </div>

            <template v-if="isVideoContext">
              <div v-if="mode === 'text-to-video' || mode === 'image-to-video'" class="form-group">
                <label class="form-label">Aspect Ratio</label>
                <div class="tab-group">
                  <button type="button" class="tab-option" :class="{ active: form.aspectRatio === '2:3' }" @click="form.aspectRatio = '2:3'">2:3</button>
                  <button type="button" class="tab-option" :class="{ active: form.aspectRatio === '3:2' }" @click="form.aspectRatio = '3:2'">3:2</button>
                  <button type="button" class="tab-option" :class="{ active: form.aspectRatio === '1:1' }" @click="form.aspectRatio = '1:1'">1:1</button>
                  <button type="button" class="tab-option" :class="{ active: form.aspectRatio === '16:9' }" @click="form.aspectRatio = '16:9'">16:9</button>
                  <button type="button" class="tab-option" :class="{ active: form.aspectRatio === '9:16' }" @click="form.aspectRatio = '9:16'">9:16</button>
                </div>
              </div>

              <div v-if="mode === 'text-to-video' || mode === 'image-to-video'" class="form-group">
                <label class="form-label">Mode</label>
                <div class="tab-group">
                  <button type="button" class="tab-option" :class="{ active: form.motionMode === 'fun' }" @click="form.motionMode = 'fun'">fun</button>
                  <button type="button" class="tab-option" :class="{ active: form.motionMode === 'normal' }" @click="form.motionMode = 'normal'">normal</button>
                  <button
                    type="button"
                    class="tab-option"
                    :class="{ active: form.motionMode === 'spicy' }"
                    :disabled="mode === 'image-to-video' && form.imageUrls.length > 0"
                    @click="form.motionMode = 'spicy'"
                  >spicy</button>
                </div>
              </div>

              <div v-if="mode === 'text-to-video' || mode === 'image-to-video' || mode === 'extend'" class="form-group">
                <label class="form-label">{{ mode === 'extend' ? 'Extend Times' : 'Duration' }}</label>
                <div class="tab-group">
                  <button type="button" class="tab-option" :class="{ active: form.duration === '6' }" @click="form.duration = '6'">6s</button>
                  <button type="button" class="tab-option" :class="{ active: form.duration === '10' }" @click="form.duration = '10'">10s</button>
                </div>
              </div>

              <div v-if="mode === 'text-to-video' || mode === 'image-to-video' || mode === 'extend'" class="form-group">
                <label class="form-label">Resolution</label>
                <div class="tab-group">
                  <button type="button" class="tab-option" :class="{ active: form.resolution === '480p' }" @click="form.resolution = '480p'">480p</button>
                  <button type="button" class="tab-option" :class="{ active: form.resolution === '720p' }" @click="form.resolution = '720p'">720p</button>
                </div>
              </div>

              <div v-if="mode === 'extend'" class="form-group">
                <label class="form-label">Extend At</label>
                <input v-model.number="form.extendAt" type="number" min="0" class="form-input" />
                <div class="form-hint">The starting point of the extension</div>
              </div>
            </template>

            <div class="form-actions">
              <button type="submit" class="btn-primary" :disabled="!canGenerate || loading">
                <i v-if="loading" class="fas fa-spinner fa-spin"></i>
                <i v-else :class="isVideoContext ? 'fas fa-play' : 'fas fa-magic'"></i>
                {{ loading ? 'Generating...' : (isVideoContext ? 'Generate Video' : 'Generate Image') }}
                <span v-if="grokPriceText" class="price-tag">{{ grokPriceText }}</span>
              </button>
            </div>
          </fieldset>
        </form>
      </div>

      <div class="result-panel">
        <div v-if="!result" class="empty-state">
          <h4>{{ isVideoContext ? 'No video generated yet' : 'No image generated yet' }}</h4>
          <p>Fill in the form and click generate to start.</p>
        </div>
        <div v-else class="result-display">
          <div v-if="result.imageUrl" class="image-result">
            <img :src="result.imageUrl" alt="Generated image" class="result-image" />
            <div class="media-actions">
              <button class="action-btn" @click="downloadImage"><i class="fas fa-download"></i> Download</button>
            </div>
          </div>
          <div v-else class="video-result">
            <div class="video-player">
              <video :src="result.videoUrl" controls class="video-element"></video>
            </div>
            <div class="media-actions">
              <button class="action-btn" @click="downloadVideo"><i class="fas fa-download"></i> Download</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UploadImage from './common/UploadImage.vue'
import { useApi } from '~/composables/useApi'
import { useToast } from '~/composables/useToast'
import { useModelPrice } from '~/composables/useModelPrice'

const route = useRoute()
const router = useRouter()
const { post, get } = useApi()
const { token } = useAuth()
const { showError } = useToast()
const { fetchPrices, getPrice, formatCredits } = useModelPrice()
const batchUploadUrl = useBatchUploadUrl()
const { getUrlsForFiles } = useFileUploadUrlCache()
onMounted(() => { fetchPrices() })

const getAuthToken = () => {
  if (!import.meta.client) return null
  try {
    if (token?.value) return token.value
    return localStorage.getItem('auth_token')
  } catch {
    return localStorage.getItem('auth_token')
  }
}

const imageDesc = 'Grok Imagine is xAI\'s multimodal image and video generation model that converts text or images into short visual outputs with coherent motion and synchronized audio.'
const videoDesc = 'Grok Imagine is xAI\'s multimodal image and video generation model that converts text or images into short visual outputs with coherent motion and synchronized audio.'
const EXTEND_LIST_MODEL = 'grok-imagine-text-to-video'
const extendList = ref([])
const loadingExtendList = ref(false)
const hasLoadedExtendList = ref(false)
const getSharedExtendListCache = () => {
  if (!import.meta.client) return null
  const key = '__fuseExtendListCache__'
  const root = globalThis
  root[key] = root[key] || {}
  root[key][EXTEND_LIST_MODEL] = root[key][EXTEND_LIST_MODEL] || { data: null, promise: null }
  return root[key][EXTEND_LIST_MODEL]
}
const fetchExtendList = async (force = false) => {
  if (!import.meta.client) return
  if (loadingExtendList.value) return
  if (!force && hasLoadedExtendList.value) return
  const shared = getSharedExtendListCache()
  if (!force && shared?.data) {
    extendList.value = Array.isArray(shared.data) ? shared.data : []
    hasLoadedExtendList.value = true
    return
  }
  loadingExtendList.value = true
  try {
    if (shared?.promise) {
      await shared.promise
      extendList.value = Array.isArray(shared.data) ? shared.data : []
    } else {
      const request = get(`/api/records/extend-list?model=${encodeURIComponent(EXTEND_LIST_MODEL)}`)
      if (shared) shared.promise = request
      const data = await request
      const list = Array.isArray(data) ? data : []
      extendList.value = list
      if (shared) shared.data = list
    }
    hasLoadedExtendList.value = true
  } catch {
    extendList.value = []
  } finally {
    if (shared) shared.promise = null
    loadingExtendList.value = false
  }
}

const imageModes = ['text-to-image', 'image-to-image']
const videoModes = ['text-to-video', 'image-to-video', 'upscale', 'extend']

const tabsByCtx = {
  image: [
    { key: 'text-to-image', label: 'Text to Image', icon: 'fas fa-font' },
    { key: 'image-to-image', label: 'Image to Image', icon: 'fas fa-image' }
  ],
  video: [
    { key: 'text-to-video', label: 'Text to Video', icon: 'fas fa-font' },
    { key: 'image-to-video', label: 'Image to Video', icon: 'fas fa-film' },
    { key: 'upscale', label: 'Upscale', icon: 'fas fa-up-right-and-down-left-from-center' },
    { key: 'extend', label: 'Extend', icon: 'fas fa-video' }
  ]
}

const pathToMode = {
  '/home/grok/text-to-image': 'text-to-image',
  '/home/grok/image-to-image': 'image-to-image',
  '/home/grok/text-to-video': 'text-to-video',
  '/home/grok/image-to-video': 'image-to-video',
  '/home/grok/upscale': 'upscale',
  '/home/grok/extend': 'extend'
}
const modeToPath = Object.fromEntries(Object.entries(pathToMode).map(([k, v]) => [v, k]))

const mode = ref(pathToMode[route.path] || 'text-to-image')
watch(() => route.path, (p) => {
  if (pathToMode[p]) mode.value = pathToMode[p]
}, { immediate: true })
watch(mode, (m) => {
  if (m === 'upscale' || m === 'extend') fetchExtendList(true)
}, { immediate: true })

const isVideoContext = computed(() => videoModes.includes(mode.value))
const tabs = computed(() => tabsByCtx[isVideoContext.value ? 'video' : 'image'])
const placeholder = computed(() => isVideoContext.value ? 'Describe motion, camera movement, and timing...' : 'Describe the desired image in detail...')
const isPromptRequired = computed(() => ['text-to-image', 'text-to-video', 'extend'].includes(mode.value))
const promptMaxLength = 5000
const grokPriceModelKeyMap = {
  'text-to-image': 'grok-imagine-text-to-image',
  'image-to-image': 'grok-imagine-image-to-image',
  'text-to-video': 'grok-imagine-text-to-video',
  'image-to-video': 'grok-imagine-image-to-video',
  upscale: 'grok-imagine-upscale',
  extend: 'grok-imagine-extend'
}
const grokPriceText = computed(() => {
  const modelKey = grokPriceModelKeyMap[mode.value]
  if (!modelKey) return ''
  const formFields = ['text-to-video', 'image-to-video', 'extend'].includes(mode.value)
    ? { duration: form.duration, quality: form.resolution }
    : {}
  const credits = getPrice(modelKey, formFields)
  const text = formatCredits(credits)
  return text ? `· ${text} credits` : ''
})
const canGenerate = computed(() => {
  if (loading.value) return false
  const prompt = form.prompt.trim()
  const taskId = form.taskId.trim()

  if (mode.value === 'text-to-image') return !!prompt
  if (mode.value === 'image-to-image') return form.imageUrls.length > 0
  if (mode.value === 'text-to-video') return !!prompt
  if (mode.value === 'image-to-video') return !!prompt || form.imageUrls.length > 0
  if (mode.value === 'upscale') return !!taskId
  if (mode.value === 'extend') return !!taskId && !!prompt
  return false
})

const form = reactive({
  prompt: '',
  taskId: '',
  imageUrls: [],
  aspectRatio: '2:3',
  motionMode: 'normal',
  duration: '6',
  resolution: '480p',
  extendAt: 0
})
const loading = ref(false)
const result = ref(null)

function go(m) {
  mode.value = m
  router.push(modeToPath[m] || modeToPath['text-to-image'])
}

async function handleFiles(files) {
  if (!files?.length) {
    form.imageUrls = []
    return
  }
  const list = Array.isArray(files) ? files : [files]
  const headers = { Accept: 'application/json' }
  const authToken = getAuthToken()
  if (authToken) headers['Authorization'] = `Bearer ${authToken}`
  try {
    form.imageUrls = await getUrlsForFiles(list, async (need) => {
      const fd = new FormData()
      need.forEach((f) => fd.append('file', f))
      const res = await fetch(batchUploadUrl, { method: 'POST', headers, body: fd, credentials: 'include' })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.errorMessage || err?.message || 'Upload failed')
      }
      const data = await res.json()
      const urls = data?.data?.urls || data?.fileUrls || []
      return Array.isArray(urls) ? urls : []
    })
  } catch (e) {
    form.imageUrls = []
    showError(e?.message || 'Upload failed')
  }
}

async function generate() {
  if (!canGenerate.value) return
  loading.value = true
  try {
    let api = ''
    let body = {}
    if (mode.value === 'text-to-image') {
      api = '/api/image/grok/text-to-image'
      body = { model: 'grok-imagine-text-to-image', prompt: form.prompt.trim(), aspectRatio: '1:1' }
    } else if (mode.value === 'image-to-image') {
      api = '/api/image/grok/image-to-image'
      body = { model: 'grok-imagine-image-to-image', prompt: form.prompt.trim() || undefined, imageUrls: form.imageUrls }
    } else if (mode.value === 'text-to-video') {
      api = '/api/video/grok/text-to-video'
      body = {
        model: 'grok-imagine-text-to-video',
        prompt: form.prompt.trim(),
        aspectRatio: form.aspectRatio,
        mode: form.motionMode,
        duration: Number(form.duration),
        resolution: form.resolution
      }
    } else if (mode.value === 'image-to-video') {
      api = '/api/video/grok/image-to-video'
      body = {
        model: 'grok-imagine-image-to-video',
        imageUrls: form.imageUrls,
        prompt: form.prompt.trim() || undefined,
        mode: form.motionMode,
        duration: Number(form.duration),
        resolution: form.resolution,
        aspectRatio: form.aspectRatio
      }
    } else if (mode.value === 'upscale') {
      api = '/api/video/grok/upscale'
      body = { model: 'grok-imagine-upscale', taskId: form.taskId.trim() }
    } else {
      api = '/api/video/grok/extend'
      body = {
        model: 'grok-imagine-extend',
        taskId: form.taskId.trim(),
        prompt: form.prompt.trim(),
        extendAt: Number(form.extendAt) || 0,
        extendTimes: form.duration
      }
    }

    const data = await post(api, body)
    const url = data?.imageUrl ?? data?.videoUrl ?? data?.outputUrl ?? (Array.isArray(data?.outputUrls) ? data.outputUrls[0] : '')
    result.value = imageModes.includes(mode.value) ? { imageUrl: url } : { videoUrl: url }
  } catch (e) {
    if (!e?.__fromApi) showError(e?.message || 'Generate failed')
  } finally {
    loading.value = false
  }
}

function downloadImage() {
  if (!result.value?.imageUrl) return
  const a = document.createElement('a')
  a.href = result.value.imageUrl
  a.download = `grok-image-${Date.now()}.png`
  a.click()
}

function downloadVideo() {
  if (!result.value?.videoUrl) return
  const a = document.createElement('a')
  a.href = result.value.videoUrl
  a.download = `grok-video-${Date.now()}.mp4`
  a.click()
}
</script>

<style scoped>
.grok-tool {
  width: 100%;
  height: 100%;
  padding: 20px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
}
.tool-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 20px;
}
.tool-avatar { width: 48px; height: 48px; border-radius: 12px; overflow: hidden; flex-shrink: 0; }
.tool-avatar img { width: 100%; height: 100%; object-fit: cover; }
.tool-details h3 { margin: 0 0 4px 0; font-size: 20px; font-weight: 600; color: #1f2937; }
.tool-details p { margin: 0; font-size: 13px; color: #6b7280; line-height: 1.55; }

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
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}
.mode-tab:hover { border-color: #3b82f6; color: #3b82f6; }
.mode-tab.active { background: #3b82f6; color: #fff; border-color: #3b82f6; }
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
.config-form { display: flex; flex-direction: column; gap: 16px; flex: 1; overflow-y: auto; }
.config-fieldset { border: none; margin: 0; padding: 0; }

.form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 24px; }
.form-group:last-of-type { margin-bottom: 0; }
.form-label { font-size: 14px; font-weight: 500; color: #374151; }
.required { color: #ef4444; }
.form-input {
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
}
.form-input:focus { outline: none; border-color: #3b82f6; }
.char-count { font-size: 12px; color: #6b7280; text-align: right; }
.form-hint { font-size: 12px; color: #6b7280; line-height: 1.4; }
.select-with-arrow { position: relative; }
.select-with-arrow .form-input { width: 100%; appearance: none; padding-right: 32px; }
.select-arrow-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #6b7280;
  font-size: 12px;
}

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
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.qwen-like .tab-option {
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #64748b;
}
.qwen-like .tab-option:hover {
  background: #f8fafc;
  border-color: #3b82f6;
  color: #3b82f6;
}
.qwen-like .tab-option.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: #fff;
}

.wan-like .tab-option {
  border: 2px solid #e2e8f0;
  background: #f8fafc;
  color: #374151;
}
.wan-like .tab-option:hover {
  background: rgba(59, 130, 246, 0.05);
  border-color: #3b82f6;
  color: #3b82f6;
}
.wan-like .tab-option.active {
  border-color: #3b82f6;
  background: #3b82f6;
  color: #fff;
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
.btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3); }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
.price-tag { font-size: 15px; opacity: 0.85; margin-left: 4px; }

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
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
  color: #6b7280;
  gap: 12px;
}
.empty-state h4 { margin: 0; font-size: 18px; color: #374151; }
.result-image { max-width: 100%; height: auto; border-radius: 8px; display: block; }
.video-player { background: #000; border-radius: 8px; overflow: hidden; }
.video-element { width: 100%; height: auto; display: block; }
.media-actions { display: flex; margin-top: 12px; }
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

@media (max-width: 1024px) {
  .main-content { flex-direction: column; }
  .config-panel, .result-panel { width: 100%; }
}
</style>
