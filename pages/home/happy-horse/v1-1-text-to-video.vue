<template>
  <HomeLayout>
    <div class="tool-page">
      <HappyHorseTool />
    </div>
    <template #below-main>
      <HappyHorseV11SeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import HappyHorseTool from '~/components/tools/HappyHorseTool.vue'
import HappyHorseV11SeoContent from '~/components/tools/HappyHorseV11SeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'HappyHorse v1.1 Text to Video Generator',
  description:
    'HappyHorse v1.1 text-to-video on FuseAITools—nine aspect ratios (16:9 to 21:9), 3–15s at 720p/1080p. Credits per second; 20 free on sign-up.',
  category: 'video',
  route: '/home/happy-horse/v1-1-text-to-video',
  keywords: ['HappyHorse', 'HappyHorse v1.1', 'happyhorse-1-1-text-to-video', 'text to video', 'AI video generation', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'happyhorse-1-1-text-to-video', eligibleQuantityName: 'Credits Required' }
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
