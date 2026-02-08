import { defineEventHandler, getQuery, createError } from 'file://C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const index_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = parseInt(query.page || 1);
    const limit = parseInt(query.limit || 10);
    const category = query.category || "All";
    const newsDataPath = join(process.cwd(), "data", "news.json");
    const allArticles = JSON.parse(readFileSync(newsDataPath, "utf-8"));
    let filteredArticles = allArticles;
    if (category !== "All") {
      filteredArticles = allArticles.filter((article) => article.category === category);
    }
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedArticles = filteredArticles.slice(startIndex, endIndex);
    const totalItems = filteredArticles.length;
    const totalPages = Math.ceil(totalItems / limit);
    const hasMore = endIndex < totalItems;
    const categories = ["All", ...new Set(allArticles.map((article) => article.category))];
    return {
      articles: paginatedArticles,
      categories,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        hasMore
      }
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch news data"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
