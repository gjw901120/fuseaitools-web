/**
 * 历史记录列表接口代理：GET /api/records/list?page=1&size=10
 * 返回 { errorCode, data: Array<{ recordId, modelId, category, model, title, gtmCreated }> }
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase
  const query = getQuery(event)
  const page = query.page != null ? String(query.page) : '1'
  const size = query.size != null ? String(query.size) : '10'

  const targetUrl = `${apiBase}/records/list?page=${encodeURIComponent(page)}&size=${encodeURIComponent(size)}`
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
    console.error('Records list proxy error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to fetch history'
    })
  }
})
