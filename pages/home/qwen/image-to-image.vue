<template>
  <HomeLayout>
    <div class="tool-page">
      <QwenTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import QwenTool from '~/components/tools/QwenTool.vue'
import { useToolSEO } from '~/composables/useToolSEO'

const seoConfig = useToolSEO({
  name: 'Qwen Image to Image',
  description: 'Qwen Image to Image - Generate from reference image and prompt. Strength, format, acceleration.',
  category: 'image',
  route: '/home/qwen/image-to-image',
  keywords: ['Qwen', 'Image to Image', 'AI image'],
  applicationCategory: 'ImageApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
