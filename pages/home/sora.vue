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

// SEO 优化
const seoConfig = useToolSEO({
  name: 'Sora',
  description: 'Use Sora 2 for free online. Advanced text-to-video and image-to-video generation tool. Control aspect ratio, frames, quality, and watermark options. Create high-quality videos from text prompts or reference images.',
  category: 'video',
  route: '/home/sora',
  keywords: ['Sora', 'Sora 2', 'text-to-video', 'image-to-video', 'AI video generation', 'OpenAI Sora', 'video creation', 'AI video maker', 'video generator'],
  applicationCategory: 'VideoApplication',
  offers: {
    price: '0',
    priceCurrency: 'USD'
  }
})

useHead(seoConfig)
</script>

<style scoped>
.tool-page {
  width: 100%;
  height: 100%;
}
</style>


