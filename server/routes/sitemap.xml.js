/**
 * Dynamic Sitemap Generator — GET + HEAD（无 .get 后缀，Nitro 才会对 HEAD 也进入本处理器）
 * @see 原 sitemap.xml.get.js 逻辑
 */
import { getEffectiveApiBase } from '../utils/getApiBase'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  if (method !== 'GET' && method !== 'HEAD') {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
  }

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=300, s-maxage=600')

  if (method === 'HEAD') {
    return ''
  }

  const baseUrl = 'https://www.fuseaitools.com'
  const currentDate = new Date().toISOString().split('T')[0]

  let newsPages = []
  try {
    const apiBase = getEffectiveApiBase(event)
    const res = await $fetch(`${apiBase}/news/list`, {
      query: { page: 1, size: 500 }
    })
    const records = res?.data?.records || []
    const list = Array.isArray(records) ? records : []
    newsPages = list
      .filter((r) => r.path && r.isDel !== 1)
      .map((r) => ({
        loc: `/news/${encodeURIComponent(String(r.path).trim())}`,
        lastmod: (r.gmtModified || r.gmtCreate || currentDate).toString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.6'
      }))
  } catch (_) {
    // If news API fails, sitemap still returns static + tool URLs
  }

  const staticPages = [
    { loc: '/', lastmod: currentDate, changefreq: 'daily', priority: '1.0' },
    { loc: '/home', lastmod: currentDate, changefreq: 'daily', priority: '0.9' },
    { loc: '/about', lastmod: currentDate, changefreq: 'monthly', priority: '0.6' },
    { loc: '/pricing', lastmod: currentDate, changefreq: 'monthly', priority: '0.7' },
    { loc: '/news', lastmod: currentDate, changefreq: 'daily', priority: '0.5' },
    { loc: '/credits', lastmod: currentDate, changefreq: 'monthly', priority: '0.6' },

    { loc: '/home/gpt', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/deepseek', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/claude', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/gemini', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/gpt-4o-image', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/gpt-image', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/ideogram', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/imagen4', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/flux-kontext', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/nano-banana', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/midjourney', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/seedream', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/qwen', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/grok', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/suno', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/elevenlabs', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/veo3', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/runway', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/luma', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/sora', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/wan', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/kling', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/seedance', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/hailuo', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },

    { loc: '/home/gpt/generate', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/deepseek/generate', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/claude/generate', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/gemini/generate', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/gpt-4o-image/generate', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/gpt-image/text-to-image', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/gpt-image/image-to-image', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/ideogram/v3-text-to-image', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/ideogram/v3-edit', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/ideogram/v3-remix', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/ideogram/v3-reframe', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/ideogram/character', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/ideogram/character-edit', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/ideogram/character-remix', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/midjourney/imagine', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/midjourney/upscale', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/midjourney/vary', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/flux-kontext/generate', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/flux-kontext/flux-2-text-to-image', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/flux-kontext/flux-2-image-to-image', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/flux-kontext/flux-2-pro-text-to-image', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/flux-kontext/flux-2-pro-image-to-image', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/nano-banana/generate', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/nano-banana/edit', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/nano-banana/pro-generate', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/nano-banana/nano-banana-2', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/elevenlabs/multilingual-v2', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/elevenlabs/turbo-2-5', lastmod: currentDate, changefreq: 'weekly', priority: '0.7' },
    { loc: '/home/elevenlabs/speech-to-text', lastmod: currentDate, changefreq: 'weekly', priority: '0.7' },
    { loc: '/home/elevenlabs/sound-effect-v2', lastmod: currentDate, changefreq: 'weekly', priority: '0.7' },
    { loc: '/home/elevenlabs/audio-isolation', lastmod: currentDate, changefreq: 'weekly', priority: '0.7' },
    { loc: '/home/suno/generate', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/suno/extend', lastmod: currentDate, changefreq: 'weekly', priority: '0.7' },
    { loc: '/home/suno/upload-cover', lastmod: currentDate, changefreq: 'weekly', priority: '0.7' },
    { loc: '/home/suno/upload-extend', lastmod: currentDate, changefreq: 'weekly', priority: '0.7' },
    { loc: '/home/suno/add-instrumental', lastmod: currentDate, changefreq: 'weekly', priority: '0.7' },
    { loc: '/home/suno/add-vocals', lastmod: currentDate, changefreq: 'weekly', priority: '0.7' },
    { loc: '/home/veo3/text-to-video', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/veo3/first-and-last-to-video', lastmod: currentDate, changefreq: 'weekly', priority: '0.7' },
    { loc: '/home/veo3/reference-to-video', lastmod: currentDate, changefreq: 'weekly', priority: '0.7' },
    { loc: '/home/veo3/extend', lastmod: currentDate, changefreq: 'weekly', priority: '0.7' },
    { loc: '/home/runway/generate', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/runway/extend', lastmod: currentDate, changefreq: 'weekly', priority: '0.7' },
    { loc: '/home/runway/aleph', lastmod: currentDate, changefreq: 'weekly', priority: '0.7' },
    { loc: '/home/luma/generate', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/sora/text-to-video', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/sora/image-to-video', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/sora/pro-text-to-video', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/sora/pro-image-to-video', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/sora/watermark-remover', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/sora/pro-storyboard', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/qwen/text-to-image', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/qwen/image-to-image', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/qwen/image-edit', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/qwen/z-image', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/qwen/2-text-to-image', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/qwen/2-image-edit', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/grok/text-to-image', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/grok/image-to-image', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/grok/text-to-video', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/grok/image-to-video', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/grok/upscale', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/grok/extend', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/imagen4/imagen4-generate', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/imagen4/imagen4-fast', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/imagen4/imagen4-ultra', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/wan/text-to-video', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/wan/image-to-video', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/wan/video-to-video', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/kling/v2-5-turbo-image-to-video-pro', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/kling/v2-5-turbo-text-to-video-pro', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/kling/v2-6-text-to-video', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/kling/v2-6-image-to-video', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/kling/v2-6-motion-control', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/kling/v3-0-motion-control', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/kling/ai-avatar-standard', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/kling/ai-avatar-pro', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/kling/v3-0-video', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/seedream/5-lite-text-to-image', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/seedream/5-lite-image-to-image', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/seedance/v1-lite-text-to-video', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/seedance/v1-lite-image-to-video', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/seedance/v1-pro-text-to-video', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/seedance/v1-pro-image-to-video', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/seedance/v1-pro-fast-image-to-video', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/seedance/v1-5-pro', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/hailuo/image-to-video-standard', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    { loc: '/home/hailuo/image-to-video-pro', lastmod: currentDate, changefreq: 'weekly', priority: '0.8' }
  ]

  const pages = [...staticPages, ...newsPages]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return sitemap
})
