/**
 * Sora Pro 分镜接口（代理）
 * 后端：POST /api/video/sora-pro/storyboard
 * 请求体：model, callBackUrl?, nFrames, imageUrls?, aspectRatio?, shots (List<{ duration, scene }>)
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const backendUrl = process.env.NODE_ENV === 'production'
    ? 'https://www.fuseaitools.com/api/video/sora-pro/storyboard'
    : 'http://127.0.0.1:8080/api/video/sora-pro/storyboard'
  try {
    const authHeader = getHeader(event, 'authorization')
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
    if (authHeader) headers['Authorization'] = authHeader
    const response = await fetch(backendUrl, { method: 'POST', headers, body: JSON.stringify(body) })
    const data = await response.json().catch(() => ({}))
    setResponseStatus(event, response.status)
    return data
  } catch (error) {
    console.error('Sora Pro storyboard proxy error:', error)
    throw createError({ statusCode: 500, message: 'Request failed: ' + (error.message || 'Unknown error') })
  }
})
