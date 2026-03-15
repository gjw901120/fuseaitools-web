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
  name: 'GPT Image Image to Image',
  description: 'GPT Image Image to Image - Edit or transform images using a reference image and prompt.',
  category: 'image',
  route: '/home/gpt-image/image-to-image',
  keywords: ['GPT Image', 'OpenAI', 'Image to Image', 'AI image editing'],
  applicationCategory: 'GraphicsApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
