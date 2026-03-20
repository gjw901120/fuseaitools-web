<template>
  <HomeLayout>
    <div class="tool-page">
      <MidjourneyTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import MidjourneyTool from '~/components/tools/MidjourneyTool.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Midjourney Imagine - AI Image Generator',
  description: 'Create images with Midjourney Imagine. Pay per image with credits.',
  category: 'image',
  route: '/home/midjourney/imagine',
  keywords: ['Midjourney', 'Imagine', 'AI image generation', 'art creation'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'midjourney_imagine', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
