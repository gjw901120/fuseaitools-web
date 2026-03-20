<template>
  <HomeLayout>
    <div class="tool-page">
      <SunoTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import SunoTool from '~/components/tools/SunoTool.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Suno Music Extension',
  description: 'Extend existing music with Suno AI. Pay per extend with credits.',
  category: 'audio',
  route: '/home/suno/extend',
  keywords: ['Suno', 'Music Extension', 'AI music'],
  applicationCategory: 'AudioApplication',
  applicationSubCategory: 'Audio Processing',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Consumes credits per extend. Credits are purchased separately.',
  priceFromApi: { modelKey: 'suno_extend', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
