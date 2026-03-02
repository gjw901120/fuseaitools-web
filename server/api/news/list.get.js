/**
 * 代理到后端新闻列表 API GET /news/list
 * 查询参数: current, size, category (可选)
 */
export default defineEventHandler(async (event) => {
  const apiBase = getEffectiveApiBase(event)
  const query = getQuery(event)

  try {
    const res = await $fetch(`${apiBase}/news/list`, {
      query: {
        page: query.page || 1,
        size: query.size || 10,
        ...(query.category && query.category !== 'All' ? { category: query.category } : {})
      }
    })
    return res
  } catch (e) {
    throw createError({
      statusCode: e.statusCode || 500,
      statusMessage: e.message || 'Failed to fetch news list'
    })
  }
})
