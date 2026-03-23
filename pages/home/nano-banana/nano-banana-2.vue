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
  name: 'Nano Banana 2 Image Generator',
  description: 'Generate images with Nano Banana 2 using text prompts and optional multi-image input (up to 14 images).',
  category: 'image',
  route: '/home/nano-banana/nano-banana-2',
  keywords: ['Nano Banana 2', 'AI image generation', 'multi-image input', 'image to image', 'text to image'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'nano-banana-2', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
