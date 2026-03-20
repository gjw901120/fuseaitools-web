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
  name: 'Suno Audio Cover',
  description: 'Recreate audio with Suno AI from uploaded cover. Pay per generation with credits.',
  category: 'audio',
  route: '/home/suno/upload-cover',
  keywords: ['Suno', 'Audio Cover', 'AI music'],
  applicationCategory: 'AudioApplication',
  applicationSubCategory: 'Audio Processing',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Consumes credits per generation. Credits are purchased separately.',
  priceFromApi: { modelKey: 'suno_upload_cover', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
