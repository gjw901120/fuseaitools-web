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
  name: 'Seedance 2 Generator',
  description:
    'Seedance 2 on FuseAITools—multimodal video with first/last frame and up to 5 reference videos plus audio refs. 4–15s at 480p/720p, prompts up to 20,000 chars. 20 free credits on sign-up.',
  category: 'video',
  route: '/home/seedance/v2',
  keywords: ['Seedance 2', 'multimodal video', 'reference video', 'AI video generation', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'seedance-2', eligibleQuantityName: 'Credits Required' }
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
