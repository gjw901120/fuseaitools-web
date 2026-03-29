import { g as getToolBreadcrumbByRoute } from "./HomeLayout-DmP_sp7g.js";
import { g as getPriceRangeFromData } from "./useModelPrice-DCrt0_k3.js";
import { f as useRequestHeaders } from "../server.mjs";
const useToolSEO = (toolInfo) => {
  const {
    name,
    description,
    category,
    // 'chat', 'image', 'audio', 'video'
    route,
    keywords = [],
    applicationCategory = "",
    applicationSubCategory = "",
    operatingSystem = "Web",
    offers = {
      price: "0",
      priceCurrency: "USD"
    },
    offerDescription = "",
    priceSpecification = null,
    // { price, eligibleQuantityName, minValue, maxValue } 或 null
    priceFromApi = null
    // { modelKey, formFields?, eligibleQuantityName? } 或 null
  } = toolInfo;
  const baseUrl = "https://fuseaitools.com";
  const fullUrl = `${baseUrl}${route}`;
  const toolImageUrl = `${baseUrl}/tools-logo/${name.replace(/\s+/g, "")}.png`;
  const categoryLabels = {
    chat: "Chat AI",
    image: "Image Generation",
    audio: "Audio Processing",
    video: "Video Generation"
  };
  const routeBreadcrumb = getToolBreadcrumbByRoute(route, name);
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": baseUrl
    }
  ];
  if (routeBreadcrumb.parentLabel && routeBreadcrumb.parentTo) {
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 2,
      "name": routeBreadcrumb.parentLabel,
      "item": `${baseUrl}${routeBreadcrumb.parentTo}`
    });
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 3,
      "name": routeBreadcrumb.currentLabel || name,
      "item": fullUrl
    });
  } else {
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 2,
      "name": categoryLabels[category] || "AI Tools",
      "item": `${baseUrl}/home`
    });
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 3,
      "name": name,
      "item": fullUrl
    });
  }
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems
  };
  const offerSchema = {
    "@type": "Offer",
    "price": offers.price,
    "priceCurrency": offers.priceCurrency,
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2030-12-31",
    "url": fullUrl
  };
  if (offerDescription) {
    offerSchema.description = offerDescription;
  }
  const effectivePriceSpec = priceSpecification;
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
    };
  }
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
  };
  if (applicationSubCategory) {
    softwareApplicationSchema.applicationSubCategory = applicationSubCategory;
  }
  const seoConfig = {
    title: `${name} - ${categoryLabels[category]} AI Tool | Free Online | FuseAI Tools`,
    meta: [
      {
        name: "description",
        content: description
      },
      {
        name: "keywords",
        content: keywords.length > 0 ? keywords.join(", ") : `${name}, ${categoryLabels[category]}, AI tool, artificial intelligence, FuseAI Tools`
      },
      // Open Graph tags
      { property: "og:title", content: `${name} - ${categoryLabels[category]} AI Tool | FuseAI Tools` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: fullUrl },
      { property: "og:image", content: toolImageUrl },
      { property: "og:site_name", content: "FuseAI Tools" },
      // Twitter Card tags
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${name} - ${categoryLabels[category]} AI Tool | FuseAI Tools` },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: toolImageUrl },
      // Additional meta tags
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" }
    ],
    link: [
      { rel: "canonical", href: fullUrl }
    ],
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify(breadcrumbSchema)
      },
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify(softwareApplicationSchema)
      }
    ]
  };
  return seoConfig;
};
const PRICE_MODELS_CACHE_TTL_MS = 60 * 60 * 1e3;
const _priceModelsCacheByAuth = /* @__PURE__ */ new Map();
const _priceModelsInflightByAuth = /* @__PURE__ */ new Map();
async function fetchPriceModelsWithCache(headers) {
  const authKey = headers && typeof headers === "object" && typeof headers.authorization === "string" ? headers.authorization : "__anon__";
  const now = Date.now();
  const cached = _priceModelsCacheByAuth.get(authKey);
  if (cached && cached.expiresAt > now) return cached.value;
  const inflight = _priceModelsInflightByAuth.get(authKey);
  if (inflight) return inflight;
  const p = $fetch("/api/common/models/price", {
    headers: headers && Object.keys(headers).length ? headers : void 0
  }).then((res) => {
    _priceModelsCacheByAuth.set(authKey, { value: res, expiresAt: now + PRICE_MODELS_CACHE_TTL_MS });
    return res;
  }).finally(() => {
    _priceModelsInflightByAuth.delete(authKey);
  });
  _priceModelsInflightByAuth.set(authKey, p);
  return p;
}
async function useToolSEOAsync(toolInfo) {
  const { priceFromApi, priceSpecification, ...rest } = toolInfo || {};
  if (!priceFromApi || !priceFromApi.modelKey) {
    return useToolSEO({ ...rest, priceSpecification });
  }
  let range = { minCredits: null, maxCredits: null };
  try {
    const headers = {};
    if (true) {
      try {
        const h = useRequestHeaders(["authorization"]);
        if (h == null ? void 0 : h.authorization) headers.authorization = h.authorization;
      } catch (_) {
      }
    }
    const res = await fetchPriceModelsWithCache(headers);
    const priceData = res && typeof res === "object" && "data" in res && res.data && typeof res.data === "object" ? res.data : res;
    const modelKeys = Array.isArray(priceFromApi.modelKey) ? priceFromApi.modelKey.filter(Boolean) : [priceFromApi.modelKey];
    const mergedRange = modelKeys.reduce((acc, modelKey) => {
      const current = getPriceRangeFromData(priceData, modelKey);
      if (current.minCredits == null || current.maxCredits == null) return acc;
      if (acc.minCredits == null || current.minCredits < acc.minCredits) {
        acc.minCredits = current.minCredits;
      }
      if (acc.maxCredits == null || current.maxCredits > acc.maxCredits) {
        acc.maxCredits = current.maxCredits;
      }
      return acc;
    }, { minCredits: null, maxCredits: null });
    range = mergedRange;
  } catch {
    range = { minCredits: null, maxCredits: null };
  }
  const autoSpec = range.minCredits != null && range.maxCredits != null ? {
    price: range.maxCredits,
    eligibleQuantityName: priceFromApi.eligibleQuantityName ?? "Credits Required",
    minValue: range.minCredits,
    maxValue: range.maxCredits
  } : priceSpecification;
  return useToolSEO({ ...rest, priceSpecification: autoSpec });
}
export {
  useToolSEOAsync as a,
  useToolSEO as u
};
//# sourceMappingURL=useToolSEO-Da7aGo7f.js.map
