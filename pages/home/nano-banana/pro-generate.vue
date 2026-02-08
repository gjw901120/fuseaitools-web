<template>
  <HomeLayout>
    <div class="tool-page">
      <NanoBananaTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import NanoBananaTool from '~/components/tools/NanoBananaTool.vue'
import { useToolSEO } from '~/composables/useToolSEO'

const seoConfig = useToolSEO({
  name: 'Nano Banana Pro',
  description: 'Nano Banana Pro - Advanced AI image generation with higher resolution (1K/2K/4K). Use for free online.',
  category: 'image',
  route: '/home/nano-banana/pro-generate',
  keywords: ['Nano Banana Pro', 'AI image generation', 'high resolution', '4K image', 'AI art'],
  applicationCategory: 'GraphicsApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
