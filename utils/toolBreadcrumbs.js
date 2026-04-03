export const TOOL_PARENT_LABEL_BY_SLUG = {
  // image
  'gpt-4o-image': 'GPT 4o Image',
  'gpt-image': 'GPT Image',
  ideogram: 'Ideogram',
  'flux-kontext': 'Flux Kontext',
  'nano-banana': 'Nano Banana',
  midjourney: 'Midjourney',
  seedream: 'Seedream',
  qwen: 'Qwen',
  imagen4: 'Imagen4',
  grok: 'Grok',
  // audio
  suno: 'Suno',
  elevenlabs: 'Elevenlabs',
  // video
  veo3: 'Veo3',
  runway: 'Runway',
  luma: 'Luma',
  sora: 'Sora',
  wan: 'Wan',
  seedance: 'Seedance',
  hailuo: 'Hailuo',
  kling: 'Kling'
}

export const CHILD_LABEL_OVERRIDES_BY_ROUTE = {
  // image
  '/home/gpt-4o-image/generate': 'Generate',
  '/home/gpt-image/text-to-image': 'Text to Image',
  '/home/gpt-image/image-to-image': 'Image to Image',
  '/home/ideogram/v3-text-to-image': 'V3 Text to Image',
  '/home/ideogram/v3-edit': 'V3 Edit',
  '/home/ideogram/v3-remix': 'V3 Remix',
  '/home/ideogram/v3-reframe': 'V3 Reframe',
  '/home/ideogram/character': 'Character',
  '/home/ideogram/character-edit': 'Character Edit',
  '/home/ideogram/character-remix': 'Character Remix',
  '/home/flux-kontext/generate': 'Generate',
  '/home/flux-kontext/flux-2-text-to-image': 'Flux 2 Text to Image',
  '/home/flux-kontext/flux-2-image-to-image': 'Flux 2 Image to Image',
  '/home/flux-kontext/flux-2-pro-text-to-image': 'Flux 2 Pro Text to Image',
  '/home/flux-kontext/flux-2-pro-image-to-image': 'Flux 2 Pro Image to Image',
  '/home/nano-banana/generate': 'Generate',
  '/home/nano-banana/edit': 'Edit',
  '/home/nano-banana/pro-generate': 'Pro Generate',
  '/home/nano-banana/nano-banana-2': 'Nano Banana 2',
  '/home/midjourney/imagine': 'Imagine',
  '/home/midjourney/upscale': 'Upscale',
  '/home/midjourney/vary': 'Vary',
  '/home/seedream/5-lite-text-to-image': '5 Lite Text to Image',
  '/home/seedream/5-lite-image-to-image': '5 Lite Image to Image',
  '/home/qwen/text-to-image': 'Text to Image',
  '/home/qwen/image-to-image': 'Image to Image',
  '/home/qwen/image-edit': 'Image Edit',
  '/home/qwen/z-image': 'Z-Image',
  '/home/qwen/2-text-to-image': 'Qwen2 Text to Image',
  '/home/qwen/2-image-edit': 'Qwen2 Image Edit',
  '/home/imagen4/imagen4-generate': 'Imagen4 Generate',
  '/home/imagen4/imagen4-fast': 'Imagen4 Fast',
  '/home/imagen4/imagen4-ultra': 'Imagen4 Ultra',
  '/home/grok/text-to-image': 'Text to Image',
  '/home/grok/image-to-image': 'Image to Image',
  '/home/grok/text-to-video': 'Text to Video',
  '/home/grok/image-to-video': 'Image to Video',
  '/home/grok/upscale': 'Upscale',
  '/home/grok/extend': 'Extend',
  // audio
  '/home/suno/generate': 'Generate',
  '/home/suno/extend': 'Extend',
  '/home/suno/upload-cover': 'Upload Cover',
  '/home/suno/upload-extend': 'Upload Extend',
  '/home/suno/add-instrumental': 'Add Instrumental',
  '/home/suno/add-vocals': 'Add Vocals',
  '/home/elevenlabs/multilingual-v2': 'Multilingual V2',
  '/home/elevenlabs/turbo-2-5': 'Turbo 2.5',
  '/home/elevenlabs/speech-to-text': 'Speech to Text',
  '/home/elevenlabs/sound-effect-v2': 'Sound Effect V2',
  '/home/elevenlabs/audio-isolation': 'Audio Isolation',
  // video
  '/home/veo3/text-to-video': 'Text to Video',
  '/home/veo3/first-and-last-to-video': 'First and Last to Video',
  '/home/veo3/reference-to-video': 'Reference to Video',
  '/home/veo3/extend': 'Extend',
  '/home/runway/generate': 'Generate',
  '/home/runway/extend': 'Extend',
  '/home/runway/aleph': 'Aleph',
  '/home/luma/generate': 'Generate',
  '/home/sora/text-to-video': 'Text to Video',
  '/home/sora/image-to-video': 'Image to Video',
  '/home/sora/pro-text-to-video': 'Pro Text to Video',
  '/home/sora/pro-image-to-video': 'Pro Image to Video',
  '/home/sora/watermark-remover': 'Watermark Remover',
  '/home/sora/pro-storyboard': 'Pro Storyboard',
  '/home/wan/text-to-video': 'Text to Video',
  '/home/wan/image-to-video': 'Image to Video',
  '/home/wan/video-to-video': 'Video to Video',
  '/home/seedance/v1-lite-text-to-video': 'V1 Lite Text to Video',
  '/home/seedance/v1-lite-image-to-video': 'V1 Lite Image to Video',
  '/home/seedance/v1-pro-text-to-video': 'V1 Pro Text to Video',
  '/home/seedance/v1-pro-image-to-video': 'V1 Pro Image to Video',
  '/home/seedance/v1-pro-fast-image-to-video': 'V1 Pro Fast Image to Video',
  '/home/seedance/v1-5-pro': 'V1.5 Pro',
  '/home/hailuo/image-to-video-standard': 'Image to Video Standard',
  '/home/hailuo/image-to-video-pro': 'Image to Video Pro',
  '/home/kling/v2-5-turbo-image-to-video-pro': 'V2.5 Turbo Image to Video Pro',
  '/home/kling/v2-5-turbo-text-to-video-pro': 'V2.5 Turbo Text to Video Pro',
  '/home/kling/v2-6-text-to-video': 'V2.6 Text to Video',
  '/home/kling/v2-6-image-to-video': 'V2.6 Image to Video',
  '/home/kling/v2-6-motion-control': 'V2.6 Motion Control',
  '/home/kling/v3-0-motion-control': 'V3.0 Motion Control',
  '/home/kling/ai-avatar-standard': 'AI Avatar Standard',
  '/home/kling/ai-avatar-pro': 'AI Avatar Pro',
  '/home/kling/v3-0-video': 'V3.0 Video'
}

const PARENT_TO_OVERRIDES_BY_ROUTE = {
  '/home/grok/text-to-video': '/home/grok/text-to-video',
  '/home/grok/image-to-video': '/home/grok/text-to-video',
  '/home/grok/upscale': '/home/grok/text-to-video',
  '/home/grok/extend': '/home/grok/text-to-video'
}

export function getToolBreadcrumbByRoute(routePath = '', fallbackCurrent = '') {
  const path = (routePath || '').replace(/\/$/, '')
  const segments = path.split('/').filter(Boolean)
  const isHomeToolRoute = segments[0] === 'home' && segments.length >= 2
  if (!isHomeToolRoute) {
    return {
      parentLabel: '',
      parentTo: '',
      currentLabel: fallbackCurrent || ''
    }
  }
  const toolSlug = segments[1]
  const parentLabel = TOOL_PARENT_LABEL_BY_SLUG[toolSlug] || ''
  const isToolChildRoute = segments.length >= 3
  if (!isToolChildRoute) {
    return {
      parentLabel: '',
      parentTo: '',
      currentLabel: parentLabel || fallbackCurrent || ''
    }
  }
  const parentTo = isToolChildRoute && parentLabel
    ? (PARENT_TO_OVERRIDES_BY_ROUTE[path] || `/home/${toolSlug}`)
    : ''
  const currentLabel = isToolChildRoute
    ? (CHILD_LABEL_OVERRIDES_BY_ROUTE[path] || fallbackCurrent || parentLabel)
    : (parentLabel || fallbackCurrent || '')
  return { parentLabel, parentTo, currentLabel }
}
