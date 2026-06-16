<template>
  <HomeLayout>
    <div class="tool-page">
      <FluxKontextTool />
    </div>
    <template #below-main>
      <FluxKontextV2SeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import FluxKontextTool from '~/components/tools/FluxKontextTool.vue'
import FluxKontextV2SeoContent from '~/components/tools/FluxKontextV2SeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Flux 2 Image to Image Generator',
  description:
    'Flux 2 image-to-image on FuseAITools—1–8 reference images, prompt 3–5000 chars, 1K/2K and eight aspect ratios plus auto. 20 free credits on sign-up.',
  category: 'image',
  route: '/home/flux-kontext/flux-2-image-to-image',
  keywords: ['Flux 2', 'Image to Image', 'multi-reference', 'Black Forest Labs', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'flux-2-image-to-image', eligibleQuantityName: 'Credits Required' }
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
