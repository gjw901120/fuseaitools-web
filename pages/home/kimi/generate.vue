<template>
  <HomeLayout>
    <ChatInterface
      tool-name="Kimi"
      tool-description="Moonshot's Kimi is a long-context reasoning model built for document-heavy work: read whole manuals, codebases and reports in one pass, answer with the source in mind, and show its reasoning step by step. Kimi k3 on FuseAITools streams thinking content, so you can inspect how an answer was reached."
      tool-icon="/tools-logo/Kimi.svg"
      model-category="Kimi"
    />
  </HomeLayout>
</template>

<script setup>
import { useToolSEO } from '~/composables/useToolSEO'

const seoConfig = useToolSEO({
  name: 'Kimi',
  description: 'Moonshot\'s Kimi is a long-context reasoning model built for document-heavy work: read whole manuals, codebases and reports in one pass, answer with the source in mind, and show its reasoning step by step. Kimi k3 on FuseAITools streams thinking content, so you can inspect how an answer was reached. Use Kimi for free online. No signup required.',
  category: 'chat',
  route: '/home/kimi/generate',
  keywords: ['Kimi', 'Kimi AI', 'Moonshot AI', 'Kimi k3', 'AI chat', 'long context AI', 'AI assistant', 'free Kimi'],
  applicationCategory: 'ChatApplication',
  applicationSubCategory: 'AI Chat',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Credits-based pricing for Kimi chat.',
  // Chat 为 TOKEN 计费（每 100 万 token 积分），不在 /api/common/models/price 的 ONCE/RULE 输出内，只能静态登记。
  // 口径取 sql/chat-kimi.md 的**售价列** prompt/completion（不是 loss_* 成本列 247/1235）：当前通道仅 kimi-k3 在线，741 / 3705
  priceSpecification: { price: 3705, minValue: 741, maxValue: 3705, eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>
