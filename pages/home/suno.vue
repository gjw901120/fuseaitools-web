<template>
  <div class="tool-page">
    <SunoTool />
  </div>
</template>

<script setup>
import SunoTool from '~/components/tools/SunoTool.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// SEO 优化
useHead({
  title: 'Suno - AI音乐生成工具 | SimplyAI Tools',
  meta: [
    {
      name: 'description',
      content: '使用Suno AI模型生成高质量音乐，支持多种风格和自定义参数，从简化模式到高级自定义模式，满足不同音乐创作需求。'
    },
    {
      name: 'keywords',
      content: 'Suno, AI音乐生成, 音乐创作, 人工智能, 音乐制作, AI工具, 音乐合成'
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






