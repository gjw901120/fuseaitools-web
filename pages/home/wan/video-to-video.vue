<template>
  <HomeLayout>
    <div class="tool-page">
      <WanTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import WanTool from '~/components/tools/WanTool.vue'
import { useToolSEO } from '~/composables/useToolSEO'

const seoConfig = useToolSEO({
  name: 'Wan Video to Video',
  description: 'Wan Video to Video - Transform video with new prompts. Duration 5/10s, 720p/1080p.',
  category: 'video',
  route: '/home/wan/video-to-video',
  keywords: ['Wan', 'Video to Video', 'AI video', 'video transform'],
  applicationCategory: 'VideoApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
