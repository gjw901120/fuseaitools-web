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
  title: 'Suno 音频扩展 - AI音频扩展工具 | SimplyAI Tools',
  meta: [
    {
      name: 'description',
      content: '使用Suno模型基于上传的音频文件进行扩展创作，支持自定义参数模式，可以控制扩展部分的音乐风格和内容。'
    },
    {
      name: 'keywords',
      content: 'Suno, AI音频扩展, 音频扩展, 人工智能, 音乐创作, AI工具'
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






