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
  name: 'Seedream 5 Pro Image to Image',
  description: 'Seedream 5 Pro Image to Image on FuseAITools—upload up to 10 reference images (JPEG/PNG/WebP, 30MB each), guide edits with a 5000-char prompt, choose 1K/2K resolution. Billed by resolution with credits; 20 free credits on sign-up.',
  category: 'image',
  route: '/home/seedream/5-pro-image-to-image',
  keywords: ['Seedream 5 Pro', 'image to image', 'ByteDance', 'AI image editing', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Billed by resolution (1K/2K) with credits.',
  priceFromApi: { modelKey: 'seedream-5-pro-image-to-image', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: auto; overflow: visible; }
</style>
