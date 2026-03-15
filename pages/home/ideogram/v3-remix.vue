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
  name: 'Ideogram V3 Remix',
  description: 'Ideogram V3 Remix - Remix images with strength and style control.',
  category: 'image',
  route: '/home/ideogram/v3-remix',
  keywords: ['Ideogram', 'V3', 'Remix', 'AI image remix'],
  applicationCategory: 'GraphicsApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
