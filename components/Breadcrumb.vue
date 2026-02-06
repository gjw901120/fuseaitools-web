<template>
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <ol class="breadcrumb-list">
      <li class="breadcrumb-item">
        <NuxtLink to="/" class="breadcrumb-link">
          <i class="fas fa-home"></i>
          <span>Home</span>
        </NuxtLink>
      </li>
      <li class="breadcrumb-item">
        <NuxtLink to="/home" class="breadcrumb-link">
          <span>{{ categoryLabel }}</span>
        </NuxtLink>
      </li>
      <li class="breadcrumb-item" aria-current="page">
        <span class="breadcrumb-current">{{ currentPage }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  category: {
    type: String,
    required: true,
    validator: (value) => ['chat', 'image', 'audio', 'video'].includes(value)
  },
  currentPage: {
    type: String,
    required: true
  }
})

const categoryLabels = {
  chat: 'Chat AI',
  image: 'Image Generation',
  audio: 'Audio Processing',
  video: 'Video Generation'
}

const categoryLabel = computed(() => categoryLabels[props.category] || 'AI Tools')
</script>

<style scoped>
.breadcrumb {
  padding: 12px 0;
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-wrap: wrap;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #6b7280;
}

.breadcrumb-item:not(:last-child)::after {
  content: '/';
  margin-left: 8px;
  color: #d1d5db;
}

.breadcrumb-link {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #6b7280;
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb-link:hover {
  color: #3b82f6;
}

.breadcrumb-link i {
  font-size: 12px;
}

.breadcrumb-current {
  color: #1f2937;
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .breadcrumb {
    padding: 8px 0;
  }

  .breadcrumb-list {
    font-size: 12px;
    gap: 6px;
  }

  .breadcrumb-link span {
    display: none;
  }

  .breadcrumb-link i {
    display: block;
  }
}
</style>

