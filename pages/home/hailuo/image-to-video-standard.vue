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
  name: 'Hailuo Standard Image to Video',
  description: 'Hailuo Standard - MiniMax high-fidelity AI image-to-video. Realistic motion, expressive characters. 6s/10s, 768P/1080P.',
  category: 'video',
  route: '/home/hailuo/image-to-video-standard',
  keywords: ['Hailuo', 'MiniMax', 'Image to Video', 'AI video', '2.3 Standard'],
  applicationCategory: 'VideoApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
