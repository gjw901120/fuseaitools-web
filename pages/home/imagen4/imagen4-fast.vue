<template>
  <HomeLayout>
    <div class="tool-page">
      <Imagen4Tool />
    </div>
    <template #below-main>
      <Imagen4SeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import Imagen4Tool from '~/components/tools/Imagen4Tool.vue'
import Imagen4SeoContent from '~/components/tools/Imagen4SeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Imagen 4 Fast Text to Image Generator',
  description:
    'Imagen 4 Fast text-to-image on FuseAITools—1–4 images per prompt, integer seed, five aspect ratios (default 16:9). Pay with credits; 20 free credits on sign-up.',
  category: 'image',
  route: '/home/imagen4/imagen4-fast',
  keywords: ['Imagen 4 Fast', 'Imagen4', 'Google Imagen 4', 'batch image generation', 'text to image', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'imagen4-fast', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page {
  width: 100%;
  height: auto;
  min-height: 100%;
  overflow: visible;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
}
</style>
