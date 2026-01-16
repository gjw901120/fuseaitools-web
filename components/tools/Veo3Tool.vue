<template>
  <div class="veo3-tool">
    <!-- 工具信息头部 -->
    <div class="tool-header">
      <div class="tool-avatar">
        <img src="/tools-logo/Veo.png" alt="Veo3" />
      </div>
      <div class="tool-details">
        <h3>Veo 3</h3>
        <p>Google Veo 3 is a next-generation AI video generation model developed by Google DeepMind. It supports both text-to-video and image-to-video creation, producing high-fidelity, cinematic visuals with advanced scene understanding and natural motion simulation. users can access Veo 3 Fast for rapid, cost-efficient workflows or Veo 3 Quality for premium output, all with transparent pricing and stable infrastructure.</p>
      </div>
    </div>

    <!-- 生成模式选择 -->
    <div class="mode-section">
      <div class="mode-tabs">
        <div 
          class="mode-tab"
          :class="{ active: formData.generationType === 'TEXT_2_VIDEO' }"
          @click="formData.generationType = 'TEXT_2_VIDEO'"
        >
          <i class="fas fa-font"></i>
          <span>Text to Video</span>
          <div class="mode-info-icon" title="using only text prompts">
            <i class="fas fa-info-circle"></i>
          </div>
        </div>
        <div 
          class="mode-tab"
          :class="{ active: formData.generationType === 'FIRST_AND_LAST_FRAMES_2_VIDEO' }"
          @click="formData.generationType = 'FIRST_AND_LAST_FRAMES_2_VIDEO'"
        >
          <i class="fas fa-images"></i>
          <span>First And Last Frames to Video</span>
          <div class="mode-info-icon" title="Generate a transition video using two images">
            <i class="fas fa-info-circle"></i>
          </div>
        </div>
        <div 
          class="mode-tab"
          :class="{ active: formData.generationType === 'REFERENCE_2_VIDEO' }"
          @click="formData.generationType = 'REFERENCE_2_VIDEO'"
        >
          <i class="fas fa-image"></i>
          <span>Image to Video</span>
          <div class="mode-info-icon" title="Generated based on source images (only supports Fast model and 16:9 aspect ratio)">
            <i class="fas fa-info-circle"></i>
          </div>
        </div>
        <div 
          class="mode-tab"
          :class="{ active: formData.generationType === 'VIDEO_EXTEND' }"
          @click="formData.generationType = 'VIDEO_EXTEND'"
        >
          <i class="fas fa-expand-arrows-alt"></i>
          <span>Video Extend</span>
          <div class="mode-info-icon" title="This feature allows you to extend the duration or content of a video based on existing video clips and through prompt word descriptions.">
            <i class="fas fa-info-circle"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- 主内容区域：左右布局 -->
    <div class="main-content">
      <!-- 左侧：参数配置面板 -->
      <div class="config-panel">
      <div class="config-header">
        <h4>Video Generation Configuration</h4>
      </div>

      <form class="config-form" @submit.prevent="generateVideo">
          <!-- 视频扩展模式特有字段 -->
          <div v-if="formData.generationType === 'VIDEO_EXTEND'" class="form-group">
                          <label for="taskId" class="form-label">
               Original Task <span class="required">*</span>
            </label>
            <select
              id="taskId"
              v-model="formData.taskId"
              class="form-input"
              required
            >
              <option value="">Please select original task</option>
              <option value="task_001_video_generation">Task 001 - Product Promo Video</option>
              <option value="task_002_video_generation">Task 002 - Educational Demo Video</option>
            </select>
                          <div class="form-hint">
               Select the original video generation task to extend. Note: Videos after 1080P generation cannot be extended
            </div>
          </div>

        <!-- 提示词输入 -->
        <div class="form-group">
          <label for="prompt" class="form-label">
              <span v-if="formData.generationType === 'VIDEO_EXTEND'">Extension Description</span>
              <span v-else>Generation prompt</span>
              <span class="required">*</span>
          </label>
          <textarea
            id="prompt"
            v-model="formData.prompt"
            class="form-input"
            rows="4"
              :placeholder="getPromptPlaceholder()"
            required
          ></textarea>
          <div class="form-hint">
              {{ getPromptHint() }}
          </div>
        </div>

          <!-- 视频扩展模式的其他配置 -->
          <template v-if="formData.generationType === 'VIDEO_EXTEND'">
            <!-- 随机种子 -->
        <div class="form-group">
              <label for="seeds" class="form-label">Random Seed</label>
            <input
                id="seeds"
                v-model.number="formData.seeds"
                type="number"
                class="form-input"
                placeholder="10000-99999"
                min="10000"
                max="99999"
              />
              <div class="form-hint">
                Range 10000-99999, same seed generates similar content, system auto-assigns if not filled
          </div>
              </div>

            <!-- 水印文本 -->
            <div class="form-group">
              <label for="watermark" class="form-label">Watermark Text</label>
              <input
                id="watermark"
                v-model="formData.watermark"
                type="text"
                class="form-input"
                placeholder="Optional, add watermark to generated video"
              />
          <div class="form-hint">
                Optional, will add watermark to generated video if provided
          </div>
        </div>
          </template>

          <!-- 图片上传 - 仅在需要图片的模式下显示 -->
          <div v-if="formData.generationType === 'FIRST_AND_LAST_FRAMES_2_VIDEO' || formData.generationType === 'REFERENCE_2_VIDEO'" class="form-group">
            <label class="form-label">
              Reference Images 
              <span class="required">*</span>
              <span v-if="formData.generationType === 'FIRST_AND_LAST_FRAMES_2_VIDEO'" class="mode-hint">(1-2 images)</span>
              <span v-if="formData.generationType === 'REFERENCE_2_VIDEO'" class="mode-hint">(1-3 images)</span>
          </label>
            <UploadImage
              ref="imageUploadRef"
              input-id="veo3-image-upload"
              label=""
              upload-icon="fas fa-cloud-upload-alt"
              upload-text="Click to upload images"
              :upload-hint="getUploadHint()"
              :additional-hint="getImageUploadHint()"
              theme-color="#3b82f6"
              :max-files="formData.generationType === 'FIRST_AND_LAST_FRAMES_2_VIDEO' ? 2 : 3"
              :max-file-size="10 * 1024 * 1024"
                accept="image/*" 
              :multiple="true"
              @update:files="handleImageUpdate"
            />
        </div>

        <!-- 模型选择 - 非视频扩展模式和Image to Video模式显示 -->
        <div v-if="formData.generationType !== 'VIDEO_EXTEND' && formData.generationType !== 'REFERENCE_2_VIDEO'" class="form-group">
          <label class="form-label">Model Type</label>
          <div class="option-tabs two-columns">
            <button 
              type="button"
              class="option-tab"
              :class="{ active: formData.model === 'veo3' }"
              @click="formData.model = 'veo3'"
            >
              <i class="fas fa-star"></i>
              <span>Standard</span>
            </button>
            <button 
              type="button"
              class="option-tab"
              :class="{ active: formData.model === 'veo3_fast' }"
              @click="formData.model = 'veo3_fast'"
            >
              <i class="fas fa-bolt"></i>
              <span>Fast</span>
            </button>
          </div>
          <div class="form-hint">
            Standard model has higher quality, fast model generates faster
          </div>
        </div>

          <!-- 宽高比选择 - 非视频扩展模式和Image to Video模式显示 -->
        <div v-if="formData.generationType !== 'VIDEO_EXTEND' && formData.generationType !== 'REFERENCE_2_VIDEO'" class="form-group">
          <label class="form-label">Video Aspect Ratio</label>
          <div class="option-tabs three-columns">
            <button 
              type="button"
              class="option-tab"
              :class="{ active: formData.aspectRatio === '16:9' }"
              @click="formData.aspectRatio = '16:9'"
              title="Supports 1080P"
            >
              <i class="fas fa-expand"></i>
              <span>16:9</span>
            </button>
            <button 
              type="button"
              class="option-tab"
              :class="{ active: formData.aspectRatio === '9:16' }"
              @click="formData.aspectRatio = '9:16'"
            >
              <i class="fas fa-compress"></i>
              <span>9:16</span>
            </button>
            <button 
              type="button"
              class="option-tab"
              :class="{ active: formData.aspectRatio === 'Auto' }"
              @click="formData.aspectRatio = 'Auto'"
            >
              <i class="fas fa-magic"></i>
              <span>Auto</span>
            </button>
          </div>
            <div class="form-hint">
              16:9 supports 1080P HD video generation
            </div>
        </div>

          <!-- 水印设置 - 非视频扩展模式显示 -->
        <div v-if="formData.generationType !== 'VIDEO_EXTEND'" class="form-group">
            <label for="watermark" class="form-label">Watermark Text</label>
              <input
              id="watermark"
              v-model="formData.watermark"
              type="text"
              class="form-input"
              placeholder="Optional, add watermark to video"
            />
        </div>

        <!-- 随机种子 - 非视频扩展模式显示 -->
        <div v-if="formData.generationType !== 'VIDEO_EXTEND'" class="form-group">
            <label for="seeds" class="form-label">Random Seed</label>
          <input
            id="seeds"
            v-model.number="formData.seeds"
            type="number"
            min="10000"
            max="99999"
              class="form-input"
              placeholder="10000-99999, same seed generates similar content"
          />
          <div class="form-hint">
              Optional, used to control randomness of generated content
          </div>
        </div>

          <!-- 提示词翻译 - 非视频扩展模式显示 -->
          <div v-if="formData.generationType !== 'VIDEO_EXTEND'" class="form-group">
            <label class="checkbox-label" for="enableTranslation">
          <input
                id="enableTranslation"
                v-model="formData.enableTranslation" 
                type="checkbox"
              >
              <span class="checkmark"></span>
              Enable Translation to English
            </label>
          <div class="form-hint">
              Automatically translate prompts to English for better generation results
          </div>
        </div>

        <!-- 生成按钮 -->
          <button
            type="submit"
            class="generate-btn"
            :disabled="!canGenerate"
          >
            <i class="fas fa-play"></i>
            Generate Video
            <span class="price-tag">($3.2)</span>
          </button>
      </form>
      </div>

      <!-- 右侧：结果展示区域 -->
      <div class="result-panel">
        <div v-if="!result" class="empty-state">
          <!-- 预览视频 - Video Extend 模式不显示 -->
          <div v-if="formData.generationType !== 'VIDEO_EXTEND'" class="preview-video-container">
            <video 
              :key="formData.generationType"
              :src="getPreviewVideoSrc()" 
              controls 
              class="preview-video"
              muted
            ></video>
          </div>
          <h4>No video generated yet</h4>
          <p>Enter video description and click "Generate Video" to start creating</p>
        </div>
        
        <div v-else class="result-display">
          <!-- 视频结果 -->
          <div class="video-result">
              <div class="video-player">
              <video 
                v-if="result.videoUrl"
                :src="result.videoUrl" 
                controls 
                class="video-element"
              ></video>
              <div v-else class="video-placeholder">
                <i class="fas fa-video"></i>
                <p>Video generating...</p>
              </div>
            </div>
            
            <div class="video-info">
              <h5>{{ result.taskId || 'Video Generation Task' }}</h5>
                <div class="video-meta">
                <span><i class="fas fa-clock"></i> {{ result.duration || 'Unknown duration' }}</span>
                <span><i class="fas fa-expand"></i> {{ result.aspectRatio || '16:9' }}</span>
                <span><i class="fas fa-cog"></i> {{ result.model || 'veo3_fast' }}</span>
                </div>
            </div>

            <!-- 操作按钮 -->
                <div class="video-actions">
              <button @click="downloadVideo" class="action-btn">
                    <i class="fas fa-download"></i>
                Download Video
                  </button>
              <button @click="shareVideo" class="action-btn">
                    <i class="fas fa-share"></i>
                Share Video
              </button>
              <button v-if="result.taskId" @click="get1080PVideo" class="action-btn">
                <i class="fas fa-hd-video"></i>
                Get 1080P
                  </button>
            </div>
          </div>
          
          <!-- 视频扩展功能 -->
          <div v-if="result.taskId" class="video-extend">
            <h6>Video Extension</h6>
            <div class="extend-form">
              <textarea
                v-model="extendPrompt"
                class="form-input"
                rows="2"
                placeholder="Describe how to extend the video content..."
              ></textarea>
              <button 
                @click="extendVideo" 
                class="extend-btn"
                :disabled="!extendPrompt.trim()"
              >
                <i class="fas fa-expand-arrows-alt"></i>
                Extend Video
              </button>
            </div>
              </div>
              </div>
              </div>
            </div>

    <!-- 使用提示 -->
    <div class="usage-tips">
      <div class="tip-item">
        <span class="tip-icon">🎬</span>
        <span>Text to Video: Describe video content in detail, including actions, scenes, styles, etc.</span>
          </div>
      <div class="tip-item">
        <span class="tip-icon">🖼️</span>
        <span>Image to Video: Upload 1-3 reference images, supports multiple generation modes</span>
        </div>
      <div class="tip-item">
        <span class="tip-icon">⚡</span>
        <span>Fast Model: Fast generation speed, suitable for quick previews and testing</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">🎯</span>
        <span>Standard Model: Higher quality, suitable for final production</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, inject, watch } from 'vue'
import UploadImage from './common/UploadImage.vue'

// 注入父组件的函数
const addToUsageHistory = inject('addToUsageHistory')

// 表单数据
const formData = reactive({
  prompt: '',
  imageUrls: [],
  model: 'veo3_fast',
  generationType: 'TEXT_2_VIDEO',
  watermark: '',
  aspectRatio: '16:9',
  seeds: null,
  enableTranslation: true,
  taskId: ''
})

// 结果数据
const result = ref(null)
const extendPrompt = ref('')
const imageUploadRef = ref(null)

// 监听生成模式变化
watch(() => formData.generationType, async (newType) => {
  // 先清空已有图片
  if (imageUploadRef.value) {
    imageUploadRef.value.clearFiles()
  }
  
  if (newType === 'FIRST_AND_LAST_FRAMES_2_VIDEO') {
    // 自动加载默认图片
    try {
      const startResponse = await fetch('/tools-example/veo3_start.webp')
      const endResponse = await fetch('/tools-example/veo3_end.webp')
      
      if (startResponse.ok && endResponse.ok) {
        const startBlob = await startResponse.blob()
        const endBlob = await endResponse.blob()
        
        const startFile = new File([startBlob], 'veo3_start.webp', { type: 'image/webp' })
        const endFile = new File([endBlob], 'veo3_end.webp', { type: 'image/webp' })
        
        await loadImagesToComponent([startFile, endFile])
      }
    } catch (error) {
      console.error('Failed to load default images:', error)
    }
  } else if (newType === 'REFERENCE_2_VIDEO') {
    // Image to Video 模式：自动设置为 fast 模型和 16:9 宽高比
    formData.model = 'veo3_fast'
    formData.aspectRatio = '16:9'
    // 自动加载默认图片
    try {
      const oneResponse = await fetch('/tools-example/veo3_i2v_one.webp')
      const twoResponse = await fetch('/tools-example/veo3_i2v_two.webp')
      const threeResponse = await fetch('/tools-example/veo3_i2v_three.webp')
      
      if (oneResponse.ok && twoResponse.ok && threeResponse.ok) {
        const oneBlob = await oneResponse.blob()
        const twoBlob = await twoResponse.blob()
        const threeBlob = await threeResponse.blob()
        
        const oneFile = new File([oneBlob], 'veo3_i2v_one.webp', { type: 'image/webp' })
        const twoFile = new File([twoBlob], 'veo3_i2v_two.webp', { type: 'image/webp' })
        const threeFile = new File([threeBlob], 'veo3_i2v_three.webp', { type: 'image/webp' })
        
        await loadImagesToComponent([oneFile, twoFile, threeFile])
      }
    } catch (error) {
      console.error('Failed to load default images:', error)
    }
  } else if (newType === 'TEXT_2_VIDEO') {
    // 切换到文本模式时清空图片
    formData.imageUrls = []
  } else if (newType === 'VIDEO_EXTEND') {
    // 切换到视频扩展模式时清空结果（包括预览视频）
    result.value = null
  }
})

// 辅助函数：将图片加载到组件
const loadImagesToComponent = async (files) => {
  try {
    // 使用 DataTransfer 创建 FileList
    const dataTransfer = new DataTransfer()
    files.forEach(file => dataTransfer.items.add(file))
    
    // 将文件添加到 input
    if (imageUploadRef.value && imageUploadRef.value.$el) {
      const input = imageUploadRef.value.$el.querySelector('input[type="file"]')
      if (input) {
        input.files = dataTransfer.files
        input.dispatchEvent(new Event('change', { bubbles: true }))
      }
    }
  } catch (error) {
    console.error('Failed to load images to component:', error)
  }
}

// 计算属性
const canGenerate = computed(() => {
  // 基础验证：必须有提示词
  if (!formData.prompt.trim()) return false
  
  // 根据生成模式进行额外验证
  if (formData.generationType === 'FIRST_AND_LAST_FRAMES_2_VIDEO') {
    // 首尾帧模式：需要1-2张图片
    return formData.imageUrls.length >= 1 && formData.imageUrls.length <= 2
  } else if (formData.generationType === 'REFERENCE_2_VIDEO') {
    // 参考图模式：需要1-3张图片
    return formData.imageUrls.length >= 1 && formData.imageUrls.length <= 3
  } else if (formData.generationType === 'VIDEO_EXTEND') {
    // 视频扩展模式：需要taskId
    return formData.taskId.trim().length > 0
  }
  
  // 文生视频模式：只需要提示词
  return true
})

// 图片上传处理
const handleImageUpdate = (files) => {
  if (files && files.length > 0) {
    // 将文件转换为URL
    formData.imageUrls = files.map(file => URL.createObjectURL(file))
  } else {
    formData.imageUrls = []
  }
  
  // 触发事件通知父组件（如果使用 UploadImage 组件）
  // emit('update:files', files)
}

// 获取图片上传提示信息
const getImageUploadHint = () => {
  if (formData.generationType === 'FIRST_AND_LAST_FRAMES_2_VIDEO') {
    return '1 image: revolve around this image; 2 images: first image as the first frame, second image as the last frame, generate transition video'
  } else if (formData.generationType === 'REFERENCE_2_VIDEO') {
    return 'Upload 1-3 reference images, AI will generate video content based on these images'
  }
  return 'Upload reference images'
}

// 获取上传提示
const getUploadHint = () => {
  if (formData.generationType === 'FIRST_AND_LAST_FRAMES_2_VIDEO') {
    return 'Supports 1-2 images, JPG/PNG format'
  } else if (formData.generationType === 'REFERENCE_2_VIDEO') {
    return 'Supports 1-3 images, JPG/PNG format'
  }
  return 'Supports 1-3 images, JPG/PNG format'
}

// 获取提示词占位符
const getPromptPlaceholder = () => {
  if (formData.generationType === 'VIDEO_EXTEND') {
    return 'Describe in detail how you want the video to extend, including actions, scene changes, styles, etc.'
  } else if (formData.generationType === 'FIRST_AND_LAST_FRAMES_2_VIDEO') {
    return 'The camera performs a smooth 180-degree arc shot, starting with the front-facing view of the singer and circling around her to seamlessly end on the POV shot from behind her on stage. The singer sings "when you look me in the eyes, I can see a million stars.'
  } else if (formData.generationType === 'REFERENCE_2_VIDEO') {
    return 'Close up shot of woman with sunglasses on top of her head, gold hood earrings, is walking in the garden, she is lost and asks where everyone is and what\'s going on.'
  }
  return 'A keyboard whose keys are made of different types of candy. Typing makes sweet, crunchy sounds. Audio: Crunchy, sugary typing sounds, delighted giggles.'
}

// 获取提示词说明
const getPromptHint = () => {
  if (formData.generationType === 'VIDEO_EXTEND') {
    return ''
  }
  return ''
}

// 获取预览视频路径
const getPreviewVideoSrc = () => {
  if (formData.generationType === 'FIRST_AND_LAST_FRAMES_2_VIDEO') {
    return '/tools-example/veo3_frames.mp4'
  } else if (formData.generationType === 'REFERENCE_2_VIDEO') {
    return '/tools-example/veo3_i2v.mp4'
  }
  return '/tools-example/veo3_t2v.mp4'
}

// 生成视频
const generateVideo = async () => {
  // 添加到使用历史
  if (addToUsageHistory) {
    addToUsageHistory('Veo3')
  }
  
  try {
    let apiEndpoint = ''
    let requestData = {}

    if (formData.generationType === 'VIDEO_EXTEND') {
      // 视频扩展模式
      apiEndpoint = '/api/veo3/extend'
      requestData = {
        taskId: formData.taskId,
        prompt: formData.prompt
      }
      
      // 添加可选参数
      if (formData.watermark) {
        requestData.watermark = formData.watermark
      }
      if (formData.seeds) {
        requestData.seeds = formData.seeds
      }
    } else {
      // 其他生成模式
      apiEndpoint = '/api/veo3/generate'
      requestData = {
      prompt: formData.prompt,
      model: formData.model,
      aspectRatio: formData.aspectRatio,
        enableTranslation: formData.enableTranslation
      }

      // 添加可选参数
      if (formData.imageUrls.length > 0) {
        requestData.imageUrls = formData.imageUrls
      }
      if (formData.generationType) {
        requestData.generationType = formData.generationType
      }
      if (formData.watermark) {
        requestData.watermark = formData.watermark
      }
      if (formData.seeds) {
        requestData.seeds = formData.seeds
      }
    }

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
    
    if (response.ok) {
      const data = await response.json()
      result.value = data
    } else {
      throw new Error('Generation failed')
    }
  } catch (error) {
    console.error('Generation failed:', error)
      // Simulate success result for demo
    result.value = {
      taskId: 'veo3_' + Date.now(),
      videoUrl: 'https://example.com/generated-video.mp4',
      duration: '0:10',
      aspectRatio: formData.aspectRatio,
      model: formData.model
    }
  }
}

// 扩展视频
const extendVideo = async () => {
  if (!result.value?.taskId || !extendPrompt.value.trim()) return

  try {
    const requestData = {
      taskId: result.value.taskId,
      prompt: extendPrompt.value
    }

    if (formData.watermark) {
      requestData.watermark = formData.watermark
    }
    if (formData.seeds) {
      requestData.seeds = formData.seeds
    }
    if (formData.callBackUrl) {
      requestData.callBackUrl = formData.callBackUrl
    }

    const response = await fetch('/api/veo3/extend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
    
    if (response.ok) {
      const data = await response.json()
      result.value = data
      extendPrompt.value = ''
    } else {
      throw new Error('Extension failed')
    }
  } catch (error) {
    console.error('Extension failed:', error)
    alert('Video extension failed, please try again')
  }
}

// 获取1080P视频
const get1080PVideo = async () => {
  if (!result.value?.taskId) return

  try {
    const response = await fetch(`/api/veo3/1080p/${result.value.taskId}`, {
      method: 'GET'
    })
    
    if (response.ok) {
      const data = await response.json()
      result.value.videoUrl = data.videoUrl
    } else {
      throw new Error('Failed to get 1080P video')
    }
  } catch (error) {
    console.error('Failed to get 1080P video:', error)
    alert('Failed to get 1080P video, please try again')
  }
}

// 下载视频
const downloadVideo = () => {
  if (result.value?.videoUrl) {
  const link = document.createElement('a')
    link.href = result.value.videoUrl
    link.download = `veo3-video-${Date.now()}.mp4`
  link.click()
  }
}

// 分享视频
const shareVideo = () => {
  if (navigator.share && result.value) {
    navigator.share({
      title: 'Veo3 Generated Video',
      text: 'Check out the video I generated using Veo3',
      url: result.value.videoUrl
    })
  } else {
    // 复制链接到剪贴板
    navigator.clipboard.writeText(result.value.videoUrl)
    alert('Video link copied to clipboard')
  }
}
</script>

<style scoped>
.veo3-tool {
  width: 100%;
  height: 100%;
  padding: 20px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

/* 工具头部 */
.tool-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
}

.tool-avatar { width: 48px; height: 48px; border-radius: 12px; overflow: hidden; flex: 0 0 auto; display: flex; align-items: center; justify-content: center; }
.tool-avatar img { width: 100%; height: 100%; object-fit: contain; image-rendering: auto; }

.tool-details h3 {
  margin: 0 0 4px 0;
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
}

.tool-details p {
  margin: 0;
  font-size: 13px;
  color: #6b7280;
  line-height: 1.5;
}

/* 主内容区域 */
.main-content {
  display: flex;
  flex: 1;
  min-height: 0;
  gap: 20px;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e2e8f0;
}

.config-header h4 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

/* 表单样式 */
.config-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  overflow-y: auto;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.required {
  color: #3b82f6;
}

.form-input,
.form-select {
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s ease;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-hint {
  font-size: 12px;
  color: #6b7280;
  line-height: 1.4;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
}

.checkbox-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #3b82f6;
}

/* 模式选择区域 */
.mode-section {
  margin-bottom: 24px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.mode-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 12px;
}

/* 模式切换标签 */
.mode-tabs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 8px;
}

.mode-tab {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 8px;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.mode-tab:hover {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.05);
}

.mode-tab.active {
  border-color: #3b82f6;
  background: #3b82f6;
  color: white;
}

.mode-tab i {
  font-size: 16px;
  margin-bottom: 4px;
}

.mode-tab span {
  font-size: 12px;
  font-weight: 500;
}

.mode-info-icon {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  cursor: help;
  flex-shrink: 0;
  transition: color 0.2s ease;
}

.mode-tab.active .mode-info-icon {
  color: rgba(255, 255, 255, 0.8);
}

.mode-info-icon:hover {
  color: #3b82f6;
}

.mode-tab.active .mode-info-icon:hover {
  color: white;
}

.mode-hint {
  font-size: 12px;
  color: #6b7280;
  font-weight: normal;
}

/* 选项标签页 */
.option-tabs {
  display: grid;
  gap: 8px;
  margin-bottom: 8px;
}

.option-tabs.two-columns {
  grid-template-columns: repeat(2, 1fr);
}

.option-tabs.three-columns {
  grid-template-columns: repeat(3, 1fr);
}

.option-tab {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 12px;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
}

.option-tab:hover {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.05);
}

.option-tab.active {
  border-color: #3b82f6;
  background: #3b82f6;
  color: white;
}

.option-tab i {
  font-size: 14px;
}

/* 生成按钮 */
.generate-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.generate-btn:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-1px);
}

.generate-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

.price-tag {
  font-size: 14px;
  opacity: 0.9;
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

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  text-align: center;
  color: #6b7280;
  gap: 20px;
  padding: 20px;
}

.preview-video-container {
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  background: #000;
}

.preview-video {
  width: 100%;
  height: auto;
  display: block;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state h4 {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #374151;
}

.empty-state p {
  margin: 0;
  font-size: 14px;
}

/* 视频结果 */
.video-result {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  min-height: 0;
}

.video-player {
  position: relative;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
}

.video-element {
  width: 100%;
  height: auto;
  display: block;
}

.video-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #6b7280;
  background: #f3f4f6;
}

.video-placeholder i {
  font-size: 32px;
  margin-bottom: 8px;
}

.video-info h5 {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #1f2937;
}

.video-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #6b7280;
}

.video-meta span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.video-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.action-btn {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;
}

.action-btn:hover {
  background: #e5e7eb;
  border-color: #9ca3af;
}

/* 视频扩展 */
.video-extend {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
}

.video-extend h6 {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #374151;
}

.extend-form {
  display: flex;
  gap: 8px;
}

.extend-form .form-input {
  flex: 1;
}

.extend-btn {
  background: #10b981;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;
}

.extend-btn:hover:not(:disabled) {
  background: #059669;
}

.extend-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
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
  .veo3-tool {
    padding: 16px;
  }
  
  .tool-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .config-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .mode-tabs {
    grid-template-columns: repeat(2, 1fr);
    gap: 6px;
  }
  
  .mode-tab {
    padding: 10px 6px;
  }
  
  .mode-tab i {
    font-size: 14px;
  }
  
  .mode-tab span {
    font-size: 11px;
  }
  
  
  .video-actions {
    flex-direction: column;
  }
  
  .extend-form {
    flex-direction: column;
  }
}
</style>