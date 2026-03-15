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
  name: 'Kling 3.0 Video',
  description: 'Kling 3.0 Video - Single shot or multi-shot, image refs, elements, duration 3-15s, sound.',
  category: 'video',
  route: '/home/kling/v3-0-video',
  keywords: ['Kling', 'Kuaishou', '3.0', 'AI video', 'multi-shot'],
  applicationCategory: 'VideoApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
