<template>
  <HomeLayout>
    <div class="tool-page">
      <KlingTool />
    </div>
    <template #below-main>
      <KlingV25TurboSeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import KlingTool from '~/components/tools/KlingTool.vue'
import KlingV25TurboSeoContent from '~/components/tools/KlingV25TurboSeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Kling v2.5 Turbo Text to Video Pro',
  description:
    'Kling v2.5 Turbo T2V Pro on FuseAITools—text-to-video with 16:9/9:16/1:1, 5/10s duration, negative prompt and CFG scale. 20 free credits on sign-up.',
  category: 'video',
  route: '/home/kling/v2-5-turbo-text-to-video-pro',
  keywords: ['Kling', 'Kuaishou', 'Text to Video', 'v2.5 Turbo', 'T2V Pro', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Text to Video',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'kling-v2-5-turbo-text-to-video-pro', eligibleQuantityName: 'Credits Required' }
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
