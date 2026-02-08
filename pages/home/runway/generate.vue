<template>
  <HomeLayout>
    <div class="tool-page">
      <RunwayTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import RunwayTool from '~/components/tools/RunwayTool.vue'
import { useToolSEO } from '~/composables/useToolSEO'

const seoConfig = useToolSEO({
  name: 'Runway Generate',
  description: 'Runway Generate - AI video from text and images. Use Runway for free online.',
  category: 'video',
  route: '/home/runway/generate',
  keywords: ['Runway', 'Generate', 'AI video', 'text to video'],
  applicationCategory: 'VideoApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
