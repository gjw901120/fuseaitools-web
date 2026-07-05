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
  name: 'Runway Aleph Video Generator',
  description:
    'Runway Aleph on FuseAITools—style-transform uploaded video (MP4/MOV/AVI, max 10MB) with prompts, optional reference image, seed, and aspect ratio. Per-run credits; 20 free on sign-up.',
  category: 'video',
  route: '/home/runway/aleph',
  keywords: ['Runway', 'Runway Aleph', 'video style transfer', 'AI video transform', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'runway_aleph', eligibleQuantityName: 'Credits Required' }
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
