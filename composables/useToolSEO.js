/**
 * 工具页面 SEO 配置 composable
 * 为所有工具页面提供统一的 SEO 配置
 */
import { getToolBreadcrumbByRoute } from '~/utils/toolBreadcrumbs'

/**
 * 可选入参（每个工具页独立传）：
 * - applicationSubCategory: 如 "Video Generation"
 * - offerDescription: Offer 的 description
 * - priceSpecification: 积分单价，如 { price: 20, eligibleQuantityName: "Fast Model", minValue: 15, maxValue: 15 }
 * - priceFromApi: 自动从 /api/common/models/price 计算 credits（SSR 生效），如 { modelKey: 'sora-2-text-to-video', formFields: { duration: 10 }, eligibleQuantityName: 'Fast Model' }
 */
export const useToolSEO = (toolInfo) => {
  const {
    name,
    description,
    category, // 'chat', 'image', 'audio', 'video'
    route,
    keywords = [],
    applicationCategory = '',
    applicationSubCategory = '',
    operatingSystem = 'Web',
    offers = {
      price: '0',
      priceCurrency: 'USD'
    },
    offerDescription = '',
    priceSpecification = null, // { price, eligibleQuantityName, minValue, maxValue } 或 null
    priceFromApi = null // { modelKey, formFields?, eligibleQuantityName? } 或 null
  } = toolInfo

  const baseUrl = 'https://fuseaitools.com'
  const fullUrl = `${baseUrl}${route}`
  // 工具 logo 用于 og:image（文件名与 tools-logo 目录一致：空格去掉）
  const toolImageUrl = `${baseUrl}/tools-logo/${name.replace(/\s+/g, '')}.png`
  const categoryLabels = {
    chat: 'Chat AI',
    image: 'Image Generation',
    audio: 'Audio Processing',
    video: 'Video Generation'
  }

  const routeBreadcrumb = getToolBreadcrumbByRoute(route, name)
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": baseUrl
    }
  ]
  if (routeBreadcrumb.parentLabel && routeBreadcrumb.parentTo) {
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 2,
      "name": routeBreadcrumb.parentLabel,
      "item": `${baseUrl}${routeBreadcrumb.parentTo}`
    })
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 3,
      "name": routeBreadcrumb.currentLabel || name,
      "item": fullUrl
    })
  } else {
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 2,
      "name": categoryLabels[category] || "AI Tools",
      "item": `${baseUrl}/home`
    })
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 3,
      "name": name,
      "item": fullUrl
    })
  }
  // 生成面包屑导航
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems
  }

  const computeCreditsFromPriceData = (data, modelKey, formFields = {}) => {
    if (!data || !modelKey) return null
    const item = data[modelKey]
    if (!item || typeof item !== 'object') return null

    if (item.type === 'ONCE' && item.once != null) {
      const c = item.once.credits
      return typeof c === 'number' ? c : (typeof c === 'string' ? parseFloat(c) : null)
    }

    if (item.type === 'RULE' && Array.isArray(item.rules) && item.rules.length > 0) {
      const match = item.rules.find((rule) => {
        return Object.keys(formFields).every((key) => {
          const formVal = formFields[key]
          if (formVal === undefined || formVal === null) return true
          const ruleVal = rule[key]
          return String(ruleVal) === String(formVal)
        })
      })
      if (match && typeof match.credits === 'number') return match.credits
      if (match && typeof match.credits === 'string') return parseFloat(match.credits)
      return null
    }

    return null
  }

  // 按工具页独立生成 Offer（可选 priceSpecification 积分）
  const offerSchema = {
    "@type": "Offer",
    "price": offers.price,
    "priceCurrency": offers.priceCurrency,
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2030-12-31",
    "url": fullUrl
  }
  if (offerDescription) {
    offerSchema.description = offerDescription
  }
  const effectivePriceSpec = priceSpecification

  if (effectivePriceSpec && effectivePriceSpec.price != null) {
    offerSchema.priceSpecification = {
      "@type": "UnitPriceSpecification",
      "price": effectivePriceSpec.price,
      "priceCurrency": "CREDIT",
      "eligibleQuantity": {
        "@type": "QuantitativeValue",
        "name": effectivePriceSpec.eligibleQuantityName ?? "Credits Required",
        "minValue": effectivePriceSpec.minValue ?? effectivePriceSpec.price,
        "maxValue": effectivePriceSpec.maxValue ?? effectivePriceSpec.price,
        "unitCode": "C62"
      }
    }
  }

  // 每个工具页独立的 SoftwareApplication JSON-LD
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "applicationCategory": applicationCategory || `${categoryLabels[category]}Application`,
    "operatingSystem": operatingSystem,
    "url": fullUrl,
    "offers": offerSchema,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "ratingCount": "100"
    }
  }
  if (applicationSubCategory) {
    softwareApplicationSchema.applicationSubCategory = applicationSubCategory
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
      { property: 'og:image', content: toolImageUrl },
      { property: 'og:site_name', content: 'FuseAI Tools' },
      // Twitter Card tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `${name} - ${categoryLabels[category]} AI Tool | FuseAI Tools` },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: toolImageUrl },
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
      }
    ]
  }

  return seoConfig
}

/**
 * SSR 友好的异步版本：会先从 /api/common/models/price 拉取定价，用 getPriceRangeFromData 得到 credits 区间，再写入 JSON-LD。
 * 用法（页面里 top-level await）：
 * const seoConfig = await useToolSEOAsync({ ..., priceFromApi: { modelKey: 'sora-2-text-to-video', eligibleQuantityName: 'Credits Required' } })
 * useHead(seoConfig)
 */
import { getPriceRangeFromData } from '~/composables/useModelPrice'

// 客户端路由切换时避免重复请求 price：做一个内存级 TTL 缓存 + in-flight 复用（按 authorization 分桶）
const PRICE_MODELS_CACHE_TTL_MS = 60 * 60 * 1000
const _priceModelsCacheByAuth = new Map()
const _priceModelsInflightByAuth = new Map()

async function fetchPriceModelsWithCache(headers) {
  const authKey =
    headers && typeof headers === 'object' && typeof headers.authorization === 'string'
      ? headers.authorization
      : '__anon__'

  const now = Date.now()
  const cached = _priceModelsCacheByAuth.get(authKey)
  if (cached && cached.expiresAt > now) return cached.value

  const inflight = _priceModelsInflightByAuth.get(authKey)
  if (inflight) return inflight

  const p = $fetch('/api/common/models/price', {
    headers: headers && Object.keys(headers).length ? headers : undefined
  })
    .then((res) => {
      _priceModelsCacheByAuth.set(authKey, { value: res, expiresAt: now + PRICE_MODELS_CACHE_TTL_MS })
      return res
    })
    .finally(() => {
      _priceModelsInflightByAuth.delete(authKey)
    })

  _priceModelsInflightByAuth.set(authKey, p)
  return p
}

export async function useToolSEOAsync(toolInfo) {
  const { priceFromApi, priceSpecification, ...rest } = toolInfo || {}
  if (!priceFromApi || !priceFromApi.modelKey) {
    return useToolSEO({ ...rest, priceSpecification })
  }

  let range = { minCredits: null, maxCredits: null }
  try {
    // 让 price 请求尽可能携带鉴权：
    // - SSR：透传当前请求的 authorization（如果有）
    // - CSR：从 localStorage 读 token（如果有）
    const headers = {}
    if (process.server) {
      try {
        const h = useRequestHeaders(['authorization'])
        if (h?.authorization) headers.authorization = h.authorization
      } catch (_) {}
    } else if (process.client) {
      try {
        const token = localStorage.getItem('auth_token')
        if (token) headers.authorization = `Bearer ${token}`
      } catch (_) {}
    }

    const res = await fetchPriceModelsWithCache(headers)
    // 兼容两种返回：
    // 1) 直接返回 { [modelKey]: {...} }
    // 2) 统一响应包裹：{ errorCode, errorMessage, data: { [modelKey]: {...} } }
    const priceData =
      res && typeof res === 'object' && 'data' in res && res.data && typeof res.data === 'object'
        ? res.data
        : res
    // modelKey 以 PRICING_MAPPING 为准；下划线↔连字符兼容在 getPriceRangeFromData 内处理
    const modelKeys = Array.isArray(priceFromApi.modelKey)
      ? priceFromApi.modelKey.filter(Boolean)
      : [priceFromApi.modelKey]
    const mergedRange = modelKeys.reduce((acc, modelKey) => {
      const current = getPriceRangeFromData(priceData, modelKey)
      if (current.minCredits == null || current.maxCredits == null) return acc
      if (acc.minCredits == null || current.minCredits < acc.minCredits) {
        acc.minCredits = current.minCredits
      }
      if (acc.maxCredits == null || current.maxCredits > acc.maxCredits) {
        acc.maxCredits = current.maxCredits
      }
      return acc
    }, { minCredits: null, maxCredits: null })
    range = mergedRange
  } catch {
    range = { minCredits: null, maxCredits: null }
  }

  const autoSpec =
    range.minCredits != null && range.maxCredits != null
      ? {
          price: range.maxCredits,
          eligibleQuantityName: priceFromApi.eligibleQuantityName ?? 'Credits Required',
          minValue: range.minCredits,
          maxValue: range.maxCredits
        }
      : priceSpecification

  return useToolSEO({ ...rest, priceSpecification: autoSpec })
}

