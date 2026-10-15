<template>
  <HomeLayout>
    <div class="tool-page">
      <KlingTool />
    </div>
    <template #below-main>
      <Kling30OmniTransformationSeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import KlingTool from '~/components/tools/KlingTool.vue'
import Kling30OmniTransformationSeoContent from '~/components/tools/Kling30OmniTransformationSeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Kling 3.0 Omni Video Transformation',
  description:
    'Kling 3.0 Omni Video Transformation on FuseAITools—restyle one uploaded source video (3–15.5s) with a prompt up to 3072 chars and optional reference images at 720p/1080p/4K. Billing follows the actual uploaded video length. 20 free credits on sign-up.',
  category: 'video',
  route: '/home/kling/3-0-omni-transformation',
  keywords: ['Kling', 'Kuaishou', '3.0 Omni', 'Video Transformation', 'video to video', 'AI video restyle', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video to Video',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Billed by the actual uploaded video length with credits.',
  priceFromApi: { modelKey: 'kling-3.0-omni-transformation', eligibleQuantityName: 'Credits Required' }
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
