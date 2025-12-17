<template>
  <div class="tool-page">
    <NanoBananaTool />
  </div>
</template>

<script setup>
import NanoBananaTool from '~/components/tools/NanoBananaTool.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 监听路由变化，实现一级tab功能
const switchToMain = () => {
  router.push('/home/nano-banana')
}

// SEO 优化
useHead({
  title: 'Nano Banana - 轻量级AI图像生成 | SimplyAI Tools',
  meta: [
    {
      name: 'description',
      content: 'Nano Banana轻量级AI图像生成工具，快速生成高质量图像，支持多种尺寸和格式，简单易用的图像创作平台。'
    },
    {
      name: 'keywords',
      content: 'Nano Banana, AI图像生成, 轻量级图像, AI创作, 图像生成工具, 快速生成'
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
