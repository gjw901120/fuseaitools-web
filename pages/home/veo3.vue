<template>
  <HomeLayout>
    <div class="tool-page">
      <Veo3Tool />
    </div>
  </HomeLayout>
</template>

<script setup>
import Veo3Tool from '~/components/tools/Veo3Tool.vue'

import { useToolSEO } from '~/composables/useToolSEO'

// SEO 优化
const seoConfig = useToolSEO({
  name: 'Veo3',
  description: 'Use Veo3 for free online. Google\'s latest AI video generation tool creating high-quality video content from text or images. Supports multiple scenes, styles, and aspect ratios. Fast and standard models available.',
  category: 'video',
  route: '/home/veo3',
  keywords: ['Veo3', 'Google Veo3', 'Google AI video', 'AI video generation', 'text to video', 'image to video', 'video creation', 'Google AI', 'video production tool', 'AI video maker'],
  applicationCategory: 'VideoApplication',
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






