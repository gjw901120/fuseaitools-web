<template>
  <HomeLayout>
    <div class="tool-page">
      <Veo3Tool />
    </div>
  </HomeLayout>
</template>

<script setup>
import Veo3Tool from '~/components/tools/Veo3Tool.vue'
import { useToolSEO } from '~/composables/useToolSEO'

const seoConfig = useToolSEO({
  name: 'Veo3 First And Last Frames to Video',
  description: 'Veo3 First And Last Frames to Video - Generate transition video from two images. Use for free online.',
  category: 'video',
  route: '/home/veo3/first-and-last-to-video',
  keywords: ['Veo3', 'First And Last Frames', 'image to video', 'AI video'],
  applicationCategory: 'VideoApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
