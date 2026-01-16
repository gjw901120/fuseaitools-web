<template>
  <Transition name="toast">
    <div v-if="isVisible" class="toast-container" :class="typeClass">
      <div class="toast-content">
        <div class="toast-icon">
          <i v-if="type === 'error'" class="fas fa-exclamation-circle"></i>
          <i v-else-if="type === 'success'" class="fas fa-check-circle"></i>
          <i v-else-if="type === 'warning'" class="fas fa-exclamation-triangle"></i>
          <i v-else class="fas fa-info-circle"></i>
        </div>
        <div class="toast-message">{{ message }}</div>
        <button class="toast-close" @click="close">
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
  min-width: 300px;
  max-width: 500px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  animation: slideInRight 0.3s ease;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
}

.toast-icon {
  font-size: 20px;
  flex-shrink: 0;
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

.toast-message {
  flex: 1;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: #1f2937;
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
  border-left: 4px solid #ef4444;
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
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

@media (max-width: 640px) {
  .toast-container {
    top: 10px;
    right: 10px;
    left: 10px;
    min-width: auto;
    max-width: none;
  }
}
</style>

