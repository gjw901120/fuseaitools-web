import { ref, mergeProps, unref, useSSRContext, withCtx, createVNode, toDisplayString, computed } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { _ as _export_sfc, u as useRouter, d as useRoute } from "../server.mjs";
import { _ as __nuxt_component_0$1 } from "./nuxt-link-BgkIFP7n.js";
import { u as useHead } from "./v3-DXSoGrP9.js";
import { u as useAuth } from "./useAuth-BT_C6798.js";
import "ofetch";
import "#internal/nuxt/paths";
import "C:/project/fuseaitools-web/node_modules/hookable/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/unctx/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/project/fuseaitools-web/node_modules/radix3/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/defu/dist/defu.mjs";
import "C:/project/fuseaitools-web/node_modules/ufo/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/nuxt/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main$3 = {
  __name: "HeroSection",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const userInput = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "hero-section" }, _attrs))} data-v-7dc5b6af><div class="simply-container" data-v-7dc5b6af><div class="hero-content" data-v-7dc5b6af><div class="hero-text" data-v-7dc5b6af><h1 class="hero-title" data-v-7dc5b6af> All-in-One AI Platform <span class="gradient-text" data-v-7dc5b6af>100+ AI Models &amp; Tools Free</span></h1><p class="hero-description" data-v-7dc5b6af> Access over 100 AI models and tools in one platform—Chat, Image, Audio, and Video. Everything you need to work smarter. </p><p class="hero-credits" data-v-7dc5b6af><strong data-v-7dc5b6af>Register now and get <span class="credits-highlight" data-v-7dc5b6af>100 credits free</span>.</strong> No credit card required. </p><div class="hero-actions" data-v-7dc5b6af><button class="btn-primary" data-v-7dc5b6af> Get 100 Free Credits </button><button class="btn-secondary" data-v-7dc5b6af> Explore AI Tools Free </button></div><div class="hero-features" data-v-7dc5b6af><div class="feature-pill feature-pill-free" data-v-7dc5b6af><i class="fas fa-gift" data-v-7dc5b6af></i> AI Tools Free </div><div class="feature-pill" data-v-7dc5b6af><i class="fas fa-brain" data-v-7dc5b6af></i> 100+ AI Models </div></div></div><div class="hero-visual" data-v-7dc5b6af><div class="ai-demo-window" data-v-7dc5b6af><div class="window-header" data-v-7dc5b6af><div class="window-controls" data-v-7dc5b6af><span class="control red" data-v-7dc5b6af></span><span class="control yellow" data-v-7dc5b6af></span><span class="control green" data-v-7dc5b6af></span></div><div class="window-title" data-v-7dc5b6af>FuseAI Chat</div></div><div class="chat-messages" data-v-7dc5b6af><div class="message user-message" data-v-7dc5b6af><div class="avatar" data-v-7dc5b6af>👤</div><div class="content" data-v-7dc5b6af>Can you help me write a Python function to calculate factorial?</div></div><div class="message ai-message" data-v-7dc5b6af><div class="avatar" data-v-7dc5b6af>🤖</div><div class="content" data-v-7dc5b6af><pre data-v-7dc5b6af><code data-v-7dc5b6af>def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n-1)</code></pre></div></div><div class="message user-message" data-v-7dc5b6af><div class="avatar" data-v-7dc5b6af>👤</div><div class="content" data-v-7dc5b6af>Great! Can you add error handling?</div></div></div><div class="chat-input" data-v-7dc5b6af><input type="text" placeholder="Ask me anything..."${ssrRenderAttr("value", unref(userInput))} data-v-7dc5b6af><button class="send-btn" data-v-7dc5b6af><i class="fas fa-paper-plane" data-v-7dc5b6af></i></button></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeroSection.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-7dc5b6af"]]);
const _sfc_main$2 = {
  __name: "ImageGallery",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const scrollToTop = () => {
      setTimeout(() => {
        (void 0).scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }, 100);
    };
    const chatModels = ref([
      {
        title: "GPT",
        logo: "/tools-logo/ChatGpt.png",
        route: "/home/gpt"
      },
      {
        title: "Deepseek",
        logo: "/tools-logo/Deepseek.png",
        route: "/home/deepseek"
      },
      {
        title: "Claude",
        logo: "/tools-logo/Claude.png",
        route: "/home/claude"
      },
      {
        title: "Gemini",
        logo: "/tools-logo/Gemini.png",
        route: "/home/gemini"
      }
    ]);
    const imageModels = ref([
      {
        title: "Midjourney",
        logo: "/tools-logo/Midjourney.png",
        route: "/home/midjourney"
      },
      {
        title: "GPT 4o Image",
        logo: "/tools-logo/ChatGPT4OImage.png",
        route: "/home/gpt-4o-image"
      },
      {
        title: "GPT Image",
        logo: "/tools-logo/GPTImage.png",
        route: "/home/gpt-image"
      },
      {
        title: "Ideogram",
        logo: "/tools-logo/Ideogram.png",
        route: "/home/ideogram"
      },
      {
        title: "Flux Kontext",
        logo: "/tools-logo/FluxKontext.png",
        route: "/home/flux-kontext"
      },
      {
        title: "Nano Banana",
        logo: "/tools-logo/NanoBanana.png",
        route: "/home/nano-banana"
      },
      {
        title: "Seedream",
        logo: "/tools-logo/Seedream.png",
        route: "/home/seedream"
      },
      {
        title: "Qwen",
        logo: "/tools-logo/QWen.png",
        route: "/home/qwen"
      },
      {
        title: "Imagen4",
        logo: "/tools-logo/Imagen4.png",
        route: "/home/imagen4"
      }
    ]);
    const audioModels = ref([
      {
        title: "Suno",
        logo: "/tools-logo/suno.png",
        route: "/home/suno"
      },
      {
        title: "Elevenlabs",
        logo: "/tools-logo/Elevenlabs.png",
        route: "/home/elevenlabs"
      }
    ]);
    const videoModels = ref([
      {
        title: "Veo3",
        logo: "/tools-logo/Veo.png",
        route: "/home/veo3"
      },
      {
        title: "Runway",
        logo: "/tools-logo/Runway.png",
        route: "/home/runway"
      },
      {
        title: "Luma",
        logo: "/tools-logo/Luma.png",
        route: "/home/luma"
      },
      {
        title: "Sora",
        logo: "/tools-logo/sora.png",
        route: "/home/sora"
      },
      {
        title: "Wan",
        logo: "/tools-logo/Wan.png",
        route: "/home/wan"
      },
      {
        title: "Seedance",
        logo: "/tools-logo/Seedance.png",
        route: "/home/seedance"
      },
      {
        title: "Hailuo",
        logo: "/tools-logo/Hailuo.png",
        route: "/home/hailuo"
      },
      {
        title: "Kling",
        logo: "/tools-logo/Kling.png",
        route: "/home/kling"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "image-gallery" }, _attrs))} data-v-5370bd87><div class="simply-container" data-v-5370bd87><div class="gallery-header" data-v-5370bd87><h2 class="gallery-title" data-v-5370bd87>Product Showcase</h2><p class="gallery-description" data-v-5370bd87>Explore our AI tools and features</p></div><div class="gallery-categories" data-v-5370bd87><div class="categories-list" data-v-5370bd87><div class="category-row-item" data-v-5370bd87><div class="category-label chat-label" data-v-5370bd87>Chat</div><div class="category-items" data-v-5370bd87><!--[-->`);
      ssrRenderList(unref(chatModels), (item) => {
        _push(`<article data-v-5370bd87>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: item.route,
          class: "gallery-item",
          onClick: scrollToTop
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="logo-card" data-v-5370bd87${_scopeId}><div class="logo-wrapper" data-v-5370bd87${_scopeId}><img${ssrRenderAttr("src", item.logo)}${ssrRenderAttr("alt", item.title)} class="model-logo" data-v-5370bd87${_scopeId}></div><h3 class="model-title" data-v-5370bd87${_scopeId}>${ssrInterpolate(item.title)}</h3></div>`);
            } else {
              return [
                createVNode("div", { class: "logo-card" }, [
                  createVNode("div", { class: "logo-wrapper" }, [
                    createVNode("img", {
                      src: item.logo,
                      alt: item.title,
                      class: "model-logo"
                    }, null, 8, ["src", "alt"])
                  ]),
                  createVNode("h3", { class: "model-title" }, toDisplayString(item.title), 1)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</article>`);
      });
      _push(`<!--]--></div></div><div class="category-row-item" data-v-5370bd87><div class="category-label image-label" data-v-5370bd87>Image</div><div class="category-items" data-v-5370bd87><!--[-->`);
      ssrRenderList(unref(imageModels), (item) => {
        _push(`<article data-v-5370bd87>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: item.route,
          class: "gallery-item",
          onClick: scrollToTop
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="logo-card" data-v-5370bd87${_scopeId}><div class="logo-wrapper" data-v-5370bd87${_scopeId}><img${ssrRenderAttr("src", item.logo)}${ssrRenderAttr("alt", item.title)} class="model-logo" data-v-5370bd87${_scopeId}></div><h3 class="model-title" data-v-5370bd87${_scopeId}>${ssrInterpolate(item.title)}</h3></div>`);
            } else {
              return [
                createVNode("div", { class: "logo-card" }, [
                  createVNode("div", { class: "logo-wrapper" }, [
                    createVNode("img", {
                      src: item.logo,
                      alt: item.title,
                      class: "model-logo"
                    }, null, 8, ["src", "alt"])
                  ]),
                  createVNode("h3", { class: "model-title" }, toDisplayString(item.title), 1)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</article>`);
      });
      _push(`<!--]--></div></div><div class="category-row-item" data-v-5370bd87><div class="category-label audio-label" data-v-5370bd87>Audio</div><div class="category-items" data-v-5370bd87><!--[-->`);
      ssrRenderList(unref(audioModels), (item) => {
        _push(`<article data-v-5370bd87>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: item.route,
          class: "gallery-item",
          onClick: scrollToTop
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="logo-card" data-v-5370bd87${_scopeId}><div class="logo-wrapper" data-v-5370bd87${_scopeId}><img${ssrRenderAttr("src", item.logo)}${ssrRenderAttr("alt", item.title)} class="model-logo" data-v-5370bd87${_scopeId}></div><h3 class="model-title" data-v-5370bd87${_scopeId}>${ssrInterpolate(item.title)}</h3></div>`);
            } else {
              return [
                createVNode("div", { class: "logo-card" }, [
                  createVNode("div", { class: "logo-wrapper" }, [
                    createVNode("img", {
                      src: item.logo,
                      alt: item.title,
                      class: "model-logo"
                    }, null, 8, ["src", "alt"])
                  ]),
                  createVNode("h3", { class: "model-title" }, toDisplayString(item.title), 1)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</article>`);
      });
      _push(`<!--]--></div></div><div class="category-row-item" data-v-5370bd87><div class="category-label video-label" data-v-5370bd87>Video</div><div class="category-items" data-v-5370bd87><!--[-->`);
      ssrRenderList(unref(videoModels), (item) => {
        _push(`<article data-v-5370bd87>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: item.route,
          class: "gallery-item",
          onClick: scrollToTop
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="logo-card" data-v-5370bd87${_scopeId}><div class="logo-wrapper" data-v-5370bd87${_scopeId}><img${ssrRenderAttr("src", item.logo)}${ssrRenderAttr("alt", item.title)} class="model-logo" data-v-5370bd87${_scopeId}></div><h3 class="model-title" data-v-5370bd87${_scopeId}>${ssrInterpolate(item.title)}</h3></div>`);
            } else {
              return [
                createVNode("div", { class: "logo-card" }, [
                  createVNode("div", { class: "logo-wrapper" }, [
                    createVNode("img", {
                      src: item.logo,
                      alt: item.title,
                      class: "model-logo"
                    }, null, 8, ["src", "alt"])
                  ]),
                  createVNode("h3", { class: "model-title" }, toDisplayString(item.title), 1)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</article>`);
      });
      _push(`<!--]--></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ImageGallery.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-5370bd87"]]);
const _sfc_main$1 = {
  __name: "FAQSection",
  __ssrInlineRender: true,
  setup(__props) {
    const faqItems = ref([
      {
        question: "What is FuseAI?",
        answer: "<p>FuseAI is an integrated artificial intelligence platform that brings together various cutting-edge AI tools, including chat, image generation, audio processing, and video creation. The platform's objective is to enable users to easily access and utilize the most comprehensive AI capabilities from a single location.</p>",
        isOpen: true
      },
      {
        question: "How to use FuseAI?",
        answer: "<p>Users can access the platform simply by completing registration. Upon registration, users can enjoy over 100 professional AI models and tools. FuseAI is designed to meet various needs, whether it's getting inspiration through intelligent dialogue, creating visual works with text-to-image tools, processing and optimizing audio, or generating high-quality video content.</p>",
        isOpen: false
      },
      {
        question: "Is FuseAI free?",
        answer: "<p>Yes, FuseAI offers flexible experience plans:</p><ul><li><strong>Free Experience:</strong> Users who register receive 100 points, which allows them to experience all models on the site without barriers.</li><li><strong>Paid Plans:</strong> There are multiple subscription plans designed to provide more substantial point quotas and exclusive discounts, catering to high-frequency and professional users.</li><li><strong>Additional Option:</strong> The platform also supports direct top-up of points for on-demand usage.</li></ul>",
        isOpen: false
      },
      {
        question: "How does FuseAI work?",
        answer: "<p>The core of FuseAI lies in its powerful model integration. It seamlessly integrates industry-leading AI technologies, providing examples for different functionalities:</p><ul><li><strong>Dialogue and Reasoning:</strong> ChatGPT, Claude, Gemini, etc.</li><li><strong>Image Generation:</strong> Midjourney, Flux Kontext, etc.</li><li><strong>Audio Processing:</strong> Suno, ElevenLabs, etc.</li><li><strong>Video Generation:</strong> Veo3, Runway, Luma, Sora, etc.</li></ul><p>Through a unified, user-friendly interface, we integrate these scattered cutting-edge capabilities into a coherent workflow, providing you with a one-stop AI solution.</p>",
        isOpen: false
      }
    ]);
    const faqSchema = computed(() => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.value.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": typeof item.answer === "string" ? item.answer.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : item.answer
        }
      }))
    }));
    useHead({
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify(faqSchema.value)
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "faq-section" }, _attrs))} data-v-bb839d82><div class="simply-container" data-v-bb839d82><div class="faq-header" data-v-bb839d82><h2 class="faq-title" data-v-bb839d82>Frequently Asked Questions</h2></div><div class="faq-list" data-v-bb839d82><!--[-->`);
      ssrRenderList(faqItems.value, (item, index2) => {
        _push(`<article class="${ssrRenderClass([{ "active": item.isOpen }, "faq-item"])}" data-v-bb839d82><div class="faq-question" data-v-bb839d82><h3 class="question-text" data-v-bb839d82>${ssrInterpolate(item.question)}</h3><div class="faq-icon" data-v-bb839d82><i class="${ssrRenderClass([item.isOpen ? "fa-chevron-up" : "fa-chevron-down", "fas"])}" data-v-bb839d82></i></div></div>`);
        if (item.isOpen) {
          _push(`<div class="faq-answer" data-v-bb839d82><div class="faq-content" data-v-bb839d82>${item.answer ?? ""}</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</article>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FAQSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-bb839d82"]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    useRouter();
    useAuth();
    useHead({
      title: "AI Tools Free - FuseAI Tools | 100+ AI Models, 100 Credits on Sign Up",
      meta: [
        {
          name: "description",
          content: "AI tools free: access 100+ AI models in one platform—ChatGPT, Claude, Midjourney, Veo3, ElevenLabs, Suno and more. Register now and get 100 credits free. Free AI chat, image, video, and audio tools."
        },
        {
          name: "keywords",
          content: "AI tools free, free AI tools, AI tools, ChatGPT, Claude, GPT-4, Midjourney, Veo3, ElevenLabs, Suno, free AI chat, image generation, video creation, audio processing, AI platform, 100 credits free"
        },
        // Open Graph tags
        { property: "og:title", content: "AI Tools Free | FuseAI Tools - 100 Credits on Sign Up" },
        { property: "og:description", content: "AI tools free: 100+ AI models in one platform. Register and get 100 credits free. ChatGPT, Claude, Midjourney, Veo3, ElevenLabs, Suno and more." },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://fuseaitools.com" },
        { property: "og:image", content: "https://fuseaitools.com/og-image.jpg" },
        { property: "og:site_name", content: "FuseAI Tools" },
        { property: "og:locale", content: "en_US" },
        // Twitter Card tags
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "AI Tools Free | FuseAI Tools - 100 Credits on Sign Up" },
        { name: "twitter:description", content: "AI tools free: 100+ AI models in one platform. Register and get 100 credits free." },
        { name: "twitter:image", content: "https://fuseaitools.com/og-image.jpg" },
        // Additional meta tags
        { name: "author", content: "FuseAI Tools" },
        { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
        { name: "googlebot", content: "index, follow" },
        { name: "language", content: "English" },
        { name: "revisit-after", content: "7 days" }
      ],
      link: [
        { rel: "canonical", href: "https://fuseaitools.com" }
      ],
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "FuseAI Tools",
            "url": "https://fuseaitools.com",
            "logo": "https://fuseaitools.com/favicon.ico",
            "description": "AI tools free: all-in-one platform with 100+ AI models. Register and get 100 credits free. ChatGPT, Claude, Midjourney, Veo3, ElevenLabs, Suno and more.",
            "sameAs": [
              // Add social media links if available
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Customer Service",
              "availableLanguage": "English"
            }
          })
        },
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "FuseAI Tools",
            "url": "https://fuseaitools.com",
            "description": "AI tools free: 100+ AI models in one platform. Sign up for 100 free credits.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://fuseaitools.com/search?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          })
        },
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://fuseaitools.com"
              }
            ]
          })
        }
        // FAQPage 仅由 FAQSection 组件输出，避免重复导致 Google 富媒体结果无效
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HeroSection = __nuxt_component_0;
      const _component_ImageGallery = __nuxt_component_1;
      const _component_FAQSection = __nuxt_component_2;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "homepage" }, _attrs))} data-v-897f35fe>`);
      _push(ssrRenderComponent(_component_HeroSection, null, null, _parent));
      _push(ssrRenderComponent(_component_ImageGallery, null, null, _parent));
      _push(ssrRenderComponent(_component_FAQSection, null, null, _parent));
      _push(`</main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-897f35fe"]]);
export {
  index as default
};
//# sourceMappingURL=index-a_sBPLIk.js.map
