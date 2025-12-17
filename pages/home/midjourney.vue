<template>
  <div class="tool-page">
    <MidjourneyTool />
  </div>
</template>

<script setup>
import MidjourneyTool from '~/components/tools/MidjourneyTool.vue'

// SEO 优化
useHead({
  title: 'Midjourney - 专业AI图像生成工具 | SimplyAI Tools',
  meta: [
    {
      name: 'description',
      content: 'Midjourney专业AI图像生成工具，创造高质量艺术作品，支持多种风格和创意表达，艺术家和设计师的首选工具。'
    },
    {
      name: 'keywords',
      content: 'Midjourney, AI图像生成, 艺术创作, AI绘画, 创意设计, 专业图像生成'
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






