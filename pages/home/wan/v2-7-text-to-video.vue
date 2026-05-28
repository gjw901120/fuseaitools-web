<template>
  <HomeLayout>
    <div class="tool-page">
      <WanTool />
    </div>
    <template #below-main>
      <Wan27VideoSeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import WanTool from '~/components/tools/WanTool.vue'
import Wan27VideoSeoContent from '~/components/tools/Wan27VideoSeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Wan 2.7 Text to Video Generator',
  description:
    'Wan 2.7 text-to-video on FuseAITools—2–15s clips, aspect ratios, optional audio and prompt extend. Cloud credits; 20 free on sign-up.',
  category: 'video',
  route: '/home/wan/v2-7-text-to-video',
  keywords: ['Wan 2.7', 'Wan', 'text to video', 'AI video generation', 'aspect ratio video', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'wan-2-7-text-to-video', eligibleQuantityName: 'Credits Required' }
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
