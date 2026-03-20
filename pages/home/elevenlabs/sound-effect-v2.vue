<template>
  <HomeLayout>
    <div class="tool-page">
      <ElevenLabsTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import ElevenLabsTool from '~/components/tools/ElevenLabsTool.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'ElevenLabs Sound Effect v2',
  description: 'Generate sound effects with ElevenLabs Sound Effect v2. 18 credits per minute.',
  category: 'audio',
  route: '/home/elevenlabs/sound-effect-v2',
  keywords: ['ElevenLabs', 'Sound Effect', 'AI sound'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Audio Processing',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: '18 credits per minute.',
  priceFromApi: { modelKey: 'elevenlabs_sound_effect', eligibleQuantityName: 'Credits per minute' },
  priceSpecification: { price: 18, minValue: 18, maxValue: 18, eligibleQuantityName: 'Credits per minute' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
