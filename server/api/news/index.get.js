import { readFileSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const page = parseInt(query.page || 1)
    const limit = parseInt(query.limit || 10)
    const category = query.category || 'All'

    const newsDataPath = join(process.cwd(), 'data', 'news.json')
    const allArticles = JSON.parse(readFileSync(newsDataPath, 'utf-8'))

    let filteredArticles = allArticles

    if (category !== 'All') {
      filteredArticles = allArticles.filter(article => article.category === category)
    }

    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const paginatedArticles = filteredArticles.slice(startIndex, endIndex)

    const totalItems = filteredArticles.length
    const totalPages = Math.ceil(totalItems / limit)
    const hasMore = endIndex < totalItems

    const categories = ['All', ...new Set(allArticles.map(article => article.category))]

    return {
      articles: paginatedArticles,
      categories,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        hasMore
      }
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch news data'
    })
  }
})