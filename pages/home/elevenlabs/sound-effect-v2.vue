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
  name: 'ElevenLabs Sound Effect v2',
  description:
    'ElevenLabs Sound Effect v2 on FuseAITools—generate SFX from text descriptions with duration, loop, intensity, and MP3/PCM output. 20 free credits on sign-up.',
  category: 'audio',
  route: '/home/elevenlabs/sound-effect-v2',
  keywords: ['ElevenLabs', 'Sound Effect v2', 'AI sound effects', 'SFX', 'FuseAITools'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Sound Effect Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per minute with credits.',
  priceFromApi: { modelKey: 'elevenlabs_sound_effect', eligibleQuantityName: 'Credits per minute' }
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
