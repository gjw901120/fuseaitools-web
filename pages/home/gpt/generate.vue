<template>
  <HomeLayout>
    <ChatInterface
      tool-name="GPT"
      tool-description="The OpenAI GPT series represents the most advanced conversational AI available today, combining code generation, creative writing, mathematical reasoning, and complex problem-solving in one platform."
      tool-icon="/tools-logo/ChatGpt.png"
      model-category="GPT"
    />
  </HomeLayout>
</template>

<script setup>
import { useToolSEO } from '~/composables/useToolSEO'

const seoConfig = useToolSEO({
  name: 'GPT',
  description: 'The OpenAI GPT series represents the most advanced conversational AI available today, combining code generation, creative writing, mathematical reasoning, and complex problem-solving in one platform. Use GPT (ChatGPT) for free online. No signup required.',
  category: 'chat',
  route: '/home/gpt/generate',
  keywords: ['GPT', 'ChatGPT', 'OpenAI', 'AI chat', 'conversational AI', 'GPT-4', 'AI assistant', 'free ChatGPT', 'online chat AI'],
  applicationCategory: 'ChatApplication',
  applicationSubCategory: 'AI Chat',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Credits-based pricing for GPT chat.',
  priceSpecification: { price: 450, minValue: 20, maxValue: 450, eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>
