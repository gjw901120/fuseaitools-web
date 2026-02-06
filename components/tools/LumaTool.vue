<template>
  <div class="luma-tool">
    <!-- 工具信息头部 -->
    <div class="tool-header">
      <div class="tool-avatar">
        <img src="/tools-logo/Luma.png" alt="Luma" />
      </div>
      <div class="tool-details">
        <h3>Luma</h3>
        <p>Build and scale creative products with the world's most popular and intuitive Video and Image generation models with Luma.</p>
      </div>
    </div>

    <!-- 主内容区域：左右布局 -->
    <div class="main-content">
      <!-- 左侧：参数配置面板 (1/3) -->
      <div class="config-panel">
        <div class="config-header">
          <h4>Video Modification Configuration</h4>
        </div>

        <form class="config-form" @submit.prevent="modifyVideo">
          <fieldset class="config-fieldset" :disabled="isGenerating">
          <!-- Prompt 输入 -->
          <div class="form-group">
            <label for="prompt">Modification Description *</label>
            <textarea
              id="prompt"
              v-model="formData.prompt"
              placeholder="Text prompt describing the desired video modification. Should be detailed and specific in describing the desired changes, describing the visual elements you want to add or modify. Important: English only."
              rows="4"
              required
            ></textarea>
            
          </div>

          <!-- 视频上传：与 Runway Aleph 一致，上方小选择区，选择后立即上传，下方展示已上传视频 -->
          <div class="form-group">
            <label class="form-label">Input Video *</label>
            <div class="luma-video-upload">
              <div class="luma-video-trigger" :class="{ 'has-video': referenceVideo }">
                <input
                  ref="videoInputRef"
                  type="file"
                  accept="video/*"
                  @change="handleVideoUpload"
                  class="luma-video-file-input"
                />
                <div class="luma-video-trigger-inner">
                  <i class="fas fa-cloud-upload-alt"></i>
                  <span>Click to upload video</span>
                  <small>Supports MP4, MOV, AVI, max 500MB</small>
                </div>
              </div>
              <div v-if="isUploadingVideo" class="luma-video-uploading">
                <i class="fas fa-spinner fa-spin"></i> Uploading video...
              </div>
              <div v-if="referenceVideo && !isUploadingVideo" class="luma-video-display">
                <div class="luma-video-preview-wrap">
                  <video :src="referenceVideo" class="luma-video-preview" controls></video>
                  <button type="button" class="luma-video-remove" title="Remove" @click="clearReferenceVideo">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
                <div class="luma-video-meta" v-if="videoFile">
                  <span class="luma-video-name">{{ videoFile.name }}</span>
                  <span class="luma-video-size">{{ formatFileSize(videoFile.size) }}</span>
                </div>
              </div>
            </div>
            <div class="form-hint">
              Input video for modification. Supports MP4, MOV, AVI formats, maximum 500MB, maximum 10 seconds.
            </div>
          </div>

          <!-- 水印设置 -->
          <div class="form-group">
            <label for="watermark">Watermark Identifier</label>
            <input
              id="watermark"
              v-model="formData.watermark"
              type="text"
              placeholder="your-watermark-id"
            />
            <div class="form-help">
              Optional parameter. If provided, a watermark will be added to the output video, which can be used for branding or identification purposes.
            </div>
          </div>

          <div class="form-actions">
            <button
              type="submit"
              class="btn-primary"
              :disabled="!formData.prompt?.trim() || !uploadedVideoUrl || isGenerating"
            >
              <i v-if="isGenerating" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-magic"></i>
              {{ isGenerating ? 'Modifying...' : 'Modify Video' }}
              <span v-if="lumaPriceText" class="price-tag">{{ lumaPriceText }}</span>
            </button>
          </div>
          </fieldset>
        </form>
      </div>

      <!-- 右侧：视频展示区域 (2/3) -->
      <div class="result-panel">
        <div class="video-header">
          <h4>Video Preview</h4>
          <div class="video-actions" v-if="generatedVideos.length > 0">
            <button @click="clearResults" class="btn-secondary">
              <i class="fas fa-trash"></i> Clear All
            </button>
          </div>
        </div>
        
        <!-- 视频展示区域 -->
        <div class="video-container">
          <div v-if="generatedVideos.length > 0" class="video-showcase">
            <div
              v-for="(video, index) in generatedVideos"
              :key="index"
              class="video-showcase-item"
            >
              <div class="video-player">
                <video controls :src="video.url" :poster="video.thumbnail">
                  Your browser does not support video playback
                </video>
              </div>
              <div class="video-details">
                <div class="video-meta">
                  <span class="video-duration">{{ video.duration }}</span>
                  <span class="video-size">{{ video.size }}</span>
                  <span class="video-watermark" v-if="video.watermark">{{ video.watermark }}</span>
                </div>
                <div class="video-actions">
                  <button @click="downloadVideo(video)" class="btn-icon" title="Download">
                    <i class="fas fa-download"></i>
                  </button>
                  <button @click="shareVideo(video)" class="btn-icon" title="Share">
                    <i class="fas fa-share"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 空状态 -->
          <div v-else class="empty-state">
            <div class="empty-icon">
              <i class="fas fa-magic"></i>
            </div>
            <h3>Waiting to Modify Video</h3>
            <p>Enter video URL and modification description, click "Modify Video" button to start processing</p>
            <div class="empty-features">
              <div class="feature-item">
                <i class="fas fa-cube"></i>
                <span>3D Video Generation</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-edit"></i>
                <span>Video Modification</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-eye"></i>
                <span>Visual Effects</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 使用提示 - 底部横排展示 -->
    <div class="usage-tips">
      <div class="tip-item">
        <span class="tip-icon">🌐</span>
        <span><strong>English Description:</strong> All prompts must be in English, ensure description is accurate and clear</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">📝</span>
        <span><strong>Detailed Description:</strong> Specifically describe the visual elements to add or modify</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">🎥</span>
        <span><strong>Video Requirements:</strong> Input video maximum 500MB, maximum 10 seconds</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">📁</span>
        <span><strong>Format Support:</strong> Supports MP4, MOV, AVI formats</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">🎬</span>
        <span><strong>3D Effects:</strong> Focus on 3D scenes and three-dimensional visual effects</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, inject, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '~/composables/useAuth'
import { useToast } from '~/composables/useToast'
import { useApi } from '~/composables/useApi'
import { useModelPrice } from '~/composables/useModelPrice'
import { useRecordPolling } from '~/composables/useRecordPolling'

const router = useRouter()
const route = useRoute()
const addToUsageHistory = inject('addToUsageHistory')
const { token } = useAuth()
const { fetchPrices, getPrice, formatCredits } = useModelPrice()
onMounted(() => { fetchPrices() })
const { showError } = useToast()
const { post } = useApi()
const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling()

const getAuthToken = () => {
  if (!process.client) return null
  try {
    if (token?.value) return token.value
    return localStorage.getItem('auth_token')
  } catch {
    return localStorage.getItem('auth_token')
  }
}

/** 上传单文件到 batch-upload，返回 URL */
const uploadFileToUrl = async (file) => {
  if (!file) return ''
  const formDataUpload = new FormData()
  formDataUpload.append('file', file)
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
    const msg = (typeof errorData?.errorMessage === 'string' && errorData.errorMessage?.trim())
      ? errorData.errorMessage.trim()
      : (typeof errorData?.message === 'string' && errorData.message?.trim())
        ? errorData.message.trim()
        : (errorData?.userTip || errorData?.error || errorData?.message || 'Upload failed')
    throw new Error(msg)
  }
  const data = await response.json()
  const urls = data?.data?.urls || data?.fileUrls || (Array.isArray(data?.data) ? data.data : [])
  if (!Array.isArray(urls) || !urls[0]) throw new Error('Invalid response: file URL not found')
  return urls[0]
}

// Form data
const formData = reactive({
  prompt: '',
  watermark: ''
})

const referenceVideo = ref('')
const videoFile = ref(null)
const uploadedVideoUrl = ref(null)
const isUploadingVideo = ref(false)
const videoInputRef = ref(null)
const isGenerating = ref(false)

const formatFileSize = (bytes) => {
  if (bytes == null || bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
const generatedVideos = ref([])

const routeRecordId = computed(() => route.query['record-id'] || '')
const isDetailView = computed(() => !!routeRecordId.value)
const detailData = ref(null)
const loadingRecordId = ref(null)
const detailDelayTimer = ref(null)
const displayVideos = computed(() => {
  if (isDetailView.value && detailData.value?.status === 2 && detailData.value?.outputUrls?.length) {
    const url = typeof detailData.value.outputUrls[0] === 'string' ? detailData.value.outputUrls[0] : detailData.value.outputUrls[0]?.url
    return [{ id: 'detail', url, prompt: detailData.value.originalData?.prompt || '', createdAt: new Date().toISOString() }]
  }
  return generatedVideos.value
})
function fillFormFromOriginalData(o) { if (!o || typeof o !== 'object') return; Object.keys(formData).forEach(k => { if (o[k] !== undefined) formData[k] = o[k] }) }
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
    if (data != null && Number(data.status) === 1) pollRecordByStatus(recordId, { getIsCancelled: () => getRouteRecordId() !== recordId }).then((res) => {
      if (getRouteRecordId() !== recordId) return
      detailData.value = res
      if (res?.originalData) fillFormFromOriginalData(res.originalData)
    }).catch(() => {})
  } catch (e) { console.error('Load record detail failed:', e) }
  finally { if (loadingRecordId.value === recordId) loadingRecordId.value = null }
}
watch(() => route.query['record-id'], (recordId) => {
  if (recordId) loadDetailByRecordId(recordId)
  else { loadingRecordId.value = null; detailData.value = null }
}, { immediate: true })

const lumaPriceText = computed(() => {
  const credits = getPrice('Luma')
  const str = formatCredits(credits)
  return str ? `(${str})` : ''
})

// 处理视频上传：选择后立即调用上传服务，与 Runway Aleph 一致
const handleVideoUpload = async (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  if (!file.type.startsWith('video/')) {
    showError('Please select a valid video format (MP4, MOV, AVI)')
    e.target.value = ''
    return
  }
  if (file.size > 500 * 1024 * 1024) {
    showError('Video size cannot exceed 500MB')
    e.target.value = ''
    return
  }
  videoFile.value = file
  uploadedVideoUrl.value = null
  referenceVideo.value = URL.createObjectURL(file)
  isUploadingVideo.value = true
  try {
    uploadedVideoUrl.value = await uploadFileToUrl(file)
  } catch (err) {
    console.error('Luma video upload failed:', err)
    showError(err?.message || 'Video upload failed')
    if (referenceVideo.value && referenceVideo.value.startsWith('blob:')) {
      URL.revokeObjectURL(referenceVideo.value)
    }
    referenceVideo.value = ''
    videoFile.value = null
  } finally {
    isUploadingVideo.value = false
  }
  e.target.value = ''
}

// 清空参考视频
const clearReferenceVideo = () => {
  if (referenceVideo.value && referenceVideo.value.startsWith('blob:')) {
    URL.revokeObjectURL(referenceVideo.value)
  }
  referenceVideo.value = ''
  videoFile.value = null
  uploadedVideoUrl.value = null
  if (videoInputRef.value) videoInputRef.value.value = ''
}

// Methods
const modifyVideo = async () => {
  const promptTrim = formData.prompt?.trim()
  if (!promptTrim || !uploadedVideoUrl.value) return
  if (addToUsageHistory) addToUsageHistory('Luma')

  isGenerating.value = true
  try {
    const videoUrl = uploadedVideoUrl.value
    const body = {
      prompt: promptTrim,
      videoUrl,
      watermark: formData.watermark?.trim() || undefined
    }
    const data = await post('/api/video/luma/generate', body)
    const rid = data?.recordId ?? data?.data?.recordId
    if (rid) { router.push(route.path + '?record-id=' + encodeURIComponent(rid)); return }
    let payload = data?.data ?? data
    const newVideo = {
      id: payload.taskId || Date.now(),
      url: payload.videoUrl || payload.url,
      thumbnail: payload.thumbnail,
      duration: payload.duration || '',
      size: payload.size || '',
      watermark: formData.watermark || null,
      prompt: formData.prompt,
      originalUrl: videoUrl,
      createdAt: new Date().toISOString()
    }
    generatedVideos.value.unshift(newVideo)
    formData.prompt = ''
    formData.watermark = ''
    clearReferenceVideo()
  } catch (error) {
    console.error('Failed to modify video:', error)
    showError(error?.message || 'Request failed')
  } finally {
    isGenerating.value = false
  }
}

const downloadVideo = (video) => {
  // 实现下载逻辑
  console.log('Download video:', video)
}

const shareVideo = (video) => {
  // 实现分享逻辑
  console.log('Share video:', video)
}

const clearResults = () => {
  generatedVideos.value = []
}
</script>

<style scoped>
.luma-tool {
  width: 100%;
  height: 100%;
  padding: 20px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
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

/* 配置面板 */
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

.cost-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cost-badge {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

.cost-label {
  font-size: 12px;
  color: #64748b;
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
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.url-input-wrapper {
  display: flex;
  gap: 8px;
}

.url-input-wrapper input {
  flex: 1;
}

.validate-btn {
  padding: 12px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.validate-btn:hover:not(:disabled) {
  background: #2563eb;
}

.validate-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.validation-status {
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
}

.text-green {
  color: #059669;
}

.text-red {
  color: #dc2626;
}

.form-help {
  font-size: 12px;
  color: #64748b;
  margin-top: 4px;
  line-height: 1.4;
}

.form-hint {
  font-size: 12px;
  color: #6b7280;
  line-height: 1.4;
}

/* 上传区域样式 */
.upload-area {
  position: relative;
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  transition: all 0.3s ease;
  background: #fafafa;
  cursor: pointer;
}

.upload-area:hover {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.05);
}

.upload-area.has-files {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.05);
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.upload-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3b82f6;
  border-radius: 50%;
  color: white;
  font-size: 20px;
}

.upload-area.has-files .upload-icon {
  background: #3b82f6;
}

.upload-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.upload-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.upload-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

/* Input Video：与 Runway Aleph 一致，小选择区 + 下方展示 */
.luma-video-upload {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.luma-video-trigger {
  position: relative;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  padding: 12px 16px;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  transition: border-color 0.2s, background 0.2s;
}
.luma-video-trigger:hover {
  border-color: #3b82f6;
  background: #eff6ff;
}
.luma-video-trigger.has-video {
  border-color: #e2e8f0;
  background: #f8fafc;
}
.luma-video-file-input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
.luma-video-trigger-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  pointer-events: none;
}
.luma-video-trigger-inner i {
  font-size: 18px;
  color: #64748b;
}
.luma-video-trigger-inner span {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}
.luma-video-trigger-inner small {
  font-size: 11px;
  color: #94a3b8;
}
.luma-video-uploading {
  font-size: 13px;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 8px;
}
.luma-video-uploading i {
  font-size: 14px;
}
.luma-video-display {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
  overflow: hidden;
}
.luma-video-preview-wrap {
  position: relative;
  width: 100%;
  max-width: 320px;
  aspect-ratio: 16/9;
  background: #000;
}
.luma-video-preview {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}
.luma-video-remove {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background: #dc2626;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: background 0.2s;
}
.luma-video-remove:hover {
  background: #b91c1c;
}
.luma-video-meta {
  padding: 10px 12px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background: #f8fafc;
}
.luma-video-name {
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.luma-video-size {
  font-size: 12px;
  color: #64748b;
  flex-shrink: 0;
}

/* 上传后的内容样式 */
.uploaded-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.uploaded-video-container {
  position: relative;
  width: 200px;
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #3b82f6;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.uploaded-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.uploaded-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: center;
}

.uploaded-text .upload-title {
  font-size: 16px;
  font-weight: 600;
  color: #3b82f6;
  margin: 0;
}

.uploaded-text .upload-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.remove-video-btn {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.remove-video-btn:hover {
  background: #b91c1c;
  transform: scale(1.1);
}

.form-actions {
  margin-top: 24px;
  padding-bottom: 20px;
}

.btn-primary {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
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
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* 结果面板 */
.result-panel {
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

.video-header {
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.video-header h4 {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.video-container {
  flex: 1;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}

/* 视频展示区域 */
.video-showcase {
  width: 100%;
  max-width: 100%;
}

.video-showcase-item {
  width: 100%;
  background: #f8fafc;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
}

.video-player {
  width: 100%;
  aspect-ratio: 16/9;
  background: #000;
}

.video-player video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.video-details {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.video-meta {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #64748b;
  flex-wrap: wrap;
}

.video-watermark {
  background: #3b82f6;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
}

.video-actions {
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
  background: rgba(59, 130, 246, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: rgba(59, 130, 246, 0.15);
  transform: translateY(-2px);
}

.feature-item i {
  color: #3b82f6;
  width: 20px;
  font-size: 18px;
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
  .luma-tool {
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
  
  .url-input-wrapper {
    flex-direction: column;
  }
  
  .validate-btn {
    width: 100%;
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


