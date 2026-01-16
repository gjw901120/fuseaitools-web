/**
 * Proxy API endpoint for models tree
 * This avoids CORS issues by proxying requests through Nuxt server
 * Automatically forwards Authorization header if present
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase
  const targetUrl = `${apiBase}/common/models/tree`
  
  // 获取请求头
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
  
  // 如果客户端发送了 Authorization 头，转发它
  const authHeader = getHeader(event, 'authorization')
  if (authHeader) {
    headers['Authorization'] = authHeader
  }
  
  try {
    const response = await $fetch(targetUrl, {
      method: 'GET',
      headers: headers
    })
    
    return response
  } catch (error) {
    console.error('Proxy error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to fetch models'
    })
  }
})

