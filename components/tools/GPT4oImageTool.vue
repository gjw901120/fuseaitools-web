<template>
  <div class="gpt4o-image-tool">
    <!-- Tool Header -->
    <div class="tool-header">
      <div class="header-left">
        <div class="tool-icon">
          <img src="/tools-logo/ChatGpt.png" alt="GPT-4o Image" />
        </div>
        <div class="tool-info">
          <h3>GPT 4o Image</h3>
          <p>OpenAI GPT-4o image generation tool</p>
        </div>
      </div>
    </div>

    <!-- Main Content Area: Left (1/3) and Right (2/3) -->
    <div class="main-content">
      <!-- Left: Parameter Configuration Panel -->
      <div class="config-panel">
        <div class="config-header">
          <h4>Image Generation Configuration</h4>
        </div>

        <form class="config-form" @submit.prevent="generateImage">
          <fieldset class="config-fieldset" :disabled="isGenerating || isDetailView">
          <!-- 图片尺寸选择 -->
          <div class="form-group">
            <label>Image Aspect Ratio *</label>
            <div class="tab-group">
              <div 
                class="tab-option"
                :class="{ active: formData.size === '1:1' }"
                @click="formData.size = '1:1'"
              >
                <span>1:1</span>
              </div>
              <div 
                class="tab-option"
                :class="{ active: formData.size === '3:2' }"
                @click="formData.size = '3:2'"
              >
                <i class="fas fa-rectangle-wide"></i>
                <span>3:2</span>
              </div>
              <div 
                class="tab-option"
                :class="{ active: formData.size === '2:3' }"
                @click="formData.size = '2:3'"
              >
                <i class="fas fa-rectangle-portrait"></i>
                <span>2:3</span>
              </div>
            </div>
          </div>

          <!-- 提示词输入 -->
          <div class="form-group">
            <label>Prompt *</label>
            <textarea
              v-model="formData.prompt"
              placeholder="Describe the image content you want to generate..."
              rows="4"
              class="form-input"
              required
            ></textarea>
            <div class="input-hint">At least one of Reference Images and prompt is required</div>
          </div>

          <!-- 文件上传 -->
          <div class="form-group">
            <UploadImage
              ref="referenceImagesUploadRef"
              input-id="gpt4o-reference-images"
              label="Reference Images (Optional)"
              upload-icon="fas fa-cloud-upload-alt"
              upload-text="Click to upload reference images"
              upload-hint="Supports .jfif, .jpeg, .jpg, .png, .webp (max 5 images)"
              :max-files="5"
              :max-file-size="10 * 1024 * 1024"
              additional-hint="Upload reference images to guide generation direction"
              theme-color="#667eea"
              @update:files="handleReferenceImages"
            />
            <div v-if="isUploadingRefs" class="uploading-hint">
              <i class="fas fa-spinner fa-spin"></i> Uploading reference images...
            </div>
          </div>

          <!-- 提示增强 -->
          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" v-model="formData.isEnhance" />
              <span class="checkmark"></span>
              Prompt Enhancement (Suitable for 3D images and specific scenarios)
            </label>
          </div>

          <!-- 生成按钮 -->
          <button type="submit" :disabled="isGenerating || !formData.prompt.trim()" class="generate-btn">
            <i v-if="isGenerating" class="fas fa-spinner fa-spin"></i>
            <i v-else class="fas fa-magic"></i>
            {{ isGenerating ? 'Generating...' : 'Generate Image' }}{{ gpt4oImagePriceText }}
          </button>
          </fieldset>
        </form>
      </div>

      <!-- Right: Image Display Area -->
      <div class="image-display-panel">
        <div class="image-header">
          <h4>Image Preview</h4>
          <div class="image-actions" v-if="!isDetailView && generatedImages.length > 0">
            <button @click="clearResults" class="btn-secondary">
              <i class="fas fa-trash"></i> Clear
            </button>
          </div>
        </div>
        
        <div class="image-container">
          <!-- 详情页：status 2 展示 outputUrls -->
          <div v-if="isDetailView && detailData && detailData.status === 2 && detailOutputImages.length > 0" class="image-showcase">
            <div v-for="(image, index) in detailOutputImages" :key="index" class="image-item">
              <div class="image-wrapper">
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
                <span class="image-size">{{ image.size }}</span>
                <span class="image-time">{{ image.timestamp }}</span>
              </div>
            </div>
          </div>
          <!-- 详情页：status 3 失败提示 -->
          <div v-else-if="isDetailView && detailData && detailData.status === 3" class="detail-failure-state">
            <div class="failure-icon"><i class="fas fa-exclamation-circle"></i></div>
            <p class="failure-message">Generation failed. You can debug the parameters and try generating again. Generation failure will not consume credits.</p>
          </div>
          <!-- 详情页：status 1 或加载中 -->
          <div v-else-if="isDetailView && (!detailData || detailData.status === 1)" class="detail-loading-state">
            <i class="fas fa-spinner fa-spin detail-spinner"></i>
            <p>Generating...</p>
          </div>
          <!-- 详情页：其他（如 status 2 但无图） -->
          <div v-else-if="isDetailView" class="detail-loading-state">
            <p>No output images</p>
          </div>
          <!-- 非详情页：本地生成结果 -->
          <div v-else-if="!isDetailView && generatedImages.length > 0" class="image-showcase">
            <div v-for="(image, index) in generatedImages" :key="index" class="image-item">
              <div class="image-wrapper">
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
                <span class="image-size">{{ image.size }}</span>
                <span class="image-time">{{ image.timestamp }}</span>
              </div>
            </div>
          </div>
          
          <!-- Empty State（仅非详情页且无结果时） -->
          <div v-else-if="!isDetailView" class="empty-state">
            <div class="empty-icon">
              <i class="fas fa-image"></i>
            </div>
            <h3>Waiting for Image Generation</h3>
            <p>Configure parameters and click the "Generate Image" button to start creating your AI image</p>
            <div class="empty-features">
              <div class="feature-item">
                <i class="fas fa-palette"></i>
                <span>Multiple Aspect Ratios</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-upload"></i>
                <span>Support Image Upload</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-magic"></i>
                <span>Intelligent Prompt Enhancement</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-shield-alt"></i>
                <span>Fallback Mechanism</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Usage Tips -->
    <div class="usage-tips">
      <div class="tip-item">
        <span class="tip-icon">✨</span>
        <span>Provide detailed descriptive prompts for better results</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">🖼️</span>
        <span>Upload reference images to guide generation direction</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">📐</span>
        <span>Support multiple aspect ratios, choose the appropriate ratio</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">🔄</span>
        <span>Enable the fallback mechanism to improve generation success rate</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import UploadImage from './common/UploadImage.vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '~/composables/useAuth'
import { useToast } from '~/composables/useToast'
import { useModelPrice } from '~/composables/useModelPrice'
import { useRecordPolling } from '~/composables/useRecordPolling'

const router = useRouter()
const route = useRoute()
const { token } = useAuth()
const { showError } = useToast()
const { fetchPrices, getPrice, formatCredits } = useModelPrice()

onMounted(() => { fetchPrices() })

// 价格：GPT 4o Image 对应模型 key GPT_4o_image
const gpt4oImagePriceText = computed(() => {
  const credits = getPrice('GPT_4o_image')
  const str = formatCredits(credits)
  return str ? `(${str})` : ''
})

const formData = reactive({
  size: '1:1',
  prompt: '',
  filesUrl: [],
  isEnhance: false
})

const isGenerating = ref(false)
const isUploadingRefs = ref(false)
const generatedImages = ref([])
const uploadedFiles = ref([])
const referenceImagesUploadRef = ref(null)

const getAuthToken = () => {
  if (!process.client) return null
  try {
    if (token?.value) return token.value
    return localStorage.getItem('auth_token')
  } catch {
    return localStorage.getItem('auth_token')
  }
}

const handleReferenceImages = async (files) => {
  if (!Array.isArray(files) || files.length === 0) {
    uploadedFiles.value = []
    formData.filesUrl = []
    return
  }

  isUploadingRefs.value = true
  try {
    const formDataUpload = new FormData()
    files.forEach(file => formDataUpload.append('file', file))

    const headers = { Accept: 'application/json' }
    const authToken = getAuthToken()
    if (authToken) headers['Authorization'] = `Bearer ${authToken}`

    const response = await fetch('/api/common/batch-upload', {
      method: 'POST',
      headers,
      body: formDataUpload,
      credentials: 'include'
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      // 优先使用后端 errorMessage（{ errorCode, errorMessage, type, data }）；代理抛出时在 message 里
      const msg =
        (typeof errorData?.errorMessage === 'string' && errorData.errorMessage.trim())
          ? errorData.errorMessage.trim()
          : (typeof errorData?.message === 'string' && errorData.message.trim())
            ? errorData.message.trim()
            : (errorData?.userTip || errorData?.error || errorData?.message || 'Upload failed')
      throw new Error(msg)
    }

    const data = await response.json()
    let urls = []
    if (data.errorCode === '00000' && data.data?.urls && Array.isArray(data.data.urls)) {
      urls = data.data.urls
    } else if (data.data?.urls && Array.isArray(data.data.urls)) {
      urls = data.data.urls
    } else if (data.fileUrls && Array.isArray(data.fileUrls)) {
      urls = data.fileUrls
    }

    if (urls.length === 0) {
      throw new Error('Invalid response: file URLs not found')
    }

    formData.filesUrl = urls
    uploadedFiles.value = files.map((file, i) => ({
      name: file.name,
      file,
      url: urls[i] || URL.createObjectURL(file)
    }))
  } catch (error) {
    console.error('Reference images upload error:', error)
    showError(error.message || 'Failed to upload reference images', 5000)
    uploadedFiles.value = []
    formData.filesUrl = []
    // 上传失败时清空组件内显示的图片，用户可继续点击上传
    referenceImagesUploadRef.value?.clearFiles?.()
  } finally {
    isUploadingRefs.value = false
  }
}

const { post } = useApi()
const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling()

// 详情页：仅从 URL 读取 record-id
const routeRecordId = computed(() => route.query['record-id'] || '')
const isDetailView = computed(() => !!routeRecordId.value)
const detailData = ref(null)
const detailLoading = ref(false)
/** 防止同一 recordId 被连续触发两次请求（watch 可能连续触发） */
const loadingRecordId = ref(null)

const detailOutputImages = computed(() => {
  if (!detailData.value || !Array.isArray(detailData.value.outputUrls)) return []
  const urls = detailData.value.outputUrls
  const size = detailData.value.originalData?.size || '1:1'
  return urls.map((url, i) => ({
    id: `detail-${i}`,
    url: typeof url === 'string' ? url : url?.url ?? url?.imageUrl ?? '',
    size,
    timestamp: new Date().toLocaleTimeString(),
    prompt: detailData.value.originalData?.prompt
  })).filter(img => img.url)
})

function fillFormFromOriginalData(originalData) {
  if (!originalData || typeof originalData !== 'object') return
  if (originalData.size) formData.size = originalData.size
  if (typeof originalData.prompt === 'string') formData.prompt = originalData.prompt
  if (Array.isArray(originalData.imageUrls)) formData.filesUrl = [...originalData.imageUrls]
  if (typeof originalData.isEnhance === 'boolean') formData.isEnhance = originalData.isEnhance
}

function getRouteRecordId() {
  return route.query['record-id'] || ''
}
async function loadDetailByRecordId(recordId) {
  if (!recordId) return
  if (getRouteRecordId() !== recordId) return
  if (loadingRecordId.value === recordId) return
  loadingRecordId.value = recordId
  detailLoading.value = true
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
    detailLoading.value = false
  }
}

watch(
  () => route.query['record-id'],
  (recordId) => {
    if (recordId) loadDetailByRecordId(recordId)
    else {
      loadingRecordId.value = null
      detailData.value = null
    }
  },
  { immediate: true }
)

const generateImage = async () => {
  if (!formData.prompt?.trim() && (!formData.filesUrl || formData.filesUrl.length === 0)) {
    showError('At least one of Reference Images and prompt is required')
    return
  }

  isGenerating.value = true
  try {
    const requestBody = {
      size: formData.size,
      imageUrls: Array.isArray(formData.filesUrl) ? formData.filesUrl : [],
      prompt: formData.prompt?.trim() || '',
      isEnhance: !!formData.isEnhance
    }

    const data = await post('/api/image/gpt4o-image/generate', requestBody)
    const recordId = data?.recordId ?? data?.data?.recordId

    if (recordId) {
      router.push(`/home/gpt-4o-image/generate?record-id=${encodeURIComponent(recordId)}`)
      return
    }

    let urls = data?.outputUrls ?? data?.urls ?? data?.data?.outputUrls ?? data?.images ?? (Array.isArray(data) ? data : [])
    if (!Array.isArray(urls) || urls.length === 0) {
      showError('No image URLs in response')
      return
    }

    const newImages = urls.map((url, i) => ({
      id: Date.now() + i,
      url: typeof url === 'string' ? url : url?.url ?? url?.imageUrl ?? '',
      size: formData.size,
      timestamp: new Date().toLocaleTimeString(),
      prompt: formData.prompt
    })).filter(img => img.url)

    generatedImages.value.unshift(...newImages)
  } catch (error) {
    console.error('Image generation failed:', error)
    showError(error.message || 'Image generation failed, please try again')
  } finally {
    isGenerating.value = false
  }
}

const downloadImage = (image) => {
  const link = document.createElement('a')
  link.href = image.url
  link.download = `gpt4o-image-${Date.now()}.png`
  link.click()
}

const copyImageUrl = async (image) => {
  try {
    await navigator.clipboard.writeText(image.url)
    alert('Image URL copied to clipboard')
  } catch (error) {
    console.error('Copy failed:', error)
  }
}

const clearResults = () => {
  generatedImages.value = []
}
</script>

<style scoped>
.gpt4o-image-tool {
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

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.tool-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #667eea;
  color: white;
  font-size: 20px;
}

.tool-icon img {
  width: 48px;
  height: 48px;
  object-fit: cover;
}

.tool-info h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.tool-info p {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
}

.main-content {
  display: flex;
  flex: 1;
  min-height: 0;
  gap: 20px;
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

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.form-input, textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s ease;
}

.form-input:focus, textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.input-hint {
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
}

.uploading-hint {
  font-size: 12px;
  color: #667eea;
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.tab-group {
  display: flex;
  gap: 8px;
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
}

.tab-option {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  background: white;
}

.tab-option:hover {
  background: #f8fafc;
  border-color: #667eea;
  color: #667eea;
}

.tab-option.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.2);
}

.tab-option i {
  font-size: 12px;
}


.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: 500;
}

.checkbox-label input[type="checkbox"] {
  margin: 0;
}

.generate-btn {
  width: 100%;
  padding: 16px 24px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 12px;
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
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
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

.tip-item strong {
  color: #374151;
}

.image-display-panel {
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

.image-header {
  padding: 24px 24px 16px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.image-header h4 {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.btn-secondary {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

.image-container {
  flex: 1;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}

.image-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
}

.image-item {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.image-item:hover {
  transform: translateY(-4px);
}

.image-wrapper {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
}

.image-wrapper img {
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

.image-wrapper:hover .image-overlay {
  opacity: 1;
}

.action-btn {
  width: 40px;
  height: 40px;
  background: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: #f3f4f6;
  transform: scale(1.1);
}

.image-info {
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #6b7280;
}

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

.feature-item i {
  color: #667eea;
  width: 20px;
  font-size: 18px;
}

.detail-loading-state,
.detail-failure-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px;
  text-align: center;
}

.detail-spinner {
  font-size: 48px;
  color: #667eea;
}

.detail-loading-state p,
.detail-failure-state p {
  margin: 0;
  font-size: 16px;
  color: #64748b;
}

.detail-failure-state .failure-icon {
  font-size: 56px;
  color: #ef4444;
}

.detail-failure-state .failure-message {
  max-width: 420px;
  line-height: 1.6;
  color: #374151;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .main-content {
    flex-direction: column;
  }
  
  .config-panel,
  .image-display-panel {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .gpt4o-image-tool {
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
  
  .config-panel, .image-display-panel {
    min-height: auto;
  }
  
  .tab-group {
    flex-direction: column;
    gap: 8px;
  }
  
  .tab-option {
    padding: 12px 16px;
    font-size: 15px;
  }
  
  .image-showcase {
    grid-template-columns: 1fr;
  }
  
}
</style>


