<template>
  <HomeLayout>
    <div class="tool-page">
      <NanoBananaTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import NanoBananaTool from '~/components/tools/NanoBananaTool.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Nano Banana Image Generator',
  description: 'Generate and edit images with Nano Banana (Gemini Flash Image). Pay per image with credits.',
  category: 'image',
  route: '/home/nano-banana/generate',
  keywords: ['Nano Banana', 'Gemini Flash Image', 'Google', 'AI image generation', 'Fuse AI', 'image generation', 'image editing', 'AI tools', 'AI art'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'nano-banana', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
