<template>
  <div class="tool-page">
    <ClientOnly>
      <RunwayTool />
      <template #fallback>
        <div style="padding: 20px; text-align: center;">Loading Runway Tool...</div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup>
import RunwayTool from '~/components/tools/RunwayTool.vue'

// SEO 优化
useHead({
  title: 'Runway - AI视频编辑工具 | SimplyAI Tools',
  meta: [
    {
      name: 'description',
      content: 'Runway AI视频编辑工具，提供强大的视频生成和编辑功能，支持多种视频格式，专业视频制作平台。'
    },
    {
      name: 'keywords',
      content: 'Runway, AI视频编辑, 视频生成, AI视频制作, 视频编辑工具, 视频创作'
    }
  ]
})
</script>

<style scoped>
.tool-page {
  width: 100%;
  height: 100vh;
}
</style>






