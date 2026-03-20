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
  name: 'ElevenLabs Multilingual v2 TTS',
  description: 'Multilingual voice synthesis in 100+ languages with ElevenLabs. 20 credits per 1K characters.',
  category: 'audio',
  route: '/home/elevenlabs/multilingual-v2',
  keywords: ['ElevenLabs', 'Multilingual v2', 'voice synthesis', 'TTS', 'multilingual voice'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Audio Processing',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: '20 credits per 1K characters.',
  priceFromApi: { modelKey: 'elevenlabs_text_to_speech_multilingual', eligibleQuantityName: 'Credits per 1K characters' },
  priceSpecification: { price: 20, minValue: 20, maxValue: 20, eligibleQuantityName: 'Credits per 1K characters' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
