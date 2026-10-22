<template>
  <div class="gpt-image-tool">
    <div class="tool-header">
      <div class="tool-avatar">
        <img src="/tools-logo/GPTImage.png" alt="GPT Image" />
      </div>
      <div class="tool-details">
        <h3>GPT Image</h3>
        <p class="tool-description">GPT Image is OpenAI's flagship image generation model for high-quality image creation and precise image editing, with strong instruction following and improved text rendering.</p>
      </div>
    </div>

    <div class="mode-tabs">
      <div
        v-for="t in modeTabs"
        :key="t.key"
        class="mode-tab"
        :class="{ active: mode === t.key }"
        @click="goToTab(t.key)"
      >
        <i :class="t.icon"></i>
        <span>{{ t.label }}</span>
      </div>
    </div>

    <div class="main-content">
      <div class="config-panel">
        <div class="config-header">
          <h4 class="panel-title">{{ modeTitle }}</h4>
        </div>
        <form class="config-form" @submit.prevent="onSubmit">
          <fieldset class="config-fieldset" :disabled="isGenerating || isDetailView">

            <!-- image-to-image only: upload input -->
            <div v-if="isImageToImageMode" class="form-group">
              <label>Reference Image *</label>
              <span v-if="isUploadingImage" class="form-hint"><i class="fas fa-spinner fa-spin"></i> Uploading...</span>
              <UploadImage :readonly="isDetailView"
                ref="imageUploadRef"
                input-id="gpt-image-upload"
                label=""
                upload-icon="fas fa-cloud-upload-alt"
                upload-text="Click to upload image"
                :upload-hint="usesResolutionMode ? 'JPG, PNG, WEBP. Max 10MB each. Up to 16 images.' : 'JPG, PNG, WEBP. Max 10MB.'"
                theme-color="#3b82f6"
                :max-files="usesResolutionMode ? 16 : 1"
                :max-file-size="10 * 1024 * 1024"
                accept="image/jpeg,image/png,image/webp"
                :multiple="usesResolutionMode"
                @update:files="handleImageUpdate"
              />
              <div v-if="isDetailView && isImageToImageMode && form.input_urls?.length" class="detail-ref-urls">
                <label>Reference (this task)</label>
                <div class="detail-ref-urls-links">
                  <a
                    v-for="(u, idx) in form.input_urls"
                    :key="idx"
                    :href="u"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="detail-ref-link"
                  >Image {{ idx + 1 }}</a>
                </div>
              </div>
            </div>

            <!-- Prompt -->
            <div class="form-group">
              <label>Prompt *</label>
              <textarea
                v-model="form.prompt"
                rows="4"
                :maxlength="promptMaxLength"
                :placeholder="promptPlaceholder"
                required
              />
              <div class="char-count">{{ form.prompt.length }}/{{ promptMaxLength }}</div>
            </div>

            <!-- Aspect Ratio -->
            <div class="form-group">
              <label>Aspect Ratio *</label>
              <div class="tab-group">
                <button
                  v-for="ratio in aspectRatioOptions"
                  :key="ratio"
                  type="button"
                  class="tab-option"
                  :class="{ active: form.aspect_ratio === ratio, disabled: is25Mode && ASPECTS_1K_ONLY.includes(ratio) && form.resolution !== '1K' }"
                  :disabled="is25Mode && ASPECTS_1K_ONLY.includes(ratio) && form.resolution !== '1K'"
                  @click="form.aspect_ratio = ratio"
                >
                  {{ ratio }}
                </button>
              </div>
              <div v-if="is25Mode" class="form-help">27:16 / 16:27 / 9:8 / 8:9 are only available at 1K resolution.</div>
            </div>

            <!-- Quality + Credits -->
            <div v-if="!usesResolutionMode" class="form-group">
              <label>Quality *</label>
              <div class="tab-group">
                <button
                  type="button"
                  class="tab-option"
                  :class="{ active: form.quality === 'medium' }"
                  @click="form.quality = 'medium'"
                >
                  medium
                </button>
                <button
                  type="button"
                  class="tab-option"
                  :class="{ active: form.quality === 'high' }"
                  @click="form.quality = 'high'"
                >
                  high
                </button>
              </div>
              <div class="form-help">
                <span>medium = balanced; high = slower, more detail.</span>
                <span v-if="currentCredits !== null" style="margin-left: 8px; font-weight: 500;">
                  · {{ currentCredits }} credits<span v-if="discountText">{{ discountText }}</span> / job
                </span>
              </div>
            </div>

            <div v-if="usesResolutionMode" class="form-group">
              <label>Resolution *</label>
              <div class="tab-group">
                <button
                  v-for="res in ['1K', '2K', '4K']"
                  :key="res"
                  type="button"
                  class="tab-option"
                  :class="{ active: form.resolution === res }"
                  @click="form.resolution = res"
                >
                  {{ res }}
                </button>
              </div>
              <div class="form-help">
                <span v-if="isV2Mode">1:1 does not support 4K. With auto ratio, only 1K is allowed.</span>
                <span v-else>Resolution is the billing tier. Ratios 27:16, 16:27, 9:8, 8:9 and background are only supported at 1K.</span>
                <span v-if="currentCredits !== null" style="margin-left: 8px; font-weight: 500;">
                  · {{ currentCredits }} credits<span v-if="discountText">{{ discountText }}</span> / job
                </span>
              </div>
            </div>

            <!-- 2.5 专属：Background（可选，仅 1K 支持；再次点击已选中项可取消） -->
            <div v-if="is25Mode" class="form-group">
              <label>Background</label>
              <div class="tab-group">
                <button
                  v-for="bg in ['auto', 'opaque', 'transparent']"
                  :key="bg"
                  type="button"
                  class="tab-option"
                  :class="{ active: form.background === bg, disabled: form.resolution !== '1K' }"
                  :disabled="form.resolution !== '1K'"
                  @click="form.background = form.background === bg ? '' : bg"
                >
                  {{ bg }}
                </button>
              </div>
              <div class="form-help">{{ form.resolution === '1K' ? 'Optional. Click again to unset (server default).' : 'Only available at 1K resolution.' }}</div>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn-primary" :disabled="!canSubmit || isGenerating || isDetailView">
                <i v-if="isGenerating" class="fas fa-spinner fa-spin"></i>
                <i v-else class="fas fa-magic"></i>
                <span v-if="isGenerating">Generating...</span>
                <span v-else>
                  Generate
                  <span v-if="currentCredits !== null">· {{ currentCredits }} credits<span v-if="discountText">{{ discountText }}</span></span>
                </span>
              </button>
            </div>
          </fieldset>
        </form>
      </div>

      <div class="result-panel">
        <div class="result-header">
          <h4 class="panel-title">Result</h4>
          <button v-if="!isDetailView && results.length > 0" type="button" class="btn-secondary" @click="clearResults">
            <i class="fas fa-trash"></i> Clear
          </button>
        </div>
        <div class="result-container">
          <div v-if="!isDetailView && route.path === '/home/gpt-image/text-to-image'" class="tutorial-showcase">
            <p class="tutorial-showcase-title">🎨 Tutorial Showcase</p>
            <div class="tutorial-showcase-links">
              <a href="https://fuseaitools.com/news/gpt-image-candid-street-fashion-tutorial" target="_blank" rel="noopener noreferrer" class="tutorial-link">Use AI to create natural candid fashion editorials - no more stiff poses</a>
              <a href="https://fuseaitools.com/news/gpt-image-pet-emotional-portrait-tutorial" target="_blank" rel="noopener noreferrer" class="tutorial-link">Capture the story in your pet's eyes with AI - create heartfelt emotional imagery</a>
            </div>
          </div>
          <!-- 详情页：根据 record-id 轮询展示 -->
          <template v-if="isDetailView">
            <div v-if="Number(detailData?.status) === 3" class="detail-failure-state">
              <i class="fas fa-exclamation-circle"></i>
              <p>Generation failed.</p>
            </div>
            <div v-else-if="!detailData || [0, 1].includes(Number(detailData.status))" class="detail-loading-state">
              <i class="fas fa-spinner fa-spin"></i>
              <p>Generating...</p>
            </div>
            <template v-else-if="Number(detailData?.status) === 2 && detailImageUrls.length">
              <div v-for="(url, idx) in detailImageUrls" :key="idx" class="result-item">
                <img :src="url" :alt="'Output ' + (idx + 1)" class="result-image" loading="lazy" />
              </div>
            </template>
            <div v-else class="empty-state">
              <i class="fas fa-image empty-icon"></i>
              <p>No output yet.</p>
            </div>
          </template>
          <!-- 非详情页：本地结果列表 -->
          <template v-else>
            <template v-if="results.length > 0">
              <div v-for="(item, idx) in results" :key="idx" class="result-item">
                <img v-if="item.url" :src="item.url" :alt="'Output ' + (idx + 1)" class="result-image" loading="lazy" />
                <pre v-else class="payload-json">{{ typeof item === 'object' ? JSON.stringify(item, null, 2) : item }}</pre>
              </div>
            </template>
            <div v-else class="empty-state">
              <i class="fas fa-image empty-icon"></i>
              <p>Configure and click Generate.</p>
            </div>
          </template>
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
import { useAuth } from '~/composables/useAuth'
import { useRecordPolling } from '~/composables/useRecordPolling'
import { useModelPrice } from '~/composables/useModelPrice'

const { showError } = useToast()
const { post } = useApi()
const { token } = useAuth()
const batchUploadUrl = useBatchUploadUrl()
const { getUrlsForFiles } = useFileUploadUrlCache()
const router = useRouter()
const route = useRoute()
const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling()
const { fetchPrices, getPrice, discount } = useModelPrice()
onMounted(() => { fetchPrices() })

const routeRecordId = computed(() => route.query['record-id'] || '')
const isDetailView = computed(() => !!routeRecordId.value)
const detailData = ref(null)

const detailImageUrls = computed(() => {
  const d = detailData.value
  if (!d || Number(d.status) !== 2) return []
  const single = d.outputUrl || d.imageUrl
  if (single) {
    const u = typeof single === 'string' ? single : single?.url || ''
    return u ? [u] : []
  }
  const ou = d.outputUrls
  if (!Array.isArray(ou)) return []
  return ou
    .map((x) => (typeof x === 'string' ? x : x?.url || x?.imageUrl || ''))
    .filter(Boolean)
})

function fillFormFromOriginalData(o) {
  if (!o || typeof o !== 'object') return
  if (o.prompt != null) form.prompt = String(o.prompt)
  if (o.aspectRatio) form.aspect_ratio = String(o.aspectRatio)
  if (o.aspect_ratio) form.aspect_ratio = String(o.aspect_ratio)
  if (o.quality) form.quality = String(o.quality)
  if (o.resolution) form.resolution = String(o.resolution)
  if (o.background) form.background = String(o.background)
  if (Array.isArray(o.inputUrls)) form.input_urls = [...o.inputUrls]
  else if (Array.isArray(o.input_urls)) form.input_urls = [...o.input_urls]
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
  } catch (e) {
    console.error('GPT Image load record detail failed:', e)
  }
}
watch(() => route.query['record-id'], (recordId) => {
  if (recordId) loadDetailByRecordId(recordId)
  else detailData.value = null
}, { immediate: true })

const modeTabToPath = {
  'text-to-image': '/home/gpt-image/text-to-image',
  'image-to-image': '/home/gpt-image/image-to-image',
  'v2-text-to-image': '/home/gpt-image/v2-text-to-image',
  'v2-image-to-image': '/home/gpt-image/v2-image-to-image',
  'v2-5-flare-text-to-image': '/home/gpt-image/v2-5-flare-text-to-image',
  'v2-5-flare-image-to-image': '/home/gpt-image/v2-5-flare-image-to-image',
  'v2-5-sunburst-text-to-image': '/home/gpt-image/v2-5-sunburst-text-to-image',
  'v2-5-sunburst-image-to-image': '/home/gpt-image/v2-5-sunburst-image-to-image'
}
const modeTabs = [
  { key: 'text-to-image', label: 'text-to-image', icon: 'fas fa-keyboard' },
  { key: 'image-to-image', label: 'image-to-image', icon: 'fas fa-image' },
  { key: 'v2-text-to-image', label: 'v2-text-to-image', icon: 'fas fa-wand-magic-sparkles' },
  { key: 'v2-image-to-image', label: 'v2-image-to-image', icon: 'fas fa-pen-to-square' },
  { key: 'v2-5-flare-text-to-image', label: '2.5 Flare T2I', icon: 'fas fa-bolt' },
  { key: 'v2-5-flare-image-to-image', label: '2.5 Flare I2I', icon: 'fas fa-fire' },
  { key: 'v2-5-sunburst-text-to-image', label: '2.5 Sunburst T2I', icon: 'fas fa-sun' },
  { key: 'v2-5-sunburst-image-to-image', label: '2.5 Sunburst I2I', icon: 'fas fa-cloud-sun' }
]
const pathToMode = {}
Object.keys(modeTabToPath).forEach(k => { pathToMode[modeTabToPath[k]] = k })

const mode = ref('text-to-image')
function goToTab (m) {
  mode.value = m
  router.push(modeTabToPath[m] || modeTabToPath['text-to-image'])
}

watch(() => route.path, (path) => {
  const m = pathToMode[path]
  if (m && mode.value !== m) mode.value = m
}, { immediate: true })

// v2 / 2.5 宽高比集合：2.5 为 13 档（含 auto），其中四档仅 1K 支持
const ASPECTS_V2 = ['auto', '1:1', '9:16', '16:9', '4:3', '3:4']
const ASPECTS_V25 = ['auto', '1:1', '3:2', '2:3', '4:3', '3:4', '16:9', '9:16', '21:9', '27:16', '16:27', '9:8', '8:9']
const ASPECTS_1K_ONLY = ['27:16', '16:27', '9:8', '8:9']

// 必须先于下面的 watch 初始化：watch 的 getter 在创建时即被求值，否则会命中 TDZ
const form = reactive({
  prompt: '',
  aspect_ratio: '1:1',
  quality: 'medium',
  resolution: '1K',
  background: '',
  input_urls: []
})

watch(mode, (m) => {
  if (m === 'v2-text-to-image' || m === 'v2-image-to-image') {
    if (!ASPECTS_V2.includes(form.aspect_ratio)) {
      form.aspect_ratio = 'auto'
    }
    if (!['1K', '2K', '4K'].includes(form.resolution)) {
      form.resolution = '1K'
    }
    // DTO 对齐：v2 模式默认 aspectRatio=auto
    if (!isDetailView.value) {
      form.aspect_ratio = 'auto'
      if (form.resolution !== '1K') form.resolution = '1K'
    }
  } else if (m.startsWith('v2-5-')) {
    if (!isDetailView.value) {
      // DTO 对齐：2.5 模式默认 aspectRatio=auto、resolution=1K（计费维度必传）
      form.aspect_ratio = 'auto'
      form.resolution = '1K'
      form.background = ''
    } else {
      if (!ASPECTS_V25.includes(form.aspect_ratio)) form.aspect_ratio = 'auto'
      if (!['1K', '2K', '4K'].includes(form.resolution)) form.resolution = '1K'
      if (form.resolution !== '1K') {
        if (ASPECTS_1K_ONLY.includes(form.aspect_ratio)) form.aspect_ratio = 'auto'
        form.background = ''
      }
    }
  } else {
    if (!['1:1', '2:3', '3:2'].includes(form.aspect_ratio)) {
      form.aspect_ratio = '1:1'
    }
    form.background = ''
  }
})
// 2.5：Resolution 离开 1K 时自动清理 background 与仅 1K 宽高比
watch([() => form.resolution, () => form.aspect_ratio], () => {
  if (!mode.value.startsWith('v2-5-')) return
  if (form.resolution !== '1K') {
    if (form.background) form.background = ''
    if (ASPECTS_1K_ONLY.includes(form.aspect_ratio)) form.aspect_ratio = 'auto'
  }
})

const isV2Mode = computed(() => mode.value === 'v2-text-to-image' || mode.value === 'v2-image-to-image')
const is25Mode = computed(() => mode.value.startsWith('v2-5-'))
// v2 与 2.5 共用：Resolution 控件 + 多图为上传 + 20000 字符 prompt
const usesResolutionMode = computed(() => isV2Mode.value || is25Mode.value)
const isImageToImageMode = computed(() => ['image-to-image', 'v2-image-to-image', 'v2-5-flare-image-to-image', 'v2-5-sunburst-image-to-image'].includes(mode.value))
const promptMaxLength = computed(() => (usesResolutionMode.value ? 20000 : 3000))
const promptPlaceholder = computed(() => {
  if (mode.value.endsWith('image-to-image')) return 'Describe the edit you want (e.g. change clothing, style)...'
  return 'Describe the image you want to generate...'
})
const modeTitle = computed(() => {
  if (mode.value === 'v2-text-to-image') return 'V2 Text to Image'
  if (mode.value === 'v2-image-to-image') return 'V2 Image to Image'
  if (mode.value === 'v2-5-flare-text-to-image') return 'GPT Image 2.5 Flare · Text to Image'
  if (mode.value === 'v2-5-flare-image-to-image') return 'GPT Image 2.5 Flare · Image to Image'
  if (mode.value === 'v2-5-sunburst-text-to-image') return 'GPT Image 2.5 Sunburst · Text to Image'
  if (mode.value === 'v2-5-sunburst-image-to-image') return 'GPT Image 2.5 Sunburst · Image to Image'
  return mode.value === 'text-to-image' ? 'Text to Image' : 'Image to Image'
})
const aspectRatioOptions = computed(() => {
  if (is25Mode.value) return ASPECTS_V25
  if (isV2Mode.value) return ASPECTS_V2
  return ['1:1', '2:3', '3:2']
})

// 折扣文本
const discountText = computed(() => {
  const rate = Number(discount?.value ?? 1)
  if (Number.isNaN(rate) || rate <= 0 || rate === 1) return ''
  const percent = (rate * 100).toFixed(0)
  return ` · ${percent}%`
})

// tab key → 后端 model 值 / server proxy 路径（计费维度：1.5 为 quality，v2 与 2.5 为 resolution）
const MODE_CONFIG = {
  'text-to-image': { model: 'gpt-image-1.5-text-to-image', api: '/api/image/gpt-image/text-to-image' },
  'image-to-image': { model: 'gpt-image-1.5-image-to-image', api: '/api/image/gpt-image/image-to-image' },
  'v2-text-to-image': { model: 'gpt-image-2-text-to-image', api: '/api/image/gpt-image/v2-text-to-image' },
  'v2-image-to-image': { model: 'gpt-image-2-image-to-image', api: '/api/image/gpt-image/v2-image-to-image' },
  'v2-5-flare-text-to-image': { model: 'gpt-image-2-5-flare-text-to-image', api: '/api/image/gpt-image/v2-5-flare-text-to-image' },
  'v2-5-flare-image-to-image': { model: 'gpt-image-2-5-flare-image-to-image', api: '/api/image/gpt-image/v2-5-flare-image-to-image' },
  'v2-5-sunburst-text-to-image': { model: 'gpt-image-2-5-sunburst-text-to-image', api: '/api/image/gpt-image/v2-5-sunburst-text-to-image' },
  'v2-5-sunburst-image-to-image': { model: 'gpt-image-2-5-sunburst-image-to-image', api: '/api/image/gpt-image/v2-5-sunburst-image-to-image' }
}

// 模型价格配置（本地兜底表：接口价格未就绪时使用；1.5 按 size 匹配 quality，v2/2.5 按 quality 字段匹配 resolution）
const modelPricing = reactive({
  'gpt-image-1.5-image-to-image': {
    type: 'RULE',
    rules: [
      { size: 'medium', credits: 12 },
      { size: 'high', credits: 36 }
    ]
  },
  'gpt-image-1.5-text-to-image': {
    type: 'RULE',
    rules: [
      { size: 'medium', credits: 6 },
      { size: 'high', credits: 36 }
    ]
  },
  'gpt-image-2-text-to-image': {
    type: 'RULE',
    rules: [
      { quality: '1k', credits: 6 },
      { quality: '2K', credits: 9 },
      { quality: '4K', credits: 12 }
    ]
  },
  'gpt-image-2-image-to-image': {
    type: 'RULE',
    rules: [
      { quality: '1K', credits: 6 },
      { quality: '2K', credits: 9 },
      { quality: '4K', credits: 12 }
    ]
  },
  'gpt-image-2-5-flare-text-to-image': {
    type: 'RULE',
    rules: [
      { quality: '1K', credits: 6 },
      { quality: '2K', credits: 9 },
      { quality: '4K', credits: 12 }
    ]
  },
  'gpt-image-2-5-flare-image-to-image': {
    type: 'RULE',
    rules: [
      { quality: '1K', credits: 6 },
      { quality: '2K', credits: 9 },
      { quality: '4K', credits: 12 }
    ]
  },
  'gpt-image-2-5-sunburst-text-to-image': {
    type: 'RULE',
    rules: [
      { quality: '1K', credits: 6 },
      { quality: '2K', credits: 9 },
      { quality: '4K', credits: 12 }
    ]
  },
  'gpt-image-2-5-sunburst-image-to-image': {
    type: 'RULE',
    rules: [
      { quality: '1K', credits: 6 },
      { quality: '2K', credits: 9 },
      { quality: '4K', credits: 12 }
    ]
  }
})

const currentModelKey = computed(() => (MODE_CONFIG[mode.value] || MODE_CONFIG['text-to-image']).model)

const currentCredits = computed(() => {
  const key = currentModelKey.value
  // 2.5：优先取接口价格（RULE 按 resolution，接口 rules 口径为 quality），未就绪时回落本地表
  if (is25Mode.value) {
    const credits = getPrice(key, {
      quality: form.resolution,
      duration: 0,
      size: '',
      batchSize: 1,
      speed: 'none',
      scene: 'generate'
    })
    if (credits !== null && credits !== undefined) return credits
  }
  const cfg = modelPricing[key]
  if (!cfg || !Array.isArray(cfg.rules)) return null
  const rule = usesResolutionMode.value
    ? cfg.rules.find(r => String(r.quality || '').toLowerCase() === String(form.resolution || '').toLowerCase())
    : cfg.rules.find(r => r.size === form.quality)
  return rule ? rule.credits : null
})

const imageUploadRef = ref(null)
const isUploadingImage = ref(false)
const isGenerating = ref(false)
const results = ref([])

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
  const data = await parseBatchUploadFetchResponse(response)
  const urls = data?.data?.urls || data?.fileUrls || (Array.isArray(data?.data) ? data.data : [])
  if (!Array.isArray(urls)) throw new Error('Invalid response: file URLs not found')
  return urls
}

const handleImageUpdate = async (files) => {
  if (!files || (Array.isArray(files) && files.length === 0)) {
    form.input_urls = []
    return
  }
  const list = Array.isArray(files) ? files : [files]
  isUploadingImage.value = true
  try {
    const urls = await getUrlsForFiles(list, uploadFilesToUrls)
    form.input_urls = usesResolutionMode.value ? urls.slice(0, 16) : urls.slice(0, 1)
  } catch (e) {
    showError(e.message || 'Failed to upload image')
    form.input_urls = []
    imageUploadRef.value?.clearFiles?.()
  } finally {
    isUploadingImage.value = false
  }
}

const canSubmit = computed(() => {
  if (!form.prompt || !form.prompt.trim()) return false
  if (is25Mode.value) {
    if (!['1K', '2K', '4K'].includes(form.resolution)) return false
    if (form.resolution !== '1K' && ASPECTS_1K_ONLY.includes(form.aspect_ratio)) return false
    if (form.background && form.resolution !== '1K') return false
    if (form.input_urls?.length > 16) return false
  }
  if (isImageToImageMode.value) {
    return Array.isArray(form.input_urls) && form.input_urls.length > 0
  }
  if (isV2Mode.value) {
    if (form.aspect_ratio === 'auto' && form.resolution !== '1K') return false
    if (form.aspect_ratio === '1:1' && form.resolution === '4K') return false
  }
  return true
})

const onSubmit = async () => {
  if (!canSubmit.value) return
  if (form.prompt.length > promptMaxLength.value) {
    showError(`Prompt cannot exceed ${promptMaxLength.value} characters`)
    return
  }
  if (isV2Mode.value) {
    if (form.aspect_ratio === 'auto' && form.resolution !== '1K') {
      showError('With auto aspect ratio, resolution must be 1K')
      return
    }
    if (form.aspect_ratio === '1:1' && form.resolution === '4K') {
      showError('1:1 aspect ratio does not support 4K resolution')
      return
    }
  }

  if (is25Mode.value) {
    if (!['1K', '2K', '4K'].includes(form.resolution)) {
      showError('Resolution must be one of: 1K, 2K, 4K')
      return
    }
    if (form.resolution !== '1K' && ASPECTS_1K_ONLY.includes(form.aspect_ratio)) {
      showError(`Aspect ratio ${form.aspect_ratio} is only supported at 1K resolution`)
      return
    }
    if (form.background && form.resolution !== '1K') {
      showError('Background is only supported at 1K resolution')
      return
    }
    if (form.input_urls?.length > 16) {
      showError('Input URLs cannot exceed 16 items')
      return
    }
  }

  isGenerating.value = true
  try {
    const modeVal = mode.value
    const cfg = MODE_CONFIG[modeVal] || MODE_CONFIG['text-to-image']
    const apiPath = cfg.api
    const body = {
      model: cfg.model,
      prompt: form.prompt.trim(),
      aspectRatio: form.aspect_ratio
    }
    if (is25Mode.value) {
      body.resolution = form.resolution
      if (form.background && form.resolution === '1K') body.background = form.background
    } else if (!usesResolutionMode.value) {
      body.quality = form.quality
    } else {
      body.resolution = form.resolution
    }
    if (isImageToImageMode.value && form.input_urls?.length) {
      body.inputUrls = form.input_urls
    }

    const data = await post(apiPath, body)
    const rid = data?.recordId ?? data?.data?.recordId
    if (rid) {
      router.push((modeTabToPath[modeVal] || '/home/gpt-image/text-to-image') + '?record-id=' + encodeURIComponent(rid))
      return
    }
    const payload = data?.data ?? data
    const urls = payload?.outputUrls ?? payload?.urls ?? payload?.images ?? (Array.isArray(payload) ? payload : [])
    if (Array.isArray(urls) && urls.length > 0) {
      const newItems = urls.map(u => ({ url: typeof u === 'string' ? u : u?.url ?? u?.imageUrl ?? '' })).filter(i => i.url)
      results.value.unshift(...newItems)
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

const clearResults = () => {
  results.value = []
}
</script>

<style scoped>
.gpt-image-tool {
  width: 100%;
  height: 100%;
  padding: 20px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
}
.tool-header { display: flex; align-items: center; padding-bottom: 20px; border-bottom: 1px solid #e2e8f0; margin-bottom: 20px; }
.tool-avatar { width: 48px; height: 48px; border-radius: 8px; overflow: hidden; margin-right: 16px; flex-shrink: 0; }
.tool-avatar img { width: 100%; height: 100%; object-fit: cover; }
.tool-details h3 { margin: 0; font-size: 18px; font-weight: 600; color: var(--flux-foreground); }
.tool-details .tool-description { margin: 0; font-size: 14px; color: #6b7280; }

.mode-tabs { display: flex; flex-wrap: wrap; gap: 8px; padding-bottom: 20px; border-bottom: 1px solid #e2e8f0; margin-bottom: 20px; }
.mode-tab { padding: 10px 16px; border: 1px solid #e2e8f0; background: #fff; color: #64748b; border-radius: 8px; cursor: pointer; transition: all .2s; display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 500; }
.mode-tab:hover { border-color: #3b82f6; color: #3b82f6; }
.mode-tab.active { background: #3b82f6; color: #fff; border-color: #3b82f6; }

.main-content { display: flex; flex: 1; min-height: 0; gap: 20px; }
.config-panel { width: 36%; background: #f8fafc; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; min-height: 0; }
.config-header { padding-bottom: 16px; border-bottom: 1px solid #e2e8f0; margin-bottom: 16px; }
.config-header h4 { margin: 0; font-size: 16px; font-weight: 600; color: var(--flux-foreground); }
.config-fieldset { border: none; margin: 0; padding: 0; }

.form-group { margin-bottom: 18px; }
.form-group label { display: block; font-size: 14px; font-weight: 500; color: var(--flux-muted); margin-bottom: 8px; }
.form-group textarea { width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; box-sizing: border-box; resize: vertical; }
.form-group textarea:focus { outline: none; border-color: #3b82f6; }
.char-count { text-align: right; font-size: 12px; color: #64748b; margin-top: 4px; }
.form-help { font-size: 12px; color: #6b7280; margin-top: 4px; }
.form-hint { font-size: 12px; color: #64748b; }

.tab-group { display: flex; gap: 8px; flex-wrap: wrap; }
.tab-option { flex: 1; min-width: 60px; padding: 10px 14px; border: 1px solid #e5e7eb; background: #fff; color: #64748b; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; }
.tab-option:hover { border-color: #3b82f6; color: #3b82f6; }
.tab-option.active { background: #3b82f6; color: #fff; border-color: #3b82f6; }
.tab-option:disabled, .tab-option.disabled { opacity: .45; cursor: not-allowed; }
.tab-option:disabled:hover, .tab-option.disabled:hover { border-color: #e5e7eb; color: #64748b; }

.detail-ref-urls {
  margin-top: 10px;
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

.form-actions { margin-top: 20px; }
.btn-primary { width: 100%; padding: 14px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: #fff; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; }
.btn-primary:hover:not(:disabled) { opacity: 0.95; }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

.result-panel { flex: 1; background: #fff; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; min-height: 0; }
.result-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 16px; border-bottom: 1px solid #e2e8f0; margin-bottom: 16px; }
.result-header h4 { margin: 0; font-size: 16px; font-weight: 600; color: var(--flux-foreground); }
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
.btn-secondary:hover { border-color: #3b82f6; color: #3b82f6; }

.detail-loading-state, .detail-failure-state { width: 100%; text-align: center; padding: 40px 20px; color: #64748b; }
.detail-loading-state i, .detail-failure-state i { font-size: 32px; margin-bottom: 12px; display: block; }
.detail-failure-state { color: #dc2626; }

@media (max-width: 1024px) {
  .main-content { flex-direction: column; }
  .config-panel { width: 100%; }
}
</style>
