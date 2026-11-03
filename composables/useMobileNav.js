/**
 * 移动端导航抽屉的共享状态（AppHeader 汉堡按钮 与 AppMobileTabBar「菜单」按钮共用同一个开合状态）。
 *
 * 用 useState 而非模块级 ref：模块级 ref 在 Nuxt SSR 下会被多个请求共享，
 * 导致一个用户打开抽屉影响另一个用户的首屏；useState 按请求隔离，SSR 安全。
 */
export function useMobileNav() {
  const drawerOpen = useState('mobile-nav-drawer', () => false)

  const openDrawer = () => {
    drawerOpen.value = true
  }

  const closeDrawer = () => {
    drawerOpen.value = false
  }

  const toggleDrawer = () => {
    drawerOpen.value = !drawerOpen.value
  }

  // 抽屉打开时锁定 body 滚动（含 iOS）。仅在客户端执行。
  watch(drawerOpen, (open) => {
    if (!import.meta.client || typeof document === 'undefined') return
    document.body.style.overflow = open ? 'hidden' : ''
  })

  return { drawerOpen, openDrawer, closeDrawer, toggleDrawer }
}
