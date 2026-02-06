/**
 * Midjourney Imagine 接口（代理）
 * 后端：POST /api/midjourney/imagine
 * 请求体：prompt (必填), imageUrls? (可选 List<String>)
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const backendUrl = process.env.NODE_ENV === 'production'
    ? 'https://www.fuseaitools.com/api/midjourney/imagine'
    : 'http://127.0.0.1:8080/api/midjourney/imagine'
  try {
    const authHeader = getHeader(event, 'authorization')
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
    if (authHeader) headers['Authorization'] = authHeader
    const response = await fetch(backendUrl, { method: 'POST', headers, body: JSON.stringify(body) })
    const data = await response.json().catch(() => ({}))
    setResponseStatus(event, response.status)
    return data
  } catch (error) {
    console.error('Midjourney imagine proxy error:', error)
    throw createError({ statusCode: 500, message: 'Request failed: ' + (error.message || 'Unknown error') })
  }
})
