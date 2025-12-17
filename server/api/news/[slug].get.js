import { readFileSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  try {
    const slug = getRouterParam(event, 'slug')
    
    // 读取新闻数据
    const newsDataPath = join(process.cwd(), 'data', 'news.json')
    const allArticles = JSON.parse(readFileSync(newsDataPath, 'utf-8'))
    
    // 查找指定文章
    const article = allArticles.find(a => a.slug === slug)
    
    if (!article) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Article not found'
      })
    }
    
    // 获取相关文章（同分类的其他文章）
    const relatedArticles = allArticles
      .filter(a => a.slug !== article.slug && a.category === article.category)
      .slice(0, 3)
    
    return {
      article,
      relatedArticles
    }
  } catch (error) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch article data'
    })
  }
})




