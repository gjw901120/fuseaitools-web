<template>
  <HomeLayout>
    <div class="tool-page">
      <SeedanceTool />
    </div>
    <template #below-main>
      <SeedanceV1LiteProSeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import SeedanceTool from '~/components/tools/SeedanceTool.vue'
import SeedanceV1LiteProSeoContent from '~/components/tools/SeedanceV1LiteProSeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Seedance v1 Lite Text to Video Generator',
  description:
    'Seedance v1 Lite text-to-video on FuseAITools—5/10s clips at 480p/720p/1080p with 16:9 through 9:21 aspect ratios. Camera fixed, seed, and safety checker. 20 free credits on sign-up.',
  category: 'video',
  route: '/home/seedance/v1-lite-text-to-video',
  keywords: ['Seedance', 'Seedance v1 Lite', 'text to video', 'AI video', '9:21 vertical', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'seedance-v1-lite-text-to-video', eligibleQuantityName: 'Credits Required' }
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
