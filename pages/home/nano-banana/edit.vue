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
  name: 'Nano Banana Image to Image',
  description:
    'Nano Banana image-to-image on FuseAITools—edit 1–10 photos with natural-language prompts via Gemini Flash Image. Style transfer and detail polish. 20 free credits on sign-up.',
  category: 'image',
  route: '/home/nano-banana/edit',
  keywords: ['Nano Banana Edit', 'image to image', 'Gemini Flash Image', 'AI image edit', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'nano-banana-edit', eligibleQuantityName: 'Credits Required' }
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
