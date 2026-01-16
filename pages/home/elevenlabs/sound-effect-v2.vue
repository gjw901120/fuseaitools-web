<template>
  <div class="tool-page">
    <ElevenLabsTool />
  </div>
</template>

<script setup>
import ElevenLabsTool from '~/components/tools/ElevenLabsTool.vue'

// SEO 优化
useHead({
  title: 'ElevenLabs Sound Effect v2 - AI Sound Effect Generation | FuseAI Tools',
  meta: [
    {
      name: 'description',
      content: 'ElevenLabs Sound Effect v2 AI-driven sound effect generation, supporting loop playback, duration control, multiple output formats, suitable for games and video production.'
    },
    {
      name: 'keywords',
      content: 'ElevenLabs Sound Effect v2, AI sound effect generation, sound effect production, game sound effects, video sound effects, AI sound effects'
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






