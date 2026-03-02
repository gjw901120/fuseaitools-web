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
  name: 'Seedance v1 Pro Text to Video',
  description: 'Seedance v1 Pro Text to Video - Pro text-to-video with 21:9–9:16, 480p/720p/1080p, 5s/10s.',
  category: 'video',
  route: '/home/seedance/v1-pro-text-to-video',
  keywords: ['Seedance', 'Pro Text to Video', 'AI video', 'v1-pro'],
  applicationCategory: 'VideoApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
