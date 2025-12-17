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
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #f3f4f6;
}

.category-header i {
  color: #667eea;
  font-size: 1.25rem;
}

.category-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.tools-list {
  display: grid;
  gap: 0.5rem;
}

.tool-item {
  padding: 0.5rem 0.75rem;
  background: #f8fafc;
  border-radius: 6px;
  font-size: 0.9rem;
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