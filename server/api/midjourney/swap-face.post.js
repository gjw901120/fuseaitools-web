import { assertMidjourneyEnabled } from '../../utils/assertMidjourneyEnabled.js'

/**
 * Midjourney Swap Face 接口（代理）
 * 后端：POST /api/midjourney/swap-face
 * 请求体：imageUrl (必填，源人脸图), targetImageUrl? (可选，被替换人脸的图)
 */
export default defineEventHandler(async (event) => {
  assertMidjourneyEnabled(event)
  const body = await readBody(event)
  const apiBase = getEffectiveApiBase(event)
  const targetUrl = `${apiBase}/midjourney/swap-face`
  try {
    const authHeader = getHeader(event, 'authorization')
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
    if (authHeader) headers['Authorization'] = authHeader
    const cookie = getHeader(event, 'cookie')
    if (cookie) headers['Cookie'] = cookie
    const response = await fetch(targetUrl, { method: 'POST', headers, body: JSON.stringify(body) })
    const data = await response.json().catch(() => ({}))
    setResponseStatus(event, response.status)
    return data
  } catch (error) {
    console.error('Midjourney swap-face proxy error:', error)
    throw createError({ statusCode: 500, message: 'Request failed: ' + (error.message || 'Unknown error') })
  }
})
