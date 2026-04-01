<template>
  <HomeLayout>
    <div class="tool-page">
      <GrokTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import GrokTool from '~/components/tools/GrokToolCore.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Grok Text to Image',
  description: 'Generate images with Grok using detailed prompts and aspect-ratio controls.',
  category: 'image',
  route: '/home/grok/text-to-image',
  keywords: ['Grok', 'Text to Image', 'AI image generation'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.'
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
