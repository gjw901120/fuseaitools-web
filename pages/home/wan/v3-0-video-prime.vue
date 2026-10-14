<template>
  <HomeLayout>
    <div class="tool-page">
      <WanTool />
    </div>
    <template #below-main>
      <Wan30VideoSeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import WanTool from '~/components/tools/WanTool.vue'
import Wan30VideoSeoContent from '~/components/tools/Wan30VideoSeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Wan 3.0 Prime Video Generator',
  description:
    'Wan 3.0 Prime (high-speed) on FuseAITools—one entry for text-to-video, first/last frame, all-capability reference (Image1/Video1/Audio1), file, and link. Same contract as Wan 3.0, faster tier. 2–30s clips at 480p/720p/1080p with per-second credit pricing.',
  category: 'video',
  route: '/home/wan/v3-0-video-prime',
  keywords: ['Wan 3.0 Prime', 'Wan', 'wan-3-0-video-prime', 'fast video generation', 'reference to video', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per second of video with credits.',
  priceFromApi: { modelKey: 'wan-3-0-video-prime', eligibleQuantityName: 'Credits Required' }
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
