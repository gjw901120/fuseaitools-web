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
  name: 'Kling AI Avatar Pro',
  description:
    'Kling AI Avatar Pro on FuseAITools—high-quality talking-head video from avatar image, audio, and prompt. 20 free credits on sign-up.',
  category: 'video',
  route: '/home/kling/ai-avatar-pro',
  keywords: ['Kling', 'AI Avatar Pro', 'talking head', 'Kuaishou', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'AI Avatar',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per generation with credits.',
  priceFromApi: { modelKey: 'kling-ai-avatar-pro', eligibleQuantityName: 'Credits Required' }
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
