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
  name: 'ElevenLabs Speech to Text',
  description: 'ElevenLabs Speech to Text - Convert speech to text. Use for free online.',
  category: 'audio',
  route: '/home/elevenlabs/speech-to-text',
  keywords: ['ElevenLabs', 'Speech to Text', 'STT', 'transcription'],
  applicationCategory: 'AudioApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
