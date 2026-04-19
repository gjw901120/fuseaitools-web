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
  name: 'Wan 2.7 Image Pro Generator',
  description: 'Generate and edit high-quality images with Wan 2.7 Image Pro, including 4K support in eligible scenarios.',
  category: 'image',
  route: '/home/wan/2-7-image-pro',
  keywords: ['Wan 2.7 Image Pro', 'AI image generation', '4K AI image', 'Wan image pro'],
  applicationCategory: 'DesignApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per generation with credits.',
  priceFromApi: { modelKey: 'wan-2-7-image-pro', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
