<template>
  <HomeLayout>
    <div class="tool-page">
      <Veo3Tool />
    </div>
  </HomeLayout>
</template>

<script setup>
import Veo3Tool from '~/components/tools/Veo3Tool.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Veo 3 Video Extend',
  description: 'Extend video duration or content from existing clips using Google Veo 3. Pay per extend with credits.',
  category: 'video',
  route: '/home/veo3/extend',
  keywords: ['Veo3', 'Video Extend', 'extend video', 'AI video'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per extend with credits.',
  priceFromApi: { modelKey: 'veo3_extend', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
