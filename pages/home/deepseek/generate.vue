<template>
  <HomeLayout>
    <ChatInterface
      tool-name="Deepseek"
      tool-description="DeepSeek delivers strong code intelligence and long-context reasoning: trained on massive code and text, it excels at multi-language programming (80+ languages), debugging, and mathematical reasoning. Open and commercially friendly, it rivals top closed-source models on coding benchmarks. Use DeepSeek on FuseAITools for development support, deep analysis, and creative writing with long-context applications."
      tool-icon="/tools-logo/Deepseek.png"
      model-category="DeepSeek"
    />
  </HomeLayout>
</template>

<script setup>
import { useToolSEO } from '~/composables/useToolSEO'

const seoConfig = useToolSEO({
  name: 'Deepseek',
  description: 'DeepSeek delivers strong code intelligence and long-context reasoning: trained on massive code and text, it excels at multi-language programming (80+ languages), debugging, and mathematical reasoning. Open and commercially friendly, it rivals top closed-source models on coding benchmarks. Use DeepSeek on FuseAITools for free online. No signup required.',
  category: 'chat',
  route: '/home/deepseek/generate',
  keywords: ['Deepseek', 'DeepSeek AI', 'AI chat', 'conversational AI', 'AI assistant', 'free AI chat', 'coding AI'],
  applicationCategory: 'ChatApplication',
  applicationSubCategory: 'AI Chat',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Credits-based pricing for DeepSeek chat.',
  priceSpecification: { price: 260, minValue: 260, maxValue: 260, eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>
