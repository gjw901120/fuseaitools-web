const useToolSEO = (toolInfo) => {
  const {
    name,
    description,
    category,
    // 'chat', 'image', 'audio', 'video'
    route,
    keywords = [],
    applicationCategory = "",
    operatingSystem = "Web",
    offers = {
      price: "0",
      priceCurrency: "USD"
    }
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
  };
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
      "availability": "https://schema.org/InStock",
      "priceValidUntil": "2030-12-31"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "ratingCount": "100"
    }
  };
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "image": [toolImageUrl],
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
      "url": fullUrl,
      "priceValidUntil": "2030-12-31",
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": offers.priceCurrency
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 0,
            "maxValue": 0,
            "unitCode": "DAY"
          }
        }
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "US",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 7,
        "returnFees": "https://schema.org/FreeReturn"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "ratingCount": "100",
      "bestRating": "5"
    },
    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Organization", "name": "FuseAI Tools" },
        "datePublished": "2025-01-01",
        "reviewBody": "Free AI tool available on FuseAI Tools platform.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "4.5",
          "bestRating": "5"
        }
      }
    ]
  };
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
      },
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify(productSchema)
      }
    ]
  };
  return seoConfig;
};
export {
  useToolSEO as u
};
//# sourceMappingURL=useToolSEO-Biuf6Haj.js.map
