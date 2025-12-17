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
  title: 'Suno 音乐延长 - AI音乐延长工具 | SimplyAI Tools',
  meta: [
    {
      name: 'description',
      content: '使用Suno模型延长现有音乐作品，支持自定义参数模式，可以控制延长部分的音乐风格和内容。'
    },
    {
      name: 'keywords',
      content: 'Suno, AI音乐延长, 音乐扩展, 人工智能, 音乐创作, AI工具'
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






