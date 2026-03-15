<template>
  <div class="sora-tool">
    <!-- 工具信息头部 -->
    <div class="tool-header">
      <div class="tool-avatar">
        <img src="/tools-logo/sora.png" alt="Sora" />
      </div>
      <div class="tool-details">
        <h3>Sora</h3>
        <p>Sora is OpenAI's latest AI video generation model, supporting both text-to-video and image-to-video. It delivers realistic motion, physics consistency, with improved control over style, scene, and aspect ratio—ideal for creative apps and social media content.</p>
      </div>
    </div>

    <!-- 顶部：模式切换（从左侧移至顶部） -->
    <div class="mode-tabs">
      <div class="mode-tab"
           :class="{ active: form.model === 'text-to-video' }"
           @click="switchMode('text-to-video')">
        <i class="fas fa-keyboard"></i>
        <span>text-to-video</span>
      </div>
      <div class="mode-tab"
           :class="{ active: form.model === 'image-to-video' }"
           @click="switchMode('image-to-video')">
        <i class="fas fa-image"></i>
        <span>image-to-video</span>
      </div>
      <div class="mode-tab"
           :class="{ active: form.model === 'pro-text-to-video' }"
           @click="switchMode('pro-text-to-video')">
        <i class="fas fa-magic"></i>
        <span>pro-text-to-video</span>
      </div>
      <div class="mode-tab"
           :class="{ active: form.model === 'pro-image-to-video' }"
           @click="switchMode('pro-image-to-video')">
        <i class="fas fa-wand-magic-sparkles"></i>
        <span>pro-image-to-video</span>
      </div>
      <div class="mode-tab"
           :class="{ active: form.model === 'watermark-remover' }"
           @click="switchMode('watermark-remover')">
        <i class="fas fa-water"></i>
        <span>watermark-remover</span>
      </div>
      <div class="mode-tab"
           :class="{ active: form.model === 'pro-storyboard' }"
           @click="switchMode('pro-storyboard')">
        <i class="fas fa-book"></i>
        <span>pro-storyboard</span>
      </div>
    </div>

    <div class="main-content">
      <!-- 左侧配置面板 -->
      <div class="config-panel">
        <div class="config-header">
          <h4>Sora Configuration</h4>
        </div>

        <!-- 模式选择已移动至顶部 -->
        <fieldset class="config-fieldset" :disabled="isGenerating || isDetailView">

        <!-- Prompt (hidden for watermark-remover & pro-storyboard) -->
        <div class="form-group" v-if="!['watermark-remover','pro-storyboard'].includes(form.model)">
          <label for="prompt">Prompt *</label>
          <textarea
            id="prompt"
            v-model="form.input.prompt"
            rows="5"
            maxlength="10000"
            placeholder="The text prompt describing the desired video motion"
            required
          ></textarea>
          <div class="char-count">{{ form.input.prompt.length }}/10000</div>
        </div>

        <!-- Image Upload（image-to-video & pro-image-to-video 必填，storyboard 可选） -->
        <div class="form-group" v-if="['image-to-video','pro-image-to-video','pro-storyboard'].includes(form.model)">
          <label>Reference Images *</label>
          <span v-if="isUploadingImages" class="form-hint">Uploading images...</span>
          <UploadImage
            ref="imageUploadRef"
            input-id="sora-image-upload"
            label=""
            upload-icon="fas fa-cloud-upload-alt"
            upload-text="Click to upload image"
            upload-hint="Supports JPG/PNG/WEBP, up to 3 images, max 10MB each"
            theme-color="#3b82f6"
            :max-files="3"
            :max-file-size="10 * 1024 * 1024"
            accept="image/*"
            :multiple="true"
            @update:files="handleSoraImagesUpdate"
          />
          
        </div>

        <!-- Aspect Ratio (tab 单选; hidden for watermark-remover) -->
        <div class="form-group" v-if="form.model !== 'watermark-remover'">
          <label>Aspect Ratio</label>
          <div class="tab-group">
            <div class="tab-options">
              <button
                type="button"
                class="tab-option"
                :class="{ active: form.input.aspect_ratio === 'portrait' }"
                @click="form.input.aspect_ratio = 'portrait'"
              >
                portrait
              </button>
              <button
                type="button"
                class="tab-option"
                :class="{ active: form.input.aspect_ratio === 'landscape' }"
                @click="form.input.aspect_ratio = 'landscape'"
              >
                landscape
              </button>
            </div>
          </div>
          <div class="form-help">Defines the generated video's aspect ratio.</div>
        </div>

        <!-- n_frames (tab 单选; hidden for watermark-remover) -->
        <div class="form-group" v-if="form.model !== 'watermark-remover'">
          <label>Frames</label>
          <div class="tab-group">
            <div class="tab-options">
              <button
                type="button"
                class="tab-option"
                :class="{ active: form.input.n_frames === '10' }"
                @click="form.input.n_frames = '10'"
              >
                10s
              </button>
              <button
                type="button"
                class="tab-option"
                :class="{ active: form.input.n_frames === '15' }"
                @click="form.input.n_frames = '15'"
              >
                15s
              </button>
              <button
                v-if="form.model === 'pro-storyboard'"
                type="button"
                class="tab-option"
                :class="{ active: form.input.n_frames === '25' }"
                @click="form.input.n_frames = '25'"
              >
                25s
              </button>
            </div>
          </div>
          <div class="form-help" v-if="form.model === 'pro-storyboard'">Frames is required for storyboard.</div>
        </div>

        <!-- size (仅 pro 模式) - tab 切换，无 Default -->
        <div class="form-group" v-if="['pro-text-to-video','pro-image-to-video'].includes(form.model)">
          <label>Size</label>
          <div class="tab-group">
            <div class="tab-options">
              <button 
                type="button"
                class="tab-option"
                :class="{ active: form.input.size === 'standard' }"
                @click="form.input.size = 'standard'"
              >
                standard
              </button>
              <button 
                type="button"
                class="tab-option"
                :class="{ active: form.input.size === 'high' }"
                @click="form.input.size = 'high'"
              >
                high
              </button>
            </div>
          </div>
        </div>

        <!-- remove_watermark (hidden for watermark-remover & pro-storyboard) -->
        <div class="form-group" v-if="!['watermark-remover','pro-storyboard'].includes(form.model)">
          <label>Remove Watermark</label>
          <div class="tab-group">
            <div class="tab-options">
              <button 
                type="button"
                class="tab-option"
                :class="{ active: form.input.remove_watermark === true }"
                @click="form.input.remove_watermark = true"
              >
                <i class="fas fa-check"></i>
                true
              </button>
              <button 
                type="button"
                class="tab-option"
                :class="{ active: form.input.remove_watermark === false }"
                @click="form.input.remove_watermark = false"
              >
                <i class="fas fa-times"></i>
                false
              </button>
            </div>
          </div>
        </div>

        <!-- watermark remover 专用：上传视频 -->
        <div class="form-group" v-if="form.model === 'watermark-remover'">
          <label class="form-label">Upload Video <span class="required">*</span></label>
          <input
            type="file"
            accept="video/*"
            class="sora-video-file-input"
            ref="watermarkVideoInputRef"
            @change="handleWatermarkVideoUpload"
          />
          <div class="sora-video-upload-area" @click="triggerWatermarkVideoInput">
            <div v-if="isUploadingWatermarkVideo" class="sora-video-uploading">
              <i class="fas fa-spinner fa-spin"></i> Uploading video...
            </div>
            <template v-else-if="form.input.video_url">
              <div class="sora-video-preview-wrap">
                <video :src="form.input.video_url" class="sora-video-preview" controls></video>
                <button type="button" class="sora-video-remove" title="Remove" @click.stop="clearWatermarkVideo">
                  <i class="fas fa-times"></i>
                </button>
              </div>
              <div v-if="watermarkVideoFile" class="sora-video-meta">
                <span>{{ watermarkVideoFile.name }}</span>
                <span>{{ formatFileSize(watermarkVideoFile.size) }}</span>
              </div>
            </template>
            <template v-else>
              <i class="fas fa-cloud-upload-alt"></i>
              <span>Click to upload video</span>
              <small>Supports MP4, MOV, etc.</small>
            </template>
          </div>
          <div class="form-help">Upload a video to remove watermark</div>
        </div>

        <!-- storyboard shots builder -->
        <div class="form-group" v-if="form.model === 'pro-storyboard'">
          <label>shots (Total Duration: {{ form.input.n_frames || '?' }}s)</label>
          <div class="shots-list">
            <div class="shot-card" v-for="(shot, idx) in scenes" :key="shot.id">
              <div class="shot-title">Scene {{ idx + 1 }}</div>
              <textarea
                class="shot-text"
                v-model="shot.scene"
                rows="3"
                :placeholder="`Describe this scene... who, where, what happens?`"
              ></textarea>
              <div class="shot-footer">
                <div class="duration-input">
                  <input
                    class="duration-field"
                    type="text"
                    v-model="shot.duration"
                  />
                  <span class="duration-s">s</span>
                </div>
                <button
                  v-if="scenes.length > 1"
                  type="button"
                  class="shot-delete"
                  @click="removeScene(idx)"
                  title="Delete scene"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
            <button type="button" class="add-shot" @click="addScene">
              <i class="fas fa-plus"></i> Add Scene
            </button>
          </div>
          <div 
            class="duration-warning error" 
            v-if="form.input.n_frames && totalSceneDuration > Number(form.input.n_frames)"
          >
            <i class="fas fa-exclamation-triangle"></i>
            Total scene duration exceeds maximum limit, please adjust each scene duration
          </div>
          <div 
            class="duration-warning info" 
            v-else-if="form.input.n_frames && remainingDuration > 0"
          >
            <i class="fas fa-exclamation-triangle"></i>
            Please allocate all remaining duration ({{ remainingDuration.toFixed(2) }}s) to scenes before generating
          </div>
          <div class="form-help">Add one or more scenes. Each scene includes a textual description and its duration in seconds.</div>
        </div>

        <!-- 提交 -->
        <div class="form-actions">
          <button class="btn-primary" :disabled="!canSubmit || isGenerating" @click.prevent="onSubmit">
            <i v-if="isGenerating" class="fas fa-spinner fa-spin"></i>
            <i v-else class="fas fa-play"></i>
            {{ isGenerating ? 'Submitting...' : 'Start Generation' }}
            <span v-if="soraPriceText" class="price-tag">{{ soraPriceText }}</span>
          </button>
        </div>
        </fieldset>
      </div>

      <!-- 右侧结果面板 -->
      <div class="result-panel">
        <div class="video-header">
          <h4>Result Preview</h4>
          <div class="video-actions" v-if="results.length > 0">
            <button @click="clearResults" class="btn-secondary">
              <i class="fas fa-trash"></i> Clear
            </button>
          </div>
        </div>

        <div class="video-container">
          <!-- 详情页：根据 record-id 拉取后的状态展示 -->
          <div v-if="isDetailView && (loadingRecordId || (!detailData && routeRecordId))" class="empty-state">
            <i class="fas fa-spinner fa-spin" style="font-size: 48px; color: #3b82f6;"></i>
            <p>Loading record...</p>
          </div>
          <div v-else-if="isDetailView && detailData && detailData.status === 1" class="empty-state">
            <i class="fas fa-spinner fa-spin" style="font-size: 48px; color: #3b82f6;"></i>
            <p>Generating...</p>
          </div>
          <div v-else-if="isDetailView && detailData && detailData.status === 3" class="empty-state">
            <i class="fas fa-exclamation-circle" style="font-size: 48px; color: #ef4444;"></i>
            <p>Generation failed.</p>
          </div>
          <div v-else-if="isDetailView && detailData && detailData.status === 2" class="video-showcase">
            <div class="video-showcase-item">
              <template v-if="detailOutputItems.length > 0">
                <div v-for="(item, index) in detailOutputItems" :key="index" class="detail-output-item">
                  <video v-if="item.type === 'video'" :src="item.url" controls class="detail-video"></video>
                  <img v-else-if="item.type === 'image'" :src="item.url" :alt="'Output ' + (index + 1)" class="detail-image" loading="lazy" />
                </div>
              </template>
              <pre v-else class="payload-json">{{ typeof detailData === 'object' ? JSON.stringify(detailData, null, 2) : '' }}</pre>
            </div>
          </div>
          <div v-else-if="results.length > 0" class="video-showcase">
            <div v-for="(item, idx) in results" :key="idx" class="video-showcase-item">
              <pre class="payload-json">{{ typeof item === 'object' ? JSON.stringify(item, null, 2) : item }}</pre>
            </div>
          </div>
          <div v-else class="empty-state">
            <div class="empty-icon">
              <i class="fas fa-film"></i>
            </div>
            <h3>Waiting for Generation</h3>
            <p>Configure parameters, then click Start Generation.</p>
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
import { useAuth } from '~/composables/useAuth'
import { useToast } from '~/composables/useToast'
import { useApi } from '~/composables/useApi'
import { useModelPrice } from '~/composables/useModelPrice'
import { useRecordPolling } from '~/composables/useRecordPolling'

const route = useRoute()
const router = useRouter()
const isClient = typeof window !== 'undefined'
const { token } = useAuth()
const { showError } = useToast()
const { post } = useApi()
const { fetchPrices, getPrice, formatCredits } = useModelPrice()
const { fetchRecordDetailOnce, pollRecordByStatus, pollRecordDetail } = useRecordPolling()
onMounted(() => { fetchPrices() })
const batchUploadUrl = useBatchUploadUrl()

// 详情页：URL 携带 record-id 时拉取并展示详情
const routeRecordId = computed(() => route.query['record-id'] || '')
const isDetailView = computed(() => !!routeRecordId.value)
const detailData = ref(null)
const loadingRecordId = ref(null)
function getRouteRecordId() { return route.query['record-id'] || '' }

// 后端 model -> 前端 form.model（全部 Sora 模型）
const BACKEND_TO_FRONTEND_MODEL = {
  'sora-watermark-remover': 'watermark-remover',
  'sora-2-pro-storyboard': 'pro-storyboard',
  'sora-2-text-to-video': 'text-to-video',
  'sora-2-image-to-video': 'image-to-video',
  'sora-2-pro-text-to-video': 'pro-text-to-video',
  'sora-2-pro-image-to-video': 'pro-image-to-video'
}
// 前端 model -> 路由 path（详情回填后同步 URL，需在 loadDetailByRecordId 前定义）
const soraModeToPath = {
  'text-to-video': '/home/sora/text-to-video',
  'image-to-video': '/home/sora/image-to-video',
  'pro-text-to-video': '/home/sora/pro-text-to-video',
  'pro-image-to-video': '/home/sora/pro-image-to-video',
  'watermark-remover': '/home/sora/watermark-remover',
  'pro-storyboard': '/home/sora/pro-storyboard'
}
const soraPathToMode = {
  '/home/sora/text-to-video': 'text-to-video',
  '/home/sora/image-to-video': 'image-to-video',
  '/home/sora/pro-text-to-video': 'pro-text-to-video',
  '/home/sora/pro-image-to-video': 'pro-image-to-video',
  '/home/sora/watermark-remover': 'watermark-remover',
  '/home/sora/pro-storyboard': 'pro-storyboard'
}
function fillFormFromOriginalData(data) {
  const o = data?.originalData || data
  if (!o || typeof o !== 'object') return
  if (o.model && BACKEND_TO_FRONTEND_MODEL[o.model]) form.model = BACKEND_TO_FRONTEND_MODEL[o.model]
  if (o.videoUrl !== undefined) form.input.video_url = o.videoUrl || ''
  if (o.video_url !== undefined) form.input.video_url = o.video_url || form.input.video_url
  if (o.prompt !== undefined) form.input.prompt = o.prompt || ''
  if (o.aspectRatio !== undefined) form.input.aspect_ratio = o.aspect_ratio || form.input.aspect_ratio
  if (o.aspect_ratio !== undefined) form.input.aspect_ratio = o.aspect_ratio || form.input.aspect_ratio
  if (o.nFrames !== undefined) form.input.n_frames = String(o.nFrames ?? o.n_frames ?? form.input.n_frames)
  if (o.n_frames !== undefined) form.input.n_frames = String(o.n_frames ?? form.input.n_frames)
  if (o.imageUrls && Array.isArray(o.imageUrls)) form.input.image_urls = [...o.imageUrls]
  if (o.image_urls && Array.isArray(o.image_urls)) form.input.image_urls = [...o.image_urls]
  if (o.size !== undefined) form.input.size = o.size || form.input.size
  if (o.removeWatermark !== undefined) form.input.remove_watermark = !!o.removeWatermark
  if (o.remove_watermark !== undefined) form.input.remove_watermark = !!o.remove_watermark
  if (o.callBackUrl !== undefined) form.callBackUrl = o.callBackUrl || ''
  if (o.call_back_url !== undefined) form.callBackUrl = o.call_back_url || form.callBackUrl
  if (o.shots && Array.isArray(o.shots) && o.shots.length > 0) {
    scenes.value = o.shots.map((s, i) => ({
      id: Date.now() + i,
      scene: typeof s.scene === 'string' ? s.scene : (s.text || ''),
      duration: String(s.duration ?? 7.5)
    }))
  }
}

async function loadDetailByRecordId(recordId) {
  if (!recordId) return
  if (getRouteRecordId() !== recordId) return
  if (loadingRecordId.value === recordId) return
  loadingRecordId.value = recordId
  detailData.value = null
  try {
    const data = await fetchRecordDetailOnce(recordId)
    if (getRouteRecordId() !== recordId) return
    detailData.value = data || null
    if (data?.originalData) {
      fillFormFromOriginalData(data)
      if (form.model && soraModeToPath[form.model] && route.path !== soraModeToPath[form.model]) {
        router.replace({ path: soraModeToPath[form.model], query: { ...route.query } })
      }
    }
    if (data != null && Number(data.status) === 1) {
      pollRecordByStatus(recordId, { getIsCancelled: () => getRouteRecordId() !== recordId }).then((res) => {
        if (getRouteRecordId() !== recordId) return
        detailData.value = res
        if (res?.originalData) {
          fillFormFromOriginalData(res)
          if (form.model && soraModeToPath[form.model] && route.path !== soraModeToPath[form.model]) {
            router.replace({ path: soraModeToPath[form.model], query: { ...route.query } })
          }
        }
      }).catch(() => {})
    }
  } catch (e) {
    console.error('Load record detail failed:', e)
  } finally {
    if (loadingRecordId.value === recordId) loadingRecordId.value = null
  }
}
watch(() => route.query['record-id'], (recordId) => {
  if (recordId) loadDetailByRecordId(recordId)
  else { loadingRecordId.value = null; detailData.value = null }
}, { immediate: true })

// 详情 outputUrls 按 /image/、/video/ 分类展示
const detailOutputItems = computed(() => {
  if (!detailData.value || detailData.value.status !== 2 || !Array.isArray(detailData.value.outputUrls)) return []
  return detailData.value.outputUrls
    .map((u) => (typeof u === 'string' ? u : u?.url))
    .filter(Boolean)
    .map((url) => ({
      type: url.includes('/image/') ? 'image' : url.includes('/video/') ? 'video' : 'unknown',
      url
    }))
    .filter((item) => item.type !== 'unknown')
})

const getAuthToken = () => {
  if (!isClient) return null
  try {
    if (token?.value) return token.value
    return localStorage.getItem('auth_token')
  } catch {
    return localStorage.getItem('auth_token')
  }
}

const uploadFilesToUrls = async (files) => {
  if (!files || (Array.isArray(files) ? files.length === 0 : !files)) return []
  const list = Array.isArray(files) ? files : [files]
  const formDataUpload = new FormData()
  list.forEach(f => formDataUpload.append('file', f))
  const headers = { Accept: 'application/json' }
  const authToken = getAuthToken()
  if (authToken) headers['Authorization'] = `Bearer ${authToken}`
  const response = await fetch(batchUploadUrl, {
    method: 'POST',
    headers,
    body: formDataUpload,
    credentials: 'include'
  })
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    const msg = (typeof errorData?.errorMessage === 'string' && errorData.errorMessage?.trim())
      ? errorData.errorMessage.trim()
      : (typeof errorData?.message === 'string' && errorData.message?.trim())
        ? errorData.message.trim()
        : (errorData?.userTip || errorData?.error || errorData?.message || 'Upload failed')
    throw new Error(msg)
  }
  const data = await response.json()
  const urls = data?.data?.urls || data?.fileUrls || (Array.isArray(data?.data) ? data.data : [])
  if (!Array.isArray(urls)) throw new Error('Invalid response: file URLs not found')
  return urls
}

const form = reactive({
  model: 'text-to-video',
  callBackUrl: '',
  input: {
    prompt: '',
    aspect_ratio: 'portrait',
    n_frames: '10',
    remove_watermark: false,
    image_urls: [],
    size: 'standard',
    video_url: ''
  }
})

const imageUploadRef = ref(null)
const imageUrlsText = ref('')
const videoList = ref([])
const isLoadingVideoList = ref(false)
const isUploadingImages = ref(false)
const watermarkVideoInputRef = ref(null)
const isUploadingWatermarkVideo = ref(false)
const watermarkVideoFile = ref(null)
const scenes = ref([{ id: Date.now(), scene: '', duration: '7.5' }])
const totalSceneDuration = computed(() => scenes.value.reduce((sum, s) => sum + (parseFloat(s.duration) || 0), 0))
const framesSeconds = computed(() => Number(form.input.n_frames || 0))
const remainingDuration = computed(() => {
  const rem = framesSeconds.value - totalSceneDuration.value
  return rem > 0 ? rem : 0
})
const isGenerating = ref(false)
const results = ref([])
const shotsJson = ref('')

function clearResults() {
  results.value = []
}

// 价格：Frames 表单字段 (n_frames) 映射为价格规则中的 duration；watermark-remover->sora-watermark-remover；pro-storyboard->sora-2-pro-storyboard(duration)；text/image->sora-2-*；pro-text/image->sora-2-pro-*(duration+size)
const soraPriceText = computed(() => {
  const model = form.model
  const duration = Number(form.input.n_frames) || 10 // Frames -> duration
  let credits = null
  if (model === 'watermark-remover') {
    credits = getPrice('sora-watermark-remover')
  } else if (model === 'pro-storyboard') {
    credits = getPrice('sora-2-pro-storyboard', { duration, scene: 'generate' })
  } else if (model === 'text-to-video') {
    credits = getPrice('sora-2-text-to-video')
  } else if (model === 'image-to-video') {
    credits = getPrice('sora-2-image-to-video')
  } else if (model === 'pro-text-to-video') {
    // sora-2-pro-text-to-video RULE：按 size 对应 size、duration 对应 Frames(n_frames) 匹配，取 credits
    credits = getPrice('sora-2-pro-text-to-video', {
      duration,
      size: form.input.size || 'standard'
    })
  } else if (model === 'pro-image-to-video') {
    // sora-2-pro-image-to-video RULE：同上，按 size + duration(Frames) 匹配
    credits = getPrice('sora-2-pro-image-to-video', {
      duration,
      size: form.input.size || 'standard'
    })
  }
  const str = formatCredits(credits)
  return str ? `· ${str} credits` : ''
})

const handleSoraImagesUpdate = async (files) => {
  if (!files || (Array.isArray(files) && files.length === 0)) {
    form.input.image_urls = []
    return
  }
  const list = Array.isArray(files) ? files : [files]
  isUploadingImages.value = true
  try {
    form.input.image_urls = await uploadFilesToUrls(list)
  } catch (e) {
    showError(e.message || 'Failed to upload images')
    form.input.image_urls = []
    imageUploadRef.value?.clearFiles?.()
  } finally {
    isUploadingImages.value = false
  }
}

const formatFileSize = (bytes) => {
  if (bytes == null || bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const handleWatermarkVideoUpload = async (e) => {
  const file = e.target?.files?.[0]
  if (!file) return
  isUploadingWatermarkVideo.value = true
  form.input.video_url = ''
  watermarkVideoFile.value = null
  try {
    const urls = await uploadFilesToUrls([file])
    form.input.video_url = urls[0] || ''
    watermarkVideoFile.value = file
  } catch (err) {
    showError(err?.message || 'Failed to upload video')
  } finally {
    isUploadingWatermarkVideo.value = false
    e.target.value = ''
  }
}

const clearWatermarkVideo = () => {
  form.input.video_url = ''
  watermarkVideoFile.value = null
  if (watermarkVideoInputRef.value) watermarkVideoInputRef.value.value = ''
}

const triggerWatermarkVideoInput = () => {
  watermarkVideoInputRef.value?.click()
}

// Tab 与二级路由同步：/home/sora/text-to-video 等（soraModeToPath / soraPathToMode 已提前定义）
watch(() => route.path, (path) => {
  const mode = soraPathToMode[path]
  if (mode && form.model !== mode) form.model = mode
}, { immediate: true })

const switchMode = (model) => {
  form.model = model
  const path = soraModeToPath[model] || soraModeToPath['text-to-video']
  router.push({ path, query: { ...route.query } })
}

// 获取视频列表
const fetchVideoList = async () => {
  if (isLoadingVideoList.value) return
  isLoadingVideoList.value = true
  try {
    const response = await fetch('/api/sora/video-list')
    if (response.ok) {
      const data = await response.json()
      videoList.value = Array.isArray(data) ? data : (data.list || data.videos || [])
    } else {
      console.error('Failed to fetch video list')
      videoList.value = []
    }
  } catch (error) {
    console.error('Error fetching video list:', error)
    videoList.value = []
  } finally {
    isLoadingVideoList.value = false
  }
}

const canSubmit = computed(() => {
  // watermark remover: require selected video URL
  if (form.model === 'watermark-remover') {
    return !!form.input.video_url && form.input.video_url.trim() !== ''
  }
  // storyboard: require n_frames and at least one scene, and total duration must equal frames
  if (form.model === 'pro-storyboard') {
    if (!form.input.n_frames) return false
    if (!Array.isArray(scenes.value) || scenes.value.length === 0) return false
    const diff = framesSeconds.value - totalSceneDuration.value
    return Math.abs(diff) < 0.01
  }
  // other models require prompt
  if (!form.input.prompt.trim()) return false
  // image required for image-to-video models
  if (['image-to-video','pro-image-to-video'].includes(form.model)) {
    return Array.isArray(form.input.image_urls) && form.input.image_urls.length > 0
  }
  return true
})

// 前端 model -> 后端 model 字符串
const MODEL_MAP = {
  'text-to-video': 'sora-2-text-to-video',
  'image-to-video': 'sora-2-image-to-video',
  'pro-text-to-video': 'sora-2-pro-text-to-video',
  'pro-image-to-video': 'sora-2-pro-image-to-video',
  'watermark-remover': 'sora-watermark-remover',
  'pro-storyboard': 'sora-2-pro-storyboard'
}

const addScene = () => {
  scenes.value.push({ id: Date.now() + Math.random(), scene: '', duration: '7.5' })
}

const removeScene = (idx) => {
  if (scenes.value.length <= 1) return
  scenes.value.splice(idx, 1)
}

const onSubmit = async () => {
  if (!canSubmit.value) return
  const promptTrim = form.input.prompt?.trim()
  if (!['watermark-remover', 'pro-storyboard'].includes(form.model) && (!promptTrim || promptTrim.length > 10000)) {
    showError('Prompt is required and cannot exceed 10000 characters')
    return
  }

  isGenerating.value = true
  try {
    const backendModel = MODEL_MAP[form.model]
    let data

    if (form.model === 'watermark-remover') {
      const videoUrl = form.input.video_url?.trim()
      if (!videoUrl) {
        showError('Video URL is required')
        return
      }
      data = await post('/api/video/sora/watermark-remover', {
        model: backendModel,
        videoUrl
      })
    } else if (form.model === 'pro-storyboard') {
      const shots = scenes.value.map(s => ({
        duration: Number(s.duration) || 0,
        scene: String(s.scene || '').trim()
      }))
      if (shots.some(s => !s.scene)) {
        showError('Each shot must have a scene description')
        return
      }
      const body = {
        model: backendModel,
        nFrames: String(form.input.n_frames || '10'),
        aspectRatio: form.input.aspect_ratio || 'portrait',
        shots,
        imageUrls: (form.input.image_urls && form.input.image_urls.length > 0) ? form.input.image_urls : undefined,
        callBackUrl: form.callBackUrl?.trim() || undefined
      }
      data = await post('/api/video/sora-pro/storyboard', body)
    } else if (['pro-text-to-video', 'pro-image-to-video'].includes(form.model)) {
      const body = {
        model: backendModel,
        prompt: promptTrim,
        imageUrls: (form.input.image_urls && form.input.image_urls.length > 0) ? form.input.image_urls : undefined,
        aspectRatio: form.input.aspect_ratio || 'portrait',
        nFrames: String(form.input.n_frames || '10'),
        size: form.input.size || 'standard',
        removeWatermark: !!form.input.remove_watermark
      }
      data = await post('/api/video/sora-pro/generate', body)
    } else {
      // text-to-video / image-to-video
      const body = {
        model: backendModel,
        prompt: promptTrim,
        imageUrls: (form.input.image_urls && form.input.image_urls.length > 0) ? form.input.image_urls : undefined,
        aspectRatio: form.input.aspect_ratio || 'portrait',
        nFrames: String(form.input.n_frames || '10'),
        removeWatermark: !!form.input.remove_watermark
      }
      data = await post('/api/video/sora/generate', body)
    }

    let payload = data?.data ?? data
    if (data?.recordId && !(Array.isArray(payload?.outputUrls) && payload.outputUrls.length)) {
      const detail = await pollRecordDetail(data.recordId)
      payload = typeof payload === 'object' ? { ...payload, ...detail } : detail
    }
    results.value.unshift(typeof payload === 'object' ? payload : { raw: payload })
  } catch (e) {
    console.error(e)
    if (!e?.__fromApi) showError(e?.message || 'Request failed')
  } finally {
    isGenerating.value = false
  }
}
</script>

<style scoped>
.sora-tool {
  /* 可调变量：修改这些变量即可统一调整输入框尺寸 */
  --shot-text-min-h: 80px;   /* 场景描述最小高度 */
  --shot-text-w: 100%;       /* 场景描述宽度 */
  --duration-w: 30px;        /* 时长输入宽度 */
  --duration-h: 24px;        /* 时长输入高度 */

  width: 100%;
  height: 100%;
  padding: 20px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}
.tool-header { display: flex; align-items: center; padding-bottom: 20px; border-bottom: 1px solid #e2e8f0; margin-bottom: 20px; }
.tool-avatar { width: 48px; height: 48px; border-radius: 8px; overflow: hidden; margin-right: 16px; flex: 0 0 auto; display: flex; align-items: center; justify-content: center; }
.tool-avatar img { width: 100%; height: 100%; object-fit: contain; image-rendering: auto; }
.tool-details h3 { margin: 0; font-size: 18px; font-weight: 600; color: #1f2937; }
.tool-details p { margin: 0; font-size: 14px; color: #6b7280; }

/* 顶部模式切换 */
.mode-tabs { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 8px; padding: 12px 0 20px; border-bottom: 1px solid #e2e8f0; margin-bottom: 20px; }
.mode-tab { width: 100%; box-sizing: border-box; padding: 10px 14px; border: 1px solid #e2e8f0; background: #fff; color: #64748b; border-radius: 8px; cursor: pointer; transition: all .2s ease; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 13px; font-weight: 600; min-height: 40px; word-break: break-word; }
.mode-tab:hover { border-color: #3b82f6; background: #f8fafc; color: #3b82f6; }
.mode-tab.active { background: #3b82f6; color: #fff; border-color: #3b82f6; }
.mode-tab i { font-size: 14px; }

.main-content { display: flex; flex: 1; min-height: 0; gap: 20px; }
.config-panel { width: 35%; background: #f8fafc; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; min-height: 0; }
.config-header { padding: 0 0 20px 0; border-bottom: 1px solid #e2e8f0; margin-bottom: 20px; }
.config-header h4 { margin: 0; font-size: 16px; font-weight: 600; color: #1e293b; }
.config-form { flex: 1; overflow-y: auto; }
.config-fieldset { border: none; margin: 0; padding: 0; }

.form-group { margin-bottom: 20px; }
.form-group label { display: block; font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 8px; }
.form-group .required { color: #ef4444; }
.form-group input, .form-group textarea, .form-group select { width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; transition: border-color 0.2s ease; box-sizing: border-box; }
.form-group input:focus, .form-group textarea:focus, .form-group select:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
.char-count { text-align: right; font-size: 12px; color: #64748b; margin-top: 4px; }
.form-help { font-size: 11px; color: #6b7280; font-weight: 400; margin-top: 4px; line-height: 1.4; }

.tab-group { flex: 1; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; background: white; }
.tab-options { display: flex; gap: 8px; }
.tab-option { flex: 1; padding: 12px 16px; border: 1px solid #e5e7eb; background: white; color: #64748b; border-radius: 8px; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 14px; font-weight: 500; }
.tab-option:hover { border-color: #3b82f6; background: #f8fafc; color: #3b82f6; }
.tab-option.active { background: #3b82f6; color: white; border-color: #3b82f6; }

.select-wrapper { position: relative; }
.select-wrapper select { appearance: none; padding-right: 40px; }
.select-wrapper i { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #64748b; pointer-events: none; }
.form-select { width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; transition: border-color 0.2s ease; box-sizing: border-box; background: white; }
.form-select:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
.form-select:disabled { background: #f3f4f6; cursor: not-allowed; }

/* 上传区域样式（复用 Luma 风格） */
.upload-area { position: relative; border: 2px dashed #d1d5db; border-radius: 12px; padding: 24px; text-align: center; transition: all 0.3s ease; background: #fafafa; cursor: pointer; }
.upload-area:hover { border-color: #3b82f6; background: #f0f7ff; }
.upload-area.has-files { border-color: #10b981; background: #f0fdf4; }
.upload-content { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.upload-icon { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: #3b82f6; border-radius: 50%; color: white; font-size: 20px; }
.upload-area.has-files .upload-icon { background: #10b981; }
.upload-text { display: flex; flex-direction: column; gap: 4px; }
.upload-title { font-size: 16px; font-weight: 600; color: #1f2937; margin: 0; }
.upload-subtitle { font-size: 14px; color: #6b7280; margin: 0; }
.file-input { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; }

/* 上传后的内容样式 */
.uploaded-content { display: flex; flex-direction: column; align-items: center; gap: 12px; width: 100%; }
.uploaded-video-container { position: relative; width: 200px; height: 120px; border-radius: 12px; overflow: hidden; border: 2px solid #10b981; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
.uploaded-video { width: 100%; height: 100%; object-fit: cover; }
.uploaded-text { display: flex; flex-direction: column; gap: 4px; text-align: center; }
.uploaded-text .upload-title { font-size: 16px; font-weight: 600; color: #10b981; margin: 0; }
.uploaded-text .upload-subtitle { font-size: 14px; color: #6b7280; margin: 0; }
.remove-video-btn { position: absolute; top: -6px; right: -6px; width: 20px; height: 20px; background: #dc2626; color: white; border: none; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
.remove-video-btn:hover { background: #b91c1c; transform: scale(1.1); }

/* watermark-remover 上传视频：固定预览尺寸，避免表单被撑大 */
.sora-video-file-input { position: absolute; width: 0; height: 0; opacity: 0; pointer-events: none; }
.sora-video-upload-area { position: relative; border: 2px dashed #d1d5db; border-radius: 12px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.2s; background: #fafafa; min-height: 80px; max-height: 220px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; overflow: hidden; box-sizing: border-box; }
.sora-video-upload-area:hover { border-color: #3b82f6; background: #f0f7ff; }
.sora-video-upload-area .sora-video-uploading { color: #64748b; }
.sora-video-preview-wrap { position: relative; width: 100%; max-width: 280px; height: 160px; flex-shrink: 0; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; background: #000; }
.sora-video-preview { width: 100%; height: 100%; object-fit: contain; display: block; vertical-align: middle; }
.sora-video-remove { position: absolute; top: 6px; right: 6px; width: 28px; height: 28px; border: none; border-radius: 50%; background: rgba(0,0,0,0.6); color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 1; }
.sora-video-remove:hover { background: #dc2626; }
.sora-video-meta { font-size: 12px; color: #64748b; display: flex; gap: 12px; flex-shrink: 0; }

/* shots builder */
.shots-list { display: flex; flex-direction: column; gap: 16px; }
.shot-card { background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; }
.shot-title { font-size: 13px; font-weight: 600; color: #1f2937; margin-bottom: 8px; }
.shot-text { width: var(--shot-text-w); padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; resize: vertical; min-height: var(--shot-text-min-h); box-sizing: border-box; }
.shot-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; }
.duration-input { display: inline-flex; align-items: center; gap: 6px; }
.duration-field { width: 30%; max-width: 80px; height: var(--duration-h); padding: 4px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 12px; text-align: right; box-sizing: border-box; }
/* 隐藏数字输入的上下微调箭头（若浏览器仍显示） */
.duration-field::-webkit-outer-spin-button,
.duration-field::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
.duration-field[type=number] { -moz-appearance: textfield; }
.duration-s { display: inline-block; padding: 3px 4px; background: #eef2ff; color: #475569; border-radius: 6px; font-size: 9px; }
.shot-delete { border: 1px solid #ef4444; background: #fff1f2; color: #ef4444; border-radius: 6px; font-size: 12px; padding: 6px 10px; cursor: pointer; }
.shot-delete:hover { background: #ffe4e6; }
.add-shot { margin-top: 8px; border: 1px dashed #3b82f6; background: #f0f7ff; color: #1d4ed8; border-radius: 8px; padding: 8px 12px; font-size: 13px; cursor: pointer; }
.add-shot:hover { background: #e0efff; }

.duration-warning { margin-top: 8px; font-size: 12px; line-height: 1.5; display: flex; align-items: flex-start; gap: 6px; }
.duration-warning i { line-height: 1; margin-top: 2px; }
.duration-warning.error { color: #dc2626; font-size: 14px; }
.duration-warning.info { color: #b45309; /* amber-700 */ font-size: 14px; }

.form-actions { margin-top: 24px; padding-bottom: 20px; }
.btn-primary { width: 100%; padding: 16px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; border: none; border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.3s ease; }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3); }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

.result-panel { width: 65%; background: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; min-height: 400px; display: flex; flex-direction: column; min-height: 0; }
.video-header { padding: 20px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
.video-header h4 { font-size: 16px; font-weight: 600; color: #1e293b; margin: 0; }
.video-container { flex: 1; padding: 30px; display: flex; align-items: center; justify-content: center; min-height: 80vh; }
.video-showcase { width: 100%; max-width: 100%; }
.video-showcase-item { width: 100%; background: #f8fafc; border-radius: 8px; overflow: hidden; margin-bottom: 16px; }
.payload-json { margin: 0; padding: 16px; font-size: 12px; line-height: 1.5; background: #0f172a; color: #e2e8f0; white-space: pre-wrap; }
.detail-output-item { margin-bottom: 16px; border-radius: 8px; overflow: hidden; background: #000; }
.detail-output-item .detail-video { width: 100%; max-height: 70vh; display: block; }
.detail-output-item .detail-image { width: 100%; height: auto; display: block; vertical-align: middle; }
.empty-state { text-align: center; color: #64748b; max-width: 500px; min-height: 60vh; display: flex; flex-direction: column; justify-content: center; align-items: center; }
.empty-icon { font-size: 72px; color: #cbd5e1; margin-bottom: 24px; }

@media (max-width: 1024px) {
  .main-content { flex-direction: column; }
  .config-panel, .result-panel { width: 100%; }
  .mode-tabs { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

@media (max-width: 768px) {
  .sora-tool { padding: 16px; }
  .mode-tabs { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
</style>
