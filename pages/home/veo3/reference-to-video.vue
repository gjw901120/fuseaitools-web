<template>
  <HomeLayout>
    <div class="tool-page">
      <Veo3Tool />
    </div>
    <template #below-main>
      <Veo31SeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import Veo3Tool from '~/components/tools/Veo3Tool.vue'
import Veo31SeoContent from '~/components/tools/Veo31SeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Veo 3.1 Reference to Video Generator',
  description:
    'Veo 3.1 reference-to-video on FuseAITools—animate 1–3 reference images with Google DeepMind video. Standard or Fast at /home/veo3. 20 free credits on sign-up.',
  category: 'video',
  route: '/home/veo3/reference-to-video',
  keywords: ['Veo3', 'Veo 3.1', 'reference to video', 'image to video', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: ['veo3', 'veo3_fast'], eligibleQuantityName: 'Credits Required' }
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
