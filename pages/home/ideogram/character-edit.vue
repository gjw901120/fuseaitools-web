<template>
  <HomeLayout>
    <div class="tool-page">
      <IdeogramTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import IdeogramTool from '~/components/tools/IdeogramTool.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'Ideogram Character Edit',
  description: 'Edit character images with mask and prompt using Ideogram. Pay per image with credits.',
  category: 'image',
  route: '/home/ideogram/character-edit',
  keywords: ['Ideogram', 'Character Edit', 'AI character editing', 'mask'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'ideogram-character-edit', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
