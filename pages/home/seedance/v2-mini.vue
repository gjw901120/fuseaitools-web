<template>
  <HomeLayout>
    <div class="tool-page">
      <SeedanceTool />
    </div>
    <template #below-main>
      <SeedanceV2MiniSeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import SeedanceTool from '~/components/tools/SeedanceTool.vue'
import SeedanceV2MiniSeoContent from '~/components/tools/SeedanceV2MiniSeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Seedance 2 Mini Generator',
  description:
    'Seedance 2 Mini on FuseAITools—lightweight multimodal video with first/last frame and up to 3 reference videos. 4–15s at 480p/720p, prompts up to 20,000 chars. 20 free credits on sign-up.',
  category: 'video',
  route: '/home/seedance/v2-mini',
  keywords: ['Seedance 2 Mini', 'multimodal video', 'lightweight AI video', 'first last frame', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'seedance-2-mini', eligibleQuantityName: 'Credits Required' }
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
