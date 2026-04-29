<template>
  <HomeLayout>
    <div class="tool-page">
      <HappyHorseTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import HappyHorseTool from '~/components/tools/HappyHorseTool.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'HappyHorse v1 Image to Video Generator',
  description: 'Generate AI videos from a single image with HappyHorse v1 image-to-video.',
  category: 'video',
  route: '/home/happy-horse/v1-image-to-video',
  keywords: ['HappyHorse', 'Image to Video', 'AI video generation'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'happyhorse-image-to-video', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
