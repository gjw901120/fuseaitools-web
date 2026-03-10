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
  description: 'Meet Nano Banana, Google\'s Gemini Flash Image model, now available via Fuse AI. Built for developers, it combines lightning-fast speed with Pro-level quality, accurate text rendering, strong character consistency, and scalable image generation and editing workflows.',
  category: 'image',
  route: '/home/nano-banana/generate',
  keywords: ['Nano Banana', 'Gemini Flash Image', 'Google', 'AI image generation', 'Fuse AI', 'image generation', 'image editing', 'AI tools', 'AI art'],
  applicationCategory: 'GraphicsApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
