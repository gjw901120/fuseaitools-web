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
  name: 'Suno - Accompaniment',
  description: 'Generate accompaniment with Suno AI. Use for free online.',
  category: 'audio',
  route: '/home/suno/add-instrumental',
  keywords: ['Suno', 'Accompaniment', 'AI music'],
  applicationCategory: 'AudioApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
