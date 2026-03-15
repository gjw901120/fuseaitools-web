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
  name: 'Kling 2.6 Text to Video',
  description: 'Kling 2.6 Text to Video - Text-to-video with sound, aspect ratio 1:1/16:9/9:16, duration 5/10s.',
  category: 'video',
  route: '/home/kling/v2-6-text-to-video',
  keywords: ['Kling', 'Kuaishou', 'Text to Video', 'AI video', '2.6'],
  applicationCategory: 'VideoApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
