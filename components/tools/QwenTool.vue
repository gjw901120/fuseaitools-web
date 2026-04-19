<template>
  <div class="qwen-tool">
    <div class="tool-header">
      <div class="tool-avatar">
        <img src="/tools-logo/QWen.png" alt="Qwen" />
      </div>
      <div class="tool-details">
        <h3>Qwen</h3>
        <p class="tool-description">The Qwen Image empowers creators, developers, and businesses to generate and edit photorealistic images effortlessly. Whether you're crafting intricate designs or refining existing visuals, this powerful Qwen integrates seamlessly into your workflow, delivering multilingual text rendering and advanced editing capabilities that rival top models.</p>
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
              <label for="qwen-prompt" class="form-label">
                Prompt <span class="required">*</span>
              </label>
              <textarea
                id="qwen-prompt"
                v-model="formData.prompt"
                class="form-input"
                rows="4"
                placeholder="The prompt to generate the image with"
                :maxlength="promptMaxLength"
                required
              ></textarea>
              <div class="char-count" v-if="formData.prompt">{{ formData.prompt.length }}/{{ promptMaxLength }}</div>
            </div>

            <!-- image-to-image & image-edit: imageUrl required -->
            <div v-if="mode === 'image-to-image' || mode === 'image-edit' || mode === 'qwen2-image-edit'" class="form-group">
              <label class="form-label">
                Image URL <span class="required">*</span>
              </label>
              <UploadImage
                ref="imageUploadRef"
                input-id="qwen-image-upload"
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
              <div v-if="isDetailView && formData.imageUrl" class="detail-ref-urls">
                <span class="form-label">Input image (this task)</span>
                <div class="detail-ref-urls-links">
                  <a :href="formData.imageUrl" target="_blank" rel="noopener noreferrer" class="detail-ref-link">Open image</a>
                </div>
              </div>
            </div>

            <!-- image-to-image: strength -->
            <div v-if="mode === 'image-to-image'" class="form-group">
              <label for="qwen-strength" class="form-label">Strength (denoising)</label>
              <input
                id="qwen-strength"
                v-model.number="formData.strength"
                type="number"
                class="form-input"
                min="0"
                max="1"
                step="0.01"
                placeholder="0.8"
              />
              <div class="form-hint">0 = preserve original, 1 = fully remake.</div>
            </div>

            <!-- text-to-image & image-edit: imageSize -->
            <div v-if="mode === 'text-to-image' || mode === 'image-edit' || mode === 'qwen2-text-to-image' || mode === 'qwen2-image-edit'" class="form-group">
              <label class="form-label">Image Size</label>
              <div class="tab-group">
                <button
                  v-for="opt in currentImageSizeOptions"
                  :key="opt"
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.imageSize === opt }"
                  @click="formData.imageSize = opt"
                >{{ imageSizeLabelMap[opt] || opt }}</button>
              </div>
            </div>

            <!-- z-image: aspectRatio required -->
            <div v-if="mode === 'z-image'" class="form-group">
              <label class="form-label">Aspect Ratio <span class="required">*</span></label>
              <div class="tab-group">
                <button type="button" class="tab-option" :class="{ active: formData.aspectRatio === '1:1' }" @click="formData.aspectRatio = '1:1'">1:1</button>
                <button type="button" class="tab-option" :class="{ active: formData.aspectRatio === '4:3' }" @click="formData.aspectRatio = '4:3'">4:3</button>
                <button type="button" class="tab-option" :class="{ active: formData.aspectRatio === '3:4' }" @click="formData.aspectRatio = '3:4'">3:4</button>
                <button type="button" class="tab-option" :class="{ active: formData.aspectRatio === '16:9' }" @click="formData.aspectRatio = '16:9'">16:9</button>
                <button type="button" class="tab-option" :class="{ active: formData.aspectRatio === '9:16' }" @click="formData.aspectRatio = '9:16'">9:16</button>
              </div>
            </div>

            <!-- numInferenceSteps: text-to-image, image-to-image, image-edit -->
            <div v-if="isClassicQwenMode" class="form-group">
              <label for="qwen-steps" class="form-label">Inference Steps</label>
              <input
                id="qwen-steps"
                v-model.number="formData.numInferenceSteps"
                type="number"
                class="form-input"
                :min="mode === 'image-edit' ? 2 : 2"
                :max="mode === 'image-edit' ? 49 : 250"
                step="1"
                placeholder="30"
              />
              <div class="form-hint">{{ mode === 'image-edit' ? '2–49' : '2–250' }}</div>
            </div>

            <!-- seed, guidanceScale: text-to-image, image-to-image, image-edit -->
            <div v-if="mode !== 'z-image'" class="form-group">
              <label for="qwen-seed" class="form-label">Seed</label>
              <input id="qwen-seed" v-model.number="formData.seed" type="number" class="form-input" placeholder="Optional" />
            </div>
            <div v-if="isClassicQwenMode" class="form-group">
              <label for="qwen-guidance" class="form-label">Guidance Scale</label>
              <input
                id="qwen-guidance"
                v-model.number="formData.guidanceScale"
                type="number"
                class="form-input"
                min="0"
                max="20"
                step="0.1"
                :placeholder="mode === 'image-edit' ? '4' : '2.5'"
              />
              <div class="form-hint">0–20. CFG: how closely to follow the prompt.</div>
            </div>

            <!-- image-edit: numImages, syncMode -->
            <div v-if="mode === 'image-edit'" class="form-group">
              <label class="form-label">Num Images</label>
              <div class="tab-group">
                <button type="button" class="tab-option" :class="{ active: formData.numImages === '1' }" @click="formData.numImages = '1'">1</button>
                <button type="button" class="tab-option" :class="{ active: formData.numImages === '2' }" @click="formData.numImages = '2'">2</button>
                <button type="button" class="tab-option" :class="{ active: formData.numImages === '3' }" @click="formData.numImages = '3'">3</button>
                <button type="button" class="tab-option" :class="{ active: formData.numImages === '4' }" @click="formData.numImages = '4'">4</button>
              </div>
            </div>
            <div v-if="mode === 'image-edit'" class="form-group">
              <label class="checkbox-label">
                <input v-model="formData.syncMode" type="checkbox" />
                <span>Sync mode (wait for upload before response)</span>
              </label>
            </div>

            <!-- outputFormat, acceleration (all except z-image), negativePrompt, enableSafetyChecker -->
            <div v-if="mode !== 'z-image'" class="form-group">
              <label class="form-label">Output Format</label>
              <div class="tab-group">
                <button type="button" class="tab-option" :class="{ active: formData.outputFormat === 'png' }" @click="formData.outputFormat = 'png'">PNG</button>
                <button type="button" class="tab-option" :class="{ active: formData.outputFormat === 'jpeg' }" @click="formData.outputFormat = 'jpeg'">JPEG</button>
              </div>
            </div>
            <div v-if="isClassicQwenMode" class="form-group">
              <label class="form-label">Acceleration</label>
              <div class="tab-group">
                <button type="button" class="tab-option" :class="{ active: formData.acceleration === 'none' }" @click="formData.acceleration = 'none'">None</button>
                <button type="button" class="tab-option" :class="{ active: formData.acceleration === 'regular' }" @click="formData.acceleration = 'regular'">Regular</button>
                <button type="button" class="tab-option" :class="{ active: formData.acceleration === 'high' }" @click="formData.acceleration = 'high'">High</button>
              </div>
              <div class="form-hint">Higher = faster. High recommended for images without text.</div>
            </div>
            <div v-if="isClassicQwenMode" class="form-group">
              <label for="qwen-negative" class="form-label">Negative Prompt</label>
              <input
                id="qwen-negative"
                v-model="formData.negativePrompt"
                type="text"
                class="form-input"
                placeholder="e.g. blurry, ugly"
                maxlength="500"
              />
              <div class="char-count" v-if="formData.negativePrompt">{{ formData.negativePrompt.length }}/500</div>
            </div>
            <div v-if="isClassicQwenMode" class="form-group">
              <label class="checkbox-label">
                <input v-model="formData.enableSafetyChecker" type="checkbox" />
                <span>Enable safety checker</span>
              </label>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn-primary" :disabled="!canGenerate || isGenerating || isDetailView">
                <i v-if="isGenerating" class="fas fa-spinner fa-spin"></i>
                <i v-else class="fas fa-magic"></i>
                {{ isGenerating ? 'Generating...' : 'Generate Image' }}
                <span v-if="qwenPriceText" class="price-tag">{{ qwenPriceText }}</span>
              </button>
            </div>
          </fieldset>
        </form>
      </div>

      <div class="result-panel">
        <div v-if="!isDetailView && route.path === '/home/qwen/text-to-image'" class="tutorial-showcase">
          <p class="tutorial-showcase-title">🎨 Tutorial Showcase</p>
          <div class="tutorial-showcase-links">
            <a href="https://www.fuseaitools.com/news/qwen-cinematic-short-video-cover-tutorial" target="_blank" rel="noopener noreferrer" class="tutorial-link">Generate cinematic AI covers for short videos (vertical, high CTR)</a>
            <a href="https://www.fuseaitools.com/news/qwen-brand-story-image-tutorial" target="_blank" rel="noopener noreferrer" class="tutorial-link">Tell your brand story with warm and emotional promotional visuals</a>
          </div>
        </div>
        <div v-if="isDetailView && Number(detailData?.status) === 3" class="detail-failure-state">
          <div class="failure-icon"><i class="fas fa-exclamation-circle"></i></div>
          <p class="failure-message">Generation failed. You can try again with different parameters.</p>
        </div>
        <div v-else-if="isDetailView && (!detailData || [0, 1].includes(Number(detailData.status)))" class="detail-loading-state">
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
const { fetchPrices, getPrice, formatCredits, discount } = useModelPrice()
onMounted(() => { fetchPrices() })
const batchUploadUrl = useBatchUploadUrl()

const modeList = [
  { id: 'text-to-image', label: 'Text to Image', icon: 'fas fa-font' },
  { id: 'image-to-image', label: 'Image to Image', icon: 'fas fa-image' },
  { id: 'image-edit', label: 'Image Edit', icon: 'fas fa-edit' },
  { id: 'z-image', label: 'Z-Image', icon: 'fas fa-square' },
  { id: 'qwen2-text-to-image', label: '2 Text to Image', icon: 'fas fa-wand-magic-sparkles' },
  { id: 'qwen2-image-edit', label: '2 Image Edit', icon: 'fas fa-scissors' }
]

const modeTabToPath = {
  'text-to-image': '/home/qwen/text-to-image',
  'image-to-image': '/home/qwen/image-to-image',
  'image-edit': '/home/qwen/image-edit',
  'z-image': '/home/qwen/z-image',
  'qwen2-text-to-image': '/home/qwen/2-text-to-image',
  'qwen2-image-edit': '/home/qwen/2-image-edit'
}
const pathToMode = {}
Object.keys(modeTabToPath).forEach(k => { pathToMode[modeTabToPath[k]] = k })

const mode = ref('text-to-image')
function goToTab(m) {
  mode.value = m
  router.push(modeTabToPath[m] || modeTabToPath['text-to-image'])
}

watch(() => route.path, (path) => {
  const m = pathToMode[path]
  if (m && mode.value !== m) mode.value = m
}, { immediate: true })

const formData = reactive({
  prompt: '',
  imageUrl: '',
  imageSize: 'square_hd',
  aspectRatio: '1:1',
  strength: 0.8,
  numInferenceSteps: 30,
  seed: null,
  guidanceScale: 2.5,
  outputFormat: 'png',
  negativePrompt: '',
  acceleration: 'none',
  enableSafetyChecker: true,
  numImages: '1',
  syncMode: false
})

// 折扣文本
const discountText = computed(() => {
  const rate = Number(discount?.value ?? 1)
  if (Number.isNaN(rate) || rate <= 0 || rate === 1) return ''
  const percent = (rate * 100).toFixed(0)
  return ` · ${percent}%`
})

// 价格：按 mode 取 modelKey，可选按 imageSize / aspectRatio / numImages 等匹配 RULE
const qwenPriceModelKeyMap = {
  'text-to-image': 'qwen-text-to-image',
  'image-to-image': 'qwen-image-to-image',
  'image-edit': 'qwen-image-edit',
  'z-image': 'qwen-z-image',
  'qwen2-text-to-image': 'qwen2-text-to-image',
  'qwen2-image-edit': 'qwen2-image-edit'
}
const qwenPriceText = computed(() => {
  const modelKey = qwenPriceModelKeyMap[mode.value]
  if (!modelKey) return ''
  const formFields = {}
  if (mode.value === 'text-to-image' || mode.value === 'image-edit') formFields.imageSize = formData.imageSize
  if (mode.value === 'image-edit') formFields.numImages = formData.numImages
  if (mode.value === 'z-image') formFields.aspectRatio = formData.aspectRatio
  const credits = getPrice(modelKey, formFields)
  const str = formatCredits(credits)
  if (!str) return ''
  return `· ${str} credits${discountText.value}`
})

const imageUploadRef = ref(null)
const isUploadingImage = ref(false)
const result = ref(null)
const isGenerating = ref(false)
const routeRecordId = computed(() => route.query['record-id'] || '')
const isDetailView = computed(() => !!routeRecordId.value)
const detailData = ref(null)

const promptMaxLength = computed(() => {
  if (mode.value === 'qwen2-text-to-image' || mode.value === 'qwen2-image-edit') return 800
  if (mode.value === 'image-edit') return 2000
  if (mode.value === 'z-image') return 1000
  return 5000
})

const isClassicQwenMode = computed(() => ['text-to-image', 'image-to-image', 'image-edit'].includes(mode.value))

const imageSizeOptionsByMode = {
  'text-to-image': ['square', 'square_hd', 'portrait_4_3', 'portrait_16_9', 'landscape_4_3', 'landscape_16_9'],
  'image-edit': ['square', 'square_hd', 'portrait_4_3', 'portrait_16_9', 'landscape_4_3', 'landscape_16_9'],
  'qwen2-text-to-image': ['1:1', '3:4', '4:3', '9:16', '16:9'],
  'qwen2-image-edit': ['1:1', '2:3', '3:2', '3:4', '4:3', '9:16', '16:9', '21:9']
}

const imageSizeLabelMap = {
  square: 'Square',
  square_hd: 'Square HD',
  portrait_4_3: '3:4',
  portrait_16_9: '9:16',
  landscape_4_3: '4:3',
  landscape_16_9: '16:9',
  '1:1': '1:1',
  '2:3': '2:3',
  '3:2': '3:2',
  '3:4': '3:4',
  '4:3': '4:3',
  '9:16': '9:16',
  '16:9': '16:9',
  '21:9': '21:9'
}

const currentImageSizeOptions = computed(() => imageSizeOptionsByMode[mode.value] || [])

const getAuthToken = () => {
  if (!import.meta.client) return null
  try {
    return localStorage.getItem('auth_token')
  } catch {
    return null
  }
}

async function uploadFileToUrl(file) {
  if (!file) return ''
  const form = new FormData()
  form.append('file', file)
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

const canGenerate = computed(() => {
  const p = (formData.prompt || '').trim()
  if (!p || p.length > promptMaxLength.value) return false
  if (mode.value === 'image-to-image' || mode.value === 'image-edit' || mode.value === 'qwen2-image-edit') return !!formData.imageUrl
  return true
})

function fillFormFromOriginalData(o) {
  if (!o || typeof o !== 'object') return
  if (o.prompt != null) formData.prompt = String(o.prompt)
  if (o.imageUrl) formData.imageUrl = String(o.imageUrl)
  if (o.imageSize) formData.imageSize = String(o.imageSize)
  if (o.aspectRatio) formData.aspectRatio = String(o.aspectRatio)
  if (o.strength != null && o.strength !== '') {
    const n = Number(o.strength)
    if (!Number.isNaN(n)) formData.strength = n
  }
  if (o.numInferenceSteps != null && o.numInferenceSteps !== '') {
    const n = Number(o.numInferenceSteps)
    if (!Number.isNaN(n)) formData.numInferenceSteps = n
  }
  if (o.seed != null && o.seed !== '') {
    const n = Number(o.seed)
    formData.seed = Number.isNaN(n) ? null : n
  } else if ('seed' in o && (o.seed === null || o.seed === '')) {
    formData.seed = null
  }
  if (o.guidanceScale != null && o.guidanceScale !== '') {
    const n = Number(o.guidanceScale)
    if (!Number.isNaN(n)) formData.guidanceScale = n
  }
  if (o.outputFormat) formData.outputFormat = String(o.outputFormat)
  if (o.negativePrompt != null) formData.negativePrompt = String(o.negativePrompt)
  if (o.acceleration) formData.acceleration = String(o.acceleration)
  if ('enableSafetyChecker' in o) formData.enableSafetyChecker = !!o.enableSafetyChecker
  if (o.numImages != null) formData.numImages = String(o.numImages)
  if ('syncMode' in o) formData.syncMode = !!o.syncMode
}

function pickDetailImageUrl(d) {
  if (!d || typeof d !== 'object') return ''
  let url = d.outputUrl || d.imageUrl
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
  } catch (e) { console.error('Qwen load record detail failed:', e) }
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

    if (modeVal === 'text-to-image') {
      apiPath = '/api/image/qwen/text-to-image'
      body = {
        model: 'qwen-text-to-image',
        prompt: p,
        imageSize: formData.imageSize,
        numInferenceSteps: toNum(formData.numInferenceSteps),
        seed: toNum(formData.seed),
        guidanceScale: toNum(formData.guidanceScale),
        enableSafetyChecker: !!formData.enableSafetyChecker,
        outputFormat: formData.outputFormat,
        negativePrompt: (formData.negativePrompt || '').trim() || undefined,
        acceleration: formData.acceleration
      }
    } else if (modeVal === 'image-to-image') {
      apiPath = '/api/image/qwen/image-to-image'
      body = {
        model: 'qwen-image-to-image',
        prompt: p,
        imageUrl: formData.imageUrl,
        strength: toNum(formData.strength) ?? 0.8,
        outputFormat: formData.outputFormat,
        acceleration: formData.acceleration,
        negativePrompt: (formData.negativePrompt || '').trim() || undefined,
        seed: toNum(formData.seed),
        numInferenceSteps: toNum(formData.numInferenceSteps),
        guidanceScale: toNum(formData.guidanceScale),
        enableSafetyChecker: !!formData.enableSafetyChecker
      }
    } else if (modeVal === 'image-edit') {
      apiPath = '/api/image/qwen/image-edit'
      body = {
        model: 'qwen-image-edit',
        prompt: p,
        imageUrl: formData.imageUrl,
        acceleration: formData.acceleration,
        imageSize: formData.imageSize,
        numInferenceSteps: toNum(formData.numInferenceSteps),
        seed: toNum(formData.seed),
        guidanceScale: toNum(formData.guidanceScale),
        syncMode: !!formData.syncMode,
        numImages: String(formData.numImages),
        enableSafetyChecker: !!formData.enableSafetyChecker,
        outputFormat: formData.outputFormat,
        negativePrompt: (formData.negativePrompt || '').trim() || undefined
      }
    } else if (modeVal === 'qwen2-text-to-image') {
      apiPath = '/api/image/qwen/v2-text-to-image'
      body = {
        model: 'qwen2-text-to-image',
        prompt: p,
        imageSize: formData.imageSize || '16:9',
        seed: toNum(formData.seed),
        outputFormat: formData.outputFormat || 'png'
      }
    } else if (modeVal === 'qwen2-image-edit') {
      apiPath = '/api/image/qwen/v2-image-edit'
      body = {
        model: 'qwen2-image-edit',
        prompt: p,
        imageUrl: formData.imageUrl,
        imageSize: formData.imageSize || '16:9',
        seed: toNum(formData.seed),
        outputFormat: formData.outputFormat || 'png'
      }
    } else {
      apiPath = '/api/image/qwen/z-image'
      body = {
        model: 'qwen-z-image',
        prompt: p,
        aspectRatio: formData.aspectRatio
      }
    }

    const data = await post(apiPath, body)
    const rid = data?.recordId ?? data?.data?.recordId
    if (rid) {
      router.push((modeTabToPath[modeVal] || '/home/qwen/text-to-image') + '?record-id=' + encodeURIComponent(rid))
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

function toNum(v) {
  if (v == null || v === '') return undefined
  const n = Number(v)
  return Number.isNaN(n) ? undefined : n
}

function downloadImage() {
  if (displayResult.value?.imageUrl) {
    const a = document.createElement('a')
    a.href = displayResult.value.imageUrl
    a.download = `qwen-${Date.now()}.png`
    a.click()
  }
}

watch(mode, (m) => {
  if (m === 'qwen2-text-to-image' || m === 'qwen2-image-edit') {
    formData.imageSize = '16:9'
    formData.outputFormat = 'png'
  }
  const path = modeTabToPath[m]
  if (path && route.path !== path) router.replace(path)
})
</script>

<style scoped>
.qwen-tool {
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
  padding-bottom: 20px;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 20px;
}
.tool-avatar { width: 48px; height: 48px; border-radius: 12px; overflow: hidden; flex-shrink: 0; }
.tool-avatar img { width: 100%; height: 100%; object-fit: cover; }
.tool-details h3 { margin: 0 0 4px 0; font-size: 20px; font-weight: 600; color: #1f2937; }
.tool-details p { margin: 0; font-size: 13px; color: #6b7280; line-height: 1.5; }
.tool-details p.tool-description { line-height: 1.55; }

/* 分类 tab：与 Ideogram/Nano Banana/Seedream 一致 */
.mode-tabs-wrap {
  padding-bottom: 20px;
  border-bottom: 1px solid #e2e8f0;
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
  margin-bottom: 0;
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

.checkbox-label { display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px; color: #374151; }
.checkbox-label input[type="checkbox"] { width: 16px; height: 16px; accent-color: #3b82f6; }

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
.tutorial-showcase {
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #f8fafc;
  padding: 12px 14px;
  margin-bottom: 16px;
}
.tutorial-showcase-title {
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
}
.tutorial-showcase-links {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.tutorial-showcase-links .tutorial-link {
  color: #2563eb;
  text-decoration: none;
  font-size: 13px;
}
.tutorial-showcase-links .tutorial-link:hover {
  text-decoration: underline;
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

@media (max-width: 768px) {
  .mode-tabs { gap: 6px; }
  .mode-tab { padding: 8px 12px; font-size: 13px; }
}

@media (max-width: 1024px) {
  .main-content { flex-direction: column; }
  .config-panel, .result-panel { width: 100%; }
}
</style>
