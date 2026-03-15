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
  name: 'Kling 2.6 Motion Control',
  description: 'Kling 2.6 Motion Control - Reference image + reference video, character orientation, 720p/1080p.',
  category: 'video',
  route: '/home/kling/v2-6-motion-control',
  keywords: ['Kling', 'Kuaishou', 'Motion Control', 'AI video', '2.6'],
  applicationCategory: 'VideoApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
