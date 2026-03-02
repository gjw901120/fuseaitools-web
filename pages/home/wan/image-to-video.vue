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
  name: 'Wan Image to Video',
  description: 'Wan Image to Video - Animate images with text prompts. Min 256×256px, duration 5/10/15s, 720p/1080p.',
  category: 'video',
  route: '/home/wan/image-to-video',
  keywords: ['Wan', 'Image to Video', 'AI video', 'animate image'],
  applicationCategory: 'VideoApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
