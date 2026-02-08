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
  name: 'Sora - Image to Video',
  description: 'Use Sora 2 for free online. Image-to-video AI video generation from reference images.',
  category: 'video',
  route: '/home/sora/image-to-video',
  keywords: ['Sora', 'Sora 2', 'image-to-video', 'AI video generation', 'OpenAI Sora'],
  applicationCategory: 'VideoApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
