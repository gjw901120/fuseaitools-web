<template>
  <HomeLayout>
    <div class="tool-page">
      <QwenTool />
    </div>
    <template #below-main>
      <QwenV2SeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import QwenTool from '~/components/tools/QwenTool.vue'
import QwenV2SeoContent from '~/components/tools/QwenV2SeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

definePageMeta({
  path: '/home/qwen/v2-text-to-image'
})

const seoConfig = await useToolSEOAsync({
  name: 'Qwen v2 Text to Image',
  description: 'Generate images with Qwen v2 on FuseAITools—prompts up to 800 chars, 5 aspect ratios (1:1–16:9), seed control, PNG/JPEG output. Pay per image with credits; 20 free credits on sign-up.',
  category: 'image',
  route: '/home/qwen/v2-text-to-image',
  keywords: ['Qwen v2', 'Qwen2', 'Text to Image', 'T2I', 'AI image generation', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'qwen2-text-to-image', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: auto; overflow: visible; }
</style>
