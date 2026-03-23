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
  name: 'Imagen4 Ultra',
  description: 'High-fidelity image generation with Imagen4 Ultra. Supports prompt, negative prompt, aspect ratio, and seed.',
  category: 'image',
  route: '/home/imagen4/imagen4-ultra',
  keywords: ['Imagen4 Ultra', 'AI image', 'Google Imagen 4 Ultra'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'imagen4-ultra', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
