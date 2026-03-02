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
  name: 'Wan Text to Video',
  description: 'Wan Text to Video - Generate AI video from text prompts. Supports Chinese and English, duration 5/10/15s, 720p/1080p.',
  category: 'video',
  route: '/home/wan/text-to-video',
  keywords: ['Wan', 'Text to Video', 'AI video', 'video generation'],
  applicationCategory: 'VideoApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
