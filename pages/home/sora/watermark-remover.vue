<template>
  <HomeLayout>
    <div class="tool-page">
      <ClientOnly>
        <SoraTool />
        <template #fallback>
          <div style="padding: 20px; text-align: center;">Loading Sora Tool...</div>
        </template>
      </ClientOnly>
    </div>
  </HomeLayout>
</template>

<script setup>
import SoraTool from '~/components/tools/SoraTool.vue'
import { useToolSEO } from '~/composables/useToolSEO'

const seoConfig = useToolSEO({
  name: 'Sora - Watermark Remover',
  description: 'Use Sora watermark remover for free online. Remove watermarks from generated videos.',
  category: 'video',
  route: '/home/sora/watermark-remover',
  keywords: ['Sora', 'watermark remover', 'AI video', 'OpenAI Sora'],
  applicationCategory: 'VideoApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
