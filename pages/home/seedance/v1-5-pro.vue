<template>
  <HomeLayout>
    <div class="tool-page">
      <SeedanceTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import SeedanceTool from '~/components/tools/SeedanceTool.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Seedance 1.5 Pro Video Generator',
  description: 'Generate videos with Seedance 1.5 Pro using text prompts or optional image references. Supports 4/8/12s, 480p/720p/1080p, fixed lens, and audio generation.',
  category: 'video',
  route: '/home/seedance/v1-5-pro',
  keywords: ['Seedance', '1.5 Pro', 'Text to Video', 'Image to Video', 'AI video'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'seedance-1.5-pro', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
