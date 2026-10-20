<template>
  <HomeLayout>
    <div class="tool-page">
      <GrokTool />
    </div>
    <template #below-main>
      <GrokImageSeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import GrokTool from '~/components/tools/GrokToolCore.vue'
import GrokImageSeoContent from '~/components/tools/GrokImageSeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Grok Image 2.0 Segment Edit',
  description:
    'Grok Imagine Image 2.0 segment edit on FuseAITools—refine a prior grok-imagine-image-2.0 text-to-image task with a prompt up to 65000 characters and optional 0-based segment indexes. 20 free credits on sign-up.',
  category: 'image',
  route: '/home/grok/image-2-0-segment-edit',
  keywords: ['Grok', 'Grok Imagine 2.0', 'xAI', 'Segment Edit', 'Image Editing', 'AI image generation', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'grok-imagine-image-2-0-segment-edit', eligibleQuantityName: 'Credits Required' }
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
