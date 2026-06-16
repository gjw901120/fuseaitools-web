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
  name: 'Kling 2.6 Motion Control',
  description:
    'Kling 2.6 Motion Control on FuseAITools—transfer motion from reference video to a character image at 720p/1080p. Per-second pricing. 20 free credits on sign-up.',
  category: 'video',
  route: '/home/kling/v2-6-motion-control',
  keywords: ['Kling', 'Motion Control', '2.6', 'reference video', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Motion Control',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per second with credits.',
  priceFromApi: { modelKey: 'kling-2.6-motion-control', eligibleQuantityName: 'Credits Required' }
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
