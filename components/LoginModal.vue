<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="closeModal">
          <i class="fas fa-times"></i>
        </button>
        
        <div class="modal-header">
          <h2 class="modal-title">Welcome</h2>
          <p class="modal-subtitle">Sign in or sign up to continue</p>
        </div>

        <div class="login-options">
          <!-- Google登录 -->
          <button class="login-btn google-btn" @click="handleGoogleLogin">
            <div class="btn-content">
              <svg class="google-icon" viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </div>
          </button>

          <!-- 分隔线 -->
          <div class="divider">
            <span class="divider-text">OR</span>
          </div>

          <!-- 邮箱登录 -->
          <div class="email-login">
            <input 
              v-model="email" 
              type="email" 
              class="email-input" 
              placeholder="Enter your email"
              @keyup.enter="handleEmailLogin"
            />
            <button 
              class="login-btn continue-btn" 
              @click="handleEmailLogin"
              :disabled="loading"
            >
              <span v-if="loading">Sending...</span>
              <span v-else>Continue</span>
            </button>
            <p v-if="error" class="error-message">{{ error }}</p>
          </div>
        </div>

        <div class="modal-footer">
          <p class="footer-text">
            By signing up, you agree to the 
            <a href="#" class="footer-link">Terms of Service</a> 
            and 
            <a href="#" class="footer-link">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'google-login', 'email-login', 'show-verify-code'])

const { post } = useApi()
const email = ref('')
const loading = ref(false)
const error = ref('')

const closeModal = () => {
  emit('close')
  email.value = ''
  error.value = ''
}

const handleGoogleLogin = () => {
  // Google OAuth 2.0 配置参数
  const clientId = '423114934028-8rscjpq0a544tor5i3olc2pq8iaf0iig.apps.googleusercontent.com'
  const redirectUri = encodeURIComponent('http://127.0.0.1:8080/api/user/login/google/callback')
  const scope = encodeURIComponent('openid email profile')
  const responseType = 'code'
  
  // 生成随机 state 用于防止 CSRF 攻击
  const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  // 将 state 存储到 sessionStorage，用于回调时验证
  sessionStorage.setItem('google_oauth_state', state)

  // 构造授权URL（注意：URL 必须是一行，不能有换行和注释）
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=${state}&access_type=offline&prompt=consent`

  // 重定向用户到Google授权页面
  window.location.href = authUrl
}

const handleEmailLogin = async () => {
  const emailValue = email.value.trim()
  
  if (!emailValue) {
    error.value = 'Please enter your email'
    return
  }

  // 简单的邮箱格式验证
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(emailValue)) {
    error.value = 'Please enter a valid email address'
    return
  }

  loading.value = true
  error.value = ''

  try {
    // 使用统一的 API 封装，自动处理响应结构和错误
    await post('/api/user/send-email-code', {
      email: emailValue
    })

    // 发送成功，跳转到验证码输入页面
    emit('show-verify-code', emailValue)
    closeModal()
  } catch (err) {
    // useApi 已经处理了错误提示，这里只需要设置组件内的错误状态
    error.value = err.message || 'Failed to send verification code'
  } finally {
    loading.value = false
  }
}

// 监听ESC键关闭模态框
onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape' && props.isOpen) {
      closeModal()
    }
  }
  window.addEventListener('keydown', handleEscape)
  
  onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape)
  })
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  width: 90%;
  max-width: 420px;
  position: relative;
  animation: slideUp 0.3s ease;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #f3f4f6;
  color: #1f2937;
}

.modal-header {
  text-align: center;
  margin-bottom: 2rem;
}

.modal-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.modal-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.login-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.login-btn {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: white;
  color: #1f2937;
}

.google-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}

.google-btn:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.google-icon {
  flex-shrink: 0;
}

.divider {
  position: relative;
  text-align: center;
  margin: 0.5rem 0;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e5e7eb;
}

.divider-text {
  position: relative;
  background: white;
  padding: 0 1rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.email-login {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.email-input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.9375rem;
  transition: all 0.2s ease;
}

.email-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  margin: 0;
  text-align: center;
}

.continue-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

.continue-btn {
  background: #1f2937;
  color: white;
  border-color: #1f2937;
}

.continue-btn:hover {
  background: #111827;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.continue-btn:active {
  transform: translateY(0);
}

.modal-footer {
  margin-top: 1.5rem;
  text-align: center;
}

.footer-text {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

.footer-link {
  color: #667eea;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #5a6fd8;
  text-decoration: underline;
}

@media (max-width: 480px) {
  .modal-content {
    padding: 1.5rem;
    width: 95%;
  }
  
  .modal-title {
    font-size: 1.5rem;
  }
}
</style>

