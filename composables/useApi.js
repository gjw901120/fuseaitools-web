/**
 * 统一的 API 请求封装
 * 处理统一的响应结构：{ errorCode, errorMessage, data }
 * 自动在登录状态下添加认证头
 */
export const useApi = () => {
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
   * 显示错误提示
   * @param {string} message - 错误消息
   */
  const showError = (message) => {
    if (process.client) {
      // 使用 Toast 显示错误
      const { showError: showToastError } = useToast()
      const errorMsg = message || 'An error occurred'
      console.log('Showing error toast:', errorMsg)
      showToastError(errorMsg, 5000) // 错误消息显示 5 秒
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
      
      const response = await $fetch(url, fetchOptions)

      // 检查响应结构
      if (response && typeof response === 'object' && 'errorCode' in response) {
        // 成功：errorCode === "00000"
        if (response.errorCode === '00000') {
          return response.data
        } else {
          // 失败：errorCode 是其他值，显示错误消息
          // 优先显示 userTip，如果没有则显示 errorMessage
          const errorMessage = response.userTip || response.errorMessage || 'Request failed'
          showError(errorMessage)
          throw new Error(errorMessage)
        }
      }

      // 如果响应结构不符合预期，直接返回
      return response
    } catch (error) {
      console.error('API request error:', error)
      
      // 如果错误已经有消息（从上面的 throw 来的），直接抛出
      if (error.message) {
        throw error
      }

      // 处理网络错误或其他错误
      // 优先显示 userTip，如果没有则显示 errorMessage
      const errorMessage = error.data?.userTip || error.data?.errorMessage || error.message || 'Network error. Please try again.'
      showError(errorMessage)
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

