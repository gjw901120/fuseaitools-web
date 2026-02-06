/**
 * 记录详情接口代理：GET /api/records/detail?record-id=xxx
 * 用于轮询任务结果，返回含 outputUrls 等字段的 data
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase
  const query = getQuery(event)
  const recordId = query['record-id'] || query.recordId
  if (!recordId || typeof recordId !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing record-id'
    })
  }

  const targetUrl = `${apiBase}/records/detail?record-id=${encodeURIComponent(recordId)}`
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
    console.error('Records detail proxy error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to fetch record detail'
    })
  }
})
