<template>
  <div class="veo3-tool">
    <!-- 工具信息头部 -->
    <div class="tool-header">
      <div class="tool-avatar">
        <img src="/tools-logo/Veo.png" alt="Veo3" />
      </div>
      <div class="tool-details">
        <h3>Veo 3</h3>
        <p>Google Veo 3 is a next-generation AI video generation model developed by Google DeepMind. It supports both text-to-video and image-to-video creation, producing high-fidelity, cinematic visuals with advanced scene understanding and natural motion simulation. users can access Veo 3 Fast for rapid, cost-efficient workflows or Veo 3 Quality for premium output, all with transparent pricing and stable infrastructure.</p>
      </div>
    </div>

    <!-- 生成模式选择：统一 mode-tabs-wrap 样式，主色 #3b82f6 -->
    <div class="mode-tabs-wrap">
      <div class="mode-tabs">
        <div
          class="mode-tab"
          :class="{ active: formData.generationType === 'TEXT_2_VIDEO' }"
          @click="goToVeo3Tab('TEXT_2_VIDEO')"
        >
          <i class="fas fa-font"></i>
          <span>Text to Video</span>
        </div>
        <div
          class="mode-tab"
          :class="{ active: formData.generationType === 'FIRST_AND_LAST_FRAMES_2_VIDEO' }"
          @click="goToVeo3Tab('FIRST_AND_LAST_FRAMES_2_VIDEO')"
        >
          <i class="fas fa-images"></i>
          <span>First And Last Frames to Video</span>
        </div>
        <div
          class="mode-tab"
          :class="{ active: formData.generationType === 'REFERENCE_2_VIDEO' }"
          @click="goToVeo3Tab('REFERENCE_2_VIDEO')"
        >
          <i class="fas fa-image"></i>
          <span>Image to Video</span>
        </div>
        <div
          class="mode-tab"
          :class="{ active: formData.generationType === 'VIDEO_EXTEND' }"
          @click="goToVeo3Tab('VIDEO_EXTEND')"
        >
          <i class="fas fa-expand-arrows-alt"></i>
          <span>Video Extend</span>
        </div>
      </div>
    </div>

    <!-- 主内容区域：左右布局 -->
    <div class="main-content">
      <!-- 左侧：参数配置面板 -->
      <div class="config-panel">
      <div class="config-header">
        <h4>Video Generation Configuration</h4>
      </div>

      <form class="config-form" @submit.prevent="generateVideo">
          <fieldset class="config-fieldset" :disabled="isGenerating || isDetailView">
          <!-- 视频扩展模式特有字段 -->
          <div v-if="formData.generationType === 'VIDEO_EXTEND'" class="form-group">
            <label for="taskId" class="form-label">
              Original Task <span class="required">*</span>
            </label>
            <div class="select-with-arrow">
              <select
                id="taskId"
                v-model="formData.taskId"
                class="form-input"
                required
                :disabled="loadingExtendList"
              >
                <option value="">Please select original task</option>
                <option v-for="item in extendList" :key="item.taskId" :value="item.taskId">{{ item.title || item.taskId }}</option>
              </select>
              <i class="fas fa-chevron-down select-arrow-icon" aria-hidden="true"></i>
            </div>
            <div v-if="!loadingExtendList && extendList.length === 0" class="form-hint input-hint-warn">
              Only tasks completed with Veo3 video generation can be used.
            </div>
            <div v-else class="form-hint">
              Select the original video generation task to extend. Note: Videos after 1080P generation cannot be extended
            </div>
          </div>

        <!-- 提示词输入 -->
        <div class="form-group">
          <label for="prompt" class="form-label">
              <span v-if="formData.generationType === 'VIDEO_EXTEND'">Extension Description</span>
              <span v-else>Generation prompt</span>
              <span class="required">*</span>
          </label>
          <textarea
            id="prompt"
            v-model="formData.prompt"
            class="form-input"
            rows="4"
            :placeholder="getPromptPlaceholder()"
            maxlength="1000"
            required
          ></textarea>
          <div class="char-count" v-if="formData.prompt">{{ formData.prompt.length }}/1000</div>
          <div class="form-hint">
              {{ getPromptHint() }}
          </div>
        </div>

          <!-- 视频扩展模式的其他配置 -->
          <template v-if="formData.generationType === 'VIDEO_EXTEND'">
            <!-- 随机种子 -->
        <div class="form-group">
              <label for="seeds" class="form-label">Random Seed</label>
            <input
                id="seeds"
                v-model.number="formData.seeds"
                type="number"
                class="form-input"
                placeholder="10000-99999"
                min="10000"
                max="99999"
              />
              <div class="form-hint">
                Range 10000-99999, same seed generates similar content, system auto-assigns if not filled
          </div>
              </div>

            <!-- 水印文本 -->
            <div class="form-group">
              <label for="watermark" class="form-label">Watermark Text</label>
              <input
                id="watermark"
                v-model="formData.watermark"
                type="text"
                class="form-input"
                placeholder="Optional, add watermark to generated video"
              />
          <div class="form-hint">
                Optional, will add watermark to generated video if provided
          </div>
        </div>
          </template>

          <!-- 图片上传 - 仅在需要图片的模式下显示 -->
          <div v-if="formData.generationType === 'FIRST_AND_LAST_FRAMES_2_VIDEO' || formData.generationType === 'REFERENCE_2_VIDEO'" class="form-group">
            <label class="form-label">
              Reference Images 
              <span class="required">*</span>
              <span v-if="formData.generationType === 'FIRST_AND_LAST_FRAMES_2_VIDEO'" class="mode-hint">(1-2 images)</span>
              <span v-if="formData.generationType === 'REFERENCE_2_VIDEO'" class="mode-hint">(1-3 images)</span>
            </label>
            <span v-if="isUploadingImages" class="form-hint">Uploading images...</span>
            <UploadImage
              ref="imageUploadRef"
              input-id="veo3-image-upload"
              label=""
              upload-icon="fas fa-cloud-upload-alt"
              upload-text="Click to upload images"
              :upload-hint="getUploadHint()"
              :additional-hint="getImageUploadHint()"
              theme-color="#3b82f6"
              :max-files="formData.generationType === 'FIRST_AND_LAST_FRAMES_2_VIDEO' ? 2 : 3"
              :max-file-size="10 * 1024 * 1024"
                accept="image/*" 
              :multiple="true"
              @update:files="handleImageUpdate"
            />
        </div>

        <!-- 模型选择 - 非视频扩展模式显示（含 Text to Video、First And Last Frames、Image to Video） -->
        <div v-if="formData.generationType !== 'VIDEO_EXTEND'" class="form-group">
          <label class="form-label">Model Type</label>
          <div class="option-tabs two-columns">
            <button 
              type="button"
              class="option-tab"
              :class="{ active: formData.model === 'veo3' }"
              @click="formData.model = 'veo3'"
            >
              <i class="fas fa-star"></i>
              <span>Standard</span>
            </button>
            <button 
              type="button"
              class="option-tab"
              :class="{ active: formData.model === 'veo3_fast' }"
              @click="formData.model = 'veo3_fast'"
            >
              <i class="fas fa-bolt"></i>
              <span>Fast</span>
            </button>
          </div>
          <div class="form-hint">
            Standard model has higher quality, fast model generates faster
          </div>
        </div>

          <!-- 宽高比选择 - 非视频扩展模式和Image to Video模式显示 -->
        <div v-if="formData.generationType !== 'VIDEO_EXTEND' && formData.generationType !== 'REFERENCE_2_VIDEO'" class="form-group">
          <label class="form-label">Video Aspect Ratio</label>
          <div class="option-tabs three-columns">
            <button 
              type="button"
              class="option-tab"
              :class="{ active: formData.aspectRatio === '16:9' }"
              @click="formData.aspectRatio = '16:9'"
              title="Supports 1080P"
            >
              <i class="fas fa-expand"></i>
              <span>16:9</span>
            </button>
            <button 
              type="button"
              class="option-tab"
              :class="{ active: formData.aspectRatio === '9:16' }"
              @click="formData.aspectRatio = '9:16'"
            >
              <i class="fas fa-compress"></i>
              <span>9:16</span>
            </button>
            <button 
              type="button"
              class="option-tab"
              :class="{ active: formData.aspectRatio === 'Auto' }"
              @click="formData.aspectRatio = 'Auto'"
            >
              <i class="fas fa-magic"></i>
              <span>Auto</span>
            </button>
          </div>
            <div class="form-hint">
              16:9 supports 1080P HD video generation
            </div>
        </div>

          <!-- 水印设置 - 非视频扩展模式显示 -->
        <div v-if="formData.generationType !== 'VIDEO_EXTEND'" class="form-group">
            <label for="watermark" class="form-label">Watermark Text</label>
              <input
              id="watermark"
              v-model="formData.watermark"
              type="text"
              class="form-input"
              placeholder="Optional, add watermark to video"
            />
        </div>

        <!-- 随机种子 - 非视频扩展模式显示 -->
        <div v-if="formData.generationType !== 'VIDEO_EXTEND'" class="form-group">
            <label for="seeds" class="form-label">Random Seed</label>
          <input
            id="seeds"
            v-model.number="formData.seeds"
            type="number"
            min="10000"
            max="99999"
              class="form-input"
              placeholder="10000-99999, same seed generates similar content"
          />
          <div class="form-hint">
              Optional, used to control randomness of generated content
          </div>
        </div>

          <!-- 提示词翻译 - 非视频扩展模式显示 -->
          <div v-if="formData.generationType !== 'VIDEO_EXTEND'" class="form-group">
            <label class="checkbox-label" for="enableTranslation">
          <input
                id="enableTranslation"
                v-model="formData.enableTranslation" 
                type="checkbox"
              >
              <span class="checkmark"></span>
              Enable Translation to English
            </label>
          <div class="form-hint">
              Automatically translate prompts to English for better generation results
          </div>
        </div>

        <!-- 生成按钮（与 Runway 一致） -->
        <div class="form-actions">
          <button
            type="submit"
            class="btn-primary"
            :disabled="!canGenerate || isGenerating"
          >
            <i v-if="isGenerating" class="fas fa-spinner fa-spin"></i>
            <i v-else class="fas fa-play"></i>
            {{ isGenerating ? 'Generating...' : 'Generate Video' }}
            <span v-if="veo3PriceText" class="price-tag">{{ veo3PriceText }}</span>
          </button>
        </div>
          </fieldset>
      </form>
      </div>

      <!-- 右侧：结果展示区域 -->
      <div class="result-panel">
        <!-- 详情页：status 3 失败 -->
        <div v-if="isDetailView && detailData && detailData.status === 3" class="detail-failure-state">
          <div class="failure-icon"><i class="fas fa-exclamation-circle"></i></div>
          <p class="failure-message">Generation failed. You can debug the parameters and try generating again. Generation failure will not consume credits.</p>
        </div>
        <!-- 详情页：status 1 或加载中 -->
        <div v-else-if="isDetailView && (!detailData || detailData.status === 1)" class="detail-loading-state">
          <i class="fas fa-spinner fa-spin detail-spinner"></i>
          <p>Generating...</p>
        </div>
        <div v-else-if="!displayResult" class="empty-state">
          <!-- 预览视频 - Video Extend 模式不显示 -->
          <div v-if="formData.generationType !== 'VIDEO_EXTEND'" class="preview-video-container">
            <video 
              :key="formData.generationType"
              :src="getPreviewVideoSrc()" 
              controls 
              class="preview-video"
              muted
            ></video>
          </div>
          <h4>No video generated yet</h4>
          <p>Enter video description and click "Generate Video" to start creating</p>
        </div>
        
        <div v-else class="result-display">
          <!-- 视频结果 -->
          <div class="video-result">
              <div class="video-player">
              <video 
                v-if="displayResult.videoUrl"
                :src="displayResult.videoUrl" 
                controls 
                class="video-element"
              ></video>
              <div v-else class="video-placeholder">
                <i class="fas fa-video"></i>
                <p>Video generating...</p>
              </div>
            </div>
            
            <div class="video-info">
              <h5>{{ displayResult.taskId || 'Video Generation Task' }}</h5>
                <div class="video-meta">
                <span><i class="fas fa-clock"></i> {{ displayResult.duration || 'Unknown duration' }}</span>
                <span><i class="fas fa-expand"></i> {{ displayResult.aspectRatio || '16:9' }}</span>
                <span><i class="fas fa-cog"></i> {{ displayResult.model || 'veo3_fast' }}</span>
                </div>
            </div>

            <!-- 操作按钮（详情页不显示扩展） -->
                <div class="video-actions">
              <button @click="downloadVideo" class="action-btn">
                    <i class="fas fa-download"></i>
                Download Video
                  </button>
              <button @click="shareVideo" class="action-btn">
                    <i class="fas fa-share"></i>
                Share Video
              </button>
              <button v-if="!isDetailView && displayResult.taskId" @click="get1080PVideo" class="action-btn">
                <i class="fas fa-hd-video"></i>
                Get 1080P
                  </button>
            </div>
          </div>
          
          <!-- 视频扩展功能（仅非详情页） -->
          <div v-if="!isDetailView && displayResult.taskId" class="video-extend">
            <h6>Video Extension</h6>
            <div class="extend-form">
              <textarea
                v-model="extendPrompt"
                class="form-input"
                rows="2"
                placeholder="Describe how to extend the video content..."
              ></textarea>
              <button 
                @click="extendVideo" 
                class="extend-btn"
                :disabled="!extendPrompt.trim()"
              >
                <i class="fas fa-expand-arrows-alt"></i>
                Extend Video
              </button>
            </div>
              </div>
              </div>
              </div>
            </div>

    <!-- 使用提示 -->
    <div class="usage-tips">
      <div class="tip-item">
        <span class="tip-icon">🎬</span>
        <span>Text to Video: Describe video content in detail, including actions, scenes, styles, etc.</span>
          </div>
      <div class="tip-item">
        <span class="tip-icon">🖼️</span>
        <span>Image to Video: Upload 1-3 reference images, supports multiple generation modes</span>
        </div>
      <div class="tip-item">
        <span class="tip-icon">⚡</span>
        <span>Fast Model: Fast generation speed, suitable for quick previews and testing</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">🎯</span>
        <span>Standard Model: Higher quality, suitable for final production</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, inject, watch, onMounted, onBeforeUnmount } from 'vue'
import UploadImage from './common/UploadImage.vue'
import { useAuth } from '~/composables/useAuth'
import { useToast } from '~/composables/useToast'
import { useApi } from '~/composables/useApi'
import { useModelPrice } from '~/composables/useModelPrice'
import { useRecordPolling } from '~/composables/useRecordPolling'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const addToUsageHistory = inject('addToUsageHistory')

// Tab 与三级路由同步：/home/veo3/text-to-video 等
const veo3TabToPath = {
  TEXT_2_VIDEO: '/home/veo3/text-to-video',
  FIRST_AND_LAST_FRAMES_2_VIDEO: '/home/veo3/first-and-last-to-video',
  REFERENCE_2_VIDEO: '/home/veo3/reference-to-video',
  VIDEO_EXTEND: '/home/veo3/extend'
}
const veo3PathToTab = {
  '/home/veo3/text-to-video': 'TEXT_2_VIDEO',
  '/home/veo3/first-and-last-to-video': 'FIRST_AND_LAST_FRAMES_2_VIDEO',
  '/home/veo3/reference-to-video': 'REFERENCE_2_VIDEO',
  '/home/veo3/extend': 'VIDEO_EXTEND'
}
function goToVeo3Tab(generationType) {
  const path = veo3TabToPath[generationType] || veo3TabToPath.TEXT_2_VIDEO
  router.push(path)
}
function getVeo3RecordPath() {
  return veo3TabToPath[formData.generationType] || '/home/veo3/text-to-video'
}
const { fetchPrices, getPrice, formatCredits, discount } = useModelPrice()
onMounted(() => { fetchPrices() })
const batchUploadUrl = useBatchUploadUrl()
const { getUrlsForFiles } = useFileUploadUrlCache()
const { token } = useAuth()
const { showError, showSuccess } = useToast()
const { post, get } = useApi()
const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling()

const getAuthToken = () => {
  if (!process.client) return null
  try {
    if (token?.value) return token.value
    return localStorage.getItem('auth_token')
  } catch {
    return localStorage.getItem('auth_token')
  }
}

/** 上传多文件到 batch-upload，返回 URL 数组 */
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

// 表单数据
const formData = reactive({
  prompt: '',
  imageUrls: [],
  model: 'veo3_fast',
  generationType: 'TEXT_2_VIDEO',
  watermark: '',
  aspectRatio: '16:9',
  seeds: null,
  enableTranslation: true,
  taskId: ''
})

// Video Extend：Original Task 从 extend-list 拉取（model=veo3），提交值为 taskId
const EXTEND_LIST_MODEL = 'veo3'
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
const isUnmounted = ref(false)
let extendListFetchTimer = null
const queueFetchExtendList = () => {
  if (extendListFetchTimer) clearTimeout(extendListFetchTimer)
  // Delay one tick so the leaving instance can unmount before requesting.
  extendListFetchTimer = setTimeout(() => {
    extendListFetchTimer = null
    if (isUnmounted.value) return
    if (route.path !== '/home/veo3/extend') return
    fetchExtendList()
  }, 0)
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
watch(() => formData.generationType, (type) => {
  if (type === 'VIDEO_EXTEND') queueFetchExtendList()
}, { immediate: true })

onBeforeUnmount(() => {
  isUnmounted.value = true
  if (extendListFetchTimer) {
    clearTimeout(extendListFetchTimer)
    extendListFetchTimer = null
  }
})

// 结果数据
const result = ref(null)

// 路由 path 同步到 formData.generationType
watch(() => route.path, (path) => {
  const tab = veo3PathToTab[path]
  if (tab && formData.generationType !== tab) {
    formData.generationType = tab
  }
}, { immediate: true })
const isGenerating = ref(false)
const extendPrompt = ref('')
const imageUploadRef = ref(null)
const isUploadingImages = ref(false)

// 详情页：仅从 URL 读取 record-id
const routeRecordId = computed(() => route.query['record-id'] || '')
const isDetailView = computed(() => !!routeRecordId.value)
const detailData = ref(null)
const loadingRecordId = ref(null)
const detailDelayTimer = ref(null)
const DETAIL_DELAY_MS = 300
const displayResult = computed(() => {
  if (isDetailView.value && detailData.value?.status === 2 && detailData.value?.outputUrls?.length) {
    const url = typeof detailData.value.outputUrls[0] === 'string' ? detailData.value.outputUrls[0] : detailData.value.outputUrls[0]?.url
    const od = detailData.value.originalData || {}
    return { videoUrl: url, taskId: detailData.value.taskId ?? od.taskId, ...od }
  }
  return result.value
})
function fillFormFromOriginalData(originalData) {
  if (!originalData || typeof originalData !== 'object') return
  Object.keys(formData).forEach(k => { if (originalData[k] !== undefined && k in formData) formData[k] = originalData[k] })
}
function getRouteRecordId() { return route.query['record-id'] || '' }
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
    if (data?.originalData) fillFormFromOriginalData(data.originalData)
    if (data != null && Number(data.status) === 1) {
      pollRecordByStatus(recordId, { getIsCancelled: () => getRouteRecordId() !== recordId }).then((res) => {
        if (getRouteRecordId() !== recordId) return
        detailData.value = res
        if (res?.originalData) fillFormFromOriginalData(res.originalData)
      }).catch(() => {})
    }
  } catch (e) { console.error('Load record detail failed:', e) }
}
watch(() => route.query['record-id'], (recordId) => {
  if (detailDelayTimer.value) { clearTimeout(detailDelayTimer.value); detailDelayTimer.value = null }
  if (recordId) {
    detailDelayTimer.value = setTimeout(() => {
      detailDelayTimer.value = null
      loadDetailByRecordId(recordId)
    }, DETAIL_DELAY_MS)
  } else {
    detailData.value = null
  }
}, { immediate: true })

// 折扣展示：仅展示折扣比例，不参与 credits 计算
const discountText = computed(() => {
  const rate = Number(discount?.value ?? 1)
  if (Number.isNaN(rate) || rate <= 0 || rate === 1) return ''
  const percent = (rate * 100).toFixed(0)
  return ` · ${percent}%`
})

// 价格：Video Extend -> veo3_extend；Text/First And Last Frames/Image to Video -> veo3(Standard) / veo3_fast(Fast)
const veo3PriceText = computed(() => {
  const key = formData.generationType === 'VIDEO_EXTEND' ? 'veo3_extend' : (formData.model || 'veo3_fast')
  const credits = getPrice(key)
  const str = formatCredits(credits)
  if (!str) return ''
  return `· ${str} credits${discountText.value}`
})

// 默认占位图文件名（仅用于展示，不参与上传与提交）
const DEFAULT_PLACEHOLDER_NAMES = ['veo3_start.webp', 'veo3_end.webp', 'veo3_i2v_one.webp', 'veo3_i2v_two.webp', 'veo3_i2v_three.webp']

// 监听生成模式变化：清空后按模式加载默认占位图（仅展示）或重置
watch(() => formData.generationType, async (newType) => {
  if (imageUploadRef.value) {
    imageUploadRef.value.clearFiles()
  }
  formData.imageUrls = []

  if (newType === 'FIRST_AND_LAST_FRAMES_2_VIDEO') {
    try {
      const startResponse = await fetch('/tools-example/veo3_start.webp')
      const endResponse = await fetch('/tools-example/veo3_end.webp')
      if (startResponse.ok && endResponse.ok) {
        const startBlob = await startResponse.blob()
        const endBlob = await endResponse.blob()
        const startFile = new File([startBlob], 'veo3_start.webp', { type: 'image/webp' })
        const endFile = new File([endBlob], 'veo3_end.webp', { type: 'image/webp' })
        await loadImagesToComponent([startFile, endFile])
      }
    } catch (error) {
      console.error('Failed to load default placeholder images:', error)
    }
  } else if (newType === 'REFERENCE_2_VIDEO') {
    formData.model = 'veo3_fast'
    formData.aspectRatio = '16:9'
    try {
      const oneResponse = await fetch('/tools-example/veo3_i2v_one.webp')
      const twoResponse = await fetch('/tools-example/veo3_i2v_two.webp')
      const threeResponse = await fetch('/tools-example/veo3_i2v_three.webp')
      if (oneResponse.ok && twoResponse.ok && threeResponse.ok) {
        const oneBlob = await oneResponse.blob()
        const twoBlob = await twoResponse.blob()
        const threeBlob = await threeResponse.blob()
        const oneFile = new File([oneBlob], 'veo3_i2v_one.webp', { type: 'image/webp' })
        const twoFile = new File([twoBlob], 'veo3_i2v_two.webp', { type: 'image/webp' })
        const threeFile = new File([threeBlob], 'veo3_i2v_three.webp', { type: 'image/webp' })
        await loadImagesToComponent([oneFile, twoFile, threeFile])
      }
    } catch (error) {
      console.error('Failed to load default placeholder images:', error)
    }
  } else if (newType === 'TEXT_2_VIDEO') {
    // 文本模式无需图片
  } else if (newType === 'VIDEO_EXTEND') {
    result.value = null
  }
})

// 将占位图加载到上传组件内仅做展示（会触发 update:files，由 handleImageUpdate 识别为占位不提交）
const loadImagesToComponent = async (files) => {
  try {
    const dataTransfer = new DataTransfer()
    files.forEach(file => dataTransfer.items.add(file))
    if (imageUploadRef.value?.$el) {
      const input = imageUploadRef.value.$el.querySelector('input[type="file"]')
      if (input) {
        input.files = dataTransfer.files
        input.dispatchEvent(new Event('change', { bubbles: true }))
      }
    }
  } catch (error) {
    console.error('Failed to load placeholder images into component:', error)
  }
}

// 计算属性
const canGenerate = computed(() => {
  // 基础验证：必须有提示词
  if (!formData.prompt.trim()) return false
  
  // 根据生成模式进行额外验证
  if (formData.generationType === 'FIRST_AND_LAST_FRAMES_2_VIDEO') {
    // 首尾帧模式：需要1-2张图片
    return formData.imageUrls.length >= 1 && formData.imageUrls.length <= 2
  } else if (formData.generationType === 'REFERENCE_2_VIDEO') {
    // 参考图模式：需要1-3张图片
    return formData.imageUrls.length >= 1 && formData.imageUrls.length <= 3
  } else if (formData.generationType === 'VIDEO_EXTEND') {
    // 视频扩展模式：需要taskId
    return formData.taskId.trim().length > 0
  }
  
  // 文生视频模式：只需要提示词
  return true
})

// 图片上传处理：仅当用户主动选择图片时才上传并写入 imageUrls；默认占位图仅展示不提交
const handleImageUpdate = async (files) => {
  if (!files || (Array.isArray(files) && files.length === 0)) {
    formData.imageUrls = []
    return
  }
  const list = Array.isArray(files) ? files : [files]
  // 若全是默认占位图文件名，视为仅占位展示，不调用上传接口、不写入可提交字段
  const isOnlyPlaceholders = list.every(f => DEFAULT_PLACEHOLDER_NAMES.includes(f.name))
  if (isOnlyPlaceholders) {
    formData.imageUrls = []
    return
  }
  const maxCount = formData.generationType === 'FIRST_AND_LAST_FRAMES_2_VIDEO' ? 2 : 3
  if (list.length > maxCount) {
    showError(`Maximum ${maxCount} image(s) for this mode`)
    return
  }
  isUploadingImages.value = true
  try {
    formData.imageUrls = await getUrlsForFiles(list, uploadFilesToUrls)
  } catch (e) {
    showError(e.message || 'Failed to upload images')
    formData.imageUrls = []
    imageUploadRef.value?.clearFiles?.()
  } finally {
    isUploadingImages.value = false
  }
}

// 获取图片上传提示信息
const getImageUploadHint = () => {
  if (formData.generationType === 'FIRST_AND_LAST_FRAMES_2_VIDEO') {
    return '1 image: revolve around this image; 2 images: first image as the first frame, second image as the last frame, generate transition video'
  } else if (formData.generationType === 'REFERENCE_2_VIDEO') {
    return 'Upload 1-3 reference images, AI will generate video content based on these images'
  }
  return 'Upload reference images'
}

// 获取上传提示
const getUploadHint = () => {
  if (formData.generationType === 'FIRST_AND_LAST_FRAMES_2_VIDEO') {
    return 'Supports 1-2 images, JPG/PNG format'
  } else if (formData.generationType === 'REFERENCE_2_VIDEO') {
    return 'Supports 1-3 images, JPG/PNG format'
  }
  return 'Supports 1-3 images, JPG/PNG format'
}

// 获取提示词占位符
const getPromptPlaceholder = () => {
  if (formData.generationType === 'VIDEO_EXTEND') {
    return 'Describe in detail how you want the video to extend, including actions, scene changes, styles, etc.'
  } else if (formData.generationType === 'FIRST_AND_LAST_FRAMES_2_VIDEO') {
    return 'The camera performs a smooth 180-degree arc shot, starting with the front-facing view of the singer and circling around her to seamlessly end on the POV shot from behind her on stage. The singer sings "when you look me in the eyes, I can see a million stars.'
  } else if (formData.generationType === 'REFERENCE_2_VIDEO') {
    return 'Close up shot of woman with sunglasses on top of her head, gold hood earrings, is walking in the garden, she is lost and asks where everyone is and what\'s going on.'
  }
  return 'A keyboard whose keys are made of different types of candy. Typing makes sweet, crunchy sounds. Audio: Crunchy, sugary typing sounds, delighted giggles.'
}

// 获取提示词说明
const getPromptHint = () => {
  if (formData.generationType === 'VIDEO_EXTEND') {
    return ''
  }
  return ''
}

// 获取预览视频路径
const getPreviewVideoSrc = () => {
  if (formData.generationType === 'FIRST_AND_LAST_FRAMES_2_VIDEO') {
    return '/tools-example/veo3_frames.mp4'
  } else if (formData.generationType === 'REFERENCE_2_VIDEO') {
    return '/tools-example/veo3_i2v.mp4'
  }
  return '/tools-example/veo3_t2v.mp4'
}

// 种子取值范围 10000-99999
const clampSeeds = (v) => {
  if (v == null || v === '') return undefined
  const n = Number(v)
  if (Number.isNaN(n)) return undefined
  return Math.min(99999, Math.max(10000, Math.floor(n)))
}

const resolveVideoResult = (data) => {
  if (data?.taskId || data?.videoUrl || (Array.isArray(data?.outputUrls) && data.outputUrls.length)) return data
  return data
}

// 生成视频
const generateVideo = async () => {
  if (addToUsageHistory) addToUsageHistory('Veo3')

  const promptTrim = formData.prompt?.trim()
  if (!promptTrim || promptTrim.length > 1000) {
    showError('Prompt is required and must be 1-1000 characters')
    return
  }

  isGenerating.value = true
  try {
    if (formData.generationType === 'VIDEO_EXTEND') {
      const body = {
        taskId: formData.taskId.trim(),
        prompt: promptTrim,
        seeds: clampSeeds(formData.seeds),
        watermark: formData.watermark?.trim() || undefined
      }
      const data = await post('/api/video/veo/extend', body)
      const rid = data?.recordId ?? data?.data?.recordId
      if (rid) { router.push(getVeo3RecordPath() + '?record-id=' + encodeURIComponent(rid)); return }
      result.value = resolveVideoResult(data)
    } else {
      const body = {
        prompt: promptTrim,
        model: formData.model || 'veo3_fast',
        generationType: formData.generationType,
        enableTranslation: formData.enableTranslation != null ? !!formData.enableTranslation : true,
        imageUrls: (formData.imageUrls && formData.imageUrls.length > 0) ? formData.imageUrls : undefined,
        aspectRatio: formData.aspectRatio || '16:9',
        watermark: formData.watermark?.trim() || undefined,
        seeds: clampSeeds(formData.seeds)
      }
      const data = await post('/api/video/veo/generate', body)
      const rid = data?.recordId ?? data?.data?.recordId
      if (rid) { router.push(getVeo3RecordPath() + '?record-id=' + encodeURIComponent(rid)); return }
      result.value = resolveVideoResult(data)
    }
  } catch (error) {
    console.error('Generation failed:', error)
    if (!error?.__fromApi) showError(error?.message || 'Request failed')
  } finally {
    isGenerating.value = false
  }
}

// 扩展视频（结果面板内使用 result.taskId）
const extendVideo = async () => {
  if (!result.value?.taskId || !extendPrompt.value.trim()) return
  const promptTrim = extendPrompt.value.trim()
  if (promptTrim.length > 1000) {
    showError('Extension prompt must be 1-1000 characters')
    return
  }
  isGenerating.value = true
  try {
    const body = {
      taskId: result.value.taskId,
      prompt: promptTrim,
      seeds: clampSeeds(formData.seeds),
      watermark: formData.watermark?.trim() || undefined
    }
    const data = await post('/api/video/veo/extend', body)
    const rid = data?.recordId ?? data?.data?.recordId
    if (rid) { router.push(getVeo3RecordPath() + '?record-id=' + encodeURIComponent(rid)); return }
    result.value = resolveVideoResult(data)
    extendPrompt.value = ''
  } catch (error) {
    console.error('Extension failed:', error)
    if (!error?.__fromApi) showError(error?.message || 'Request failed')
  } finally {
    isGenerating.value = false
  }
}

// 获取1080P视频
const get1080PVideo = async () => {
  if (!result.value?.taskId) return

  try {
    const response = await fetch(`/api/veo3/1080p/${result.value.taskId}`, {
      method: 'GET'
    })
    
    if (response.ok) {
      const data = await response.json()
      result.value.videoUrl = data.videoUrl
    } else {
      throw new Error('Failed to get 1080P video')
    }
  } catch (error) {
    console.error('Failed to get 1080P video:', error)
    showError('Failed to get 1080P video, please try again')
  }
}

// 下载视频
const downloadVideo = () => {
  if (displayResult.value?.videoUrl) {
    const link = document.createElement('a')
    link.href = displayResult.value.videoUrl
    link.download = `veo3-video-${Date.now()}.mp4`
  link.click()
  }
}

// 分享视频
const shareVideo = () => {
  if (navigator.share && displayResult.value) {
    navigator.share({
      title: 'Veo3 Generated Video',
      text: 'Check out the video I generated using Veo3',
      url: displayResult.value.videoUrl
    })
  } else {
    navigator.clipboard.writeText(displayResult.value.videoUrl)
    showSuccess('Video link copied to clipboard')
  }
}
</script>

<style scoped>
.veo3-tool {
  width: 100%;
  height: 100%;
  padding: 20px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

/* 工具头部 */
 .tool-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 20px;
}

.tool-avatar { width: 48px; height: 48px; border-radius: 12px; overflow: hidden; flex: 0 0 auto; display: flex; align-items: center; justify-content: center; }
.tool-avatar img { width: 100%; height: 100%; object-fit: cover; image-rendering: auto; }

.tool-details h3 {
  margin: 0 0 4px 0;
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
}

.tool-details p {
  margin: 0;
  font-size: 13px;
  color: #6b7280;
  line-height: 1.5;
}

/* 主内容区域 */
.main-content {
  display: flex;
  flex: 1;
  min-height: 0;
  gap: 20px;
}

/* 配置面板 */
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

.config-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e2e8f0;
}

.config-header h4 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.config-fieldset {
  border: none;
  margin: 0;
  padding: 0;
}

/* 表单样式 */
.config-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  overflow-y: auto;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.required {
  color: #3b82f6;
}

.form-input,
.form-select {
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s ease;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-hint {
  font-size: 12px;
  color: #6b7280;
  line-height: 1.4;
}

.input-hint-warn {
  color: #b45309;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
}

.checkbox-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #3b82f6;
}

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
  transition: all 0.3s ease;
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

.mode-hint {
  font-size: 12px;
  color: #6b7280;
  font-weight: normal;
}

/* 选项标签页 */
.option-tabs {
  display: grid;
  gap: 8px;
  margin-bottom: 8px;
}

.option-tabs.two-columns {
  grid-template-columns: repeat(2, 1fr);
}

.option-tabs.three-columns {
  grid-template-columns: repeat(3, 1fr);
}

.option-tab {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 12px;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
}

.option-tab:hover {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.05);
}

.option-tab.active {
  border-color: #3b82f6;
  background: #3b82f6;
  color: white;
}

.option-tab i {
  font-size: 14px;
}

/* 生成按钮区域（与 Runway 一致） */
.form-actions {
  margin-top: 24px;
  padding-bottom: 20px;
}

.btn-primary {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.price-tag {
  font-size: 15px;
  opacity: 0.8;
  margin-left: 4px;
}

/* 结果面板 */
.result-panel {
  width: 65%;
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e2e8f0;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.detail-loading-state, .detail-failure-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; padding: 40px; text-align: center;
}
.detail-spinner { font-size: 48px; color: #667eea; }
.detail-loading-state p, .detail-failure-state p { margin: 0; font-size: 16px; color: #64748b; }
.detail-failure-state .failure-icon { font-size: 56px; color: #ef4444; }
.detail-failure-state .failure-message { max-width: 420px; line-height: 1.6; color: #374151; }

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  text-align: center;
  color: #6b7280;
  gap: 20px;
  padding: 20px;
}

.preview-video-container {
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  background: #000;
}

.preview-video {
  width: 100%;
  height: auto;
  display: block;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state h4 {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #374151;
}

.empty-state p {
  margin: 0;
  font-size: 14px;
}

/* 视频结果 */
.video-result {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  min-height: 0;
}

.video-player {
  position: relative;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
}

.video-element {
  width: 100%;
  height: auto;
  display: block;
}

.video-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #6b7280;
  background: #f3f4f6;
}

.video-placeholder i {
  font-size: 32px;
  margin-bottom: 8px;
}

.video-info h5 {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #1f2937;
}

.video-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #6b7280;
}

.video-meta span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.video-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.action-btn {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;
}

.action-btn:hover {
  background: #e5e7eb;
  border-color: #9ca3af;
}

/* 视频扩展 */
.video-extend {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
}

.video-extend h6 {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #374151;
}

.extend-form {
  display: flex;
  gap: 8px;
}

.extend-form .form-input {
  flex: 1;
}

.extend-btn {
  background: #10b981;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;
}

.extend-btn:hover:not(:disabled) {
  background: #059669;
}

.extend-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

/* Usage Tips - Horizontal layout like Suno */
.usage-tips {
  padding: 20px 30px;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
}

.tip-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  color: #64748b;
}

.tip-item:last-child {
  margin-bottom: 0;
}

.tip-icon {
  font-size: 16px;
  flex-shrink: 0;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .main-content {
    flex-direction: column;
  }
  
  .config-panel,
  .result-panel {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .veo3-tool {
    padding: 16px;
  }
  
  .tool-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .config-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .mode-tabs {
    gap: 6px;
  }
  
  .mode-tab {
    padding: 8px 12px;
    font-size: 13px;
  }
  
  .video-actions {
    flex-direction: column;
  }
  
  .extend-form {
    flex-direction: column;
  }
}
</style>