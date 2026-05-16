/**
 * 首页、/home 工具区、pricing / news / about 使用 FLUX 深色主题。
 */
export function useFluxThemeRoute() {
  const route = useRoute()

  const isFluxThemeRoute = computed(() => {
    const path = (route.path || '').replace(/\/$/, '') || '/'
    if (path === '/') return true
    if (path.startsWith('/home')) return true
    if (path === '/pricing' || path === '/about') return true
    if (path === '/news' || path.startsWith('/news/')) return true
    return false
  })

  return { isFluxThemeRoute }
}
