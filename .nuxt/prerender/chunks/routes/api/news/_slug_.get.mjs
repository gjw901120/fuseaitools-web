import { defineEventHandler, getRouterParam, createError } from 'file://C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const _slug__get = defineEventHandler(async (event) => {
  try {
    const slug = getRouterParam(event, "slug");
    const newsDataPath = join(process.cwd(), "data", "news.json");
    const allArticles = JSON.parse(readFileSync(newsDataPath, "utf-8"));
    const article = allArticles.find((a) => a.slug === slug);
    if (!article) {
      throw createError({
        statusCode: 404,
        statusMessage: "Article not found"
      });
    }
    const relatedArticles = allArticles.filter((a) => a.slug !== article.slug && a.category === article.category).slice(0, 3);
    return {
      article,
      relatedArticles
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch article data"
    });
  }
});

export { _slug__get as default };
//# sourceMappingURL=_slug_.get.mjs.map
