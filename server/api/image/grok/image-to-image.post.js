/**
 * Grok 图生图接口（代理）
 * 后端：POST /api/image/grok/image-to-image
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const prompt = body?.prompt == null ? undefined : String(body.prompt)
  if (typeof prompt === 'string' && prompt.length > 5000) {
    throw createError({ statusCode: 400, message: 'prompt must be <= 5000 characters' })
  }
  const imageUrls = Array.isArray(body?.imageUrls)
    ? body.imageUrls
    : (Array.isArray(body?.image_urls) ? body.image_urls : [])
  if (imageUrls.length < 1 || imageUrls.length > 1) {
    throw createError({ statusCode: 400, message: 'image_urls must contain exactly 1 url' })
  }
  const payload = {
    model: 'grok-imagine-image-to-image',
    prompt: prompt || undefined,
    image_urls: imageUrls
  }
  const apiBase = getEffectiveApiBase(event)
  const targetUrl = `${apiBase}/image/grok/image-to-image`
  try {
    const authHeader = getHeader(event, 'authorization')
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
    if (authHeader) headers['Authorization'] = authHeader
    const cookie = getHeader(event, 'cookie')
    if (cookie) headers['Cookie'] = cookie
    const response = await fetch(targetUrl, { method: 'POST', headers, body: JSON.stringify(payload) })
    const data = await response.json().catch(() => ({}))
    setResponseStatus(event, response.status)
    return data
  } catch (error) {
    console.error('Grok image-to-image proxy error:', error)
    throw createError({ statusCode: 500, message: 'Request failed: ' + (error.message || 'Unknown error') })
  }
})
