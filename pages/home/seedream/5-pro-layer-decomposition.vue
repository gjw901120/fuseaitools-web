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
  name: 'Seedream 5 Pro Layer Decomposition',
  description: 'Seedream 5 Pro Layer Decomposition on FuseAITools—split one source image into editable PNG layers, optionally targeted with <bbox> coordinates. Choose 1K/1.5K/2K resolution. Billed by resolution with credits; 20 free credits on sign-up.',
  category: 'image',
  route: '/home/seedream/5-pro-layer-decomposition',
  keywords: ['Seedream 5 Pro', 'layer decomposition', 'image layers', 'ByteDance', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Billed by resolution (1K/1.5K/2K) with credits.',
  priceFromApi: { modelKey: 'seedream-5-pro-layer-decomposition', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: auto; overflow: visible; }
</style>
