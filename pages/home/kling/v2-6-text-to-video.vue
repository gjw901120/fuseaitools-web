<template>
  <HomeLayout>
    <div class="tool-page">
      <KlingTool />
    </div>
    <template #below-main>
      <KlingV26SeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import KlingTool from '~/components/tools/KlingTool.vue'
import KlingV26SeoContent from '~/components/tools/KlingV26SeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Kling 2.6 Text to Video',
  description:
    'Kling 2.6 Text to Video on FuseAITools—prompt-driven clips with optional sound, aspect 1:1/16:9/9:16, 5/10s duration. 20 free credits on sign-up.',
  category: 'video',
  route: '/home/kling/v2-6-text-to-video',
  keywords: ['Kling', 'Kuaishou', 'Text to Video', '2.6', 'AI video', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Text to Video',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'kling-2.6-text-to-video', eligibleQuantityName: 'Credits Required' }
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
