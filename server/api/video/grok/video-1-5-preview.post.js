/**
 * Grok Imagine Video 1.5 Preview 视频生成接口（代理）
 * 后端：POST .../video/grok/video-1-5-preview（实体 model=grok-imagine-video-1-5-preview）
 * 统一入口：不带 imageUrls 为文生视频，带 imageUrls 为图生视频（最多 7 张，单图时 aspectRatio 无效）。
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const apiBase = getEffectiveApiBase(event)
  const targetUrl = `${apiBase}/video/grok/video-1-5-preview`
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
    console.error('Grok video 1.5 preview proxy error:', error)
    throw createError({ statusCode: 500, message: 'Request failed: ' + (error.message || 'Unknown error') })
  }
})
