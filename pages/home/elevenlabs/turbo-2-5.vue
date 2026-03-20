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
  name: 'ElevenLabs Turbo 2.5 TTS',
  description: 'Fast voice synthesis with ElevenLabs Turbo 2.5. 10 credits per 1K characters.',
  category: 'audio',
  route: '/home/elevenlabs/turbo-2-5',
  keywords: ['ElevenLabs', 'Turbo', 'voice synthesis', 'TTS'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Audio Processing',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: '10 credits per 1K characters.',
  priceFromApi: { modelKey: 'elevenlabs_text_to_speech_turbo', eligibleQuantityName: 'Credits per 1K characters' },
  priceSpecification: { price: 10, minValue: 10, maxValue: 10, eligibleQuantityName: 'Credits per 1K characters' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
