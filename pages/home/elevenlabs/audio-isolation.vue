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
  name: 'ElevenLabs Audio Isolation',
  description: 'Isolate vocals or instruments with ElevenLabs. 21 credits per minute.',
  category: 'audio',
  route: '/home/elevenlabs/audio-isolation',
  keywords: ['ElevenLabs', 'Audio Isolation', 'vocal isolation'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Audio Processing',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: '21 credits per minute.',
  priceFromApi: { modelKey: 'elevenlabs_audio_isolation', eligibleQuantityName: 'Credits per minute' },
  priceSpecification: { price: 21, minValue: 21, maxValue: 21, eligibleQuantityName: 'Credits per minute' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
