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
  priceSpecification: { price: 650, minValue: 130, maxValue: 650, eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>
