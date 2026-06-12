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
  name: 'ElevenLabs AI Audio Isolation',
  description:
    'ElevenLabs AI Audio Isolation on FuseAITools—extract vocals or instruments from mixed audio uploads up to 10MB. 20 free credits on sign-up.',
  category: 'audio',
  route: '/home/elevenlabs/audio-isolation',
  keywords: ['ElevenLabs', 'Audio Isolation', 'vocal isolation', 'stem separation', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Audio Isolation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per minute with credits.',
  priceFromApi: { modelKey: 'elevenlabs_audio_isolation', eligibleQuantityName: 'Credits per minute' }
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
