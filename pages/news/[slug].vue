<template>
  <div class="news-detail-page" v-if="article" :key="route.params.slug">
    <!-- Hero Section -->
    <section class="detail-hero">
      <div class="simply-container">
        <div class="breadcrumb">
          <NuxtLink to="/" class="breadcrumb-link home-link">
            <i class="fas fa-home"></i>
            首页
          </NuxtLink>
          <NuxtLink to="/news" class="breadcrumb-link">
            <i class="fas fa-arrow-left"></i>
            Back to News
          </NuxtLink>
        </div>
        
        <div class="article-header">
          <div class="article-category">{{ article.category }}</div>
          <h1 class="article-title">{{ article.title }}</h1>
          <div class="article-meta">
            <span class="article-date">{{ formatDate(article.publishDate) }}</span>
            <span class="article-read-time">{{ article.readTime }} min read</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Article Image -->
    <section class="article-image-section">
      <div class="simply-container">
        <div class="article-image">
          <img :src="article.image" :alt="article.title" />
        </div>
      </div>
    </section>

    <!-- Article Content -->
    <section class="article-content-section">
      <div class="simply-container">
        <div class="content-wrapper">
          <!-- Main Content -->
          <article class="main-content">
            <div class="article-excerpt">
              {{ article.excerpt }}
            </div>
            
            <!-- Sample article content -->
            <div class="article-body">
              <p>
                Artificial intelligence continues to reshape our world at an unprecedented pace. 
                This comprehensive exploration delves into the latest developments and their implications 
                for businesses, individuals, and society at large.
              </p>

              <h2>The Current State of AI Technology</h2>
              <p>
                Recent advancements in machine learning and natural language processing have opened 
                new possibilities for AI applications. Companies are leveraging these technologies 
                to improve efficiency, enhance customer experiences, and drive innovation across 
                various industries.
              </p>

              <blockquote>
                "The future of AI lies not just in technological advancement, but in how we 
                responsibly integrate these tools into our daily lives and work processes."
              </blockquote>

              <h3>Key Developments in 2024</h3>
              <ul>
                <li>Enhanced multimodal AI capabilities</li>
                <li>Improved reasoning and problem-solving</li>
                <li>Better integration with existing workflows</li>
                <li>Increased focus on AI safety and ethics</li>
              </ul>

              <p>
                These developments represent significant milestones in AI research and development. 
                As we move forward, it's crucial to consider both the opportunities and challenges 
                that these technologies present.
              </p>

              <h3>Industry Impact</h3>
              <p>
                The business world is experiencing a transformation driven by AI adoption. 
                Organizations are finding new ways to leverage AI for competitive advantage, 
                from automating routine tasks to gaining insights from large datasets.
              </p>

              <h2>Looking Ahead</h2>
              <p>
                As we continue to explore the potential of artificial intelligence, it's important 
                to maintain a balanced perspective. While the opportunities are vast, we must 
                also address concerns about job displacement, privacy, and the ethical use of AI.
              </p>

              <p>
                The journey of AI development is far from over. With continued research, 
                collaboration, and responsible implementation, we can harness the power of 
                AI to create a better future for everyone.
              </p>
            </div>
          </article>

          <!-- Sidebar -->
          <aside class="sidebar">
            <div class="sidebar-section">
              <h3>Related Articles</h3>
              <div class="related-articles">
                <div 
                  v-for="related in relatedArticles" 
                  :key="related.id"
                  class="related-article"
                  @click="navigateToDetail(related.slug)"
                >
                  <img :src="related.image" :alt="related.title" />
                  <div class="related-content">
                    <h4>{{ related.title }}</h4>
                    <span class="related-date">{{ formatDate(related.publishDate) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="sidebar-section">
              <h3>Share This Article</h3>
              <div class="share-buttons">
                <button class="share-btn twitter" @click="shareOnTwitter">
                  <i class="fab fa-twitter"></i>
                  Twitter
                </button>
                <button class="share-btn linkedin" @click="shareOnLinkedIn">
                  <i class="fab fa-linkedin"></i>
                  LinkedIn
                </button>
                <button class="share-btn facebook" @click="shareOnFacebook">
                  <i class="fab fa-facebook"></i>
                  Facebook
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- Newsletter Signup -->
    <section class="newsletter-section">
      <div class="simply-container">
        <div class="newsletter-content">
          <h3>Stay Updated</h3>
          <p>Get the latest AI news and insights delivered to your inbox.</p>
          <div class="newsletter-form">
            <input type="email" placeholder="Enter your email address" v-model="email" />
            <button @click="subscribeNewsletter">Subscribe</button>
          </div>
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

  <!-- Error State -->
  <div v-else-if="error" class="error-state">
    <div class="simply-container">
      <div class="error-content">
        <h2>Article Not Found</h2>
        <p>The article you're looking for doesn't exist or has been removed.</p>
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

// 动态数据加载 - SEO友好的方式
const { data: articleData, pending, error, refresh } = await useFetch(`/api/news/${route.params.slug}`, {
  key: `article-${route.params.slug}`,
  server: true,  // 服务器端渲染，SEO友好
  default: () => ({ article: null, relatedArticles: [] }) // 默认值
})

// 监听路由变化，重新获取数据（仅客户端导航时）
watch(() => route.params.slug, async (newSlug, oldSlug) => {
  if (newSlug !== oldSlug && process.client) {
    await refresh()
  }
}, { immediate: false })

// 监听路由完整路径变化（处理前进/后退）
watch(() => route.fullPath, async (newPath, oldPath) => {
  if (newPath !== oldPath && process.client) {
    await refresh()
  }
}, { immediate: false })

// 从API响应中提取数据
const article = computed(() => {
  try {
    return articleData.value?.article || null
  } catch (error) {
    console.warn('Error accessing article data:', error)
    return null
  }
})

const relatedArticles = computed(() => {
  try {
    return articleData.value?.relatedArticles || []
  } catch (error) {
    console.warn('Error accessing related articles:', error)
    return []
  }
})

// SEO配置 - 使用watch来动态更新
watch(article, (newArticle) => {
  if (newArticle) {
useHead({
      title: `${newArticle.title} - FuseAI Tools News`,
  meta: [
        { name: 'description', content: newArticle.excerpt || '' },
        { name: 'keywords', content: `${newArticle.category}, AI news, ${newArticle.title}` },
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
            "dateModified": newArticle.publishDate || '',
            "author": {
              "@type": "Organization",
              "name": "FuseAI Tools"
            },
            "publisher": {
              "@type": "Organization",
              "name": "FuseAI Tools",
              "logo": {
                "@type": "ImageObject",
                "url": "https://fuseaitools.com/favicon.ico"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://fuseaitools.com/news/${newArticle.slug || ''}`
            },
            "articleSection": newArticle.category || '',
            "wordCount": (newArticle.readTime || 0) * 200
          })
        }
      ]
    })
  }
}, { immediate: true })

// 响应式数据
const email = ref('')

// 相关文章已经在上面通过API获取

// 方法
const formatDate = (dateString) => {
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

const shareOnTwitter = () => {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(article.value.title)
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
}

const shareOnLinkedIn = () => {
  const url = encodeURIComponent(window.location.href)
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
}

const shareOnFacebook = () => {
  const url = encodeURIComponent(window.location.href)
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
}

const subscribeNewsletter = () => {
  if (email.value) {
    // 在实际应用中，这里会调用API
    alert('Thank you for subscribing to our newsletter!')
    email.value = ''
  }
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

/* Hero Section */
.detail-hero {
  background: #f8fafc;
  padding: 60px 0 40px;
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

/* Article Image */
.article-image-section {
  padding: 0;
}

.article-image {
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Content Section */
.article-content-section {
  padding: 60px 0;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
}

.main-content {
  max-width: none;
}

.article-excerpt {
  font-size: 1.25rem;
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-left: 4px solid #667eea;
  border-radius: 0 8px 8px 0;
}

.article-body {
  line-height: 1.7;
  color: #374151;
}

.article-body h2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1f2937;
  margin: 2rem 0 1rem;
}

.article-body h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 1.5rem 0 0.75rem;
}

.article-body p {
  margin-bottom: 1.5rem;
}

.article-body ul {
  margin: 1rem 0 1.5rem 2rem;
}

.article-body li {
  margin-bottom: 0.5rem;
}

.article-body blockquote {
  border-left: 4px solid #667eea;
  padding: 1rem 1.5rem;
  margin: 2rem 0;
  background: #f8fafc;
  font-style: italic;
  color: #4b5563;
}

/* Sidebar */
.sidebar {
  position: sticky;
  top: 2rem;
  height: fit-content;
}

.sidebar-section {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.sidebar-section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.related-articles {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.related-article {
  display: flex;
  gap: 1rem;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 8px;
  transition: background 0.3s ease;
}

.related-article:hover {
  background: #e5e7eb;
}

.related-article img {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
}

.related-content h4 {
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 0.25rem;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-date {
  font-size: 0.75rem;
  color: #9ca3af;
}

.share-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.share-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.share-btn.twitter {
  background: #1da1f2;
  color: white;
}

.share-btn.linkedin {
  background: #0077b5;
  color: white;
}

.share-btn.facebook {
  background: #1877f2;
  color: white;
}

.share-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Newsletter Section */
.newsletter-section {
  background: #667eea;
  color: white;
  padding: 60px 0;
  text-align: center;
}

.newsletter-content h3 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.newsletter-content p {
  font-size: 1.125rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.newsletter-form {
  display: flex;
  max-width: 400px;
  margin: 0 auto;
  gap: 1rem;
}

.newsletter-form input {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
}

.newsletter-form button {
  padding: 1rem 2rem;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.newsletter-form button:hover {
  background: #f3f4f6;
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .content-wrapper {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .sidebar {
    position: static;
  }
}

@media (max-width: 768px) {
  .article-title {
    font-size: 2rem;
  }

  .article-meta {
    flex-direction: column;
    gap: 0.5rem;
  }

  .newsletter-form {
    flex-direction: column;
  }

  .newsletter-form button {
    width: 100%;
  }
}
</style>
