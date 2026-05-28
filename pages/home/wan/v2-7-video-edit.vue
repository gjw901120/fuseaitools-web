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
  name: 'Wan 2.7 Video Edit Generator',
  description:
    'Edit videos with natural language on Wan 2.7 Video Edit—upload footage, prompt changes, 0 or 2–10s output. FuseAITools credits.',
  category: 'video',
  route: '/home/wan/v2-7-video-edit',
  keywords: ['Wan 2.7', 'Wan', 'video edit', 'AI video editing', 'natural language video', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'wan-2-7-video-edit', eligibleQuantityName: 'Credits Required' }
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
