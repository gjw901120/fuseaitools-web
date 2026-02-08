/**
 * Dynamic Sitemap Generator
 * Generates sitemap.xml at root path (/sitemap.xml)
 */

export default defineEventHandler((event) => {
  // Set content type to XML
  setHeader(event, 'Content-Type', 'application/xml')
  
  // Get current date in YYYY-MM-DD format
  const currentDate = new Date().toISOString().split('T')[0]
  const baseUrl = 'https://fuseaitools.com'
  
  // Define all pages with their metadata
  const pages = [
    // Main pages
    {
      loc: '/',
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '1.0'
    },
    {
      loc: '/home',
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.9'
    },
    {
      loc: '/about',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.6'
    },
    {
      loc: '/pricing',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.7'
    },
    {
      loc: '/news',
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.5'
    },

    // 14 个工具二级详情页（模型介绍 + 功能入口，利于 SEO 层级与长尾）
    { loc: '/home/gpt', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/deepseek', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/claude', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/gemini', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/gpt-4o-image', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/flux-kontext', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/nano-banana', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/midjourney', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/suno', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/elevenlabs', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/veo3', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/runway', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/luma', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    { loc: '/home/sora', lastmod: currentDate, changefreq: 'weekly', priority: '0.85' },
    
    // Chat AI Tools（三级 /generate）
    {
      loc: '/home/gpt/generate',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: '/home/deepseek/generate',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: '/home/claude/generate',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: '/home/gemini/generate',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    
    // Image Generation Tools
    {
      loc: '/home/gpt-4o-image/generate',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: '/home/midjourney/imagine',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: '/home/midjourney/upscale',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: '/home/midjourney/vary',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: '/home/flux-kontext/generate',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: '/home/nano-banana/generate',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: '/home/nano-banana/edit',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: '/home/nano-banana/pro-generate',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    
    // Audio Processing Tools
    {
      loc: '/home/elevenlabs/multilingual-v2',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: '/home/elevenlabs/turbo-2-5',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      loc: '/home/elevenlabs/speech-to-text',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      loc: '/home/elevenlabs/sound-effect-v2',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      loc: '/home/elevenlabs/audio-isolation',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      loc: '/home/suno/generate',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: '/home/suno/extend',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      loc: '/home/suno/upload-cover',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      loc: '/home/suno/upload-extend',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      loc: '/home/suno/add-instrumental',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      loc: '/home/suno/add-vocals',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    
    // Video Generation Tools（三级路由）
    {
      loc: '/home/veo3/text-to-video',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: '/home/veo3/first-and-last-to-video',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      loc: '/home/veo3/reference-to-video',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      loc: '/home/veo3/extend',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      loc: '/home/runway/generate',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: '/home/runway/extend',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      loc: '/home/runway/aleph',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      loc: '/home/luma/generate',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: '/home/sora/text-to-video',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: '/home/sora/image-to-video',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: '/home/sora/pro-text-to-video',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: '/home/sora/pro-image-to-video',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: '/home/sora/watermark-remover',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: '/home/sora/pro-storyboard',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    }
  ]
  
  // Generate XML sitemap
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

