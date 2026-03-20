<template>
  <HomeLayout>
    <div class="tool-page">
      <HailuoTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import HailuoTool from '~/components/tools/HailuoTool.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Hailuo Standard Image to Video Generator',
  description: 'High-fidelity image-to-video with Hailuo MiniMax Standard. Pay per video with credits.',
  category: 'video',
  route: '/home/hailuo/image-to-video-standard',
  keywords: ['Hailuo', 'MiniMax', 'Image to Video', 'AI video', '2.3 Standard'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'hailuo-2-3-image-to-video-standard', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
