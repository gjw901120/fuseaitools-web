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

const seoConfig = useToolSEO({
  name: 'ElevenLabs Multilingual v2',
  description: 'ElevenLabs Multilingual v2 - Multilingual Voice Synthesis. AI voice synthesis in 100+ languages. Use for free online.',
  category: 'audio',
  route: '/home/elevenlabs/multilingual-v2',
  keywords: ['ElevenLabs', 'Multilingual v2', 'voice synthesis', 'TTS', 'multilingual voice'],
  applicationCategory: 'AudioApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
