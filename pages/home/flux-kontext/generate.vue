<template>
  <HomeLayout>
    <div class="tool-page">
      <FluxKontextTool />
    </div>
    <template #below-main>
      <FluxKontextV1SeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import FluxKontextTool from '~/components/tools/FluxKontextTool.vue'
import FluxKontextV1SeoContent from '~/components/tools/FluxKontextV1SeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Flux Kontext Image Generator',
  description:
    'Flux Kontext Pro and Max on FuseAITools—text-to-image and single-image edit with six aspect ratios, safety controls, and prompt enhancement. 20 free credits on sign-up.',
  category: 'image',
  route: '/home/flux-kontext/generate',
  keywords: ['Flux Kontext', 'Black Forest Labs', 'AI image generation', 'image editing', 'flux_kontext_pro', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'flux_kontext_pro', eligibleQuantityName: 'Credits Required' }
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
