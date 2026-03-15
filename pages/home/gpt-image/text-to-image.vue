<template>
  <HomeLayout>
    <div class="tool-page">
      <GPTImageTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import GPTImageTool from '~/components/tools/GPTImageTool.vue'
import { useToolSEO } from '~/composables/useToolSEO'

const seoConfig = useToolSEO({
  name: 'GPT Image Text to Image',
  description: 'GPT Image Text to Image - Generate images from text with aspect ratio and quality options.',
  category: 'image',
  route: '/home/gpt-image/text-to-image',
  keywords: ['GPT Image', 'OpenAI', 'Text to Image', 'AI image generation'],
  applicationCategory: 'GraphicsApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
