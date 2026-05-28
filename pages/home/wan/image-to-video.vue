<template>
  <HomeLayout>
    <div class="tool-page">
      <WanTool />
    </div>
    <template #below-main>
      <Wan26VideoSeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import WanTool from '~/components/tools/WanTool.vue'
import Wan26VideoSeoContent from '~/components/tools/Wan26VideoSeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Wan 2.6 Image to Video Generator',
  description:
    'Animate stills with Wan 2.6 image-to-video on FuseAITools—5/10/15s at 720p/1080p and multi-shot. Credit-based; 20 free credits for new users.',
  category: 'video',
  route: '/home/wan/image-to-video',
  keywords: ['Wan', 'Wan 2.6', 'image to video', 'animate image', 'AI video', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'wan-2-6-image-to-video', eligibleQuantityName: 'Credits Required' }
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
