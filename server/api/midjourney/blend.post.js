/**
 * Midjourney Blend 接口（代理）
 * 后端：POST /api/midjourney/blend
 * 请求体：imageUrls (2-5), dimensions? (PORTRAIT|SQUARE|LANDSCAPE)
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const backendUrl = process.env.NODE_ENV === 'production'
    ? 'https://www.fuseaitools.com/api/midjourney/blend'
    : 'http://127.0.0.1:8080/api/midjourney/blend'
  try {
    const authHeader = getHeader(event, 'authorization')
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
    if (authHeader) headers['Authorization'] = authHeader
    const response = await fetch(backendUrl, { method: 'POST', headers, body: JSON.stringify(body) })
    const data = await response.json().catch(() => ({}))
    setResponseStatus(event, response.status)
    return data
  } catch (error) {
    console.error('Midjourney blend proxy error:', error)
    throw createError({ statusCode: 500, message: 'Request failed: ' + (error.message || 'Unknown error') })
  }
})
