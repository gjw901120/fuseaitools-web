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
  name: 'Veo 3.1 Video Extend',
  description:
    'Veo 3.1 video extend on FuseAITools—continue prior Veo3 clips with extension prompts via veo3_extend. Route /home/veo3/extend. 20 free credits on sign-up.',
  category: 'video',
  route: '/home/veo3/extend',
  keywords: ['Veo3', 'Veo 3.1', 'video extend', 'extend video', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per extend with credits.',
  priceFromApi: { modelKey: 'veo3_extend', eligibleQuantityName: 'Credits Required' }
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
