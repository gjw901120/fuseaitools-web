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
  name: 'Flux Kontext Image Generator',
  description: 'Generate and edit images with Flux Kontext. Pay per image with credits.',
  category: 'image',
  route: '/home/flux-kontext/generate',
  keywords: ['Flux Kontext', 'Flux 2', 'Black Forest Labs', 'AI image generation', 'image editing', 'photoreal', 'text rendering', 'AI tools', 'image generator', 'AI art'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'flux_kontext_pro', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
