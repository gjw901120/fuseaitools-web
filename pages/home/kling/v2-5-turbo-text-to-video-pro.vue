<template>
  <HomeLayout>
    <div class="tool-page">
      <KlingTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import KlingTool from '~/components/tools/KlingTool.vue'
import { useToolSEO } from '~/composables/useToolSEO'

const seoConfig = useToolSEO({
  name: 'Kling v2.5 Turbo Text to Video Pro',
  description: 'Kling v2.5 Turbo Text to Video Pro - Text-to-video with aspect ratio 16:9/9:16/1:1, duration 5/10s.',
  category: 'video',
  route: '/home/kling/v2-5-turbo-text-to-video-pro',
  keywords: ['Kling', 'Kuaishou', 'Text to Video', 'AI video', 'v2.5 Turbo'],
  applicationCategory: 'VideoApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
