<template>
  <div class="ideogram-tool">
    <div class="tool-header">
      <div class="tool-avatar">
        <img src="/tools-logo/Ideogram.png" alt="Ideogram" />
      </div>
      <div class="tool-details">
        <h3>Ideogram</h3>
        <p class="tool-description">Ideogram  is  image generation model, offering text-to-image, image editing, reframing, and remixing with improved consistency and creative control.</p>
      </div>
    </div>

    <div class="mode-tabs">
      <div v-for="m in modeList" :key="m.id" class="mode-tab" :class="{ active: mode === m.id }" @click="goToTab(m.id)">
        <i :class="m.icon"></i>
        <span>{{ m.id }}</span>
      </div>
    </div>

    <div class="main-content">
      <div class="config-panel">
        <div class="config-header">
          <h4>{{ mode }}</h4>
        </div>
        <form class="config-form" @submit.prevent="onSubmit">
          <fieldset class="config-fieldset" :disabled="isGenerating || isDetailView">

            <!-- Prompt (all except v3-reframe) -->
            <div v-if="mode !== 'v3-reframe'" class="form-group">
              <label>Prompt {{ needsPrompt(mode) ? '*' : '' }}</label>
              <textarea v-model="form.prompt" rows="4" maxlength="5000" placeholder="Describe the image or edit..." />
              <div class="char-count">{{ form.prompt.length }}/5000</div>
            </div>

            <!-- image_url: v3-edit, v3-remix, v3-reframe, character-edit, character-remix -->
            <div v-if="needsImageUrl(mode)" class="form-group">
              <label>Image URL *</label>
              <span v-if="isUploadingImage" class="form-hint"><i class="fas fa-spinner fa-spin"></i> Uploading...</span>
              <UploadImage
                ref="imageUploadRef"
                input-id="ideogram-image"
                label=""
                upload-icon="fas fa-cloud-upload-alt"
                upload-text="Click to upload image"
                upload-hint="JPG, PNG, WEBP. Max 10MB."
                theme-color="#3b82f6"
                :max-files="1"
                :max-file-size="10 * 1024 * 1024"
                accept="image/jpeg,image/png,image/webp"
                :multiple="false"
                @update:files="handleImageUpdate"
              />
              <div v-if="isDetailView && form.image_url" class="detail-ref-row">
                <a :href="form.image_url" target="_blank" rel="noopener noreferrer">Source image (this task)</a>
              </div>
            </div>

            <!-- mask_url: v3-edit, character-edit -->
            <div v-if="mode === 'v3-edit' || mode === 'character-edit'" class="form-group">
              <label>Mask URL *</label>
              <span v-if="isUploadingMask" class="form-hint"><i class="fas fa-spinner fa-spin"></i> Uploading...</span>
              <UploadImage
                ref="maskUploadRef"
                input-id="ideogram-mask"
                label=""
                upload-icon="fas fa-mask"
                upload-text="Click to upload mask"
                upload-hint="Same dimensions as image. JPG, PNG, WEBP. Max 10MB."
                theme-color="#6b7280"
                :max-files="1"
                :max-file-size="10 * 1024 * 1024"
                accept="image/jpeg,image/png,image/webp"
                :multiple="false"
                @update:files="handleMaskUpdate"
              />
              <div v-if="isDetailView && form.mask_url" class="detail-ref-row">
                <a :href="form.mask_url" target="_blank" rel="noopener noreferrer">Mask (this task)</a>
              </div>
            </div>

            <!-- reference_image_urls: character, character-edit, character-remix -->
            <div v-if="needsReferenceImages(mode)" class="form-group">
              <label>Reference image(s) *</label>
              <span v-if="isUploadingRefs" class="form-hint"><i class="fas fa-spinner fa-spin"></i> Uploading...</span>
              <UploadImage
                ref="refsUploadRef"
                input-id="ideogram-refs"
                label=""
                upload-icon="fas fa-user"
                upload-text="Click to upload character reference"
                upload-hint="1 image. JPG, PNG, WEBP. Max 10MB."
                theme-color="#3b82f6"
                :max-files="1"
                :max-file-size="10 * 1024 * 1024"
                accept="image/jpeg,image/png,image/webp"
                :multiple="false"
                @update:files="handleRefsUpdate"
              />
              <div v-if="isDetailView && form.reference_image_urls?.length" class="detail-ref-row">
                <a
                  v-for="(u, idx) in form.reference_image_urls"
                  :key="idx"
                  :href="u"
                  target="_blank"
                  rel="noopener noreferrer"
                >Reference {{ idx + 1 }}</a>
              </div>
            </div>

            <!-- rendering_speed -->
            <div class="form-group">
              <label>Rendering speed</label>
              <div class="tab-group">
                <button type="button" class="tab-option" :class="{ active: form.rendering_speed === 'TURBO' }" @click="form.rendering_speed = 'TURBO'">Turbo</button>
                <button type="button" class="tab-option" :class="{ active: form.rendering_speed === 'BALANCED' }" @click="form.rendering_speed = 'BALANCED'">Balanced</button>
                <button type="button" class="tab-option" :class="{ active: form.rendering_speed === 'QUALITY' }" @click="form.rendering_speed = 'QUALITY'">Quality</button>
              </div>
            </div>

            <!-- style (not character-edit) -->
            <div v-if="mode !== 'character-edit'" class="form-group">
              <label>Style</label>
              <div class="tab-group tab-wrap">
                <template v-if="isCharacterMode(mode)">
                  <button type="button" class="tab-option" :class="{ active: form.style === 'AUTO' }" @click="form.style = 'AUTO'">AUTO</button>
                  <button type="button" class="tab-option" :class="{ active: form.style === 'REALISTIC' }" @click="form.style = 'REALISTIC'">REALISTIC</button>
                  <button type="button" class="tab-option" :class="{ active: form.style === 'FICTION' }" @click="form.style = 'FICTION'">FICTION</button>
                </template>
                <template v-else>
                  <button type="button" class="tab-option" :class="{ active: form.style === 'AUTO' }" @click="form.style = 'AUTO'">Auto</button>
                  <button type="button" class="tab-option" :class="{ active: form.style === 'GENERAL' }" @click="form.style = 'GENERAL'">General</button>
                  <button type="button" class="tab-option" :class="{ active: form.style === 'REALISTIC' }" @click="form.style = 'REALISTIC'">Realistic</button>
                  <button type="button" class="tab-option" :class="{ active: form.style === 'DESIGN' }" @click="form.style = 'DESIGN'">Design</button>
                </template>
              </div>
            </div>

            <!-- image_size: most modes -->
            <div v-if="needsImageSize(mode)" class="form-group">
              <label>Image size {{ mode === 'v3-reframe' ? '*' : '' }}</label>
              <div class="tab-group tab-wrap">
                <button type="button" class="tab-option" :class="{ active: form.image_size === 'square' }" @click="form.image_size = 'square'">Square</button>
                <button type="button" class="tab-option" :class="{ active: form.image_size === 'square_hd' }" @click="form.image_size = 'square_hd'">Square HD</button>
                <button type="button" class="tab-option" :class="{ active: form.image_size === 'portrait_4_3' }" @click="form.image_size = 'portrait_4_3'">Portrait 3:4</button>
                <button type="button" class="tab-option" :class="{ active: form.image_size === 'portrait_16_9' }" @click="form.image_size = 'portrait_16_9'">Portrait 9:16</button>
                <button type="button" class="tab-option" :class="{ active: form.image_size === 'landscape_4_3' }" @click="form.image_size = 'landscape_4_3'">Landscape 4:3</button>
                <button type="button" class="tab-option" :class="{ active: form.image_size === 'landscape_16_9' }" @click="form.image_size = 'landscape_16_9'">Landscape 16:9</button>
              </div>
            </div>

            <!-- expand_prompt -->
            <div v-if="needsPrompt(mode)" class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="form.expand_prompt" />
                <span>Expand prompt (MagicPrompt)</span>
              </label>
            </div>

            <!-- num_images: remix, reframe, character* -->
            <div v-if="needsNumImages(mode)" class="form-group">
              <label>Number of images</label>
              <div class="tab-group">
                <button type="button" class="tab-option" :class="{ active: form.num_images === '1' }" @click="form.num_images = '1'">1</button>
                <button type="button" class="tab-option" :class="{ active: form.num_images === '2' }" @click="form.num_images = '2'">2</button>
                <button type="button" class="tab-option" :class="{ active: form.num_images === '3' }" @click="form.num_images = '3'">3</button>
                <button type="button" class="tab-option" :class="{ active: form.num_images === '4' }" @click="form.num_images = '4'">4</button>
              </div>
            </div>

            <!-- strength: v3-remix, character-remix -->
            <div v-if="mode === 'v3-remix' || mode === 'character-remix'" class="form-group">
              <label>Strength</label>
              <input type="range" v-model.number="form.strength" min="0.01" max="1" step="0.01" /> {{ form.strength }}
            </div>

            <!-- negative_prompt: v3-text-to-image, v3-remix, character, character-remix -->
            <div v-if="needsNegativePrompt(mode)" class="form-group">
              <label>Negative prompt</label>
              <textarea v-model="form.negative_prompt" rows="2" maxlength="5000" placeholder="What to exclude from the image" />
            </div>

            <!-- seed -->
            <div class="form-group">
              <label>Seed (optional)</label>
              <input type="number" v-model.number="form.seed" placeholder="Leave empty for random" />
            </div>

            <div class="form-actions">
              <button type="submit" class="btn-primary" :disabled="!canSubmit || isGenerating || isDetailView">
                <i v-if="isGenerating" class="fas fa-spinner fa-spin"></i>
                <i v-else class="fas fa-magic"></i>
                <span v-if="isGenerating">Generating...</span>
                <span v-else>
                  Generate
                  <span v-if="ideogramCreditsText" class="price-tag">{{ ideogramCreditsText }}</span>
                </span>
              </button>
            </div>
          </fieldset>
        </form>
      </div>

      <div class="result-panel">
        <div class="result-header">
          <h4>Result</h4>
          <button v-if="results.length > 0" type="button" class="btn-secondary" @click="clearResults"><i class="fas fa-trash"></i> Clear</button>
        </div>
        <div class="result-container">
          <div v-if="!isDetailView && route.path === '/home/ideogram/v3-text-to-image'" class="tutorial-showcase">
            <p class="tutorial-showcase-title">🎨 Tutorial Showcase</p>
            <div class="tutorial-showcase-links">
              <a href="https://www.fuseaitools.com/news/ideogram-cinematic-dusk-lakeside-brand-visual-tutorial" target="_blank" rel="noopener noreferrer" class="tutorial-link">Use AI to create a cinematic dusk lakeside scene for calm, magical brand visuals</a>
              <a href="https://www.fuseaitools.com/news/ideogram-french-relaxed-illustration-brand-visual-tutorial" target="_blank" rel="noopener noreferrer" class="tutorial-link">Use AI to create French relaxed illustrations and add warm storytelling to your brand</a>
            </div>
          </div>
          <template v-if="isDetailView && (loadingRecordId || (!detailData && routeRecordId))">
            <div class="empty-state">
              <i class="fas fa-spinner fa-spin empty-icon"></i>
              <p>Loading record...</p>
            </div>
          </template>
          <template v-else-if="isDetailView && detailData && Number(detailData.status) === 1">
            <div class="empty-state">
              <i class="fas fa-spinner fa-spin empty-icon"></i>
              <p>Generating...</p>
            </div>
          </template>
          <template v-else-if="isDetailView && detailData && Number(detailData.status) === 3">
            <div class="empty-state">
              <i class="fas fa-exclamation-circle empty-icon"></i>
              <p>Generation failed.</p>
            </div>
          </template>
          <template v-else-if="isDetailView && detailData && Number(detailData.status) === 2">
            <div v-if="detailOutputItems.length > 0" class="result-item" v-for="(item, idx) in detailOutputItems" :key="`detail-${idx}`">
              <img :src="item.url" :alt="'Output ' + (idx + 1)" class="result-image" loading="lazy" />
            </div>
            <div v-else class="result-item">
              <pre class="payload-json">{{ JSON.stringify(detailData, null, 2) }}</pre>
            </div>
          </template>
          <template v-else-if="results.length > 0">
            <div v-for="(item, idx) in results" :key="idx" class="result-item">
              <img v-if="item.url" :src="item.url" :alt="'Output ' + (idx + 1)" class="result-image" loading="lazy" />
              <pre v-else class="payload-json">{{ typeof item === 'object' ? JSON.stringify(item, null, 2) : item }}</pre>
            </div>
          </template>
          <div v-else class="empty-state">
            <i class="fas fa-image empty-icon"></i>
            <p>Configure and click Generate.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import UploadImage from './common/UploadImage.vue'
import { useToast } from '~/composables/useToast'
import { useApi } from '~/composables/useApi'
import { useAuth } from '~/composables/useAuth'
import { useModelPrice } from '~/composables/useModelPrice'
import { useRouter, useRoute } from 'vue-router'
import { useRecordPolling } from '~/composables/useRecordPolling'

const { showError } = useToast()
const { post } = useApi()
const { token } = useAuth()
const { fetchPrices, getPrice, formatCredits, discount } = useModelPrice()
const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling()
const batchUploadUrl = useBatchUploadUrl()
const { getUrlsForFiles } = useFileUploadUrlCache()
const router = useRouter()
const route = useRoute()

const modeList = [
  { id: 'v3-text-to-image', icon: 'fas fa-keyboard' },
  { id: 'v3-edit', icon: 'fas fa-paint-brush' },
  { id: 'v3-remix', icon: 'fas fa-sync-alt' },
  { id: 'v3-reframe', icon: 'fas fa-crop-alt' },
  { id: 'character', icon: 'fas fa-user' },
  { id: 'character-edit', icon: 'fas fa-user-edit' },
  { id: 'character-remix', icon: 'fas fa-users' }
]

const modeTabToPath = {
  'v3-text-to-image': '/home/ideogram/v3-text-to-image',
  'v3-edit': '/home/ideogram/v3-edit',
  'v3-remix': '/home/ideogram/v3-remix',
  'v3-reframe': '/home/ideogram/v3-reframe',
  'character': '/home/ideogram/character',
  'character-edit': '/home/ideogram/character-edit',
  'character-remix': '/home/ideogram/character-remix'
}
const pathToMode = {}
Object.keys(modeTabToPath).forEach(k => { pathToMode[modeTabToPath[k]] = k })

const mode = ref('v3-text-to-image')
function goToTab (m) {
  mode.value = m
  router.push(modeTabToPath[m] || modeTabToPath['v3-text-to-image'])
}

watch(() => route.path, (path) => {
  const m = pathToMode[path]
  if (m && mode.value !== m) mode.value = m
}, { immediate: true })

const routeRecordId = computed(() => route.query['record-id'] || '')
const isDetailView = computed(() => !!routeRecordId.value)
const detailData = ref(null)
const loadingRecordId = ref(null)

const detailOutputItems = computed(() => {
  if (!detailData.value || Number(detailData.value.status) !== 2) return []
  const urls = Array.isArray(detailData.value.outputUrls) ? detailData.value.outputUrls : []
  return urls
    .map((u) => (typeof u === 'string' ? u : (u?.url ?? u?.imageUrl ?? '')))
    .filter(Boolean)
    .map((url) => ({ url }))
})

function getRouteRecordId () {
  return route.query['record-id'] || ''
}

function fillFormFromOriginalData (originalData) {
  if (!originalData || typeof originalData !== 'object') return
  const o = originalData
  if (o.prompt != null) form.prompt = String(o.prompt)
  if (o.rendering_speed) form.rendering_speed = String(o.rendering_speed)
  else if (o.renderingSpeed) form.rendering_speed = String(o.renderingSpeed)
  if (o.style) form.style = String(o.style)
  if ('expand_prompt' in o) form.expand_prompt = !!o.expand_prompt
  else if ('expandPrompt' in o) form.expand_prompt = !!o.expandPrompt
  if (o.image_size) form.image_size = String(o.image_size)
  else if (o.imageSize) form.image_size = String(o.imageSize)
  if (o.seed !== undefined && o.seed !== null) form.seed = o.seed
  if (o.negative_prompt != null) form.negative_prompt = String(o.negative_prompt)
  else if (o.negativePrompt != null) form.negative_prompt = String(o.negativePrompt)
  if (o.image_url) form.image_url = String(o.image_url)
  else if (o.imageUrl) form.image_url = String(o.imageUrl)
  if (o.mask_url) form.mask_url = String(o.mask_url)
  else if (o.maskUrl) form.mask_url = String(o.maskUrl)
  if (Array.isArray(o.reference_image_urls)) form.reference_image_urls = [...o.reference_image_urls]
  else if (Array.isArray(o.referenceImageUrls)) form.reference_image_urls = [...o.referenceImageUrls]
  if (o.num_images != null) form.num_images = String(o.num_images)
  else if (o.numImages != null) form.num_images = String(o.numImages)
  if (o.strength != null && o.strength !== '') {
    const n = Number(o.strength)
    if (!Number.isNaN(n)) form.strength = n
  }
}

async function loadDetailByRecordId (recordId) {
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
    const st = Number(data?.status)
    if (data != null && (st === 0 || st === 1)) {
      pollRecordByStatus(recordId, {
        getIsCancelled: () => getRouteRecordId() !== recordId
      }).then((res) => {
        if (getRouteRecordId() !== recordId) return
        detailData.value = res
        if (res?.originalData) fillFormFromOriginalData(res.originalData)
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
  else {
    loadingRecordId.value = null
    detailData.value = null
  }
}, { immediate: true })
const form = reactive({
  prompt: '',
  rendering_speed: 'BALANCED',
  style: 'AUTO',
  expand_prompt: true,
  image_size: 'square_hd',
  seed: undefined,
  negative_prompt: '',
  image_url: '',
  mask_url: '',
  reference_image_urls: [],
  num_images: '1',
  strength: 0.8
})

onMounted(() => { fetchPrices() })

const imageUploadRef = ref(null)
const maskUploadRef = ref(null)
const refsUploadRef = ref(null)
const isUploadingImage = ref(false)
const isUploadingMask = ref(false)
const isUploadingRefs = ref(false)
const isGenerating = ref(false)
const results = ref([])

// 折扣文本
const discountText = computed(() => {
  const rate = Number(discount?.value ?? 1)
  if (Number.isNaN(rate) || rate <= 0 || rate === 1) return ''
  const percent = (rate * 100).toFixed(0)
  return ` · ${percent}%`
})

// 价格：Ideogram 7 模式统一通过 Rendering speed -> price.rules[].speed 匹配 credits
const IDEOGRAM_PRICE_KEY_BY_MODE = {
  'v3-text-to-image': 'ideogram-v3-text-to-image',
  'v3-edit': 'ideogram-v3-edit',
  'v3-remix': 'ideogram-v3-remix',
  'v3-reframe': 'ideogram-v3-reframe',
  'character': 'ideogram-character',
  'character-edit': 'ideogram-character-edit',
  'character-remix': 'ideogram-character-remix'
}

const ideogramCreditsText = computed(() => {
  const key = IDEOGRAM_PRICE_KEY_BY_MODE[mode.value]
  if (!key) return ''
  const credits = getPrice(key, {
    speed: form.rendering_speed,
    scene: 'generate'
  })
  const str = formatCredits(credits)
  return str ? `· ${str} credits${discountText.value}` : ''
})

function needsPrompt (m) {
  return ['v3-text-to-image', 'v3-edit', 'v3-remix', 'character', 'character-edit', 'character-remix'].includes(m)
}
function needsImageUrl (m) {
  return ['v3-edit', 'v3-remix', 'v3-reframe', 'character-edit', 'character-remix'].includes(m)
}
function needsImageSize (m) {
  return ['v3-text-to-image', 'v3-remix', 'v3-reframe', 'character', 'character-remix'].includes(m)
}
function needsNumImages (m) {
  return ['v3-remix', 'v3-reframe', 'character', 'character-edit', 'character-remix'].includes(m)
}
function needsReferenceImages (m) {
  return ['character', 'character-edit', 'character-remix'].includes(m)
}
function needsNegativePrompt (m) {
  return ['v3-text-to-image', 'v3-remix', 'character', 'character-remix'].includes(m)
}
function isCharacterMode (m) {
  return ['character', 'character-edit', 'character-remix'].includes(m)
}

const isClient = typeof window !== 'undefined'
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
  const fd = new FormData()
  list.forEach(f => fd.append('file', f))
  const headers = { Accept: 'application/json' }
  const auth = getAuthToken()
  if (auth) headers['Authorization'] = `Bearer ${auth}`
  const res = await fetch(batchUploadUrl, { method: 'POST', headers, body: fd, credentials: 'include' })
  const data = await parseBatchUploadFetchResponse(res)
  const urls = data?.data?.urls || data?.fileUrls || (Array.isArray(data?.data) ? data.data : [])
  if (!Array.isArray(urls)) throw new Error('Invalid response: no URLs')
  return urls
}

const handleImageUpdate = async (files) => {
  if (!files || (Array.isArray(files) && files.length === 0)) { form.image_url = ''; return }
  isUploadingImage.value = true
  try {
    const urls = await getUrlsForFiles(Array.isArray(files) ? files : [files], uploadFilesToUrls)
    form.image_url = urls[0] || ''
  } catch (e) {
    showError(e.message || 'Upload failed')
    form.image_url = ''
    imageUploadRef.value?.clearFiles?.()
  } finally {
    isUploadingImage.value = false
  }
}

const handleMaskUpdate = async (files) => {
  if (!files || (Array.isArray(files) && files.length === 0)) { form.mask_url = ''; return }
  isUploadingMask.value = true
  try {
    const urls = await getUrlsForFiles(Array.isArray(files) ? files : [files], uploadFilesToUrls)
    form.mask_url = urls[0] || ''
  } catch (e) {
    showError(e.message || 'Upload failed')
    form.mask_url = ''
    maskUploadRef.value?.clearFiles?.()
  } finally {
    isUploadingMask.value = false
  }
}

const handleRefsUpdate = async (files) => {
  if (!files || (Array.isArray(files) && files.length === 0)) { form.reference_image_urls = []; return }
  isUploadingRefs.value = true
  try {
    const urls = await getUrlsForFiles(Array.isArray(files) ? files : [files], uploadFilesToUrls)
    form.reference_image_urls = urls || []
  } catch (e) {
    showError(e.message || 'Upload failed')
    form.reference_image_urls = []
    refsUploadRef.value?.clearFiles?.()
  } finally {
    isUploadingRefs.value = false
  }
}

const canSubmit = computed(() => {
  if (mode.value === 'v3-reframe') return !!form.image_url
  if (!form.prompt?.trim() && needsPrompt(mode.value)) return false
  if (needsImageUrl(mode.value) && !form.image_url) return false
  if ((mode.value === 'v3-edit' || mode.value === 'character-edit') && !form.mask_url) return false
  if (needsReferenceImages(mode.value) && (!form.reference_image_urls || form.reference_image_urls.length === 0)) return false
  return true
})

const onSubmit = async () => {
  if (!canSubmit.value) return
  isGenerating.value = true
  try {
    const m = mode.value
    let apiPath = ''
    let body = {}

    if (m === 'v3-text-to-image') {
      apiPath = '/api/image/ideogram/v3-text-to-image'
      body = {
        model: 'ideogram-v3-text-to-image',
        prompt: form.prompt?.trim() || undefined,
        renderingSpeed: form.rendering_speed,
        style: form.style,
        expandPrompt: !!form.expand_prompt,
        imageSize: form.image_size, // 使用 square_hd
        seed: form.seed,
        negativePrompt: form.negative_prompt?.trim() || undefined
      }
    } else if (m === 'v3-edit') {
      apiPath = '/api/image/ideogram/v3-edit'
      body = {
        model: 'ideogram-v3-edit',
        prompt: form.prompt?.trim() || undefined,
        imageUrl: form.image_url,
        maskUrl: form.mask_url,
        renderingSpeed: form.rendering_speed,
        expandPrompt: !!form.expand_prompt,
        seed: form.seed
      }
    } else if (m === 'v3-remix') {
      apiPath = '/api/image/ideogram/v3-remix'
      body = {
        model: 'ideogram-v3-remix',
        prompt: form.prompt?.trim() || undefined,
        imageUrl: form.image_url,
        renderingSpeed: form.rendering_speed,
        style: form.style,
        expandPrompt: !!form.expand_prompt,
        imageSize: form.image_size,
        numImages: form.num_images,
        seed: form.seed,
        strength: form.strength,
        negativePrompt: form.negative_prompt?.trim() || undefined
      }
    } else if (m === 'v3-reframe') {
      apiPath = '/api/image/ideogram/v3-reframe'
      body = {
        model: 'ideogram-v3-reframe',
        imageUrl: form.image_url,
        imageSize: form.image_size,
        renderingSpeed: form.rendering_speed,
        style: form.style,
        numImages: form.num_images,
        seed: form.seed
      }
    } else if (m === 'character') {
      apiPath = '/api/image/ideogram/character'
      body = {
        model: 'ideogram-character',
        prompt: form.prompt?.trim() || undefined,
        referenceImageUrls: form.reference_image_urls,
        renderingSpeed: form.rendering_speed,
        style: form.style,
        expandPrompt: !!form.expand_prompt,
        numImages: form.num_images,
        imageSize: form.image_size,
        seed: form.seed,
        negativePrompt: form.negative_prompt?.trim() || undefined
      }
    } else if (m === 'character-edit') {
      apiPath = '/api/image/ideogram/character-edit'
      body = {
        model: 'ideogram-character-edit',
        prompt: form.prompt?.trim() || undefined,
        imageUrl: form.image_url,
        maskUrl: form.mask_url,
        referenceImageUrls: form.reference_image_urls,
        renderingSpeed: form.rendering_speed,
        style: form.style,
        expandPrompt: !!form.expand_prompt,
        numImages: form.num_images,
        seed: form.seed
      }
    } else if (m === 'character-remix') {
      apiPath = '/api/image/ideogram/character-remix'
      body = {
        model: 'ideogram-character-remix',
        prompt: form.prompt?.trim() || undefined,
        imageUrl: form.image_url,
        referenceImageUrls: form.reference_image_urls,
        renderingSpeed: form.rendering_speed,
        style: form.style,
        expandPrompt: !!form.expand_prompt,
        imageSize: form.image_size,
        numImages: form.num_images,
        seed: form.seed,
        strength: form.strength,
        negativePrompt: form.negative_prompt?.trim() || undefined
      }
    } else {
      // 兜底走老的 generate 接口，避免未来新增 mode 时直接报错
      apiPath = '/api/image/ideogram/generate'
      body = {
        model: m,
        prompt: form.prompt?.trim() || undefined,
        rendering_speed: form.rendering_speed,
        style: form.style,
        expand_prompt: form.expand_prompt,
        image_size: form.image_size,
        seed: form.seed,
        negative_prompt: form.negative_prompt?.trim() || undefined,
        num_images: form.num_images,
        strength: form.strength
      }
      if (form.image_url) body.image_url = form.image_url
      if (form.mask_url) body.mask_url = form.mask_url
      if (form.reference_image_urls?.length) body.reference_image_urls = form.reference_image_urls
    }

    const data = await post(apiPath, body)
    const rid = data?.recordId ?? data?.data?.recordId
    if (rid) {
      router.push((modeTabToPath[mode.value] || '/home/ideogram/v3-text-to-image') + '?record-id=' + encodeURIComponent(rid))
      return
    }
    const payload = data?.data ?? data
    const urls = payload?.outputUrls ?? payload?.urls ?? payload?.images ?? (Array.isArray(payload) ? payload : [])
    if (Array.isArray(urls) && urls.length > 0) {
      const items = urls.map(u => ({ url: typeof u === 'string' ? u : u?.url ?? u?.imageUrl ?? '' })).filter(i => i.url)
      results.value.unshift(...items)
    } else if (payload && typeof payload === 'object') {
      results.value.unshift(payload)
    } else {
      showError('No image URLs in response')
    }
  } catch (e) {
    console.error(e)
    if (!e?.__fromApi) showError(e?.message || 'Request failed')
  } finally {
    isGenerating.value = false
  }
}

const clearResults = () => { results.value = [] }
</script>

<style scoped>
.ideogram-tool { width: 100%; height: 100%; padding: 20px; background: #fff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); display: flex; flex-direction: column; }
.tool-header { display: flex; align-items: center; padding-bottom: 20px; border-bottom: 1px solid #e2e8f0; margin-bottom: 20px; }
.tool-avatar { width: 48px; height: 48px; border-radius: 8px; overflow: hidden; margin-right: 16px; flex-shrink: 0; }
.tool-avatar img { width: 100%; height: 100%; object-fit: cover; }
.tool-details h3 { margin: 0; font-size: 18px; font-weight: 600; color: #1f2937; }
.tool-details .tool-description { margin: 0; font-size: 14px; color: #6b7280; }

.mode-tabs { display: flex; flex-wrap: wrap; gap: 8px; padding-bottom: 20px; border-bottom: 1px solid #e2e8f0; margin-bottom: 20px; }
.mode-tab { padding: 9px 14px; border: 1px solid #e2e8f0; background: #fff; color: #64748b; border-radius: 8px; cursor: pointer; font-size: 14px; display: flex; align-items: center; gap: 6px; }
.mode-tab:hover { border-color: #6366f1; color: #6366f1; }
.mode-tab.active { background: #6366f1; color: #fff; border-color: #6366f1; }

.main-content { display: flex; flex: 1; min-height: 0; gap: 20px; }
.config-panel { width: 38%; background: #f8fafc; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; min-height: 0; overflow-y: auto; }
.config-header { padding-bottom: 16px; border-bottom: 1px solid #e2e8f0; margin-bottom: 16px; }
.config-header h4 { margin: 0; font-size: 16px; font-weight: 600; color: #1e293b; }
.config-fieldset { border: none; margin: 0; padding: 0; }

.form-group { margin-bottom: 16px; }
.form-group label { display: block; font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 6px; }
.form-group textarea, .form-group input[type="number"] { width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; box-sizing: border-box; }
.form-group input[type="range"] { width: 100%; }
.char-count { text-align: right; font-size: 12px; color: #64748b; margin-top: 4px; }
.form-help { font-size: 12px; color: #6b7280; margin-top: 4px; }
.form-hint { font-size: 12px; color: #64748b; }

.detail-ref-row {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 13px;
}
.detail-ref-row a {
  color: #3b82f6;
  text-decoration: none;
}
.detail-ref-row a:hover {
  text-decoration: underline;
}

.tab-group { display: flex; gap: 6px; flex-wrap: wrap; }
.tab-group.tab-wrap { flex-wrap: wrap; }
.tab-option { padding: 8px 12px; border: 1px solid #e5e7eb; background: #fff; color: #64748b; border-radius: 8px; cursor: pointer; font-size: 13px; }
.tab-option:hover { border-color: #6366f1; color: #6366f1; }
.tab-option.active { background: #6366f1; color: #fff; border-color: #6366f1; }

.checkbox-label { display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px; }
.form-actions { margin-top: 20px; }
.btn-primary { width: 100%; padding: 14px; background: linear-gradient(135deg, #6366f1, #4f46e5); color: #fff; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

.result-panel { flex: 1; background: #fff; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; min-height: 0; }
.result-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 16px; border-bottom: 1px solid #e2e8f0; margin-bottom: 16px; }
.result-header h4 { margin: 0; font-size: 16px; font-weight: 600; color: #1e293b; }
.result-container { flex: 1; overflow-y: auto; display: flex; flex-wrap: wrap; gap: 16px; align-content: flex-start; }
.tutorial-showcase {
  width: 100%;
  margin-bottom: 4px;
  padding: 14px 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
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
.result-item { border-radius: 8px; overflow: hidden; background: #f1f5f9; }
.result-image { max-width: 100%; max-height: 70vh; display: block; }
.payload-json { margin: 0; padding: 12px; font-size: 12px; background: #0f172a; color: #e2e8f0; white-space: pre-wrap; }
.empty-state { width: 100%; text-align: center; color: #64748b; padding: 40px 20px; }
.empty-icon { font-size: 48px; color: #cbd5e1; margin-bottom: 12px; }
.btn-secondary { padding: 8px 14px; border: 1px solid #e2e8f0; background: #fff; color: #64748b; border-radius: 8px; cursor: pointer; font-size: 14px; display: flex; align-items: center; gap: 6px; }
.btn-secondary:hover { border-color: #6366f1; color: #6366f1; }

@media (max-width: 1024px) { .main-content { flex-direction: column; } .config-panel { width: 100%; } }
</style>
