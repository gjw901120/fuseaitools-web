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
  name: 'Qwen Image Edit',
  description: 'Qwen Image Edit - Edit image with prompt. Size, steps, num images, sync mode, guidance.',
  category: 'image',
  route: '/home/qwen/image-edit',
  keywords: ['Qwen', 'Image Edit', 'AI image'],
  applicationCategory: 'ImageApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
