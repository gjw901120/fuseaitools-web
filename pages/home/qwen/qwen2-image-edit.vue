<template>
  <HomeLayout>
    <div class="tool-page">
      <QwenTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import QwenTool from '~/components/tools/QwenTool.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

definePageMeta({
  path: '/home/qwen/2-image-edit'
})

const seoConfig = await useToolSEOAsync({
  name: 'Qwen2 Image Edit',
  description: 'Edit images with qwen2/image-edit model. Pay per image with credits.',
  category: 'image',
  route: '/home/qwen/2-image-edit',
  keywords: ['Qwen2', 'Image Edit', 'AI image'],
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
