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
  name: 'Seedance v1 Pro Fast Image to Video',
  description: 'Seedance v1 Pro Fast Image to Video - Fast image-to-video, 720p/1080p, 5s/10s.',
  category: 'video',
  route: '/home/seedance/v1-pro-fast-image-to-video',
  keywords: ['Seedance', 'Pro Fast Image to Video', 'AI video', 'v1-pro-fast'],
  applicationCategory: 'VideoApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
