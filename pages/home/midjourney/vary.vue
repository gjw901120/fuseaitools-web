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
  name: 'Midjourney Vary - AI Image Variation',
  description: 'Enhance clarity and vary styles on Midjourney images. Pay per task with credits.',
  category: 'image',
  route: '/home/midjourney/vary',
  keywords: ['Midjourney', 'Vary', 'AI image', 'image variation'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per task with credits.',
  priceFromApi: { modelKey: 'midjourney_vary', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
