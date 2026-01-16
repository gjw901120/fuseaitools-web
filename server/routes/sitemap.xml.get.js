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
      loc: '/tools',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      loc: '/news',
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.5'
    },
    
    // Chat AI Tools
    {
      loc: '/home/gpt',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: '/home/deepseek',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: '/home/claude',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: '/home/gemini',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    
    // Image Generation Tools
    {
      loc: '/home/gpt-4o-image',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: '/home/midjourney',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: '/home/flux-kontext',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: '/home/nano-banana',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    
    // Audio Processing Tools
    {
      loc: '/home/elevenlabs',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: '/home/elevenlabs/multilingual-v2',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
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
      loc: '/home/suno',
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
      loc: '/home/suno/cover',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      loc: '/home/suno/expand',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      loc: '/home/suno/accompaniment',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      loc: '/home/suno/vocal',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    
    // Video Generation Tools
    {
      loc: '/home/veo3',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: '/home/runway',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: '/home/luma',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: '/home/sora',
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

