/**
 * Grok Imagine Image 2.0 图片编辑接口（代理）
 * 后端：POST /api/image/grok/image-2-0-image-edit
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const prompt = body?.prompt == null || body.prompt === '' ? undefined : String(body.prompt)
  if (typeof prompt === 'string' && prompt.length > 8000) {
    throw createError({ statusCode: 400, message: 'prompt must be <= 8000 characters' })
  }
  const aspectRatio = String(body?.aspectRatio || body?.aspect_ratio || '')
  const allowedAspectRatios = ['1:1', '2:3', '3:2', '16:9', '9:16', 'auto']
  if (!allowedAspectRatios.includes(aspectRatio)) {
    throw createError({ statusCode: 400, message: 'aspectRatio is invalid' })
  }
  const imageUrls = Array.isArray(body?.imageUrls)
    ? body.imageUrls
    : (Array.isArray(body?.image_urls) ? body.image_urls : [])
  if (imageUrls.length < 1 || imageUrls.length > 5) {
    throw createError({ statusCode: 400, message: 'imageUrls must contain 1 to 5 urls' })
  }
  const payload = {
    model: 'grok-imagine-image-2-0-image-edit',
    prompt,
    aspectRatio,
    imageUrls
  }
  const apiBase = getEffectiveApiBase(event)
  const targetUrl = `${apiBase}/image/grok/image-2-0-image-edit`
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
    console.error('Grok image 2.0 image-edit proxy error:', error)
    throw createError({ statusCode: 500, message: 'Request failed: ' + (error.message || 'Unknown error') })
  }
})
