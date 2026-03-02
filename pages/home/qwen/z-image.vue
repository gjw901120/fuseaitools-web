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
  name: 'Qwen Z-Image',
  description: 'Qwen Z-Image - Text-to-image with aspect ratio. Prompt max 1000 characters.',
  category: 'image',
  route: '/home/qwen/z-image',
  keywords: ['Qwen', 'Z-Image', 'AI image'],
  applicationCategory: 'ImageApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
