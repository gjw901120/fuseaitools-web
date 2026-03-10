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
  description: 'Flux is Black Forest Labs\' advanced image generation model that delivers photoreal detail, strong multi-reference consistency, and accurate text rendering with flexible control.',
  category: 'image',
  route: '/home/flux-kontext/generate',
  keywords: ['Flux Kontext', 'Flux 2', 'Black Forest Labs', 'AI image generation', 'image editing', 'photoreal', 'text rendering', 'AI tools', 'image generator', 'AI art'],
  applicationCategory: 'GraphicsApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
