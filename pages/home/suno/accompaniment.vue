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
  title: 'Suno 伴奏生成 - AI伴奏生成工具 | SimplyAI Tools',
  meta: [
    {
      name: 'description',
      content: '使用Suno模型为现有音频添加背景伴奏，通过包含标签和排除标签控制音乐风格，无需提示词。'
    },
    {
      name: 'keywords',
      content: 'Suno, AI伴奏生成, 伴奏制作, 人工智能, 音乐创作, AI工具'
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






