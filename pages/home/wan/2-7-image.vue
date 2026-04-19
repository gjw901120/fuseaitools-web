<template>
  <HomeLayout>
    <div class="tool-page">
      <WanTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import WanTool from '~/components/tools/WanTool.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Wan 2.7 Image Generator',
  description: 'Generate and edit images with Wan 2.7 Image. Supports optional reference images and advanced controls.',
  category: 'image',
  route: '/home/wan/2-7-image',
  keywords: ['Wan 2.7 Image', 'AI image generation', 'AI image editing', 'Wan image'],
  applicationCategory: 'DesignApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per generation with credits.',
  priceFromApi: { modelKey: 'wan-2-7-image', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
