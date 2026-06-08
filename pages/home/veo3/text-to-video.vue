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
  name: 'Veo 3.1 Text to Video Generator',
  description:
    'Veo 3.1 text-to-video on FuseAITools—Google DeepMind video at /home/veo3. Standard or Fast, 16:9/9:16/Auto, prompts up to 1000 chars. 20 free credits on sign-up.',
  category: 'video',
  route: '/home/veo3/text-to-video',
  keywords: ['Veo3', 'Veo 3.1', 'text to video', 'Google Veo', 'DeepMind', 'FuseAITools'],
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
