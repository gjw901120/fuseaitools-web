<template>
  <div class="nano-banana-tool">
    <!-- Tool Header -->
    <div class="tool-header">
      <div class="header-left">
        <div class="tool-icon">
          <img src="/tools-logo/NanoBanana.png" alt="Nano Banana" />
        </div>
        <div class="tool-info">
          <h3>Nano Banana</h3>
          <p>Lightweight AI image generation tool</p>
        </div>
      </div>
    </div>

    <!-- Function Selection Section -->
    <div class="function-selection-section">
      <div class="function-tabs">
        <div 
          v-for="func in functionOptions" 
          :key="func.id"
          class="function-tab"
          :class="{ active: activeTab === func.id }"
          @click="activeTab = func.id"
        >
          <div class="function-icon">
            <i :class="func.icon"></i>
          </div>
          <div class="function-info">
            <div class="function-name">{{ func.name }}</div>
            <div class="function-description">{{ func.description }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area: Left (1/3) and Right (2/3) -->
    <div class="main-content">
      <!-- Left: Parameter Configuration Panel -->
      <div class="config-panel">
        <div class="config-header">
          <h4>{{ activeTab === 'nano-banana' ? 'Nano Banana Configuration' : 'Nano Banana Pro Configuration' }}</h4>
        </div>

        <!-- Nano Banana Form -->
        <form v-if="activeTab === 'nano-banana'" class="config-form" @submit.prevent="generateImage">
          <!-- 模式选择 -->
          <div class="form-group">
            <label>Generation Mode *</label>
            <div class="mode-switch">
              <button 
                type="button" 
                class="mode-btn" 
                :class="{ active: formData.mode === 'text-to-image' }"
                @click="formData.mode = 'text-to-image'"
              >
                <i class="fas fa-keyboard"></i> Text to Image
              </button>
              <button 
                type="button" 
                class="mode-btn" 
                :class="{ active: formData.mode === 'image-to-image' }"
                @click="formData.mode = 'image-to-image'"
              >
                <i class="fas fa-images"></i> Image to Image
              </button>
            </div>
            <div class="form-hint">
              {{ formData.mode === 'text-to-image' ? 'Generate images from text descriptions' : 'Edit and generate based on uploaded images' }}
            </div>
          </div>

          <!-- 图片上传（仅在图生图模式显示） -->
          <div class="form-group" v-if="formData.mode === 'image-to-image'">
            <label>Upload Image *</label>
            <UploadImage
              input-id="nano-banana-image-upload"
              label=""
              upload-icon="fas fa-cloud-upload-alt"
              upload-text="Click to upload image"
              upload-hint="Supports JPG, PNG, WEBP formats, maximum 10MB"
              additional-hint="Upload images to edit, up to 10 images"
              theme-color="#667eea"
              :max-files="10"
              :max-file-size="10 * 1024 * 1024"
              accept="image/jpeg,image/png,image/webp"
              :multiple="true"
              @update:files="handleImageUpdate"
            />
          </div>

          <!-- 提示词输入 -->
          <div class="form-group">
            <label>Prompt *</label>
            <textarea
              v-model="formData.prompt"
              :placeholder="getPromptPlaceholder()"
              rows="4"
              maxlength="5000"
              class="form-input"
              required
            ></textarea>
            <div class="char-count">{{ formData.prompt.length }}/5000</div>
            <div class="input-hint">{{ getPromptHint() }}</div>
          </div>

          <!-- 输出格式选择 -->
          <div class="form-group">
            <label>Output Format</label>
            <div class="tab-group">
              <div 
                class="tab-option"
                :class="{ active: formData.output_format === 'png' }"
                @click="formData.output_format = 'png'"
              >
                  <i class="fas fa-file-image"></i>
                <span>PNG</span>
              </div>
              <div 
                class="tab-option"
                :class="{ active: formData.output_format === 'jpeg' }"
                @click="formData.output_format = 'jpeg'"
              >
                  <i class="fas fa-file-image"></i>
                <span>JPEG</span>
              </div>
            </div>
          </div>

          <!-- 图像尺寸选择 -->
          <div class="form-group">
            <label>Image Size</label>
            <div class="tab-group">
              <div 
                class="tab-option"
                :class="{ active: formData.image_size === '1:1' }"
                @click="formData.image_size = '1:1'"
              >
                  <i class="fas fa-square"></i>
                <span>1:1</span>
              </div>
              <div 
                class="tab-option"
                :class="{ active: formData.image_size === '9:16' }"
                @click="formData.image_size = '9:16'"
              >
                  <i class="fas fa-mobile-alt"></i>
                <span>9:16</span>
              </div>
              <div 
                class="tab-option"
                :class="{ active: formData.image_size === '16:9' }"
                @click="formData.image_size = '16:9'"
              >
                  <i class="fas fa-desktop"></i>
                <span>16:9</span>
              </div>
              <div 
                class="tab-option"
                :class="{ active: formData.image_size === '3:4' }"
                @click="formData.image_size = '3:4'"
              >
                  <i class="fas fa-mobile-alt"></i>
                <span>3:4</span>
              </div>
              <div 
                class="tab-option"
                :class="{ active: formData.image_size === '4:3' }"
                @click="formData.image_size = '4:3'"
              >
                  <i class="fas fa-square"></i>
                <span>4:3</span>
              </div>
              <div 
                class="tab-option"
                :class="{ active: formData.image_size === '3:2' }"
                @click="formData.image_size = '3:2'"
              >
                  <i class="fas fa-rectangle-wide"></i>
                <span>3:2</span>
              </div>
              <div 
                class="tab-option"
                :class="{ active: formData.image_size === '2:3' }"
                @click="formData.image_size = '2:3'"
              >
                  <i class="fas fa-mobile-alt"></i>
                <span>2:3</span>
              </div>
              <div 
                class="tab-option"
                :class="{ active: formData.image_size === '5:4' }"
                @click="formData.image_size = '5:4'"
              >
                  <i class="fas fa-rectangle-wide"></i>
                <span>5:4</span>
              </div>
              <div 
                class="tab-option"
                :class="{ active: formData.image_size === '4:5' }"
                @click="formData.image_size = '4:5'"
              >
                  <i class="fas fa-mobile-alt"></i>
                <span>4:5</span>
              </div>
              <div 
                class="tab-option"
                :class="{ active: formData.image_size === '21:9' }"
                @click="formData.image_size = '21:9'"
              >
                  <i class="fas fa-tv"></i>
                <span>21:9</span>
              </div>
              <div 
                class="tab-option"
                :class="{ active: formData.image_size === 'auto' }"
                @click="formData.image_size = 'auto'"
              >
                  <i class="fas fa-magic"></i>
                <span>auto</span>
              </div>
            </div>
          </div>

          <!-- 生成按钮 -->
          <button type="submit" :disabled="isGenerating || !canGenerate" class="generate-btn">
            <i v-if="isGenerating" class="fas fa-spinner fa-spin"></i>
            <i v-else :class="formData.mode === 'image-to-image' ? 'fas fa-images' : 'fas fa-magic'"></i>
            {{ isGenerating ? 'Generating...' : (formData.mode === 'image-to-image' ? 'Generate from Image' : 'Generate Image') }}
            <span class="price-tag">($0.03)</span>
          </button>
        </form>

        <!-- Nano Banana Pro Form -->
        <form v-if="activeTab === 'nano-banana-pro'" class="config-form" @submit.prevent="generateImagePro">
          <!-- 提示词输入 -->
          <div class="form-group">
            <label>Prompt *</label>
            <textarea
              v-model="proFormData.prompt"
              placeholder="A text description of the image you want to generate"
              rows="6"
              maxlength="20000"
              class="form-input"
              required
            ></textarea>
            <div class="char-count">{{ proFormData.prompt.length }}/20000</div>
            <div class="input-hint">Provide detailed image description, supports up to 20000 characters</div>
          </div>

          <!-- 图片上传 -->
          <div class="form-group">
            <label>Input Images (Optional)</label>
            <UploadImage
              input-id="nano-banana-pro-image-upload"
              label=""
              upload-icon="fas fa-cloud-upload-alt"
              upload-text="Click to upload images"
              upload-hint="Supports JPG, PNG, WEBP formats, maximum 30MB per image"
              additional-hint="Upload up to 8 images as reference or for transformation"
              theme-color="#667eea"
              :max-files="8"
              :max-file-size="30 * 1024 * 1024"
              accept="image/jpeg,image/png,image/webp"
              :multiple="true"
              @update:files="handleProImageUpdate"
            />
          </div>

          <!-- 宽高比选择 -->
          <div class="form-group">
            <label>Aspect Ratio</label>
            <div class="tab-group">
              <div 
                v-for="ratio in aspectRatios"
                :key="ratio"
                class="tab-option"
                :class="{ active: proFormData.aspect_ratio === ratio }"
                @click="proFormData.aspect_ratio = ratio"
              >
                <span>{{ ratio }}</span>
              </div>
            </div>
          </div>

          <!-- 分辨率选择 -->
          <div class="form-group">
            <label>Resolution</label>
            <div class="tab-group">
              <div 
                v-for="res in resolutions"
                :key="res"
                class="tab-option"
                :class="{ active: proFormData.resolution === res }"
                @click="proFormData.resolution = res"
              >
                <span>{{ res }}</span>
              </div>
            </div>
          </div>

          <!-- 输出格式选择 -->
          <div class="form-group">
            <label>Output Format</label>
            <div class="tab-group">
              <div 
                class="tab-option"
                :class="{ active: proFormData.output_format === 'png' }"
                @click="proFormData.output_format = 'png'"
              >
                <i class="fas fa-file-image"></i>
                <span>PNG</span>
              </div>
              <div 
                class="tab-option"
                :class="{ active: proFormData.output_format === 'jpg' }"
                @click="proFormData.output_format = 'jpg'"
              >
                <i class="fas fa-file-image"></i>
                <span>JPG</span>
              </div>
            </div>
          </div>

          <!-- 生成按钮 -->
          <button type="submit" :disabled="isGenerating || !canGeneratePro" class="generate-btn">
            <i v-if="isGenerating" class="fas fa-spinner fa-spin"></i>
            <i v-else class="fas fa-magic"></i>
            {{ isGenerating ? 'Generating...' : 'Generate Image' }}
          </button>
        </form>
      </div>

      <!-- Right: Image Display Area -->
      <div class="image-display-panel">
        <div class="image-header">
          <h4>Image Preview</h4>
          <div class="image-actions" v-if="generatedImages.length > 0">
            <button @click="clearResults" class="btn-secondary">
              <i class="fas fa-trash"></i> Clear
            </button>
          </div>
        </div>
        
        <div class="image-container">
          <div v-if="generatedImages.length > 0" class="image-showcase">
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
                <div class="image-meta">
                  <span class="image-size">{{ image.image_size }}</span>
                  <span class="image-format">{{ image.output_format.toUpperCase() }}</span>
                </div>
                <div class="image-time">{{ image.timestamp }}</div>
              </div>
            </div>
          </div>
          
          <!-- Empty State -->
          <div v-else class="empty-state">
            <div class="empty-icon">
              <i class="fas fa-banana"></i>
            </div>
            <h3>Waiting for Image Generation</h3>
            <p>Enter a prompt and select parameters, click "Generate Image" to start creating your AI image</p>
            <div class="empty-features">
              <div class="feature-item">
                <i class="fas fa-magic"></i>
                <span>Fast Generation</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-palette"></i>
                <span>Multiple Sizes</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-file-image"></i>
                <span>Format Options</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-bolt"></i>
                <span>Lightweight</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Usage Tips -->
    <div class="usage-tips" v-if="activeTab === 'nano-banana'">
      <div class="tip-item">
        <span class="tip-icon">🎨</span>
        <span><strong>Mode Selection:</strong> Text to Image is suitable for creating from scratch, Image to Image is suitable for editing existing images</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">📤</span>
        <span><strong>Image Upload:</strong> Image to Image mode supports uploading up to 10 images in JPG/PNG/WEBP format</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">✍️</span>
        <span><strong>Detailed Description:</strong> Provide detailed image descriptions or editing requirements for better results</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">📝</span>
        <span><strong>Character Limit:</strong> Prompt supports up to 5000 characters</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">🖼️</span>
        <span><strong>Format Selection:</strong> PNG supports transparent background, JPEG files are smaller</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">📐</span>
        <span><strong>Size Selection:</strong> Choose the appropriate aspect ratio for the best visual effect</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">🔀</span>
        <span><strong>Auto Size:</strong> Select auto to let AI automatically determine the best aspect ratio</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">⚡</span>
        <span><strong>Lightweight:</strong> Nano Banana is optimized for fast generation</span>
      </div>
    </div>
    <div class="usage-tips" v-if="activeTab === 'nano-banana-pro'">
      <div class="tip-item">
        <span class="tip-icon">✍️</span>
        <span><strong>Prompt:</strong> Provide detailed image descriptions, supports up to 20000 characters for complex scenes</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">🖼️</span>
        <span><strong>Input Images:</strong> Upload up to 8 images as reference or for transformation, max 30MB per image</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">📐</span>
        <span><strong>Aspect Ratio:</strong> Choose the appropriate aspect ratio for your use case, or select "auto" for automatic selection</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">🎯</span>
        <span><strong>Resolution:</strong> Select 1K, 2K, or 4K resolution based on your quality requirements</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">💾</span>
        <span><strong>Output Format:</strong> PNG supports transparent background, JPG files are smaller in size</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">⭐</span>
        <span><strong>Pro Features:</strong> Nano Banana Pro offers enhanced image generation capabilities with higher quality output</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import UploadImage from './common/UploadImage.vue'

const router = useRouter()

// Tab state
const activeTab = ref('nano-banana')

// Function options configuration
const functionOptions = ref([
  {
    id: 'nano-banana',
    name: 'Nano Banana',
    description: 'Lightweight Image Generation',
    icon: 'fas fa-banana'
  },
  {
    id: 'nano-banana-pro',
    name: 'Nano Banana Pro',
    description: 'Advanced Image Generation',
    icon: 'fas fa-star'
  }
])

// Nano Banana form data
const formData = reactive({
  mode: 'text-to-image', // 'text-to-image' 或 'image-to-image'
  prompt: '',
  image_urls: [], // 图生图模式下的图片URL数组
  output_format: 'png',
  image_size: '1:1'
})

// Nano Banana Pro form data
const proFormData = reactive({
  prompt: '',
  image_input: [], // Array of image URLs
  aspect_ratio: '1:1',
  resolution: '1K',
  output_format: 'png'
})

// Aspect ratios for Pro
const aspectRatios = ['1:1', '2:3', '3:2', '3:4', '4:3', '4:5', '5:4', '9:16', '16:9', '21:9', 'auto']

// Resolutions for Pro
const resolutions = ['1K', '2K', '4K']

const isGenerating = ref(false)
const generatedImages = ref([])

// 计算属性
const canGenerate = computed(() => {
  if (!formData.prompt.trim()) return false
  
  if (formData.mode === 'image-to-image') {
    return formData.image_urls.length > 0
  }
  
  return true
})

const canGeneratePro = computed(() => {
  return proFormData.prompt.trim().length > 0
})

// 方法
const getPromptPlaceholder = () => {
  if (formData.mode === 'image-to-image') {
    return 'Describe the edits you want to make to the image, for example: "turn this photo into a character figure. Behind it, place a box with the character\'s image printed on it..."'
  }
  return 'Describe the image content you want to generate...'
}

const getPromptHint = () => {
  if (formData.mode === 'image-to-image') {
    return 'Provide detailed editing requirements for the image, supports up to 5000 characters'
  }
  return 'Provide detailed image content description, supports up to 5000 characters'
}

const handleImageUpdate = (files) => {
  if (files && files.length > 0) {
    formData.image_urls = files.map(file => URL.createObjectURL(file))
  } else {
    formData.image_urls = []
  }
}

const handleProImageUpdate = (files) => {
  if (files && files.length > 0) {
    // For Pro, we need to upload files and get URLs
    // For now, using object URLs as placeholder
    proFormData.image_input = files.map(file => URL.createObjectURL(file))
  } else {
    proFormData.image_input = []
  }
}

const generateImage = async () => {
  if (!canGenerate.value) return

  isGenerating.value = true
  
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // 模拟生成的图像
    const mockImage = {
      id: Date.now(),
      url: `https://via.placeholder.com/800x800/ef4444/ffffff?text=Nano+Banana+${formData.mode === 'image-to-image' ? 'Image-to-Image' : 'Generated'}`,
      prompt: formData.prompt,
      mode: formData.mode,
      output_format: formData.output_format,
      image_size: formData.image_size,
      timestamp: new Date().toLocaleTimeString()
    }
    
    generatedImages.value.unshift(mockImage)
    
  } catch (error) {
    console.error('Failed to generate image:', error)
    alert('Failed to generate image, please try again')
  } finally {
    isGenerating.value = false
  }
}

const downloadImage = (image) => {
  const link = document.createElement('a')
  link.href = image.url
  link.download = `nano-banana-${Date.now()}.${image.output_format}`
  link.click()
}

const copyImageUrl = async (image) => {
  try {
    await navigator.clipboard.writeText(image.url)
    alert('Image URL copied to clipboard')
  } catch (error) {
    console.error('Failed to copy:', error)
  }
}

const generateImagePro = async () => {
  if (!canGeneratePro.value) return

  isGenerating.value = true
  
  try {
    // Build payload according to API spec
    const payload = {
      input: {
        prompt: proFormData.prompt
      }
    }

    // Add optional fields
    if (proFormData.image_input && proFormData.image_input.length > 0) {
      payload.input.image_input = proFormData.image_input
    }
    if (proFormData.aspect_ratio) {
      payload.input.aspect_ratio = proFormData.aspect_ratio
    }
    if (proFormData.resolution) {
      payload.input.resolution = proFormData.resolution
    }
    if (proFormData.output_format) {
      payload.input.output_format = proFormData.output_format
    }

    // TODO: Call actual API endpoint
    // For now, simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Mock generated image
    const mockImage = {
      id: Date.now(),
      url: `https://via.placeholder.com/800x800/ef4444/ffffff?text=Nano+Banana+Pro+Generated`,
      prompt: proFormData.prompt,
      aspect_ratio: proFormData.aspect_ratio,
      resolution: proFormData.resolution,
      output_format: proFormData.output_format,
      timestamp: new Date().toLocaleTimeString()
    }
    
    generatedImages.value.unshift(mockImage)
    
  } catch (error) {
    console.error('Failed to generate image:', error)
    alert('Failed to generate image, please try again')
  } finally {
    isGenerating.value = false
  }
}

const clearResults = () => {
  generatedImages.value = []
}
</script>

<style scoped>
.nano-banana-tool {
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
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px solid #e2e8f0;
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

/* Function Selection Section */
.function-selection-section {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 20px 30px;
}

.function-tabs {
  display: grid;
  grid-template-columns: 25% 25%;
  gap: 8px;
  justify-content: start;
}

.function-tab {
  display: flex;
  align-items: center;
  padding: 6px 9px;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 63px;
}

.function-tab:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.function-tab.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.function-icon {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  margin-right: 6px;
  flex-shrink: 0;
}

.function-tab.active .function-icon {
  background: rgba(255, 255, 255, 0.3);
}

.function-icon i {
  font-size: 15px;
  color: #667eea;
}

.function-tab.active .function-icon i {
  color: white;
}

.function-info {
  flex: 1;
  min-width: 0;
}

.function-name {
  font-size: 13.5px;
  font-weight: 600;
  margin-bottom: 1px;
  color: #1e293b;
}

.function-tab.active .function-name {
  color: white;
}

.function-description {
  font-size: 10.5px;
  color: #64748b;
  line-height: 1.1;
}

.function-tab.active .function-description {
  color: rgba(255, 255, 255, 0.9);
}

/* Function Selection Section Responsive */
@media (max-width: 768px) {
  .function-tabs {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .function-tab {
    height: auto;
    padding: 4.5px 6px;
  }
  
  .function-icon {
    width: 27px;
    height: 27px;
    margin-right: 4.5px;
  }
  
  .function-icon i {
    font-size: 12px;
  }
  
  .function-name {
    font-size: 12px;
  }
  
  .function-description {
    font-size: 9px;
  }
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
  box-sizing: border-box;
}

.form-input:focus, textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.char-count {
  text-align: right;
  font-size: 12px;
  color: #64748b;
  margin-top: 4px;
}

.input-hint {
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
  line-height: 1.4;
}

.mode-switch {
  display: flex;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}

.mode-btn {
  flex: 1;
  padding: 12px 16px;
  border: none;
  background: #f8fafc;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
}

.mode-btn:hover {
  background: #f1f5f9;
}

.mode-btn.active {
  background: #667eea;
  color: white;
}

.form-hint {
  margin-top: 6px;
  font-size: 12px;
  color: #64748b;
  line-height: 1.4;
}

.tab-group {
  display: flex;
  gap: 8px;
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
  flex-wrap: wrap;
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
  min-width: 60px;
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

.price-tag {
  font-size: 12px;
  font-weight: 500;
  opacity: 0.8;
  margin-left: 4px;
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

.image-meta {
  display: flex;
  gap: 8px;
}

.image-size, .image-format {
  padding: 2px 6px;
  background: #f3f4f6;
  border-radius: 4px;
  font-weight: 500;
}

.empty-state {
  text-align: center;
  color: #64748b;
  max-width: 200px;
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
  .nano-banana-tool {
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

