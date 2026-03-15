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
  name: 'Kling v2.5 Turbo Image to Video Pro',
  description: 'Kling v2.5 Turbo Image to Video Pro - High-quality image-to-video with tail frame, duration 5/10s, negative prompt, CFG scale.',
  category: 'video',
  route: '/home/kling/v2-5-turbo-image-to-video-pro',
  keywords: ['Kling', 'Kuaishou', 'Image to Video', 'AI video', 'v2.5 Turbo'],
  applicationCategory: 'VideoApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
