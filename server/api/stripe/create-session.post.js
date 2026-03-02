/**
 * Stripe 创建结账会话（代理）
 * 请求体：{ type: 'recharge' | 'subscription', priceId: number }
 * 返回：{ errorCode, errorMessage, data: { sessionId, sessionUrl } }
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase
  const targetUrl = `${apiBase}/stripe/create-session`

  const body = await readBody(event)
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
  const authHeader = getHeader(event, 'authorization')
  if (authHeader) headers.Authorization = authHeader

  try {
    const response = await $fetch(targetUrl, {
      method: 'POST',
      headers,
      body
    })
    return response
  } catch (error) {
    console.error('Stripe create-session proxy error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.data?.errorMessage || error.message || 'Failed to create checkout session'
    })
  }
})
