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
  name: 'Seedance v1 Pro Image to Video Generator',
  description:
    'Seedance v1 Pro image-to-video on FuseAITools—animate one image with prompt, 5/10s at 480p–1080p. Camera fixed, seed, and safety checker for production work. 20 free credits on sign-up.',
  category: 'video',
  route: '/home/seedance/v1-pro-image-to-video',
  keywords: ['Seedance', 'Seedance v1 Pro', 'image to video', 'AI video animation', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'seedance-v1-pro-image-to-video', eligibleQuantityName: 'Credits Required' }
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
