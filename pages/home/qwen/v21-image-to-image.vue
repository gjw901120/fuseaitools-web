<template>
  <HomeLayout>
    <div class="tool-page">
      <QwenTool />
    </div>
    <template #below-main>
      <QwenV21SeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import QwenTool from '~/components/tools/QwenTool.vue'
import QwenV21SeoContent from '~/components/tools/QwenV21SeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

definePageMeta({
  path: '/home/qwen/v21-image-to-image'
})

const seoConfig = await useToolSEOAsync({
  name: 'Qwen v2.1 Image to Image',
  description: 'Qwen v2.1 Image to Image on FuseAITools—upload 1–10 reference images plus a prompt (up to 5000 chars), optional local-edit mask, 1K/2K resolution, PNG/WebP/JPEG output. Billed by resolution with credits; 20 free credits on sign-up.',
  category: 'image',
  route: '/home/qwen/v21-image-to-image',
  keywords: ['Qwen v2.1', 'Qwen2.1', 'Image to Image', 'I2I', 'image editing', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Billed by resolution (1K/2K) with credits.',
  priceFromApi: { modelKey: 'qwen2-1-image-to-image', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: auto; overflow: visible; }
</style>
