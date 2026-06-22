<template>
  <HomeLayout>
    <div class="tool-page">
      <IdeogramTool />
    </div>
    <template #below-main>
      <IdeogramCharacterSeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import IdeogramTool from '~/components/tools/IdeogramTool.vue'
import IdeogramCharacterSeoContent from '~/components/tools/IdeogramCharacterSeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Ideogram Character Generator',
  description:
    'Ideogram Character on FuseAITools—reference-driven identity in new scenes, REALISTIC/FICTION styles, 1–4 outputs. 20 free credits on sign-up.',
  category: 'image',
  route: '/home/ideogram/character',
  keywords: ['Ideogram', 'Character', 'consistent character', 'reference image', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'ideogram-character', eligibleQuantityName: 'Credits Required' }
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
