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
  name: 'Seedream 2.5 Lite Image to Image',
  description: 'Seedream 2.5 Lite Image to Image - Edit images with text. Upload image(s), aspect ratio 1:1–21:9, quality Basic/High, prompt max 2996 characters.',
  category: 'image',
  route: '/home/seedream/2-5-lite-image-to-image',
  keywords: ['Seedream', 'Image to Image', 'AI image', '2.5 Lite'],
  applicationCategory: 'ImageApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
