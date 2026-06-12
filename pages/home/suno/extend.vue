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
  name: 'Suno Music Extension',
  description:
    'Extend Suno tracks on FuseAITools—pick Audio ID from Music Generation, optional continueAt and custom style/title. Models V3.5–V5. 20 free credits on sign-up.',
  category: 'audio',
  route: '/home/suno/extend',
  keywords: ['Suno', 'Music Extension', 'extend AI music', 'continue song', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Music Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per generation with credits.',
  priceFromApi: { modelKey: 'suno_extend', eligibleQuantityName: 'Credits Required' }
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
