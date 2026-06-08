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
  name: 'Nano Banana 2 Image Generator',
  description:
    'Nano Banana 2 on FuseAITools—prompts up to 20k chars, optional 0–14 images, fifteen aspect ratios, 1K/2K/4K output. 20 free credits on sign-up.',
  category: 'image',
  route: '/home/nano-banana/nano-banana-2',
  keywords: ['Nano Banana 2', 'multi-image input', 'long prompt', 'AI image generation', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'nano-banana-2', eligibleQuantityName: 'Credits Required' }
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
