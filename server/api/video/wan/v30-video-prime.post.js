/**
 * Wan 3.0 高速版视频生成接口（代理）
 * 后端：POST .../video/wan/v30-video-prime（实体 model=wan-3-0-video-prime，统一入口）
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const apiBase = getEffectiveApiBase(event)
  const targetUrl = `${apiBase}/video/wan/v30-video-prime`
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
    console.error('Wan v30-video-prime proxy error:', error)
    throw createError({ statusCode: 500, message: 'Request failed: ' + (error.message || 'Unknown error') })
  }
})
