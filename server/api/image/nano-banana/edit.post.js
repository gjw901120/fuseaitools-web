/**
 * Nano Banana 编辑/图生图接口（代理）
 * 后端：POST /api/image/nano-banana/edit
 * 请求体：model=nano-banana-edit, prompt, imageUrls(1-10), outputFormat?, imageSize?
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const backendUrl = process.env.NODE_ENV === 'production'
    ? 'https://www.fuseaitools.com/api/image/nano-banana/edit'
    : 'http://127.0.0.1:8080/api/image/nano-banana/edit'
  try {
    const authHeader = getHeader(event, 'authorization')
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
    if (authHeader) headers['Authorization'] = authHeader
    const response = await fetch(backendUrl, { method: 'POST', headers, body: JSON.stringify(body) })
    const data = await response.json().catch(() => ({}))
    setResponseStatus(event, response.status)
    return data
  } catch (error) {
    console.error('Nano Banana edit proxy error:', error)
    throw createError({ statusCode: 500, message: 'Request failed: ' + (error.message || 'Unknown error') })
  }
})
