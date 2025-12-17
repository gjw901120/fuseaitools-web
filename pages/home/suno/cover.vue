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
  title: 'Suno 音频覆盖 - AI音频覆盖工具 | SimplyAI Tools',
  meta: [
    {
      name: 'description',
      content: '使用Suno模型基于上传的音频文件进行覆盖创作，支持自定义模式，可以控制音乐风格、歌词内容等参数。'
    },
    {
      name: 'keywords',
      content: 'Suno, AI音频覆盖, 音频创作, 人工智能, 音乐创作, AI工具'
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






