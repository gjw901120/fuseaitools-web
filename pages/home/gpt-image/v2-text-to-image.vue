<template>
  <HomeLayout>
    <div class="tool-page">
      <GPTImageTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import GPTImageTool from '~/components/tools/GPTImageTool.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'GPT Image v2 Text to Image Generator',
  description: 'Generate images from text with GPT Image v2. Supports up to 20000 prompt characters, multiple aspect ratios, and 1K/2K/4K resolution options.',
  category: 'image',
  route: '/home/gpt-image/v2-text-to-image',
  keywords: ['GPT Image v2', 'OpenAI', 'Text to Image', 'AI image generation', '4K'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'gpt-image-2-text-to-image', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
