/**
 * 价格接口代理：GET /api/common/models/price
 * 仅透传 Authorization，无其他参数
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase
  const targetUrl = `${apiBase}/common/models/price`

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
  const authHeader = getHeader(event, 'authorization')
  if (authHeader) headers['Authorization'] = authHeader

  try {
    const response = await $fetch(targetUrl, {
      method: 'GET',
      headers
    })
    return response
  } catch (error) {
    console.error('Price proxy error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to fetch price'
    })
  }
})
