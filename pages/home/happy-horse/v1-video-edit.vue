<template>
  <HomeLayout>
    <div class="tool-page">
      <HappyHorseTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import HappyHorseTool from '~/components/tools/HappyHorseTool.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'HappyHorse v1 Video Edit',
  description: 'Edit existing videos with HappyHorse v1 video-edit model.',
  category: 'video',
  route: '/home/happy-horse/v1-video-edit',
  keywords: ['HappyHorse', 'Video Edit', 'AI video editing'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'happyhorse-video-edit', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
