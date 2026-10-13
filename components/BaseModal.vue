<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="flux-modal-overlay"
      :class="{ 'flux-modal-overlay--heavy': heavy }"
      @click.self="onOverlayClick"
    >
      <div
        class="flux-modal-card"
        role="dialog"
        aria-modal="true"
        :aria-label="ariaLabel"
        :style="{ maxWidth: maxWidth }"
        @click.stop
      >
        <button
          v-if="showClose"
          type="button"
          class="flux-modal-close"
          aria-label="Close"
          @click="emit('close')"
        >
          <i class="fas fa-times"></i>
        </button>

        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
/**
 * 全站统一模态弹窗基座。
 * - Teleport 到 body（配合 flux-theme.css 的 .flux-modal-* 全局工具类）
 * - 遮罩点击关闭、ESC 关闭、打开时锁定 body 滚动
 * - z-index 由 .flux-modal-overlay / --heavy 走 :root 令牌刻度
 *
 * 用法：<BaseModal :is-open="open" @close="open = false" max-width="560px"> 内容 </BaseModal>
 */
const props = defineProps({
  isOpen: { type: Boolean, default: false },
  maxWidth: { type: String, default: '420px' },
  closeOnOverlay: { type: Boolean, default: true },
  showClose: { type: Boolean, default: true },
  // 重交互弹窗（如画框编辑）抬到更高层级，避免被普通模态遮挡
  heavy: { type: Boolean, default: false },
  ariaLabel: { type: String, default: 'Dialog' },
})

const emit = defineEmits(['close'])

function onOverlayClick() {
  if (props.closeOnOverlay) emit('close')
}

// ESC 关闭
function handleEscape(e) {
  if (e.key === 'Escape' && props.isOpen) emit('close')
}

// 打开时锁定 body 滚动
watch(
  () => props.isOpen,
  (open) => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = open ? 'hidden' : ''
  }
)

onMounted(() => window.addEventListener('keydown', handleEscape))
onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape)
  if (typeof document !== 'undefined') document.body.style.overflow = ''
})
</script>
