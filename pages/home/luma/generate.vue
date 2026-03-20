<template>
  <HomeLayout>
    <div class="tool-page">
      <LumaTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import LumaTool from '~/components/tools/LumaTool.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Luma 3D Video Generator',
  description: 'Create 3D AI video from text or images with Luma. Pay per video with credits.',
  category: 'video',
  route: '/home/luma/generate',
  keywords: ['Luma', '3D AI video', '3D video generation', 'AI 3D', '3D video production', '3D video creation', 'video modification', 'AI video', '3D video maker'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'Luma', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
