<template>
  <HomeLayout>
    <div class="tool-page">
      <SeedanceTool />
    </div>
    <template #below-main>
      <SeedanceV15SeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import SeedanceTool from '~/components/tools/SeedanceTool.vue'
import SeedanceV15SeoContent from '~/components/tools/SeedanceV15SeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Seedance 1.5 Pro Video Generator',
  description:
    'Seedance 1.5 Pro on FuseAITools—unified text or image-to-video with 0–2 reference images, 4/8/12s at 480p–1080p. Optional audio and fixed lens. 20 free credits on sign-up.',
  category: 'video',
  route: '/home/seedance/v1-5-pro',
  keywords: ['Seedance', 'Seedance 1.5 Pro', 'text to video', 'image to video', 'AI video audio', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'seedance-1.5-pro', eligibleQuantityName: 'Credits Required' }
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
