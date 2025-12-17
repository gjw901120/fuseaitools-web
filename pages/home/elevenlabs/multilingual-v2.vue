<template>
  <div class="tool-page">
    <ElevenLabsTool />
  </div>
</template>

<script setup>
import ElevenLabsTool from '~/components/tools/ElevenLabsTool.vue'

// SEO 优化
useHead({
  title: 'ElevenLabs Multilingual v2 - 多语言语音合成 | SimplyAI Tools',
  meta: [
    {
      name: 'description',
      content: 'ElevenLabs Multilingual v2模型，支持100+种语言的AI语音合成，适合国际内容创作，高质量多语言语音生成工具。'
    },
    {
      name: 'keywords',
      content: 'ElevenLabs Multilingual v2, 多语言语音合成, AI语音, 国际语音, 多语言TTS, 语音生成'
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






