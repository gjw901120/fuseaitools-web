/**
 * Nano Banana Pro 生成接口（代理）
 * 后端：POST /api/image/nano-banana-pro/generate
 * 请求体：model=nano-banana-pro, prompt, imageInput(1-10), resolution?, outputFormat?, imageSize?
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const backendUrl = process.env.NODE_ENV === 'production'
    ? 'https://www.fuseaitools.com/api/image/nano-banana-pro/generate'
    : 'http://127.0.0.1:8080/api/image/nano-banana-pro/generate'
  try {
    const authHeader = getHeader(event, 'authorization')
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
    if (authHeader) headers['Authorization'] = authHeader
    const response = await fetch(backendUrl, { method: 'POST', headers, body: JSON.stringify(body) })
    const data = await response.json().catch(() => ({}))
    setResponseStatus(event, response.status)
    return data
  } catch (error) {
    console.error('Nano Banana Pro generate proxy error:', error)
    throw createError({ statusCode: 500, message: 'Request failed: ' + (error.message || 'Unknown error') })
  }
})
