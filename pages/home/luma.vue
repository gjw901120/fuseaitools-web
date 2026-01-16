<template>
  <HomeLayout>
    <div class="tool-page">
      <LumaTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import LumaTool from '~/components/tools/LumaTool.vue'

import { useToolSEO } from '~/composables/useToolSEO'

// SEO 优化
const seoConfig = useToolSEO({
  name: 'Luma',
  description: 'Use Luma for free online. 3D AI video generation tool creating realistic 3D video content from text or images. Supports multiple 3D scenes, effects, and video modification. Revolutionary 3D video creation experience.',
  category: 'video',
  route: '/home/luma',
  keywords: ['Luma', '3D AI video', '3D video generation', 'AI 3D', '3D video production', '3D video creation', 'video modification', 'AI video', '3D video maker'],
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






