/**
 * Footer 工具导航列（顺序固定）
 */
export const footerNavColumns = [
  {
    title: 'AI CHAT',
    links: [
      { label: 'GPT', to: '/home/gpt/generate' },
      { label: 'Claude', to: '/home/claude/generate' },
      { label: 'Gemini', to: '/home/gemini/generate' },
      { label: 'DeepSeek', to: '/home/deepseek/generate' },
    ],
  },
  {
    title: 'AI IMAGE',
    links: [
      { label: 'Seedream 5.0', to: '/home/seedream/5-lite-text-to-image', badge: 'New' },
      { label: 'Nano Banana 2', to: '/home/nano-banana/nano-banana-2', badge: 'New' },
      { label: 'Wan 2.7', to: '/home/wan/2-7-image', badge: 'New' },
      { label: 'GPT Image 2', to: '/home/gpt-image/v2-text-to-image' },
      { label: 'Qwen 2', to: '/home/qwen/v2-text-to-image' },
      { label: 'Flux 2', to: '/home/flux-kontext/flux-2-text-to-image' },
      { label: 'Ideogram 3', to: '/home/ideogram/v3-text-to-image' },
      { label: 'Imagen4', to: '/home/imagen4/imagen4-generate' },
      { label: 'Grok', to: '/home/grok/text-to-image' },
    ],
  },
  {
    title: 'AI VIDEO',
    links: [
      { label: 'HappyHorse', to: '/home/happy-horse/v1-text-to-video', badge: 'New' },
      { label: 'Seedance 2', to: '/home/seedance/v2', badge: 'New' },
      { label: 'Sora 2', to: '/home/sora/text-to-video', badge: 'New' },
      { label: 'Veo 3.1', to: '/home/veo3/text-to-video', badge: 'New' },
      { label: 'Wan 2.7', to: '/home/wan/v2-7-text-to-video', badge: 'New' },
      { label: 'Kling v3', to: '/home/kling/v3-0-video', badge: 'New' },
      { label: 'Hailuo', to: '/home/hailuo/image-to-video-pro' },
      { label: 'Runway', to: '/home/runway/generate' },
      { label: 'Grok', to: '/home/grok/text-to-video' },
      { label: 'Luma', to: '/home/luma/generate' },
    ],
  },
  {
    title: 'AI AUDIO',
    links: [
      { label: 'Suno', to: '/home/suno/generate' },
      { label: 'ElevenLabs', to: '/home/elevenlabs/multilingual-v2' },
    ],
  },
]

export const footerBrand = {
  description:
    'The all-in-one AI platform for stunning chat, image, video, and music creation.',
  descriptionSecondary:
    'Your intelligent AI assistant for work, learning, and creativity. Powered by advanced artificial intelligence technology.',
  email: 'support@fuseaitools.com',
}
