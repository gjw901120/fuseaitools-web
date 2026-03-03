/**
 * Flux Kontext 图像生成/编辑接口（代理）
 * 后端接口：POST /api/image/flux-kontext/generate
 * 请求体：prompt, enableTranslation?, imageUrl, aspectRatio?, outputFormat?, promptUpsampling?, model, safetyTolerance?, watermark?
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const apiBase = getEffectiveApiBase(event)
  const targetUrl = `${apiBase}/image/flux-kontext/generate`

  try {
    const authHeader = getHeader(event, 'authorization')
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
    if (authHeader) {
      headers['Authorization'] = authHeader
    }
    const cookie = getHeader(event, 'cookie')
    if (cookie) headers['Cookie'] = cookie

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    })

    const data = await response.json().catch(() => ({}))
    setResponseStatus(event, response.status)
    return data
  } catch (error) {
    console.error('Flux Kontext generate proxy error:', error)
    throw createError({
      statusCode: 500,
      message: 'Image generation failed: ' + (error.message || 'Unknown error')
    })
  }
})
