<template>
  <HomeLayout>
    <ChatInterface
      tool-name="GPT"
      tool-description="OpenAI conversational AI assistant"
      tool-icon="/tools-logo/ChatGpt.png"
      model-category="GPT"
    />
  </HomeLayout>
</template>

<script setup>
import { useToolSEO } from '~/composables/useToolSEO'

const seoConfig = useToolSEO({
  name: 'GPT',
  description: 'Use GPT (ChatGPT) for free online. OpenAI conversational AI assistant for chat, coding, writing, analysis, and more. No signup required. Access ChatGPT, GPT-4, and other OpenAI models in one platform.',
  category: 'chat',
  route: '/home/gpt',
  keywords: ['GPT', 'ChatGPT', 'OpenAI', 'AI chat', 'conversational AI', 'GPT-4', 'AI assistant', 'free ChatGPT', 'online chat AI'],
  applicationCategory: 'ChatApplication',
  offers: {
    price: '0',
    priceCurrency: 'USD'
  }
})

useHead(seoConfig)
</script>


