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
        class="mode-tab"
        :class="{ active: mode === 'text-to-image' }"
        @click="goToTab('text-to-image')"
      >
        <i class="fas fa-keyboard"></i>
        <span>text-to-image</span>
      </div>
      <div
        class="mode-tab"
        :class="{ active: mode === 'image-to-image' }"
        @click="goToTab('image-to-image')"
      >
        <i class="fas fa-image"></i>
        <span>image-to-image</span>
      </div>
    </div>

    <div class="main-content">
      <div class="config-panel">
        <div class="config-header">
          <h4>{{ mode === 'text-to-image' ? 'Text to Image' : 'Image to Image' }}</h4>
        </div>
        <form class="config-form" @submit.prevent="onSubmit">
          <fieldset class="config-fieldset" :disabled="isGenerating || isDetailView">

            <!-- image-to-image only: upload input -->
            <div v-if="mode === 'image-to-image'" class="form-group">
              <label>Reference Image *</label>
              <span v-if="isUploadingImage" class="form-hint"><i class="fas fa-spinner fa-spin"></i> Uploading...</span>
              <UploadImage
                ref="imageUploadRef"
                input-id="gpt-image-upload"
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
              <div v-if="isDetailView && mode === 'image-to-image' && form.input_urls?.length" class="detail-ref-urls">
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
                maxlength="3000"
                :placeholder="mode === 'text-to-image' ? 'Describe the image you want to generate...' : 'Describe the edit you want (e.g. change clothing, style)...'"
                required
              />
              <div class="char-count">{{ form.prompt.length }}/3000</div>
            </div>

            <!-- Aspect Ratio -->
            <div class="form-group">
              <label>Aspect Ratio *</label>
              <div class="tab-group">
                <button
                  type="button"
                  class="tab-option"
                  :class="{ active: form.aspect_ratio === '1:1' }"
                  @click="form.aspect_ratio = '1:1'"
                >
                  1:1
                </button>
                <button
                  type="button"
                  class="tab-option"
                  :class="{ active: form.aspect_ratio === '2:3' }"
                  @click="form.aspect_ratio = '2:3'"
                >
                  2:3
                </button>
                <button
                  type="button"
                  class="tab-option"
                  :class="{ active: form.aspect_ratio === '3:2' }"
                  @click="form.aspect_ratio = '3:2'"
                >
                  3:2
                </button>
              </div>
            </div>

            <!-- Quality + Credits -->
            <div class="form-group">
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
          <h4>Result</h4>
          <button v-if="!isDetailView && results.length > 0" type="button" class="btn-secondary" @click="clearResults">
            <i class="fas fa-trash"></i> Clear
          </button>
        </div>
        <div class="result-container">
          <div v-if="!isDetailView && route.path === '/home/gpt-image/text-to-image'" class="tutorial-showcase">
            <p class="tutorial-showcase-title">🎨 Tutorial Showcase</p>
            <div class="tutorial-showcase-links">
              <a href="https://www.fuseaitools.com/news/gpt-image-candid-street-fashion-tutorial" target="_blank" rel="noopener noreferrer" class="tutorial-link">Use AI to create natural candid fashion editorials - no more stiff poses</a>
              <a href="https://www.fuseaitools.com/news/gpt-image-pet-emotional-portrait-tutorial" target="_blank" rel="noopener noreferrer" class="tutorial-link">Capture the story in your pet's eyes with AI - create heartfelt emotional imagery</a>
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
import { ref, reactive, computed, watch } from 'vue'
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
const { discount } = useModelPrice()

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
  'image-to-image': '/home/gpt-image/image-to-image'
}
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
const form = reactive({
  prompt: '',
  aspect_ratio: '1:1',
  quality: 'medium',
  input_urls: []
})

// 折扣文本
const discountText = computed(() => {
  const rate = Number(discount?.value ?? 1)
  if (Number.isNaN(rate) || rate <= 0 || rate === 1) return ''
  const percent = (rate * 100).toFixed(0)
  return ` · ${percent}%`
})

// 模型价格配置（按 size 匹配 Quality，仅使用 credits）
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
  }
})

const currentModelKey = computed(() =>
  mode.value === 'text-to-image'
    ? 'gpt-image-1.5-text-to-image'
    : 'gpt-image-1.5-image-to-image'
)

const currentCredits = computed(() => {
  const key = currentModelKey.value
  const cfg = modelPricing[key]
  if (!cfg || !Array.isArray(cfg.rules)) return null
  const rule = cfg.rules.find(r => r.size === form.quality)
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
    form.input_urls = await getUrlsForFiles(list, uploadFilesToUrls)
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
  if (mode.value === 'image-to-image') {
    return Array.isArray(form.input_urls) && form.input_urls.length > 0
  }
  return true
})

const onSubmit = async () => {
  if (!canSubmit.value) return
  if (form.prompt.length > 3000) {
    showError('Prompt cannot exceed 3000 characters')
    return
  }

  isGenerating.value = true
  try {
    const modeVal = mode.value
    const apiPath = modeVal === 'text-to-image'
      ? '/api/image/gpt-image/text-to-image'
      : '/api/image/gpt-image/image-to-image'
    const body = {
      model: modeVal === 'text-to-image' ? 'gpt-image-1.5-text-to-image' : 'gpt-image-1.5-image-to-image',
      prompt: form.prompt.trim(),
      aspectRatio: form.aspect_ratio,
      quality: form.quality
    }
    if (modeVal === 'image-to-image' && form.input_urls?.length) {
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
.tool-details h3 { margin: 0; font-size: 18px; font-weight: 600; color: #1f2937; }
.tool-details .tool-description { margin: 0; font-size: 14px; color: #6b7280; }

.mode-tabs { display: flex; gap: 8px; padding-bottom: 20px; border-bottom: 1px solid #e2e8f0; margin-bottom: 20px; }
.mode-tab { padding: 10px 16px; border: 1px solid #e2e8f0; background: #fff; color: #64748b; border-radius: 8px; cursor: pointer; transition: all .2s; display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 500; }
.mode-tab:hover { border-color: #3b82f6; color: #3b82f6; }
.mode-tab.active { background: #3b82f6; color: #fff; border-color: #3b82f6; }

.main-content { display: flex; flex: 1; min-height: 0; gap: 20px; }
.config-panel { width: 36%; background: #f8fafc; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; min-height: 0; }
.config-header { padding-bottom: 16px; border-bottom: 1px solid #e2e8f0; margin-bottom: 16px; }
.config-header h4 { margin: 0; font-size: 16px; font-weight: 600; color: #1e293b; }
.config-fieldset { border: none; margin: 0; padding: 0; }

.form-group { margin-bottom: 18px; }
.form-group label { display: block; font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 8px; }
.form-group textarea { width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; box-sizing: border-box; resize: vertical; }
.form-group textarea:focus { outline: none; border-color: #3b82f6; }
.char-count { text-align: right; font-size: 12px; color: #64748b; margin-top: 4px; }
.form-help { font-size: 12px; color: #6b7280; margin-top: 4px; }
.form-hint { font-size: 12px; color: #64748b; }

.tab-group { display: flex; gap: 8px; flex-wrap: wrap; }
.tab-option { flex: 1; min-width: 60px; padding: 10px 14px; border: 1px solid #e5e7eb; background: #fff; color: #64748b; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; }
.tab-option:hover { border-color: #3b82f6; color: #3b82f6; }
.tab-option.active { background: #3b82f6; color: #fff; border-color: #3b82f6; }

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
.btn-secondary:hover { border-color: #3b82f6; color: #3b82f6; }

.detail-loading-state, .detail-failure-state { width: 100%; text-align: center; padding: 40px 20px; color: #64748b; }
.detail-loading-state i, .detail-failure-state i { font-size: 32px; margin-bottom: 12px; display: block; }
.detail-failure-state { color: #dc2626; }

@media (max-width: 1024px) {
  .main-content { flex-direction: column; }
  .config-panel { width: 100%; }
}
</style>
