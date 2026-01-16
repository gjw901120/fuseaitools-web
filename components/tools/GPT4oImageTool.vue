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
            <div class="input-hint">At least one of fileUrl/filesUrl and prompt is required</div>
          </div>

          <!-- 文件上传 -->
          <UploadImage
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

          <!-- 蒙版图片 -->
          <UploadImage
            v-if="uploadedFiles.length === 1"
            input-id="gpt4o-mask-image"
            label="Mask Image (Optional)"
            upload-icon="fas fa-mask"
            upload-text="Upload mask image"
            upload-hint="Supports .jfif, .jpeg, .jpg, .png, .webp"
            :multiple="false"
            :max-file-size="10 * 1024 * 1024"
            additional-hint="Black areas will be modified, white areas will be preserved"
            theme-color="#667eea"
            @update:files="handleMaskImage"
          />

          <!-- 生成变体数量 -->
          <div class="form-group">
            <label>Number of Variants</label>
            <div class="tab-group">
              <div 
                class="tab-option"
                :class="{ active: formData.nVariants === '1' }"
                @click="formData.nVariants = '1'"
              >
                <span>1</span>
              </div>
              <div 
                class="tab-option"
                :class="{ active: formData.nVariants === '2' }"
                @click="formData.nVariants = '2'"
              >
                <span>2</span>
              </div>
              <div 
                class="tab-option"
                :class="{ active: formData.nVariants === '4' }"
                @click="formData.nVariants = '4'"
              >
                <span>4</span>
              </div>
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
                <span class="image-size">{{ image.size }}</span>
                <span class="image-time">{{ image.timestamp }}</span>
              </div>
            </div>
          </div>
          
          <!-- Empty State -->
          <div v-else class="empty-state">
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
        <span class="tip-icon">🎭</span>
        <span>Use masks to precisely control image editing areas</span>
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
import { ref, reactive } from 'vue'
import UploadImage from './common/UploadImage.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = reactive({
  size: '1:1',
  prompt: '',
  filesUrl: [],
  maskUrl: '',
  nVariants: '1',
  isEnhance: false
})

const isGenerating = ref(false)
const generatedImages = ref([])
const uploadedFiles = ref([])
const maskFile = ref(null)

const handleReferenceImages = (files) => {
  if (Array.isArray(files)) {
    uploadedFiles.value = files.map(file => ({
      name: file.name,
      file: file,
      url: URL.createObjectURL(file)
    }))
    formData.filesUrl = files.map(file => file.name) // 在实际应用中，这里应该是上传后的URL
  } else {
    uploadedFiles.value = []
    formData.filesUrl = []
  }
}

const handleMaskImage = (file) => {
  if (file) {
    maskFile.value = {
      name: file.name,
      file: file,
      url: URL.createObjectURL(file)
    }
    formData.maskUrl = file.name // 在实际应用中，这里应该是上传后的URL
  } else {
    maskFile.value = null
    formData.maskUrl = ''
  }
}

const generateImage = async () => {
  if (!formData.prompt.trim() && formData.filesUrl.length === 0) {
    alert('Please provide a prompt or upload an image')
    return
  }

  isGenerating.value = true
  
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // 模拟生成的图像
    const mockImages = []
    const variantCount = parseInt(formData.nVariants)
    
    for (let i = 0; i < variantCount; i++) {
      mockImages.push({
        id: Date.now() + i,
        url: `https://via.placeholder.com/800x800/667eea/ffffff?text=GPT4o+Image+${i + 1}`,
        size: formData.size,
        timestamp: new Date().toLocaleTimeString(),
        prompt: formData.prompt
      })
    }
    
    generatedImages.value.unshift(...mockImages)
    
  } catch (error) {
    console.error('Image generation failed:', error)
    alert('Image generation failed, please try again')
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


