<template>
  <div class="tool-page">
    <ElevenLabsTool />
  </div>
</template>

<script setup>
import ElevenLabsTool from '~/components/tools/ElevenLabsTool.vue'

// SEO 优化
useHead({
  title: 'ElevenLabs Speech-to-Text - AI Speech Recognition | FuseAI Tools',
  meta: [
    {
      name: 'description',
      content: 'ElevenLabs Speech-to-Text high-precision speech recognition, supporting multiple audio formats, up to 200MB, supporting speaker identification and audio event tagging.'
    },
    {
      name: 'keywords',
      content: 'ElevenLabs Speech-to-Text, AI speech recognition, speech-to-text, audio transcription, speaker identification, voice recognition'
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






