<template>
  <HomeLayout>
    <div class="tool-page">
      <KlingTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import KlingTool from '~/components/tools/KlingTool.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Kling 3.0 Motion Control',
  description: 'Generate motion-controlled videos from one image and one video using Kling 3.0. Support std/pro quality and background source control.',
  category: 'video',
  route: '/home/kling/v3-0-motion-control',
  keywords: ['Kling', 'Kuaishou', '3.0 Motion Control', 'AI video', 'Motion Control'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'kling-3.0-motion-control', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
