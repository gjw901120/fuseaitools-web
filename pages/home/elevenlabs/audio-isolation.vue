<template>
  <div class="tool-page">
    <ElevenLabsTool />
  </div>
</template>

<script setup>
import ElevenLabsTool from '~/components/tools/ElevenLabsTool.vue'

// SEO 优化
useHead({
  title: 'ElevenLabs Audio Isolation - AI Audio Separation | FuseAI Tools',
  meta: [
    {
      name: 'description',
      content: 'ElevenLabs Audio Isolation intelligently separates vocals and background music, supporting multiple audio formats, up to 10MB, suitable for audio post-processing.'
    },
    {
      name: 'keywords',
      content: 'ElevenLabs Audio Isolation, AI audio separation, vocal extraction, background music separation, audio post-processing, audio processing'
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






