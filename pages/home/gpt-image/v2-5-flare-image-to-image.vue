<template>
  <HomeLayout>
    <div class="tool-page">
      <GPTImageTool />
    </div>
    <template #below-main>
      <GptImageV2SeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import GPTImageTool from '~/components/tools/GPTImageTool.vue'
import GptImageV2SeoContent from '~/components/tools/GptImageV2SeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'GPT Image 2.5 Flare Image to Image Generator',
  description: 'Edit images with GPT Image 2.5 Flare. Upload up to 16 reference images, prompt up to 20000 characters, 13 aspect ratios, and 1K/2K/4K resolution tiers.',
  category: 'image',
  route: '/home/gpt-image/v2-5-flare-image-to-image',
  keywords: ['GPT Image 2.5 Flare', 'OpenAI', 'Image to Image', 'AI image editing', 'multi-reference'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'gpt-image-2-5-flare-image-to-image', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
