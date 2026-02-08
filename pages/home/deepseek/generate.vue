<template>
  <HomeLayout>
    <ChatInterface
      tool-name="Deepseek"
      tool-description="DeepSeek AI assistant"
      tool-icon="/tools-logo/Deepseek.png"
      model-category="DeepSeek"
    />
  </HomeLayout>
</template>

<script setup>
import { useToolSEO } from '~/composables/useToolSEO'

const seoConfig = useToolSEO({
  name: 'Deepseek',
  description: 'Use Deepseek AI for free online. Advanced conversational AI assistant powered by DeepSeek technology. Perfect for coding, writing, analysis, and general conversations. No signup required.',
  category: 'chat',
  route: '/home/deepseek/generate',
  keywords: ['Deepseek', 'DeepSeek AI', 'AI chat', 'conversational AI', 'AI assistant', 'free AI chat', 'coding AI'],
  applicationCategory: 'ChatApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>
