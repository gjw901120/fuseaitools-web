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
  name: 'Kling AI Avatar Pro',
  description: 'Kling AI Avatar Pro - High-quality avatar image + audio to talking-head video. Prompt max 5000 characters.',
  category: 'video',
  route: '/home/kling/ai-avatar-pro',
  keywords: ['Kling', 'Kuaishou', 'AI Avatar Pro', 'talking head', 'video'],
  applicationCategory: 'VideoApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
