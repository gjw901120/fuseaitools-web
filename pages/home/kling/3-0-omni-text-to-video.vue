<template>
  <HomeLayout>
    <div class="tool-page">
      <KlingTool />
    </div>
    <template #below-main>
      <Kling30OmniSeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import KlingTool from '~/components/tools/KlingTool.vue'
import Kling30OmniSeoContent from '~/components/tools/Kling30OmniSeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Kling 3.0 Omni Text to Video',
  description:
    'Kling 3.0 Omni Text to Video on FuseAITools—prompt up to 3072 chars, 3–15s at 720p/1080p/4K, native audio, smart or custom multi-shot, and subject elements. Billed per second. 20 free credits on sign-up.',
  category: 'video',
  route: '/home/kling/3-0-omni-text-to-video',
  keywords: ['Kling', 'Kuaishou', '3.0 Omni', 'Text to Video', 'AI video', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Text to Video',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per second with credits.',
  priceFromApi: { modelKey: 'kling-3.0-omni-text-to-video', eligibleQuantityName: 'Credits Required' }
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
