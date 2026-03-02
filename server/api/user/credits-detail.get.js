/**
 * 用户积分详情代理：GET /api/user/credits-detail
 * 转发到后端，携带 Authorization
 */
export default defineEventHandler(async (event) => {
  const apiBase = getEffectiveApiBase(event)
  const query = getQuery(event)
  const page = query.page || 1
  const size = query.size || 10
  const targetUrl = `${apiBase}/user/credits-detail?page=${page}&size=${size}`

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
  const authHeader = getHeader(event, 'authorization')
  if (authHeader) headers['Authorization'] = authHeader

  try {
    const response = await $fetch(targetUrl, { method: 'GET', headers })
    return response
  } catch (error) {
    console.error('Credits detail proxy error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to fetch credits detail'
    })
  }
})
