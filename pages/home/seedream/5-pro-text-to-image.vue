<template>
  <HomeLayout>
    <div class="tool-page">
      <SeedreamTool />
    </div>
    <template #below-main>
      <Seedream5ProSeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import SeedreamTool from '~/components/tools/SeedreamTool.vue'
import Seedream5ProSeoContent from '~/components/tools/Seedream5ProSeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Seedream 5 Pro Text to Image',
  description: 'Seedream 5 Pro Text to Image on FuseAITools—ByteDance premium image model with prompts up to 5000 chars, eight aspect ratios, 1K/2K resolution and PNG/JPEG output. Billed by resolution with credits; 20 free credits on sign-up.',
  category: 'image',
  route: '/home/seedream/5-pro-text-to-image',
  keywords: ['Seedream 5 Pro', 'Seedream Pro', 'text to image', 'ByteDance', 'AI image', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Billed by resolution (1K/2K) with credits.',
  priceFromApi: { modelKey: 'seedream-5-pro-text-to-image', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: auto; overflow: visible; }
</style>
