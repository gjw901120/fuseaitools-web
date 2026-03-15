<template>
  <HomeLayout>
    <div class="tool-page">
      <IdeogramTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import IdeogramTool from '~/components/tools/IdeogramTool.vue'
import { useToolSEO } from '~/composables/useToolSEO'

const seoConfig = useToolSEO({
  name: 'Ideogram V3 Reframe',
  description: 'Ideogram V3 Reframe - Reframe images with new aspect ratio and composition.',
  category: 'image',
  route: '/home/ideogram/v3-reframe',
  keywords: ['Ideogram', 'V3', 'Reframe', 'AI image reframe', 'aspect ratio'],
  applicationCategory: 'GraphicsApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
