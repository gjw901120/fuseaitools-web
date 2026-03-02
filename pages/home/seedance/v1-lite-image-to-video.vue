<template>
  <HomeLayout>
    <div class="tool-page">
      <SeedanceTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import SeedanceTool from '~/components/tools/SeedanceTool.vue'
import { useToolSEO } from '~/composables/useToolSEO'

const seoConfig = useToolSEO({
  name: 'Seedance v1 Lite Image to Video',
  description: 'Seedance v1 Lite Image to Video - Animate images with text. Resolution 480p/720p/1080p, 5s/10s, optional end image.',
  category: 'video',
  route: '/home/seedance/v1-lite-image-to-video',
  keywords: ['Seedance', 'Image to Video', 'AI video', 'v1-lite'],
  applicationCategory: 'VideoApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
