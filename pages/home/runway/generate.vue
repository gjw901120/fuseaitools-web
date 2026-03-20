<template>
  <HomeLayout>
    <div class="tool-page">
      <RunwayTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import RunwayTool from '~/components/tools/RunwayTool.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Runway Video Generator',
  description: 'Generate AI video from text and images with Runway. Pay per video with credits.',
  category: 'video',
  route: '/home/runway/generate',
  keywords: ['Runway', 'Generate', 'AI video', 'text to video'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'runway_generate', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
