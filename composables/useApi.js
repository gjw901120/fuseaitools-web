/** 生产环境 API 基地址（与 server/utils/getApiBase.js 一致） */
const PRODUCTION_API_BASE = 'https://api.fuseaitools.com/api'

/**
 * 客户端根据当前域名得到有效的 apiBase，避免构建时未设置 NODE_ENV 导致用错 127.0.0.1
 */
function getEffectiveApiBaseForClient(configApiBase) {
  if (typeof window === 'undefined') return configApiBase || ''
  const host = (window.location?.hostname || '').toLowerCase()
  if (host === 'www.fuseaitools.com' || host === 'fuseaitools.com') {
    if (!configApiBase || configApiBase.includes('127.0.0.1')) return PRODUCTION_API_BASE
  }
  return configApiBase || ''
}

/**
 * 统一的 API 请求封装
 * - 处理统一的响应结构：{ errorCode, errorMessage, data }
 * - 自动在登录状态下添加认证头
 * - 根据运行环境与 runtimeConfig.public.apiBase 选择实际后端基地址：
 *   - 生产：强制走 https://api.fuseaitools.com/**（通过配置或客户端域名修正）
 *   - 本地开发：走 http://127.0.0.1:8080/**，不再通过 http://localhost:3000/api 代理
 */
export const useApi = () => {
  const runtimeConfig = useRuntimeConfig()
  const apiBase = getEffectiveApiBaseForClient(runtimeConfig.public?.apiBase || '')
  /**
   * 获取认证 token
   * @returns {string|null} 返回 token 或 null
   */
  const getAuthToken = () => {
    if (!process.client) return null
    
    try {
      // 优先从 useAuth 获取（如果已初始化）
      const { token } = useAuth()
      if (token.value) {
        return token.value
      }
      
      // 如果 useAuth 未初始化，直接从 localStorage 获取
      return localStorage.getItem('auth_token')
    } catch (error) {
      // 如果 useAuth 不可用，直接从 localStorage 获取
      return localStorage.getItem('auth_token')
    }
  }

  /**
   * 统一的 API 请求方法
   * @param {string} url - 请求 URL
   * @param {object} options - fetch 选项
   * @returns {Promise} 返回 data 或抛出错误
   */
  const apiRequest = async (url, options = {}) => {
    try {
      // 获取认证 token
      const token = getAuthToken()
      
      // 计算实际请求 URL：
      // - 绝对地址（http/https 开头）直接使用
      // - 相对地址（通常是以 /api/ 开头）在有 apiBase 时改为直连后端：
      //   - 例如：/api/records/list -> https://api.fuseaitools.com/api/records/list
      let finalUrl = url
      if (typeof url === 'string' && !/^https?:\/\//i.test(url) && apiBase) {
        // 统一去掉 apiBase 末尾的 /
        const base = apiBase.replace(/\/$/, '')
        if (url.startsWith('/api/')) {
          // 如果 apiBase 已包含 /api，则只拼接后半部分
          if (base.endsWith('/api')) {
            finalUrl = base + url.replace(/^\/api/, '')
          } else {
            finalUrl = base + url
          }
        } else {
          finalUrl = base + url
        }
      }

      // 在客户端使用 fetch，服务端使用 $fetch
      const fetchOptions = {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...options.headers
        }
      }
      
      // 如果已登录，添加 Authorization 头
      if (token) {
        fetchOptions.headers['Authorization'] = `Bearer ${token}`
      }
      
      // 如果是客户端，添加 credentials 和 mode 配置
      if (process.client) {
        fetchOptions.credentials = 'include'
        fetchOptions.mode = 'cors'
      }
      
      const response = await $fetch(finalUrl, fetchOptions)

      // 检查响应结构
      if (response && typeof response === 'object' && 'errorCode' in response) {
        // 成功：errorCode === "00000"
        if (response.errorCode === '00000') {
          return response.data
        } else {
          // 失败：客户端使用公共弹窗显示 errorMessage，再抛出
          const errorMessage = response.errorMessage || response.userTip || 'Request failed'
          if (process.client) {
            try {
              const { showError } = useToast()
              showError(errorMessage)
            } catch (_) {}
          }
          const err = new Error(errorMessage)
          err.__fromApi = true
          throw err
        }
      }

      // 如果响应结构不符合预期，直接返回
      return response
    } catch (error) {
      console.error('API request error:', error)
      // 业务错误（上面 throw 的）直接抛出
      if (error.__fromApi) throw error
      // 网络/HTTP 错误：客户端用公共弹窗显示，再抛出
      const errorMessage = error.data?.errorMessage || error.data?.userTip || error.message || 'Network error. Please try again.'
      if (process.client) {
        try {
          const { showError } = useToast()
          showError(errorMessage)
        } catch (_) {}
      }
      throw new Error(errorMessage)
    }
  }

  /**
   * GET 请求
   */
  const get = (url, options = {}) => {
    return apiRequest(url, {
      method: 'GET',
      ...options
    })
  }

  /**
   * POST 请求
   */
  const post = (url, body, options = {}) => {
    return apiRequest(url, {
      method: 'POST',
      body,
      ...options
    })
  }

  /**
   * PUT 请求
   */
  const put = (url, body, options = {}) => {
    return apiRequest(url, {
      method: 'PUT',
      body,
      ...options
    })
  }

  /**
   * DELETE 请求
   */
  const del = (url, options = {}) => {
    return apiRequest(url, {
      method: 'DELETE',
      ...options
    })
  }

  return {
    request: apiRequest,
    get,
    post,
    put,
    delete: del
  }
}

