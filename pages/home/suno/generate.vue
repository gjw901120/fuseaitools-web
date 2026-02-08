<template>
  <HomeLayout>
    <div class="tool-page">
      <SunoTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import SunoTool from '~/components/tools/SunoTool.vue'
import { useToolSEO } from '~/composables/useToolSEO'

const seoConfig = useToolSEO({
  name: 'Suno - Music Generation',
  description: 'Create new music with Suno AI. Generate complete music from scratch. Use for free online.',
  category: 'audio',
  route: '/home/suno/generate',
  keywords: ['Suno', 'Music Generation', 'AI music', 'Create new music'],
  applicationCategory: 'AudioApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
