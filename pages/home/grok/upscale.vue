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
  name: 'Grok Video Upscale',
  description: 'Upscale Grok generated media by reusing a successful task id.',
  category: 'video',
  route: '/home/grok/upscale',
  keywords: ['Grok', 'Upscale', 'AI video'],
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
