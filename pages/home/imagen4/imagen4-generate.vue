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
  name: 'Imagen4 Generate',
  description: 'Generate images with Imagen4 Generate using prompt, optional negative prompt, aspect ratio, and seed controls.',
  category: 'image',
  route: '/home/imagen4/imagen4-generate',
  keywords: ['Imagen4', 'text to image', 'AI image', 'Google Imagen 4'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'imagen4-generate', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
