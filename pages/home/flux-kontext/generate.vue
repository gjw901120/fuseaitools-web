<template>
  <HomeLayout>
    <div class="tool-page">
      <FluxKontextTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import FluxKontextTool from '~/components/tools/FluxKontextTool.vue'
import { useToolSEO } from '~/composables/useToolSEO'

const seoConfig = useToolSEO({
  name: 'Flux Kontext',
  description: 'Use Flux Kontext for free online. Generate high-quality AI images using Flux Kontext model, supporting both image generation and editing modes. Multiple aspect ratios, output formats, and creative styles available.',
  category: 'image',
  route: '/home/flux-kontext/generate',
  keywords: ['Flux Kontext', 'Flux', 'AI image generation', 'image editing', 'artificial intelligence', 'image creation', 'AI tools', 'Flux AI', 'image generator', 'AI art'],
  applicationCategory: 'GraphicsApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
