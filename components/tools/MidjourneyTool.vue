<template>
  <div class="midjourney-tool">
    <!-- 工具信息头部 -->
    <div class="tool-header">
      <div class="tool-avatar">
        <img src="/tools-logo/Midjourney.png" alt="Midjourney" />
      </div>
      <div class="tool-details">
        <h3>Midjourney</h3>
        <p class="tool-description">Midjourney is a leading AI image tool for art and photorealistic imagery.</p>
      </div>
    </div>

    <!-- 分类切换：Imagine | Upscale | Vary，样式与 Ideogram/Nano Banana 一致 -->
    <div class="mode-tabs-wrap">
      <div class="mode-tabs">
        <div
          v-for="cat in categoryOptions"
          :key="cat.id"
          class="mode-tab"
          :class="{ active: activeCategory === cat.id }"
          @click="goToMidjourneyTab(cat.id)"
        >
          <i :class="cat.icon"></i>
          <span>{{ cat.name }}</span>
        </div>
      </div>
    </div>

    <!-- 主内容区域：左右布局 -->
    <div class="main-content">
      <!-- 左侧：参数配置面板 (1/3) -->
      <div class="config-panel">
        <!-- Imagine 表单 -->
        <form v-if="activeCategory === 'imagine'" class="config-form" @submit.prevent="onSubmitImagine">
          <fieldset class="config-fieldset" :disabled="loading || isDetailView">
          <p class="category-desc">Create a new image generation task using the Midjourney AI model.</p>
          <div class="form-group">
            <label>Task Type *</label>
            <div class="option-btn-group">
              <button type="button" class="option-btn" :class="{ active: form.taskType === 'mj_txt2img' }" @click="form.taskType = 'mj_txt2img'">
                Text-to-image
              </button>
              <button type="button" class="option-btn" :class="{ active: form.taskType === 'mj_img2img' }" @click="form.taskType = 'mj_img2img'">
                Image-to-image
              </button>
        </div>
          </div>
          <div class="form-group">
            <label>Prompt *</label>
            <textarea
              v-model="form.prompt"
              rows="4"
              required
              placeholder="Describe the desired image content. Be detailed (style, composition, lighting). Example: Help me generate a sci-fi themed fighter jet in a beautiful sky, to be used as a computer wallpaper"
              maxlength="2000"
            ></textarea>
            <div class="char-count">{{ form.prompt.length }}/2000</div>
            </div>
          <div class="form-group">
            <label>Speed</label>
            <div class="option-btn-group">
              <button type="button" class="option-btn" :class="{ active: form.speed === 'relaxed' }" @click="form.speed = 'relaxed'">relaxed</button>
              <button type="button" class="option-btn" :class="{ active: form.speed === 'fast' }" @click="form.speed = 'fast'">fast</button>
              <button type="button" class="option-btn" :class="{ active: form.speed === 'turbo' }" @click="form.speed = 'turbo'">turbo</button>
            </div>
          </div>
          <div class="form-group" v-if="form.taskType === 'mj_img2img'">
            <UploadImage
              ref="fileUrlsUploadRef"
              input-id="midjourney-input-images"
              label="Input Image(s) *"
              upload-icon="fas fa-cloud-upload-alt"
              upload-text="Click to upload image"
              upload-hint="Required for image-to-image."
              :max-files="5"
              :max-file-size="10 * 1024 * 1024"
              theme-color="#667eea"
              @update:files="handleFileUrlsUpdate"
            />
          </div>
          <div class="form-group">
            <label>Aspect Ratio</label>
            <select v-model="form.aspectRatio" class="form-select form-select-enhanced">
              <option value="1:2">1:2</option>
              <option value="9:16">9:16</option>
              <option value="2:3">2:3</option>
              <option value="3:4">3:4</option>
              <option value="5:6">5:6</option>
              <option value="6:5">6:5</option>
              <option value="4:3">4:3</option>
              <option value="3:2">3:2</option>
              <option value="1:1">1:1</option>
              <option value="16:9">16:9</option>
              <option value="2:1">2:1</option>
            </select>
          </div>
          <div class="form-group">
            <label>Version</label>
            <select v-model="form.version" class="form-select form-select-enhanced">
              <option value="7">7</option>
              <option value="6.1">6.1</option>
              <option value="6">6</option>
              <option value="5.2">5.2</option>
              <option value="5.1">5.1</option>
              <option value="niji6">niji6</option>
              <option value="niji7">niji7</option>
            </select>
          </div>
          <div class="form-group">
            <label>Variety (0–100, step 5)</label>
            <input v-model.number="form.variety" type="number" min="0" max="100" step="5" class="form-input" />
            <div class="input-hint">Higher = more diverse; lower = more consistent</div>
          </div>
          <div class="form-group">
            <label>Stylization (0–1000)</label>
            <input v-model.number="form.stylization" type="number" min="0" max="1000" step="50" class="form-input" />
            <div class="input-hint">Higher = more stylized; lower = more realistic</div>
          </div>
          <div class="form-group">
            <label>Weirdness (0–3000)</label>
            <input v-model.number="form.weirdness" type="number" min="0" max="3000" step="100" class="form-input" />
            <div class="input-hint">Higher = more unusual; lower = more conventional</div>
          </div>
          <div class="form-group">
            <label>Watermark</label>
            <input v-model="form.waterMark" type="text" class="form-input" placeholder="Optional watermark identifier" />
          </div>
          <div class="form-actions">
            <button class="btn-primary" type="submit" :disabled="loading || !form.prompt?.trim() || needFileUrlsButEmpty">
              <i v-if="loading" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-magic"></i>
              {{ loading ? 'Generating...' : 'Start Generation' }}{{ midjourneyPriceText }}
            </button>
          </div>
          </fieldset>
        </form>

        <!-- Upscale 表单：Create an upscale task based on previously generated Midjourney images -->
        <form v-if="activeCategory === 'upscale'" class="config-form" @submit.prevent="onSubmitUpscale">
          <fieldset class="config-fieldset" :disabled="loading || isDetailView">
          <p class="category-desc">Create an upscale task based on previously generated Midjourney images.</p>
              <div class="form-group">
            <label>Task ID *</label>
            <div class="select-with-arrow">
              <select v-model="upscaleForm.taskId" class="form-select form-select-enhanced" required :disabled="loadingExtendList" :key="'upscale-select-' + extendListOptions.length">
                <option value="">Select a task</option>
                <option v-for="item in extendListOptions" :key="item.taskId" :value="item.taskId">{{ item.title || item.taskId }}</option>
              </select>
              <i class="fas fa-chevron-down select-arrow-icon" aria-hidden="true"></i>
              </div>
            <div v-if="!loadingExtendList && extendListOptions.length === 0" class="input-hint input-hint-warn">Only tasks completed with Midjourney Imagine can be used.</div>
          </div>
          <div class="form-group" v-if="selectedOutputUrls.length">
            <label>Image Index *</label>
            <div class="extend-image-index-grid">
              <button 
                v-for="(url, idx) in selectedOutputUrls"
                :key="idx"
                type="button"
                class="extend-image-index-item"
                :class="{ selected: upscaleForm.imageIndex === idx }"
                @click="upscaleForm.imageIndex = idx"
              >
                <img :src="url" :alt="`Image ${idx}`" />
                <span class="index-badge">{{ idx }}</span>
              </button>
            </div>
            <div class="input-hint">Select one image</div>
              </div>
          <div class="form-group">
            <label>Watermark</label>
            <input v-model="upscaleForm.waterMark" type="text" class="form-input" placeholder="Optional watermark identifier" />
          </div>
          <div class="form-actions">
            <button class="btn-primary" type="submit" :disabled="loading || !upscaleForm.taskId?.trim()">
              <i v-if="loading" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-expand-arrows-alt"></i>
              {{ loading ? 'Submitting...' : 'Upscale' }}{{ midjourneyPriceText }}
            </button>
                </div>
          </fieldset>
        </form>

        <!-- Vary 表单：Create a vary task to enhance image clarity and simulate styles -->
        <form v-if="activeCategory === 'vary'" class="config-form" @submit.prevent="onSubmitVary">
          <fieldset class="config-fieldset" :disabled="loading || isDetailView">
          <p class="category-desc">Create a vary task to enhance image clarity and simulate styles based on previously generated Midjourney images.</p>
              <div class="form-group">
            <label>Task ID *</label>
            <div class="select-with-arrow">
              <select v-model="varyForm.taskId" class="form-select form-select-enhanced" required :disabled="loadingExtendList" :key="'vary-select-' + extendListOptions.length">
                <option value="">Select a task</option>
                <option v-for="item in extendListOptions" :key="item.taskId" :value="item.taskId">{{ item.title || item.taskId }}</option>
              </select>
              <i class="fas fa-chevron-down select-arrow-icon" aria-hidden="true"></i>
              </div>
            <div v-if="!loadingExtendList && extendListOptions.length === 0" class="input-hint input-hint-warn">Only tasks completed with Midjourney Imagine can be used.</div>
          </div>
          <div class="form-group" v-if="selectedOutputUrls.length">
            <label>Image Index *</label>
            <div class="extend-image-index-grid">
              <button
                v-for="(url, idx) in selectedOutputUrls"
                :key="idx"
                type="button"
                class="extend-image-index-item"
                :class="{ selected: varyForm.imageIndex === idx + 1 }"
                @click="varyForm.imageIndex = idx + 1"
              >
                <img :src="url" :alt="`Image ${idx + 1}`" />
                <span class="index-badge">{{ idx + 1 }}</span>
            </button>
          </div>
            <div class="input-hint">Select one image</div>
            </div>
            <div class="form-group">
            <label>Watermark</label>
            <input v-model="varyForm.waterMark" type="text" class="form-input" placeholder="Optional watermark identifier" />
          </div>
          <div class="form-actions">
            <button class="btn-primary" type="submit" :disabled="loading || !varyForm.taskId?.trim()">
              <i v-if="loading" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-palette"></i>
              {{ loading ? 'Submitting...' : 'Vary' }}{{ midjourneyPriceText }}
            </button>
          </div>
          </fieldset>
        </form>
      </div>

      <div class="results-display-panel">
        <div class="results-header">
          <h4>Generation Results</h4>
          <div class="results-actions" v-if="!isDetailView && results.length">
            <button @click="clearResults" class="btn-secondary">
              <i class="fas fa-trash"></i> Clear
            </button>
          </div>
        </div>
        <div class="results-container">
          <!-- 详情页：status 2 展示 outputUrls -->
          <div v-if="isDetailView && detailData && detailData.status === 2 && detailOutputList.length > 0" class="results-showcase">
            <div v-for="(item, idx) in detailOutputList" :key="idx" class="result-item">
              <div class="result-content">
                <img v-if="item.isImage" :src="item.url" class="detail-output-image" :alt="`Output ${idx + 1}`" />
                <pre v-else class="result-json">{{ item.url }}</pre>
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
            <p>No output</p>
          </div>
          <!-- 非详情页：本地结果 -->
          <div v-else-if="results.length" class="results-showcase">
            <div v-for="(item, idx) in results" :key="idx" class="result-item">
              <div class="result-header">
                <span class="result-time">{{ formatTime(item.time) }}</span>
                <span class="result-type">{{ getResultType(item.data) }}</span>
              </div>
              <div class="result-content">
                <pre class="result-json">{{ formatJson(item.data) }}</pre>
                </div>
                </div>
              </div>
          <div v-else class="empty-state">
            <div class="empty-icon">
              <i class="fas fa-paint-brush"></i>
            </div>
            <h3>Waiting for Generation</h3>
            <p>Fill in the prompt and optional reference images, then click Start Generation to create your AI image</p>
              </div>
              </div>
      </div>
    </div>

    <!-- Usage Tips -->
    <div class="usage-tips">
      <div class="tip-item">
        <span class="tip-icon">🎨</span>
        <span>Describe the image you want in English; the more detailed the prompt, the better the result</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch, nextTick } from 'vue'
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
const { showError } = useToast()
const { post } = useApi()
const { fetchPrices, getPrice, formatCredits, discount } = useModelPrice()
const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling()

onMounted(() => { fetchPrices() })
const batchUploadUrl = useBatchUploadUrl()
const { getUrlsForFiles } = useFileUploadUrlCache()

// 折扣文本
const discountText = computed(() => {
  const rate = Number(discount?.value ?? 1)
  if (Number.isNaN(rate) || rate <= 0 || rate === 1) return ''
  const percent = (rate * 100).toFixed(0)
  return ` · ${percent}%`
})

// 价格按分类匹配：Imagine -> midjourney_imagine（RULE，按 speed 匹配），Upscale/Vary -> ONCE
const MIDJOURNEY_PRICE_KEYS = { imagine: 'midjourney_imagine', upscale: 'midjourney_upscale', vary: 'midjourney_vary' }
const midjourneyPriceText = computed(() => {
  const key = MIDJOURNEY_PRICE_KEYS[activeCategory.value] || 'midjourney_imagine'
  const formFields = activeCategory.value === 'imagine'
    ? { duration: 0, quality: '', size: '', batchSize: 1, speed: form.speed, scene: 'generate' }
    : {}
  const credits = getPrice(key, formFields)
  const str = formatCredits(credits)
  if (!str) return ''
  return ` · ${str} credits${discountText.value}`
})

const loading = ref(false)
const results = ref([])

// 详情页：仅从 URL 读取 record-id
const routeRecordId = computed(() => route.query['record-id'] || '')
const isDetailView = computed(() => !!routeRecordId.value)
const detailData = ref(null)
const loadingRecordId = ref(null)

const detailOutputList = computed(() => {
  if (!detailData.value || !Array.isArray(detailData.value.outputUrls)) return []
  return detailData.value.outputUrls.map((url) => {
    const u = typeof url === 'string' ? url : url?.url ?? url?.imageUrl ?? ''
    const isImage = /\.(jpe?g|png|gif|webp)(\?|$)/i.test(u) || u.startsWith('data:image/')
    return { url: u, isImage }
  }).filter((x) => x.url)
})

function fillFormFromOriginalData(originalData) {
  if (!originalData || typeof originalData !== 'object') return
  const o = originalData
  if (o.taskType) form.taskType = String(o.taskType)
  if (o.prompt != null) form.prompt = String(o.prompt)
  if (o.speed) form.speed = String(o.speed)
  if (o.fileUrl) form.fileUrls = [o.fileUrl]
  if (Array.isArray(o.fileUrls)) form.fileUrls = [...o.fileUrls]
  if (o.aspectRatio) form.aspectRatio = String(o.aspectRatio)
  if (o.version) form.version = String(o.version)
  if (o.variety != null) form.variety = Number(o.variety)
  if (o.stylization != null) form.stylization = Number(o.stylization)
  if (o.weirdness != null) form.weirdness = Number(o.weirdness)
  if (o.waterMark != null) form.waterMark = String(o.waterMark)
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
  } finally {
    if (loadingRecordId.value === recordId) loadingRecordId.value = null
  }
}

watch(() => route.query['record-id'], (recordId) => {
  if (recordId) loadDetailByRecordId(recordId)
  else { loadingRecordId.value = null; detailData.value = null }
}, { immediate: true })

// 分类：imagine | upscale | vary，与三级路由同步：/home/midjourney/imagine、/upscale、/vary
const activeCategory = ref('imagine')
const validCategories = ['imagine', 'upscale', 'vary']

const midjourneyTabToPath = {
  imagine: '/home/midjourney/imagine',
  upscale: '/home/midjourney/upscale',
  vary: '/home/midjourney/vary'
}

const midjourneyPathToTab = {
  '/home/midjourney/imagine': 'imagine',
  '/home/midjourney/upscale': 'upscale',
  '/home/midjourney/vary': 'vary'
}

function getMidjourneyTabFromPath(path) {
  if (!path || typeof path !== 'string') return 'imagine'
  return midjourneyPathToTab[path] || 'imagine'
}

function goToMidjourneyTab(catId) {
  const path = midjourneyTabToPath[catId] || '/home/midjourney/imagine'
  router.push(path)
}

watch(() => route.path, (path) => {
  const tab = midjourneyPathToTab[path]
  if (tab && validCategories.includes(tab)) activeCategory.value = tab
}, { immediate: true })

// 分类选项（Imagine / Upscale / Vary，样式参考 Nano Banana）
const categoryOptions = ref([
  { id: 'imagine', name: 'Imagine', description: 'Create a new image generation task using the Midjourney AI model', icon: 'fas fa-wand-magic-sparkles' },
  { id: 'upscale', name: 'Upscale', description: 'Create an upscale task based on previously generated Midjourney images', icon: 'fas fa-expand-arrows-alt' },
  { id: 'vary', name: 'Vary', description: 'Create a vary task to enhance image clarity and simulate styles based on previously generated Midjourney images', icon: 'fas fa-palette' }
])

// Imagine 表单初始值（切换 Tab 时还原用）
const INIT_IMAGINE_FORM = {
  taskType: 'mj_txt2img',
  prompt: '',
  speed: 'relaxed',
  fileUrls: [],
  aspectRatio: '16:9',
  version: '7',
  variety: 10,
  stylization: 100,
  weirdness: 0,
  waterMark: ''
}
const form = reactive({ ...INIT_IMAGINE_FORM })

// Upscale 表单：taskId, imageIndex (0-3), waterMark
const INIT_UPSCALE_FORM = { taskId: '', imageIndex: 0, waterMark: '' }
const upscaleForm = reactive({ ...INIT_UPSCALE_FORM })

// Vary 表单：taskId, imageIndex (1-4), waterMark
const INIT_VARY_FORM = { taskId: '', imageIndex: 1, waterMark: '' }
const varyForm = reactive({ ...INIT_VARY_FORM })

// extend-list：Upscale/Vary 共用，用于 Task ID 下拉与 Image Index 图片选择
const EXTEND_LIST_MODEL = 'midjourney_imagine'
const extendList = ref([])
const loadingExtendList = ref(false)
const fetchExtendList = async () => {
  if (!process.client) return
  loadingExtendList.value = true
  try {
    const url = `/api/records/extend-list?model=${encodeURIComponent(EXTEND_LIST_MODEL)}`
    const headers = { Accept: 'application/json' }
    const token = getAuthToken()
    if (token) headers['Authorization'] = `Bearer ${token}`
    const res = await $fetch(url, { method: 'GET', headers, credentials: 'include' })
    // 接口返回 { errorCode, data: [...] }，直接取 data
    const rawList = (res && Array.isArray(res.data) ? res.data : Array.isArray(res) ? res : [])
    const list = rawList.map((x) => ({
      ...x,
      taskId: x.taskId != null ? String(x.taskId) : '',
      title: x.title != null ? String(x.title) : ''
    })).filter((x) => x.taskId)
    extendList.value = list
    await nextTick()
  } catch {
    extendList.value = []
  } finally {
    loadingExtendList.value = false
  }
}

watch(activeCategory, (cat) => {
  if (cat === 'upscale' || cat === 'vary') fetchExtendList()
  // 切换 Tab 时当前表单恢复为初始状态，三个表单互不影响
  if (cat === 'imagine') Object.assign(form, INIT_IMAGINE_FORM)
  else if (cat === 'upscale') Object.assign(upscaleForm, INIT_UPSCALE_FORM)
  else if (cat === 'vary') Object.assign(varyForm, INIT_VARY_FORM)
}, { immediate: true })

watch(() => upscaleForm.taskId, () => { upscaleForm.imageIndex = 0 })
watch(() => varyForm.taskId, () => { varyForm.imageIndex = 1 })

// 供模板使用的列表（computed 确保响应式更新后下拉选项重渲染）
const extendListOptions = computed(() => extendList.value || [])

// 当前选中的任务（用于展示 outputUrls）
const selectedExtendTask = computed(() => {
  const taskId = activeCategory.value === 'upscale' ? upscaleForm.taskId : varyForm.taskId
  if (!taskId || !extendList.value.length) return null
  return extendList.value.find((x) => x.taskId === taskId) || null
})
const selectedOutputUrls = computed(() => {
  const task = selectedExtendTask.value
  if (!task || !Array.isArray(task.outputUrls)) return []
  return task.outputUrls.filter((u) => typeof u === 'string' && u.trim())
})

const needFileUrlsButEmpty = computed(() => {
  if (form.taskType !== 'mj_img2img') return false
  return !form.fileUrls?.length
})

const fileUrlsUploadRef = ref(null)

const getAuthToken = () => {
  if (!process.client) return null
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

const handleFileUrlsUpdate = async (files) => {
  if (!files || (Array.isArray(files) && files.length === 0)) {
    form.fileUrls = []
    fileUrlsUploadRef.value?.clearFiles?.()
    return
  }
  const list = Array.isArray(files) ? files : [files]
  try {
    form.fileUrls = await getUrlsForFiles(list, uploadFilesToUrls)
  } catch (e) {
    showError(e.message || 'Failed to upload images')
    form.fileUrls = []
    fileUrlsUploadRef.value?.clearFiles?.()
  }
}

const pushResult = (data) => {
  results.value.unshift({ time: new Date().toISOString(), data })
}

const onSubmitImagine = async () => {
  const promptTrim = form.prompt?.trim()
  if (!promptTrim) {
    showError('Prompt cannot be empty')
    return
  }
  if (form.taskType === 'mj_img2img' && !form.fileUrls?.length) {
    showError('Input image(s) required for image-to-image')
    return 
  }
  loading.value = true
  try {
    const body = {
      taskType: form.taskType,
      prompt: promptTrim,
      aspectRatio: form.aspectRatio,
      version: form.version,
      variety: form.variety,
      stylization: form.stylization,
      weirdness: form.weirdness,
      speed: form.speed
    }
    if (form.fileUrls?.length) {
      body.fileUrls = form.fileUrls
      if (form.fileUrls.length === 1) body.fileUrl = form.fileUrls[0]
    }
    if (form.waterMark?.trim()) body.waterMark = form.waterMark.trim()
    const res = await post('/api/midjourney/imagine', body)
    const recordId = res?.recordId ?? res?.data?.recordId
    if (recordId) {
      router.push(`${midjourneyTabToPath[activeCategory.value] || '/home/midjourney/imagine'}?record-id=${encodeURIComponent(recordId)}`)
      return
    }
    pushResult(res)
    form.prompt = ''
    form.fileUrls = []
  } catch (e) {
    pushResult({ error: e?.message || String(e) })
    if (!e?.__fromApi) showError(e?.message || 'Request failed')
  } finally {
    loading.value = false
  }
}

const onSubmitUpscale = async () => {
  if (!upscaleForm.taskId?.trim()) {
    showError('Task ID is required')
    return 
  }
  loading.value = true
  try {
    const body = {
      taskId: upscaleForm.taskId.trim(),
      imageIndex: Number(upscaleForm.imageIndex)
    }
    if (upscaleForm.waterMark?.trim()) body.waterMark = upscaleForm.waterMark.trim()
    const res = await post('/api/midjourney/upscale', body)
    const recordId = res?.recordId ?? res?.data?.recordId
    if (recordId) {
      router.push(`${midjourneyTabToPath[activeCategory.value] || '/home/midjourney/imagine'}?record-id=${encodeURIComponent(recordId)}`)
      return
    }
    pushResult(res)
    upscaleForm.taskId = ''
    upscaleForm.imageIndex = 0
  } catch (e) {
    pushResult({ error: e?.message || String(e) })
    if (!e?.__fromApi) showError(e?.message || 'Request failed')
  } finally {
    loading.value = false
  }
}

const onSubmitVary = async () => {
  if (!varyForm.taskId?.trim()) {
    showError('Task ID is required')
    return 
  }
  loading.value = true
  try {
    const body = {
      taskId: varyForm.taskId.trim(),
      imageIndex: Number(varyForm.imageIndex)
    }
    if (varyForm.waterMark?.trim()) body.waterMark = varyForm.waterMark.trim()
    const res = await post('/api/midjourney/vary', body)
    const recordId = res?.recordId ?? res?.data?.recordId
    if (recordId) {
      router.push(`${midjourneyTabToPath[activeCategory.value] || '/home/midjourney/imagine'}?record-id=${encodeURIComponent(recordId)}`)
      return
    }
    pushResult(res)
    varyForm.taskId = ''
    varyForm.imageIndex = 1
  } catch (e) {
    pushResult({ error: e?.message || String(e) })
    if (!e?.__fromApi) showError(e?.message || 'Request failed')
  } finally {
    loading.value = false
  }
}

const clearResults = () => {
  results.value = [] 
}

const formatJson = (obj) => JSON.stringify(obj, null, 2)

const formatTime = (timeStr) => {
  return new Date(timeStr).toLocaleString('zh-CN')
}

const getResultType = (data) => {
  if (data.error) return 'Error'
  if (data.result) return 'Task ID: ' + data.result
  if (data.code === 1) return 'Submission Successful'
  if (data.code === 0) return 'Operation Completed'
  return 'Response'
}
</script>

<style scoped>
.midjourney-tool {
  width: 100%;
  height: 100%;
  padding: 20px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.category-desc {
  margin: 0 0 16px 0;
  font-size: 13px;
  color: #64748b;
  line-height: 1.5;
}

.input-hint-warn {
  color: #b45309;
}

.extend-image-index-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.extend-image-index-item {
  position: relative;
  aspect-ratio: 1;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  padding: 0;
  background: #f8fafc;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.extend-image-index-item:hover {
  border-color: #94a3b8;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.extend-image-index-item.selected {
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.3);
}

.extend-image-index-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.extend-image-index-item .index-badge {
  position: absolute;
  bottom: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
}

/* 分类切换：与 Ideogram/Nano Banana 一致 */
.mode-tabs-wrap {
  padding-bottom: 20px;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 20px;
}

.mode-tabs-wrap .mode-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 0;
}

.mode-tabs-wrap .mode-tab {
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

.mode-tabs-wrap .mode-tab:hover {
  border-color: #667eea;
  color: #667eea;
}

.mode-tabs-wrap .mode-tab.active {
  background: #667eea;
  color: #fff;
  border-color: #667eea;
}

/* 与 Ideogram/Nano Banana 一致：图标和文字不额外撑高 */
.mode-tabs-wrap .mode-tab i {
  font-size: 1em;
  margin-bottom: 0;
}
.mode-tabs-wrap .mode-tab span {
  font-weight: 500;
}

@media (max-width: 768px) {
  .mode-tabs-wrap .mode-tabs { gap: 6px; }
  .mode-tabs-wrap .mode-tab { padding: 8px 12px; font-size: 13px; }
}

.main-content {
  display: flex;
  flex: 1;
  min-height: 0;
  gap: 20px;
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
  overflow-y: auto;
}

.config-fieldset {
  border: none;
  margin: 0;
  padding: 0;
}

.config-header h4 {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}


/* 模式切换 */
.mode-tabs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 24px;
}

.mode-tab {
  padding: 16px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
}

.mode-tab:hover {
  background: #f8fafc;
  border-color: #667eea;
  color: #667eea;
}

.mode-tab.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

.mode-tab i {
  font-size: 20px;
  margin-bottom: 4px;
}

.mode-tab span {
  font-weight: 600;
}

.mode-tab small {
  font-size: 11px;
  opacity: 0.8;
  font-weight: 400;
}

/* 任务类型选择 */
.task-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.task-option {
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.task-option:hover {
  border-color: #667eea;
  background: #f8fafc;
}

.task-option input[type="radio"] {
  margin-right: 12px;
}

.option-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
}

.option-label i {
  color: #667eea;
}

.task-option:has(input:checked) {
  background: #667eea;
  border-color: #667eea;
}

.task-option:has(input:checked) .option-label {
  color: white;
}

.task-option:has(input:checked) .option-label i {
  color: white;
}

/* 表单样式 */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.form-group input,
.form-group textarea,
.form-group .form-select,
.form-input,
.form-select {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
}

.form-group .form-select,
.form-select {
  cursor: pointer;
  background: white;
}

/* Task Type / Speed 按钮组 */
.option-btn-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.option-btn {
  flex: 1;
  min-width: 100px;
  padding: 10px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  color: #64748b;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.option-btn:hover {
  background: #f8fafc;
  border-color: #667eea;
  color: #667eea;
}

.option-btn.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

/* Aspect Ratio / Version 下拉优化 */
.form-select-enhanced {
  padding: 10px 36px 10px 14px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background-color: #f8fafc;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  appearance: none;
  -webkit-appearance: none;
  font-size: 14px;
  color: #334155;
}

.form-select-enhanced:hover {
  border-color: #cbd5e1;
  background-color: #fff;
}

.form-select-enhanced:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
}

/* 与全局 .select-with-arrow 统一样式：去掉背景箭头、统一圆角与焦点色 */
.select-with-arrow .form-select-enhanced {
  padding: 12px 36px 12px 16px;
  border-radius: 8px;
  background-color: #fff;
  background-image: none;
}
.select-with-arrow .form-select-enhanced:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.input-hint {
  font-size: 12px;
  color: #64748b;
  margin-top: 4px;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.char-count {
  text-align: right;
  font-size: 12px;
  color: #64748b;
  margin-top: 4px;
}

/* 高级参数 */
.advanced-params {
  margin: 24px 0;
}


/* 滑块样式 */
.slider-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.slider {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: #e5e7eb;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #667eea;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #667eea;
  cursor: pointer;
  border: none;
}

.slider-value {
  min-width: 40px;
  text-align: center;
  font-weight: 600;
  color: #667eea;
}

/* 选择器样式 */
.select-wrapper {
  position: relative;
}

.select-wrapper select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 40px;
}

.select-wrapper i {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  pointer-events: none;
}

/* 复选框样式 */
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.checkbox-text {
  font-size: 14px;
  color: #374151;
}

/* 单选按钮组 */
.radio-group {
  display: flex;
  gap: 16px;
}

.radio-item {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.radio-item input[type="radio"] {
  margin-right: 8px;
  width: auto;
}

.radio-label {
  font-size: 14px;
  color: #374151;
}

/* 其他设置 */
.other-settings {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e2e8f0;
}

.form-help {
  font-size: 12px;
  color: #64748b;
  margin-top: 4px;
  line-height: 1.4;
}

.form-actions {
  margin-top: 24px;
  padding-bottom: 20px;
}

.btn-primary {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #667eea, #764ba2);
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
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.results-display-panel {
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

.results-header {
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.results-header h4 {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.results-container {
  flex: 1;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}

/* 结果展示区域 */
.results-showcase {
  width: 100%;
  max-width: 100%;
}

.result-item {
  width: 100%;
  background: #f8fafc;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
}

.result-preview {
  width: 100%;
  aspect-ratio: 16/9;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.result-preview img,
.result-preview video {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.result-details {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.result-time {
  font-size: 12px;
  color: #64748b;
}

.result-type {
  font-size: 12px;
  font-weight: 600;
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  padding: 4px 8px;
  border-radius: 4px;
}

.result-content {
  padding: 16px;
}

.result-json {
  width: 100%;
  margin: 0;
  font-size: 12px;
  color: #0f172a;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px;
  overflow: auto;
  max-height: 300px;
}

.file-count {
  font-size: 12px;
  color: #667eea;
  font-weight: 500;
  margin-top: 4px;
}

.file-preview {
  font-size: 12px;
  color: #10b981;
  font-weight: 500;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}


.checkbox-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
}

.result-meta {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #64748b;
  flex-wrap: wrap;
}

.result-actions {
  display: flex;
  gap: 8px;
}

.btn-secondary,
.btn-icon {
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  background: white;
  color: #64748b;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.btn-secondary:hover,
.btn-icon:hover {
  background: #e2e8f0;
  color: #475569;
}

/* 空状态 */
.detail-loading-state, .detail-failure-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; padding: 40px; text-align: center;
}
.detail-spinner { font-size: 48px; color: #667eea; }
.detail-loading-state p, .detail-failure-state p { margin: 0; font-size: 16px; color: #64748b; }
.detail-failure-state .failure-icon { font-size: 56px; color: #ef4444; }
.detail-failure-state .failure-message { max-width: 420px; line-height: 1.6; color: #374151; }
.detail-output-image { max-width: 100%; height: auto; border-radius: 8px; }

.empty-state {
  text-align: center;
  color: #64748b;
  max-width: 500px;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.empty-icon {
  font-size: 72px;
  color: #cbd5e1;
  margin-bottom: 24px;
}

.empty-state h3 {
  font-size: 28px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 12px 0;
}

.empty-state p {
  font-size: 16px;
  margin: 0 0 32px 0;
  line-height: 1.6;
}

.empty-features {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
  font-size: 16px;
  color: #64748b;
  padding: 8px 16px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: rgba(102, 126, 234, 0.15);
  transform: translateY(-2px);
}

.feature-item i {
  color: #667eea;
  width: 20px;
  font-size: 18px;
}

/* 提示面板 */
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

.tip-item strong {
  color: #374151;
}


/* 比例选择tabs */
.ratio-tabs {
  display: flex;
  gap: 8px;
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
}

.ratio-tab {
  flex: 1;
  padding: 12px 16px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  text-align: center;
}

.ratio-tab:hover {
  background: #f8fafc;
  border-color: #667eea;
  color: #374151;
}

.ratio-tab.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .main-content {
    flex-direction: column;
  }
  
  .config-panel,
  .results-display-panel {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .midjourney-tool {
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
  
  .ratio-tabs {
    flex-direction: column;
    gap: 4px;
  }
  
  .ratio-tab {
    padding: 10px 12px;
    font-size: 13px;
  }
  
  .main-content {
    flex-direction: column;
    padding: 16px;
    gap: 16px;
  }
  
  .config-panel {
    order: 2;
  }
  
  .results-display-panel {
    order: 1;
    min-height: 300px;
  }
  
  .tool-header {
    padding: 12px 16px;
  }
  
  .mode-tabs {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
  
  .mode-tab {
    padding: 12px 8px;
    font-size: 12px;
  }
  
  .mode-tab i {
    font-size: 16px;
  }
  
  .checkbox-row {
    flex-direction: column;
    gap: 8px;
  }
  
  .empty-features {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .feature-item {
    flex: 1;
    min-width: 120px;
  }
}
</style>
