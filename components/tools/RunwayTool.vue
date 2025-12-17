<template>
  <div class="runway-tool">
    <!-- 工具信息头部 -->
    <div class="tool-header">
      <div class="tool-avatar">
        <img src="/tools-logo/Runway.png" alt="Runway" />
      </div>
      <div class="tool-details">
        <h3>Runway</h3>
        <p>Utilize Runway to generate high-quality videos from text and images. Leverage Runway AI for seamless integration and immediately start creating your Runway masterpieces.</p>
      </div>
    </div>

    <!-- 主内容区域：左右布局 -->
    <div class="main-content">
      <!-- 左侧：参数配置面板 (1/3) -->
      <div class="config-panel">
        <div class="config-header">
          <h4>{{ getConfigHeaderTitle() }}</h4>
        </div>

        <!-- Tab 分类选择 -->
        <div class="category-tabs">
          <div 
            v-for="tab in tabs" 
            :key="tab.id"
            class="category-tab"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            <i :class="tab.icon"></i>
            <span>{{ tab.name }}</span>
          </div>
        </div>

        <!-- Generate Tab 表单 -->
        <form v-if="activeTab === 'generate'" class="config-form" @submit.prevent="generateVideo">
          <!-- Prompt 输入 -->
          <div class="form-group">
            <label for="prompt">Video Description *</label>
            <textarea
              id="prompt"
              v-model="formData.prompt"
              placeholder="Descriptive text that guides AI video generation. Specify themes, actions, styles, and scenes. When used with images, describe how to animate or modify image content. Maximum 1800 characters."
              rows="4"
              maxlength="1800"
              required
            ></textarea>
            <div class="char-count">{{ formData.prompt.length }}/1800</div>
          </div>

          <!-- 时长选择 -->
          <div class="form-group">
            <label>Video Duration *</label>
            <div class="tab-group">
              <div class="tab-options">
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.duration === '5' }"
                  @click="formData.duration = '5'"
                >
                  <i class="fas fa-clock"></i>
                  5 seconds
                </button>
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.duration === '10' }"
                  @click="formData.duration = '10'"
                >
                  <i class="fas fa-clock"></i>
                  10 seconds
                </button>
              </div>
            </div>
          </div>

          <!-- 质量选择 -->
          <div class="form-group">
            <label>Video Quality *</label>
            <div class="tab-group">
              <div class="tab-options">
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.quality === '720p' }"
                  @click="formData.quality = '720p'"
                >
                  <i class="fas fa-hd-video"></i>
                  720p
                </button>
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.quality === '1080p' }"
                  @click="formData.quality = '1080p'"
                  :disabled="formData.duration === '10'"
                >
                  <i class="fas fa-video"></i>
                  1080p
                </button>
              </div>
            </div>
            <div v-if="formData.duration === '10'" class="form-help">
              10-second videos do not support 1080p resolution
            </div>
          </div>

          <!-- 参考图像上传 -->
          <div class="form-group">
            <label class="form-label">Reference Image</label>
            <UploadImage
              input-id="runway-image-upload"
              label=""
              upload-icon="fas fa-cloud-upload-alt"
              upload-text="Click to upload image"
              upload-hint="Supports JPG/PNG format, max 10MB"
              additional-hint="Optional reference image as the basis for the video. If provided, AI will create a video that animates or extends this image."
              theme-color="#3b82f6"
              :max-files="1"
              :max-file-size="10 * 1024 * 1024"
              accept="image/*"
              :multiple="false"
              @update:files="handleImageUpdate"
            />
          </div>

          <!-- 宽高比选择 -->
          <div class="form-group" v-if="!formData.imageFile">
            <label>Video Aspect Ratio *</label>
            <div class="select-wrapper">
              <select v-model="formData.aspectRatio" required>
                <option value="16:9">16:9 (Landscape)</option>
                <option value="4:3">4:3 (Standard)</option>
                <option value="1:1">1:1 (Square)</option>
                <option value="3:4">3:4 (Portrait)</option>
                <option value="9:16">9:16 (Mobile)</option>
              </select>
              <i class="fas fa-chevron-down"></i>
            </div>
          </div>

          <!-- 水印设置 -->
          <div class="form-group">
            <label for="waterMark">Watermark Text</label>
            <input
              id="waterMark"
              v-model="formData.waterMark"
              type="text"
              placeholder="simplyai"
            />
            <div class="form-help">
              Video watermark text content. Empty string means no watermark, non-empty string will display the specified watermark text in the bottom-right corner of the video.
            </div>
          </div>

          <div class="form-actions">
            <button
              type="submit"
              class="btn-primary"
              :disabled="!formData.prompt || isGenerating"
            >
              <i v-if="isGenerating" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-video"></i>
              {{ isGenerating ? 'Generating...' : 'Generate Video' }}
              <span class="price-tag">($2.8)</span>
            </button>
          </div>
        </form>

        <!-- Aleph Tab 表单 -->
        <form v-if="activeTab === 'aleph'" class="config-form" @submit.prevent="generateAlephVideo">
          <!-- Prompt 输入 -->
          <div class="form-group">
            <label for="aleph-prompt">Prompt *</label>
            <textarea
              id="aleph-prompt"
              v-model="alephFormData.prompt"
              placeholder="Descriptive text that guides how to transform the reference video. Specifically describe the style changes, effects, and modifications you want to see in the generated video."
              rows="5"
              required
            ></textarea>
            <div class="form-help">
              <strong>Best Practices:</strong>
              <ul style="margin: 4px 0 0 0; padding-left: 20px;">
                <li>Focus on transformations and style changes, rather than describing content already in the video</li>
                <li>Include camera movement descriptions (e.g., "slow zoom in", "orbital rotation")</li>
                <li>Add temporal elements (e.g., "gradually", "smoothly", "suddenly")</li>
                <li>Specify lighting and atmosphere changes when needed</li>
              </ul>
              <div style="margin-top: 8px;">
                <strong>Example:</strong> "Transform into dreamy watercolor style with soft flowing motion effects"
              </div>
            </div>
          </div>

          <!-- Video 上传 -->
          <div class="form-group">
            <label>Input Video *</label>
            <div class="upload-area" :class="{ 'has-files': alephReferenceVideo }">
              <div v-if="!alephReferenceVideo" class="upload-content">
                <div class="upload-icon">
                  <i class="fas fa-video"></i>
                </div>
                <div class="upload-text">
                  <p class="upload-title">Upload Input Video</p>
                  <p class="upload-subtitle">Supports MP4, MOV, AVI formats, maximum 10MB</p>
                </div>
              </div>
              <div v-else class="uploaded-content">
                <div class="uploaded-video-container">
                  <video :src="alephReferenceVideo" class="uploaded-video" controls>
                    Your browser does not support video playback
                  </video>
                  <button 
                    @click="clearAlephReferenceVideo"
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
                @change="handleAlephVideoUpload"
                class="file-input"
              />
            </div>
            
          </div>

          <!-- Watermark 输入 -->
          <div class="form-group">
            <label for="aleph-waterMark">Watermark</label>
            <input
              id="aleph-waterMark"
              v-model="alephFormData.waterMark"
              type="text"
              placeholder="simplyai"
              maxlength="20"
            />
            <div class="form-help">
              Optional watermark text displayed on the generated video. Leave empty for no watermark. Recommended length: 1-20 characters for optimal visibility.
            </div>
          </div>

          <!-- Aspect Ratio 选择：tab 单选，默认选第一个 -->
          <div class="form-group">
            <label>Aspect Ratio</label>
            <div class="tab-group">
              <div class="tab-options">
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: alephFormData.aspectRatio === '16:9' }"
                  @click="alephFormData.aspectRatio = '16:9'"
                >
                  16:9
                </button>
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: alephFormData.aspectRatio === '9:16' }"
                  @click="alephFormData.aspectRatio = '9:16'"
                >
                  9:16
                </button>
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: alephFormData.aspectRatio === '4:3' }"
                  @click="alephFormData.aspectRatio = '4:3'"
                >
                  4:3
                </button>
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: alephFormData.aspectRatio === '3:4' }"
                  @click="alephFormData.aspectRatio = '3:4'"
                >
                  3:4
                </button>
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: alephFormData.aspectRatio === '1:1' }"
                  @click="alephFormData.aspectRatio = '1:1'"
                >
                  1:1
                </button>
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: alephFormData.aspectRatio === '21:9' }"
                  @click="alephFormData.aspectRatio = '21:9'"
                >
                  21:9
                </button>
              </div>
            </div>
          </div>

          <!-- Seed 输入 -->
          <div class="form-group">
            <label for="aleph-seed">Seed</label>
            <input
              id="aleph-seed"
              v-model.number="alephFormData.seed"
              type="number"
              placeholder="123456"
            />
            <div class="form-help">
              Optional random seed for reproducible results. The same seed with the same parameters tends to generate consistent results.
            </div>
          </div>

          <!-- Reference Image 上传 -->
          <div class="form-group">
            <label class="form-label">Reference Image</label>
            <UploadImage
              input-id="runway-aleph-image-upload"
              label=""
              upload-icon="fas fa-cloud-upload-alt"
              upload-text="Click to upload image"
              upload-hint="Supports JPG/PNG format, max 10MB"
              additional-hint="Optional reference image to influence the style or content of the output."
              theme-color="#3b82f6"
              :max-files="1"
              :max-file-size="10 * 1024 * 1024"
              accept="image/*"
              :multiple="false"
              @update:files="handleAlephImageUpdate"
            />
          </div>

          <div class="form-actions">
            <button
              type="submit"
              class="btn-primary"
              :disabled="!alephFormData.prompt || !alephFormData.videoFile || isGenerating"
            >
              <i v-if="isGenerating" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-video"></i>
              {{ isGenerating ? 'Generating...' : 'Generate Aleph Video' }}
            </button>
          </div>
        </form>

        <!-- Extend Tab 表单 -->
        <form v-if="activeTab === 'extend'" class="config-form" @submit.prevent="generateExtendVideo">
          <!-- Task 选择 -->
          <div class="form-group">
            <label for="extend-task">Task *</label>
            <div class="select-wrapper">
              <select id="extend-task" v-model="extendFormData.task" required>
                <option value="">Select a task</option>
                <option v-for="task in tasks" :key="task.id" :value="task.id">
                  {{ task.id }} {{ task.name ? `- ${task.name}` : '' }}
                </option>
              </select>
              <i class="fas fa-chevron-down"></i>
            </div>
            <div class="form-help">
              Original video generation task. Must be a valid task from a previously generated video.
            </div>
          </div>

          <!-- Prompt 输入 -->
          <div class="form-group">
            <label for="extend-prompt">Prompt *</label>
            <textarea
              id="extend-prompt"
              v-model="extendFormData.prompt"
              placeholder="Descriptive text that guides video continuation. Explain what actions, dynamics, or developments should happen next. Be specific but maintain consistency with the original video content."
              rows="5"
              required
            ></textarea>
            
          </div>

          <!-- Quality 选择 -->
          <div class="form-group">
            <label>Video Quality *</label>
            <div class="tab-group">
              <div class="tab-options">
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: extendFormData.quality === '720p' }"
                  @click="extendFormData.quality = '720p'"
                >
                  <i class="fas fa-hd-video"></i>
                  720p
                </button>
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: extendFormData.quality === '1080p' }"
                  @click="extendFormData.quality = '1080p'"
                >
                  <i class="fas fa-video"></i>
                  1080p
                </button>
              </div>
            </div>
            
          </div>

          <!-- Watermark 输入 -->
          <div class="form-group">
            <label for="extend-waterMark">Watermark</label>
            <input
              id="extend-waterMark"
              v-model="extendFormData.waterMark"
              type="text"
              placeholder="simplyai"
              maxlength="20"
            />
            <div class="form-help">
              Optional watermark text displayed on the video. Empty string means no watermark, non-empty string will display the specified watermark text in the bottom-right corner of the video.
            </div>
          </div>

          <div class="form-actions">
            <button
              type="submit"
              class="btn-primary"
              :disabled="!extendFormData.task || !extendFormData.prompt || isGenerating"
            >
              <i v-if="isGenerating" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-expand"></i>
              {{ isGenerating ? 'Generating...' : 'Generate Extend Video' }}
            </button>
          </div>
        </form>
        
        <!-- 使用提示 -->
        <div class="tips-panel" v-if="activeTab === 'generate'">
          <h4>💡 Usage Tips</h4>
          <ul class="tips-list">
            <li><strong>Detailed Description:</strong> Include details like scenes, actions, camera movement, lighting, etc.</li>
            <li><strong>Cinematic Terms:</strong> Use professional terms like "close-up", "wide shot", "tracking shot"</li>
            <li><strong>Style Specification:</strong> Such as "sci-fi style", "romantic comedy", "action film"</li>
            <li><strong>Duration Limit:</strong> 10-second videos do not support 1080p resolution</li>
            <li><strong>Reference Image:</strong> Providing an image URL can add animation effects to existing images</li>
          </ul>
        </div>

        <!-- Aleph Usage Tips -->
        <div class="tips-panel" v-if="activeTab === 'aleph'">
          <h4>💡 Aleph Usage Tips</h4>
          <ul class="tips-list">
            <li><strong>Transformation Description:</strong> Focus on describing the style changes and effect transformations you want</li>
            <li><strong>Motion Effects:</strong> Use camera movement terminology to enhance video dynamics</li>
            <li><strong>Temporal Control:</strong> Control transformation rhythm through temporal elements (gradually, suddenly, etc.)</li>
            <li><strong>Video Requirements:</strong> Ensure video URL is accessible via HTTPS and file size does not exceed 10MB</li>
          </ul>
        </div>

        <!-- Extend Usage Tips -->
        <div class="tips-panel" v-if="activeTab === 'extend'">
          <h4>💡 Extend Usage Tips</h4>
          <ul class="tips-list">
            <li><strong>Continuation Description:</strong> Describe what should happen next in the video sequence</li>
            <li><strong>Consistency:</strong> Maintain visual and narrative consistency with the original video</li>
            <li><strong>Dynamic Actions:</strong> Specify movements, actions, and developments clearly</li>
            <li><strong>Quality Selection:</strong> Choose resolution based on your needs - 720p for faster generation, 1080p for higher quality</li>
          </ul>
        </div>
      </div>

      <!-- 右侧：视频展示区域 (2/3) -->
      <div class="result-panel">
        <div class="video-header">
          <h4>Video Preview</h4>
          <div class="video-actions" v-if="generatedVideos.length > 0">
            <button @click="clearResults" class="btn-secondary">
              <i class="fas fa-trash"></i> Clear
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
                  <span class="video-resolution">{{ video.resolution }}</span>
                  <span class="video-ratio">{{ video.aspectRatio }}</span>
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
              <i class="fas fa-video"></i>
            </div>
            <h3>Waiting for Video Generation</h3>
            <p>Configure parameters and click "Generate Video" button to start creating your AI video</p>
            <div class="empty-features">
              <div class="feature-item">
                <i class="fas fa-magic"></i>
                <span>Text to Video</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-image"></i>
                <span>Image to Video</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-palette"></i>
                <span>Multiple Aspect Ratios</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, inject } from 'vue'
import { useRouter } from 'vue-router'
import UploadImage from './common/UploadImage.vue'

// 客户端检查（放在最前面，避免在 SSR 时访问路由等客户端 API）
const isClient = typeof window !== 'undefined'

// 安全地获取路由（在 SSR 时会返回 null）
let router = null
try {
  if (isClient) {
    router = useRouter()
  }
} catch (e) {
  // 在 SSR 时忽略路由错误
  console.warn('Router not available in SSR context')
}

// 注入父组件的函数（可选，可能为 undefined）
const addToUsageHistory = inject('addToUsageHistory', null)

// Tab 管理
const activeTab = ref('generate')
// tabs 作为常量数组，不需要响应式
const tabs = Object.freeze([
  { id: 'generate', name: 'Generate', icon: 'fas fa-video' },
  { id: 'extend', name: 'Extend', icon: 'fas fa-expand' },
  { id: 'aleph', name: 'Aleph', icon: 'fas fa-magic' }
])

// Generate Tab Form data
const formData = reactive({
  prompt: '',
  duration: '5',
  quality: '720p',
  imageFile: null,
  aspectRatio: '16:9',
  waterMark: ''
})

// Aleph Tab Form data
const alephFormData = reactive({
  prompt: '',
  videoFile: null,
  waterMark: '',
  aspectRatio: '16:9',
  seed: null,
  referenceImageFile: null
})

// Extend Tab Form data
const extendFormData = reactive({
  task: '',
  prompt: '',
  quality: '720p',
  waterMark: ''
})

const isGenerating = ref(false)
const generatedVideos = ref([])
const alephReferenceVideo = ref('')

// Tasks 列表（后续会从服务端获取）
const tasks = ref([
  { id: 'ee603959-debb-48d1-98c4-a6d1c717eba6', name: 'Sample Video 1' },
  { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', name: 'Sample Video 2' }
])

// Watch for duration and quality conflicts
watch([() => formData.duration, () => formData.quality], ([duration, quality]) => {
  if (duration === '10' && quality === '1080p') {
    formData.quality = '720p'
  }
})

// Handle image upload
const handleImageUpdate = (files) => {
  if (!isClient) return
  if (files && files.length > 0) {
    formData.imageFile = files[0]
  } else {
    formData.imageFile = null
  }
}

// Handle Aleph image upload
const handleAlephImageUpdate = (files) => {
  if (!isClient) return
  if (files && files.length > 0) {
    alephFormData.referenceImageFile = files[0]
  } else {
    alephFormData.referenceImageFile = null
  }
}

// 文件转Base64
const fileToBase64 = (file) => {
  if (!isClient) return Promise.resolve('')
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// 处理 Aleph 视频上传
const handleAlephVideoUpload = async (e) => {
  if (!isClient) return
  const file = e.target.files?.[0]
  if (!file) return
  
  try {
    if (!file.type.startsWith('video/')) {
      if (typeof window !== 'undefined') {
        alert('Please select a valid video format')
      }
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      if (typeof window !== 'undefined') {
        alert('Video size cannot exceed 10MB')
      }
      return
    }
    alephFormData.videoFile = file
    alephReferenceVideo.value = await fileToBase64(file)
  } catch (error) {
    console.error('File conversion failed:', error)
    if (typeof window !== 'undefined') {
      alert('File processing failed, please try again')
    }
  }
}

// 清空 Aleph 参考视频
const clearAlephReferenceVideo = () => {
  alephReferenceVideo.value = ''
  alephFormData.videoFile = null
}

// Methods
const generateVideo = async () => {
  if (!formData.prompt) return
  
  // 添加到使用历史
  if (addToUsageHistory) {
    addToUsageHistory('Runway')
  }
  
  isGenerating.value = true
  
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // 模拟生成结果
    const newVideo = {
      id: Date.now(),
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://via.placeholder.com/320x180/3b82f6/ffffff?text=Runway+Video',
      duration: `${formData.duration}秒`,
      resolution: formData.quality,
      aspectRatio: formData.aspectRatio,
      prompt: formData.prompt,
      createdAt: new Date().toISOString()
    }
    
    generatedVideos.value.unshift(newVideo)
    
    // 重置表单
    formData.prompt = ''
    formData.imageFile = null
    formData.waterMark = ''
    
  } catch (error) {
    console.error('生成视频失败:', error)
  } finally {
    isGenerating.value = false
  }
}

const downloadVideo = (video) => {
  // 实现下载逻辑
  console.log('下载视频:', video)
}

const shareVideo = (video) => {
  // 实现分享逻辑
  console.log('分享视频:', video)
}

const clearResults = () => {
  generatedVideos.value = []
}

// Aleph 视频生成方法
const generateAlephVideo = async () => {
  if (!alephFormData.prompt || !alephFormData.videoFile) return
  
  // 添加到使用历史
  if (addToUsageHistory) {
    addToUsageHistory('Runway Aleph')
  }
  
  isGenerating.value = true
  
  try {
    // 如果有上传的视频文件，需要先上传到服务器获取公开可访问的URL
    // 在实际API调用中，需要先调用文件上传接口获取URL
    let videoUrl = ''
    if (alephFormData.videoFile) {
      // TODO: 在实际应用中，需要先上传视频文件到服务器获取公开URL
      // videoUrl = await uploadVideoToServer(alephFormData.videoFile)
    }
    
    // 构建请求数据（使用纯对象，避免响应式对象）
    const requestData = {
      prompt: String(alephFormData.prompt),
      videoUrl: String(videoUrl)
    }
    
    // 可选字段
    if (alephFormData.waterMark) {
      requestData.waterMark = String(alephFormData.waterMark)
    }
    if (alephFormData.aspectRatio) {
      requestData.aspectRatio = String(alephFormData.aspectRatio)
    }
    if (alephFormData.seed !== null && alephFormData.seed !== undefined) {
      requestData.seed = Number(alephFormData.seed)
    }
    // 如果有上传的参考图片，需要先上传到服务器获取公开可访问的URL
    // 在实际API调用中，需要先调用文件上传接口获取URL，然后再设置 referenceImage
    if (alephFormData.referenceImageFile) {
      // TODO: 在实际应用中，需要先上传文件到服务器获取公开URL
      // const imageUrl = await uploadImageToServer(alephFormData.referenceImageFile)
      // requestData.referenceImage = imageUrl
    }
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // 模拟生成结果
    const newVideo = {
      id: Date.now(),
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://via.placeholder.com/320x180/3b82f6/ffffff?text=Runway+Aleph+Video',
      duration: 'Converted Video',
      resolution: '720p',
      aspectRatio: alephFormData.aspectRatio || '16:9',
      prompt: alephFormData.prompt,
      createdAt: new Date().toISOString()
    }
    
    generatedVideos.value.unshift(newVideo)
    
    // 重置表单（保留部分字段以便调整）
    // alephFormData.prompt = ''
    // alephFormData.videoUrl = ''
    
  } catch (error) {
    console.error('Failed to generate Aleph video:', error)
  } finally {
    isGenerating.value = false
  }
}

// Get config header title based on active tab
const getConfigHeaderTitle = () => {
  if (!isClient) return 'Configuration'
  const titles = {
    'generate': 'Video Generation Configuration',
    'aleph': 'Aleph Video Conversion Configuration',
    'extend': 'Video Extend Configuration'
  }
  return titles[activeTab.value] || 'Configuration'
}

// Extend 视频生成方法
const generateExtendVideo = async () => {
  if (!extendFormData.task || !extendFormData.prompt) return
  
  // 添加到使用历史
  if (addToUsageHistory) {
    addToUsageHistory('Runway Extend')
  }
  
  isGenerating.value = true
  
  try {
    // 构建请求数据（使用纯对象，避免响应式对象）
    const requestData = {
      task: String(extendFormData.task),
      prompt: String(extendFormData.prompt),
      quality: String(extendFormData.quality)
    }
    
    // 可选字段
    if (extendFormData.waterMark) {
      requestData.waterMark = String(extendFormData.waterMark)
    }
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // 模拟生成结果
    const newVideo = {
      id: Date.now(),
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://via.placeholder.com/320x180/3b82f6/ffffff?text=Runway+Extend+Video',
      duration: 'Extended Video',
      resolution: extendFormData.quality,
      prompt: extendFormData.prompt,
      createdAt: new Date().toISOString()
    }
    
    generatedVideos.value.unshift(newVideo)
    
    // 重置表单
    extendFormData.task = ''
    extendFormData.prompt = ''
    extendFormData.waterMark = ''
    
  } catch (error) {
    console.error('Failed to generate Extend video:', error)
  } finally {
    isGenerating.value = false
  }
}
</script>

<style scoped>
.runway-tool {
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

/* Tab 分类样式 */
.category-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
}

.category-tab {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  background: white;
  color: #64748b;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
}

.category-tab:hover {
  border-color: #3b82f6;
  background: #f8fafc;
  color: #3b82f6;
}

.category-tab.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.category-tab i {
  font-size: 16px;
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
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
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
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
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

/* 设置选项卡样式 */
.settings-tabs {
  display: flex;
  gap: 20px;
}

.tab-group {
  flex: 1;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  background: white;
}

.tab-header {
  background: #f8fafc;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
}

.tab-title {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.tab-content {
  padding: 16px;
}

.tab-options {
  display: flex;
  gap: 8px;
}

.tab-option {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  background: white;
  color: #64748b;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
}

.tab-option:hover:not(:disabled) {
  border-color: #3b82f6;
  background: #f8fafc;
  color: #3b82f6;
}

.tab-option.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.tab-option:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f9fafb;
}

.tab-warning {
  margin-top: 12px;
  padding: 8px 12px;
  background: #fef3c7;
  border: 1px solid #f59e0b;
  border-radius: 6px;
  color: #92400e;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.tab-warning i {
  color: #f59e0b;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.radio-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.radio-item:hover {
  border-color: #3b82f6;
  background: #f8fafc;
}

.radio-item input[type="radio"] {
  margin-right: 12px;
  width: auto;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
}

.radio-label small {
  color: #ef4444;
  font-size: 12px;
}

.select-wrapper {
  position: relative;
}

.select-wrapper select {
  appearance: none;
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

.form-help {
  font-size: 12px;
  color: #64748b;
  margin-top: 4px;
  line-height: 1.4;
}

.form-hint {
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
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
  background: #3b82f6;
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
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
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

.price-tag {
  font-size: 12px;
  opacity: 0.8;
  margin-left: 4px;
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
  .runway-tool {
    padding: 16px;
  }
  
  .tool-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .category-tabs {
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
    padding-bottom: 12px;
  }

  .category-tab {
    flex: 1;
    min-width: 100px;
    padding: 10px 12px;
    font-size: 13px;
  }

  .category-tab i {
    font-size: 14px;
  }
  
  .config-header {
    padding: 0 0 16px 0;
  }
  
  .settings-tabs {
    flex-direction: column;
    gap: 16px;
  }
  
  .tab-options {
    flex-direction: column;
  }
  
  .tab-option {
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
