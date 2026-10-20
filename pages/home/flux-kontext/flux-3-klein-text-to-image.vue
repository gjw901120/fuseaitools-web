<template>
  <HomeLayout>
    <div class="tool-page">
      <FluxKontextTool />
    </div>
    <template #below-main>
      <Flux3KleinSeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import FluxKontextTool from '~/components/tools/FluxKontextTool.vue'
import Flux3KleinSeoContent from '~/components/tools/Flux3KleinSeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Flux 3 Klein Text to Image Generator',
  description:
    'Flux 3 Klein text-to-image on FuseAITools—prompts up to 5000 chars, 1K/2K/4K resolution, nine aspect ratios, and 1–4 images per run. Credits scale by resolution and image count. 20 free credits on sign-up.',
  category: 'image',
  route: '/home/flux-kontext/flux-3-klein-text-to-image',
  keywords: ['Flux 3 Klein', 'Text to Image', 'Black Forest Labs', '4K image', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'flux-3-klein-text-to-image', eligibleQuantityName: 'Credits Required' }
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
