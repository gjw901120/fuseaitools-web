/**
 * ElevenLabs 音效 v2 接口（代理）
 * 后端：POST /api/audio/elevenLabs/sound-effect-v2
 * 请求体：model, text, loop?, durationSeconds?, promptInfluence?, outputFormat?
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const backendUrl = process.env.NODE_ENV === 'production'
    ? 'https://www.fuseaitools.com/api/audio/elevenLabs/sound-effect-v2'
    : 'http://127.0.0.1:8080/api/audio/elevenLabs/sound-effect-v2'
  try {
    const authHeader = getHeader(event, 'authorization')
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
    if (authHeader) headers['Authorization'] = authHeader
    const response = await fetch(backendUrl, { method: 'POST', headers, body: JSON.stringify(body) })
    const data = await response.json().catch(() => ({}))
    setResponseStatus(event, response.status)
    return data
  } catch (error) {
    console.error('ElevenLabs sound-effect-v2 proxy error:', error)
    throw createError({ statusCode: 500, message: 'Request failed: ' + (error.message || 'Unknown error') })
  }
})
