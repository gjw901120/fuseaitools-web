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
  name: 'Grok Video 1.5 Preview Generator',
  description:
    'Grok Imagine Video 1.5 Preview on FuseAITools—one unified entry for text-to-video and image-to-video. Prompt up to 4096 chars or up to 7 reference images, 1-15s duration at 480p/720p, aspect ratio with auto, billed per second. 20 free credits on sign-up.',
  category: 'video',
  route: '/home/grok/video-1-5-preview',
  keywords: ['Grok', 'Grok Imagine', 'xAI', 'Video 1.5 Preview', 'text to video', 'image to video', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'grok-imagine-video-1-5-preview', eligibleQuantityName: 'Credits Required' }
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
