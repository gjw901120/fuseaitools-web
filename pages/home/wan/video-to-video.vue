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
  name: 'Wan 2.6 Video to Video Generator',
  description:
    'Transform footage with Wan 2.6 video-to-video on FuseAITools—upload a clip, prompt changes, 5/10s at 720p/1080p. Credits per generation.',
  category: 'video',
  route: '/home/wan/video-to-video',
  keywords: ['Wan', 'Wan 2.6', 'video to video', 'video transform', 'AI video restyle', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'wan-2-6-video-to-video', eligibleQuantityName: 'Credits Required' }
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
