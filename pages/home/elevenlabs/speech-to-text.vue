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
  name: 'ElevenLabs Speech to Text',
  description: 'Convert speech to text with ElevenLabs. 6 credits per minute.',
  category: 'audio',
  route: '/home/elevenlabs/speech-to-text',
  keywords: ['ElevenLabs', 'Speech to Text', 'STT', 'transcription'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Audio Processing',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: '6 credits per minute.',
  priceFromApi: { modelKey: 'elevenlabs_speech_to_text', eligibleQuantityName: 'Credits per minute' },
  priceSpecification: { price: 6, minValue: 6, maxValue: 6, eligibleQuantityName: 'Credits per minute' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
