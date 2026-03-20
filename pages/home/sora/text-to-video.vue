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
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Sora Text to Video Generator',
  description: 'Generate high-fidelity videos from text using OpenAI Sora 2. Pay per video with credits.',
  category: 'video',
  route: '/home/sora/text-to-video',
  keywords: ['Sora', 'Sora 2', 'text-to-video', 'AI video generation', 'OpenAI Sora'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per video with credits.',
  priceFromApi: { modelKey: 'sora-2-text-to-video', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
