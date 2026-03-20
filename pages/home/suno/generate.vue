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
  name: 'Suno Music Generation',
  description: 'Create new music with Suno AI. Generate complete music from scratch. Pay per generation with credits.',
  category: 'audio',
  route: '/home/suno/generate',
  keywords: ['Suno', 'Music Generation', 'AI music', 'Create new music'],
  applicationCategory: 'AudioApplication',
  applicationSubCategory: 'Audio Processing',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Consumes credits per generation. Credits are purchased separately.',
  priceFromApi: { modelKey: 'suno_generate', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
