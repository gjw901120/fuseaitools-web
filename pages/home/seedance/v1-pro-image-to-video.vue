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
  name: 'Seedance v1 Pro Image to Video',
  description: 'Seedance v1 Pro Image to Video - Pro image-to-video with 480p/720p/1080p, 5s/10s, seed, safety checker.',
  category: 'video',
  route: '/home/seedance/v1-pro-image-to-video',
  keywords: ['Seedance', 'Pro Image to Video', 'AI video', 'v1-pro'],
  applicationCategory: 'VideoApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
