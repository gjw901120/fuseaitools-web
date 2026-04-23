<template>
  <div class="flux-kontext-tool">
    <!-- 工具信息头部 -->
    <div class="tool-header">
      <div class="tool-avatar">
        <img src="/tools-logo/FluxKontext.png" alt="Flux Kontext" />
      </div>
      <div class="tool-details">
        <h3>Flux Kontext</h3>
        <p class="tool-description">Flux is Black Forest Labs' advanced image generation model that delivers photoreal detail, strong multi-reference consistency, and accurate text rendering with flexible control.</p>
      </div>
    </div>

    <div class="mode-tabs-wrap">
      <div class="mode-tabs">
        <div v-for="tab in tabList" :key="tab.id" class="mode-tab" :class="{ active: activeTab === tab.id }" @click="goToTab(tab.id)">
          <i :class="tab.icon"></i>
          <span>{{ tab.label }}</span>
        </div>
      </div>
    </div>

    <!-- 主内容区域：左右布局 -->
    <div class="main-content">
      <!-- 左侧：参数配置面板 (1/3) -->
      <div class="config-panel">
        <div class="config-header">
          <h4>Image Generation Configuration</h4>
        </div>

        <form class="config-form" @submit.prevent="onSubmit">
          <fieldset class="config-fieldset" :disabled="isGenerating || isDetailView">
          <template v-if="activeTab === 'generate'">
          <!-- 模式选择 -->
          <div class="form-group">
            <label class="form-label">Mode Selection *</label>
            <div class="mode-switch">
              <button 
                type="button"
                class="mode-btn"
                :class="{ active: mode === 'generate' }"
                @click="mode = 'generate'"
              >
                <i class="fas fa-image"></i>
                Image Generation
              </button>
              <button 
                type="button"
                class="mode-btn"
                :class="{ active: mode === 'edit' }"
                @click="mode = 'edit'"
              >
                <i class="fas fa-edit"></i>
                Image Editing
              </button>
            </div>
          </div>

          <!-- 提示词输入 -->
          <div class="form-group">
            <label for="prompt" class="form-label">
              Prompt <span class="required">*</span>
            </label>
            <textarea
              id="prompt"
              v-model="formData.prompt"
              class="form-input"
              rows="4"
              placeholder="Describe in detail the image content you want to generate, including scenes, styles, colors, etc... (English only)"
              required
            ></textarea>
            <div class="form-hint">
              Example: "A serene mountain landscape at sunset with a lake reflecting the orange sky"
            </div>
          </div>

          <!-- 自动翻译 -->
          <div class="form-group">
            <label class="checkbox-label" for="enable-translation">
              <input 
                id="enable-translation"
                type="checkbox" 
                v-model="formData.enableTranslation"
              />
              <span class="checkmark"></span>
              Enable Auto Translation
            </label>
            <div class="form-hint">
              Automatically translate non-English prompts to English
            </div>
          </div>


          <!-- 编辑模式：上传图片 -->
          <div class="form-group" v-if="mode === 'edit'">
            <UploadImage
              ref="inputImageUploadRef"
              input-id="flux-kontext-input-image"
              label="Upload Image *"
              upload-icon="fas fa-cloud-upload-alt"
              upload-text="Click to upload image"
              upload-hint="Supports .jfif, .jpeg, .jpg, .png, .webp"
              :multiple="false"
              :max-file-size="10 * 1024 * 1024"
              additional-hint="Must be a valid image file for edit mode"
              theme-color="#667eea"
              @update:files="handleInputImage"
            />
            <div v-if="isUploadingImage" class="uploading-hint">
              <i class="fas fa-spinner fa-spin"></i> Uploading image...
            </div>
          </div>

          <!-- 长宽比选择 -->
          <div class="form-group">
            <label class="form-label">Aspect Ratio</label>
            <div class="tab-group">
              <div class="tab-row">
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.aspectRatio === '21:9' }"
                  @click="formData.aspectRatio = '21:9'"
                >
                  <span>21:9</span>
                  <span class="tab-label">Ultra Wide</span>
                </button>
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.aspectRatio === '16:9' }"
                  @click="formData.aspectRatio = '16:9'"
                >
                  <span>16:9</span>
                  <span class="tab-label">Wide</span>
                </button>
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.aspectRatio === '4:3' }"
                  @click="formData.aspectRatio = '4:3'"
                >
                  <span>4:3</span>
                  <span class="tab-label">Standard</span>
                </button>
              </div>
              <div class="tab-row">
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.aspectRatio === '1:1' }"
                  @click="formData.aspectRatio = '1:1'"
                >
                  <span>1:1</span>
                  <span class="tab-label">Square</span>
                </button>
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.aspectRatio === '3:4' }"
                  @click="formData.aspectRatio = '3:4'"
                >
                  <span>3:4</span>
                  <span class="tab-label">Portrait</span>
                </button>
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.aspectRatio === '9:16' }"
                  @click="formData.aspectRatio = '9:16'"
                >
                  <span>9:16</span>
                  <span class="tab-label">Mobile</span>
                </button>
              </div>
            </div>
          </div>

          <!-- 输出格式 -->
          <div class="form-group">
            <label class="form-label">Output Format</label>
            <div class="tab-group">
              <div class="tab-options">
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.outputFormat === 'jpeg' }"
                  @click="formData.outputFormat = 'jpeg'"
                >
                  <span>JPEG</span>
                </button>
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.outputFormat === 'png' }"
                  @click="formData.outputFormat = 'png'"
                >
                  <span>PNG</span>
                </button>
              </div>
            </div>
          </div>

          <!-- 提示词增强 -->
          <div class="form-group">
            <label class="checkbox-label" for="prompt-upsampling">
              <input 
                id="prompt-upsampling"
                type="checkbox" 
                v-model="formData.promptUpsampling"
              />
              <span class="checkmark"></span>
              Prompt Enhancement
            </label>
            <div class="form-hint">
              Enhance the prompt, may increase processing time
            </div>
          </div>

          <!-- 模型选择 -->
          <div class="form-group">
            <label for="model" class="form-label">Model Version</label>
            <select id="model" v-model="formData.model" class="form-input">
              <option value="flux-kontext-pro">Flux Kontext Pro - Performance Balanced</option>
              <option value="flux-kontext-max">Flux Kontext Max - Advanced Features</option>
            </select>
            <div class="form-hint">
              Max version has higher quality and detail, suitable for complex tasks
            </div>
          </div>

          <!-- 安全容忍度 -->
          <div class="form-group">
            <label for="safety-tolerance" class="form-label">
              Safety Tolerance ({{ formData.safetyTolerance }})
            </label>
            <input
              id="safety-tolerance"
              v-model="formData.safetyTolerance"
              type="range"
              min="0"
              max="6"
              class="form-slider"
            />
            <div class="slider-labels">
              <span>Strictest (0)</span>
              <span>More Relaxed (6)</span>
            </div>
          </div>

          <!-- 水印 -->
          <div class="form-group">
            <label for="watermark" class="form-label">Watermark Identifier</label>
            <input
              id="watermark"
              v-model="formData.watermark"
              type="text"
              class="form-input"
              placeholder="your-watermark-id"
            />
            <div class="form-hint">
              Optional, if provided will add a watermark to the output image
            </div>
          </div>
          </template>

          <template v-else>
            <div class="form-group">
              <label class="form-label">Prompt <span class="required">*</span></label>
              <textarea v-model="flux2Form.prompt" class="form-input" rows="4" maxlength="5000" placeholder="Prompt (3-5000 characters)" required></textarea>
            </div>
            <div class="form-group" v-if="isFlux2ImageToImage">
              <UploadImage
                ref="flux2InputImagesUploadRef"
                input-id="flux2-input-images"
                label="Input Image(s) *"
                upload-icon="fas fa-cloud-upload-alt"
                upload-text="Click to upload image(s)"
                upload-hint="Supports .jpeg, .jpg, .png, .webp; max 10MB each"
                :multiple="true"
                :max-files="8"
                :max-file-size="10 * 1024 * 1024"
                additional-hint="Upload 1-8 reference images"
                theme-color="#667eea"
                @update:files="handleFlux2InputImages"
              />
              <div v-if="isUploadingFlux2Images" class="uploading-hint">
                <i class="fas fa-spinner fa-spin"></i> Uploading image(s)...
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Aspect Ratio</label>
              <div class="tab-group">
                <div class="tab-options">
                  <button v-for="ratio in flux2AspectRatios" :key="ratio" type="button" class="tab-option" :class="{ active: flux2Form.aspectRatio === ratio }" @click="flux2Form.aspectRatio = ratio">
                    <span>{{ ratio }}</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Resolution</label>
              <div class="tab-group">
                <div class="tab-options">
                  <button type="button" class="tab-option" :class="{ active: flux2Form.resolution === '1K' }" @click="flux2Form.resolution = '1K'"><span>1K</span></button>
                  <button type="button" class="tab-option" :class="{ active: flux2Form.resolution === '2K' }" @click="flux2Form.resolution = '2K'"><span>2K</span></button>
                </div>
              </div>
            </div>
          </template>

          <!-- 生成按钮容器 -->
          <div class="generate-btn-container">
            <button 
              type="submit" 
              class="generate-btn"
              :disabled="!canGenerate || isGenerating"
            >
              <i v-if="isGenerating" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-magic"></i>
              {{ isGenerating ? 'Generating...' : 'Generate Image' }}
              <span class="price-tag">{{ fluxKontextPriceText }}</span>
            </button>
          </div>
          </fieldset>
        </form>
      </div>

      <!-- 右侧：结果展示区域 (2/3) -->
      <div class="result-panel">
        <div class="result-header">
          <h4>Generation Result</h4>
          <button 
            v-if="!isDetailView && generatedImages.length > 0" 
            @click="clearResults" 
            class="clear-btn"
          >
            <i class="fas fa-trash"></i>
            Clear Results
          </button>
        </div>

        <div class="result-content">
          <div v-if="!isDetailView && route.path === '/home/flux-kontext/flux-2-pro-text-to-image'" class="tutorial-showcase">
            <p class="tutorial-showcase-title">🎨 Tutorial Showcase</p>
            <div class="tutorial-showcase-links">
              <a href="https://www.fuseaitools.com/news/flux-2-pro-text-to-image-cinematic-dusk-mountains-tutorial" target="_blank" rel="noopener noreferrer" class="tutorial-link">Use flux-2-pro-text-to-image to generate cinematic dusk mountain visuals</a>
              <a href="https://www.fuseaitools.com/news/flux-2-pro-text-to-image-midnight-ramen-food-photography-tutorial" target="_blank" rel="noopener noreferrer" class="tutorial-link">Use flux-2-pro-text-to-image to create mouth-watering midnight ramen photography</a>
            </div>
          </div>
          <!-- 详情页：status 2 展示 outputUrls -->
          <div v-if="isDetailView && detailData && detailData.status === 2 && detailOutputImages.length > 0" class="image-grid">
            <div v-for="(image, index) in detailOutputImages" :key="index" class="image-item">
              <div class="image-container">
                <img :src="image.url" :alt="`Generated image ${index + 1}`" />
                <div class="image-overlay">
                  <button @click="downloadImage(image)" class="action-btn">
                    <i class="fas fa-download"></i>
                  </button>
                  <button @click="copyImageUrl(image)" class="action-btn">
                    <i class="fas fa-copy"></i>
                  </button>
                </div>
              </div>
              <div class="image-info">
                <div class="image-meta">
                  <span class="image-size">{{ image.aspectRatio }}</span>
                  <span class="image-format">{{ image.format.toUpperCase() }}</span>
                </div>
                <div class="image-prompt">{{ image.prompt }}</div>
              </div>
            </div>
          </div>
          <!-- 详情页：status 3 失败 -->
          <div v-else-if="isDetailView && detailData && detailData.status === 3" class="detail-failure-state">
            <div class="failure-icon"><i class="fas fa-exclamation-circle"></i></div>
            <p class="failure-message">Generation failed. You can debug the parameters and try generating again. Generation failure will not consume credits.</p>
          </div>
          <!-- 详情页：status 1 或加载中 -->
          <div v-else-if="isDetailView && (!detailData || detailData.status === 1)" class="detail-loading-state">
            <i class="fas fa-spinner fa-spin detail-spinner"></i>
            <p>Generating...</p>
          </div>
          <!-- 详情页：其他 -->
          <div v-else-if="isDetailView" class="detail-loading-state">
            <p>No output images</p>
          </div>
          <!-- 空状态 -->
          <div v-else-if="generatedImages.length === 0" class="empty-state">
            <i class="fas fa-image"></i>
            <p>No image generated yet</p>
            <span>Configure parameters and click "Generate Image" to start creating</span>
          </div>

          <!-- 图像结果（非详情页） -->
          <div v-else class="image-grid">
            <div 
              v-for="(image, index) in generatedImages" 
              :key="index"
              class="image-item"
            >
              <div class="image-container">
                <img :src="image.url" :alt="`Generated image ${index + 1}`" />
                <div class="image-overlay">
                  <button @click="downloadImage(image)" class="action-btn">
                    <i class="fas fa-download"></i>
                  </button>
                  <button @click="copyImageUrl(image)" class="action-btn">
                    <i class="fas fa-copy"></i>
                  </button>
                </div>
              </div>
              <div class="image-info">
                <div class="image-meta">
                  <span class="image-size">{{ image.aspectRatio }}</span>
                  <span class="image-format">{{ image.format.toUpperCase() }}</span>
                </div>
                <div class="image-prompt">{{ image.prompt }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import UploadImage from '../tools/common/UploadImage.vue'
import { useAuth } from '~/composables/useAuth'
import { useToast } from '~/composables/useToast'
import { useApi } from '~/composables/useApi'
import { useModelPrice } from '~/composables/useModelPrice'
import { useRecordPolling } from '~/composables/useRecordPolling'

const router = useRouter()
const route = useRoute()
const { token } = useAuth()
const { showError, showSuccess } = useToast()
const { post } = useApi()
const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling()
const { fetchPrices, getPrice, formatCredits, discount } = useModelPrice()

onMounted(() => { fetchPrices() })
const batchUploadUrl = useBatchUploadUrl()
const { getUrlsForFiles } = useFileUploadUrlCache()

const tabList = [
  { id: 'generate', label: 'Generate', icon: 'fas fa-wand-magic-sparkles' },
  { id: 'flux-2-text-to-image', label: 'Flux 2 T2I', icon: 'fas fa-font' },
  { id: 'flux-2-image-to-image', label: 'Flux 2 I2I', icon: 'fas fa-image' },
  { id: 'flux-2-pro-text-to-image', label: 'Flux 2 Pro T2I', icon: 'fas fa-pen-ruler' },
  { id: 'flux-2-pro-image-to-image', label: 'Flux 2 Pro I2I', icon: 'fas fa-layer-group' }
]
const tabToPath = {
  generate: '/home/flux-kontext/generate',
  'flux-2-text-to-image': '/home/flux-kontext/flux-2-text-to-image',
  'flux-2-image-to-image': '/home/flux-kontext/flux-2-image-to-image',
  'flux-2-pro-text-to-image': '/home/flux-kontext/flux-2-pro-text-to-image',
  'flux-2-pro-image-to-image': '/home/flux-kontext/flux-2-pro-image-to-image'
}
const pathToTab = {}
Object.keys(tabToPath).forEach(k => { pathToTab[tabToPath[k]] = k })
const activeTab = ref('generate')
function goToTab(tabId) {
  activeTab.value = tabId
  router.push(tabToPath[tabId] || tabToPath.generate)
}

// 折扣展示文本
const discountText = computed(() => {
  const rate = Number(discount?.value ?? 1)
  if (Number.isNaN(rate) || rate <= 0 || rate === 1) return ''
  const percent = (rate * 100).toFixed(0)
  return ` · ${percent}%`
})

// 价格：modelKey 以 PRICING_MAPPING 为准（下划线）；表单值为连字符，此处映射后再查价
const fluxKontextPriceText = computed(() => {
  if (activeTab.value !== 'generate') {
    const modelKey = activeTab.value
    const credits = getPrice(modelKey, {
      quality: flux2Form.resolution,
      scene: 'generate'
    })
    const str = formatCredits(credits)
    if (!str) return ''
    return `· ${str} credits${discountText.value}`
  }
  const model = formData.model || 'flux-kontext-pro'
  const modelKey = model === 'flux-kontext-max' ? 'flux_kontext_max' : 'flux_kontext_pro'
  const credits = getPrice(modelKey)
  const str = formatCredits(credits)
  if (!str) return ''
  return `· ${str} credits${discountText.value}`
})

// 表单数据（与后端 DTO 对应）
const formData = reactive({
  prompt: '',
  enableTranslation: true,
  inputImage: '',
  inputImageFile: null,
  imageUrl: '', // 编辑模式上传后的 URL
  aspectRatio: '16:9',
  outputFormat: 'jpeg',
  promptUpsampling: false,
  model: 'flux-kontext-pro',
  safetyTolerance: 2,
  watermark: ''
})
const flux2Form = reactive({
  prompt: '',
  inputUrls: [],
  aspectRatio: '1:1',
  resolution: '1K'
})
const flux2AspectRatios = ['1:1', '4:3', '3:4', '16:9', '9:16', '3:2', '2:3', 'auto']

// 状态管理
const mode = ref('generate') // 'generate' 或 'edit'
const isGenerating = ref(false)
const isUploadingImage = ref(false)
const isUploadingFlux2Images = ref(false)
const generatedImages = ref([])
const inputImageUploadRef = ref(null)
const flux2InputImagesUploadRef = ref(null)

// 详情页：仅从 URL 读取 record-id
const routeRecordId = computed(() => route.query['record-id'] || '')
const isDetailView = computed(() => !!routeRecordId.value)
const detailData = ref(null)
const loadingRecordId = ref(null)

const aspectRatioReverseMap = {
  RATIO_21_9: '21:9', RATIO_16_9: '16:9', RATIO_4_3: '4:3',
  RATIO_1_1: '1:1', RATIO_3_4: '3:4', RATIO_9_16: '9:16'
}

const detailOutputImages = computed(() => {
  if (!detailData.value || !Array.isArray(detailData.value.outputUrls)) return []
  const urls = detailData.value.outputUrls
  const od = detailData.value.originalData || {}
  const aspectRatio = aspectRatioReverseMap[od.aspectRatio] || od.aspectRatio || '16:9'
  const format = (od.outputFormat || 'JPEG').toLowerCase() === 'png' ? 'png' : 'jpeg'
  const prompt = od.prompt || ''
  return urls.map((url, i) => ({
    url: typeof url === 'string' ? url : url?.url ?? url?.imageUrl ?? '',
    aspectRatio,
    format,
    prompt
  })).filter(img => img.url)
})
const isFlux2ImageToImage = computed(() => ['flux-2-image-to-image', 'flux-2-pro-image-to-image'].includes(activeTab.value))

function fillFormFromOriginalData(originalData) {
  if (!originalData || typeof originalData !== 'object') return
  const o = originalData
  if (o.prompt != null) formData.prompt = o.prompt
  if (typeof o.enableTranslation === 'boolean') formData.enableTranslation = o.enableTranslation
  if (o.imageUrl) {
    formData.imageUrl = o.imageUrl
    mode.value = 'edit'
  } else {
    mode.value = 'generate'
  }
  if (o.aspectRatio) formData.aspectRatio = aspectRatioReverseMap[o.aspectRatio] || o.aspectRatio || formData.aspectRatio
  if (o.outputFormat) formData.outputFormat = (o.outputFormat || 'JPEG').toLowerCase() === 'png' ? 'png' : 'jpeg'
  if (typeof o.promptUpsampling === 'boolean') formData.promptUpsampling = o.promptUpsampling
  if (o.model) formData.model = o.model === 'flux_kontext_max' ? 'flux-kontext-max' : (o.model === 'flux_kontext_pro' ? 'flux-kontext-pro' : formData.model)
  if (o.safetyTolerance != null) formData.safetyTolerance = Number(o.safetyTolerance) ?? 2
  if (o.watermark != null) formData.watermark = String(o.watermark || '')
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
      pollRecordByStatus(recordId, { getIsCancelled: () => getRouteRecordId() !== recordId }).then((result) => {
        if (getRouteRecordId() !== recordId) return
        detailData.value = result
        if (result?.originalData) fillFormFromOriginalData(result.originalData)
      }).catch(() => {})
    }
  } catch (e) {
    console.error('Load record detail failed:', e)
  }
}

watch(() => route.query['record-id'], (recordId) => {
  if (recordId) loadDetailByRecordId(recordId)
  else { loadingRecordId.value = null; detailData.value = null }
}, { immediate: true })
watch(() => route.path, (path) => {
  const tab = pathToTab[path]
  if (tab) activeTab.value = tab
}, { immediate: true })

const getAuthToken = () => {
  if (!process.client) return null
  try {
    if (token?.value) return token.value
    return localStorage.getItem('auth_token')
  } catch {
    return localStorage.getItem('auth_token')
  }
}

// 编辑模式：上传输入图片并得到 imageUrl
const handleInputImage = async (files) => {
  if (!files || files.length === 0) {
    formData.inputImageFile = null
    formData.inputImage = ''
    formData.imageUrl = ''
    inputImageUploadRef.value?.clearFiles?.()
    return
  }
  const file = files[0] || files
  const fileObj = Array.isArray(file) ? file[0] : file
  if (!fileObj) {
    formData.imageUrl = ''
    return
  }
  formData.inputImageFile = fileObj
  formData.inputImage = URL.createObjectURL(fileObj)
  isUploadingImage.value = true
  try {
    const formDataUpload = new FormData()
    formDataUpload.append('file', fileObj)
    const headers = { Accept: 'application/json' }
    const authToken = getAuthToken()
    if (authToken) headers['Authorization'] = `Bearer ${authToken}`
    const response = await fetch(batchUploadUrl, {
      method: 'POST',
      headers,
      body: formDataUpload,
      credentials: 'include'
    })
    const data = await parseBatchUploadFetchResponse(response)
    const urls = data?.data?.urls || data?.fileUrls || (Array.isArray(data?.data) ? data.data : [])
    if (Array.isArray(urls) && urls[0]) {
      formData.imageUrl = urls[0]
    } else {
      throw new Error('Invalid response: file URL not found')
    }
  } catch (error) {
    console.error('Input image upload error:', error)
    showError(error.message || 'Failed to upload image', 5000)
    formData.imageUrl = ''
    formData.inputImageFile = null
    formData.inputImage = ''
    inputImageUploadRef.value?.clearFiles?.()
  } finally {
    isUploadingImage.value = false
  }
}

const uploadFilesAndGetUrls = async (files) => {
  const fileList = Array.isArray(files) ? files : [files]
  const urls = []
  for (const fileObj of fileList) {
    if (!fileObj) continue
    const formDataUpload = new FormData()
    formDataUpload.append('file', fileObj)
    const headers = { Accept: 'application/json' }
    const authToken = getAuthToken()
    if (authToken) headers['Authorization'] = `Bearer ${authToken}`
    const response = await fetch(batchUploadUrl, {
      method: 'POST',
      headers,
      body: formDataUpload,
      credentials: 'include'
    })
    const data = await parseBatchUploadFetchResponse(response)
    const uploaded = data?.data?.urls || data?.fileUrls || (Array.isArray(data?.data) ? data.data : [])
    if (Array.isArray(uploaded) && uploaded[0]) urls.push(uploaded[0])
  }
  return urls
}

const handleFlux2InputImages = async (files) => {
  if (!files || files.length === 0) {
    flux2Form.inputUrls = []
    return
  }
  isUploadingFlux2Images.value = true
  try {
    const selected = (Array.isArray(files) ? files : [files]).slice(0, 8)
    const urls = await getUrlsForFiles(selected, uploadFilesAndGetUrls)
    flux2Form.inputUrls = urls
  } catch (error) {
    showError(error.message || 'Failed to upload image(s)', 5000)
    flux2Form.inputUrls = []
    flux2InputImagesUploadRef.value?.clearFiles?.()
  } finally {
    isUploadingFlux2Images.value = false
  }
}

// 计算属性
const canGenerate = computed(() => {
  if (activeTab.value !== 'generate') {
    const p = (flux2Form.prompt || '').trim()
    if (p.length < 3 || p.length > 5000) return false
    if (isFlux2ImageToImage.value) return flux2Form.inputUrls.length >= 1 && flux2Form.inputUrls.length <= 8
    return true
  }
  if (!formData.prompt.trim()) return false
  if (mode.value === 'edit') return !!formData.imageUrl
  return true
})

// 映射前端值到后端枚举
const aspectRatioMap = {
  '21:9': 'RATIO_21_9',
  '16:9': 'RATIO_16_9',
  '4:3': 'RATIO_4_3',
  '1:1': 'RATIO_1_1',
  '3:4': 'RATIO_3_4',
  '9:16': 'RATIO_9_16'
}
const outputFormatMap = { jpeg: 'JPEG', png: 'PNG' }
// Model Version：PRICING_MAPPING 中 modelKey 为 flux_kontext_pro / flux_kontext_max；表单与接口用连字符 flux-kontext-pro / flux-kontext-max

const flux2ApiPathByTab = {
  'flux-2-text-to-image': '/api/image/flux-2/text-to-image',
  'flux-2-image-to-image': '/api/image/flux-2/text-to-image',
  'flux-2-pro-text-to-image': '/api/image/flux-2-pro/text-to-image',
  'flux-2-pro-image-to-image': '/api/image/flux-2-pro/image-to-image'
}

const onSubmit = async () => {
  if (activeTab.value === 'generate') return generateImage()
  return generateFlux2()
}

const generateFlux2 = async () => {
  if (!canGenerate.value) return
  const tab = activeTab.value
  const apiPath = flux2ApiPathByTab[tab]
  if (!apiPath) return
  const promptTrim = (flux2Form.prompt || '').trim()
  isGenerating.value = true
  try {
    const body = {
      model: tab,
      prompt: promptTrim,
      aspectRatio: flux2Form.aspectRatio,
      resolution: flux2Form.resolution
    }
    if (isFlux2ImageToImage.value) body.inputUrls = flux2Form.inputUrls
    const data = await post(apiPath, body)
    const recordId = data?.recordId ?? data?.data?.recordId
    if (recordId) {
      router.push(`${tabToPath[tab] || tabToPath.generate}?record-id=${encodeURIComponent(recordId)}`)
      return
    }
    let urls = data?.outputUrls
    if (!Array.isArray(urls) || urls.length === 0) {
      const single = data?.url ?? data?.imageUrl
      if (single) urls = [single]
    }
    const url = Array.isArray(urls) && urls[0] ? (typeof urls[0] === 'string' ? urls[0] : urls[0]?.url ?? urls[0]?.imageUrl) : null
    if (!url || typeof url !== 'string') {
      showError('No image URL in response')
      return
    }
    generatedImages.value.unshift({
      url,
      prompt: flux2Form.prompt,
      aspectRatio: flux2Form.aspectRatio,
      format: 'png',
      model: tab,
      timestamp: new Date()
    })
  } catch (error) {
    console.error('Flux2 image generation failed:', error)
    if (!error?.__fromApi) showError(error.message || 'Image generation failed, please try again')
  } finally {
    isGenerating.value = false
  }
}

// 生成图像
const generateImage = async () => {
  if (!canGenerate.value) return
  if (mode.value === 'edit' && !formData.imageUrl) {
    showError('Please upload an image for edit mode')
    return
  }
  const promptTrim = formData.prompt.trim()
  if (promptTrim.length > 5000) {
    showError('Prompt cannot exceed 5000 characters')
    return
  }

  isGenerating.value = true
  try {
    // 编辑模式必填 imageUrl（已上传）；生成模式传空，若后端对生成也要求 imageUrl 需后端改为可选或传占位
    const requestBody = {
      prompt: promptTrim,
      enableTranslation: !!formData.enableTranslation,
      imageUrl: mode.value === 'edit' ? formData.imageUrl : '',
      aspectRatio: aspectRatioMap[formData.aspectRatio] || 'RATIO_16_9',
      outputFormat: outputFormatMap[formData.outputFormat] || 'JPEG',
      promptUpsampling: !!formData.promptUpsampling,
      model: formData.model || 'flux-kontext-pro',
      safetyTolerance: Number(formData.safetyTolerance) ?? 2,
      watermark: (formData.watermark && String(formData.watermark).trim()) || undefined
    }
    if (requestBody.watermark && requestBody.watermark.length > 100) {
      showError('Watermark identifier cannot exceed 100 characters')
      return
    }
    const data = await post('/api/image/flux-kontext/generate', requestBody)
    const recordId = data?.recordId ?? data?.data?.recordId
    if (recordId) {
      router.push(`${tabToPath.generate}?record-id=${encodeURIComponent(recordId)}`)
      return
    }
    let urls = data?.outputUrls
    if (!Array.isArray(urls) || urls.length === 0) {
      const single = data?.url ?? data?.imageUrl
      if (single) urls = [single]
    }
    const url = Array.isArray(urls) && urls[0] ? (typeof urls[0] === 'string' ? urls[0] : urls[0]?.url ?? urls[0]?.imageUrl) : null
    if (!url || typeof url !== 'string') {
      showError('No image URL in response')
      return
    }
    const newImage = {
      url,
      prompt: formData.prompt,
      aspectRatio: formData.aspectRatio,
      format: formData.outputFormat,
      model: formData.model,
      timestamp: new Date()
    }
    generatedImages.value.unshift(newImage)
  } catch (error) {
    console.error('Image generation failed:', error)
    if (!error?.__fromApi) showError(error.message || 'Image generation failed, please try again')
  } finally {
    isGenerating.value = false
  }
}

// 下载图像
const downloadImage = (image) => {
  const link = document.createElement('a')
  link.href = image.url
  link.download = `flux-kontext-${Date.now()}.${image.format}`
  link.click()
}

// 复制图像URL
const copyImageUrl = async (image) => {
  try {
    await navigator.clipboard.writeText(image.url)
    showSuccess('Image URL copied to clipboard')
  } catch (error) {
    console.error('Copy failed:', error)
  }
}

// 清空结果
const clearResults = () => {
  generatedImages.value = []
}
</script>

<style scoped>
.flux-kontext-tool {
  width: 100%;
  height: 100%;
  padding: 20px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.tool-header {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 20px;
}

.tool-avatar {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 16px;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tool-avatar img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  image-rendering: auto;
}

.tool-details h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.tool-details p {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
}

.tool-details p.tool-description {
  line-height: 1.55;
}

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
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}
.mode-tab:hover {
  border-color: #667eea;
  color: #667eea;
}
.mode-tab.active {
  background: #667eea;
  color: #fff;
  border-color: #667eea;
}


.action-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: #f3f4f6;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: #e5e7eb;
  color: #667eea;
}

.main-content {
  display: flex;
  flex: 1;
  min-height: 0;
  gap: 20px;
}

.config-panel {
  width: 42%;
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: visible;
}

.config-header {
  padding: 0 0 20px 0;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 20px;
}

.config-header h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.config-form {
  flex: 1;
  overflow: visible;
}

.config-fieldset {
  border: none;
  margin: 0;
  padding: 0;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.required {
  color: #ef4444;
}

.form-input {
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-hint {
  font-size: 12px;
  color: #6b7280;
  line-height: 1.4;
}

.uploading-hint {
  font-size: 12px;
  color: #667eea;
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.mode-switch {
  display: flex;
  gap: 8px;
  background: #f3f4f6;
  padding: 4px;
  border-radius: 8px;
}

.mode-btn {
  flex: 1;
  padding: 8px 16px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.mode-btn.active {
  background: white;
  color: #667eea;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
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
  accent-color: #667eea;
}

.form-slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #e5e7eb;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
}

.form-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #667eea;
  cursor: pointer;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #6b7280;
}

/* Tab Group Styles */
.tab-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: transparent;
  padding: 0;
  border-radius: 0;
}

.tab-row {
  display: flex;
  gap: 8px;
}

.tab-options {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tab-option {
  flex: 1 1 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px 8px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  color: #6b7280;
  transition: all 0.2s ease;
}

.tab-option span {
  display: block;
}

.tab-option .tab-label {
  font-size: 11px;
  opacity: 0.7;
}

.tab-option.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
  box-shadow: 0 1px 2px rgba(102, 126, 234, 0.3);
}

.tab-option.active .tab-label {
  opacity: 1;
}

.tab-option:hover:not(.active) {
  background: #f8fafc;
  border-color: #667eea;
}

.generate-btn-container {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

.generate-btn {
  width: 100%;
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.generate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.generate-btn:disabled {
  background: #d1d5db;
  cursor: not-allowed;
  transform: none;
}

.price-tag {
  font-size: 15px;
  font-weight: 500;
  opacity: 0.8;
  margin-left: 4px;
}

.result-panel {
  width: 58%;
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e2e8f0;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow-y: auto;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.result-header h4 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.clear-btn {
  padding: 8px 16px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.clear-btn:hover {
  background: #dc2626;
}

.tutorial-showcase {
  margin-bottom: 20px;
  padding: 14px 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  flex-shrink: 0;
}

.tutorial-showcase-title {
  margin: 0 0 10px 0;
  font-size: 14px;
  font-weight: 600;
  color: #334155;
}

.tutorial-showcase-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tutorial-showcase-links .tutorial-link {
  font-size: 13px;
  color: #3b82f6;
  text-decoration: none;
}

.tutorial-showcase-links .tutorial-link:hover {
  text-decoration: underline;
}

.detail-loading-state, .detail-failure-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; padding: 40px; text-align: center;
}
.detail-spinner { font-size: 48px; color: #667eea; }
.detail-loading-state p, .detail-failure-state p { margin: 0; font-size: 16px; color: #64748b; }
.detail-failure-state .failure-icon { font-size: 56px; color: #ef4444; }
.detail-failure-state .failure-message { max-width: 420px; line-height: 1.6; color: #374151; }

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
}

.empty-state i {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state p {
  font-size: 18px;
  font-weight: 500;
  margin: 0 0 8px 0;
}

.empty-state span {
  font-size: 14px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.image-item {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.image-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.image-container {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.image-container:hover .image-overlay {
  opacity: 1;
}

.image-overlay .action-btn {
  background: rgba(255, 255, 255, 0.9);
  color: #374151;
}

.image-overlay .action-btn:hover {
  background: white;
  color: #667eea;
}

.image-info {
  padding: 16px;
}

.image-meta {
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
}

.image-size,
.image-format {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  background: #f3f4f6;
  color: #6b7280;
}

.image-prompt {
  font-size: 14px;
  color: #374151;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
  .flux-kontext-tool {
    padding: 16px;
  }
  
  .tool-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .config-header {
    padding: 0 0 16px 0;
  }
  
  .main-content {
    flex-direction: column;
    padding: 20px;
  }
  
  .config-panel,
  .result-panel {
    padding: 20px;
  }
  
  .image-grid {
    grid-template-columns: 1fr;
  }
}
</style>
