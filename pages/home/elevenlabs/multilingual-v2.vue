<template>
  <div class="tool-page">
    <ElevenLabsTool />
  </div>
</template>

<script setup>
import ElevenLabsTool from '~/components/tools/ElevenLabsTool.vue'

// SEO 优化
useHead({
  title: 'ElevenLabs Multilingual v2 - Multilingual Voice Synthesis | FuseAI Tools',
  meta: [
    {
      name: 'description',
      content: 'ElevenLabs Multilingual v2 model, supporting AI voice synthesis in 100+ languages, suitable for international content creation, high-quality multilingual voice generation tool.'
    },
    {
      name: 'keywords',
      content: 'ElevenLabs Multilingual v2, multilingual voice synthesis, AI voice, international voice, multilingual TTS, voice generation'
    }
  ]
})

// 设置默认模型为Multilingual v2
onMounted(() => {
  // 这里可以通过事件总线或其他方式通知组件设置默认模型
})
</script>

<style scoped>
.tool-page {
  width: 100%;
  height: 100vh;
}
</style>






