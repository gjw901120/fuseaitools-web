<template>
  <HomeLayout>
    <div class="tool-page">
      <SunoTool />
    </div>
    <template #below-main>
      <SunoSeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import SunoTool from '~/components/tools/SunoTool.vue'
import SunoSeoContent from '~/components/tools/SunoSeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Suno Accompaniment',
  description:
    'Suno Accompaniment on FuseAITools—add backing instruments to uploaded audio via include/exclude tags (no prompt). Models V3.5–V5. 20 free credits on sign-up.',
  category: 'audio',
  route: '/home/suno/add-instrumental',
  keywords: ['Suno', 'Accompaniment', 'add instrumental', 'AI music', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Music Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per generation with credits.',
  priceFromApi: { modelKey: 'suno_add_instrumental', eligibleQuantityName: 'Credits Required' }
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
