<template>
  <div class="file-upload">
    <div class="upload-container">
      <input
        :id="inputId"
        ref="fileInput"
        type="file"
        :accept="accept"
        :multiple="multiple"
        @change="handleFileChange"
        class="file-input"
      />
      <div 
        class="upload-area" 
        :class="{ 'has-files': uploadedFiles.length > 0 }"
        @click="triggerUpload"
      >
        <div v-if="uploadedFiles.length === 0" class="upload-content">
          <div class="upload-icon">
            <i class="fas fa-cloud-upload-alt"></i>
          </div>
          <div class="upload-text">
            <p class="upload-title">{{ title }}</p>
            <p class="upload-subtitle">{{ subtitle }}</p>
          </div>
        </div>
        <div v-else class="uploaded-content">
          <div v-for="(file, index) in uploadedFiles" :key="index" class="uploaded-file-container">
            <div class="file-preview">
              <img v-if="isImage(file)" :src="getFilePreview(file)" :alt="file.name" class="preview-image" />
              <i v-else :class="getFileIcon(file)" class="file-icon"></i>
            </div>
            <div class="file-info">
              <p class="file-name">{{ file.name }}</p>
              <p class="file-size">{{ formatFileSize(file.size) }}</p>
            </div>
            <button 
              @click.stop="removeFile(index)"
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
    default: '点击上传文件'
  },
  subtitle: {
    type: String,
    default: '支持多种文件格式'
  },
  hint: {
    type: String,
    default: ''
  },
  themeColor: {
    type: String,
    default: '#6366f1'
  },
  multiple: {
    type: Boolean,
    default: false
  },
  maxFiles: {
    type: Number,
    default: 1
  },
  maxFileSize: {
    type: Number,
    default: 10 * 1024 * 1024 // 默认10MB
  },
  accept: {
    type: String,
    default: '*/*'
  }
})

const emit = defineEmits(['update:files'])

const fileInput = ref(null)
const uploadedFiles = ref([])

const triggerUpload = () => {
  fileInput.value?.click()
}

const handleFileChange = (event) => {
  const files = Array.from(event.target.files)
  if (files.length > 0) {
    validateAndSetFiles(files)
  }
}

const validateAndSetFiles = (files) => {
  const validFiles = []
  
  for (const file of files) {
    // 检查文件数量限制
    if (uploadedFiles.value.length + validFiles.length >= props.maxFiles) {
      alert(`最多只能上传 ${props.maxFiles} 个文件`)
      break
    }
    
    // 检查文件大小
    if (file.size > props.maxFileSize) {
      alert(`文件 ${file.name} 大小不能超过 ${formatFileSize(props.maxFileSize)}`)
      continue
    }
    
    // 检查文件类型
    if (props.accept !== '*/*' && !isFileTypeAccepted(file)) {
      alert(`文件 ${file.name} 格式不支持`)
      continue
    }
    
    validFiles.push(file)
  }
  
  if (validFiles.length > 0) {
    if (props.multiple) {
      uploadedFiles.value.push(...validFiles)
    } else {
      uploadedFiles.value = validFiles
    }
    emit('update:files', props.multiple ? uploadedFiles.value : uploadedFiles.value[0])
  }
}

const isFileTypeAccepted = (file) => {
  const acceptedTypes = props.accept.split(',').map(type => type.trim())
  return acceptedTypes.some(type => {
    if (type.endsWith('/*')) {
      const baseType = type.slice(0, -2)
      return file.type.startsWith(baseType)
    }
    return file.type === type
  })
}

const isImage = (file) => {
  return file.type.startsWith('image/')
}

const getFilePreview = (file) => {
  return URL.createObjectURL(file)
}

const getFileIcon = (file) => {
  if (file.type.startsWith('image/')) {
    return 'fas fa-image'
  } else if (file.type.startsWith('video/')) {
    return 'fas fa-video'
  } else if (file.type.startsWith('audio/')) {
    return 'fas fa-file-audio'
  } else if (file.type.includes('pdf')) {
    return 'fas fa-file-pdf'
  } else if (file.type.includes('word') || file.type.includes('document')) {
    return 'fas fa-file-word'
  } else if (file.type.includes('excel') || file.type.includes('spreadsheet')) {
    return 'fas fa-file-excel'
  } else if (file.type.includes('powerpoint') || file.type.includes('presentation')) {
    return 'fas fa-file-powerpoint'
  } else if (file.type.includes('zip') || file.type.includes('rar')) {
    return 'fas fa-file-archive'
  } else {
    return 'fas fa-file'
  }
}

const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1)
  emit('update:files', props.multiple ? uploadedFiles.value : uploadedFiles.value[0] || null)
}

const clearFiles = () => {
  uploadedFiles.value = []
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  emit('update:files', props.multiple ? [] : null)
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 监听外部文件变化
watch(() => props.files, (newFiles) => {
  if (!newFiles || (Array.isArray(newFiles) && newFiles.length === 0)) {
    clearFiles()
  }
})

// 暴露方法给父组件
defineExpose({
  clearFiles,
  triggerUpload
})
</script>

<style scoped>
.file-upload {
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
  background: rgba(99, 102, 241, 0.05);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.upload-area.has-files {
  border-color: v-bind(themeColor);
  background: rgba(99, 102, 241, 0.05);
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
  display: flex;
  flex-direction: column;
  gap: 12px;
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

.file-preview {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.file-icon {
  font-size: 20px;
  color: v-bind(themeColor);
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
  
  .file-preview {
    width: 32px;
    height: 32px;
  }
  
  .file-icon {
    font-size: 16px;
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

/* 多文件上传时的网格布局 */
.uploaded-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 12px;
}

@media (max-width: 768px) {
  .uploaded-content {
    grid-template-columns: 1fr;
  }
}
</style>

