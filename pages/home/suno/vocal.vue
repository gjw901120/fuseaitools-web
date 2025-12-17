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
  title: 'Suno 人声生成 - AI人声生成工具 | SimplyAI Tools',
  meta: [
    {
      name: 'description',
      content: '使用Suno模型为现有音频添加人声演唱，通过提示词指导演唱内容和风格，支持音乐风格和排除标签控制。'
    },
    {
      name: 'keywords',
      content: 'Suno, AI人声生成, 人声制作, 人工智能, 音乐创作, AI工具'
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






