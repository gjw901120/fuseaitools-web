<template>
  <div class="uploaded-image">
    <div class="form-group">
      <label>{{ label }}</label>
      <div class="file-upload-area">
        <input
          :id="inputId"
          ref="fileInput"
          type="file"
          @change="handleFileChange"
          :accept="accept"
          :multiple="multiple"
          class="file-input"
        />
        <label :for="inputId" class="file-upload-label">
          <div class="upload-content">
            <i :class="uploadIcon"></i>
            <div class="upload-text">
              <span>{{ uploadText }}</span>
              <small>{{ uploadHint }}</small>
            </div>
          </div>
        </label>
      </div>
      
      <!-- 已上传文件列表 -->
        <div v-if="uploadedFiles.length > 0" class="uploaded-files">
          <div v-for="(file, index) in uploadedFiles" :key="index" class="file-item">
            <div class="file-preview" @click="isImage(file) ? previewImage(file) : null" :class="{ 'clickable': isImage(file) }">
              <img v-if="isImage(file)" :src="getFilePreview(file)" :alt="file.name" class="preview-image" />
              <i v-else :class="getFileIcon(file)" class="file-icon"></i>
              <div v-if="isImage(file)" class="preview-overlay">
                <i class="fas fa-eye"></i>
              </div>
            </div>
            <div class="file-info">
              <span class="file-name">{{ file.name }}</span>
              <span class="file-size">{{ formatFileSize(file.size) }}</span>
            </div>
            <button type="button" @click="removeFile(index)" class="remove-file">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      
      <!-- 额外提示信息 -->
      <div v-if="additionalHint" class="additional-hint">
        {{ additionalHint }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  // 基础配置
  inputId: {
    type: String,
    default: 'image-upload'
  },
  label: {
    type: String,
    default: '参考图片 (可选)'
  },
  
  // 上传区域配置
  uploadIcon: {
    type: String,
    default: 'fas fa-cloud-upload-alt'
  },
  uploadText: {
    type: String,
    default: '点击上传图片'
  },
  uploadHint: {
    type: String,
    default: '支持 .jfif, .jpeg, .jpg, .png, .webp (最多5张)'
  },
  
  // 文件配置
  accept: {
    type: String,
    default: '.jfif,.pjpeg,.jpeg,.pjp,.jpg,.png,.webp'
  },
  multiple: {
    type: Boolean,
    default: true
  },
  maxFiles: {
    type: Number,
    default: 5
  },
  maxFileSize: {
    type: Number,
    default: 10 * 1024 * 1024 // 10MB
  },
  
  // 额外提示
  additionalHint: {
    type: String,
    default: ''
  },
  
  // 主题配置
  themeColor: {
    type: String,
    default: '#6366f1'
  }
})

const emit = defineEmits(['update:files', 'file-added', 'file-removed'])

const fileInput = ref(null)
const uploadedFiles = ref([])

const handleFileChange = (event) => {
  const files = Array.from(event.target.files)
  if (files.length > 0) {
    validateAndAddFiles(files)
  }
}

const validateAndAddFiles = (files) => {
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
    if (!isFileTypeAccepted(file)) {
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
    emit('file-added', validFiles)
  }
}

const isFileTypeAccepted = (file) => {
  const acceptedTypes = props.accept.split(',').map(type => type.trim())
  return acceptedTypes.some(type => {
    if (type.startsWith('.')) {
      // 检查文件扩展名
      const extension = type.toLowerCase()
      return file.name.toLowerCase().endsWith(extension)
    } else if (type.endsWith('/*')) {
      // 检查MIME类型前缀
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
  } else {
    return 'fas fa-file'
  }
}

const removeFile = (index) => {
  const removedFile = uploadedFiles.value[index]
  uploadedFiles.value.splice(index, 1)
  
  emit('update:files', props.multiple ? uploadedFiles.value : uploadedFiles.value[0] || null)
  emit('file-removed', removedFile)
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

const previewImage = (file) => {
  const url = URL.createObjectURL(file)
  
  // 创建预览模态框
  const modal = document.createElement('div')
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    cursor: pointer;
  `
  
  const img = document.createElement('img')
  img.src = url
  img.style.cssText = `
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  `
  
  const closeBtn = document.createElement('div')
  closeBtn.style.cssText = `
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 18px;
    color: #333;
  `
  closeBtn.innerHTML = '×'
  
  modal.appendChild(img)
  modal.appendChild(closeBtn)
  document.body.appendChild(modal)
  
  // 点击关闭
  const closeModal = () => {
    document.body.removeChild(modal)
    URL.revokeObjectURL(url)
  }
  
  modal.addEventListener('click', closeModal)
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    closeModal()
  })
  
  // ESC键关闭
  const handleKeydown = (e) => {
    if (e.key === 'Escape') {
      closeModal()
      document.removeEventListener('keydown', handleKeydown)
    }
  }
  document.addEventListener('keydown', handleKeydown)
}

// 暴露方法给父组件
defineExpose({
  clearFiles,
  triggerUpload: () => fileInput.value?.click()
})
</script>

<style scoped>
.uploaded-image {
  width: 100%;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.file-upload-area {
  position: relative;
  margin-bottom: 12px;
}

.file-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.file-upload-label {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  border: 2px dashed #e2e8f0;
  border-radius: 8px;
  background: #f8fafc;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 42px;
}

.file-upload-label:hover {
  border-color: v-bind(themeColor);
  background: rgba(99, 102, 241, 0.05);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.upload-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.file-upload-label i {
  font-size: 16px;
  color: v-bind(themeColor);
  flex-shrink: 0;
}

.upload-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
}

.file-upload-label span {
  font-size: 13px;
  font-weight: 500;
  color: #374151;
}

.file-upload-label small {
  font-size: 10px;
  color: #64748b;
}

.uploaded-files {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.file-item:hover {
  border-color: v-bind(themeColor);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
  position: relative;
}

.file-preview.clickable {
  cursor: pointer;
  transition: all 0.2s ease;
}

.file-preview.clickable:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
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

.preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.file-preview.clickable:hover .preview-overlay {
  opacity: 1;
}

.preview-overlay i {
  color: white;
  font-size: 14px;
}

.file-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.file-name {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  word-break: break-all;
}

.file-size {
  font-size: 12px;
  color: #64748b;
}

.remove-file {
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

.remove-file:hover {
  background: #dc2626;
  transform: scale(1.1);
}

.additional-hint {
  margin-top: 8px;
  font-size: 12px;
  color: #64748b;
  line-height: 1.4;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .file-upload-label {
    padding: 10px 14px;
    min-height: 36px;
  }
  
  .upload-content {
    gap: 8px;
  }
  
  .file-upload-label i {
    font-size: 14px;
  }
  
  .file-upload-label span {
    font-size: 12px;
  }
  
  .file-upload-label small {
    font-size: 9px;
  }
  
  .file-item {
    padding: 8px;
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
  
  .remove-file {
    width: 24px;
    height: 24px;
  }
}

/* 多文件网格布局 */
@media (min-width: 768px) {
  .uploaded-files {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 12px;
  }
}
</style>
