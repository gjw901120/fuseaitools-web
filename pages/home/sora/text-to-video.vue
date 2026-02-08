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
  name: 'Sora - Text to Video',
  description: 'Use Sora 2 for free online. Text-to-video AI video generation. Control aspect ratio, frames, quality, and watermark options.',
  category: 'video',
  route: '/home/sora/text-to-video',
  keywords: ['Sora', 'Sora 2', 'text-to-video', 'AI video generation', 'OpenAI Sora'],
  applicationCategory: 'VideoApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
