<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="closeModal">
          <i class="fas fa-times"></i>
        </button>
        
        <div class="modal-header">
          <h2 class="modal-title">Enter Verification Code</h2>
          <p class="modal-subtitle">We've sent a verification code to<br><strong>{{ email }}</strong></p>
        </div>

        <div class="verify-form">
          <div class="code-input-container">
            <input
              v-for="(digit, index) in codeDigits"
              :key="index"
              :ref="el => codeInputs[index] = el"
              v-model="codeDigits[index]"
              type="text"
              maxlength="1"
              class="code-input"
              :class="{ 'error': hasError }"
              @input="handleCodeInput(index, $event)"
              @keydown="handleKeyDown(index, $event)"
              @paste="handlePaste"
            />
          </div>

          <p v-if="error" class="error-message">{{ error }}</p>
          <p v-if="success" class="success-message">{{ success }}</p>

          <div class="resend-section">
            <p class="resend-text">
              Didn't receive the code? 
              <button 
                class="resend-btn" 
                @click="resendCode"
                :disabled="resendCooldown > 0"
              >
                {{ resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend' }}
              </button>
            </p>
          </div>

          <button 
            class="verify-btn" 
            @click="handleVerify"
            :disabled="!isCodeComplete || loading"
          >
            <span v-if="loading">Verifying...</span>
            <span v-else>Verify</span>
          </button>
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
  },
  email: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close', 'verify-success'])

const { post } = useApi()
const { login } = useAuth()
const router = useRouter()

const codeDigits = ref(['', '', '', '', '', ''])
const codeInputs = ref([])
const loading = ref(false)
const error = ref('')
const success = ref('')
const hasError = ref(false)
const resendCooldown = ref(0)

const isCodeComplete = computed(() => {
  return codeDigits.value.every(digit => digit !== '')
})

const closeModal = () => {
  emit('close')
  resetForm()
}

const resetForm = () => {
  codeDigits.value = ['', '', '', '', '', '']
  error.value = ''
  success.value = ''
  hasError.value = false
  loading.value = false
  if (codeInputs.value[0]) {
    codeInputs.value[0].focus()
  }
}

const handleCodeInput = (index, event) => {
  const value = event.target.value.replace(/[^0-9]/g, '')
  codeDigits.value[index] = value

  if (value && index < 5) {
    codeInputs.value[index + 1]?.focus()
  }

  error.value = ''
  hasError.value = false
}

const handleKeyDown = (index, event) => {
  if (event.key === 'Backspace' && !codeDigits.value[index] && index > 0) {
    codeInputs.value[index - 1]?.focus()
  }
}

const handlePaste = (event) => {
  event.preventDefault()
  const pastedData = event.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6)
  
  for (let i = 0; i < 6; i++) {
    codeDigits.value[i] = pastedData[i] || ''
  }
  
  if (pastedData.length === 6) {
    codeInputs.value[5]?.focus()
  } else if (pastedData.length > 0) {
    codeInputs.value[pastedData.length]?.focus()
  }
}

const handleVerify = async () => {
  if (!isCodeComplete.value) {
    error.value = 'Please enter the complete verification code'
    hasError.value = true
    return
  }

  loading.value = true
  error.value = ''
  success.value = ''
  hasError.value = false

  try {
    const code = codeDigits.value.join('')
    
    // 使用统一的 API 封装，自动处理响应结构和错误
    // 成功时返回 data，失败时自动显示错误提示
    const data = await post('/api/user/login-by-email', {
      email: props.email,
      code: code
    })

    // data 中应该包含 token
    if (data?.token) {
      const token = data.token
      
      // 验证成功，保存 token 并登录
      const loginSuccess = login(token)
      
      if (loginSuccess) {
        success.value = 'Verification successful!'
        emit('verify-success', token)
        
        // 立即关闭模态框，不刷新页面
        setTimeout(() => {
          closeModal()
        }, 500)
      } else {
        error.value = 'Failed to process login'
        hasError.value = true
      }
    } else {
      error.value = 'Invalid response: token not found'
      hasError.value = true
      // 清空输入框
      codeDigits.value = ['', '', '', '', '', '']
      codeInputs.value[0]?.focus()
    }
  } catch (err) {
    // useApi 已经处理了错误提示（alert），这里只需要设置组件内的错误状态
    error.value = err.message || 'Login failed'
    hasError.value = true
    // 清空输入框
    codeDigits.value = ['', '', '', '', '', '']
    codeInputs.value[0]?.focus()
  } finally {
    loading.value = false
  }
}

const resendCode = async () => {
  if (resendCooldown.value > 0) return

  loading.value = true
  error.value = ''

  try {
    // 使用统一的 API 封装，自动处理响应结构和错误
    await post('/api/user/send-email-code', {
      email: props.email
    })

    success.value = 'Verification code resent!'
    resendCooldown.value = 60
    
    const timer = setInterval(() => {
      resendCooldown.value--
      if (resendCooldown.value <= 0) {
        clearInterval(timer)
      }
    }, 1000)
  } catch (err) {
    // useApi 已经处理了错误提示（alert），这里只需要设置组件内的错误状态
    error.value = err.message || 'Failed to resend code'
  } finally {
    loading.value = false
  }
}

// 当模态框打开时，聚焦第一个输入框
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    resetForm()
    nextTick(() => {
      codeInputs.value[0]?.focus()
    })
  }
})

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
  line-height: 1.5;
}

.modal-subtitle strong {
  color: #1f2937;
  font-weight: 600;
}

.verify-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.code-input-container {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.code-input {
  width: 48px;
  height: 56px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  transition: all 0.2s ease;
}

.code-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.code-input.error {
  border-color: #ef4444;
  animation: shake 0.3s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  text-align: center;
  margin: 0;
}

.success-message {
  color: #10b981;
  font-size: 0.875rem;
  text-align: center;
  margin: 0;
}

.resend-section {
  text-align: center;
}

.resend-text {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.resend-btn {
  background: none;
  border: none;
  color: #667eea;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
  transition: color 0.2s ease;
}

.resend-btn:hover:not(:disabled) {
  color: #5a6fd8;
}

.resend-btn:disabled {
  color: #9ca3af;
  cursor: not-allowed;
  text-decoration: none;
}

.verify-btn {
  width: 100%;
  padding: 0.875rem 1rem;
  background: #1f2937;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.verify-btn:hover:not(:disabled) {
  background: #111827;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.verify-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 480px) {
  .modal-content {
    padding: 1.5rem;
    width: 95%;
  }
  
  .modal-title {
    font-size: 1.5rem;
  }

  .code-input {
    width: 40px;
    height: 48px;
    font-size: 1.25rem;
  }
}
</style>

