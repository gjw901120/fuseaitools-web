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
  name: 'Kling 2.6 Text to Video Generator',
  description: 'Generate text-to-video with Kling 2.6. Pay per video with credits.',
  category: 'video',
  route: '/home/kling/v2-6-text-to-video',
  keywords: ['Kling', 'Kuaishou', 'Text to Video', 'AI video', '2.6'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'kling-2.6-text-to-video', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
