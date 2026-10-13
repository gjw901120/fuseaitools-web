<template>
  <Transition name="toast">
    <div v-if="isVisible" class="toast-container" :class="typeClass" role="alert">
      <!-- HUD 四角括号 -->
      <span class="hud-corner hud-corner--tl" aria-hidden="true"></span>
      <span class="hud-corner hud-corner--tr" aria-hidden="true"></span>
      <span class="hud-corner hud-corner--bl" aria-hidden="true"></span>
      <span class="hud-corner hud-corner--br" aria-hidden="true"></span>
      <!-- 顶部装饰扫描线 -->
      <span class="hud-scanline" aria-hidden="true"></span>
      <div class="hud-body">
        <p class="hud-message">{{ message }}</p>
      </div>
      <button class="hud-close" @click="close" aria-label="Close">
        <i class="fas fa-times"></i>
      </button>
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
/* ══════════════════════════════════════════════════
   统一 HUD 科技风边框（全站 Toast）
   - 去掉分类矢量图标与左侧色条，改为整体发光圆角边框 + 四角括号 + 顶部扫描线
   - 配色引用 flux 令牌（:root 全局可用），浅色/暗色站均为深色科技卡片
   - 类型仅改变发光/描边色（--toast-accent / --toast-glow），边框结构统一
   ══════════════════════════════════════════════════ */
.toast-container {
  --toast-accent: var(--flux-primary, hsl(173, 80%, 40%));
  --toast-glow: hsla(173, 80%, 40%, 0.45);
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-width: min(320px, 100%);
  max-width: min(520px, calc(100vw - 48px));
  padding: 20px 46px 20px 24px;
  border: 1px solid var(--toast-accent);
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(9, 14, 20, 0.9) 0%, rgba(6, 10, 15, 0.94) 100%);
  box-shadow:
    0 0 20px var(--toast-glow),
    0 18px 44px rgba(0, 0, 0, 0.5),
    inset 0 0 18px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(12px);
}

/* 类型语义色：仅改变发光/描边色 */
.toast-container.toast-error {
  --toast-accent: var(--flux-destructive, hsl(0, 72%, 55%));
  --toast-glow: hsla(0, 72%, 55%, 0.45);
}
.toast-container.toast-success {
  --toast-accent: var(--flux-success, hsl(142, 70%, 45%));
  --toast-glow: hsla(142, 70%, 45%, 0.45);
}
.toast-container.toast-warning {
  --toast-accent: var(--flux-warning, hsl(38, 92%, 50%));
  --toast-glow: hsla(38, 92%, 50%, 0.45);
}
.toast-container.toast-info {
  --toast-accent: var(--flux-primary, hsl(173, 80%, 40%));
  --toast-glow: hsla(173, 80%, 40%, 0.45);
}

/* 四角括号 */
.hud-corner {
  position: absolute;
  width: 14px;
  height: 14px;
  border: 2px solid var(--toast-accent);
  filter: drop-shadow(0 0 5px var(--toast-glow));
  pointer-events: none;
}
.hud-corner--tl { top: -2px; left: -2px; border-right: 0; border-bottom: 0; border-top-left-radius: 12px; }
.hud-corner--tr { top: -2px; right: -2px; border-left: 0; border-bottom: 0; border-top-right-radius: 12px; }
.hud-corner--bl { bottom: -2px; left: -2px; border-right: 0; border-top: 0; border-bottom-left-radius: 12px; }
.hud-corner--br { bottom: -2px; right: -2px; border-left: 0; border-top: 0; border-bottom-right-radius: 12px; }

/* 顶部装饰扫描线 */
.hud-scanline {
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 42%;
  height: 2px;
  border-radius: 2px;
  background: linear-gradient(90deg, transparent, var(--toast-accent), transparent);
  opacity: 0.85;
  filter: drop-shadow(0 0 6px var(--toast-glow));
  pointer-events: none;
}

.hud-body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
}

.hud-message {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.55;
  letter-spacing: 0.01em;
  color: var(--flux-foreground, hsl(0, 0%, 98%));
  text-align: center;
  width: 100%;
  overflow-wrap: anywhere;
  word-break: break-word;
  white-space: pre-wrap;
}

.hud-close {
  position: absolute;
  top: 10px;
  right: 12px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: 6px;
  color: var(--flux-muted, hsl(215, 12%, 58%));
  font-size: 14px;
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease;
}
.hud-close:hover {
  color: var(--toast-accent);
  background: rgba(255, 255, 255, 0.06);
}

/* 动画 */
.toast-enter-active {
  animation: toastEnter 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.toast-leave-active {
  animation: toastLeave 0.3s ease-in;
}
@keyframes toastEnter {
  from { transform: scale(0.85); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
@keyframes toastLeave {
  from { transform: scale(1); opacity: 1; }
  to { transform: scale(0.9); opacity: 0; }
}

@media (max-width: 640px) {
  .toast-container {
    min-width: 0;
    max-width: calc(100vw - 40px);
    padding: 18px 42px 18px 20px;
  }
}
</style>

