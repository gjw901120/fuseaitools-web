<template>
  <HomeLayout>
    <div class="tool-page">
      <MidjourneyTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import MidjourneyTool from '~/components/tools/MidjourneyTool.vue'

import { useToolSEO } from '~/composables/useToolSEO'

// SEO 优化
const seoConfig = useToolSEO({
  name: 'Midjourney',
  description: 'Use Midjourney for free online. Professional AI image generation tool creating high-quality artworks, illustrations, and creative designs. Supports multiple styles, aspect ratios, and artistic expressions. Perfect for artists and designers.',
  category: 'image',
  route: '/home/midjourney',
  keywords: ['Midjourney', 'AI image generation', 'art creation', 'AI painting', 'creative design', 'professional image generation', 'AI art', 'digital art', 'image creator'],
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






