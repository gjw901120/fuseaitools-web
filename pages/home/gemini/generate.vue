<template>
  <HomeLayout>
    <ChatInterface
      tool-name="Gemini"
      tool-description="Google's Gemini brings native multimodal understanding and agentic capabilities: text, image, audio, and video in one architecture; tool use (Search, Maps, code execution); and multi-step reasoning under user oversight. Gemini 2.0 is tuned for the agentic era—context understanding, planning ahead, and supervised actions. Use Gemini on FuseAITools for chat, coding, research, and any task that benefits from grounding and tools."
      tool-icon="/tools-logo/Gemini.png"
      model-category="Gemini"
    />
  </HomeLayout>
</template>

<script setup>
import { useToolSEO } from '~/composables/useToolSEO'

const seoConfig = useToolSEO({
  name: 'Gemini',
  description: 'Google\'s Gemini brings native multimodal understanding and agentic capabilities: text, image, audio, and video in one architecture; tool use (Search, Maps, code execution); and multi-step reasoning under user oversight. Gemini 2.0 is tuned for the agentic era—context understanding, planning ahead, and supervised actions. Use Gemini on FuseAITools for chat, coding, research, and any task that benefits from grounding and tools. Use Gemini for free online. No signup required.',
  category: 'chat',
  route: '/home/gemini/generate',
  keywords: ['Gemini', 'Google Gemini', 'Gemini AI', 'AI chat', 'conversational AI', 'Google AI', 'multimodal AI', 'free Gemini'],
  applicationCategory: 'ChatApplication',
  applicationSubCategory: 'AI Chat',
  offers: { price: '0', priceCurrency: 'USD' },
  offerDescription: 'Credits-based pricing for Gemini chat.',
  // Chat 为 TOKEN 计费（每 100 万 token 积分），不在 /api/common/models/price 的 ONCE/RULE 输出内，只能静态登记。
  // 口径取 sql/chat-gemini-native-stream.md 全 3 个在线模型的**售价列** prompt/completion（不是 loss_prompt/loss_completion 成本列）：
  // 最低 gemini-3-6/3-8-flash prompt 72，最高 gemini-4-argon completion 1236
  priceSpecification: { price: 1236, minValue: 72, maxValue: 1236, eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>
