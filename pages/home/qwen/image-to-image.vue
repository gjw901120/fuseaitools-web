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
  name: 'Qwen v1 Image to Image Generator',
  description: 'Transform a reference image with Qwen v1 Classic on FuseAITools—denoising strength 0–1, prompts up to 5000 chars, full steps/guidance/seed/acceleration controls. Pay per image with credits; 20 free credits on sign-up.',
  category: 'image',
  route: '/home/qwen/image-to-image',
  keywords: ['Qwen v1', 'Qwen', 'Image to Image', 'I2I', 'AI image editing', 'reference image', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'qwen-image-to-image', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: auto; overflow: visible; }
</style>
