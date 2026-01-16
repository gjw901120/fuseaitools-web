<template>
  <HomeLayout>
    <div class="tool-page">
      <SunoTool />
    </div>
  </HomeLayout>
</template>

<script setup>
import SunoTool from '~/components/tools/SunoTool.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

import { useToolSEO } from '~/composables/useToolSEO'

// SEO 优化
const seoConfig = useToolSEO({
  name: 'Suno',
  description: 'Use Suno for free online. Generate high-quality music using Suno AI model, supporting multiple styles, custom parameters, music extension, audio cover, and vocal generation. From simplified mode to advanced custom mode.',
  category: 'audio',
  route: '/home/suno',
  keywords: ['Suno', 'AI music generation', 'music creation', 'artificial intelligence', 'music production', 'AI tools', 'music synthesis', 'AI music', 'music generator', 'audio generation'],
  applicationCategory: 'AudioApplication',
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






