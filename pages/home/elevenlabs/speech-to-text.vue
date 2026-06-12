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
  name: 'ElevenLabs Speech-to-Text',
  description:
    'ElevenLabs Speech-to-Text on FuseAITools—upload audio up to 200MB for transcripts with diarization, event tags, and word-level timeline. 20 free credits on sign-up.',
  category: 'audio',
  route: '/home/elevenlabs/speech-to-text',
  keywords: ['ElevenLabs', 'Speech to Text', 'STT', 'transcription', 'diarization', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Speech to Text',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per minute with credits.',
  priceFromApi: { modelKey: 'elevenlabs_speech_to_text', eligibleQuantityName: 'Credits per minute' }
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
