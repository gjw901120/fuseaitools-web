export default defineEventHandler(async (event) => {
  const apiBase = getEffectiveApiBase(event)
  const targetUrl = `${apiBase}/user/send-email-code`
  const body = await readBody(event)

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
  const authHeader = getHeader(event, 'authorization')
  if (authHeader) headers['Authorization'] = authHeader
  const cookie = getHeader(event, 'cookie')
  if (cookie) headers['Cookie'] = cookie

  try {
    const response = await $fetch(targetUrl, {
      method: 'POST',
      headers,
      body
    })
    return response
  } catch (error) {
    console.error('Send email code proxy error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to send email code'
    })
  }
})

