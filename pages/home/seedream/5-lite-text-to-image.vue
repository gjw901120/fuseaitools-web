<template>
  <HomeLayout>
    <div class="tool-page">
      <SeedreamTool />
    </div>
    <template #below-main>
      <Seedream5LiteSeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import SeedreamTool from '~/components/tools/SeedreamTool.vue'
import Seedream5LiteSeoContent from '~/components/tools/Seedream5LiteSeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Seedream 5 Lite Text to Image Generator',
  description:
    'Seedream 5 Lite text-to-image on FuseAITools—ByteDance 2K/3K images from prompts up to 2995 chars. Nine aspect ratios from 1:1 to 21:9. 20 free credits on sign-up.',
  category: 'image',
  route: '/home/seedream/5-lite-text-to-image',
  keywords: ['Seedream', 'Seedream 5 Lite', 'text to image', 'ByteDance', 'AI image', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'seedream-5-lite-text-to-image', eligibleQuantityName: 'Credits Required' }
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
