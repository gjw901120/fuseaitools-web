<template>
  <div class="tool-page">
    <ElevenLabsTool />
  </div>
</template>

<script setup>
import ElevenLabsTool from '~/components/tools/ElevenLabsTool.vue'

// SEO 优化
useHead({
  title: 'ElevenLabs Audio Isolation - AI音频分离 | SimplyAI Tools',
  meta: [
    {
      name: 'description',
      content: 'ElevenLabs Audio Isolation智能分离人声和背景音乐，支持多种音频格式，最大10MB，适用于音频后期处理。'
    },
    {
      name: 'keywords',
      content: 'ElevenLabs Audio Isolation, AI音频分离, 人声提取, 背景音乐分离, 音频后期, 音频处理'
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






