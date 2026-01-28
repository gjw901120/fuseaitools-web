<template>
  <div v-if="toasts.length > 0" class="toast-wrapper">
    <Toast
      v-for="toast in toasts"
      :key="toast.id"
      :message="toast.message"
      :type="toast.type"
      :duration="toast.duration || 5000"
      @close="removeToast(toast.id)"
    />
  </div>
</template>

<script setup>
const { toasts, removeToast } = useToast()

// 调试：监听 toasts 变化
watch(toasts, (newToasts) => {
  console.log('Toasts updated:', newToasts.length, newToasts)
}, { deep: true })
</script>

<style scoped>
.toast-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10001;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  max-width: 500px;
  width: auto;
}

/* 让 Toast 本身可以接收点击事件 */
.toast-wrapper :deep(.toast-container) {
  pointer-events: auto;
}

@media (max-width: 640px) {
  .toast-wrapper {
    left: 50%;
    right: auto;
    width: calc(100% - 40px);
    max-width: 500px;
  }
}
</style>

