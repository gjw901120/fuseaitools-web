/**
 * ElevenLabs 文本转语音接口（代理）
 * 后端：POST /api/audio/elevenLabs/text-to-speech
 * 请求体：model, text, voice?, stability?, similarityBoost?, style?, speed?, timestamps?, previousText?, nextText?, languageCode?
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const backendUrl = process.env.NODE_ENV === 'production'
    ? 'https://www.fuseaitools.com/api/audio/elevenLabs/text-to-speech'
    : 'http://127.0.0.1:8080/api/audio/elevenLabs/text-to-speech'
  try {
    const authHeader = getHeader(event, 'authorization')
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
    if (authHeader) headers['Authorization'] = authHeader
    const response = await fetch(backendUrl, { method: 'POST', headers, body: JSON.stringify(body) })
    const data = await response.json().catch(() => ({}))
    setResponseStatus(event, response.status)
    return data
  } catch (error) {
    console.error('ElevenLabs text-to-speech proxy error:', error)
    throw createError({ statusCode: 500, message: 'Request failed: ' + (error.message || 'Unknown error') })
  }
})
