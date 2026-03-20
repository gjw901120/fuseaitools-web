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
  name: 'Nano Banana Pro Image Generator',
  description: 'Advanced AI image generation with higher resolution (1K/2K/4K) using Nano Banana Pro. Pay per image with credits.',
  category: 'image',
  route: '/home/nano-banana/pro-generate',
  keywords: ['Nano Banana Pro', 'AI image generation', 'high resolution', '4K image', 'AI art'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'nano-banana-pro', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
