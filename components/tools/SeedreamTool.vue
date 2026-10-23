<template>
  <div class="seedream-tool">
    <div class="tool-header">
      <div class="tool-avatar">
        <img src="/tools-logo/Seedream.png" alt="Seedream" />
      </div>
      <div class="tool-details">
        <h3>Seedream</h3>
        <p class="tool-description">Seedream on FuseAITools is ByteDance's image suite: 5 Lite at 2K/3K, plus new <strong>5 Pro</strong> (1K/2K) and <strong>5 Flash</strong> (1K/1.5K/2K) with up to 10 reference images and <strong>layer decomposition</strong> that splits artwork into editable PNG layers. Pair with <strong>Seedance</strong> to turn stills into video clips.</p>
      </div>
    </div>

    <div class="mode-tabs-wrap">
      <div class="mode-tabs">
        <div
          v-for="tab in modeList"
          :key="tab.id"
          class="mode-tab"
          :class="{ active: mode === tab.id }"
          @click="goToTab(tab.id)"
        >
          <i :class="tab.icon"></i>
          <span>{{ tab.label }}</span>
        </div>
      </div>
    </div>

    <div class="main-content">
      <div class="config-panel">
        <div class="config-header">
          <h4 class="panel-title">Configuration</h4>
        </div>
        <form class="config-form" @submit.prevent="generate">
          <fieldset class="config-fieldset" :disabled="isGenerating || isDetailView">
            <div class="form-group">
              <label for="seedream-prompt" class="form-label">
                Prompt <span v-if="!isLayerMode" class="required">*</span>
              </label>
              <textarea
                id="seedream-prompt"
                v-model="formData.prompt"
                class="form-input"
                rows="4"
                :placeholder="isLayerMode ? 'Optional — describe which elements to extract; leave empty for auto detection. Supports <bbox>x1 y1 x2 y2</bbox> (0-1000) to target regions.' : 'A text description of the image you want to generate'"
                :maxlength="maxPromptLen"
                :required="!isLayerMode"
              ></textarea>
              <div class="char-count" v-if="formData.prompt">
                {{ formData.prompt.length }}/{{ maxPromptLen }}
              </div>
              <div v-if="isLayerMode" class="form-hint">Optional hint for the decomposition—omit to let the model detect main elements automatically.</div>
            </div>

            <div v-if="mode === '5-lite-image-to-image' || isNewImageToImageMode" class="form-group">
              <label class="form-label">
                Image(s) <span class="required">*</span>
              </label>
              <UploadImage :readonly="isDetailView"
                ref="imageUploadRef"
                input-id="seedream-image-upload"
                label=""
                upload-text="Click to upload image(s)"
                :upload-hint="isNewImageToImageMode
                  ? 'Up to 10 images; JPEG, PNG, WebP; max 30MB each'
                  : 'JPEG, PNG, WebP; max 10MB each'"
                :max-files="isNewImageToImageMode ? 10 : 5"
                :max-file-size="(isNewImageToImageMode ? 30 : 10) * 1024 * 1024"
                accept="image/jpeg,image/png,image/webp"
                :multiple="true"
                @update:files="handleImageFiles"
              />
              <span v-if="isUploadingImages" class="form-hint">Uploading...</span>
              <div v-if="isDetailView && formData.imageUrls?.length" class="detail-ref-urls">
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

            <!-- 5 Pro / 5 Flash 图层拆解：恰好 1 张源图 -->
            <div v-if="isLayerMode" class="form-group">
              <label class="form-label">
                Source Image <span class="required">*</span>
              </label>
              <UploadImage :readonly="isDetailView"
                ref="layerUploadRef"
                input-id="seedream-layer-upload"
                label=""
                upload-text="Click to upload source image"
                upload-hint="Exactly 1 image; PNG/JPEG ≤30MB; total pixels 262K–36M; aspect 1:16–16:1"
                :max-files="1"
                :max-file-size="30 * 1024 * 1024"
                accept="image/png,image/jpeg"
                :multiple="false"
                @update:files="handleLayerFile"
              />
              <span v-if="isUploadingLayer" class="form-hint">Uploading...</span>
              <div v-if="isDetailView && formData.layerImageUrl" class="detail-ref-urls">
                <span class="form-label">Source image (this task)</span>
                <div class="detail-ref-urls-links">
                  <a :href="formData.layerImageUrl" target="_blank" rel="noopener noreferrer" class="detail-ref-link">Source image</a>
                </div>
              </div>
            </div>

            <div v-if="!isLayerMode" class="form-group">
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

            <div v-if="isLiteMode" class="form-group">
              <label class="form-label">Quality <span class="required">*</span></label>
              <div class="tab-group">
                <button type="button" class="tab-option" :class="{ active: formData.quality === 'basic' }" @click="formData.quality = 'basic'">Basic (2K)</button>
                <button type="button" class="tab-option" :class="{ active: formData.quality === 'high' }" @click="formData.quality = 'high'">High (3K)</button>
              </div>
              <div class="form-hint">Basic outputs 2K; High outputs 3K.</div>
            </div>

            <!-- 5 Pro / 5 Flash: Resolution（计费维度） -->
            <div v-if="isNewSeedreamMode" class="form-group">
              <label class="form-label">Resolution <span class="required">*</span></label>
              <div class="tab-group">
                <button v-for="r in resolutionOptions" :key="r" type="button" class="tab-option" :class="{ active: formData.resolution === r }" @click="formData.resolution = r">{{ r }}</button>
              </div>
              <div class="form-hint">{{ resolutionHint }}</div>
            </div>

            <!-- 5 Pro / 5 Flash: Output Format -->
            <div v-if="isNewSeedreamMode" class="form-group">
              <label class="form-label">Output Format</label>
              <div class="tab-group">
                <button type="button" class="tab-option" :class="{ active: formData.outputFormat === '' }" @click="formData.outputFormat = ''">Default</button>
                <button v-for="fmt in outputFormatOptions" :key="fmt" type="button" class="tab-option" :class="{ active: formData.outputFormat === fmt }" @click="formData.outputFormat = fmt">{{ fmt.toUpperCase() }}</button>
              </div>
              <div class="form-hint">{{ isLayerMode ? 'Base image format; decomposed layers are always PNG.' : 'Leave Default to let the provider choose (PNG).' }}</div>
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
              <a href="/news/seedream-abstract-tech-blog-cover-tutorial" target="_blank" rel="noopener noreferrer" class="tutorial-link">Abstract tech blog cover — Seedream 5 Lite tutorial</a>
              <a href="/news/seedream-vertical-social-story-cover-tutorial" target="_blank" rel="noopener noreferrer" class="tutorial-link">Vertical social story cover — Seedream 5 Lite tutorial</a>
            </div>
          </div>

          <div v-if="!isDetailView && route.path === '/home/seedream/5-lite-image-to-image'" class="tutorial-showcase">
            <p class="tutorial-showcase-title">🎨 Tutorial Showcase</p>
            <div class="tutorial-showcase-links">
              <a href="/news/seedream-nezha-first-last-frame-tutorial" target="_blank" rel="noopener noreferrer" class="tutorial-link">First &amp; last frame images for video (Nezha &amp; Ao Bing sprint) — Seedream 5 Lite</a>
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
            <div v-else-if="multiResultImages.length" class="result-display">
              <div class="image-result">
                <p class="form-label">Decomposed layers ({{ multiResultImages.length }} images)</p>
                <div class="result-image-grid">
                  <a v-for="(u, idx) in multiResultImages" :key="idx" :href="u" target="_blank" rel="noopener noreferrer" class="grid-image-link">
                    <img :src="u" :alt="`Generated image ${idx + 1}`" class="result-image grid-image" loading="lazy" decoding="async" />
                  </a>
                </div>
                <div class="image-actions">
                  <button v-for="(u, idx) in multiResultImages" :key="'dl-' + idx" @click="downloadUrl(u, idx)" class="action-btn">
                    <i class="fas fa-download"></i> Download {{ idx + 1 }}
                  </button>
                </div>
              </div>
            </div>
            <div v-else-if="!displayResult" class="empty-state">
              <h4>No image generated yet</h4>
              <p>Fill in the form and click "Generate Image" to start.</p>
            </div>
            <div v-else class="result-display">
              <div class="image-result">
                <img v-if="displayResult.imageUrl" :src="displayResult.imageUrl" alt="Generated" class="result-image" loading="lazy" decoding="async" />
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

const modeList = [
  { id: '5-lite-text-to-image', label: '5 Lite Text to Image', icon: 'fas fa-font' },
  { id: '5-lite-image-to-image', label: '5 Lite Image to Image', icon: 'fas fa-image' },
  { id: '5-pro-text-to-image', label: '5 Pro Text to Image', icon: 'fas fa-crown' },
  { id: '5-pro-image-to-image', label: '5 Pro Image to Image', icon: 'fas fa-photo-film' },
  { id: '5-pro-layer-decomposition', label: '5 Pro Layer Decomposition', icon: 'fas fa-layer-group' },
  { id: '5-flash-text-to-image', label: '5 Flash Text to Image', icon: 'fas fa-bolt' },
  { id: '5-flash-image-to-image', label: '5 Flash Image to Image', icon: 'fas fa-wand-magic-sparkles' },
  { id: '5-flash-layer-decomposition', label: '5 Flash Layer Decomposition', icon: 'fas fa-clone' }
]

const modeTabToPath = {
  '5-lite-text-to-image': '/home/seedream/5-lite-text-to-image',
  '5-lite-image-to-image': '/home/seedream/5-lite-image-to-image',
  '5-pro-text-to-image': '/home/seedream/5-pro-text-to-image',
  '5-pro-image-to-image': '/home/seedream/5-pro-image-to-image',
  '5-pro-layer-decomposition': '/home/seedream/5-pro-layer-decomposition',
  '5-flash-text-to-image': '/home/seedream/5-flash-text-to-image',
  '5-flash-image-to-image': '/home/seedream/5-flash-image-to-image',
  '5-flash-layer-decomposition': '/home/seedream/5-flash-layer-decomposition'
}
const pathToMode = {
  '/home/seedream/5-lite-text-to-image': '5-lite-text-to-image',
  '/home/seedream/5-lite-image-to-image': '5-lite-image-to-image',
  '/home/seedream/5-pro-text-to-image': '5-pro-text-to-image',
  '/home/seedream/5-pro-image-to-image': '5-pro-image-to-image',
  '/home/seedream/5-pro-layer-decomposition': '5-pro-layer-decomposition',
  '/home/seedream/5-flash-text-to-image': '5-flash-text-to-image',
  '/home/seedream/5-flash-image-to-image': '5-flash-image-to-image',
  '/home/seedream/5-flash-layer-decomposition': '5-flash-layer-decomposition',
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
  quality: 'basic',
  // 5 Pro / 5 Flash 专用
  resolution: '1K',
  outputFormat: '',
  layerImageUrl: ''
})

// ===== 5 Pro / 5 Flash 新家族 =====
const isLiteMode = computed(() => mode.value === '5-lite-text-to-image' || mode.value === '5-lite-image-to-image')
const isProMode = computed(() => mode.value.startsWith('5-pro-'))
const isFlashMode = computed(() => mode.value.startsWith('5-flash-'))
const isNewSeedreamMode = computed(() => isProMode.value || isFlashMode.value)
const isLayerMode = computed(() => mode.value === '5-pro-layer-decomposition' || mode.value === '5-flash-layer-decomposition')
const isNewImageToImageMode = computed(() => mode.value === '5-pro-image-to-image' || mode.value === '5-flash-image-to-image')
// Pro 文生图/图生图仅 1K/2K；Pro 图层拆解与 Flash 全系支持 1K/1.5K/2K（Flash 三档同价）
const resolutionOptions = computed(() =>
  (isProMode.value && !isLayerMode.value) ? ['1K', '2K'] : ['1K', '1.5K', '2K']
)
const resolutionHint = computed(() => {
  if (isProMode.value && !isLayerMode.value) return '1K / 2K — pricing is matched by resolution.'
  if (isProMode.value) return '1K / 1.5K / 2K — pricing is matched by resolution.'
  return '1K / 1.5K / 2K — all three tiers share the same price.'
})
const outputFormatOptions = ['png', 'jpeg']

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
  '5-lite-image-to-image': 'seedream-5-lite-image-to-image',
  '5-pro-text-to-image': 'seedream-5-pro-text-to-image',
  '5-pro-image-to-image': 'seedream-5-pro-image-to-image',
  '5-pro-layer-decomposition': 'seedream-5-pro-layer-decomposition',
  '5-flash-text-to-image': 'seedream-5-flash-text-to-image',
  '5-flash-image-to-image': 'seedream-5-flash-image-to-image',
  '5-flash-layer-decomposition': 'seedream-5-flash-layer-decomposition'
}
const seedreamPriceText = computed(() => {
  const modelKey = seedreamPriceModelKeyMap[mode.value]
  if (!modelKey) return ''
  // 新家族：计价维度 = resolution → quality（与 Qwen 新家族同款）
  const credits = isNewSeedreamMode.value
    ? getPrice(modelKey, { quality: formData.resolution })
    : getPrice(modelKey, {
        aspectRatio: formData.aspectRatio,
        quality: formData.quality
      })
  const str = formatCredits(credits)
  if (!str) return ''
  return `· ${str} credits${discountText.value}`
})

const imageUploadRef = ref(null)
const isUploadingImages = ref(false)
const layerUploadRef = ref(null)
const isUploadingLayer = ref(false)
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

// 图层拆解：恰好 1 张源图
async function handleLayerFile(files) {
  const list = Array.isArray(files) ? files : (files ? [files] : [])
  if (!list.length) {
    formData.layerImageUrl = ''
    return
  }
  isUploadingLayer.value = true
  try {
    const urls = await getUrlsForFiles([list[0]], uploadFilesToUrls)
    formData.layerImageUrl = urls[0] || ''
  } catch (e) {
    showError(e?.message || 'Upload failed')
    formData.layerImageUrl = ''
    layerUploadRef.value?.clearFiles?.()
  } finally {
    isUploadingLayer.value = false
  }
}

const maxPromptLen = computed(() => isNewSeedreamMode.value ? 5000 : (mode.value === '5-lite-image-to-image' ? 2996 : 2995))
const canGenerate = computed(() => {
  const p = (formData.prompt || '').trim()
  if (isNewSeedreamMode.value) {
    if (p.length > 5000) return false
    if (isLayerMode.value) {
      // prompt 可选；传入时需 ≥4 字符
      if (p.length && p.length < 4) return false
      return !!formData.layerImageUrl
    }
    if (p.length < 4) return false
    if (isNewImageToImageMode.value) {
      const n = formData.imageUrls.filter(Boolean).length
      return n >= 1 && n <= 10
    }
    return true
  }
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
  // 5 Pro / 5 Flash 字段回填
  if (o.resolution) formData.resolution = String(o.resolution)
  if (o.outputFormat) formData.outputFormat = String(o.outputFormat)
  if (o.imageUrl) formData.layerImageUrl = String(o.imageUrl)
}

function pickDetailImageUrl(d) {
  if (!d || typeof d !== 'object') return ''
  const url = d.outputUrl || d.imageUrl
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

// 图层拆解等多图输出：汇总所有可展示 URL
function extractImageUrls(d) {
  if (!d || typeof d !== 'object') return []
  const arr = d.outputUrls || d.output_urls || d.layerUrls || d.imageUrls
  if (Array.isArray(arr)) {
    return arr.map(u => (typeof u === 'string' ? u : u?.url || '')).filter(Boolean)
  }
  const single = d.outputUrl || d.imageUrl
  return single ? [typeof single === 'string' ? single : single?.url || ''] : []
}
const detailResultUrls = computed(() => {
  if (isDetailView.value) {
    if (detailData.value && Number(detailData.value.status) === 2) return extractImageUrls(detailData.value)
    return []
  }
  return extractImageUrls(result.value)
})
const multiResultImages = computed(() => (detailResultUrls.value.length > 1 ? detailResultUrls.value : []))

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
    let apiPath
    let body
    const m = mode.value
    if (isNewSeedreamMode.value) {
      // 接口路径用 mode（如 5-pro-text-to-image），body.model 需为完整 modelKey（seedream-5-pro-text-to-image）
      apiPath = `/api/image/seedream/${m}`
      body = { model: seedreamPriceModelKeyMap[m], resolution: formData.resolution }
      if (p) body.prompt = p
      if (formData.outputFormat) body.outputFormat = formData.outputFormat
      if (isLayerMode.value) {
        body.imageUrl = formData.layerImageUrl
      } else {
        body.aspectRatio = formData.aspectRatio
        if (m.endsWith('image-to-image')) body.imageUrls = formData.imageUrls.filter(Boolean)
        if (m.includes('text-to-image') || m.includes('image-to-image')) body.nsfwChecker = false
      }
    } else {
      const isTextMode = m === '5-lite-text-to-image'
      apiPath = isTextMode
        ? '/api/image/seedream/lite-text-to-image'
        : '/api/image/seedream/lite-image-to-image'
      body = {
        model: isTextMode ? 'seedream-5-lite-text-to-image' : 'seedream-5-lite-image-to-image',
        prompt: p,
        aspectRatio: formData.aspectRatio,
        quality: formData.quality
      }
      if (!isTextMode) body.imageUrls = formData.imageUrls
    }

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
    downloadUrl(displayResult.value.imageUrl, 0)
  }
}

function downloadUrl(url, idx = 0) {
  if (!url) return
  const a = document.createElement('a')
  a.href = url
  a.download = `seedream-${Date.now()}-${idx}.png`
  a.click()
}

watch(mode, (m) => {
  const path = modeTabToPath[m]
  if (path && route.path !== path) router.replace(path)
  // 切换模式时清理新家族专属状态，避免跨模式残留
  formData.imageUrls = []
  formData.layerImageUrl = ''
  imageUploadRef.value?.clearFiles?.()
  layerUploadRef.value?.clearFiles?.()
  if (isProMode.value && m !== '5-pro-layer-decomposition') {
    if (!['1K', '2K'].includes(formData.resolution)) formData.resolution = '1K'
  } else if (isProMode.value || isFlashMode.value) {
    if (!['1K', '1.5K', '2K'].includes(formData.resolution)) formData.resolution = '1K'
  }
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
.result-image-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; }
.grid-image-link { display: block; border-radius: 8px; overflow: hidden; border: 1px solid var(--flux-border); }
.grid-image { width: 100%; height: 160px; object-fit: cover; border: none; border-radius: 0; }
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
