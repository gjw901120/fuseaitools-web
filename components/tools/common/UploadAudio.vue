<template>
  <div class="uploaded-audio">
    <!-- 上传区域 -->
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
        @click="triggerUpload"
      >
        <div class="upload-content">
          <div class="upload-icon">
            <i :class="uploadIcon"></i>
          </div>
          <div class="upload-text">
            <span class="upload-title">{{ uploadText }}</span>
            <small class="upload-subtitle">{{ uploadHint }}</small>
          </div>
        </div>
      </div>
    </div>

    <!-- 上传完成的音频展示区域 -->
    <div v-if="uploadedFile" class="uploaded-audio-display">
      <div class="audio-file-info">
        <i class="fas fa-file-audio audio-icon"></i>
        <div class="file-details">
          <span class="file-name">{{ uploadedFile.name }}</span>
          <span class="file-size">{{ formatFileSize(uploadedFile.size) }}</span>
        </div>
        <button 
          type="button"
          @click="clearFile"
          class="remove-btn"
          title="删除文件"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <!-- 音频播放控制 -->
      <div class="audio-player">
        <button 
          type="button"
          @click="togglePlay"
          class="play-pause-btn"
          :class="{ playing: isPlaying }"
          :title="isPlaying ? '暂停' : '播放'"
        >
          <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
        </button>
        
        <div class="progress-container" @click="handleProgressClick">
          <div class="progress-bar" :style="{ width: progress + '%' }"></div>
        </div>
        
        <span class="time-display">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
      </div>
    </div>

    <!-- 额外提示信息 -->
    <div v-if="additionalHint" class="additional-hint">
      {{ additionalHint }}
    </div>

    <!-- 隐藏的音频元素 -->
    <audio 
      ref="audioPlayer" 
      @timeupdate="handleTimeUpdate" 
      @loadedmetadata="handleLoadedMetadata" 
      @ended="handleEnded"
    ></audio>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'

const props = defineProps({
  inputId: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: '上传音频文件'
  },
  uploadIcon: {
    type: String,
    default: 'fas fa-cloud-upload-alt'
  },
  uploadText: {
    type: String,
    default: '点击上传音频文件'
  },
  uploadHint: {
    type: String,
    default: '支持 MP3, WAV, M4A 等格式'
  },
  additionalHint: {
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
  },
  multiple: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:files'])

const fileInput = ref(null)
const audioPlayer = ref(null)
const uploadedFile = ref(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)

const progress = computed(() => {
  return duration.value > 0 ? (currentTime.value / duration.value) * 100 : 0
})

const triggerUpload = () => {
  fileInput.value?.click()
}

const handleFileChange = (event) => {
  const files = Array.from(event.target.files)
  if (files.length > 0) {
    const file = files[0] // 目前只处理第一个文件
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
      const audioDuration = await getAudioDuration(file)
      if (audioDuration > props.maxDuration) {
        alert(`音频时长不能超过 ${props.maxDuration} 秒`)
        return
      }
    } catch (error) {
      console.warn('无法获取音频时长:', error)
    }
  }
  
  uploadedFile.value = file
  if (audioPlayer.value) {
    audioPlayer.value.src = URL.createObjectURL(file)
    audioPlayer.value.load()
  }
  
  // 重置播放状态
  isPlaying.value = false
  currentTime.value = 0
  
  emit('update:files', [file])
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

const togglePlay = () => {
  if (!audioPlayer.value) return
  
  if (isPlaying.value) {
    audioPlayer.value.pause()
  } else {
    audioPlayer.value.play()
  }
  isPlaying.value = !isPlaying.value
}

const handleTimeUpdate = () => {
  if (audioPlayer.value) {
    currentTime.value = audioPlayer.value.currentTime
  }
}

const handleLoadedMetadata = () => {
  if (audioPlayer.value) {
    duration.value = audioPlayer.value.duration
  }
}

const handleEnded = () => {
  isPlaying.value = false
  currentTime.value = 0
  if (audioPlayer.value) {
    audioPlayer.value.currentTime = 0
  }
}

const handleProgressClick = (event) => {
  if (!audioPlayer.value || duration.value === 0) return
  
  const progressBar = event.currentTarget
  const clickX = event.clientX - progressBar.getBoundingClientRect().left
  const newTime = (clickX / progressBar.offsetWidth) * duration.value
  
  audioPlayer.value.currentTime = newTime
  currentTime.value = newTime
}

const clearFile = () => {
  // 停止播放
  if (audioPlayer.value) {
    audioPlayer.value.pause()
    audioPlayer.value.currentTime = 0
    audioPlayer.value.src = ''
  }
  
  uploadedFile.value = null
  isPlaying.value = false
  currentTime.value = 0
  duration.value = 0
  
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  
  emit('update:files', [])
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const formatTime = (seconds) => {
  if (isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// 组件卸载时清理资源
onUnmounted(() => {
  if (uploadedFile.value && audioPlayer.value && audioPlayer.value.src) {
    URL.revokeObjectURL(audioPlayer.value.src)
  }
})
</script>

<style scoped>
.uploaded-audio {
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
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f8fafc;
  min-height: 48px;
  display: flex;
  align-items: center;
}

.upload-area:hover {
  border-color: v-bind(themeColor);
  background: rgba(16, 185, 129, 0.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.upload-content {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.upload-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: v-bind(themeColor);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  flex-shrink: 0;
}

.upload-text {
  flex: 1;
  text-align: left;
}

.upload-title {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 2px 0;
}

.upload-subtitle {
  display: block;
  font-size: 11px;
  color: #64748b;
  margin: 0;
}

/* 上传完成的音频展示区域 */
.uploaded-audio-display {
  margin-top: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  overflow: hidden;
}

.audio-file-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.audio-icon {
  font-size: 18px;
  color: v-bind(themeColor);
  flex-shrink: 0;
}

.file-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.file-name {
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  word-break: break-all;
}

.file-size {
  font-size: 11px;
  color: #64748b;
}

.remove-btn {
  width: 24px;
  height: 24px;
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
  font-size: 10px;
}

.remove-btn:hover {
  background: #dc2626;
}

/* 音频播放控制 */
.audio-player {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
}

.play-pause-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: v-bind(themeColor);
  color: white;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 12px;
}

.play-pause-btn:hover {
  background: v-bind(themeColor);
  opacity: 0.8;
}

.play-pause-btn.playing {
  background: #ef4444;
}

.play-pause-btn.playing:hover {
  background: #dc2626;
}

.progress-container {
  flex: 1;
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
}

.progress-bar {
  height: 100%;
  background: v-bind(themeColor);
  border-radius: 2px;
}

.time-display {
  font-size: 11px;
  color: #64748b;
  font-family: monospace;
  flex-shrink: 0;
  min-width: 80px;
  text-align: right;
}

.additional-hint {
  margin-top: 8px;
  font-size: 12px;
  color: #64748b;
  line-height: 1.4;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .upload-area {
    padding: 10px 14px;
    min-height: 44px;
  }
  
  .upload-icon {
    width: 28px;
    height: 28px;
    font-size: 12px;
  }
  
  .upload-title {
    font-size: 12px;
  }
  
  .upload-subtitle {
    font-size: 10px;
  }
  
  .audio-file-info {
    padding: 10px 14px;
  }
  
  .audio-icon {
    font-size: 16px;
  }
  
  .file-name {
    font-size: 12px;
  }
  
  .file-size {
    font-size: 10px;
  }
  
  .remove-btn {
    width: 22px;
    height: 22px;
    font-size: 9px;
  }
  
  .audio-player {
    padding: 10px 14px;
    gap: 10px;
  }
  
  .play-pause-btn {
    width: 28px;
    height: 28px;
    font-size: 11px;
  }
  
  .time-display {
    font-size: 10px;
    min-width: 70px;
  }
}
</style>