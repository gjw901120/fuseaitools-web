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
  name: 'ElevenLabs Sound Effect v2',
  description: 'ElevenLabs Sound Effect v2 - Generate sound effects. Use for free online.',
  category: 'audio',
  route: '/home/elevenlabs/sound-effect-v2',
  keywords: ['ElevenLabs', 'Sound Effect', 'AI sound'],
  applicationCategory: 'AudioApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
