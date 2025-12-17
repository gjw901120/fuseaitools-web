<template>
  <div class="app-layout">
    <div class="layout-header">
      <AppHeader />
    </div>

    <main class="main-content">
      <!-- 主要内容区域使用 simply 样式容器 -->
      <div class="simply-layout">
        <slot />
      </div>
    </main>

    <div class="layout-footer">
      <AppFooter />
    </div>
  </div>
</template>

<script setup>
</script>

<style>
/* 添加 CSS 变量定义 */
:root {
  --content-max-width: 1600px;
  --container-padding: 4rem;
}

.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e5e7eb;
}

.main-content {
  flex: 1;
}

/* simply 样式的布局容器 - 只负责内边距，不限制宽度 */
.simply-layout {
  width: 100%;
}

.layout-footer {
  margin-top: auto;
}

/* 移动端响应式 */
@media (max-width: 768px) {
  :root {
    --container-padding: 1rem;
  }
}
</style>