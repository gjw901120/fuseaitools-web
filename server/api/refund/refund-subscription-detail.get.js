/**
 * 取消订阅并退款代理：GET /api/refund/refund-subscription-detail
 * 转发到后端，携带 Authorization
 */
export default defineEventHandler(async (event) => {
  const apiBase = getEffectiveApiBase(event)
  const targetUrl = `${apiBase}/refund/refund-subscription-detail`

  const headers = {
    Accept: 'application/json'
  }
  const authHeader = getHeader(event, 'authorization')
  if (authHeader) headers['Authorization'] = authHeader

  try {
    const response = await $fetch(targetUrl, { method: 'GET', headers })
    return response
  } catch (error) {
    console.error('Refund subscription proxy error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to refund subscription'
    })
  }
})
