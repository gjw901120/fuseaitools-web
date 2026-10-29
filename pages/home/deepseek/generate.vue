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
  // Chat 为 TOKEN 计费（每 100 万 token 积分），不在 /api/common/models/price 的 ONCE/RULE 输出内，只能静态登记。
  // 口径取 sql/chat-deepseek.md 的**售价列** prompt/completion（不是 loss_* 成本列）：当前通道仅 deepseek-v4-1-flash 在线，prompt 39 / completion 147
  priceSpecification: { price: 147, minValue: 39, maxValue: 147, eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>
