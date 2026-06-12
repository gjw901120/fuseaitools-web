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
  name: 'ElevenLabs Turbo 2.5 TTS',
  description:
    'ElevenLabs Turbo 2.5 on FuseAITools—fast text-to-speech with voice controls, context text, and low-latency output for assistants and batch narration. 20 free credits on sign-up.',
  category: 'audio',
  route: '/home/elevenlabs/turbo-2-5',
  keywords: ['ElevenLabs', 'Turbo 2.5', 'TTS', 'fast voice synthesis', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Text to Speech',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per 1K characters with credits.',
  priceFromApi: { modelKey: 'elevenlabs_text_to_speech_turbo', eligibleQuantityName: 'Credits per 1K characters' }
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
