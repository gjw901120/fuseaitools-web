<template>
  <HomeLayout>
    <ChatInterface
      tool-name="Claude"
      tool-description="Anthropic AI assistant"
      tool-icon="/tools-logo/Claude.png"
      model-category="Claude"
    />
  </HomeLayout>
</template>

<script setup>
import { useToolSEO } from '~/composables/useToolSEO'

const seoConfig = useToolSEO({
  name: 'Claude',
  description: 'Use Claude AI for free online. Anthropic\'s advanced conversational AI assistant for chat, analysis, writing, and complex reasoning. Access Claude instantly without signup.',
  category: 'chat',
  route: '/home/claude/generate',
  keywords: ['Claude', 'Claude AI', 'Anthropic', 'AI chat', 'conversational AI', 'AI assistant', 'free Claude', 'Anthropic Claude'],
  applicationCategory: 'ChatApplication',
  offers: { price: '0', priceCurrency: 'USD' }
})
useHead(seoConfig)
</script>
