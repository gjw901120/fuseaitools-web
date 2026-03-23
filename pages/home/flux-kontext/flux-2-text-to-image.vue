<template>
  <HomeLayout>
    <div class="tool-page">
      <FluxKontextTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import FluxKontextTool from '~/components/tools/FluxKontextTool.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Flux 2 Text to Image Generator',
  description: 'Generate images with Flux 2 text-to-image. Supports aspect ratio and 1K/2K resolution.',
  category: 'image',
  route: '/home/flux-kontext/flux-2-text-to-image',
  keywords: ['Flux 2', 'Text to Image', 'AI image', 'Flux Kontext'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'flux-2-text-to-image', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
