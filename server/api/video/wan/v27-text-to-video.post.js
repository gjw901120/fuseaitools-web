/**
 * Wan 2.7 文生视频接口（代理）
 * 后端：POST .../video/wan/v27-text-to-video（实体 model=wan-2-7-text-to-video）
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const apiBase = getEffectiveApiBase(event)
  const targetUrl = `${apiBase}/video/wan/v27-text-to-video`
  try {
    const authHeader = getHeader(event, 'authorization')
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
    if (authHeader) headers.Authorization = authHeader
    const cookie = getHeader(event, 'cookie')
    if (cookie) headers.Cookie = cookie
    const response = await fetch(targetUrl, { method: 'POST', headers, body: JSON.stringify(body) })
    const data = await response.json().catch(() => ({}))
    setResponseStatus(event, response.status)
    return data
  } catch (error) {
    console.error('Wan v27-text-to-video proxy error:', error)
    throw createError({ statusCode: 500, message: 'Request failed: ' + (error.message || 'Unknown error') })
  }
})
