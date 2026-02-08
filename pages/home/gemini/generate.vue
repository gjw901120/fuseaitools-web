<template>
  <HomeLayout>
    <ChatInterface
      tool-name="Gemini"
      tool-description="Google AI assistant"
      tool-icon="/tools-logo/Gemini.png"
      model-category="Gemini"
    />
  </HomeLayout>
</template>

<script setup>
import { useToolSEO } from '~/composables/useToolSEO'

const seoConfig = useToolSEO({
  name: 'Gemini',
  description: 'Use Google Gemini AI for free online. Google\'s advanced conversational AI assistant for chat, analysis, multimodal understanding, and creative tasks. No signup required.',
  category: 'chat',
  route: '/home/gemini/generate',
  keywords: ['Gemini', 'Google Gemini', 'Gemini AI', 'AI chat', 'conversational AI', 'Google AI', 'multimodal AI', 'free Gemini'],
  applicationCategory: 'ChatApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>
