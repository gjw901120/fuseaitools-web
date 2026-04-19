<template>
  <HomeLayout>
    <div class="tool-page">
      <WanTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import WanTool from '~/components/tools/WanTool.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Wan 2.7 Image to Video Generator',
  description: 'Generate videos from frame/video/audio references with Wan 2.7 image-to-video model.',
  category: 'video',
  route: '/home/wan/v2-7-image-to-video',
  keywords: ['Wan 2.7', 'Image to Video', 'AI video'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'wan-2-7-image-to-video', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
