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
  name: 'HappyHorse v1 Reference to Video Generator',
  description: 'Generate AI videos from multiple reference images with HappyHorse v1 reference-to-video.',
  category: 'video',
  route: '/home/happy-horse/v1-reference-to-video',
  keywords: ['HappyHorse', 'Reference to Video', 'AI video generation'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'happyhorse-reference-to-video', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
