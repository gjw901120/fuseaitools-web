<template>
  <HomeLayout>
    <div class="tool-page">
      <WanTool />
    </div>
    <template #below-main>
      <Wan27ImageSeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import WanTool from '~/components/tools/WanTool.vue'
import Wan27ImageSeoContent from '~/components/tools/Wan27ImageSeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Wan 2.7 Image Generator',
  description:
    'Wan 2.7 Image on FuseAITools—text-to-image and editing with up to 9 reference images, 1K/2K output, eight aspect ratios, thinking mode and color palette. Pair with Wan video workflows. 20 free credits on sign-up.',
  category: 'image',
  route: '/home/wan/2-7-image',
  keywords: ['Wan', 'Wan 2.7 Image', 'AI image generation', 'image editing', 'Alibaba Wan', 'FuseAITools'],
  applicationCategory: 'DesignApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per generation with credits.',
  priceFromApi: { modelKey: 'wan-2-7-image', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page {
  width: 100%;
  height: auto;
  min-height: 100%;
  overflow: visible;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
}
</style>
