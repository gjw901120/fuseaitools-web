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
  name: 'GPT Image v2 Image to Image',
  description: 'Edit or transform images with GPT Image v2 image-to-image model using reference image and prompt.',
  category: 'image',
  route: '/home/gpt-image/v2-image-to-image',
  keywords: ['GPT Image v2', 'OpenAI', 'Image to Image', 'AI image editing'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'gpt-image-2-image-to-image', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
