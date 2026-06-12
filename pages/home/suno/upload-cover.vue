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
  name: 'Suno Audio Cover',
  description:
    'Suno Audio Cover on FuseAITools—upload MP3/WAV/M4A (≤2 min) and reimagine style, title, and lyrics. Models V3.5–V5. 20 free credits on sign-up.',
  category: 'audio',
  route: '/home/suno/upload-cover',
  keywords: ['Suno', 'Audio Cover', 'AI music cover', 'style transfer music', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Music Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per generation with credits.',
  priceFromApi: { modelKey: 'suno_upload_cover', eligibleQuantityName: 'Credits Required' }
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
