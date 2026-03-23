<template>
  <HomeLayout>
    <div class="tool-page">
      <Imagen4Tool />
    </div>
  </HomeLayout>
</template>

<script setup>
import Imagen4Tool from '~/components/tools/Imagen4Tool.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Imagen4 Fast',
  description: 'Fast Imagen4 image generation with prompt, negative prompt, aspect ratio, multi-image count, and seed.',
  category: 'image',
  route: '/home/imagen4/imagen4-fast',
  keywords: ['Imagen4 Fast', 'AI image', 'text to image'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'imagen4-fast', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
