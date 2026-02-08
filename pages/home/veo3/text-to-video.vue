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
  name: 'Veo3 Text to Video',
  description: 'Veo3 Text to Video - Generate high-quality AI video from text. Use Google Veo 3 for free online.',
  category: 'video',
  route: '/home/veo3/text-to-video',
  keywords: ['Veo3', 'Text to Video', 'AI video', 'Google Veo'],
  applicationCategory: 'VideoApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
