/**
 * 用户邮箱登录接口（代理）
 *
 * Token 过期时间：30 天
 * - 后端生成 JWT token，过期时间设置为 30 天
 * - 前端接收 token 后保存到 localStorage
 * - Token 在 30 天内有效，过期后需要重新登录
 */
export default defineEventHandler(async (event) => {
  const apiBase = getEffectiveApiBase(event)
  const targetUrl = `${apiBase}/user/login-by-email`
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
    console.error('Login by email proxy error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to login by email'
    })
  }
})

