<template>
  <div class="tool-page">
    <ElevenLabsTool />
  </div>
</template>

<script setup>
import ElevenLabsTool from '~/components/tools/ElevenLabsTool.vue'

// SEO 优化
useHead({
  title: 'ElevenLabs Turbo 2.5 - 快速语音合成 | SimplyAI Tools',
  meta: [
    {
      name: 'description',
      content: 'ElevenLabs Turbo 2.5专为速度优化，生成速度快3倍，适合实时应用和批量处理，高效的AI语音合成工具。'
    },
    {
      name: 'keywords',
      content: 'ElevenLabs Turbo 2.5, 快速语音合成, 实时语音, 批量处理, 高速TTS, 语音生成'
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






