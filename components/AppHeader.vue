<template>
  <header class="app-header">
    <div class="simply-container">
      <div class="header-content">
        <div class="logo">
          <NuxtLink to="/" class="logo-link">
            <img src="/favicon.ico" alt="Logo" class="logo-icon" />
            <span>FuseAI</span>
          </NuxtLink>
        </div>

        <nav class="nav">
          <NuxtLink to="/home" class="nav-link">Home</NuxtLink>

          <NuxtLink to="/pricing" class="nav-link">Pricing</NuxtLink>
          <NuxtLink to="/news" class="nav-link">News</NuxtLink>
          <NuxtLink to="/about" class="nav-link">About</NuxtLink>
        </nav>

        <div class="header-actions">
          <!-- 登录/用户信息 (ClientOnly to prevent hydration mismatch) -->
          <ClientOnly>
            <!-- 未登录状态 -->
            <button v-if="!isAuthenticated" class="btn-signup" @click="openLoginModal">Log in</button>
            
            <!-- 已登录状态 -->
            <div v-else class="user-info">
              <img 
                :src="userAvatar" 
                :alt="userName || 'User'" 
                class="user-avatar" 
                @click="toggleUserMenu" 
              />
              <span v-if="userName" class="user-name">{{ userName }}</span>
              
              <!-- 用户菜单下拉 -->
              <div v-if="userMenuOpen" class="user-menu">
                <div class="user-menu-item" @click="handleLogout">
                  <i class="fas fa-sign-out-alt"></i>
                  <span>Log out</span>
                </div>
              </div>
            </div>
            <template #fallback>
              <button class="btn-signup" disabled>Loading...</button>
            </template>
          </ClientOnly>
        </div>

        <button class="mobile-menu-btn" @click="toggleMobileMenu">
          <i class="fas fa-bars"></i>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="mobile-menu">
        <NuxtLink to="/home" class="mobile-nav-link" @click="closeMobileMenu">Home</NuxtLink>
        <NuxtLink to="/features" class="mobile-nav-link" @click="closeMobileMenu">Features</NuxtLink>
        <NuxtLink to="/pricing" class="mobile-nav-link" @click="closeMobileMenu">Pricing</NuxtLink>
        <NuxtLink to="/news" class="mobile-nav-link" @click="closeMobileMenu">News</NuxtLink>
        <NuxtLink to="/about" class="mobile-nav-link" @click="closeMobileMenu">About</NuxtLink>
        <div class="mobile-actions">
          <!-- 登录/用户信息 (ClientOnly to prevent hydration mismatch) -->
          <ClientOnly>
            <!-- 未登录状态 -->
            <button v-if="!isAuthenticated" class="btn-signup" @click="openLoginModal">Log in</button>
            
            <!-- 已登录状态 -->
            <div v-else class="mobile-user-info">
              <img :src="userAvatar" :alt="userName || 'User'" class="mobile-user-avatar" />
              <span v-if="userName" class="mobile-user-name">{{ userName }}</span>
              <button class="mobile-logout-btn" @click="handleLogout">Log out</button>
            </div>
            <template #fallback>
              <button class="btn-signup" disabled>Loading...</button>
            </template>
          </ClientOnly>
        </div>
      </div>
    </div>

    <!-- 登录模态框 -->
    <LoginModal 
      :is-open="loginModalOpen" 
      @close="closeLoginModal"
      @google-login="handleGoogleLogin"
      @email-login="handleEmailLogin"
      @show-verify-code="handleShowVerifyCode"
    />

    <!-- 验证码模态框 -->
    <VerifyCodeModal
      :is-open="verifyCodeModalOpen"
      :email="verifyEmail"
      @close="closeVerifyCodeModal"
      @verify-success="handleVerifySuccess"
    />
  </header>
</template>

<script setup>
// Header component with login button
const { user, isAuthenticated, logout } = useAuth()

// 计算用户头像和用户名
const userAvatar = computed(() => {
  return user.value?.avatar && user.value.avatar.trim() 
    ? user.value.avatar 
    : '/default-avatar.svg'
})

const userName = computed(() => {
  return user.value?.name && user.value.name.trim() 
    ? user.value.name 
    : ''
})

const mobileMenuOpen = ref(false)
const loginModalOpen = ref(false)
const verifyCodeModalOpen = ref(false)
const verifyEmail = ref('')
const userMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const openLoginModal = () => {
  loginModalOpen.value = true
  closeMobileMenu() // 如果移动菜单打开，关闭它
}

const closeLoginModal = () => {
  loginModalOpen.value = false
}

const handleShowVerifyCode = (email) => {
  verifyEmail.value = email
  verifyCodeModalOpen.value = true
}

const closeVerifyCodeModal = () => {
  verifyCodeModalOpen.value = false
  verifyEmail.value = ''
}

const handleVerifySuccess = (token) => {
  // 登录成功，状态已通过 useAuth 更新，这里只需要关闭模态框
  // user 和 isAuthenticated 会自动响应式更新，UI 会自动切换
  closeVerifyCodeModal()
  closeLoginModal() // 同时关闭登录模态框（如果还打开的话）
}

const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value
}

const handleLogout = () => {
  logout()
  userMenuOpen.value = false
  closeMobileMenu()
}

const handleGoogleLogin = () => {
  // 实现Google登录逻辑
  console.log('Google login')
  // 可以在这里添加实际的登录API调用
}

const handleEmailLogin = (email) => {
  // 实现邮箱登录逻辑
  console.log('Email login:', email)
  // 可以在这里添加实际的登录API调用
}

// 点击外部关闭用户菜单
onMounted(() => {
  const handleClickOutside = (e) => {
    if (userMenuOpen.value && !e.target.closest('.user-info') && !e.target.closest('.user-menu')) {
      userMenuOpen.value = false
    }
  }
  document.addEventListener('click', handleClickOutside)
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>

<style scoped>
.app-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #667eea;
  text-decoration: none;
}

.logo-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.nav {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4b5563;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.125rem;
  transition: color 0.3s ease;
  padding: 1rem 2.25rem;
  border: none;
  background: none;
  cursor: pointer;
}

.nav-link:hover {
  color: #667eea;
}

.dropdown-toggle {
  position: relative;
}

.dropdown-toggle i {
  font-size: 0.8rem;
  transition: transform 0.3s ease;
}

.dropdown-toggle:hover i {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border: 1px solid #e5e7eb;
  min-width: 800px;
  z-index: 1000;
  animation: dropdownFade 0.2s ease;
}

@keyframes dropdownFade {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.router-link-active {
  color: #667eea;
  font-weight: 600;
}

.header-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.btn-login, .btn-signup {
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-login {
  background: transparent;
  color: #4b5563;
}

.btn-login:hover {
  color: #667eea;
}

.btn-signup {
  background: #667eea;
  color: white;
}

.btn-signup:hover {
  background: #5a6fd8;
  transform: translateY(-2px);
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #4b5563;
  cursor: pointer;
}

.mobile-menu {
  display: none;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
  border-top: 1px solid #e5e7eb;
}

.mobile-nav-link {
  color: #4b5563;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.mobile-nav-link:hover {
  color: #667eea;
}

.mobile-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

/* 用户信息样式 */
.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.user-avatar:hover {
  border-color: #667eea;
  transform: scale(1.05);
}

.user-name {
  font-size: 0.9375rem;
  font-weight: 500;
  color: #1f2937;
}

.user-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid #e5e7eb;
  min-width: 150px;
  z-index: 1000;
  overflow: hidden;
}

.user-menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background 0.2s ease;
  color: #1f2937;
  font-size: 0.9375rem;
}

.user-menu-item:hover {
  background: #f3f4f6;
}

.user-menu-item i {
  color: #6b7280;
  width: 16px;
}

/* 移动端用户信息 */
.mobile-user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  width: 100%;
}

.mobile-user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.mobile-user-name {
  flex: 1;
  font-size: 1rem;
  font-weight: 500;
  color: #1f2937;
}

.mobile-logout-btn {
  padding: 0.5rem 1rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mobile-logout-btn:hover {
  background: #dc2626;
}

@media (max-width: 768px) {
  .nav, .header-actions {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
  }

  .mobile-menu {
    display: flex;
  }
}
</style>