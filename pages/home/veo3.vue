<template>
  <div class="tool-page">
    <Veo3Tool />
  </div>
</template>

<script setup>
import Veo3Tool from '~/components/tools/Veo3Tool.vue'

// SEO 优化
useHead({
  title: 'Veo3 - Google AI视频生成工具 | SimplyAI Tools',
  meta: [
    {
      name: 'description',
      content: 'Veo3是Google最新的AI视频生成工具，创造高质量视频内容，支持多种场景和风格，革命性的视频创作体验。'
    },
    {
      name: 'keywords',
      content: 'Veo3, Google AI视频, AI视频生成, 视频创作, Google AI, 视频制作工具'
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






