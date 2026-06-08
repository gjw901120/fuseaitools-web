<template>
  <HomeLayout>
    <div class="tool-page">
      <NanoBananaTool />
    </div>
    <template #below-main>
      <NanoBananaSeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import NanoBananaTool from '~/components/tools/NanoBananaTool.vue'
import NanoBananaSeoContent from '~/components/tools/NanoBananaSeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Nano Banana Pro Image Generator',
  description:
    'Nano Banana Pro on FuseAITools—1–10 reference images plus prompt, 1K/2K/4K resolution via Gemini Flash Image. Credit cost by resolution tier. 20 free credits on sign-up.',
  category: 'image',
  route: '/home/nano-banana/pro-generate',
  keywords: ['Nano Banana Pro', '4K image', 'Gemini Flash Image', 'high resolution', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'nano-banana-pro', eligibleQuantityName: 'Credits Required' }
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
