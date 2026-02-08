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
  name: 'Nano Banana',
  description: 'Use Nano Banana for free online. Lightweight AI image generation tool that quickly generates high-quality images. Supports multiple sizes, formats, and styles.',
  category: 'image',
  route: '/home/nano-banana/generate',
  keywords: ['Nano Banana', 'AI image generation', 'lightweight image', 'AI creation', 'image generation tool'],
  applicationCategory: 'GraphicsApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
