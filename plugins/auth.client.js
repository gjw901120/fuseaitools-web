/**
 * 认证插件 - 处理 URL 中的 token（用于 Google 登录回调等）
 * 登录状态下每小时校验 JWT 中的 timeZoneOffset 与客户端是否一致，不一致则调用 refresh-timezone 并刷新 token
 */
export default defineNuxtPlugin((nuxtApp) => {
  if (process.server) return

  const route = useRoute()
  const router = useRouter()
  const { login, token, isAuthenticated, parseJWT, getClientTimezone } = useAuth()
  const { post } = useApi()

  let timezoneCheckTimer = null

  const runTimezoneCheck = async () => {
    const currentToken = token.value
    if (!currentToken) return
    try {
      const payload = parseJWT(currentToken)
      const jwtOffset = payload?.timeZoneOffset
      const { timeZone, timeZoneOffset } = getClientTimezone()
      const needRefresh = jwtOffset === undefined || jwtOffset === null || jwtOffset !== timeZoneOffset
      if (!needRefresh) return
      const data = await post('/api/user/auth/refresh-timezone', {
        timeZoneOffset: timeZoneOffset,
        timeZone: timeZone
      })
      if (data?.token) {
        login(data.token)
        if (process.dev) console.log('[Auth Plugin] 时区已更新，token 已刷新')
      }
    } catch (e) {
      if (process.dev) console.warn('[Auth Plugin] refresh-timezone 失败:', e?.message)
    }
  }

  const startTimezoneCheck = () => {
    if (timezoneCheckTimer) return
    runTimezoneCheck()
    timezoneCheckTimer = setInterval(runTimezoneCheck, 60 * 60 * 1000)
  }

  const stopTimezoneCheck = () => {
    if (timezoneCheckTimer) {
      clearInterval(timezoneCheckTimer)
      timezoneCheckTimer = null
    }
  }

  watch(isAuthenticated, (authenticated) => {
    if (authenticated) startTimezoneCheck()
    else stopTimezoneCheck()
  }, { immediate: true })

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
