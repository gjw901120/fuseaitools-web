<template>
  <div class="tool-page">
    <FluxKontextTool />
  </div>
</template>

<script setup>
import FluxKontextTool from '~/components/tools/FluxKontextTool.vue'

// SEO 优化
useHead({
  title: 'Flux Kontext - AI图像生成工具 | SimplyAI Tools',
  meta: [
    {
      name: 'description',
      content: '使用Flux Kontext模型生成高质量AI图像，支持图像生成和编辑两种模式，提供多种长宽比和输出格式选择。'
    },
    {
      name: 'keywords',
      content: 'Flux Kontext, AI图像生成, 图像编辑, 人工智能, 图像创作, AI工具'
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






