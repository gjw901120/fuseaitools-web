<template>
  <main class="homepage">
    <HeroSection />
    <ImageGallery />
    <FAQSection />
  </main>
</template>

<script setup>
// 首页整合所有主要组件
const route = useRoute()
const router = useRouter()
const { login } = useAuth()

// SEO 配置：突出 AI tools free、注册送 100 credits
useHead({
  title: 'AI Tools Free - FuseAI Tools | 50+ AI Models, 100 Credits on Sign Up',
  meta: [
    { 
      name: 'description', 
      content: 'AI tools free: access 50+ AI models in one platform—ChatGPT, Claude, Midjourney, Veo3, ElevenLabs, Suno and more. Register now and get 100 credits free. Free AI chat, image, video, and audio tools.' 
    },
    { 
      name: 'keywords', 
      content: 'AI tools free, free AI tools, AI tools, ChatGPT, Claude, GPT-4, Midjourney, Veo3, ElevenLabs, Suno, free AI chat, image generation, video creation, audio processing, AI platform, 100 credits free' 
    },
    // Open Graph tags
    { property: 'og:title', content: 'AI Tools Free | FuseAI Tools - 100 Credits on Sign Up' },
    { property: 'og:description', content: 'AI tools free: 50+ AI models in one platform. Register and get 100 credits free. ChatGPT, Claude, Midjourney, Veo3, ElevenLabs, Suno and more.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://fuseaitools.com' },
    { property: 'og:image', content: 'https://fuseaitools.com/og-image.jpg' },
    { property: 'og:site_name', content: 'FuseAI Tools' },
    { property: 'og:locale', content: 'en_US' },
    // Twitter Card tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'AI Tools Free | FuseAI Tools - 100 Credits on Sign Up' },
    { name: 'twitter:description', content: 'AI tools free: 50+ AI models in one platform. Register and get 100 credits free.' },
    { name: 'twitter:image', content: 'https://fuseaitools.com/og-image.jpg' },
    // Additional meta tags
    { name: 'author', content: 'FuseAI Tools' },
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { name: 'googlebot', content: 'index, follow' },
    { name: 'language', content: 'English' },
    { name: 'revisit-after', content: '7 days' }
  ],
  link: [
    { rel: 'canonical', href: 'https://fuseaitools.com' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "FuseAI Tools",
        "url": "https://fuseaitools.com",
        "logo": "https://fuseaitools.com/favicon.ico",
        "description": "AI tools free: all-in-one platform with 50+ AI models. Register and get 100 credits free. ChatGPT, Claude, Midjourney, Veo3, ElevenLabs, Suno and more.",
        "sameAs": [
          // Add social media links if available
        ],
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
        "url": "https://fuseaitools.com",
        "description": "AI tools free: 50+ AI models in one platform. Sign up for 100 free credits.",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://fuseaitools.com/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://fuseaitools.com"
          }
        ]
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is FuseAI?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "FuseAI is an integrated artificial intelligence platform that brings together various cutting-edge AI tools, including chat, image generation, audio processing, and video creation. The platform's objective is to enable users to easily access and utilize the most comprehensive AI capabilities from a single location."
            }
          },
          {
            "@type": "Question",
            "name": "How to use FuseAI?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Users can access the platform simply by completing registration. Upon registration, users can enjoy over 50 professional AI models and tools. FuseAI is designed to meet various needs, whether it's getting inspiration through intelligent dialogue, creating visual works with text-to-image tools, processing and optimizing audio, or generating high-quality video content."
            }
          },
          {
            "@type": "Question",
            "name": "Is FuseAI free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. FuseAI offers AI tools free: when you register you get 100 credits free to try all models—chat, image, audio, and video. No credit card required. We also have subscription plans with more credits and discounts for heavy users, and pay-as-you-go top-up."
            }
          },
          {
            "@type": "Question",
            "name": "How does FuseAI work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The core of FuseAI lies in its powerful model integration. It seamlessly integrates industry-leading AI technologies, including ChatGPT, Claude, Gemini for dialogue and reasoning; Midjourney, Flux Kontext for image generation; Suno, ElevenLabs for audio processing; and Veo3, Runway, Luma, Sora for video generation. Through a unified, user-friendly interface, we integrate these scattered cutting-edge capabilities into a coherent workflow, providing you with a one-stop AI solution."
            }
          }
        ]
      })
    }
  ]
})

// 注意：token 处理已移至 plugins/auth.client.js，在所有页面自动处理
</script>

<style scoped>
.homepage {
  min-height: 100vh;
}
</style>