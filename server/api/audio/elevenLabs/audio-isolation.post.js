/**
 * ElevenLabs 音频分离接口（代理）
 * 后端：POST /api/audio/elevenLabs/audio-isolation
 * 请求体：model, audioUrl
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const backendUrl = process.env.NODE_ENV === 'production'
    ? 'https://www.fuseaitools.com/api/audio/elevenLabs/audio-isolation'
    : 'http://127.0.0.1:8080/api/audio/elevenLabs/audio-isolation'
  try {
    const authHeader = getHeader(event, 'authorization')
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
    if (authHeader) headers['Authorization'] = authHeader
    const response = await fetch(backendUrl, { method: 'POST', headers, body: JSON.stringify(body) })
    const data = await response.json().catch(() => ({}))
    setResponseStatus(event, response.status)
    return data
  } catch (error) {
    console.error('ElevenLabs audio-isolation proxy error:', error)
    throw createError({ statusCode: 500, message: 'Request failed: ' + (error.message || 'Unknown error') })
  }
})
