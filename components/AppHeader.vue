<template>
  <header class="app-header" :class="{ 'app-header--flux': isFluxThemeRoute }">
    <!-- Top banner -->
    <!-- 登录后隐藏横幅（ClientOnly 避免水合不一致） -->
    <ClientOnly>
      <div v-if="!isAuthenticated" class="top-banner">
        <div class="top-banner-content">
          Sign up and get 10 free credits — try 100+ AI models in your browser.
        </div>
      </div>
    </ClientOnly>

    <div class="simply-container">
      <div class="header-content">
        <div class="logo">
          <NuxtLink to="/" class="logo-link">
            <img src="/logo-wide.png" alt="FuseAI" class="logo-icon" />
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
                <NuxtLink to="/credits" class="user-menu-item" @click="userMenuOpen = false">
                  <i class="fas fa-coins"></i>
                  <span>Credits</span>
                </NuxtLink>
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

        <button class="mobile-menu-btn tap-target" type="button" aria-label="Open menu" :aria-expanded="drawerOpen" @click="toggleDrawer">
          <i :class="drawerOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
        </button>
      </div>
    </div>

    <!-- 移动端导航抽屉（≤1024px 显示）：Teleport 到 body，避免受 header sticky 的层叠上下文限制 -->
    <Teleport to="body">
      <div v-if="drawerOpen" class="mobile-drawer" :class="{ 'mobile-drawer--flux': isFluxThemeRoute }">
        <div class="mobile-drawer-backdrop" @click="closeDrawer"></div>
        <aside class="mobile-drawer-panel" role="dialog" aria-modal="true" aria-label="Site menu">
          <div class="mobile-drawer-head">
            <img src="/logo-wide.png" alt="FuseAI" class="mobile-drawer-logo" />
            <button type="button" class="mobile-drawer-close tap-target" aria-label="Close menu" @click="closeDrawer">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <nav class="mobile-drawer-nav">
            <NuxtLink to="/home" class="mobile-drawer-link" @click="closeDrawer">Home</NuxtLink>
            <NuxtLink to="/pricing" class="mobile-drawer-link" @click="closeDrawer">Pricing</NuxtLink>
            <NuxtLink to="/news" class="mobile-drawer-link" @click="closeDrawer">News</NuxtLink>
            <NuxtLink to="/about" class="mobile-drawer-link" @click="closeDrawer">About</NuxtLink>
          </nav>

          <!-- 工具分区快捷入口：数据源与 Footer 一致（footerNavColumns） -->
          <div class="mobile-drawer-groups">
            <div v-for="col in footerNavColumns" :key="col.title" class="mobile-drawer-group">
              <p class="mobile-drawer-group-title">{{ col.title }}</p>
              <div class="mobile-drawer-group-links">
                <NuxtLink
                  v-for="link in col.links"
                  :key="link.to"
                  :to="link.to"
                  class="mobile-drawer-tool-link"
                  @click="closeDrawer"
                >
                  <span>{{ link.label }}</span>
                  <span v-if="link.badge" class="mobile-drawer-badge">{{ link.badge }}</span>
                </NuxtLink>
              </div>
            </div>
          </div>

          <div class="mobile-drawer-foot">
            <ClientOnly>
              <button v-if="!isAuthenticated" class="btn-signup mobile-drawer-login" @click="openLoginModal">Log in</button>
              <div v-else class="mobile-drawer-user">
                <img :src="userAvatar" :alt="userName || 'User'" class="mobile-drawer-avatar" />
                <span v-if="userName" class="mobile-drawer-username">{{ userName }}</span>
                <NuxtLink to="/credits" class="mobile-drawer-link" @click="closeDrawer">Credits</NuxtLink>
                <button type="button" class="mobile-logout-btn" @click="handleLogout">Log out</button>
              </div>
              <template #fallback>
                <button class="btn-signup mobile-drawer-login" disabled>Loading...</button>
              </template>
            </ClientOnly>
          </div>
        </aside>
      </div>
    </Teleport>

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
import { footerNavColumns } from '~/constants/footerNav'

const { isFluxThemeRoute } = useFluxThemeRoute()
const { user, isAuthenticated, logout } = useAuth()
const { drawerOpen, closeDrawer, toggleDrawer } = useMobileNav()

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

const loginModalOpen = ref(false)
const verifyCodeModalOpen = ref(false)
const verifyEmail = ref('')
const userMenuOpen = ref(false)

const openLoginModal = () => {
  loginModalOpen.value = true
  closeDrawer() // 抽屉打开时一并收起
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
  closeDrawer()
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

// 点击外部关闭用户菜单 + 路由切换 / ESC 关闭抽屉
const route = useRoute()
onMounted(() => {
  const handleClickOutside = (e) => {
    if (userMenuOpen.value && !e.target.closest('.user-info') && !e.target.closest('.user-menu')) {
      userMenuOpen.value = false
    }
  }
  document.addEventListener('click', handleClickOutside)

  const handleEscape = (e) => {
    if (e.key === 'Escape' && drawerOpen.value) closeDrawer()
  }
  document.addEventListener('keydown', handleEscape)

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    document.removeEventListener('keydown', handleEscape)
  })
})

// 跨页面跳转后确保抽屉关闭（例如从抽屉点了非当前监听项的链接）
watch(() => route.fullPath, () => closeDrawer())
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

.top-banner {
  width: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  color: #fff;
}

.top-banner-content {
  /* 横幅贴边：与上端/两侧无间隔 */
  padding: 1.125rem 0; /* 再 +50% */
  font-size: 0.9375rem;
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.2px;
}

.top-banner-content :deep(a) {
  color: #fff;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.top-banner-content :deep(a:hover) {
  opacity: 0.9;
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
  width: auto;
  height: 44px;
  max-width: 200px;
  object-fit: contain;
  display: block;
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
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #4b5563;
  cursor: pointer;
}

/* ── 移动端导航抽屉 ── */
.mobile-drawer {
  position: fixed;
  inset: 0;
  z-index: 1200;
}

.mobile-drawer-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(2px);
  animation: mobileDrawerFade 0.2s ease;
}

.mobile-drawer-panel {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  width: min(88vw, 360px);
  height: 100%;
  padding: 1rem 1.25rem calc(1rem + var(--safe-area-bottom));
  background: #fff;
  box-shadow: -12px 0 40px rgba(0, 0, 0, 0.18);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  animation: mobileDrawerSlide 0.26s ease;
}

@keyframes mobileDrawerFade {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes mobileDrawerSlide {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

.mobile-drawer-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--safe-area-top);
  margin-bottom: 0.5rem;
}

.mobile-drawer-logo {
  height: 36px;
  width: auto;
  max-width: 160px;
  object-fit: contain;
}

.mobile-drawer-close {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  font-size: 1.4rem;
  color: #4b5563;
  cursor: pointer;
}

.mobile-drawer-nav {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
}

.mobile-drawer-link {
  display: flex;
  align-items: center;
  min-height: var(--tap-target);
  color: #1f2937;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.05rem;
}

.mobile-drawer-groups {
  flex: 1;
}

.mobile-drawer-group {
  margin-bottom: 1rem;
}

.mobile-drawer-group-title {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #6b7280;
  margin: 0 0 0.4rem;
}

.mobile-drawer-group-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.mobile-drawer-tool-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 0.7rem;
  min-height: 36px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f8fafc;
  color: #374151;
  font-size: 0.85rem;
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.mobile-drawer-tool-link:active {
  background: #eef2ff;
  border-color: #c7d2fe;
}

.mobile-drawer-badge {
  font-size: 0.62rem;
  font-weight: 700;
  color: #fff;
  background: #667eea;
  border-radius: 999px;
  padding: 1px 6px;
  line-height: 1.4;
}

.mobile-drawer-foot {
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
  margin-top: 0.5rem;
}

.mobile-drawer-login {
  width: 100%;
  min-height: var(--tap-target);
}

.mobile-drawer-user {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.mobile-drawer-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.mobile-drawer-username {
  flex: 1;
  min-width: 0;
  font-size: 1rem;
  font-weight: 500;
  color: #1f2937;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 用户信息样式 */
.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  transform: scale(1.3);
  transform-origin: right center;
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
  text-decoration: none;
}

.user-menu-item:hover {
  background: #f3f4f6;
}

.user-menu-item i {
  color: #6b7280;
  width: 16px;
}

/* 移动端登出按钮（抽屉底部复用） */
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

.app-header--flux {
  background: transparent !important;
  border-bottom: none !important;
}

.app-header--flux .nav-link {
  color: var(--flux-muted) !important;
}

.app-header--flux .nav-link:hover,
.app-header--flux .router-link-active {
  color: var(--flux-primary) !important;
}

.app-header--flux .btn-signup {
  background: var(--flux-gradient) !important;
  color: var(--flux-foreground) !important;
}

.app-header--flux .btn-signup:hover {
  background: var(--flux-primary-hover) !important;
  box-shadow: 0 4px 20px var(--flux-primary-glow);
}

.app-header--flux .user-name,
.app-header--flux .mobile-drawer-username {
  color: var(--flux-foreground) !important;
}

.app-header--flux .user-menu {
  background: var(--flux-card) !important;
  border-color: var(--flux-border) !important;
}

.app-header--flux .user-menu-item {
  color: var(--flux-foreground) !important;
}

.app-header--flux .user-menu-item:hover {
  background: var(--flux-card-hover) !important;
}

.app-header--flux .mobile-menu-btn {
  color: var(--flux-muted) !important;
}

/* 抽屉 Teleport 到 body，不再是 .app-header 的子节点，
   故深色主题通过自身的 .mobile-drawer--flux 修饰类驱动 */
.mobile-drawer--flux .mobile-drawer-panel {
  background: var(--flux-bg) !important;
}

.mobile-drawer--flux .mobile-drawer-close,
.mobile-drawer--flux .mobile-drawer-link {
  color: var(--flux-foreground) !important;
}

.mobile-drawer--flux .mobile-drawer-nav,
.mobile-drawer--flux .mobile-drawer-foot {
  border-color: var(--flux-border) !important;
}

.mobile-drawer--flux .mobile-drawer-group-title {
  color: var(--flux-muted) !important;
}

.mobile-drawer--flux .mobile-drawer-tool-link {
  background: var(--flux-card) !important;
  border-color: var(--flux-border) !important;
  color: var(--flux-foreground) !important;
}

@media (max-width: 1024px) {
  .top-banner-content {
    font-size: 0.875rem;
    padding: 1.0125rem 0; /* 再 +50% */
  }

  .nav, .header-actions {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }
}
</style>