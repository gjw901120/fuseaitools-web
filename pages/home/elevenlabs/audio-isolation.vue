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
  name: 'ElevenLabs Audio Isolation',
  description: 'ElevenLabs Audio Isolation - Isolate vocals or instruments. Use for free online.',
  category: 'audio',
  route: '/home/elevenlabs/audio-isolation',
  keywords: ['ElevenLabs', 'Audio Isolation', 'vocal isolation'],
  applicationCategory: 'AudioApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
