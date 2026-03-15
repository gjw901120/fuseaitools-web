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
  name: 'Kling 2.6 Image to Video',
  description: 'Kling 2.6 Image to Video - Image-to-video with sound, duration 5/10s.',
  category: 'video',
  route: '/home/kling/v2-6-image-to-video',
  keywords: ['Kling', 'Kuaishou', 'Image to Video', 'AI video', '2.6'],
  applicationCategory: 'VideoApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
