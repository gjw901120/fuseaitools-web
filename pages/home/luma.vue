<template>
  <div class="tool-page">
    <LumaTool />
  </div>
</template>

<script setup>
import LumaTool from '~/components/tools/LumaTool.vue'

// SEO 优化
useHead({
  title: 'Luma - 3D AI视频生成工具 | SimplyAI Tools',
  meta: [
    {
      name: 'description',
      content: 'Luma 3D AI视频生成工具，创造逼真的3D视频内容，支持多种3D场景和效果，革命性的3D视频创作体验。'
    },
    {
      name: 'keywords',
      content: 'Luma, 3D AI视频, 3D视频生成, AI 3D, 3D视频制作, 3D视频创作'
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






