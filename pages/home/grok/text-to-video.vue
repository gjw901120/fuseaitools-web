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
  name: 'Grok Text to Video Generator',
  description: 'Generate videos from text prompts with Grok motion controls.',
  category: 'video',
  route: '/home/grok/text-to-video',
  keywords: ['Grok', 'Text to Video', 'AI video generation'],
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
