/**
 * 取消订阅代理：POST /api/refund/cancel-subscription
 * 转发到后端，携带 Authorization
 */
export default defineEventHandler(async (event) => {
  const apiBase = getEffectiveApiBase(event)
  const targetUrl = `${apiBase}/refund/cancel-subscription`

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
  const authHeader = getHeader(event, 'authorization')
  if (authHeader) headers['Authorization'] = authHeader

  const body = await readBody(event).catch(() => ({}))

  try {
    const response = await $fetch(targetUrl, {
      method: 'POST',
      headers,
      body
    })
    return response
  } catch (error) {
    console.error('Cancel subscription proxy error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to cancel subscription'
    })
  }
})
