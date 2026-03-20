<template>
  <HomeLayout>
    <div class="tool-page">
      <IdeogramTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import IdeogramTool from '~/components/tools/IdeogramTool.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Ideogram V3 Reframe',
  description: 'Reframe images with new aspect ratio and composition using Ideogram V3. Pay per image with credits.',
  category: 'image',
  route: '/home/ideogram/v3-reframe',
  keywords: ['Ideogram', 'V3', 'Reframe', 'AI image reframe', 'aspect ratio'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'ideogram-v3-reframe', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
