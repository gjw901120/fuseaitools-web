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
  name: 'ElevenLabs Turbo 2.5',
  description: 'ElevenLabs Turbo 2.5 - Fast voice synthesis. Use for free online.',
  category: 'audio',
  route: '/home/elevenlabs/turbo-2-5',
  keywords: ['ElevenLabs', 'Turbo', 'voice synthesis', 'TTS'],
  applicationCategory: 'AudioApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
