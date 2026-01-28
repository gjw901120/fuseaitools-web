/**
 * 认证插件 - 处理 URL 中的 token（用于 Google 登录回调等）
 * 在所有页面加载时检查 URL 中的 token 参数
 */
export default defineNuxtPlugin((nuxtApp) => {
  // 只在客户端执行
  if (process.server) return

  const route = useRoute()
  const router = useRouter()
  const { login } = useAuth()

  // 检查 URL 中是否有 token 参数
  const checkTokenInUrl = () => {
    const token = route.query.token
    
    if (token && typeof token === 'string') {
      console.log('[Auth Plugin] 检测到 URL 中的 token，正在处理登录...', token.substring(0, 20) + '...')
      
      // 解析并保存 token
      const success = login(token)
      
      if (success) {
        console.log('[Auth Plugin] 登录成功！')
        // 登录成功，移除 URL 中的 token 参数
        // 使用 nextTick 确保状态更新后再跳转
        nextTick(() => {
          router.replace({ 
            path: route.path, 
            query: Object.fromEntries(
              Object.entries(route.query).filter(([key]) => key !== 'token')
            )
          })
        })
      } else {
        console.error('[Auth Plugin] 登录失败：token 无效或已过期')
        // 登录失败，也移除 token 参数
        nextTick(() => {
          router.replace({ 
            path: route.path, 
            query: Object.fromEntries(
              Object.entries(route.query).filter(([key]) => key !== 'token')
            )
          })
        })
      }
    }
  }

  // 页面加载时立即检查
  checkTokenInUrl()

  // 监听路由变化，处理 token（适用于从其他页面跳转回来）
  router.afterEach((to) => {
    if (to.query.token && typeof to.query.token === 'string') {
      nextTick(() => {
        checkTokenInUrl()
      })
    }
  })
})
