<template>
  <HomeLayout>
    <div class="tool-page">
      <ElevenLabsTool />
    </div>
    <template #below-main>
      <ElevenLabsSeoContent />
    </template>
  </HomeLayout>
</template>

<script setup>
import ElevenLabsTool from '~/components/tools/ElevenLabsTool.vue'
import ElevenLabsSeoContent from '~/components/tools/ElevenLabsSeoContent.vue'
import { useToolSEOAsync } from '~/composables/useToolSEO'

const seoConfig = await useToolSEOAsync({
  name: 'ElevenLabs Multilingual v2 TTS',
  description:
    'ElevenLabs Multilingual v2 on FuseAITools—natural text-to-speech with voice picker, stability/style sliders, optional timestamps, and MP3/PCM output. 20 free credits on sign-up.',
  category: 'audio',
  route: '/home/elevenlabs/multilingual-v2',
  keywords: ['ElevenLabs', 'Multilingual v2', 'TTS', 'text to speech', 'voice synthesis', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Text to Speech',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per 1K characters with credits.',
  priceFromApi: { modelKey: 'elevenlabs_text_to_speech_multilingual', eligibleQuantityName: 'Credits per 1K characters' }
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
