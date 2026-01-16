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
  title: 'Suno Vocal Generation - AI Vocal Generation Tool | FuseAI Tools',
  meta: [
    {
      name: 'description',
      content: 'Add vocal singing to existing audio using Suno model, guided by prompts for singing content and style, supporting music style and exclusion tag control.'
    },
    {
      name: 'keywords',
      content: 'Suno, AI vocal generation, vocal production, artificial intelligence, music creation, AI tools'
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






