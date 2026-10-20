/**
 * Grok Imagine Image 2.0 分块编辑接口（代理）
 * 后端：POST /api/image/grok/image-2-0-segment-edit
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const prompt = typeof body?.prompt === 'string' ? body.prompt.trim() : ''
  const taskId = String(body?.taskId || body?.task_id || '')
  if (!prompt) {
    throw createError({ statusCode: 400, message: 'prompt is required' })
  }
  if (prompt.length > 65000) {
    throw createError({ statusCode: 400, message: 'prompt must be <= 65000 characters' })
  }
  if (!taskId) {
    throw createError({ statusCode: 400, message: 'taskId is required' })
  }
  const payload = {
    model: 'grok-imagine-image-2-0-segment-edit',
    prompt,
    taskId
  }
  // maskIndexs 可选：非负整数数组，提供时至少 1 个
  const rawMask = Array.isArray(body?.maskIndexs)
    ? body.maskIndexs
    : (Array.isArray(body?.mask_indexs) ? body.mask_indexs : null)
  if (rawMask != null) {
    const maskIndexs = rawMask
      .map((v) => Number(v))
      .filter((v) => Number.isInteger(v) && v >= 0)
    if (maskIndexs.length >= 1) payload.maskIndexs = maskIndexs
  }
  const apiBase = getEffectiveApiBase(event)
  const targetUrl = `${apiBase}/image/grok/image-2-0-segment-edit`
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
    console.error('Grok image 2.0 segment-edit proxy error:', error)
    throw createError({ statusCode: 500, message: 'Request failed: ' + (error.message || 'Unknown error') })
  }
})
