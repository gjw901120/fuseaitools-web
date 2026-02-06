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

// SEO 优化
const seoConfig = useToolSEO({
  name: 'Runway',
  description: 'Use Runway for free online. AI video editing tool with powerful video generation and editing capabilities. Supports text-to-video, image-to-video, video extension, and multiple formats. Professional video production platform.',
  category: 'video',
  route: '/home/runway',
  keywords: ['Runway', 'Runway ML', 'AI video editing', 'video generation', 'AI video production', 'video editing tool', 'video creation', 'text to video', 'AI video maker'],
  applicationCategory: 'VideoApplication',
  offers: {
    price: '0',
    priceCurrency: 'USD'
  }
})

useHead(seoConfig)
</script>

<style scoped>
.tool-page {
  width: 100%;
  height: 100%;
}
</style>






