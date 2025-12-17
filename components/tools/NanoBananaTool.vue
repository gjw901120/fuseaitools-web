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

    <!-- Main Content Area: Left (1/3) and Right (2/3) -->
    <div class="main-content">
      <!-- Left: Parameter Configuration Panel -->
      <div class="config-panel">
        <div class="config-header">
          <h4>Nano Banana Configuration</h4>
        </div>

        <form class="config-form" @submit.prevent="generateImage">
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
              theme-color="#ef4444"
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

        <!-- Usage Tips -->
        <div class="tips-panel">
          <h4>Usage Tips</h4>
          <ul>
            <li><strong>Mode Selection:</strong> Text to Image is suitable for creating from scratch, Image to Image is suitable for editing existing images</li>
            <li><strong>Image Upload:</strong> Image to Image mode supports uploading up to 10 images in JPG/PNG/WEBP format</li>
            <li><strong>Detailed Description:</strong> Provide detailed image descriptions or editing requirements for better results</li>
            <li><strong>Character Limit:</strong> Prompt supports up to 5000 characters</li>
            <li><strong>Format Selection:</strong> PNG supports transparent background, JPEG files are smaller</li>
            <li><strong>Size Selection:</strong> Choose the appropriate aspect ratio for the best visual effect</li>
            <li><strong>Auto Size:</strong> Select auto to let AI automatically determine the best aspect ratio</li>
            <li><strong>Lightweight:</strong> Nano Banana is optimized for fast generation</li>
          </ul>
        </div>
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
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import UploadImage from './common/UploadImage.vue'

const router = useRouter()

const formData = reactive({
  mode: 'text-to-image', // 'text-to-image' 或 'image-to-image'
  prompt: '',
  image_urls: [], // 图生图模式下的图片URL数组
  output_format: 'png',
  image_size: '1:1'
})

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
  background: #ef4444;
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
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
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
  background: #ef4444;
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
  border-color: #ef4444;
  color: #ef4444;
}

.tab-option.active {
  background: #ef4444;
  border-color: #ef4444;
  color: white;
  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.2);
}

.tab-option i {
  font-size: 12px;
}

.generate-btn {
  width: 100%;
  padding: 16px 24px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
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
  box-shadow: 0 8px 25px rgba(239, 68, 68, 0.3);
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

.tips-panel {
  margin-top: 24px;
  padding: 20px;
  background: #fef2f2;
  border-radius: 12px;
}

.tips-panel h4 {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 12px 0;
}

.tips-panel ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tips-panel li {
  padding: 4px 0;
  color: #4b5563;
  font-size: 14px;
}

.tips-panel li::before {
  content: '•';
  color: #ef4444;
  font-weight: bold;
  margin-right: 8px;
}

.tips-panel strong {
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
  background: rgba(239, 68, 68, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.feature-item i {
  color: #ef4444;
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

