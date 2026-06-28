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
  name: 'Qwen v1 Image Edit',
  description: 'Edit images with natural language using Qwen v1 Classic on FuseAITools—prompts up to 2000 chars, 1–4 outputs, sync mode, steps 2–49, guidance scale. Pay per image with credits; 20 free credits on sign-up.',
  category: 'image',
  route: '/home/qwen/image-edit',
  keywords: ['Qwen v1', 'Qwen', 'Image Edit', 'AI image editor', 'image editing', 'natural language edit', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'qwen-image-edit', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: auto; overflow: visible; }
</style>
