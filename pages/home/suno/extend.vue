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
  title: 'Suno Music Extension - AI Music Extension Tool | FuseAI Tools',
  meta: [
    {
      name: 'description',
      content: 'Extend existing music works using Suno model, supporting custom parameter mode, can control music style and content of the extended part.'
    },
    {
      name: 'keywords',
      content: 'Suno, AI music extension, music expansion, artificial intelligence, music creation, AI tools'
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






