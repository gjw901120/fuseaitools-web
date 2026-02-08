/**
 * 代理到后端新闻详情 API GET /news/detail?path=xxx
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiBase = config.public?.apiBase || 'http://127.0.0.1:8080/api'
  const query = getQuery(event)
  const path = query.path

  if (!path) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing path parameter'
    })
  }

  try {
    const res = await $fetch(`${apiBase}/news/detail`, {
      query: { path }
    })
    return res
  } catch (e) {
    throw createError({
      statusCode: e.statusCode || 500,
      statusMessage: e.message || 'Failed to fetch article'
    })
  }
})
