<template>
  <HomeLayout>
    <div class="tool-page">
      <LumaTool />
    </div>
    <template #below-main>
      <LumaSeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import LumaTool from '~/components/tools/LumaTool.vue'
import LumaSeoContent from '~/components/tools/LumaSeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Luma Video Modification',
  description:
    'Luma Dream Machine video modification on FuseAITools—upload MP4/MOV/AVI (max 500MB, 10s), describe changes in English, optional watermark. Per-run credits; 20 free on sign-up.',
  category: 'video',
  route: '/home/luma/generate',
  keywords: ['Luma', 'Luma Dream Machine', 'video modification', 'AI video edit', '3D video effects', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video modification with credits.',
  priceFromApi: { modelKey: 'Luma', eligibleQuantityName: 'Credits Required' }
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
