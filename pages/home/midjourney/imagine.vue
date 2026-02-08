<template>
  <HomeLayout>
    <div class="tool-page">
      <MidjourneyTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import MidjourneyTool from '~/components/tools/MidjourneyTool.vue'
import { useToolSEO } from '~/composables/useToolSEO'

const seoConfig = useToolSEO({
  name: 'Midjourney - Imagine',
  description: 'Create a new image generation task using the Midjourney AI model. Professional AI image generation.',
  category: 'image',
  route: '/home/midjourney/imagine',
  keywords: ['Midjourney', 'Imagine', 'AI image generation', 'art creation'],
  applicationCategory: 'GraphicsApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
