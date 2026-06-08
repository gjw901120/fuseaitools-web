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
  name: 'Nano Banana Text to Image',
  description:
    'Nano Banana text-to-image on FuseAITools—Google Gemini Flash Image with eleven aspect ratios and PNG/JPEG output. Prompts up to 5000 chars. 20 free credits on sign-up.',
  category: 'image',
  route: '/home/nano-banana/generate',
  keywords: ['Nano Banana', 'Gemini Flash Image', 'text to image', 'Google', 'AI image generation', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'nano-banana', eligibleQuantityName: 'Credits Required' }
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
