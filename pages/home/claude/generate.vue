<template>
  <HomeLayout>
    <ChatInterface
      tool-name="Claude"
      tool-description="Anthropic's Claude is built for nuanced conversation, long documents, and helpful, accurate outputs. Strong on coding, analysis, and multilingual dialogue, with vision to read PDFs, charts, and diagrams."
      tool-icon="/tools-logo/Claude.png"
      model-category="Claude"
    />
  </HomeLayout>
</template>

<script setup>
import { useToolSEO } from '~/composables/useToolSEO'

const seoConfig = useToolSEO({
  name: 'Claude',
  description: 'Anthropic\'s Claude is built for nuanced conversation, long documents, and helpful, accurate outputs. Strong on coding, analysis, and multilingual dialogue, with vision to read PDFs, charts, and diagrams. Use Claude for free online. No signup required.',
  category: 'chat',
  route: '/home/claude/generate',
  keywords: ['Claude', 'Claude AI', 'Anthropic', 'AI chat', 'conversational AI', 'AI assistant', 'free Claude', 'Anthropic Claude'],
  applicationCategory: 'ChatApplication',
  applicationSubCategory: 'AI Chat',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Credits-based pricing for Claude chat.',
  // Chat 为 TOKEN 计费（每 100 万 token 积分），不在 /api/common/models/price 的 ONCE/RULE 输出内，只能静态登记。
  // 口径取 sql/chat-claude-web-search.md 全 13 个在线模型的**售价列** prompt/completion（不是 loss_* 成本列）：最低 claude-haiku-5-5 prompt 21，最高 claude-fable-5 completion 6174
  priceSpecification: { price: 6174, minValue: 21, maxValue: 6174, eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>
