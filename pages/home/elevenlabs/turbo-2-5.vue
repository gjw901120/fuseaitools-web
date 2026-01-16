<template>
  <div class="tool-page">
    <ElevenLabsTool />
  </div>
</template>

<script setup>
import ElevenLabsTool from '~/components/tools/ElevenLabsTool.vue'

// SEO 优化
useHead({
  title: 'ElevenLabs Turbo 2.5 - Fast Voice Synthesis | FuseAI Tools',
  meta: [
    {
      name: 'description',
      content: 'ElevenLabs Turbo 2.5 optimized for speed, 3x faster generation, suitable for real-time applications and batch processing, efficient AI voice synthesis tool.'
    },
    {
      name: 'keywords',
      content: 'ElevenLabs Turbo 2.5, fast voice synthesis, real-time voice, batch processing, high-speed TTS, voice generation'
    }
  ]
})
</script>

<style scoped>
.tool-page {
  width: 100%;
  height: 100vh;
}
</style>






