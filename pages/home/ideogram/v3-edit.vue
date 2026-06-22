<template>
  <HomeLayout>
    <div class="tool-page">
      <IdeogramTool />
    </div>
    <template #below-main>
      <IdeogramV3SeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import IdeogramTool from '~/components/tools/IdeogramTool.vue'
import IdeogramV3SeoContent from '~/components/tools/IdeogramV3SeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Ideogram V3 Image Edit',
  description:
    'Ideogram V3 mask-based image edit on FuseAITools—upload image + mask, inpaint with prompt, TURBO/BALANCED/QUALITY speed. 20 free credits on sign-up.',
  category: 'image',
  route: '/home/ideogram/v3-edit',
  keywords: ['Ideogram', 'V3', 'Image Edit', 'mask', 'inpainting', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'ideogram-v3-edit', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page {
  width: 100%;
  height: auto;
  min-height: 100%;
  overflow: visible;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
}
</style>
