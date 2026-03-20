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
import { useToolSEOAsync } from '~/composables/useToolSEO'

const router = useRouter()
const switchToMain = () => {
  router.push('/home/gpt-4o-image/generate')
}

const seoConfig = await useToolSEOAsync({
  name: 'GPT 4o Image Generator',
  description: 'Create and edit images with ChatGPT 4o Image. Pay per image with credits.',
  category: 'image',
  route: '/home/gpt-4o-image/generate',
  keywords: ['GPT 4o Image', 'GPT-4o Image', 'GPT-Image-1', 'AI image generation', 'OpenAI', 'ChatGPT 4o Image', 'image creation', 'AI tools', 'image generator', 'AI art'],
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Image Generation',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Pay per image with credits.',
  priceFromApi: { modelKey: 'GPT_4o_image', eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>

<style scoped>
.tool-page { width: 100%; height: 100%; }
</style>
