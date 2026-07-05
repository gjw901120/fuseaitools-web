<template>
  <HomeLayout>
    <div class="tool-page">
      <HailuoTool />
    </div>
    <template #below-main>
      <HailuoSeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import HailuoTool from '~/components/tools/HailuoTool.vue'
import HailuoSeoContent from '~/components/tools/HailuoSeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Hailuo 2.3 Standard Image to Video',
  description:
    'Hailuo 2.3 Standard image-to-video on FuseAITools—one image + prompt ≤5000, 6s/10s at 768P/1080P. Faster I2V tier for drafts; RULE credits by duration and quality; 20 free on sign-up.',
  category: 'video',
  route: '/home/hailuo/image-to-video-standard',
  keywords: ['Hailuo', 'Hailuo 2.3 Standard', 'MiniMax', 'image to video', 'AI video', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'hailuo-2-3-image-to-video-standard', eligibleQuantityName: 'Credits Required' }
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
