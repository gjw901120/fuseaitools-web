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
  name: 'Nano Banana 2.1 Image Generator',
  description:
    'Nano Banana 2.1 on FuseAITools—high-resolution 1K/2K/4K output, prompts up to 20k chars, optional 0–10 reference images, fifteen aspect ratios. Per-resolution credit pricing. 20 free credits on sign-up.',
  category: 'image',
  route: '/home/nano-banana/nano-banana-2-1',
  keywords: ['Nano Banana 2.1', '4K image generation', 'high resolution', 'AI image generation', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'nano-banana-2-1', eligibleQuantityName: 'Credits Required' }
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
