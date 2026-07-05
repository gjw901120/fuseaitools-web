<template>
  <HomeLayout>
    <div class="tool-page">
      <RunwayTool />
    </div>
    <template #below-main>
      <RunwaySeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import RunwayTool from '~/components/tools/RunwayTool.vue'
import RunwaySeoContent from '~/components/tools/RunwaySeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Runway Video Extend',
  description:
    'Runway Extend on FuseAITools—continue a completed Runway Generate task with a prompt at 720p/1080p. Task ID from generate history; per-run credits; 20 free on sign-up.',
  category: 'video',
  route: '/home/runway/extend',
  keywords: ['Runway', 'Runway Extend', 'video extend', 'AI video continuation', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per extend with credits.',
  priceFromApi: { modelKey: 'runway_extend', eligibleQuantityName: 'Credits Required' }
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
