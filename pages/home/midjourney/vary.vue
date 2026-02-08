<template>
  <HomeLayout>
    <div class="tool-page">
      <MidjourneyTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import MidjourneyTool from '~/components/tools/MidjourneyTool.vue'
import { useToolSEO } from '~/composables/useToolSEO'

const seoConfig = useToolSEO({
  name: 'Midjourney - Vary',
  description: 'Create a vary task to enhance image clarity and simulate styles based on previously generated Midjourney images. Use for free online.',
  category: 'image',
  route: '/home/midjourney/vary',
  keywords: ['Midjourney', 'Vary', 'AI image', 'image variation'],
  applicationCategory: 'GraphicsApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
