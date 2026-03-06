/**
 * 订阅退款提交代理：POST /api/refund/refund-subscription
 * 转发到后端，携带 Authorization
 * 返回 { errorCode, errorMessage }，errorCode "00000" 表示申请成功
 */
export default defineEventHandler(async (event) => {
  const apiBase = getEffectiveApiBase(event)
  const targetUrl = `${apiBase}/refund/refund-subscription`

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
    console.error('Refund subscription submit proxy error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to submit subscription refund'
    })
  }
})
