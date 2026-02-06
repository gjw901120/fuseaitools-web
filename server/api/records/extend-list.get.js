/**
 * 可扩展任务列表接口代理：GET /api/records/extend-list?model=xxx
 * 返回 { errorCode, data: Array<{ taskId, recordId, title, outputUrls }> }
 * 用于 Midjourney Upscale/Vary 的 Task ID 下拉与图片选择
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase
  const query = getQuery(event)
  const model = query.model != null ? String(query.model) : ''
  if (!model) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing model'
    })
  }

  const targetUrl = `${apiBase}/records/extend-list?model=${encodeURIComponent(model)}`
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
  const authHeader = getHeader(event, 'authorization')
  if (authHeader) headers['Authorization'] = authHeader

  try {
    const response = await $fetch(targetUrl, { method: 'GET', headers })
    return response
  } catch (error) {
    console.error('Records extend-list proxy error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to fetch extend list'
    })
  }
})
