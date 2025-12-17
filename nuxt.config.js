export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/about',
        '/pricing',
        '/tools',
        '/news',
        '/home/gpt-4o-image',
        '/home/flux-kontext',
        '/home/elevenlabs',
        '/home/elevenlabs/multilingual-v2',
        '/home/elevenlabs/turbo-2-5',
        '/home/elevenlabs/speech-to-text',
        '/home/elevenlabs/sound-effect-v2',
        '/home/elevenlabs/audio-isolation',
        '/home/nano-banana',
        '/home/midjourney',
        '/home/veo3',
        '/home/runway',
        '/home/luma',
        '/home/suno',
        '/home/suno/extend',
        '/home/suno/cover',
        '/home/suno/expand',
        '/home/suno/accompaniment',
        '/home/suno/vocal'
      ]
    }
  },

  css: [
    '@/assets/css/container.css',
    '@/assets/css/main.css'
  ],

  modules: [],

  app: {
    head: {
      title: 'SimplyAITools: The All-in-One AI Platform',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'all-in-one platform integrating top AI models like ChatGPT, Claude, Veo3, Elevenlabs, Suno and Midjourney. Use visual workflows and one account to save costs and boost efficiency in creation, coding, and data analysis.' },
        { name: 'keywords', content: 'all-in-one platform, chat models, video models, image models, radio models, simply ai tools' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
        }
      ]
    }
  },

  runtimeConfig: {
    public: {
      apiBase: '/api'
    }
  }
})