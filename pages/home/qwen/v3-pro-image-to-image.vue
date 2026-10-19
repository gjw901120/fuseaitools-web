<template>
  <HomeLayout>
    <div class="tool-page">
      <QwenTool />
    </div>
    <template #below-main>
      <QwenV3SeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import QwenTool from '~/components/tools/QwenTool.vue'
import QwenV3SeoContent from '~/components/tools/QwenV3SeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

definePageMeta({
  path: '/home/qwen/v3-pro-image-to-image'
})

const seoConfig = await useToolSEOAsync({
  name: 'Qwen v3 Pro Image to Image',
  description: 'Qwen v3 Pro Image to Image on FuseAITools—the premium tier with 1–3 input images, prompts up to 5000 chars, 1K/2K resolution, smart prompt rewriting, negative prompt, and PNG/JPEG output. Billed by resolution with credits; 20 free credits on sign-up.',
  category: 'image',
  route: '/home/qwen/v3-pro-image-to-image',
  keywords: ['Qwen v3 Pro', 'Qwen3 Pro', 'Image to Image', 'I2I', 'premium image editing', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Billed by resolution (1K/2K) with credits.',
  priceFromApi: { modelKey: 'qwen3-pro-image-to-image', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: auto; overflow: visible; }
</style>
