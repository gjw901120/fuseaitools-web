<template>
  <div class="qwen-tool">
    <div class="tool-header">
      <div class="tool-avatar">
        <img src="/tools-logo/QWen.png" alt="Qwen" />
      </div>
      <div class="tool-details">
        <h3>Qwen</h3>
        <p>Text-to-image, image-to-image, image-edit, and Z-Image. Control size, inference steps, guidance scale, seed, acceleration, and safety checker. Prompt max 5000 (text/i2i), 2000 (edit), or 1000 (Z-Image).</p>
      </div>
    </div>

    <div class="mode-section">
      <div class="mode-tabs mode-tabs-four">
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
          <fieldset class="config-fieldset" :disabled="isGenerating">
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
            <div v-if="mode === 'image-to-image' || mode === 'image-edit'" class="form-group">
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
            <div v-if="mode === 'text-to-image' || mode === 'image-edit'" class="form-group">
              <label for="qwen-imageSize" class="form-label">Image Size</label>
              <div class="select-with-arrow">
                <select id="qwen-imageSize" v-model="formData.imageSize" class="form-input">
                  <option value="square">Square</option>
                  <option value="square_hd">Square HD</option>
                  <option value="portrait_4_3">Portrait 3:4</option>
                  <option value="portrait_16_9">Portrait 9:16</option>
                  <option value="landscape_4_3">Landscape 4:3</option>
                  <option value="landscape_16_9">Landscape 16:9</option>
                </select>
                <i class="fas fa-chevron-down select-arrow-icon"></i>
              </div>
            </div>

            <!-- z-image: aspectRatio required -->
            <div v-if="mode === 'z-image'" class="form-group">
              <label for="qwen-aspectRatio" class="form-label">Aspect Ratio <span class="required">*</span></label>
              <div class="select-with-arrow">
                <select id="qwen-aspectRatio" v-model="formData.aspectRatio" class="form-input" required>
                  <option value="1:1">1:1</option>
                  <option value="4:3">4:3</option>
                  <option value="3:4">3:4</option>
                  <option value="16:9">16:9</option>
                  <option value="9:16">9:16</option>
                </select>
                <i class="fas fa-chevron-down select-arrow-icon"></i>
              </div>
            </div>

            <!-- numInferenceSteps: text-to-image, image-to-image, image-edit -->
            <div v-if="mode !== 'z-image'" class="form-group">
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
            <div v-if="mode !== 'z-image'" class="form-group">
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
              <label for="qwen-numImages" class="form-label">Num Images</label>
              <div class="select-with-arrow">
                <select id="qwen-numImages" v-model="formData.numImages" class="form-input">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                <i class="fas fa-chevron-down select-arrow-icon"></i>
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
              <label for="qwen-outputFormat" class="form-label">Output Format</label>
              <div class="select-with-arrow">
                <select id="qwen-outputFormat" v-model="formData.outputFormat" class="form-input">
                  <option value="png">PNG</option>
                  <option value="jpeg">JPEG</option>
                </select>
                <i class="fas fa-chevron-down select-arrow-icon"></i>
              </div>
            </div>
            <div v-if="mode !== 'z-image'" class="form-group">
              <label for="qwen-acceleration" class="form-label">Acceleration</label>
              <div class="select-with-arrow">
                <select id="qwen-acceleration" v-model="formData.acceleration" class="form-input">
                  <option value="none">None</option>
                  <option value="regular">Regular</option>
                  <option value="high">High</option>
                </select>
                <i class="fas fa-chevron-down select-arrow-icon"></i>
              </div>
              <div class="form-hint">Higher = faster. High recommended for images without text.</div>
            </div>
            <div v-if="mode !== 'z-image'" class="form-group">
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
            <div v-if="mode !== 'z-image'" class="form-group">
              <label class="checkbox-label">
                <input v-model="formData.enableSafetyChecker" type="checkbox" />
                <span>Enable safety checker</span>
              </label>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn-primary" :disabled="!canGenerate || isGenerating">
                <i v-if="isGenerating" class="fas fa-spinner fa-spin"></i>
                <i v-else class="fas fa-magic"></i>
                {{ isGenerating ? 'Generating...' : 'Generate Image' }}
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
import { ref, reactive, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import UploadImage from './common/UploadImage.vue'
import { useToast } from '~/composables/useToast'
import { useApi } from '~/composables/useApi'
import { useRecordPolling } from '~/composables/useRecordPolling'

const router = useRouter()
const route = useRoute()
const { showError } = useToast()
const { post } = useApi()
const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling()

const modeList = [
  { id: 'text-to-image', label: 'Text to Image', icon: 'fas fa-font' },
  { id: 'image-to-image', label: 'Image to Image', icon: 'fas fa-image' },
  { id: 'image-edit', label: 'Image Edit', icon: 'fas fa-edit' },
  { id: 'z-image', label: 'Z-Image', icon: 'fas fa-square' }
]

const modeTabToPath = {
  'text-to-image': '/home/qwen/text-to-image',
  'image-to-image': '/home/qwen/image-to-image',
  'image-edit': '/home/qwen/image-edit',
  'z-image': '/home/qwen/z-image'
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

const imageUploadRef = ref(null)
const isUploadingImage = ref(false)
const result = ref(null)
const isGenerating = ref(false)
const routeRecordId = computed(() => route.query['record-id'] || '')
const isDetailView = computed(() => !!routeRecordId.value)
const detailData = ref(null)

const promptMaxLength = computed(() => {
  if (mode.value === 'image-edit') return 2000
  if (mode.value === 'z-image') return 1000
  return 5000
})

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
  const res = await fetch('/api/common/batch-upload', {
    method: 'POST',
    headers,
    body: form,
    credentials: 'include'
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.errorMessage || err?.message || 'Upload failed')
  }
  const data = await res.json()
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
  if (mode.value === 'image-to-image' || mode.value === 'image-edit') return !!formData.imageUrl
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
    if (data != null && Number(data.status) === 1) {
      const res = await pollRecordByStatus(recordId, { getIsCancelled: () => routeRecordId.value !== recordId })
      if (routeRecordId.value === recordId) detailData.value = res
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
    showError(err?.message || 'Generation failed')
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
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
}
.tool-avatar { width: 48px; height: 48px; border-radius: 12px; overflow: hidden; flex-shrink: 0; }
.tool-avatar img { width: 100%; height: 100%; object-fit: contain; }
.tool-details h3 { margin: 0 0 4px 0; font-size: 20px; font-weight: 600; color: #1f2937; }
.tool-details p { margin: 0; font-size: 13px; color: #6b7280; line-height: 1.5; }

.mode-section { margin-bottom: 24px; padding: 20px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; }
.mode-tabs { display: grid; gap: 8px; }
.mode-tabs-four { grid-template-columns: repeat(4, 1fr); }
.mode-tab {
  display: flex; flex-direction: column; align-items: center; padding: 10px 6px;
  background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; cursor: pointer; transition: all 0.2s; text-align: center;
}
.mode-tab:hover { border-color: #3b82f6; background: rgba(59,130,246,0.05); }
.mode-tab.active { border-color: #3b82f6; background: #3b82f6; color: #fff; }
.mode-tab i { font-size: 14px; margin-bottom: 2px; }
.mode-tab span { font-size: 11px; font-weight: 500; }

.main-content { display: flex; flex: 1; min-height: 0; gap: 20px; }
.config-panel {
  width: 35%; background: #f8fafc; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0;
  display: flex; flex-direction: column; min-height: 0;
}
.config-header { margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid #e2e8f0; }
.config-header h4 { margin: 0; font-size: 18px; font-weight: 600; color: #1f2937; }
.config-fieldset { border: none; margin: 0; padding: 0; }
.config-form { display: flex; flex-direction: column; gap: 16px; flex: 1; overflow-y: auto; }

.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-label { font-size: 14px; font-weight: 500; color: #374151; }
.required { color: #ef4444; }
.form-input { padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; }
.form-input:focus { outline: none; border-color: #3b82f6; }
.form-hint { font-size: 12px; color: #6b7280; line-height: 1.4; }
.char-count { font-size: 12px; color: #6b7280; text-align: right; }
.select-with-arrow { position: relative; }
.select-with-arrow .form-input { width: 100%; appearance: none; padding-right: 32px; }
.select-arrow-icon { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); pointer-events: none; color: #6b7280; }

.checkbox-label { display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px; color: #374151; }
.checkbox-label input[type="checkbox"] { width: 16px; height: 16px; accent-color: #3b82f6; }

.form-actions { margin-top: 24px; padding-bottom: 20px; }
.btn-primary {
  width: 100%; padding: 16px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: #fff; border: none;
  border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
}
.btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(59,130,246,0.3); }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

.result-panel {
  width: 65%; background: #fff; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; min-height: 400px; display: flex; flex-direction: column;
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

@media (max-width: 1200px) {
  .mode-tabs-four { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 1024px) {
  .main-content { flex-direction: column; }
  .config-panel, .result-panel { width: 100%; }
}
@media (max-width: 768px) {
  .mode-tabs-four { grid-template-columns: 1fr; }
}
</style>
