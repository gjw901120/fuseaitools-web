<template>
  <div class="error-page">
    <NuxtLink to="/" class="error-brand" aria-label="FuseAI Tools home">
      <img src="/logo-wide.png" alt="FuseAI Tools" class="error-logo" />
    </NuxtLink>

    <main class="error-card">
      <p class="error-code">{{ statusCode }}</p>
      <h1 class="error-title">{{ title }}</h1>
      <p class="error-message">{{ message }}</p>

      <div class="error-actions">
        <button type="button" class="error-btn error-btn--primary" @click="retry">
          Try Again
        </button>
        <button type="button" class="error-btn error-btn--ghost" @click="goHome">
          Back to Home
        </button>
      </div>

      <p class="error-hint">
        Still stuck? Email
        <a href="mailto:service@fuseaitools.com">service@fuseaitools.com</a>
      </p>
    </main>
  </div>
</template>

<script setup>
// Nuxt 约定的错误页：替换默认白屏/英文堆栈页，保留品牌感且不暴露内部信息。
// 注意：error.vue 不会经过 layouts，样式需自带。
const props = defineProps({
  error: {
    type: Object,
    default: () => ({})
  }
})

const statusCode = computed(() => Number(props.error?.statusCode) || 500)

const title = computed(() => {
  if (statusCode.value === 404) return 'Page not found'
  if (statusCode.value === 403) return 'Access denied'
  if (statusCode.value === 503) return 'Service temporarily unavailable'
  return 'Something went wrong'
})

// 500 时线上原始 message 可能是压缩后的变量名（如 "Cannot access 'e' before initialization"），
// 这类信息对用户无意义，统一给一句可操作的提示。
const message = computed(() => {
  if (statusCode.value === 404) {
    return 'The page you are looking for does not exist or has been moved.'
  }
  if (statusCode.value === 403) {
    return 'You do not have permission to view this page.'
  }
  return 'An unexpected error occurred while loading this page. Please try again in a moment.'
})

const retry = () => {
  if (import.meta.client) window.location.reload()
}

const goHome = () => {
  clearError({ redirect: '/' })
}

useHead({
  title: `${statusCode.value} - FuseAI Tools`,
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
})
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2rem 1.25rem;
  background: radial-gradient(circle at 50% 0%, hsl(200, 60%, 12%) 0%, var(--flux-bg, #0b0d10) 55%);
  color: var(--flux-foreground, #fafafa);
}

.error-brand {
  display: inline-flex;
  align-items: center;
}

.error-logo {
  height: 34px;
  width: auto;
}

.error-card {
  width: 100%;
  max-width: 560px;
  padding: 2.5rem 2rem;
  text-align: center;
  background: var(--flux-card, hsl(215, 25%, 14%));
  border: 1px solid var(--flux-border, hsl(215, 16%, 22%));
  border-radius: 18px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
}

.error-code {
  margin: 0;
  font-size: clamp(3.5rem, 12vw, 5.5rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
  background: var(--flux-gradient, linear-gradient(135deg, #14b8a6 0%, #0ea5e9 100%));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.error-title {
  margin: 0.75rem 0 0.5rem;
  font-size: 1.375rem;
  font-weight: 700;
}

.error-message {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--flux-muted, hsl(215, 12%, 58%));
}

.error-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 1.75rem;
}

.error-btn {
  padding: 0.7rem 1.4rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 10px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
}

.error-btn:active {
  transform: translateY(1px);
}

.error-btn--primary {
  background: var(--flux-primary, hsl(173, 80%, 40%));
  color: hsl(220, 14%, 5%);
}

.error-btn--primary:hover {
  background: var(--flux-primary-hover, hsl(173, 80%, 46%));
}

.error-btn--ghost {
  background: transparent;
  border-color: var(--flux-border, hsl(215, 16%, 22%));
  color: var(--flux-foreground, #fafafa);
}

.error-btn--ghost:hover {
  border-color: var(--flux-primary, hsl(173, 80%, 40%));
  color: var(--flux-primary, hsl(173, 80%, 40%));
}

.error-hint {
  margin: 1.5rem 0 0;
  font-size: 0.8rem;
  color: var(--flux-muted, hsl(215, 12%, 58%));
}

.error-hint a {
  color: var(--flux-primary, hsl(173, 80%, 40%));
  text-decoration: none;
}

.error-hint a:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .error-card {
    padding: 2rem 1.25rem;
  }

  .error-actions {
    flex-direction: column;
  }

  .error-btn {
    width: 100%;
  }
}
</style>
