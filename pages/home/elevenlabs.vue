<template>
  <HomeLayout>
    <div class="tool-page">
      <ElevenLabsTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import ElevenLabsTool from '~/components/tools/ElevenLabsTool.vue'

import { useToolSEO } from '~/composables/useToolSEO'

// SEO 优化
const seoConfig = useToolSEO({
  name: 'ElevenLabs',
  description: 'Use ElevenLabs for free online. Advanced AI voice synthesis tool supporting text-to-speech, speech-to-text, sound effect generation, and audio isolation. High-quality AI audio processing with multiple voice models and languages.',
  category: 'audio',
  route: '/home/elevenlabs',
  keywords: ['ElevenLabs', 'AI voice synthesis', 'text-to-speech', 'TTS', 'speech-to-text', 'STT', 'AI audio', 'sound effect generation', 'audio isolation', 'voice cloning', 'AI voice'],
  applicationCategory: 'AudioApplication',
  offers: {
    price: '0',
    priceCurrency: 'USD'
  }
})

useHead(seoConfig)
</script>

<style scoped>
.tool-page {
  width: 100%;
  height: 100%;
}
</style>

