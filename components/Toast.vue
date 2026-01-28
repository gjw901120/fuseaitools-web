<template>
  <Transition name="toast">
    <div v-if="isVisible" class="toast-container" :class="typeClass">
      <div class="toast-content">
        <div class="toast-icon">
          <span v-if="type === 'error'" class="toast-emoji">😔</span>
          <i v-else-if="type === 'success'" class="fas fa-check-circle"></i>
          <i v-else-if="type === 'warning'" class="fas fa-exclamation-triangle"></i>
          <i v-else class="fas fa-info-circle"></i>
        </div>
        <div class="toast-message-wrapper">
          <div class="toast-message">{{ message }}</div>
        </div>
        <button class="toast-close" @click="close" aria-label="Close">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'error', // error, success, warning, info
    validator: (value) => ['error', 'success', 'warning', 'info'].includes(value)
  },
  duration: {
    type: Number,
    default: 3000 // 显示时长（毫秒）
  }
})

const emit = defineEmits(['close'])

const isVisible = ref(true)

const typeClass = computed(() => `toast-${props.type}`)

let timer = null

onMounted(() => {
  // 自动关闭
  if (props.duration > 0) {
    timer = setTimeout(() => {
      close()
    }, props.duration)
  }
})

const close = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  isVisible.value = false
  // 等待动画完成后触发 close 事件
  setTimeout(() => {
    emit('close')
  }, 300)
}

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer)
  }
})
</script>

<style scoped>
.toast-container {
  position: relative;
  min-width: 320px;
  max-width: 500px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  width: 100%;
}

.toast-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px 28px;
}

.toast-icon {
  font-size: 24px;
  flex-shrink: 0;
  margin-top: 2px;
}

.toast-emoji {
  font-size: 32px;
  display: block;
  line-height: 1;
}

.toast-error .toast-icon {
  color: #ef4444;
}

.toast-success .toast-icon {
  color: #10b981;
}

.toast-warning .toast-icon {
  color: #f59e0b;
}

.toast-info .toast-icon {
  color: #3b82f6;
}

.toast-message-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.toast-message {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: #374151;
  text-align: center;
  width: 100%;
}

.toast-close {
  background: none;
  border: none;
  color: #6b7280;
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
  flex-shrink: 0;
}

.toast-close:hover {
  color: #1f2937;
}

/* 类型特定的边框颜色 */
.toast-error {
  border: 2px solid #fee2e2;
  background: linear-gradient(135deg, #fef2f2 0%, #ffffff 100%);
}

.toast-success {
  border-left: 4px solid #10b981;
}

.toast-warning {
  border-left: 4px solid #f59e0b;
}

.toast-info {
  border-left: 4px solid #3b82f6;
}

/* 动画 */
.toast-enter-active {
  animation: toastEnter 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.toast-leave-active {
  animation: toastLeave 0.3s ease-in;
}

@keyframes toastEnter {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes toastLeave {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.8);
    opacity: 0;
  }
}

@media (max-width: 640px) {
  .toast-container {
    min-width: 280px;
    max-width: calc(100vw - 40px);
  }
}
</style>

