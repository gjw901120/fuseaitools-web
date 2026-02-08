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
  name: 'Runway Aleph',
  description: 'Runway Aleph - AI video generation. Use Runway for free online.',
  category: 'video',
  route: '/home/runway/aleph',
  keywords: ['Runway', 'Aleph', 'AI video'],
  applicationCategory: 'VideoApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
