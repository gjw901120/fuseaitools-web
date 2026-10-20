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
  name: 'GPT Image 2.5 Sunburst Text to Image Generator',
  description: 'Generate images from text with GPT Image 2.5 Sunburst. Prompts up to 20000 characters, 13 aspect ratios, 1K/2K/4K resolution tiers, and optional background control at 1K.',
  category: 'image',
  route: '/home/gpt-image/v2-5-sunburst-text-to-image',
  keywords: ['GPT Image 2.5 Sunburst', 'OpenAI', 'Text to Image', 'AI image generation', 'transparent background'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'gpt-image-2-5-sunburst-text-to-image', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
