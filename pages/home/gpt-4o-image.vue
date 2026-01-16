<template>
  <HomeLayout>
    <div class="tool-page">
      <GPT4oImageTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import GPT4oImageTool from '~/components/tools/GPT4oImageTool.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 监听路由变化，实现一级tab功能
const switchToMain = () => {
  router.push('/home/gpt-4o-image')
}

import { useToolSEO } from '~/composables/useToolSEO'

// SEO 优化
const seoConfig = useToolSEO({
  name: 'GPT 4o Image',
  description: 'Use GPT 4o Image for free online. Generate high-quality AI images using OpenAI\'s GPT 4o Image model, supporting multiple styles, scenes, and creative expressions. Easy-to-use image generation tool with advanced AI capabilities.',
  category: 'image',
  route: '/home/gpt-4o-image',
  keywords: ['GPT 4o Image', 'GPT-4o Image', 'AI image generation', 'OpenAI', 'artificial intelligence', 'image creation', 'AI tools', 'DALL-E', 'image generator', 'AI art'],
  applicationCategory: 'GraphicsApplication',
  offers: {
    price: '0',
    priceCurrency: 'USD'
  }
})

useHead(seoConfig)
</script>

<style scoped>
.tool-page {
  width: 100%;
  height: 100%;
}
</style>
