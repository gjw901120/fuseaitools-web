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
  name: 'Hailuo Pro Image to Video Generator',
  description: 'High-fidelity image-to-video with Hailuo MiniMax Pro. Pay per video with credits.',
  category: 'video',
  route: '/home/hailuo/image-to-video-pro',
  keywords: ['Hailuo', 'MiniMax', 'Image to Video', 'AI video', '2.3 Pro'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'hailuo-2-3-image-to-video-pro', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
