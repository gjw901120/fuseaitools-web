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
  name: 'Veo3 Video Extend',
  description: 'Veo3 Video Extend - Extend video duration or content from existing clips. Use for free online.',
  category: 'video',
  route: '/home/veo3/extend',
  keywords: ['Veo3', 'Video Extend', 'extend video', 'AI video'],
  applicationCategory: 'VideoApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
