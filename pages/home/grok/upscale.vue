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
  name: 'Grok Video Upscale',
  description:
    'Grok Imagine upscale on FuseAITools—enhance a completed Grok generation by task ID. Per-run credits on Generate. 20 free credits on sign-up.',
  category: 'video',
  route: '/home/grok/upscale',
  keywords: ['Grok', 'Grok Imagine', 'xAI', 'Video Upscale', 'AI video enhancement', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'grok-imagine-upscale', eligibleQuantityName: 'Credits Required' }
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
