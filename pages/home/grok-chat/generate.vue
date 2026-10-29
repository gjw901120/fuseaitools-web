<template>
  <HomeLayout>
    <ChatInterface
      tool-name="Grok Chat"
      tool-description="xAI's Grok is built for real-time conversation: strong on current events, science and coding, with a direct answering style and long-context reasoning. The Grok 4 series on FuseAITools runs on the OpenAI Responses protocol with switchable deep thinking, and takes documents and images as input."
      tool-icon="/tools-logo/Grok.png"
      model-category="Grok Chat"
    />
  </HomeLayout>
</template>

<script setup>
import { useToolSEO } from '~/composables/useToolSEO'

const seoConfig = useToolSEO({
  name: 'Grok Chat',
  description: 'xAI\'s Grok is built for real-time conversation: strong on current events, science and coding, with a direct answering style and long-context reasoning. The Grok 4 series on FuseAITools runs on the OpenAI Responses protocol with switchable deep thinking, and takes documents and images as input. Use Grok for free online. No signup required.',
  category: 'chat',
  route: '/home/grok-chat/generate',
  keywords: ['Grok', 'Grok AI', 'xAI', 'Grok 4', 'AI chat', 'conversational AI', 'AI assistant', 'free Grok'],
  applicationCategory: 'ChatApplication',
  applicationSubCategory: 'AI Chat',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Credits-based pricing for Grok chat.',
  // Chat 为 TOKEN 计费（每 100 万 token 积分），不在 /api/common/models/price 的 ONCE/RULE 输出内，只能静态登记。
  // 口径取 sql/chat-grok.md 全 3 个在线模型的**售价列** prompt/completion（不是 loss_* 成本列 83/247）：三档同价 249 / 741
  priceSpecification: { price: 741, minValue: 249, maxValue: 741, eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>
