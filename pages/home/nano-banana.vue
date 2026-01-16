<template>
  <HomeLayout>
    <div class="tool-page">
      <NanoBananaTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import NanoBananaTool from '~/components/tools/NanoBananaTool.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 监听路由变化，实现一级tab功能
const switchToMain = () => {
  router.push('/home/nano-banana')
}

import { useToolSEO } from '~/composables/useToolSEO'

// SEO 优化
const seoConfig = useToolSEO({
  name: 'Nano Banana',
  description: 'Use Nano Banana for free online. Lightweight AI image generation tool that quickly generates high-quality images. Supports multiple sizes, formats, and styles. Fast and easy-to-use image creation platform.',
  category: 'image',
  route: '/home/nano-banana',
  keywords: ['Nano Banana', 'AI image generation', 'lightweight image', 'AI creation', 'image generation tool', 'fast generation', 'quick image generator', 'AI art', 'image creator'],
  applicationCategory: 'GraphicsApplication',
  offers: {
    price: '0',
    priceCurrency: 'USD'
  }
})

useHead(seoConfig)
</script>

<style scoped>
.tool-page {
  width: 100%;
  height: 100%;
}
</style>
