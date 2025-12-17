<template>
  <div class="audio-upload">
    <div class="upload-container">
      <input
        :id="inputId"
        ref="fileInput"
        type="file"
        accept="audio/*"
        @change="handleFileChange"
        class="file-input"
      />
      <div 
        class="upload-area" 
        :class="{ 'has-file': uploadedFile }"
        @click="triggerUpload"
      >
        <div v-if="!uploadedFile" class="upload-content">
          <div class="upload-icon">
            <i class="fas fa-cloud-upload-alt"></i>
          </div>
          <div class="upload-text">
            <p class="upload-title">{{ title }}</p>
            <p class="upload-subtitle">{{ subtitle }}</p>
          </div>
        </div>
        <div v-else class="uploaded-content">
          <div class="uploaded-file-container">
            <i class="fas fa-file-audio uploaded-icon"></i>
            <div class="file-info">
              <p class="file-name">{{ uploadedFile.name }}</p>
              <p class="file-size">{{ formatFileSize(uploadedFile.size) }}</p>
            </div>
            <button 
              @click.stop="clearFile"
              class="remove-file-btn"
              title="删除文件"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
      <div v-if="hint" class="upload-hint">
        {{ hint }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  inputId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: '点击上传音频文件'
  },
  subtitle: {
    type: String,
    default: '支持 MP3, WAV, M4A 等格式'
  },
  hint: {
    type: String,
    default: ''
  },
  themeColor: {
    type: String,
    default: '#10b981'
  },
  maxDuration: {
    type: Number,
    default: null // 最大时长（秒）
  },
  maxFileSize: {
    type: Number,
    default: 10 * 1024 * 1024 // 默认10MB
  }
})

const emit = defineEmits(['update:file'])

const fileInput = ref(null)
const uploadedFile = ref(null)

const triggerUpload = () => {
  fileInput.value?.click()
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    validateAndSetFile(file)
  }
}

const validateAndSetFile = async (file) => {
  // 检查文件类型
  if (!file.type.startsWith('audio/')) {
    alert('请选择音频文件')
    return
  }
  
  // 检查文件大小
  if (file.size > props.maxFileSize) {
    alert(`文件大小不能超过 ${formatFileSize(props.maxFileSize)}`)
    return
  }
  
  // 检查音频时长（如果设置了最大时长）
  if (props.maxDuration) {
    try {
      const duration = await getAudioDuration(file)
      if (duration > props.maxDuration) {
        alert(`音频时长不能超过 ${props.maxDuration} 秒`)
        return
      }
    } catch (error) {
      console.warn('无法获取音频时长:', error)
    }
  }
  
  uploadedFile.value = file
  emit('update:file', file)
}

const getAudioDuration = (file) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio()
    const url = URL.createObjectURL(file)
    
    audio.addEventListener('loadedmetadata', () => {
      URL.revokeObjectURL(url)
      resolve(audio.duration)
    })
    
    audio.addEventListener('error', () => {
      URL.revokeObjectURL(url)
      reject(new Error('无法加载音频文件'))
    })
    
    audio.src = url
  })
}

const clearFile = () => {
  uploadedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  emit('update:file', null)
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 监听外部文件变化
watch(() => props.file, (newFile) => {
  if (!newFile) {
    clearFile()
  }
})
</script>

<style scoped>
.audio-upload {
  width: 100%;
}

.upload-container {
  position: relative;
}

.file-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.upload-area {
  border: 2px dashed #e2e8f0;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f8fafc;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-area:hover {
  border-color: v-bind(themeColor);
  background: rgba(16, 185, 129, 0.05);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.upload-area.has-file {
  border-color: v-bind(themeColor);
  background: rgba(16, 185, 129, 0.05);
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
  border-radius: 50%;
  background: v-bind(themeColor);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
}

.upload-text {
  text-align: center;
}

.upload-title {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
  color: #374151;
}

.upload-subtitle {
  margin: 0;
  font-size: 14px;
  color: #64748b;
}

.uploaded-content {
  width: 100%;
}

.uploaded-file-container {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: white;
  border: 1px solid v-bind(themeColor);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.uploaded-icon {
  font-size: 24px;
  color: v-bind(themeColor);
  flex-shrink: 0;
}

.file-info {
  flex: 1;
  text-align: left;
}

.file-name {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  word-break: break-all;
}

.file-size {
  margin: 0;
  font-size: 12px;
  color: #64748b;
}

.remove-file-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.remove-file-btn:hover {
  background: #dc2626;
  transform: scale(1.1);
}

.upload-hint {
  margin-top: 8px;
  font-size: 12px;
  color: #64748b;
  line-height: 1.4;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .upload-area {
    padding: 16px;
    min-height: 100px;
  }
  
  .upload-icon {
    width: 40px;
    height: 40px;
    font-size: 18px;
  }
  
  .upload-title {
    font-size: 14px;
  }
  
  .upload-subtitle {
    font-size: 12px;
  }
  
  .uploaded-file-container {
    padding: 8px 12px;
  }
  
  .uploaded-icon {
    font-size: 20px;
  }
  
  .file-name {
    font-size: 13px;
  }
  
  .file-size {
    font-size: 11px;
  }
  
  .remove-file-btn {
    width: 24px;
    height: 24px;
  }
}
</style>
