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
  name: 'Seedance v1 Lite Text to Video',
  description: 'Seedance v1 Lite Text to Video - Generate AI video from text. Aspect ratio 16:9–9:21, 480p/720p/1080p, 5s/10s.',
  category: 'video',
  route: '/home/seedance/v1-lite-text-to-video',
  keywords: ['Seedance', 'Text to Video', 'AI video', 'v1-lite'],
  applicationCategory: 'VideoApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
