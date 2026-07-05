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
  name: 'Runway Video Generator',
  description:
    'Runway Generate on FuseAITools—text or image to 5s/10s video at 720p/1080p, five aspect ratios, optional watermark. Credits by duration and quality; 20 free on sign-up.',
  category: 'video',
  route: '/home/runway/generate',
  keywords: ['Runway', 'Runway Generate', 'text to video', 'image to video', 'AI video', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'runway_generate', eligibleQuantityName: 'Credits Required' }
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
