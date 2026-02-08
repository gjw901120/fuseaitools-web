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
  name: 'Nano Banana Edit',
  description: 'Nano Banana Edit - Image to Image. Edit and generate images based on uploaded photos. Use for free online.',
  category: 'image',
  route: '/home/nano-banana/edit',
  keywords: ['Nano Banana Edit', 'Image to Image', 'AI image edit', 'image editing', 'AI art'],
  applicationCategory: 'GraphicsApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
