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
  name: 'Sora - Pro Text to Video',
  description: 'Use Sora 2 Pro for free online. High-quality text-to-video with size and duration control.',
  category: 'video',
  route: '/home/sora/pro-text-to-video',
  keywords: ['Sora', 'Sora 2 Pro', 'text-to-video', 'AI video generation'],
  applicationCategory: 'VideoApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
