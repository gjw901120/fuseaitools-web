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
  name: 'Imagen 4 Generate Text to Image Generator',
  description:
    'Imagen 4 Generate text-to-image on FuseAITools—one balanced image per prompt (5000 chars), five aspect ratios, optional negative prompt and seed. 20 free credits on sign-up.',
  category: 'image',
  route: '/home/imagen4/imagen4-generate',
  keywords: ['Imagen 4', 'Imagen4 Generate', 'Google Imagen 4', 'text to image', 'AI image', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'imagen4-generate', eligibleQuantityName: 'Credits Required' }
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
