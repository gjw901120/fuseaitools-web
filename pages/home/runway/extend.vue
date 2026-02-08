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
  name: 'Runway Extend',
  description: 'Runway Extend - Extend video with AI. Use Runway for free online.',
  category: 'video',
  route: '/home/runway/extend',
  keywords: ['Runway', 'Extend', 'AI video', 'video extend'],
  applicationCategory: 'VideoApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
