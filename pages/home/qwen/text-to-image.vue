<template>
  <HomeLayout>
    <div class="tool-page">
      <QwenTool />
    </div>
    <template #below-main>
      <QwenV1SeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import QwenTool from '~/components/tools/QwenTool.vue'
import QwenV1SeoContent from '~/components/tools/QwenV1SeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Qwen v1 Text to Image Generator',
  description: 'Generate images from text with Qwen v1 Classic on FuseAITools—prompts up to 5000 chars, inference steps 2–250, guidance scale 0–20, acceleration, negative prompt, and seed control. Pay per image with credits; 20 free credits on sign-up.',
  category: 'image',
  route: '/home/qwen/text-to-image',
  keywords: ['Qwen v1', 'Qwen', 'Text to Image', 'T2I', 'AI image generation', 'image generator', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'qwen-text-to-image', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: auto; overflow: visible; }
</style>
