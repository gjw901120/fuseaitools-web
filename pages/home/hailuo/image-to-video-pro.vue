<template>
  <HomeLayout>
    <div class="tool-page">
      <HailuoTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import HailuoTool from '~/components/tools/HailuoTool.vue'
import { useToolSEO } from '~/composables/useToolSEO'

const seoConfig = useToolSEO({
  name: 'Hailuo Pro Image to Video',
  description: 'Hailuo Pro - MiniMax high-fidelity AI image-to-video. Realistic motion, expressive characters, cinematic visuals. 6s/10s, 768P/1080P.',
  category: 'video',
  route: '/home/hailuo/image-to-video-pro',
  keywords: ['Hailuo', 'MiniMax', 'Image to Video', 'AI video', '2.3 Pro'],
  applicationCategory: 'VideoApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
