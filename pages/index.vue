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

// SEO 配置
useHead({
  title: 'FuseAI Tools - All-in-One AI Platform | 50+ AI Models & Tools',
  meta: [
    { 
      name: 'description', 
      content: 'Access 50+ AI models and tools in one platform. ChatGPT, Claude, GPT-4, Midjourney, Veo3, ElevenLabs, Suno and more. Free AI chat, image generation, video creation, and audio processing tools.' 
    },
    { 
      name: 'keywords', 
      content: 'AI tools, ChatGPT, Claude, GPT-4, Midjourney, Veo3, ElevenLabs, Suno, AI chat, image generation, video creation, audio processing, AI platform, artificial intelligence tools' 
    },
    // Open Graph tags
    { property: 'og:title', content: 'FuseAI Tools - All-in-One AI Platform | 50+ AI Models & Tools' },
    { property: 'og:description', content: 'Access 50+ AI models and tools in one platform. ChatGPT, Claude, GPT-4, Midjourney, Veo3, ElevenLabs, Suno and more.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://fuseaitools.com' },
    { property: 'og:image', content: 'https://fuseaitools.com/og-image.jpg' },
    { property: 'og:site_name', content: 'FuseAI Tools' },
    { property: 'og:locale', content: 'en_US' },
    // Twitter Card tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'FuseAI Tools - All-in-One AI Platform | 50+ AI Models & Tools' },
    { name: 'twitter:description', content: 'Access 50+ AI models and tools in one platform. ChatGPT, Claude, GPT-4, Midjourney, Veo3, ElevenLabs, Suno and more.' },
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
        "description": "All-in-one AI platform integrating 50+ AI models and tools including ChatGPT, Claude, GPT-4, Midjourney, Veo3, ElevenLabs, and Suno.",
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
        "description": "All-in-one AI platform with 50+ AI models and tools",
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
              "text": "Yes, FuseAI offers flexible experience plans. Users who register receive 100 points, which allows them to experience all models on the site without barriers. There are multiple subscription plans designed to provide more substantial point quotas and exclusive discounts, catering to high-frequency and professional users. The platform also supports direct top-up of points for on-demand usage."
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

// 检查 URL 中是否有 token 参数
onMounted(() => {
  const token = route.query.token
  
  if (token) {
    // 解析并保存 token
    const success = login(token)
    
    if (success) {
      // 登录成功，移除 URL 中的 token 参数
      router.replace({ path: route.path, query: {} })
    } else {
      // 登录失败，也移除 token 参数
      router.replace({ path: route.path, query: {} })
    }
  }
})
</script>

<style scoped>
.homepage {
  min-height: 100vh;
}
</style>