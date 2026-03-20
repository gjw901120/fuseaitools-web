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
  priceSpecification: { price: 260, minValue: 40, maxValue: 260, eligibleQuantityName: 'Credits Required' }
})
useHead(seoConfig)
</script>
