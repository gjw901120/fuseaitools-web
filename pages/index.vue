<template>
  <main class="homepage">
    <HeroSection />
    <ImageGallery />
    <FAQSection />
  </main>
</template>

<script setup>
import { SITE_ORIGIN } from '~/constants/site'

// SEO 配置：突出 AI tools free、注册送 20 credits
useHead({
  title: 'AI Tools Free - FuseAI Tools | 100+ AI Models, 20 Credits on Sign Up',
  meta: [
    { 
      name: 'description', 
      content: 'AI tools free: access 100+ AI models in one platform—ChatGPT, Claude, Ideogram, Veo3, Wan, HappyHorse, Qwen, Seedance, Seedream, ElevenLabs, Suno and more. Register now and get 20 credits free. Free AI chat, image, video, and audio tools.' 
    },
    { 
      name: 'keywords', 
      content: 'AI tools free, free AI tools, AI tools, ChatGPT, Claude, GPT-4, Ideogram, Veo3, Wan, HappyHorse, Qwen, Seedance, Seedream, ElevenLabs, Suno, free AI chat, image generation, video creation, audio processing, AI platform, 20 credits free' 
    },
    // Open Graph tags
    { property: 'og:title', content: 'AI Tools Free | FuseAI Tools - 20 Credits on Sign Up' },
    { property: 'og:description', content: 'AI tools free: 100+ AI models in one platform. Register and get 20 credits free. ChatGPT, Claude, Ideogram, Veo3, Wan, HappyHorse, Qwen, Seedance, Seedream, ElevenLabs, Suno and more.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: SITE_ORIGIN },
    { property: 'og:image', content: `${SITE_ORIGIN}/logo-wide.png` },
    { property: 'og:site_name', content: 'FuseAI Tools' },
    { property: 'og:locale', content: 'en_US' },
    // Twitter Card tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'AI Tools Free | FuseAI Tools - 20 Credits on Sign Up' },
    { name: 'twitter:description', content: 'AI tools free: 100+ AI models in one platform. Register and get 20 credits free.' },
    { name: 'twitter:image', content: `${SITE_ORIGIN}/logo-wide.png` },
    // Additional meta tags
    { name: 'author', content: 'FuseAI Tools' },
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { name: 'googlebot', content: 'index, follow' },
    { name: 'language', content: 'English' },
    { name: 'revisit-after', content: '7 days' }
  ],
  link: [
    { rel: 'canonical', href: SITE_ORIGIN }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "FuseAI Tools",
        "url": SITE_ORIGIN,
        "logo": `${SITE_ORIGIN}/logo-wide.png`,
        "description": "AI tools free: all-in-one platform with 100+ AI models. Register and get 20 credits free. ChatGPT, Claude, Ideogram, Veo3, ElevenLabs, Suno and more.",
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "Customer Service",
          "availableLanguage": "English"
        }
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "FuseAI Tools",
        "url": SITE_ORIGIN,
        "description": "AI tools free: 100+ AI models in one platform. Sign up for 20 free credits."
      })
    }
    // FAQPage 仅由 FAQSection 组件输出，避免重复导致 Google 富媒体结果无效
  ]
})

// 注意：token 处理已移至 plugins/auth.client.js，在所有页面自动处理
</script>

<style scoped>
.homepage {
  min-height: 100vh;
}
</style>