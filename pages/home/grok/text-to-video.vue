<template>
  <HomeLayout>
    <div class="tool-page">
      <GrokTool />
    </div>
    <template #below-main>
      <GrokVideoSeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import GrokTool from '~/components/tools/GrokToolCore.vue'
import GrokVideoSeoContent from '~/components/tools/GrokVideoSeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Grok Text to Video Generator',
  description:
    'Grok Imagine text-to-video on FuseAITools—prompt up to 5000 chars, fun/normal/spicy motion, 6s/10s at 480p/720p, five aspect ratios. 20 free credits on sign-up.',
  category: 'video',
  route: '/home/grok/text-to-video',
  keywords: ['Grok', 'Grok Imagine', 'xAI', 'Text to Video', 'AI video generation', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'grok-imagine-text-to-video', eligibleQuantityName: 'Credits Required' }
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
