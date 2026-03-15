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
  name: 'Ideogram V3 Edit',
  description: 'Ideogram V3 Edit - Edit images with mask and prompt for precise control.',
  category: 'image',
  route: '/home/ideogram/v3-edit',
  keywords: ['Ideogram', 'V3', 'Image Edit', 'mask', 'AI image editing'],
  applicationCategory: 'GraphicsApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
