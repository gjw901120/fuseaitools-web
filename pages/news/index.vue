<template>
  <div class="news-page">
    <!-- Hero Section - 静态外壳 -->
    <section class="news-hero">
      <div class="simply-container">
        <div class="hero-content">
          <h1 class="hero-title">AI News & Updates</h1>
          <p class="hero-subtitle">
            Stay updated with the latest AI trends, product updates, and industry insights from FuseAI Tools.
          </p>
        </div>
      </div>
    </section>

    <!-- News List - 动态内容容器 -->
    <section class="news-list-section">
      <div class="simply-container">
        <!-- Loading State -->
        <div v-if="pending" class="loading-state">
          <div class="loading-spinner"></div>
          <p>Loading news articles...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-state">
          <h3>Failed to load articles</h3>
          <p>{{ error.message }}</p>
          <button @click="refresh" class="retry-btn">Retry</button>
        </div>

        <!-- Content -->
        <div v-else>
          <!-- 分类筛选器 - 动态数据 -->
          <div class="news-filters">
            <button 
              v-for="category in categories" 
              :key="category"
              :class="['filter-btn', { active: selectedCategory === category }]"
              @click="changeCategory(category)"
            >
              {{ category }}
            </button>
          </div>

          <!-- 文章列表 - 动态数据 -->
          <div class="news-list">
            <article 
              v-for="article in articles" 
              :key="article.id"
              class="news-list-item"
              @click="navigateToDetail(article)"
            >
              <div class="news-image">
                <img :src="article.image" :alt="article.title" />
              </div>
              <div class="news-content">
                <div class="news-header">
                  <span class="news-category">{{ article.category }}</span>
                  <span class="news-date">{{ formatDate(article.publishDate) }}</span>
                </div>
                <h3 class="news-title">{{ article.title }}</h3>
                <p class="news-excerpt">{{ article.excerpt }}</p>
                <div class="news-meta">
                  <span class="news-read-time">{{ article.readTime }} min read</span>
                  <i class="fas fa-arrow-right news-arrow"></i>
                </div>
              </div>
            </article>
          </div>

          <!-- 分页按钮 -->
          <div class="pagination-section" v-if="pagination.totalPages > 1">
            <div class="pagination-info">
              Showing {{ (pagination.currentPage - 1) * articlesPerPage + 1 }} to 
              {{ Math.min(pagination.currentPage * articlesPerPage, pagination.totalItems) }} 
              of {{ pagination.totalItems }} articles
            </div>
            <div class="pagination-buttons">
              <button 
                class="pagination-btn"
                :disabled="pagination.currentPage === 1"
                @click="goToPage(pagination.currentPage - 1)"
              >
                <i class="fas fa-chevron-left"></i>
                Previous
              </button>
              
              <div class="page-numbers">
                <button
                  v-for="page in getVisiblePages()"
                  :key="page"
                  :class="['page-btn', { active: page === pagination.currentPage }]"
                  @click="goToPage(page)"
                >
                  {{ page }}
                </button>
              </div>
              
              <button 
                class="pagination-btn"
                :disabled="pagination.currentPage === pagination.totalPages"
                @click="goToPage(pagination.currentPage + 1)"
              >
                Next
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// SEO配置 - 静态外壳的SEO信息
useHead({
  title: 'AI News & Updates - FuseAI Tools',
  meta: [
    { name: 'description', content: 'Stay updated with the latest AI trends, product updates, and industry insights from FuseAI Tools.' },
    { name: 'keywords', content: 'AI news, artificial intelligence updates, AI trends, FuseAI tools news' }
  ]
})

// 响应式数据
const selectedCategory = ref('All')
const currentPage = ref(1)
const articlesPerPage = ref(10)
const allArticles = ref([]) // 存储所有已加载的文章

// 动态数据状态
const { data: newsData, pending, error, refresh } = await useFetch('/api/news', {
  query: computed(() => ({
    page: currentPage.value,
    limit: articlesPerPage.value,
    category: selectedCategory.value
  }))
})

// 从API响应中提取数据
const articles = computed(() => newsData.value?.articles || [])
const categories = computed(() => newsData.value?.categories || [])
const pagination = computed(() => newsData.value?.pagination || {
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  hasMore: false
})

// 加载更多状态
const pendingMore = ref(false)

// 方法
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const navigateToDetail = (article) => {
  navigateTo(`/news/${article.slug}`)
}

const changeCategory = async (category) => {
  selectedCategory.value = category
  currentPage.value = 1
}

const goToPage = async (page) => {
  if (page < 1 || page > pagination.value.totalPages) return
  currentPage.value = page
  await refresh()
}

const getVisiblePages = () => {
  const current = pagination.value.currentPage
  const total = pagination.value.totalPages
  const delta = 2 // 当前页前后显示的页数
  
  let start = Math.max(1, current - delta)
  let end = Math.min(total, current + delta)
  
  // 确保总是显示足够的页数
  if (end - start < 4) {
    if (start === 1) {
      end = Math.min(total, start + 4)
    } else {
      start = Math.max(1, end - 4)
    }
  }
  
  const pages = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
}

// 监听分类变化，重置数据
watch(selectedCategory, () => {
  currentPage.value = 1
})
</script>

<style scoped>
.news-page {
  min-height: 100vh;
  background: #ffffff;
}

/* Hero Section */
.news-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
}

.breadcrumb {
  margin-bottom: 2rem;
  display: flex;
  justify-content: flex-start;
}

.breadcrumb-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.home-link {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: white;
  backdrop-filter: blur(10px);
}

.home-link:hover {
  background: rgba(255, 255, 255, 0.3);
  color: white;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  line-height: 1.6;
  margin: 0;
}

/* News List Section */
.news-list-section {
  padding: 80px 0;
}

/* Filters */
.news-filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid #e5e7eb;
  background: white;
  color: #6b7280;
  border-radius: 25px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover,
.filter-btn.active {
  border-color: #667eea;
  background: #667eea;
  color: white;
}

/* News List */
.news-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.news-list-item {
  display: flex;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 120px;
}

.news-list-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-color: #667eea;
}

.news-image {
  width: 200px;
  height: 120px;
  flex-shrink: 0;
  overflow: hidden;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.news-list-item:hover .news-image img {
  transform: scale(1.05);
}

.news-content {
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.news-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.news-category {
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.news-date {
  font-size: 0.875rem;
  color: #9ca3af;
  font-weight: 500;
}

.news-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-excerpt {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #9ca3af;
}

.news-read-time {
  background: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
}

.news-arrow {
  color: #667eea;
  transition: transform 0.3s ease;
}

.news-list-item:hover .news-arrow {
  transform: translateX(4px);
}

/* Pagination */
.pagination-section {
  text-align: center;
  margin-top: 3rem;
}

.pagination-info {
  margin-bottom: 1.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.pagination-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  background: white;
  color: #6b7280;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-btn:hover:not(:disabled) {
  border-color: #667eea;
  background: #667eea;
  color: white;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 0.25rem;
}

.page-btn {
  width: 40px;
  height: 40px;
  border: 1px solid #e5e7eb;
  background: white;
  color: #6b7280;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-btn:hover {
  border-color: #667eea;
  background: #f8fafc;
}

.page-btn.active {
  border-color: #667eea;
  background: #667eea;
  color: white;
}

/* Loading and Error States */
.loading-state, .error-state {
  text-align: center;
  padding: 3rem 0;
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

.error-state h3 {
  color: #dc2626;
  margin-bottom: 0.5rem;
}

.error-state p {
  color: #6b7280;
  margin-bottom: 1rem;
}

.retry-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  background: #5a6fd8;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .news-list-item {
    flex-direction: column;
    min-height: auto;
  }

  .news-image {
    width: 100%;
    height: 200px;
  }

  .news-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .news-filters {
    gap: 0.5rem;
  }

  .filter-btn {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  .pagination-buttons {
    gap: 0.25rem;
  }

  .pagination-btn {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
  }

  .page-btn {
    width: 36px;
    height: 36px;
    font-size: 0.875rem;
  }

  .pagination-info {
    font-size: 0.75rem;
  }
}
</style>
