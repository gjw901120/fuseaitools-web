/**
 * 用户认证状态管理（单例模式）
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
  const isTokenExpired = (jwtToken) => {
    try {
      const payload = JSON.parse(atob(jwtToken.split('.')[1]))
      const exp = payload.exp
      if (!exp) return false
      
      // exp 是秒级时间戳，需要转换为毫秒
      const expirationTime = exp * 1000
      return Date.now() >= expirationTime
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
    if (process.client) {
      localStorage.setItem('auth_token', jwtToken)
      localStorage.setItem('auth_user', JSON.stringify(user.value))
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

