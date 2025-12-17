<template>
  <div class="tool-page">
    <GPT4oImageTool />
  </div>
</template>

<script setup>
import GPT4oImageTool from '~/components/tools/GPT4oImageTool.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 监听路由变化，实现一级tab功能
const switchToMain = () => {
  router.push('/home/gpt-4o-image')
}

// SEO 优化
useHead({
  title: 'GPT 4o Image - AI图像生成工具 | SimplyAI Tools',
  meta: [
    {
      name: 'description',
      content: '使用OpenAI的GPT 4o Image模型生成高质量AI图像，支持多种风格和场景，简单易用的图像生成工具。'
    },
    {
      name: 'keywords',
      content: 'GPT 4o Image, AI图像生成, OpenAI, 人工智能, 图像创作, AI工具'
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
