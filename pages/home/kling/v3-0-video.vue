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
  name: 'Kling 3.0 Video Generator',
  description: 'Generate single-shot or multi-shot AI videos with Kling 3.0. Pay per video with credits.',
  category: 'video',
  route: '/home/kling/v3-0-video',
  keywords: ['Kling', 'Kuaishou', '3.0', 'AI video', 'multi-shot'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'kling-3.0-video', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
