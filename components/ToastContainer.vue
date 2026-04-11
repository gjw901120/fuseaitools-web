<template>
  <div v-if="toasts.length > 0" class="toast-wrapper">
    <Toast
      v-for="toast in toasts"
      :key="toast.id"
      :message="toast.message"
      :type="toast.type"
      :duration="toast.duration ?? 3000"
      @close="removeToast(toast.id)"
    />
  </div>
</template>

<script setup>
const { toasts, removeToast } = useToast()
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
  box-sizing: border-box;
  width: min(500px, calc(100vw - 40px));
  max-width: min(500px, calc(100vw - 40px));
  padding: 0 20px;
}

/* 让 Toast 本身可以接收点击事件；子项可收缩避免长文案撑出视口 */
.toast-wrapper :deep(.toast-container) {
  pointer-events: auto;
  max-width: 100%;
}

@media (max-width: 640px) {
  .toast-wrapper {
    left: 50%;
    right: auto;
    width: calc(100% - 40px);
    max-width: calc(100% - 40px);
    padding: 0 20px;
  }
}
</style>

