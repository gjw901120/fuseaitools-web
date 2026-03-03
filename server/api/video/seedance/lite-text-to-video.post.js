/**
 * Seedance v1 Lite 文生视频接口（代理）
 * 后端：POST /api/video/seedance/lite-text-to-video
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const apiBase = getEffectiveApiBase(event)
  const targetUrl = `${apiBase}/video/seedance/lite-text-to-video`
  try {
    const authHeader = getHeader(event, 'authorization')
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
    if (authHeader) headers['Authorization'] = authHeader
    const cookie = getHeader(event, 'cookie')
    if (cookie) headers['Cookie'] = cookie
    const response = await fetch(targetUrl, { method: 'POST', headers, body: JSON.stringify(body) })
    const data = await response.json().catch(() => ({}))
    setResponseStatus(event, response.status)
    return data
  } catch (error) {
    console.error('Seedance lite-text-to-video proxy error:', error)
    throw createError({ statusCode: 500, message: 'Request failed: ' + (error.message || 'Unknown error') })
  }
})
