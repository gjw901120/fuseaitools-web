<template>
  <HomeLayout>
    <div class="tool-page">
      <KlingTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import KlingTool from '~/components/tools/KlingTool.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Kling v2.5 Turbo Image to Video Pro',
  description: 'High-quality image-to-video with Kling v2.5 Turbo Pro. Pay per video with credits.',
  category: 'video',
  route: '/home/kling/v2-5-turbo-image-to-video-pro',
  keywords: ['Kling', 'Kuaishou', 'Image to Video', 'AI video', 'v2.5 Turbo'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'kling-v2-5-turbo-image-to-video-pro', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
