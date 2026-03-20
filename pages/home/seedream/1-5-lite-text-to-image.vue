<template>
  <HomeLayout>
    <div class="tool-page">
      <SeedreamTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import SeedreamTool from '~/components/tools/SeedreamTool.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Seedream 1.5 Lite Text to Image Generator',
  description: 'Generate 2K/3K images from text with Seedream 1.5 Lite. Pay per image with credits.',
  category: 'image',
  route: '/home/seedream/1-5-lite-text-to-image',
  keywords: ['Seedream', 'Text to Image', 'AI image', '1.5 Lite'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'seedream-5-lite-text-to-image', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
