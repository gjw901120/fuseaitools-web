<template>
  <HomeLayout>
    <div class="tool-page">
      <KlingTool />
    </div>
    <template #below-main>
      <KlingV3TurboSeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import KlingTool from '~/components/tools/KlingTool.vue'
import KlingV3TurboSeoContent from '~/components/tools/KlingV3TurboSeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Kling V3 Turbo Text to Video',
  description:
    'Kling V3 Turbo Text to Video on FuseAITools—fast text-to-video with 3–15s clips, 720p/1080p, aspect 1:1/16:9/9:16, billed per second. 20 free credits on sign-up.',
  category: 'video',
  route: '/home/kling/v3-turbo-text-to-video',
  keywords: ['Kling', 'Kuaishou', 'V3 Turbo', 'Text to Video', 'AI video', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Text to Video',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per second with credits.',
  priceFromApi: { modelKey: 'kling-v3-turbo-text-to-video', eligibleQuantityName: 'Credits Required' }
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
