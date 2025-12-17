<template>
  <div class="tool-page">
    <ElevenLabsTool />
  </div>
</template>

<script setup>
import ElevenLabsTool from '~/components/tools/ElevenLabsTool.vue'

// SEO 优化
useHead({
  title: 'ElevenLabs - AI语音合成工具 | SimplyAI Tools',
  meta: [
    {
      name: 'description',
      content: '使用ElevenLabs AI语音合成技术，支持文本转语音、语音转文本、音效生成和音频分离，高质量AI音频处理工具。'
    },
    {
      name: 'keywords',
      content: 'ElevenLabs, AI语音合成, 文本转语音, 语音转文本, AI音频, 音效生成, 音频分离'
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

