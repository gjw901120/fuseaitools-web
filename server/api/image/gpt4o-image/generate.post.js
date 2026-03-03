/**
 * GPT4o 图像生成接口（代理）
 * 后端接口：POST /api/image/gpt4o-image/generate
 * 请求体：{ size, imageUrls?, prompt?, isEnhance?, nVariants }
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const apiBase = getEffectiveApiBase(event)
  const targetUrl = `${apiBase}/image/gpt4o-image/generate`

  try {
    const authHeader = getHeader(event, 'authorization')
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
    if (authHeader) headers['Authorization'] = authHeader
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
    console.error('GPT4o image generate proxy error:', error)
    throw createError({
      statusCode: 500,
      message: 'Image generation failed: ' + (error.message || 'Unknown error')
    })
  }
})
