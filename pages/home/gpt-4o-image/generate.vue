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
import { useToolSEO } from '~/composables/useToolSEO'

const router = useRouter()
const switchToMain = () => {
  router.push('/home/gpt-4o-image/generate')
}

const seoConfig = useToolSEO({
  name: 'GPT 4o Image',
  description: 'ChatGPT 4o Image, is OpenAI\'s latest AI image generation model. It understands both text and visual context, allowing developers to create and edit images with remarkable accuracy. Unlike traditional diffusion models, ChatGPT 4o Image follows instructions precisely, supports consistent styles, and renders legible text — making it ideal for applications in design, marketing, and creative automation.',
  category: 'image',
  route: '/home/gpt-4o-image/generate',
  keywords: ['GPT 4o Image', 'GPT-4o Image', 'GPT-Image-1', 'AI image generation', 'OpenAI', 'ChatGPT 4o Image', 'image creation', 'AI tools', 'image generator', 'AI art'],
  applicationCategory: 'GraphicsApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
