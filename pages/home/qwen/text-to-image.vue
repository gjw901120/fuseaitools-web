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
  name: 'Qwen Text to Image',
  description: 'Qwen Text to Image - Generate images from text. Size, steps, guidance scale, seed, output format.',
  category: 'image',
  route: '/home/qwen/text-to-image',
  keywords: ['Qwen', 'Text to Image', 'AI image'],
  applicationCategory: 'ImageApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
