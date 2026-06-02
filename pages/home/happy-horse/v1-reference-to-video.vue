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
  name: 'HappyHorse v1 Reference to Video Generator',
  description:
    'HappyHorse v1 reference-to-video on FuseAITools—1–9 reference images, character placeholders, 3–15s at 720p/1080p. Cloud credits.',
  category: 'video',
  route: '/home/happy-horse/v1-reference-to-video',
  keywords: ['HappyHorse', 'HappyHorse v1', 'reference to video', 'multi character video', 'AI video', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'happyhorse-reference-to-video', eligibleQuantityName: 'Credits Required' }
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
