<template>
  <HomeLayout>
    <div class="tool-page">
      <HappyHorseTool />
    </div>
    <template #below-main>
      <HappyHorseV1SeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import HappyHorseTool from '~/components/tools/HappyHorseTool.vue'
import HappyHorseV1SeoContent from '~/components/tools/HappyHorseV1SeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'HappyHorse v1 Text to Video Generator',
  description:
    'HappyHorse v1 text-to-video on FuseAITools—native audio-video sync, 3–15s at 720p/1080p, five aspect ratios. Credits per second; 20 free on sign-up.',
  category: 'video',
  route: '/home/happy-horse/v1-text-to-video',
  keywords: ['HappyHorse', 'HappyHorse v1', 'text to video', 'audio video sync', 'AI video generation', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'happyhorse-text-to-video', eligibleQuantityName: 'Credits Required' }
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
