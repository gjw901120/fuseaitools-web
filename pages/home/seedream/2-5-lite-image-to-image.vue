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
  name: 'Seedream 2.5 Lite Image to Image Generator',
  description: 'Edit images with text using Seedream 2.5 Lite. Pay per image with credits.',
  category: 'image',
  route: '/home/seedream/2-5-lite-image-to-image',
  keywords: ['Seedream', 'Image to Image', 'AI image', '2.5 Lite'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'seedream-5-lite-image-to-image', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
