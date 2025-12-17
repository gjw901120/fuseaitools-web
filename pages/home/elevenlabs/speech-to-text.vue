<template>
  <div class="tool-page">
    <ElevenLabsTool />
  </div>
</template>

<script setup>
import ElevenLabsTool from '~/components/tools/ElevenLabsTool.vue'

// SEO 优化
useHead({
  title: 'ElevenLabs Speech-to-Text - AI语音识别 | SimplyAI Tools',
  meta: [
    {
      name: 'description',
      content: 'ElevenLabs Speech-to-Text高精度语音识别，支持多种音频格式，最大200MB，支持说话人识别和音频事件标记。'
    },
    {
      name: 'keywords',
      content: 'ElevenLabs Speech-to-Text, AI语音识别, 语音转文本, 音频转录, 说话人识别, 语音识别'
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






