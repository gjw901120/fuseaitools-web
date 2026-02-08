export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,

  // SEO：服务端 301 永久重定向（仅旧二级路径 -> 新三级路径；父路径 /home/{tool} 已改为静态详情页，不再 301）
  routeRules: {
    // 旧二级路径 -> 新三级路径
    '/home/suno-extend': { redirect: { to: '/home/suno/extend', statusCode: 301 } },
    '/home/suno-generate': { redirect: { to: '/home/suno/generate', statusCode: 301 } },
    '/home/suno-upload-cover': { redirect: { to: '/home/suno/upload-cover', statusCode: 301 } },
    '/home/suno-upload-extend': { redirect: { to: '/home/suno/upload-extend', statusCode: 301 } },
    '/home/suno-add-instrumental': { redirect: { to: '/home/suno/add-instrumental', statusCode: 301 } },
    '/home/suno-add-vocals': { redirect: { to: '/home/suno/add-vocals', statusCode: 301 } },
    '/home/veo3-extend': { redirect: { to: '/home/veo3/extend', statusCode: 301 } },
    '/home/veo3-text-to-video': { redirect: { to: '/home/veo3/text-to-video', statusCode: 301 } },
    '/home/veo3-first-and-last-to-video': { redirect: { to: '/home/veo3/first-and-last-to-video', statusCode: 301 } },
    '/home/veo3-reference-to-video': { redirect: { to: '/home/veo3/reference-to-video', statusCode: 301 } },
    '/home/runway-generate': { redirect: { to: '/home/runway/generate', statusCode: 301 } },
    '/home/runway-extend': { redirect: { to: '/home/runway/extend', statusCode: 301 } },
    '/home/runway-aleph': { redirect: { to: '/home/runway/aleph', statusCode: 301 } },
    '/home/midjourney-imagine': { redirect: { to: '/home/midjourney/imagine', statusCode: 301 } },
    '/home/midjourney-upscale': { redirect: { to: '/home/midjourney/upscale', statusCode: 301 } },
    '/home/midjourney-vary': { redirect: { to: '/home/midjourney/vary', statusCode: 301 } },
    '/home/nano-banana-edit': { redirect: { to: '/home/nano-banana/edit', statusCode: 301 } },
    '/home/nano-banana-pro': { redirect: { to: '/home/nano-banana/pro-generate', statusCode: 301 } },
    '/home/elevenlabs-multilingual-v2': { redirect: { to: '/home/elevenlabs/multilingual-v2', statusCode: 301 } },
    '/home/elevenlabs-turbo-2-5': { redirect: { to: '/home/elevenlabs/turbo-2-5', statusCode: 301 } },
    '/home/elevenlabs-speech-to-text': { redirect: { to: '/home/elevenlabs/speech-to-text', statusCode: 301 } },
    '/home/elevenlabs-sound-effect-v2': { redirect: { to: '/home/elevenlabs/sound-effect-v2', statusCode: 301 } },
    '/home/elevenlabs-audio-isolation': { redirect: { to: '/home/elevenlabs/audio-isolation', statusCode: 301 } }
  },

  nitro: {
    // 根据环境变量决定使用静态或服务器模式
    // Docker 运行时使用 node-server，否则使用 static
    preset: process.env.NITRO_PRESET || 'static',
    prerender: {
      crawlLinks: true,
      // 如果路由不存在，不抛出错误（适用于 node-server preset）
      failOnError: false,
      routes: [
        '/',
        '/about',
        '/pricing',
        '/news',
        // 14 个工具二级静态详情页（模型介绍 + 功能入口）
        '/home/gpt',
        '/home/deepseek',
        '/home/claude',
        '/home/gemini',
        '/home/gpt-4o-image',
        '/home/flux-kontext',
        '/home/nano-banana',
        '/home/midjourney',
        '/home/suno',
        '/home/elevenlabs',
        '/home/veo3',
        '/home/runway',
        '/home/luma',
        '/home/sora',
        // 三级功能页
        '/home/gpt/generate',
        '/home/deepseek/generate',
        '/home/claude/generate',
        '/home/gemini/generate',
        '/home/gpt-4o-image/generate',
        '/home/flux-kontext/generate',
        '/home/elevenlabs/multilingual-v2',
        '/home/elevenlabs/turbo-2-5',
        '/home/elevenlabs/speech-to-text',
        '/home/elevenlabs/sound-effect-v2',
        '/home/elevenlabs/audio-isolation',
        '/home/nano-banana/generate',
        '/home/nano-banana/edit',
        '/home/nano-banana/pro-generate',
        '/home/midjourney/imagine',
        '/home/midjourney/upscale',
        '/home/midjourney/vary',
        '/home/veo3/text-to-video',
        '/home/veo3/first-and-last-to-video',
        '/home/veo3/reference-to-video',
        '/home/veo3/extend',
        '/home/runway/generate',
        '/home/runway/extend',
        '/home/runway/aleph',
        '/home/luma/generate',
        '/home/sora/text-to-video',
        '/home/sora/image-to-video',
        '/home/sora/pro-text-to-video',
        '/home/sora/pro-image-to-video',
        '/home/sora/watermark-remover',
        '/home/sora/pro-storyboard',
        '/home/suno/generate',
        '/home/suno/extend',
        '/home/suno/upload-cover',
        '/home/suno/upload-extend',
        '/home/suno/add-instrumental',
        '/home/suno/add-vocals'
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
      title: 'FuseAITools: The All-in-One AI Platform',
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
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon.ico' },
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
      apiBase: process.env.NODE_ENV === 'production' 
        ? 'https://www.fuseaitools.com/api' 
        : 'http://127.0.0.1:8080/api'
    }
  }
})