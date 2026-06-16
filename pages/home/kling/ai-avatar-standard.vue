<template>
  <HomeLayout>
    <div class="tool-page">
      <KlingTool />
    </div>
    <template #below-main>
      <KlingAiAvatarSeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import KlingTool from '~/components/tools/KlingTool.vue'
import KlingAiAvatarSeoContent from '~/components/tools/KlingAiAvatarSeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Kling AI Avatar Standard',
  description:
    'Kling AI Avatar Standard on FuseAITools—talking-head video from avatar image, audio, and prompt up to 5000 chars. 20 free credits on sign-up.',
  category: 'video',
  route: '/home/kling/ai-avatar-standard',
  keywords: ['Kling', 'AI Avatar', 'talking head', 'lip sync', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'AI Avatar',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per generation with credits.',
  priceFromApi: { modelKey: 'kling-ai-avatar-standard', eligibleQuantityName: 'Credits Required' }
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
