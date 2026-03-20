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
  name: 'Midjourney Upscale - AI Image Upscaler',
  description: 'Upscale Midjourney images. Pay per upscale with credits.',
  category: 'image',
  route: '/home/midjourney/upscale',
  keywords: ['Midjourney', 'Upscale', 'AI image', 'image upscale'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per upscale with credits.',
  priceFromApi: { modelKey: 'midjourney_upscale', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
