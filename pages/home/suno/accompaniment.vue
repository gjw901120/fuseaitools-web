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
  title: 'Suno Accompaniment Generation - AI Accompaniment Generation Tool | FuseAI Tools',
  meta: [
    {
      name: 'description',
      content: 'Add background accompaniment to existing audio using Suno model, control music style through include and exclude tags, no prompts needed.'
    },
    {
      name: 'keywords',
      content: 'Suno, AI accompaniment generation, accompaniment production, artificial intelligence, music creation, AI tools'
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






