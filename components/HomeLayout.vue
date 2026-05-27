<template>
  <div class="home-page home-layout--flux" :class="{ 'home-page--with-below': hasBelowMain }">
    <!-- 主布局容器 -->
    <div class="main-layout">
      <!-- 左侧：AI工具使用历史记录（20%） -->
      <aside class="left-sidebar">
        <div class="timeline-header timeline-header-row">
          <h3>History</h3>
          <button type="button" class="history-refresh-btn" title="Refresh" @click="refreshHistory" :disabled="isLoading">
            <i :class="isLoading ? 'fas fa-spinner fa-spin' : 'fas fa-sync-alt'"></i>
          </button>
        </div>
        
        <div class="timeline-container" ref="timelineContainerRef">
          <div class="timeline-items">
            <div
              class="timeline-item timeline-item-clickable"
              v-for="(record, index) in usageHistory"
              :key="record.id || record.recordId || index"
              @click="navigateToHistoryItem(record)"
            >
              <span class="timeline-item-status-badge" :class="record.status" :title="record.status === 'completed' ? 'Completed' : 'In progress'">
                <i :class="record.status === 'completed' ? 'fas fa-check-circle' : 'fas fa-spinner fa-spin'"></i>
              </span>
              <div class="timeline-marker" :class="[record.status, record.type]">
                <img v-if="record.iconIsImage && record.icon" :src="record.icon" :alt="record.toolName || record.category" class="timeline-marker-logo" />
                <i v-else :class="record.icon"></i>
              </div>
              <div class="timeline-content">
                <div class="timeline-header">
                  <div class="timeline-tool">{{ record.toolName || record.category }}</div>
                </div>
                <div class="timeline-description">{{ record.description || record.title }}</div>
                <div class="timeline-meta" v-if="record.model">
                  <span class="timeline-model">{{ record.model }}</span>
                </div>
                <div class="timeline-meta">
                  <div class="timeline-time">{{ formatTime(record.timestamp) }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 底部：加载更多 / 没有更多了（有记录时始终固定在底部） -->
          <div class="load-more-container" v-if="usageHistory.length > 0">
            <button v-if="hasMoreData" class="load-more-btn" @click="onLoadMore" :disabled="isLoading">
              <i v-if="isLoading" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-plus"></i>
              {{ isLoading ? 'Loading...' : 'Load More' }}
            </button>
            <div v-else class="no-more-hint">No more</div>
          </div>
          
          <!-- 空状态 / 加载中 -->
          <div v-if="usageHistory.length === 0" class="empty-timeline">
            <i v-if="isLoading" class="fas fa-spinner fa-spin"></i>
            <i v-else class="fas fa-history"></i>
            <p>{{ isLoading ? 'Loading...' : 'No usage records' }}</p>
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
          
          <!-- 二级导航：有路由的用 NuxtLink 保证点击可跳转（如 Luma /home/luma/generate） -->
          <div class="sub-nav" v-if="selectedCategory">
            <template v-for="subTool in getCurrentTools()" :key="subTool.id">
              <NuxtLink
                v-if="toolRouteMap[subTool.routeKey || subTool.name]"
                :to="toolRouteMap[subTool.routeKey || subTool.name]"
                class="sub-nav-item"
                :class="{ active: selectedTool === subTool.id }"
              >
                {{ subTool.name }}
              </NuxtLink>
              <div
                v-else
                class="sub-nav-item"
                :class="{ active: selectedTool === subTool.id }"
                @click="selectTool(subTool.id)"
              >
                {{ subTool.name }}
              </div>
            </template>
          </div>
        </header>

        <!-- 下方：工具界面（70%），key 随路由变化强制重新挂载对应工具页 -->
        <section class="tool-interface">
          <h1 class="sr-only">{{ pageH1Text }}</h1>
          <Breadcrumb 
            v-if="selectedCategoryName && selectedToolName"
            :category="selectedCategoryName" 
            :parent-label="breadcrumbParentLabel"
            :parent-to="breadcrumbParentTo"
            :current-page="breadcrumbCurrentPage"
          />
          <div :key="route.path" class="tool-interface-slot">
            <slot />
          </div>
        </section>
      </main>
    </div>

    <div v-if="hasBelowMain" class="home-layout-below">
      <slot name="below-main" />
    </div>
  </div>
</template>

<script setup>
import { provide, computed, ref, nextTick, useSlots } from 'vue'
import Breadcrumb from '~/components/Breadcrumb.vue'
import { useHomeLayout } from '~/composables/useHomeLayout'
import { getToolBreadcrumbByRoute } from '~/utils/toolBreadcrumbs'

const {
  route,
  selectedCategory,
  selectedTool,
  navItems,
  usageHistory,
  toolRouteMap,
  isLoading,
  hasMoreData,
  formatTime,
  getToolCount,
  getCurrentTools,
  selectCategory,
  selectTool,
  loadMore,
  refreshHistory,
  addToUsageHistory,
  allTools,
  navigateToHistoryItem
} = useHomeLayout()

const slots = useSlots()
const hasBelowMain = computed(() => !!slots['below-main'])

const timelineContainerRef = ref(null)

// 点击加载更多：加载后把「新 10 条」起点对准视口顶部，新数据在上、Load more 在视口底部，不滚到整页最底
async function onLoadMore() {
  const el = timelineContainerRef.value
  const prevScrollHeight = el ? el.scrollHeight : 0
  await loadMore()
  await nextTick()
  if (el) el.scrollTop = Math.max(0, prevScrollHeight - el.clientHeight)
}

// 计算当前类别名称和工具名称
const selectedCategoryName = computed(() => {
  const category = navItems.value.find(item => item.id === selectedCategory.value)
  return category ? category.type : null
})

const selectedToolName = computed(() => {
  const tool = allTools.value.find(t => t.id === selectedTool.value)
  return tool ? tool.name : null
})

const routeBreadcrumb = computed(() => getToolBreadcrumbByRoute(route.path, selectedToolName.value || ''))

const breadcrumbParentLabel = computed(() => {
  return routeBreadcrumb.value.parentLabel
})

const breadcrumbParentTo = computed(() => {
  return routeBreadcrumb.value.parentTo
})

const breadcrumbCurrentPage = computed(() => {
  return routeBreadcrumb.value.currentLabel
})

const pageH1Text = computed(() => {
  const parent = (breadcrumbParentLabel.value || '').trim()
  const current = (breadcrumbCurrentPage.value || '').trim()
  if (parent && current && parent !== current) return `${parent} - ${current}`
  if (current) return current
  if (parent) return parent
  return 'AI Tool'
})

// 提供给子组件使用
provide('addToUsageHistory', addToUsageHistory)
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  height: 100%;
  background: var(--flux-bg);
  color: var(--flux-foreground);
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.home-page--with-below {
  height: auto;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}

.home-page--with-below .main-layout {
  flex: 0 0 auto;
  height: calc(100vh - 64px);
  min-height: 560px;
  max-height: calc(100vh - 64px);
}

.home-layout-below {
  flex-shrink: 0;
  width: 100%;
  border-top: 1px solid var(--flux-border-subtle);
  background: var(--flux-bg);
}

.main-layout {
  display: flex;
  align-items: stretch;
  margin-top: 0;
  overflow: hidden;
  min-height: 0;
  min-width: 0;
  flex: 1;
}

.left-sidebar {
  flex: 0 0 20%;
  min-width: 0;
  max-width: 20%;
  background: var(--flux-bg-elevated);
  border-right: 1px solid var(--flux-border-subtle);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
}

.timeline-header {
  padding: 10px;
  border-bottom: 1px solid var(--flux-border);
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--flux-card);
  text-align: center;
  border-radius: 8px;
  flex-shrink: 0;
  height: 50px;
  box-sizing: border-box;
}

.timeline-header-row {
  justify-content: space-between;
}

.history-refresh-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--flux-muted);
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
}

.history-refresh-btn:hover:not(:disabled) {
  color: var(--flux-primary);
  background: var(--flux-primary-muted);
}

.history-refresh-btn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.timeline-header h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--flux-foreground);
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
  height: 1280px;
  scrollbar-width: thin;
  scrollbar-color: var(--flux-border) var(--flux-bg);
}

.timeline-container::-webkit-scrollbar {
  width: 6px;
}

.timeline-container::-webkit-scrollbar-track {
  background: var(--flux-bg);
  border-radius: 3px;
}

.timeline-container::-webkit-scrollbar-thumb {
  background: var(--flux-border);
  border-radius: 3px;
}

.timeline-container::-webkit-scrollbar-thumb:hover {
  background: var(--flux-primary);
}

.timeline-items {
  flex: 0 0 auto;
  min-height: 0;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  position: relative;
}

.timeline-item-clickable {
  cursor: pointer;
  border-radius: 8px;
  padding: 4px 0;
  margin: -4px 0;
}

.timeline-item-clickable:hover {
  background: var(--flux-card);
}

.timeline-item-status-badge {
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 14px;
  line-height: 1;
  z-index: 1;
}

.timeline-item-status-badge.completed {
  color: var(--flux-success);
}

.timeline-item-status-badge.in_progress {
  color: var(--flux-warning);
}

.timeline-model {
  font-size: 11px;
  color: var(--flux-muted);
}

.timeline-item:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 16px;
  top: 40px;
  width: 2px;
  height: calc(100% + 20px);
  background: var(--flux-border);
}

.timeline-marker {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;
  font-size: 14px;
  color: var(--flux-muted);
  border: 1px solid var(--flux-primary);
  box-sizing: border-box;
}

.timeline-marker.in_progress {
  animation: pulse 2s infinite;
}

.timeline-marker-logo {
  width: 36px;
  height: 36px;
  object-fit: contain;
  border-radius: 4px;
  border: none;
  outline: none;
}

.timeline-marker:has(.timeline-marker-logo) {
  border: none;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.timeline-content {
  flex: 1;
  min-width: 0;
}

.timeline-content .timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 6px;
  padding: 0;
  height: auto;
  background: transparent;
  border: none;
  border-radius: 0;
}

.timeline-tool {
  font-weight: 600;
  color: var(--flux-foreground);
  font-size: 14px;
}

.timeline-description {
  font-size: 12px;
  color: var(--flux-muted);
  margin-bottom: 8px;
  line-height: 1.4;
}

.timeline-meta {
  display: flex;
  gap: 12px;
  font-size: 11px;
  color: var(--flux-muted);
}

.timeline-time {
  font-weight: 500;
}

.load-more-container {
  padding: 20px 0 0;
  border-top: 1px solid var(--flux-border);
  flex-shrink: 0;
}

.load-more-btn {
  width: 100%;
  padding: 12px 20px;
  background: var(--flux-gradient);
  color: var(--flux-foreground);
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
  background: var(--flux-primary-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px var(--flux-primary-glow);
}

.load-more-btn:disabled {
  background: var(--flux-border);
  cursor: not-allowed;
  transform: none;
}

.no-more-hint {
  text-align: center;
  padding: 12px 0;
  font-size: 14px;
  color: var(--flux-muted);
}

.empty-timeline {
  text-align: center;
  padding: 40px 20px;
  color: var(--flux-muted);
}

.empty-timeline i {
  font-size: 2rem;
  margin-bottom: 12px;
  opacity: 0.5;
}

.right-main {
  flex: 1 1 0%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 20px;
  min-height: 0;
  height: 100%;
}

.tools-navigation {
  position: relative;
  z-index: 2;
  background: var(--flux-bg-elevated);
  border-bottom: 1px solid var(--flux-border-subtle);
  display: flex;
  flex-direction: column;
  min-height: fit-content;
  max-height: 40%;
  overflow-y: auto;
  border-radius: 12px 12px 0 0;
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
  background: var(--flux-card);
  border: 1px solid var(--flux-border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  color: var(--flux-muted);
  flex: 1;
  justify-content: center;
  min-width: 0;
}

.nav-tab:hover {
  background: var(--flux-card-hover);
  border-color: var(--flux-border);
  color: var(--flux-primary);
}

.nav-tab.active {
  background: var(--flux-primary);
  border-color: var(--flux-primary);
  color: var(--flux-foreground);
}

.nav-tab.active span,
.nav-tab.active i {
  color: var(--flux-foreground);
}

.nav-tab i {
  font-size: 16px;
}

.tool-count {
  background: rgba(255, 255, 255, 0.15);
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 500;
}

.nav-tab.active .tool-count {
  background: rgba(0, 0, 0, 0.2);
  color: var(--flux-foreground);
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
  background: var(--flux-card);
  border: 1px solid var(--flux-border);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 13px;
  color: var(--flux-muted);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;
  display: inline-block;
}

.sub-nav-item:hover {
  background: var(--flux-card-hover);
  border-color: var(--flux-primary);
  color: var(--flux-primary);
}

.sub-nav-item.active,
.sub-nav-item.router-link-active,
.sub-nav-item.router-link-exact-active {
  background: var(--flux-primary);
  border-color: var(--flux-primary);
  color: var(--flux-foreground);
}

.tool-interface {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--flux-bg);
  min-height: 0;
  height: 100%;
  overflow: hidden;
  border-radius: 0 0 12px 12px;
}

.tool-interface-slot {
  flex: 1;
  min-height: 0;
  min-width: 0;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 1024px) {
  .home-page--with-below .main-layout {
    height: auto;
    max-height: none;
    min-height: 70vh;
  }

  .main-layout {
    flex-direction: column;
    height: 100vh;
  }

  .left-sidebar {
    flex: 0 0 auto;
    width: 100%;
    max-width: none;
    height: 300px;
    border-right: none;
    border-bottom: 1px solid var(--flux-border-subtle);
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
