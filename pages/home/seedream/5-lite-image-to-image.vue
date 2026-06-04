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
  name: 'Seedream 5 Lite Image to Image Generator',
  description:
    'Seedream 5 Lite image-to-image on FuseAITools—edit 1–5 images with prompts up to 2996 chars. Basic 2K or High 3K, nine aspect ratios. Pair with Seedance video. 20 free credits on sign-up.',
  category: 'image',
  route: '/home/seedream/5-lite-image-to-image',
  keywords: ['Seedream', 'Seedream 5 Lite', 'image to image', 'ByteDance', 'style transfer', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'seedream-5-lite-image-to-image', eligibleQuantityName: 'Credits Required' }
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
