/**
 * 用户认证状态管理（单例模式）
 * 
 * Token 过期时间：30 天
 * - Token 由后端生成，过期时间由后端 JWT 的 exp 字段决定
 * - 前端会检查 token 是否过期，过期后自动清除
 * - Token 保存在 localStorage 中，保留 30 天
 */
// 全局状态，确保所有组件共享同一个状态
const globalUser = ref(null)
const globalToken = ref(null)

export const useAuth = () => {
  const user = globalUser
  const token = globalToken

  // 清空认证状态（内部辅助函数）
  const clearAuth = () => {
    user.value = null
    token.value = null
    if (process.client) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
    }
  }

  // 从 localStorage 恢复用户信息
  const initAuth = () => {
    if (process.client) {
      const savedToken = localStorage.getItem('auth_token')
      const savedUser = localStorage.getItem('auth_user')
      
      if (savedToken && savedUser) {
        try {
          token.value = savedToken
          user.value = JSON.parse(savedUser)
          
          // 检查 token 是否过期
          if (isTokenExpired(savedToken)) {
            clearAuth()
          }
        } catch (e) {
          console.error('Failed to restore auth state:', e)
          clearAuth()
        }
      }
    }
  }

  // 检查 token 是否过期
  // Token 过期时间：30 天（由后端 JWT 的 exp 字段决定）
  const isTokenExpired = (jwtToken) => {
    try {
      const payload = JSON.parse(atob(jwtToken.split('.')[1]))
      const exp = payload.exp
      if (!exp) return false
      
      // exp 是秒级时间戳，需要转换为毫秒
      const expirationTime = exp * 1000
      const isExpired = Date.now() >= expirationTime
      return isExpired
    } catch (e) {
      return true
    }
  }

  // 解析 JWT token
  const parseJWT = (jwtToken) => {
    try {
      const base64Url = jwtToken.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
      return JSON.parse(jsonPayload)
    } catch (e) {
      console.error('Failed to parse JWT:', e)
      return null
    }
  }

  // 登录
  const login = (jwtToken) => {
    if (!jwtToken) return false

    // 检查 token 是否过期
    if (isTokenExpired(jwtToken)) {
      console.error('Token is expired')
      return false
    }

    // 解析 token 获取用户信息
    const payload = parseJWT(jwtToken)
    if (!payload) {
      console.error('Failed to parse token')
      return false
    }

    // 保存 token 和用户信息
    token.value = jwtToken
    user.value = {
      name: payload.name || '',
      avatar: payload.avatar || '',
      email: payload.email || '',
      sub: payload.sub || ''
    }

    // 保存到 localStorage
    // Token 保留 30 天（过期时间由后端 JWT 的 exp 字段决定）
    if (process.client) {
      localStorage.setItem('auth_token', jwtToken)
      localStorage.setItem('auth_user', JSON.stringify(user.value))
      
      // 记录登录时间（可选，用于调试）
      if (process.dev) {
        const payload = parseJWT(jwtToken)
        if (payload?.exp) {
          const expirationDate = new Date(payload.exp * 1000)
          console.log(`登录成功，Token 有效期至: ${expirationDate.toLocaleString('zh-CN')}`)
        }
      }
    }

    return true
  }

  // 登出
  const logout = () => {
    clearAuth()
  }

  // 检查是否已登录
  const isAuthenticated = computed(() => {
    if (!user.value || !token.value) return false
    try {
      return !isTokenExpired(token.value)
    } catch (e) {
      return false
    }
  })

  // 初始化
  if (process.client) {
    initAuth()
  }

  return {
    user: readonly(user),
    token: readonly(token),
    isAuthenticated,
    login,
    logout,
    parseJWT
  }
}

