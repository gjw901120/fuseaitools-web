<template>
  <div class="news-detail-page" v-if="article" :key="route.params.slug">
    <!-- Hero Section -->
    <section class="detail-hero">
      <div class="simply-container">
        <div class="breadcrumb">
          <NuxtLink to="/" class="breadcrumb-link home-link">
            <i class="fas fa-home"></i>
          </NuxtLink>
          <NuxtLink to="/news" class="breadcrumb-link">
            <i class="fas fa-arrow-left"></i>
            Back to News
          </NuxtLink>
        </div>
        
        <div class="article-header">
          <h1 class="article-title">{{ article.title }}</h1>
          <div class="article-meta">
            <span class="article-date">{{ formatDate(article.publishDate) }}</span>
            <span class="article-read-time" v-if="article.readTime != null">{{ article.readTime }} min read</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Article Content（完整展示 content 的内容与结构） -->
    <section class="article-content-section">
      <div class="simply-container">
        <div class="content-wrapper">
          <!-- Main Content：仅渲染后端 content 的完整 HTML -->
          <article class="main-content">
            <div class="article-body html-content" v-html="articleBodyHtml" />
          </article>
        </div>
      </div>
    </section>

  </div>

  <!-- Loading State -->
  <div v-else-if="pending" class="loading-state">
    <div class="simply-container">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <p>Loading article...</p>
      </div>
    </div>
  </div>

  <!-- Error State（网络错误或接口返回失败/无数据） -->
  <div v-else-if="showNotFound" class="error-state">
    <div class="simply-container">
      <div class="error-content">
        <h2>Article Not Found</h2>
        <p>{{ notFoundMessage }}</p>
        <button @click="navigateTo('/news')" class="back-btn">
          Back to News
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// 获取路由参数
const route = useRoute()
const router = useRouter()

// 定义页面元数据
definePageMeta({
  key: (route) => route.params.slug
})

// 分类数字与文案（与列表页一致）
const CATEGORY_LABELS = { 1: 'Chat', 2: 'Image', 3: 'Audio', 4: 'Video' }

// 请求后端详情：GET /api/news/detail?path=slug，返回 { errorCode, errorMessage, data }
const { data: detailData, pending, error, refresh } = await useFetch('/api/news/detail', {
  key: `article-${route.params.slug}`,
  query: computed(() => ({ path: route.params.slug })),
  server: true,
  default: () => ({ errorCode: '', data: null })
})

watch(() => route.params.slug, async (newSlug, oldSlug) => {
  if (newSlug !== oldSlug && process.client) await refresh()
}, { immediate: false })
watch(() => route.fullPath, async (newPath, oldPath) => {
  if (newPath !== oldPath && process.client) await refresh()
}, { immediate: false })

// 接口失败或无数据
const apiFailed = computed(() => {
  const d = detailData.value
  if (!d) return true
  if (d.errorCode && d.errorCode !== '00000') return true
  if (!d.data || d.data.isDel === 1) return true
  return false
})

// 映射为页面使用的 article
const article = computed(() => {
  if (apiFailed.value) return null
  const d = detailData.value?.data
  if (!d) return null
  const firstImg = d.content && (d.content.match(/<img[^>]+src=["']([^"']+)["']/i) || [])[1]
  return {
    id: d.id,
    title: (d.title || '').trim(),
    slug: d.path,
    excerpt: d.description || '',
    category: CATEGORY_LABELS[d.category] ?? (d.category != null ? String(d.category) : ''),
    image: d.image || firstImg || undefined,
    publishDate: d.gmtCreate || null,
    updatedAt: d.gmtModified || null,
    readTime: d.readTime ?? null,
    keyword: d.keyword || '',
    content: d.content || ''
  }
})

// 从完整 HTML 中取出 body 内内容用于 v-html，避免重复 html/head/body
const articleBodyHtml = computed(() => {
  const raw = article.value?.content
  if (!raw) return ''
  const bodyMatch = raw.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  if (bodyMatch) return bodyMatch[1].trim()
  const stripDoc = raw
    .replace(/<!DOCTYPE[^>]*>/gi, '')
    .replace(/<\/?html[^>]*>/gi, '')
    .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '')
    .replace(/<\/?body[^>]*>/gi, '')
  return stripDoc.trim()
})

const relatedArticles = computed(() => {
  const list = detailData.value?.data?.relatedList || detailData.value?.relatedArticles
  return Array.isArray(list) ? list : []
})

const showNotFound = computed(() => !pending && (!!error || apiFailed.value))
const notFoundMessage = computed(() => error.value?.message || detailData.value?.errorMessage || 'The article doesn\'t exist or has been removed.')

// SEO配置 - 使用watch来动态更新
watch(article, (newArticle) => {
  if (newArticle) {
useHead({
      title: `${newArticle.title} - FuseAI Tools News`,
      meta: [
        { name: 'description', content: newArticle.excerpt || '' },
        { name: 'keywords', content: newArticle.keyword || `${newArticle.category}, AI news, ${newArticle.title}` },
        { property: 'og:title', content: newArticle.title || '' },
        { property: 'og:description', content: newArticle.excerpt || '' },
        { property: 'og:image', content: newArticle.image || '' },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: `https://fuseaitools.com/news/${newArticle.slug || ''}` },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: newArticle.title || '' },
        { name: 'twitter:description', content: newArticle.excerpt || '' },
        { name: 'twitter:image', content: newArticle.image || '' }
      ],
      link: [
        { rel: 'canonical', href: `https://fuseaitools.com/news/${newArticle.slug || ''}` }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": newArticle.title || '',
            "description": newArticle.excerpt || '',
            "image": newArticle.image || '',
            "datePublished": newArticle.publishDate || '',
            "dateModified": newArticle.updatedAt || newArticle.publishDate || '',
            "author": { "@type": "Organization", "name": "FuseAI Tools" },
            "publisher": {
              "@type": "Organization",
              "name": "FuseAI Tools",
              "logo": { "@type": "ImageObject", "url": "https://fuseaitools.com/favicon.ico" }
            },
            "mainEntityOfPage": { "@type": "WebPage", "@id": `https://fuseaitools.com/news/${newArticle.slug || ''}` },
            "articleSection": newArticle.category || '',
            "wordCount": (newArticle.readTime || 0) * 200
          })
        }
      ]
    })
  }
}, { immediate: true })

// 方法
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const navigateToDetail = (slug) => {
  navigateTo(`/news/${slug}`)
}

</script>

<style scoped>
.news-detail-page {
  min-height: 100vh;
  background: #ffffff;
}

/* Loading State */
.loading-state {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-content {
  text-align: center;
}

/* Error State */
.error-state {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-content {
  text-align: center;
  max-width: 500px;
}

.error-content h2 {
  color: #dc2626;
  margin-bottom: 1rem;
}

.error-content p {
  color: #6b7280;
  margin-bottom: 2rem;
}

.back-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: #5a6fd8;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Hero Section - 背景高度缩小 30%，文字大小不变 */
.detail-hero {
  background: #f8fafc;
  padding: 42px 0 28px;
}

.breadcrumb {
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  align-items: center;
}

.breadcrumb-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.breadcrumb-link:hover {
  color: #5a6fd8;
}

.home-link {
  background: rgba(102, 126, 234, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: #667eea;
}

.home-link:hover {
  background: rgba(102, 126, 234, 0.2);
  color: #5a6fd8;
}

.article-header {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.article-category {
  display: inline-block;
  background: #667eea;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1rem;
}

.article-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.article-meta {
  display: flex;
  justify-content: center;
  gap: 2rem;
  color: #6b7280;
  font-size: 0.875rem;
}

/* Content Section */
.article-content-section {
  padding: 60px 0;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.main-content {
  max-width: none;
  width: 100%;
}

/* Content 区域完整填充，统一排版与响应式 */
.article-body {
  line-height: 1.7;
  color: #374151;
  width: 100%;
  box-sizing: border-box;
}

.article-body.html-content {
  overflow-x: auto;
}

.article-body.html-content :deep(article),
.article-body.html-content :deep(.ai-model-comparison) {
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
}

.article-body.html-content :deep(section) {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin-bottom: 1.5rem;
}

.article-body.html-content :deep(h1) {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 1rem;
  line-height: 1.25;
}

.article-body.html-content :deep(h2) {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1f2937;
  margin: 2rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.article-body.html-content :deep(h3) {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 1.5rem 0 0.75rem;
}

.article-body.html-content :deep(p) {
  margin-bottom: 1.25rem;
  color: #374151;
}

.article-body.html-content :deep(ul),
.article-body.html-content :deep(ol) {
  margin: 1rem 0 1.5rem 1.5rem;
  padding-left: 1.5rem;
}

.article-body.html-content :deep(li) {
  margin-bottom: 0.5rem;
}

.article-body.html-content :deep(blockquote) {
  border-left: 4px solid #667eea;
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  background: #f8fafc;
  font-style: italic;
  color: #4b5563;
  border-radius: 0 8px 8px 0;
}

/* 正文内图片：完整宽度、自适应高度 */
.article-body.html-content :deep(.image-container),
.article-body.html-content :deep(figure) {
  width: 100%;
  max-width: 100%;
  margin: 1.5rem 0;
  box-sizing: border-box;
}

.article-body.html-content :deep(.image-container img),
.article-body.html-content :deep(img) {
  max-width: 100%;
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.article-body.html-content :deep(.image-caption) {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.5rem;
  font-style: italic;
  text-align: center;
}

/* 表格：完整宽度、横向滚动 */
.article-body.html-content :deep(.comparison-table) {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  margin: 1.5rem 0;
  -webkit-overflow-scrolling: touch;
}

.article-body.html-content :deep(table) {
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  font-size: 0.9375rem;
}

.article-body.html-content :deep(th),
.article-body.html-content :deep(td) {
  padding: 12px 16px;
  text-align: left;
  border: 1px solid #e5e7eb;
}

.article-body.html-content :deep(th) {
  background: #f8fafc;
  font-weight: 600;
  color: #1f2937;
}

.article-body.html-content :deep(tr:hover) {
  background: #fafafa;
}

/* 推荐/要点等卡片区 */
.article-body.html-content :deep(.recommendation-container) {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  width: 100%;
  margin: 1.5rem 0;
}

.article-body.html-content :deep(.recommendation),
.article-body.html-content :deep(.key-takeaways) {
  width: 100%;
  max-width: 100%;
  padding: 1.25rem 1.5rem;
  background: #f8fafc;
  border-radius: 8px;
  border-left: 4px solid #667eea;
  box-sizing: border-box;
}

.article-body.html-content :deep(.article-footer) {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
  font-size: 0.875rem;
  color: #6b7280;
}

/* 去除 content 内可能自带的 body/article 背景与最大宽度限制，避免与页面冲突 */
.article-body.html-content :deep(article body),
.article-body.html-content :deep(.ai-model-comparison) {
  background: transparent;
  max-width: none;
  padding: 0;
  margin: 0;
}

@media (min-width: 768px) {
  .article-body.html-content :deep(.recommendation-container) {
    grid-template-columns: 1fr 1fr;
  }
}


/* Responsive Design */
@media (max-width: 1024px) {
}

@media (max-width: 768px) {
  .article-title {
    font-size: 2rem;
  }

  .article-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
