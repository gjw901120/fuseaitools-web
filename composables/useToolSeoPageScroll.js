/**
 * SEO 区块内切换工具工作流 / 跨版本链接时，滚动到工具表单顶部（整页顶）。
 */
export function useToolSeoPageScroll() {
  const route = useRoute()
  const router = useRouter()

  function scrollPageToTop() {
    if (typeof window === 'undefined') return
    const scroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      document.querySelectorAll('.home-page--with-below, .main-content').forEach((el) => {
        el.scrollTop = 0
      })
    }
    scroll()
    setTimeout(scroll, 100)
  }

  /** 跳转工具页（无 hash），完成后滚到顶部 */
  function navigateToToolTop(path) {
    const target = String(path || '').split('#')[0].replace(/\/$/, '') || '/'
    const current = route.path.replace(/\/$/, '')

    const afterScroll = () => {
      nextTick(() => {
        setTimeout(scrollPageToTop, 0)
        setTimeout(scrollPageToTop, 120)
      })
    }

    if (current === target) {
      scrollPageToTop()
      return Promise.resolve()
    }

    return router.push(target).then(afterScroll)
  }

  function handleModeClick(path) {
    if (path) {
      navigateToToolTop(path)
      return
    }
    scrollPageToTop()
  }

  function watchRouteScroll(predicate) {
    watch(
      () => route.path,
      (newPath, oldPath) => {
        if (!oldPath || newPath === oldPath) return
        if (predicate && !predicate(newPath)) return
        nextTick(() => setTimeout(scrollPageToTop, 50))
      }
    )
  }

  return {
    scrollPageToTop,
    navigateToToolTop,
    handleModeClick,
    watchRouteScroll
  }
}
