<template>
  <div class="tool-page">
    <SunoTool />
  </div>
</template>

<script setup>
import SunoTool from '~/components/tools/SunoTool.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// SEO 优化
useHead({
  title: 'Suno Audio Cover - AI Audio Cover Tool | FuseAI Tools',
  meta: [
    {
      name: 'description',
      content: 'Create covers based on uploaded audio files using Suno model, supporting custom mode, can control music style, lyrics content and other parameters.'
    },
    {
      name: 'keywords',
      content: 'Suno, AI audio cover, audio creation, artificial intelligence, music creation, AI tools'
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






