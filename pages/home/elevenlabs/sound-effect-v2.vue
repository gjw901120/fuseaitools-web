<template>
  <div class="tool-page">
    <ElevenLabsTool />
  </div>
</template>

<script setup>
import ElevenLabsTool from '~/components/tools/ElevenLabsTool.vue'

// SEO 优化
useHead({
  title: 'ElevenLabs Sound Effect v2 - AI音效生成 | SimplyAI Tools',
  meta: [
    {
      name: 'description',
      content: 'ElevenLabs Sound Effect v2 AI驱动的音效生成，支持循环播放、时长控制、多种输出格式，适合游戏、视频制作。'
    },
    {
      name: 'keywords',
      content: 'ElevenLabs Sound Effect v2, AI音效生成, 音效制作, 游戏音效, 视频音效, AI音效'
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






