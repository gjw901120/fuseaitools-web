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
  name: 'Seedance v1 Pro Fast Image to Video Generator',
  description:
    'Ultra-fast Seedance v1 Pro Fast image-to-video on FuseAITools—one image plus prompt, 5/10s at 720p/1080p only. Streamlined form without seed or camera toggles. 20 free credits on sign-up.',
  category: 'video',
  route: '/home/seedance/v1-pro-fast-image-to-video',
  keywords: ['Seedance', 'Pro Fast', 'image to video', 'fast AI video', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'seedance-v1-pro-fast-image-to-video', eligibleQuantityName: 'Credits Required' }
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
