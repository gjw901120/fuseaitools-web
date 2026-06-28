<template>
  <HomeLayout>
    <div class="tool-page">
      <QwenTool />
    </div>
    <template #below-main>
      <QwenZImageSeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import QwenTool from '~/components/tools/QwenTool.vue'
import QwenZImageSeoContent from '~/components/tools/QwenZImageSeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Qwen Z-Image Generator',
  description: 'Fast text-to-image with Qwen Z-Image on FuseAITools—prompts up to 1000 chars, 5 aspect ratios (1:1, 4:3, 3:4, 16:9, 9:16), 3–15 second generation. Pay per image with credits; 20 free credits on sign-up.',
  category: 'image',
  route: '/home/qwen/z-image',
  keywords: ['Qwen', 'Z-Image', 'AI image', 'text to image', 'fast image generation', 'aspect ratio', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'qwen-z-image', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: auto; overflow: visible; }
</style>
