<template>
  <nav
    class="mobile-tabbar"
    :class="{ 'mobile-tabbar--flux': isFluxThemeRoute }"
    aria-label="Mobile navigation"
  >
    <NuxtLink
      v-for="tab in tabs"
      :key="tab.to"
      :to="tab.to"
      class="mobile-tabbar-item"
      active-class="mobile-tabbar-item--active"
    >
      <i :class="tab.icon"></i>
      <span>{{ tab.label }}</span>
    </NuxtLink>

    <!-- 「菜单」标签复用抽屉状态，与 AppHeader 汉堡按钮同一开合 -->
    <button
      type="button"
      class="mobile-tabbar-item mobile-tabbar-item--menu"
      :class="{ 'mobile-tabbar-item--active': drawerOpen }"
      :aria-expanded="drawerOpen"
      @click="toggleDrawer"
    >
      <i class="fas fa-bars"></i>
      <span>Menu</span>
    </button>
  </nav>
</template>

<script setup>
// 移动端底部导航栏（≤768px 显示）。数据只取顶层营销页，工具入口在抽屉里。
const { isFluxThemeRoute } = useFluxThemeRoute()
const { drawerOpen, toggleDrawer } = useMobileNav()

const tabs = [
  { to: '/home', label: 'Home', icon: 'fas fa-home' },
  { to: '/pricing', label: 'Pricing', icon: 'fas fa-tag' },
  { to: '/news', label: 'News', icon: 'fas fa-newspaper' },
]
</script>

<style scoped>
.mobile-tabbar {
  display: none;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1100;
  /* 预留系统手势条安全区，避免被 iPhone 底部横条遮挡 */
  padding-bottom: var(--safe-area-bottom);
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(10px);
  border-top: 1px solid #e5e7eb;
}

.mobile-tabbar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  min-height: var(--tap-target);
  padding: 8px 0;
  border: none;
  background: none;
  color: #6b7280;
  font-size: 0.7rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;
}

.mobile-tabbar-item i {
  font-size: 1.15rem;
}

.mobile-tabbar-item--active {
  color: #667eea;
}

/* 深色（FLUX）主题 */
.mobile-tabbar--flux {
  background: rgba(15, 23, 42, 0.96);
  border-top-color: var(--flux-border, #1e293b);
}

.mobile-tabbar--flux .mobile-tabbar-item {
  color: var(--flux-muted, #94a3b8);
}

.mobile-tabbar--flux .mobile-tabbar-item--active {
  color: var(--flux-primary, #818cf8);
}

@media (max-width: 768px) {
  .mobile-tabbar {
    display: flex;
  }
}
</style>
