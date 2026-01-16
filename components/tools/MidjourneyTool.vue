<template>
  <div class="midjourney-tool">
    <!-- 工具信息头部 -->
    <div class="tool-header">
      <div class="tool-avatar">
        <img src="/tools-logo/Midjourney.png" alt="Midjourney" />
      </div>
      <div class="tool-details">
        <h3>Midjourney</h3>
        <p>AI image generation tool</p>
      </div>
    </div>

    <!-- 功能选择区域 -->
    <div class="function-selection-section">
      <div class="function-tabs">
        <div 
          v-for="func in functionOptions" 
          :key="func.id"
          class="function-tab"
          :class="{ active: activeTab === func.id }"
          @click="switchFunction(func.id)"
        >
          <div class="function-icon">
            <i :class="func.icon"></i>
          </div>
          <div class="function-info">
            <div class="function-name">{{ func.name }}</div>
            <div class="function-description">{{ func.description }}</div>
          </div>
          <div class="function-info-icon" :title="func.detailDescription">
            <i class="fas fa-info-circle"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- 主内容区域：左右布局 -->
    <div class="main-content">
      <!-- 左侧：参数配置面板 (1/3) -->
      <div class="config-panel">
        <div class="config-header">
          <h4>{{ getCurrentFunctionName() }} Configuration</h4>
        </div>

        <!-- Imagine -->
        <form v-if="activeTab === 'imagine'" class="config-form" @submit.prevent="onSubmitImagine">
          <div class="form-group">
            <label>Prompt *</label>
            <textarea
              v-model="imagine.prompt" 
              rows="4"
              required
              placeholder="Describe the image you want to generate, for example: A beautiful sunset over mountains, digital art style"
              maxlength="2000"
            ></textarea>
            <div class="char-count">{{ imagine.prompt.length }}/2000</div>
            </div>
          <div class="form-group">
            <UploadImage
              input-id="midjourney-imagine-images"
              label="Reference Images (Optional)"
              upload-icon="fas fa-cloud-upload-alt"
              upload-text="Click to upload image"
              upload-hint="Supports JPG, PNG, GIF formats (max 5 images)"
              :max-files="5"
              :max-file-size="10 * 1024 * 1024"
              additional-hint="Upload reference images to guide generation direction"
              theme-color="#667eea"
              @update:files="handleImagineFilesUpdate"
            />
          </div>


          <div class="form-actions">
            <button class="btn-primary" type="submit" :disabled="loading || !imagine.prompt">
              <i v-if="loading" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-magic"></i>
              {{ loading ? 'Generating...' : 'Start Generation ($0.05)' }}
            </button>
          </div>
        </form>

        <!-- Blend -->
        <form v-if="activeTab === 'blend'" class="config-form" @submit.prevent="onSubmitBlend">
              <div class="form-group">
            <UploadImage
              input-id="midjourney-blend-images"
              label="Blend Images *"
              upload-icon="fas fa-layer-group"
              upload-text="Click to upload image"
              upload-hint="Select 2-5 images to blend"
              :max-files="5"
              :max-file-size="10 * 1024 * 1024"
              additional-hint="Upload 2-5 images for creative blending"
              theme-color="#667eea"
              @update:files="handleBlendFilesUpdate"
            />
              </div>
              <div class="form-group">
            <label>Output Ratio</label>
            <div class="ratio-tabs">
              <button 
                type="button"
                :class="['ratio-tab', { active: blend.dimensions === 'SQUARE' }]"
                @click="blend.dimensions = 'SQUARE'"
              >
                Square (1:1)
              </button>
              <button 
                type="button"
                :class="['ratio-tab', { active: blend.dimensions === 'PORTRAIT' }]"
                @click="blend.dimensions = 'PORTRAIT'"
              >
                Portrait (2:3)
              </button>
              <button 
                type="button"
                :class="['ratio-tab', { active: blend.dimensions === 'LANDSCAPE' }]"
                @click="blend.dimensions = 'LANDSCAPE'"
              >
                Landscape (3:2)
              </button>
            </div>
              </div>


          <div class="form-actions">
            <button class="btn-primary" type="submit" :disabled="loading || blend.base64Array.length < 2">
              <i v-if="loading" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-layer-group"></i>
              {{ loading ? 'Blending...' : 'Start Blending ($0.05)' }}
            </button>
                </div>
        </form>

        <!-- Describe -->
        <form v-if="activeTab === 'describe'" class="config-form" @submit.prevent="onSubmitDescribe">
              <div class="form-group">
            <UploadImage
              input-id="midjourney-describe-image"
              label="Input Image *"
              upload-icon="fas fa-image"
              upload-text="Click to upload image"
              upload-hint="Upload the image to describe"
              :multiple="false"
              :max-file-size="10 * 1024 * 1024"
              additional-hint="Upload image to get AI-generated text description"
              theme-color="#667eea"
              @update:files="handleDescribeFileUpdate"
            />
              </div>


          <div class="form-actions">
            <button class="btn-primary" type="submit" :disabled="loading || !describe.base64">
              <i v-if="loading" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-align-left"></i>
              {{ loading ? 'Analyzing...' : 'Start Analysis ($0.05)' }}
            </button>
          </div>
        </form>

        <!-- Swap Face -->
        <form v-if="activeTab === 'swap'" class="config-form" @submit.prevent="onSubmitSwap">
            <div class="form-group">
            <UploadImage
              input-id="midjourney-swap-source-image"
              label="Source Face Image *"
              upload-icon="fas fa-user"
              upload-text="Click to upload image"
              upload-hint="Contains the face to extract"
              :multiple="false"
              :max-file-size="10 * 1024 * 1024"
              additional-hint="Upload image containing the face to extract"
              theme-color="#667eea"
              @update:files="handleSourceFileUpdate"
            />
            </div>

            <div class="form-group">
            <UploadImage
              input-id="midjourney-swap-target-image"
              label="Target Image *"
              upload-icon="fas fa-image"
              upload-text="Click to upload image"
              upload-hint="Image to replace face"
              :multiple="false"
              :max-file-size="10 * 1024 * 1024"
              additional-hint="Upload image to replace face"
              theme-color="#667eea"
              @update:files="handleTargetFileUpdate"
            />
          </div>

          <div class="form-actions">
            <button class="btn-primary" type="submit" :disabled="loading || !swap.sourceBase64 || !swap.targetBase64">
              <i v-if="loading" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-user-astronaut"></i>
              {{ loading ? 'Replacing...' : 'Start Replace ($0.05)' }}
            </button>
          </div>
        </form>
      </div>

      <div class="results-display-panel">
        <div class="results-header">
          <h4>Generation Results</h4>
          <div class="results-actions" v-if="results.length">
            <button @click="clearResults" class="btn-secondary">
              <i class="fas fa-trash"></i> Clear
            </button>
          </div>
        </div>
        <div class="results-container">
          <div v-if="results.length" class="results-showcase">
            <div v-for="(item, idx) in results" :key="idx" class="result-item">
              <div class="result-header">
                <span class="result-time">{{ formatTime(item.time) }}</span>
                <span class="result-type">{{ getResultType(item.data) }}</span>
              </div>
              <div class="result-content">
                <pre class="result-json">{{ formatJson(item.data) }}</pre>
                </div>
                </div>
              </div>
          <div v-else class="empty-state">
            <div class="empty-icon">
              <i class="fas fa-paint-brush"></i>
            </div>
            <h3>Waiting for Generation</h3>
            <p>Select function type, fill in necessary information, click the generate button to start creating your AI content</p>
            <div class="empty-features">
              <div class="feature-item">
                <i class="fas fa-keyboard"></i>
                <span>Text Generation</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-layer-group"></i>
                <span>Image Blend</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-align-left"></i>
                <span>Image Description</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-user-astronaut"></i>
                <span>Face Replace</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Usage Tips -->
    <div class="usage-tips">
      <div class="tip-item">
        <span class="tip-icon">🎨</span>
        <span><strong>Imagine:</strong> Describe the image you want in English, the more detailed the better</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">🔄</span>
        <span><strong>Blend:</strong> Select 2-5 images for creative blending</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">📝</span>
        <span><strong>Describe:</strong> Upload image to get AI-generated text description</span>
      </div>
      <div class="tip-item">
        <span class="tip-icon">👤</span>
        <span><strong>Swap Face:</strong> Replace face from one image to another</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useMjApi } from '~/composables/useMjApi'
import FileUpload from '../FileUpload.vue'
import UploadImage from '../tools/common/UploadImage.vue'

const { submitImagine, submitBlend, submitDescribe, submitSwapFace } = useMjApi()

const activeTab = ref('imagine')
const loading = ref(false)
const results = ref([])

// 功能选项配置
const functionOptions = ref([
  {
    id: 'imagine',
    name: 'Imagine',
    description: 'Text to Image',
    detailDescription: 'Generate AI images using text descriptions, supporting multiple styles and parameter settings',
    icon: 'fas fa-keyboard'
  },
  {
    id: 'blend',
    name: 'Blend',
    description: 'Image Blend',
    detailDescription: 'Blend multiple images to generate new images, supporting 2-5 image blending',
    icon: 'fas fa-layer-group'
  },
  {
    id: 'describe',
    name: 'Describe',
    description: 'Image Description',
    detailDescription: 'Analyze image content and generate detailed text descriptions',
    icon: 'fas fa-align-left'
  },
  {
    id: 'swap',
    name: 'Swap Face',
    description: 'Face Replace',
    detailDescription: 'Replace face from one image to another',
    icon: 'fas fa-user-astronaut'
  }
])

// 切换功能
const switchFunction = (funcId) => {
  activeTab.value = funcId
}

// 获取当前功能名称
const getCurrentFunctionName = () => {
  const func = functionOptions.value.find(f => f.id === activeTab.value)
  return func ? func.name : 'Imagine'
}

// Imagine
const imagine = reactive({
  prompt: '',
  base64Array: [],
  accountFilter: { channelId: '', instanceId: '', modes: [], remark: '', remix: true, remixAutoConsidered: true },
  state: ''
})

// Blend
const blend = reactive({
  base64Array: [],
  dimensions: 'SQUARE',
  accountFilter: { channelId: '', instanceId: '', modes: [], remark: '', remix: true, remixAutoConsidered: true },
  state: ''
})

// Describe
const describe = reactive({
  botType: 'MID_JOURNEY',
  base64: '',
  accountFilter: { channelId: '', instanceId: '', modes: [], remark: '', remix: true, remixAutoConsidered: true },
  state: ''
})

// Swap
const swap = reactive({
  sourceBase64: '',
  targetBase64: ''
})

const handleFilesToBase64 = async (e, targetArray) => {
  const files = Array.from(e.target.files || [])
  
  // 检查文件数量限制
  if (files.length > 5) {
    alert('Maximum 5 images allowed')
    return
  }
  
  // 检查文件类型和大小
  const validFiles = []
  for (const file of files) {
    if (!file.type.startsWith('image/')) {
      alert(`File ${file.name} is not a valid image format`)
      continue
    }
    if (file.size > 10 * 1024 * 1024) { // 10MB
      alert(`File ${file.name} exceeds 10MB size limit`)
      continue
    }
    validFiles.push(file)
  }
  
  // 清空现有文件并添加新文件
  targetArray.length = 0
  for (const file of validFiles) {
    try {
      const b64 = await fileToBase64(file)
      targetArray.push(b64)
    } catch (error) {
      console.error('File conversion failed:', error)
      alert(`File ${file.name} conversion failed`)
    }
  }
}

const handleSingleToBase64 = async (e, setter) => {
  const file = (e.target.files || [])[0]
  if (!file) return
  const b64 = await fileToBase64(file)
  setter(b64)
}

const fileToBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = () => resolve(String(reader.result))
  reader.onerror = reject
  reader.readAsDataURL(file)
})

// 新的事件处理函数
const handleImagineFilesUpdate = (files) => {
  imagine.base64Array = files.map(file => file.url)
}

const handleBlendFilesUpdate = (files) => {
  blend.base64Array = files.map(file => file.url)
}

const handleDescribeFileUpdate = (files) => {
  if (files.length > 0) {
    describe.base64 = files[0].url
  } else {
    describe.base64 = ''
  }
}

const handleSourceFileUpdate = (files) => {
  if (files.length > 0) {
    swap.sourceBase64 = files[0].url
  } else {
    swap.sourceBase64 = ''
  }
}

const handleTargetFileUpdate = (files) => {
  if (files.length > 0) {
    swap.targetBase64 = files[0].url
  } else {
    swap.targetBase64 = ''
  }
}

const pushResult = (data) => {
  results.value.unshift({ time: new Date().toISOString(), data })
}

const onSubmitImagine = async () => {
  if (!imagine.prompt) return
  loading.value = true
  try {
    const payload = { 
      botType: 'MID_JOURNEY', 
      prompt: imagine.prompt, 
      base64Array: imagine.base64Array, 
      accountFilter: imagine.accountFilter, 
      state: imagine.state 
    }
    const res = await submitImagine(payload)
    pushResult(res)
    // 重置表单
    imagine.prompt = ''
    imagine.base64Array = []
  } catch (e) {
    pushResult({ error: e?.message || String(e) })
  } finally {
    loading.value = false
  }
}

const onSubmitBlend = async () => {
  if (blend.base64Array.length < 2) { 
    pushResult({ error: 'At least 2 images required' })
    return 
  }
  loading.value = true
  try {
    const payload = { 
      base64Array: blend.base64Array, 
      dimensions: blend.dimensions, 
      accountFilter: blend.accountFilter, 
      state: blend.state, 
      botType: 'MID_JOURNEY' 
    }
    const res = await submitBlend(payload)
    pushResult(res)
    // 重置表单
    blend.base64Array = []
  } catch (e) {
    pushResult({ error: e?.message || String(e) })
  } finally {
    loading.value = false
  }
}

const onSubmitDescribe = async () => {
  if (!describe.base64) { 
    pushResult({ error: 'Please select an image' })
    return 
  }
  loading.value = true
  try {
    const payload = { 
      botType: describe.botType, 
      base64: describe.base64, 
      accountFilter: describe.accountFilter, 
      state: describe.state 
    }
    const res = await submitDescribe(payload)
    pushResult(res)
    // 重置表单
    describe.base64 = ''
  } catch (e) {
    pushResult({ error: e?.message || String(e) })
  } finally {
    loading.value = false
  }
}

const onSubmitSwap = async () => {
  if (!swap.sourceBase64 || !swap.targetBase64) { 
    pushResult({ error: 'Please provide source and target images' })
    return 
  }
  loading.value = true
  try {
    const res = await submitSwapFace({ 
      sourceBase64: swap.sourceBase64, 
      targetBase64: swap.targetBase64 
    })
    pushResult(res)
    // 重置表单
    swap.sourceBase64 = ''
    swap.targetBase64 = ''
  } catch (e) {
    pushResult({ error: e?.message || String(e) })
  } finally {
    loading.value = false
  }
}

const clearResults = () => {
  results.value = [] 
}

const formatJson = (obj) => JSON.stringify(obj, null, 2)

const formatTime = (timeStr) => {
  return new Date(timeStr).toLocaleString('zh-CN')
}

const getResultType = (data) => {
  if (data.error) return 'Error'
  if (data.result) return 'Task ID: ' + data.result
  if (data.code === 1) return 'Submission Successful'
  if (data.code === 0) return 'Operation Completed'
  return 'Response'
}
</script>

<style scoped>
.midjourney-tool {
  width: 100%;
  height: 100%;
  padding: 20px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

/* 功能选择区域样式 */
.function-selection-section {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 20px 30px;
}

.function-tabs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
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

.function-info-icon {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  flex-shrink: 0;
}

.function-tab.active .function-info-icon {
  color: rgba(255, 255, 255, 0.8);
}

.function-info-icon:hover {
  color: #667eea;
}

.function-tab.active .function-info-icon:hover {
  color: white;
}

/* 功能选择区域响应式设计 */
@media (max-width: 1200px) {
  .function-tabs {
    grid-template-columns: repeat(2, 1fr);
  }
}

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

.tool-header {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #e2e8f0;
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


.config-header h4 {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}


/* 模式切换 */
.mode-tabs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 24px;
}

.mode-tab {
  padding: 16px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
}

.mode-tab:hover {
  background: #f8fafc;
  border-color: #667eea;
  color: #667eea;
}

.mode-tab.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

.mode-tab i {
  font-size: 20px;
  margin-bottom: 4px;
}

.mode-tab span {
  font-weight: 600;
}

.mode-tab small {
  font-size: 11px;
  opacity: 0.8;
  font-weight: 400;
}

/* 任务类型选择 */
.task-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.task-option {
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.task-option:hover {
  border-color: #667eea;
  background: #f8fafc;
}

.task-option input[type="radio"] {
  margin-right: 12px;
}

.option-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
}

.option-label i {
  color: #667eea;
}

.task-option:has(input:checked) {
  background: #667eea;
  border-color: #667eea;
}

.task-option:has(input:checked) .option-label {
  color: white;
}

.task-option:has(input:checked) .option-label i {
  color: white;
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
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
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

/* 高级参数 */
.advanced-params {
  margin: 24px 0;
}


/* 滑块样式 */
.slider-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.slider {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: #e5e7eb;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #667eea;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #667eea;
  cursor: pointer;
  border: none;
}

.slider-value {
  min-width: 40px;
  text-align: center;
  font-weight: 600;
  color: #667eea;
}

/* 选择器样式 */
.select-wrapper {
  position: relative;
}

.select-wrapper select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
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

/* 复选框样式 */
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.checkbox-text {
  font-size: 14px;
  color: #374151;
}

/* 单选按钮组 */
.radio-group {
  display: flex;
  gap: 16px;
}

.radio-item {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.radio-item input[type="radio"] {
  margin-right: 8px;
  width: auto;
}

.radio-label {
  font-size: 14px;
  color: #374151;
}

/* 其他设置 */
.other-settings {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e2e8f0;
}

.form-help {
  font-size: 12px;
  color: #64748b;
  margin-top: 4px;
  line-height: 1.4;
}

.form-actions {
  margin-top: 24px;
  padding-bottom: 20px;
}

.btn-primary {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #667eea, #764ba2);
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
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.results-display-panel {
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

.results-header {
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.results-header h4 {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.results-container {
  flex: 1;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}

/* 结果展示区域 */
.results-showcase {
  width: 100%;
  max-width: 100%;
}

.result-item {
  width: 100%;
  background: #f8fafc;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
}

.result-preview {
  width: 100%;
  aspect-ratio: 16/9;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.result-preview img,
.result-preview video {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.result-details {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.result-time {
  font-size: 12px;
  color: #64748b;
}

.result-type {
  font-size: 12px;
  font-weight: 600;
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  padding: 4px 8px;
  border-radius: 4px;
}

.result-content {
  padding: 16px;
}

.result-json {
  width: 100%;
  margin: 0;
  font-size: 12px;
  color: #0f172a;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px;
  overflow: auto;
  max-height: 300px;
}

.file-count {
  font-size: 12px;
  color: #667eea;
  font-weight: 500;
  margin-top: 4px;
}

.file-preview {
  font-size: 12px;
  color: #10b981;
  font-weight: 500;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}


.checkbox-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
}

.result-meta {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #64748b;
  flex-wrap: wrap;
}

.result-actions {
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
  background: rgba(102, 126, 234, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: rgba(102, 126, 234, 0.15);
  transform: translateY(-2px);
}

.feature-item i {
  color: #667eea;
  width: 20px;
  font-size: 18px;
}

/* 提示面板 */
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


/* 比例选择tabs */
.ratio-tabs {
  display: flex;
  gap: 8px;
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
}

.ratio-tab {
  flex: 1;
  padding: 12px 16px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  text-align: center;
}

.ratio-tab:hover {
  background: #f8fafc;
  border-color: #667eea;
  color: #374151;
}

.ratio-tab.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .main-content {
    flex-direction: column;
  }
  
  .config-panel,
  .results-display-panel {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .midjourney-tool {
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
  
  .ratio-tabs {
    flex-direction: column;
    gap: 4px;
  }
  
  .ratio-tab {
    padding: 10px 12px;
    font-size: 13px;
  }
  
  .main-content {
    flex-direction: column;
    padding: 16px;
    gap: 16px;
  }
  
  .config-panel {
    order: 2;
  }
  
  .results-display-panel {
    order: 1;
    min-height: 300px;
  }
  
  .tool-header {
    padding: 12px 16px;
  }
  
  .mode-tabs {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
  
  .mode-tab {
    padding: 12px 8px;
    font-size: 12px;
  }
  
  .mode-tab i {
    font-size: 16px;
  }
  
  .checkbox-row {
    flex-direction: column;
    gap: 8px;
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
