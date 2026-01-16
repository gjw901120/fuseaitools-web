<template>
  <div class="home-page">
    <!-- 主布局容器 -->
    <div class="main-layout">
      <!-- 左侧：AI工具使用历史记录（20%） -->
      <aside class="left-sidebar">
        <div class="timeline-header">
          <h3>History</h3>
        </div>
        
        <div class="timeline-container">
          <div class="timeline-items">
            <div class="timeline-item" v-for="(record, index) in usageHistory" :key="record.id">
              <div class="timeline-marker" :class="[record.status, record.type]">
                <i :class="record.icon"></i>
              </div>
              <div class="timeline-content">
                <div class="timeline-header">
                  <div class="timeline-tool">{{ record.toolName }}</div>
                </div>
                <div class="timeline-description">{{ record.description }}</div>
                <div class="timeline-meta">
                  <div class="timeline-time">{{ formatTime(record.timestamp) }}</div>
                  <div class="timeline-duration">{{ record.duration }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 加载更多按钮 -->
          <div class="load-more-container" v-if="hasMoreData">
            <button class="load-more-btn" @click="loadMore" :disabled="isLoading">
              <i v-if="isLoading" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-plus"></i>
              {{ isLoading ? 'Loading...' : 'Load More' }}
            </button>
          </div>
          
          <!-- 空状态 -->
          <div v-if="usageHistory.length === 0" class="empty-timeline">
            <i class="fas fa-history"></i>
            <p>No usage records</p>
          </div>
        </div>
      </aside>

      <!-- 右侧：工具导航和展示区域（80%） -->
      <main class="right-main">
        <!-- 上方：AI工具聚合导航（30%） -->
        <header class="tools-navigation">
          <div class="nav-tabs">
            <div 
              v-for="navItem in navItems" 
              :key="navItem.id"
              class="nav-tab"
              :class="{ active: selectedCategory === navItem.id }"
              @click="selectCategory(navItem.id)"
            >
              <i :class="navItem.icon"></i>
              <span>{{ navItem.name }}</span>
              <span class="tool-count">{{ getToolCount(navItem.type) }}</span>
            </div>
          </div>
          
          <!-- 二级导航 -->
          <div class="sub-nav" v-if="selectedCategory">
            <div 
              v-for="subTool in getCurrentTools()" 
              :key="subTool.id"
              class="sub-nav-item"
              :class="{ active: selectedTool === subTool.id }"
              @click="selectTool(subTool.id)"
            >
              {{ subTool.name }}
            </div>
          </div>
        </header>

        <!-- 下方：工具界面（70%） -->
        <section class="tool-interface">
          <Breadcrumb 
            v-if="selectedCategoryName && selectedToolName"
            :category="selectedCategoryName" 
            :current-page="selectedToolName" 
          />
          <slot />
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { provide, computed } from 'vue'
import Breadcrumb from '~/components/Breadcrumb.vue'
import { useHomeLayout } from '~/composables/useHomeLayout'

const {
  selectedCategory,
  selectedTool,
  navItems,
  usageHistory,
  isLoading,
  hasMoreData,
  formatTime,
  getToolCount,
  getCurrentTools,
  selectCategory,
  selectTool,
  loadMore,
  addToUsageHistory,
  allTools
} = useHomeLayout()

// 计算当前类别名称和工具名称
const selectedCategoryName = computed(() => {
  const category = navItems.value.find(item => item.id === selectedCategory.value)
  return category ? category.type : null
})

const selectedToolName = computed(() => {
  const tool = allTools.value.find(t => t.id === selectedTool.value)
  return tool ? tool.name : null
})

// 提供给子组件使用
provide('addToUsageHistory', addToUsageHistory)
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: #f8fafc;
  margin: 0;
  padding: 0;
  overflow: visible;
}

/* 主布局容器 */
.main-layout {
  display: flex;
  align-items: stretch;
  margin-top: 0;
  overflow: hidden;
  /* 高度由内容撑开：timeline-header + timeline-container(包含10个元素+加载更多按钮) */
  height: fit-content;
  min-height: fit-content;
}

/* 左侧边栏 - 20% */
.left-sidebar {
  width: 20%;
  background: white;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* 高度撑满父容器 */
  height: 100%;
}

.timeline-header {
  padding: 10px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8fafc;
  text-align: center;
  border-radius: 8px;
  flex-shrink: 0;
  height: 50px;
  box-sizing: border-box;
}

.timeline-header h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #334155;
  text-align: center;
  width: 100%;
}

.timeline-container {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  /* 固定高度：1280px，保持这个高度不变 */
  height: 1280px;
  /* 点击加载更多后，内容超过这个高度时显示滚动条 */
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f8fafc;
}

.timeline-container::-webkit-scrollbar {
  width: 6px;
}

.timeline-container::-webkit-scrollbar-track {
  background: #f8fafc;
  border-radius: 3px;
}

.timeline-container::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.timeline-container::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.timeline-items {
  flex: 0 0 auto;
  max-height: 1280px;
  min-height: 0;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  position: relative;
}

.timeline-item:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 16px;
  top: 40px;
  width: 2px;
  height: calc(100% + 20px);
  background: #e2e8f0;
}

.timeline-marker {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;
  font-size: 14px;
}

.timeline-marker.completed {
  background: #10b981;
  color: white;
}

.timeline-marker.in_progress {
  background: #f59e0b;
  color: white;
  animation: pulse 2s infinite;
}

.timeline-marker.chat {
  background: #3b82f6;
}

.timeline-marker.image {
  background: #8b5cf6;
}

.timeline-marker.audio {
  background: #f59e0b;
}

.timeline-marker.video {
  background: #ef4444;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.timeline-content {
  flex: 1;
  min-width: 0;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 6px;
}

.timeline-tool {
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
}

.timeline-description {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 8px;
  line-height: 1.4;
}

.timeline-meta {
  display: flex;
  gap: 12px;
  font-size: 11px;
  color: #94a3b8;
}

.timeline-time {
  font-weight: 500;
}

.timeline-duration {
  font-weight: 500;
}

.load-more-container {
  padding: 20px 0 0;
  border-top: 1px solid #e2e8f0;
  margin-top: auto;
  flex-shrink: 0;
}

.load-more-btn {
  width: 100%;
  padding: 12px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.load-more-btn:hover:not(:disabled) {
  background: #5a6fd8;
  transform: translateY(-1px);
}

.load-more-btn:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
  transform: none;
}

.load-more-btn i {
  font-size: 12px;
}

.empty-timeline {
  text-align: center;
  padding: 40px 20px;
  color: #64748b;
}

.empty-timeline i {
  font-size: 2rem;
  margin-bottom: 12px;
  opacity: 0.5;
}

/* 右侧主区域 - 80% */
.right-main {
  width: 80%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 20px;
  min-height: 0;
  /* 高度与主布局一致 */
  height: 100%;
}

/* 工具导航区域 - 自适应高度 */
.tools-navigation {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  min-height: fit-content;
  max-height: 40%;
  overflow-y: auto;
}

.nav-tabs {
  display: flex;
  padding: 20px 20px 0;
  gap: 8px;
  flex-wrap: wrap;
  flex-shrink: 0;
}

.nav-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  color: #64748b;
  flex: 1;
  justify-content: center;
  min-width: 0;
}

.nav-tab:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

.nav-tab.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

.nav-tab i {
  font-size: 16px;
}

.tool-count {
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 500;
}

.sub-nav {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  padding: 16px 20px 20px;
  gap: 8px;
  align-content: start;
}

.sub-nav-item {
  padding: 8px 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 13px;
  color: #64748b;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sub-nav-item:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

.sub-nav-item.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

/* 工具界面 - 占据剩余空间 */
.tool-interface {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  min-height: 0;
  height: 100%;
  overflow: hidden;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .main-layout {
    flex-direction: column;
    height: 100vh;
  }
  
  .left-sidebar {
    width: 100%;
    height: 300px;
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
    min-height: 300px;
  }
  
  .right-main {
    width: 100%;
    min-height: 0;
    height: calc(100vh - 300px);
    flex: 1;
  }
  
  .tools-navigation {
    max-height: 35%;
  }
}

@media (max-width: 1200px) {
  .sub-nav {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 900px) {
  .sub-nav {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .nav-tabs {
    flex-direction: column;
    gap: 4px;
  }
  
  .nav-tab {
    justify-content: center;
    flex: none;
  }
  
  .sub-nav {
    grid-template-columns: repeat(2, 1fr);
    gap: 6px;
  }
}
</style>

