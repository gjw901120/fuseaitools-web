<template>
  <div v-if="toasts.length > 0" class="toast-wrapper">
    <Toast
      v-for="toast in toasts"
      :key="toast.id"
      :message="toast.message"
      :type="toast.type"
      :duration="0"
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
  top: 20px;
  right: 20px;
  z-index: 10001;
  pointer-events: none;
  display: flex;
  flex-direction: column;
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
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
}
</style>

