<template>
  <HomeLayout>
    <div class="tool-page">
      <SeedreamTool />
    </div>
    <template #below-main>
      <Seedream5FlashSeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import SeedreamTool from '~/components/tools/SeedreamTool.vue'
import Seedream5FlashSeoContent from '~/components/tools/Seedream5FlashSeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Seedream 5 Flash Text to Image',
  description: 'Seedream 5 Flash Text to Image on FuseAITools—fast ByteDance image generation with prompts up to 5000 chars, eight aspect ratios and 1K/1.5K/2K output at one price. Billed by resolution with credits; 20 free credits on sign-up.',
  category: 'image',
  route: '/home/seedream/5-flash-text-to-image',
  keywords: ['Seedream 5 Flash', 'text to image', 'ByteDance', 'fast AI image', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Billed by resolution (1K/1.5K/2K) with credits.',
  priceFromApi: { modelKey: 'seedream-5-flash-text-to-image', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: auto; overflow: visible; }
</style>
