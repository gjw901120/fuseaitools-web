<template>
  <HomeLayout>
    <div class="tool-page">
      <SeedanceTool />
    </div>
    <template #below-main>
      <SeedanceV2SeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import SeedanceTool from '~/components/tools/SeedanceTool.vue'
import SeedanceV2SeoContent from '~/components/tools/SeedanceV2SeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Seedance 2 Fast Generator',
  description:
    'Seedance 2 Fast on FuseAITools—multimodal video with first/last frame and up to 3 reference videos. 4–15s at 480p/720p, prompts up to 20,000 chars. 20 free credits on sign-up.',
  category: 'video',
  route: '/home/seedance/v2-fast',
  keywords: ['Seedance 2 Fast', 'multimodal video', 'first last frame', 'AI video', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'seedance-2-fast', eligibleQuantityName: 'Credits Required' }
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
