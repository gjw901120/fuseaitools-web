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

          <!-- 视频上传 -->
          <div class="form-group">
            <label class="form-label">Input Video *</label>
            <div class="upload-area" :class="{ 'has-files': referenceVideo }">
              <div v-if="!referenceVideo" class="upload-content">
                <div class="upload-icon">
                  <i class="fas fa-video"></i>
                </div>
                <div class="upload-text">
                  <p class="upload-title">Upload Input Video</p>
                  <p class="upload-subtitle">Supports MP4, MOV, AVI formats, maximum 500MB</p>
                </div>
              </div>
              <div v-else class="uploaded-content">
                <div class="uploaded-video-container">
                  <video :src="referenceVideo" class="uploaded-video" controls>
                    您的浏览器不支持视频播放
                  </video>
                  <button 
                    @click="clearReferenceVideo"
                    class="remove-video-btn"
                    title="Delete Input Video"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </div>
                <div class="uploaded-text">
                  <p class="upload-title">Input Video Selected</p>
                  <p class="upload-subtitle">Click to re-select</p>
                </div>
              </div>
              <input
                type="file" 
                accept="video/*" 
                @change="handleVideoUpload"
                class="file-input"
              />
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
              :disabled="!formData.prompt || !referenceVideo || isGenerating"
            >
              <i v-if="isGenerating" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-magic"></i>
              {{ isGenerating ? 'Modifying...' : 'Modify Video ($1.5)' }}
            </button>
          </div>
        </form>
        
        <!-- 使用提示 -->
        <div class="tips-panel">
          <h4>💡 Usage Tips</h4>
          <ul class="tips-list">
            <li><strong>English Description:</strong> All prompts must be in English, ensure description is accurate and clear</li>
            <li><strong>Detailed Description:</strong> Specifically describe the visual elements to add or modify</li>
            <li><strong>Video Requirements:</strong> Input video maximum 500MB, maximum 10 seconds</li>
            <li><strong>Format Support:</strong> Supports MP4, MOV, AVI formats</li>
            <li><strong>3D Effects:</strong> Focus on 3D scenes and three-dimensional visual effects</li>
          </ul>
        </div>
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
                  您的浏览器不支持视频播放
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
  </div>
</template>

<script setup>
import { ref, reactive, inject } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 注入父组件的函数
const addToUsageHistory = inject('addToUsageHistory')

// Form data
const formData = reactive({
  prompt: '',
  watermark: ''
})

const referenceVideo = ref('')
const isGenerating = ref(false)
const generatedVideos = ref([])

// 文件转Base64
const fileToBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = () => resolve(String(reader.result))
  reader.onerror = reject
  reader.readAsDataURL(file)
})

// 处理视频上传
const handleVideoUpload = async (e) => {
  const file = e.target.files[0]
  if (!file) return
  
  try {
    if (!file.type.startsWith('video/')) {
      alert('Please select a valid video format')
      return
    }
    if (file.size > 500 * 1024 * 1024) {
      alert('Video size cannot exceed 500MB')
      return
    }
    referenceVideo.value = await fileToBase64(file)
  } catch (error) {
    console.error('File conversion failed:', error)
    alert('File processing failed, please try again')
  }
}

// 清空参考视频
const clearReferenceVideo = () => {
  referenceVideo.value = ''
}

// Methods
const modifyVideo = async () => {
  if (!formData.prompt || !referenceVideo.value) return
  
  // 添加到使用历史
  if (addToUsageHistory) {
    addToUsageHistory('Luma')
  }
  
  isGenerating.value = true
  
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 4000))
    
    // 模拟生成结果
    const newVideo = {
      id: Date.now(),
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://via.placeholder.com/320x180/8b5cf6/ffffff?text=Luma+Video',
      duration: '8 seconds',
      size: '25MB',
      watermark: formData.watermark || null,
      prompt: formData.prompt,
      originalUrl: formData.videoUrl,
      createdAt: new Date().toISOString()
    }
    
    generatedVideos.value.unshift(newVideo)
    
    // 重置表单
    formData.prompt = ''
    formData.watermark = ''
    referenceVideo.value = ''
    
  } catch (error) {
    console.error('Failed to modify video:', error)
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

.cost-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cost-badge {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
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
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
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
  background: #8b5cf6;
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
  background: #7c3aed;
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
  border-color: #8b5cf6;
  background: #faf5ff;
}

.upload-area.has-files {
  border-color: #10b981;
  background: #f0fdf4;
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
  background: #8b5cf6;
  border-radius: 50%;
  color: white;
  font-size: 20px;
}

.upload-area.has-files .upload-icon {
  background: #10b981;
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
  border: 2px solid #10b981;
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
  color: #10b981;
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
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
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
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
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
  background: #8b5cf6;
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
  background: rgba(139, 92, 246, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: rgba(139, 92, 246, 0.15);
  transform: translateY(-2px);
}

.feature-item i {
  color: #8b5cf6;
  width: 20px;
  font-size: 18px;
}

/* 提示面板 */
.tips-panel {
  background: white;
}

.tips-panel h4 {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 12px 0;
}

.tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tips-list li {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 8px;
  line-height: 1.5;
}

.tips-list strong {
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


