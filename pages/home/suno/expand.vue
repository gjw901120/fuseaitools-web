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
  title: 'Suno Audio Expansion - AI Audio Expansion Tool | FuseAI Tools',
  meta: [
    {
      name: 'description',
      content: 'Expand and create based on uploaded audio files using Suno model, supporting custom parameter mode, can control music style and content of the expanded part.'
    },
    {
      name: 'keywords',
      content: 'Suno, AI audio expansion, audio extension, artificial intelligence, music creation, AI tools'
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






