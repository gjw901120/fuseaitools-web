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
  path: '/home/qwen/v2-image-edit'
})

const seoConfig = await useToolSEOAsync({
  name: 'Qwen v2 Image Edit',
  description: 'Edit images with Qwen v2 on FuseAITools—upload a reference image, prompt up to 800 chars, 8 aspect ratios including 21:9 ultra-wide, seed control. Pay per image with credits; 20 free credits on sign-up.',
  category: 'image',
  route: '/home/qwen/v2-image-edit',
  keywords: ['Qwen v2', 'Qwen2', 'Image Edit', 'AI image editor', 'image editing', '21:9', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'qwen2-image-edit', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: auto; overflow: visible; }
</style>
