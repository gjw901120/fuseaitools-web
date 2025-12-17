<template>
  <div class="flux-kontext-tool">
    <!-- 工具信息头部 -->
    <div class="tool-header">
      <div class="tool-avatar">
        <img src="/tools-logo/FluxKontext.png" alt="Flux Kontext" />
      </div>
      <div class="tool-details">
        <h3>Flux Kontext</h3>
        <p>High-quality image generation and editing model</p>
      </div>
    </div>

    <!-- 主内容区域：左右布局 -->
    <div class="main-content">
      <!-- 左侧：参数配置面板 (1/3) -->
      <div class="config-panel">
        <div class="config-header">
          <h4>Image Generation Configuration</h4>
        </div>

        <form class="config-form" @submit.prevent="generateImage">
          <!-- 模式选择 -->
          <div class="form-group">
            <label class="form-label">Mode Selection *</label>
            <div class="mode-switch">
              <button 
                type="button"
                class="mode-btn"
                :class="{ active: mode === 'generate' }"
                @click="mode = 'generate'"
              >
                <i class="fas fa-image"></i>
                Image Generation
              </button>
              <button 
                type="button"
                class="mode-btn"
                :class="{ active: mode === 'edit' }"
                @click="mode = 'edit'"
              >
                <i class="fas fa-edit"></i>
                Image Editing
              </button>
            </div>
          </div>

          <!-- 提示词输入 -->
          <div class="form-group">
            <label for="prompt" class="form-label">
              Prompt <span class="required">*</span>
            </label>
            <textarea
              id="prompt"
              v-model="formData.prompt"
              class="form-input"
              rows="4"
              placeholder="Describe in detail the image content you want to generate, including scenes, styles, colors, etc... (English only)"
              required
            ></textarea>
            <div class="form-hint">
              Example: "A serene mountain landscape at sunset with a lake reflecting the orange sky"
            </div>
          </div>

          <!-- 自动翻译 -->
          <div class="form-group">
            <label class="checkbox-label" for="enable-translation">
              <input 
                id="enable-translation"
                type="checkbox" 
                v-model="formData.enableTranslation"
              />
              <span class="checkmark"></span>
              Enable Auto Translation
            </label>
            <div class="form-hint">
              Automatically translate non-English prompts to English
            </div>
          </div>


          <!-- 编辑模式：上传图片 -->
          <div class="form-group" v-if="mode === 'edit'">
            <UploadImage
              input-id="flux-kontext-input-image"
              label="Upload Image *"
              upload-icon="fas fa-cloud-upload-alt"
              upload-text="Click to upload image"
              upload-hint="Supports .jfif, .jpeg, .jpg, .png, .webp"
              :multiple="false"
              :max-file-size="10 * 1024 * 1024"
              additional-hint="Must be a valid image file for edit mode"
              theme-color="#f59e0b"
              @update:files="handleInputImage"
            />
          </div>

          <!-- 长宽比选择 -->
          <div class="form-group">
            <label class="form-label">Aspect Ratio</label>
            <div class="tab-group">
              <div class="tab-row">
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.aspectRatio === '21:9' }"
                  @click="formData.aspectRatio = '21:9'"
                >
                  <span>21:9</span>
                  <span class="tab-label">Ultra Wide</span>
                </button>
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.aspectRatio === '16:9' }"
                  @click="formData.aspectRatio = '16:9'"
                >
                  <span>16:9</span>
                  <span class="tab-label">Wide</span>
                </button>
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.aspectRatio === '4:3' }"
                  @click="formData.aspectRatio = '4:3'"
                >
                  <span>4:3</span>
                  <span class="tab-label">Standard</span>
                </button>
              </div>
              <div class="tab-row">
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.aspectRatio === '1:1' }"
                  @click="formData.aspectRatio = '1:1'"
                >
                  <span>1:1</span>
                  <span class="tab-label">Square</span>
                </button>
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.aspectRatio === '3:4' }"
                  @click="formData.aspectRatio = '3:4'"
                >
                  <span>3:4</span>
                  <span class="tab-label">Portrait</span>
                </button>
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.aspectRatio === '9:16' }"
                  @click="formData.aspectRatio = '9:16'"
                >
                  <span>9:16</span>
                  <span class="tab-label">Mobile</span>
                </button>
              </div>
            </div>
          </div>

          <!-- 输出格式 -->
          <div class="form-group">
            <label class="form-label">Output Format</label>
            <div class="tab-group">
              <div class="tab-options">
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.outputFormat === 'jpeg' }"
                  @click="formData.outputFormat = 'jpeg'"
                >
                  <span>JPEG</span>
                </button>
                <button 
                  type="button"
                  class="tab-option"
                  :class="{ active: formData.outputFormat === 'png' }"
                  @click="formData.outputFormat = 'png'"
                >
                  <span>PNG</span>
                </button>
              </div>
            </div>
          </div>

          <!-- 提示词增强 -->
          <div class="form-group">
            <label class="checkbox-label" for="prompt-upsampling">
              <input 
                id="prompt-upsampling"
                type="checkbox" 
                v-model="formData.promptUpsampling"
              />
              <span class="checkmark"></span>
              Prompt Enhancement
            </label>
            <div class="form-hint">
              Enhance the prompt, may increase processing time
            </div>
          </div>

          <!-- 模型选择 -->
          <div class="form-group">
            <label for="model" class="form-label">Model Version</label>
            <select id="model" v-model="formData.model" class="form-input">
              <option value="flux-kontext-pro">Flux Kontext Pro - Performance Balanced</option>
              <option value="flux-kontext-max">Flux Kontext Max - Advanced Features</option>
            </select>
            <div class="form-hint">
              Max version has higher quality and detail, suitable for complex tasks
            </div>
          </div>

          <!-- 安全容忍度 -->
          <div class="form-group">
            <label for="safety-tolerance" class="form-label">
              Safety Tolerance ({{ formData.safetyTolerance }})
            </label>
            <input
              id="safety-tolerance"
              v-model="formData.safetyTolerance"
              type="range"
              min="0"
              max="6"
              class="form-slider"
            />
            <div class="slider-labels">
              <span>Strictest (0)</span>
              <span>More Relaxed (6)</span>
            </div>
          </div>

          <!-- 水印 -->
          <div class="form-group">
            <label for="watermark" class="form-label">Watermark Identifier</label>
            <input
              id="watermark"
              v-model="formData.watermark"
              type="text"
              class="form-input"
              placeholder="your-watermark-id"
            />
            <div class="form-hint">
              Optional, if provided will add a watermark to the output image
            </div>
          </div>

          <!-- 生成按钮容器 -->
          <div class="generate-btn-container">
            <button 
              type="submit" 
              class="generate-btn"
              :disabled="!canGenerate || isGenerating"
            >
              <i v-if="isGenerating" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-magic"></i>
              {{ isGenerating ? 'Generating...' : 'Generate Image' }}
              <span class="price-tag">($0.05)</span>
            </button>
          </div>
        </form>
      </div>

      <!-- 右侧：结果展示区域 (2/3) -->
      <div class="result-panel">
        <div class="result-header">
          <h4>Generation Result</h4>
          <button 
            v-if="generatedImages.length > 0" 
            @click="clearResults" 
            class="clear-btn"
          >
            <i class="fas fa-trash"></i>
            Clear Results
          </button>
        </div>

        <div class="result-content">
          <!-- 空状态 -->
          <div v-if="generatedImages.length === 0" class="empty-state">
            <i class="fas fa-image"></i>
            <p>No image generated yet</p>
            <span>Configure parameters and click "Generate Image" to start creating</span>
          </div>

          <!-- 图像结果 -->
          <div v-else class="image-grid">
            <div 
              v-for="(image, index) in generatedImages" 
              :key="index"
              class="image-item"
            >
              <div class="image-container">
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
                  <span class="image-size">{{ image.aspectRatio }}</span>
                  <span class="image-format">{{ image.format.toUpperCase() }}</span>
                </div>
                <div class="image-prompt">{{ image.prompt }}</div>
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
import UploadImage from '../tools/common/UploadImage.vue'

const router = useRouter()

// 表单数据
const formData = reactive({
  prompt: '',
  enableTranslation: true,
  inputImage: '',
  inputImageFile: null,
  aspectRatio: '16:9',
  outputFormat: 'jpeg',
  promptUpsampling: false,
  model: 'flux-kontext-pro',
  safetyTolerance: 2,
  watermark: ''
})

// 状态管理
const mode = ref('generate') // 'generate' 或 'edit'
const isGenerating = ref(false)
const generatedImages = ref([])

// 处理上传的输入图片
const handleInputImage = (files) => {
  if (files && files.length > 0) {
    formData.inputImageFile = files[0]
    formData.inputImage = URL.createObjectURL(files[0])
  } else {
    formData.inputImageFile = null
    formData.inputImage = ''
  }
}

// 计算属性
const canGenerate = computed(() => {
  if (!formData.prompt.trim()) return false
  if (mode.value === 'edit' && !formData.inputImageFile) return false
  return true
})

// 生成图像
const generateImage = async () => {
  if (!canGenerate.value) return

  isGenerating.value = true
  
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // 模拟生成结果
    const mockImage = {
      url: `https://via.placeholder.com/800x600/f59e0b/ffffff?text=Flux+Kontext+${Date.now()}`,
      prompt: formData.prompt,
      aspectRatio: formData.aspectRatio,
      format: formData.outputFormat,
      model: formData.model,
      timestamp: new Date()
    }
    
    generatedImages.value.unshift(mockImage)
    
  } catch (error) {
    console.error('生成图像失败:', error)
    alert('生成图像失败，请重试')
  } finally {
    isGenerating.value = false
  }
}

// 下载图像
const downloadImage = (image) => {
  const link = document.createElement('a')
  link.href = image.url
  link.download = `flux-kontext-${Date.now()}.${image.format}`
  link.click()
}

// 复制图像URL
const copyImageUrl = async (image) => {
  try {
    await navigator.clipboard.writeText(image.url)
    alert('图像URL已复制到剪贴板')
  } catch (error) {
    console.error('复制失败:', error)
  }
}

// 清空结果
const clearResults = () => {
  generatedImages.value = []
}
</script>

<style scoped>
.flux-kontext-tool {
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


.action-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: #f3f4f6;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: #e5e7eb;
  color: #f59e0b;
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
  overflow-y: auto;
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
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.required {
  color: #ef4444;
}

.form-input {
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #f59e0b;
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
}

.form-hint {
  font-size: 12px;
  color: #6b7280;
  line-height: 1.4;
}

.mode-switch {
  display: flex;
  gap: 8px;
  background: #f3f4f6;
  padding: 4px;
  border-radius: 8px;
}

.mode-btn {
  flex: 1;
  padding: 8px 16px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.mode-btn.active {
  background: white;
  color: #f59e0b;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
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
  accent-color: #f59e0b;
}

.form-slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #e5e7eb;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
}

.form-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #f59e0b;
  cursor: pointer;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #6b7280;
}

/* Tab Group Styles */
.tab-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: transparent;
  padding: 0;
  border-radius: 0;
}

.tab-row {
  display: flex;
  gap: 8px;
}

.tab-options {
  display: flex;
  gap: 8px;
}

.tab-option {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px 8px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  color: #6b7280;
  transition: all 0.2s ease;
}

.tab-option span {
  display: block;
}

.tab-option .tab-label {
  font-size: 11px;
  opacity: 0.7;
}

.tab-option.active {
  background: #f59e0b;
  border-color: #f59e0b;
  color: white;
  box-shadow: 0 1px 2px rgba(245, 158, 11, 0.3);
}

.tab-option.active .tab-label {
  opacity: 1;
}

.tab-option:hover:not(.active) {
  background: #f8fafc;
  border-color: #f59e0b;
}

.generate-btn-container {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

.generate-btn {
  width: 100%;
  padding: 12px 24px;
  background: #f59e0b;
  color: white;
  border: none;
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
  background: #d97706;
  transform: translateY(-1px);
}

.generate-btn:disabled {
  background: #d1d5db;
  cursor: not-allowed;
  transform: none;
}

.price-tag {
  font-size: 12px;
  font-weight: 500;
  opacity: 0.8;
  margin-left: 4px;
}

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
  overflow-y: auto;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.result-header h4 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.clear-btn {
  padding: 8px 16px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.clear-btn:hover {
  background: #dc2626;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
}

.empty-state i {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state p {
  font-size: 18px;
  font-weight: 500;
  margin: 0 0 8px 0;
}

.empty-state span {
  font-size: 14px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.image-item {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.image-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.image-container {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.image-container img {
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

.image-container:hover .image-overlay {
  opacity: 1;
}

.image-overlay .action-btn {
  background: rgba(255, 255, 255, 0.9);
  color: #374151;
}

.image-overlay .action-btn:hover {
  background: white;
  color: #f59e0b;
}

.image-info {
  padding: 16px;
}

.image-meta {
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
}

.image-size,
.image-format {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  background: #f3f4f6;
  color: #6b7280;
}

.image-prompt {
  font-size: 14px;
  color: #374151;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
  .flux-kontext-tool {
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
  
  .config-panel,
  .result-panel {
    padding: 20px;
  }
  
  .image-grid {
    grid-template-columns: 1fr;
  }
}
</style>
