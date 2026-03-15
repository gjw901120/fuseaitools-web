<template>
  <HomeLayout>
    <div class="tool-page">
      <IdeogramTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import IdeogramTool from '~/components/tools/IdeogramTool.vue'
import { useToolSEO } from '~/composables/useToolSEO'

const seoConfig = useToolSEO({
  name: 'Ideogram V3 Text to Image',
  description: 'Ideogram V3 Text to Image - Generate images from text with style, size and rendering speed options.',
  category: 'image',
  route: '/home/ideogram/v3-text-to-image',
  keywords: ['Ideogram', 'V3', 'Text to Image', 'AI image generation'],
  applicationCategory: 'GraphicsApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
