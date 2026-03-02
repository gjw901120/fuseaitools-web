<template>
  <HomeLayout>
    <div class="tool-page">
      <SeedreamTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import SeedreamTool from '~/components/tools/SeedreamTool.vue'
import { useToolSEO } from '~/composables/useToolSEO'

const seoConfig = useToolSEO({
  name: 'Seedream 1.5 Lite Text to Image',
  description: 'Seedream 1.5 Lite Text to Image - Generate 2K/3K images from text. Aspect ratio 1:1 to 21:9, prompt max 2995 characters.',
  category: 'image',
  route: '/home/seedream/1-5-lite-text-to-image',
  keywords: ['Seedream', 'Text to Image', 'AI image', '1.5 Lite'],
  applicationCategory: 'ImageApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
