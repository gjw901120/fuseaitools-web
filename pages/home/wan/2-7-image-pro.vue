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
  name: 'Wan 2.7 Image Pro Generator',
  description:
    'Wan 2.7 Image Pro on FuseAITools—4K stills when generating from prompt only, plus 1K/2K, up to 9 reference images, sequential mode, and advanced controls. Pair with Wan 2.7 I2V. 20 free credits on sign-up.',
  category: 'image',
  route: '/home/wan/2-7-image-pro',
  keywords: ['Wan', 'Wan 2.7 Image Pro', '4K AI image', 'AI image generation', 'FuseAITools'],
  applicationCategory: 'DesignApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per generation with credits.',
  priceFromApi: { modelKey: 'wan-2-7-image-pro', eligibleQuantityName: 'Credits Required' }
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
