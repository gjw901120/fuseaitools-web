<template>
  <HomeLayout>
    <div class="tool-page">
      <GrokTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import GrokTool from '~/components/tools/GrokToolCore.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Grok Image to Video Generator',
  description: 'Generate videos from one or multiple reference images with Grok.',
  category: 'video',
  route: '/home/grok/image-to-video',
  keywords: ['Grok', 'Image to Video', 'AI video generation'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.'
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
