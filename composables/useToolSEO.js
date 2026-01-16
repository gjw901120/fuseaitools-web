/**
 * 工具页面 SEO 配置 composable
 * 为所有工具页面提供统一的 SEO 配置
 */

export const useToolSEO = (toolInfo) => {
  const {
    name,
    description,
    category, // 'chat', 'image', 'audio', 'video'
    route,
    keywords = [],
    applicationCategory = '',
    operatingSystem = 'Web',
    offers = {
      price: '0',
      priceCurrency: 'USD'
    }
  } = toolInfo

  const baseUrl = 'https://fuseaitools.com'
  const fullUrl = `${baseUrl}${route}`
  const categoryLabels = {
    chat: 'Chat AI',
    image: 'Image Generation',
    audio: 'Audio Processing',
    video: 'Video Generation'
  }

  // 生成面包屑导航
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": categoryLabels[category] || "AI Tools",
        "item": `${baseUrl}/home`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": name,
        "item": fullUrl
      }
    ]
  }

  // 生成 SoftwareApplication 结构化数据
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "applicationCategory": applicationCategory || `${categoryLabels[category]}Application`,
    "operatingSystem": operatingSystem,
    "description": description,
    "url": fullUrl,
    "offers": {
      "@type": "Offer",
      "price": offers.price,
      "priceCurrency": offers.priceCurrency,
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "ratingCount": "100"
    }
  }

  // 生成 Product 结构化数据
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "category": categoryLabels[category] || "AI Tool",
    "brand": {
      "@type": "Brand",
      "name": "FuseAI Tools"
    },
    "offers": {
      "@type": "Offer",
      "price": offers.price,
      "priceCurrency": offers.priceCurrency,
      "availability": "https://schema.org/InStock",
      "url": fullUrl
    }
  }

  // 生成完整的 SEO 配置
  const seoConfig = {
    title: `${name} - ${categoryLabels[category]} AI Tool | Free Online | FuseAI Tools`,
    meta: [
      {
        name: 'description',
        content: description
      },
      {
        name: 'keywords',
        content: keywords.length > 0 
          ? keywords.join(', ') 
          : `${name}, ${categoryLabels[category]}, AI tool, artificial intelligence, FuseAI Tools`
      },
      // Open Graph tags
      { property: 'og:title', content: `${name} - ${categoryLabels[category]} AI Tool | FuseAI Tools` },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: fullUrl },
      { property: 'og:image', content: `${baseUrl}/tools-logo/${name.replace(/\s+/g, '')}.png` },
      { property: 'og:site_name', content: 'FuseAI Tools' },
      // Twitter Card tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `${name} - ${categoryLabels[category]} AI Tool | FuseAI Tools` },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: `${baseUrl}/tools-logo/${name.replace(/\s+/g, '')}.png` },
      // Additional meta tags
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }
    ],
    link: [
      { rel: 'canonical', href: fullUrl }
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(breadcrumbSchema)
      },
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(softwareApplicationSchema)
      },
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(productSchema)
      }
    ]
  }

  return seoConfig
}

