/**
 * 刷新时区接口代理：POST /api/user/auth/refresh-timezone
 * Body: { timeZoneOffset: number, timeZone: string }
 * 返回新 JWT（data.token），用于更新前端 token
 */
export default defineEventHandler(async (event) => {
  const apiBase = getEffectiveApiBase(event)
  const targetUrl = `${apiBase}/user/auth/refresh-timezone`
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
    console.error('Refresh timezone proxy error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to refresh timezone'
    })
  }
})
