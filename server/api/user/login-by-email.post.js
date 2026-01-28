/**
 * 用户邮箱登录接口（代理）
 * 
 * Token 过期时间：30 天
 * - 后端生成 JWT token，过期时间设置为 30 天
 * - 前端接收 token 后保存到 localStorage
 * - Token 在 30 天内有效，过期后需要重新登录
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const backendUrl = process.env.NODE_ENV === 'production' 
    ? 'https://www.fuseaitools.com/api/user/login-by-email'
    : 'http://127.0.0.1:8080/api/user/login-by-email'

  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body)
    })

    const data = await response.json()

    // 返回相同的状态码和响应
    // 注意：后端返回的 token 应该包含 30 天的过期时间（exp 字段）
    setResponseStatus(event, response.status)
    return data
  } catch (error) {
    console.error('Proxy error:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to login by email'
    })
  }
})

