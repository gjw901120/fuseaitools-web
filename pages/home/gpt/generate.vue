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
  // Chat 为 TOKEN 计费（每 100 万 token 积分），不在 /api/common/models/price 的 ONCE/RULE 输出内，只能静态登记。
  // 口径取 sql/chat-gpt-reasoning.md 全 8 个在线模型的**售价列** prompt/completion（不是 loss_* 成本列）：最低 gpt-6-luna prompt 9，最高 gpt-6-astra completion 4320
  priceSpecification: { price: 4320, minValue: 9, maxValue: 4320, eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>
