<template>
  <div class="tool-category">
    <div class="category-header">
      <i :class="category.icon"></i>
      <h3>{{ category.title }}</h3>
    </div>
    <div class="tools-list">
      <div
          v-for="(tool, index) in category.tools"
          :key="index"
          class="tool-item"
      >
        {{ tool }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  category: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.tool-category {
  background: white;
  padding: 1.05rem; /* 1.5rem * 0.7 */
  border-radius: 8.4px; /* 12px * 0.7 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  width: 70%; /* 缩小宽度30% */
  margin: 0 auto;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 0.525rem; /* 0.75rem * 0.7 */
  margin-bottom: 0.7rem; /* 1rem * 0.7 */
  padding-bottom: 0.525rem; /* 0.75rem * 0.7 */
  border-bottom: 2px solid #f3f4f6;
}

.category-header i {
  color: #667eea;
  font-size: 0.875rem; /* 1.25rem * 0.7 */
}

.category-header h3 {
  font-size: 0.77rem; /* 1.1rem * 0.7 */
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.tools-list {
  display: grid;
  gap: 0.35rem; /* 0.5rem * 0.7 */
}

.tool-item {
  padding: 0.35rem 0.525rem; /* 0.5rem * 0.7, 0.75rem * 0.7 */
  background: #f8fafc;
  border-radius: 4.2px; /* 6px * 0.7 */
  font-size: 0.63rem; /* 0.9rem * 0.7 */
  color: #4b5563;
  transition: all 0.2s ease;
  cursor: pointer;
}

.tool-item:hover {
  background: #667eea;
  color: white;
  transform: translateY(-1px);
}
</style>