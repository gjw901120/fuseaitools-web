<template>
  <div class="imagen4-tool">
    <div class="tool-header">
      <div class="tool-avatar">
        <img src="/tools-logo/Imagen4.png" alt="Imagen4" />
      </div>
      <div class="tool-details">
        <h3>Imagen4</h3>
        <p class="tool-description">Google Imagen 4 series for high-quality text-to-image generation with fast and ultra variants.</p>
      </div>
    </div>

    <div class="mode-tabs-wrap">
      <div class="mode-tabs">
        <div v-for="m in modeList" :key="m.id" class="mode-tab" :class="{ active: mode === m.id }" @click="goToTab(m.id)">
          <i :class="m.icon"></i>
          <span>{{ m.label }}</span>
        </div>
      </div>
    </div>

    <div class="main-content">
      <div class="config-panel">
        <div class="config-header"><h4>Configuration</h4></div>
        <form class="config-form" @submit.prevent="generate">
          <fieldset class="config-fieldset" :disabled="isGenerating || isDetailView">
            <div class="form-group">
              <label class="form-label">Prompt <span class="required">*</span></label>
              <textarea v-model="formData.prompt" class="form-input" rows="4" maxlength="5000" placeholder="Prompt (max 5000)" required></textarea>
              <div class="char-count" v-if="formData.prompt">{{ formData.prompt.length }}/5000</div>
            </div>

            <div class="form-group">
              <label class="form-label">Negative Prompt</label>
              <textarea v-model="formData.negativePrompt" class="form-input" rows="3" maxlength="5000" placeholder="Negative prompt (optional)"></textarea>
              <div class="char-count" v-if="formData.negativePrompt">{{ formData.negativePrompt.length }}/5000</div>
            </div>

            <div class="form-group">
              <label class="form-label">Aspect Ratio</label>
              <div class="tab-group">
                <button v-for="ratio in aspectRatios" :key="ratio" type="button" class="tab-option" :class="{ active: formData.aspectRatio === ratio }" @click="formData.aspectRatio = ratio">{{ ratio }}</button>
              </div>
            </div>

            <div class="form-group" v-if="mode === 'imagen4-fast'">
              <label class="form-label">Num Images</label>
              <div class="tab-group">
                <button v-for="n in ['1','2','3','4']" :key="n" type="button" class="tab-option" :class="{ active: formData.numImages === n }" @click="formData.numImages = n">{{ n }}</button>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Seed</label>
              <input v-if="mode === 'imagen4-fast'" v-model.number="formData.seedNumber" type="number" class="form-input" placeholder="Optional integer seed" />
              <input v-else v-model="formData.seedText" type="text" class="form-input" maxlength="500" placeholder="Optional seed (max 500 chars)" />
            </div>

            <div class="form-actions">
              <button type="submit" class="btn-primary" :disabled="!canGenerate || isGenerating || isDetailView">
                <i v-if="isGenerating" class="fas fa-spinner fa-spin"></i>
                <i v-else class="fas fa-magic"></i>
                {{ isGenerating ? 'Generating...' : 'Generate Image' }}
                <span v-if="imagen4PriceText" class="price-tag">{{ imagen4PriceText }}</span>
              </button>
            </div>
          </fieldset>
        </form>
      </div>

      <div class="result-panel">
        <div v-if="isDetailView && detailData?.status === 3" class="detail-failure-state">
          <div class="failure-icon"><i class="fas fa-exclamation-circle"></i></div>
          <p class="failure-message">Generation failed. You can try again with different parameters.</p>
        </div>
        <div v-else-if="isDetailView && (!detailData || detailData.status === 1)" class="detail-loading-state">
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
              <button @click="downloadImage" class="action-btn"><i class="fas fa-download"></i> Download</button>
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

const modeList = [
  { id: 'imagen4-generate', label: 'Imagen4 Generate', icon: 'fas fa-image' },
  { id: 'imagen4-fast', label: 'Imagen4 Fast', icon: 'fas fa-bolt' },
  { id: 'imagen4-ultra', label: 'Imagen4 Ultra', icon: 'fas fa-star' }
]
const modeTabToPath = {
  'imagen4-generate': '/home/imagen4/imagen4-generate',
  'imagen4-fast': '/home/imagen4/imagen4-fast',
  'imagen4-ultra': '/home/imagen4/imagen4-ultra'
}
const pathToMode = {}
Object.keys(modeTabToPath).forEach(k => { pathToMode[modeTabToPath[k]] = k })

const mode = ref('imagen4-generate')
function goToTab(m) {
  mode.value = m
  router.push(modeTabToPath[m] || modeTabToPath['imagen4-generate'])
}
watch(() => route.path, (path) => {
  const m = pathToMode[path]
  if (m && mode.value !== m) {
    mode.value = m
  }
}, { immediate: true })
watch(mode, (m) => {
  if (m === 'imagen4-fast') {
    formData.aspectRatio = '16:9'
  } else {
    formData.aspectRatio = '1:1'
  }
})

const aspectRatios = ['1:1', '16:9', '9:16', '3:4', '4:3']
const formData = reactive({
  prompt: '',
  negativePrompt: '',
  aspectRatio: '1:1',
  numImages: '1',
  seedText: '',
  seedNumber: null
})

const discountText = computed(() => {
  const rate = Number(discount?.value ?? 1)
  if (Number.isNaN(rate) || rate <= 0 || rate === 1) return ''
  return ` · ${(rate * 100).toFixed(0)}%`
})
const imagen4PriceText = computed(() => {
  const key = mode.value
  const credits = key === 'imagen4-ultra' ? getPrice('imagen4-ultra') : getPrice(key)
  const str = formatCredits(credits)
  if (!str) return ''
  return `· ${str} credits${discountText.value}`
})

const result = ref(null)
const isGenerating = ref(false)
const routeRecordId = computed(() => route.query['record-id'] || '')
const isDetailView = computed(() => !!routeRecordId.value)
const detailData = ref(null)
const canGenerate = computed(() => {
  const p = (formData.prompt || '').trim()
  if (p.length === 0 || p.length > 5000) return false
  return true
})

const displayResult = computed(() => {
  if (isDetailView.value && detailData.value?.status === 2 && detailData.value?.outputUrls?.length) {
    const url = typeof detailData.value.outputUrls[0] === 'string' ? detailData.value.outputUrls[0] : detailData.value.outputUrls[0]?.url
    return { imageUrl: url }
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
    const status = Number(data?.status)
    if (data == null || status === 0 || status === 1) {
      const res = await pollRecordByStatus(recordId, { getIsCancelled: () => routeRecordId.value !== recordId })
      if (routeRecordId.value === recordId) detailData.value = res
    }
  } catch (e) { console.error('Imagen4 load record detail failed:', e) }
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
    let apiPath = '/api/image/imagen4/generate'
    if (modeVal === 'imagen4-fast') apiPath = '/api/image/imagen4/fast-generate'
    if (modeVal === 'imagen4-ultra') apiPath = '/api/image/imagen4/ultra-generate'
    const body = {
      model: modeVal,
      prompt: p,
      negativePrompt: (formData.negativePrompt || '').trim() || undefined,
      aspectRatio: formData.aspectRatio || (modeVal === 'imagen4-fast' ? '16:9' : '1:1')
    }
    if (modeVal === 'imagen4-fast') {
      body.numImages = formData.numImages
      if (formData.seedNumber != null && formData.seedNumber !== '') body.seed = Number(formData.seedNumber)
    } else if (formData.seedText) {
      body.seed = formData.seedText
    }
    const data = await post(apiPath, body)
    const rid = data?.recordId ?? data?.data?.recordId ?? data?.data?.id ?? data?.id
    if (rid) {
      const target = (modeTabToPath[modeVal] || '/home/imagen4/imagen4-generate') + '?record-id=' + encodeURIComponent(rid)
      detailData.value = null
      result.value = null
      await router.push(target)
      if (routeRecordId.value === String(rid)) {
        loadDetailByRecordId(String(rid))
      }
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
    const a = document.createElement('a')
    a.href = displayResult.value.imageUrl
    a.download = `imagen4-${Date.now()}.png`
    a.click()
  }
}
</script>

<style scoped>
.imagen4-tool { width: 100%; height: 100%; padding: 20px; background: #fff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); display: flex; flex-direction: column; }
.tool-header { display: flex; align-items: center; gap: 16px; padding-bottom: 20px; border-bottom: 1px solid #e2e8f0; margin-bottom: 20px; }
.tool-avatar { width: 48px; height: 48px; border-radius: 12px; overflow: hidden; flex-shrink: 0; }
.tool-avatar img { width: 100%; height: 100%; object-fit: cover; }
.tool-details h3 { margin: 0 0 4px 0; font-size: 20px; font-weight: 600; color: #1f2937; }
.tool-details p { margin: 0; font-size: 13px; color: #6b7280; line-height: 1.5; }
.mode-tabs-wrap { padding-bottom: 20px; border-bottom: 1px solid #e2e8f0; margin-bottom: 20px; }
.mode-tabs { display: flex; flex-wrap: wrap; gap: 8px; }
.mode-tab { padding: 9px 14px; border: 1px solid #e2e8f0; background: #fff; color: #64748b; border-radius: 8px; cursor: pointer; font-size: 14px; display: flex; align-items: center; gap: 6px; }
.mode-tab:hover { border-color: #3b82f6; color: #3b82f6; }
.mode-tab.active { background: #3b82f6; color: #fff; border-color: #3b82f6; }
.main-content { display: flex; flex: 1; min-height: 0; gap: 20px; }
.config-panel { width: 35%; background: #f8fafc; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; min-height: 0; }
.config-header { margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid #e2e8f0; }
.config-header h4 { margin: 0; font-size: 18px; font-weight: 600; color: #1f2937; }
.config-fieldset { border: none; margin: 0; padding: 0; }
.config-form { display: flex; flex-direction: column; gap: 16px; flex: 1; overflow-y: auto; }
.form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 24px; }
.form-label { font-size: 14px; font-weight: 500; color: #374151; }
.required { color: #ef4444; }
.form-input { padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; }
.form-input:focus { outline: none; border-color: #3b82f6; }
.form-hint { font-size: 12px; color: #6b7280; line-height: 1.4; }
.char-count { font-size: 12px; color: #6b7280; text-align: right; }
.tab-group { display: flex; gap: 8px; flex-wrap: wrap; }
.tab-option { flex: 1; min-width: 60px; padding: 10px 12px; border: 2px solid #e2e8f0; border-radius: 8px; background: #f8fafc; color: #374151; cursor: pointer; font-size: 13px; font-weight: 500; display: flex; align-items: center; justify-content: center; }
.tab-option:hover { background: rgba(59, 130, 246, 0.05); border-color: #3b82f6; color: #3b82f6; }
.tab-option.active { border-color: #3b82f6; background: #3b82f6; color: #fff; }
.form-actions { margin-top: 24px; padding-bottom: 20px; }
.btn-primary { width: 100%; padding: 16px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: #fff; border: none; border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; }
.btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(59,130,246,0.3); }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
.price-tag { font-size: 15px; opacity: 0.8; margin-left: 4px; }
.result-panel { width: 65%; background: #fff; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; min-height: 400px; display: flex; flex-direction: column; }
.empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; text-align: center; color: #6b7280; gap: 16px; }
.empty-state h4 { margin: 0; font-size: 18px; color: #374151; }
.image-result { display: flex; flex-direction: column; gap: 16px; }
.result-image { width: 100%; height: auto; border-radius: 8px; display: block; }
.image-actions { display: flex; gap: 8px; }
.action-btn { background: #f3f4f6; color: #374151; border: 1px solid #d1d5db; padding: 8px 12px; border-radius: 6px; font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 4px; }
.action-btn:hover { background: #e5e7eb; }
.detail-loading-state, .detail-failure-state { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; padding: 40px; text-align: center; }
.detail-spinner { font-size: 48px; color: #3b82f6; }
.detail-loading-state p, .detail-failure-state p { margin: 0; font-size: 16px; color: #64748b; }
.detail-failure-state .failure-icon { font-size: 56px; color: #ef4444; }
@media (max-width: 1024px) { .main-content { flex-direction: column; } .config-panel, .result-panel { width: 100%; } }
</style>
