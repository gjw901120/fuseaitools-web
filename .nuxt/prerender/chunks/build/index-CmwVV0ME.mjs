import { mergeProps, ref, unref, withCtx, createVNode, toDisplayString, computed, useSSRContext } from 'file://C:/project/fuseaitools-web/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'file://C:/project/fuseaitools-web/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc, d as useRoute, u as useRouter } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-BgkIFP7n.mjs';
import { u as useHead } from './v3-DXSoGrP9.mjs';
import { u as useAuth } from './useAuth-ComhLj5o.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/ufo/dist/index.mjs';
import '../_/nitro.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/destr/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/hookable/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/unstorage/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/project/fuseaitools-web/node_modules/nuxt/dist/core/runtime/nitro/utils/cache-driver.js';
import 'file://C:/project/fuseaitools-web/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/ohash/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/klona/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/defu/dist/defu.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/scule/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/project/fuseaitools-web/node_modules/pathe/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/unhead/dist/server.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/devalue/index.js';
import 'file://C:/project/fuseaitools-web/node_modules/unhead/dist/utils.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/unhead/dist/plugins.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/unctx/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/vue-router/dist/vue-router.node.mjs';

const _sfc_main$3 = {
  __name: "HeroSection",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const userInput = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "hero-section" }, _attrs))} data-v-d7b08e1d><div class="simply-container" data-v-d7b08e1d><div class="hero-content" data-v-d7b08e1d><div class="hero-text" data-v-d7b08e1d><h1 class="hero-title" data-v-d7b08e1d> FuseAI Tools - All-in-One AI Platform <span class="gradient-text" data-v-d7b08e1d>50+ AI Models &amp; Tools</span></h1><p class="hero-description" data-v-d7b08e1d> Access over 50 AI models and tools in one platform, ranging from Chat to Image, Audio, and Video<br data-v-d7b08e1d> Everything you need to make your work smarter. </p><div class="hero-actions" data-v-d7b08e1d><button class="btn-primary" data-v-d7b08e1d> Get Started </button><button class="btn-secondary" data-v-d7b08e1d> Explore Products </button></div><div class="hero-features" data-v-d7b08e1d><div class="feature-pill" data-v-d7b08e1d><i class="fas fa-brain" data-v-d7b08e1d></i> 50+ AI Models </div></div></div><div class="hero-visual" data-v-d7b08e1d><div class="ai-demo-window" data-v-d7b08e1d><div class="window-header" data-v-d7b08e1d><div class="window-controls" data-v-d7b08e1d><span class="control red" data-v-d7b08e1d></span><span class="control yellow" data-v-d7b08e1d></span><span class="control green" data-v-d7b08e1d></span></div><div class="window-title" data-v-d7b08e1d>FuseAI Chat</div></div><div class="chat-messages" data-v-d7b08e1d><div class="message user-message" data-v-d7b08e1d><div class="avatar" data-v-d7b08e1d>\u{1F464}</div><div class="content" data-v-d7b08e1d>Can you help me write a Python function to calculate factorial?</div></div><div class="message ai-message" data-v-d7b08e1d><div class="avatar" data-v-d7b08e1d>\u{1F916}</div><div class="content" data-v-d7b08e1d><pre data-v-d7b08e1d><code data-v-d7b08e1d>def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n-1)</code></pre></div></div><div class="message user-message" data-v-d7b08e1d><div class="avatar" data-v-d7b08e1d>\u{1F464}</div><div class="content" data-v-d7b08e1d>Great! Can you add error handling?</div></div></div><div class="chat-input" data-v-d7b08e1d><input type="text" placeholder="Ask me anything..."${ssrRenderAttr("value", unref(userInput))} data-v-d7b08e1d><button class="send-btn" data-v-d7b08e1d><i class="fas fa-paper-plane" data-v-d7b08e1d></i></button></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeroSection.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-d7b08e1d"]]);
const _sfc_main$2 = {
  __name: "ImageGallery",
  __ssrInlineRender: true,
  setup(__props) {
    const scrollToTop = () => {
      setTimeout(() => {
        (void 0).scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      }, 100);
    };
    const chatModels = ref([
      {
        title: "GPT",
        logo: "/tools-logo/ChatGpt.png",
        route: "/home/gpt/generate"
      },
      {
        title: "Deepseek",
        logo: "/tools-logo/Deepseek.png",
        route: "/home/deepseek/generate"
      },
      {
        title: "Claude",
        logo: "/tools-logo/Claude.png",
        route: "/home/claude/generate"
      },
      {
        title: "Gemini",
        logo: "/tools-logo/Gemini.png",
        route: "/home/gemini/generate"
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
        logo: "/tools-logo/ChatGpt.png",
        route: "/home/gpt-4o-image/generate"
      },
      {
        title: "Flux Kontext",
        logo: "/tools-logo/FluxKontext.png",
        route: "/home/flux-kontext/generate"
      },
      {
        title: "Nano Banana",
        logo: "/tools-logo/NanoBanana.png",
        route: "/home/nano-banana"
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
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "image-gallery" }, _attrs))} data-v-d598103d><div class="simply-container" data-v-d598103d><div class="gallery-header" data-v-d598103d><h2 class="gallery-title" data-v-d598103d>Product Showcase</h2><p class="gallery-description" data-v-d598103d>Explore our AI tools and features</p></div><div class="gallery-categories" data-v-d598103d><div class="categories-list" data-v-d598103d><div class="category-row-item" data-v-d598103d><div class="category-label chat-label" data-v-d598103d>Chat</div><div class="category-items" data-v-d598103d><!--[-->`);
      ssrRenderList(unref(chatModels), (item) => {
        _push(`<article data-v-d598103d>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: item.route,
          class: "gallery-item",
          onClick: scrollToTop
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="logo-card" data-v-d598103d${_scopeId}><div class="logo-wrapper" data-v-d598103d${_scopeId}><img${ssrRenderAttr("src", item.logo)}${ssrRenderAttr("alt", item.title)} class="model-logo" data-v-d598103d${_scopeId}></div><h3 class="model-title" data-v-d598103d${_scopeId}>${ssrInterpolate(item.title)}</h3></div>`);
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
      _push(`<!--]--></div></div><div class="category-row-item" data-v-d598103d><div class="category-label image-label" data-v-d598103d>Image</div><div class="category-items" data-v-d598103d><!--[-->`);
      ssrRenderList(unref(imageModels), (item) => {
        _push(`<article data-v-d598103d>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: item.route,
          class: "gallery-item",
          onClick: scrollToTop
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="logo-card" data-v-d598103d${_scopeId}><div class="logo-wrapper" data-v-d598103d${_scopeId}><img${ssrRenderAttr("src", item.logo)}${ssrRenderAttr("alt", item.title)} class="model-logo" data-v-d598103d${_scopeId}></div><h3 class="model-title" data-v-d598103d${_scopeId}>${ssrInterpolate(item.title)}</h3></div>`);
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
      _push(`<!--]--></div></div><div class="category-row-item" data-v-d598103d><div class="category-label audio-label" data-v-d598103d>Audio</div><div class="category-items" data-v-d598103d><!--[-->`);
      ssrRenderList(unref(audioModels), (item) => {
        _push(`<article data-v-d598103d>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: item.route,
          class: "gallery-item",
          onClick: scrollToTop
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="logo-card" data-v-d598103d${_scopeId}><div class="logo-wrapper" data-v-d598103d${_scopeId}><img${ssrRenderAttr("src", item.logo)}${ssrRenderAttr("alt", item.title)} class="model-logo" data-v-d598103d${_scopeId}></div><h3 class="model-title" data-v-d598103d${_scopeId}>${ssrInterpolate(item.title)}</h3></div>`);
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
      _push(`<!--]--></div></div><div class="category-row-item" data-v-d598103d><div class="category-label video-label" data-v-d598103d>Video</div><div class="category-items" data-v-d598103d><!--[-->`);
      ssrRenderList(unref(videoModels), (item) => {
        _push(`<article data-v-d598103d>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: item.route,
          class: "gallery-item",
          onClick: scrollToTop
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="logo-card" data-v-d598103d${_scopeId}><div class="logo-wrapper" data-v-d598103d${_scopeId}><img${ssrRenderAttr("src", item.logo)}${ssrRenderAttr("alt", item.title)} class="model-logo" data-v-d598103d${_scopeId}></div><h3 class="model-title" data-v-d598103d${_scopeId}>${ssrInterpolate(item.title)}</h3></div>`);
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
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-d598103d"]]);
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
        answer: "<p>Users can access the platform simply by completing registration. Upon registration, users can enjoy over 50 professional AI models and tools. FuseAI is designed to meet various needs, whether it's getting inspiration through intelligent dialogue, creating visual works with text-to-image tools, processing and optimizing audio, or generating high-quality video content.</p>",
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
          "text": item.answer
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
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "faq-section" }, _attrs))} data-v-a8330cb1><div class="simply-container" data-v-a8330cb1><div class="faq-header" data-v-a8330cb1><h2 class="faq-title" data-v-a8330cb1>Frequently Asked Questions</h2></div><div class="faq-list" data-v-a8330cb1><!--[-->`);
      ssrRenderList(faqItems.value, (item, index2) => {
        var _a;
        _push(`<article class="${ssrRenderClass([{ "active": item.isOpen }, "faq-item"])}" data-v-a8330cb1><div class="faq-question" data-v-a8330cb1><h3 class="question-text" data-v-a8330cb1>${ssrInterpolate(item.question)}</h3><div class="faq-icon" data-v-a8330cb1><i class="${ssrRenderClass([item.isOpen ? "fa-chevron-up" : "fa-chevron-down", "fas"])}" data-v-a8330cb1></i></div></div>`);
        if (item.isOpen) {
          _push(`<div class="faq-answer" data-v-a8330cb1><div class="faq-content" data-v-a8330cb1>${(_a = item.answer) != null ? _a : ""}</div></div>`);
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
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-a8330cb1"]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    useRouter();
    useAuth();
    useHead({
      title: "FuseAI Tools - All-in-One AI Platform | 50+ AI Models & Tools",
      meta: [
        {
          name: "description",
          content: "Access 50+ AI models and tools in one platform. ChatGPT, Claude, GPT-4, Midjourney, Veo3, ElevenLabs, Suno and more. Free AI chat, image generation, video creation, and audio processing tools."
        },
        {
          name: "keywords",
          content: "AI tools, ChatGPT, Claude, GPT-4, Midjourney, Veo3, ElevenLabs, Suno, AI chat, image generation, video creation, audio processing, AI platform, artificial intelligence tools"
        },
        // Open Graph tags
        { property: "og:title", content: "FuseAI Tools - All-in-One AI Platform | 50+ AI Models & Tools" },
        { property: "og:description", content: "Access 50+ AI models and tools in one platform. ChatGPT, Claude, GPT-4, Midjourney, Veo3, ElevenLabs, Suno and more." },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://fuseaitools.com" },
        { property: "og:image", content: "https://fuseaitools.com/og-image.jpg" },
        { property: "og:site_name", content: "FuseAI Tools" },
        { property: "og:locale", content: "en_US" },
        // Twitter Card tags
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "FuseAI Tools - All-in-One AI Platform | 50+ AI Models & Tools" },
        { name: "twitter:description", content: "Access 50+ AI models and tools in one platform. ChatGPT, Claude, GPT-4, Midjourney, Veo3, ElevenLabs, Suno and more." },
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
            "description": "All-in-one AI platform integrating 50+ AI models and tools including ChatGPT, Claude, GPT-4, Midjourney, Veo3, ElevenLabs, and Suno.",
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
            "description": "All-in-one AI platform with 50+ AI models and tools",
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
        },
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is FuseAI?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "FuseAI is an integrated artificial intelligence platform that brings together various cutting-edge AI tools, including chat, image generation, audio processing, and video creation. The platform's objective is to enable users to easily access and utilize the most comprehensive AI capabilities from a single location."
                }
              },
              {
                "@type": "Question",
                "name": "How to use FuseAI?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Users can access the platform simply by completing registration. Upon registration, users can enjoy over 50 professional AI models and tools. FuseAI is designed to meet various needs, whether it's getting inspiration through intelligent dialogue, creating visual works with text-to-image tools, processing and optimizing audio, or generating high-quality video content."
                }
              },
              {
                "@type": "Question",
                "name": "Is FuseAI free?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, FuseAI offers flexible experience plans. Users who register receive 100 points, which allows them to experience all models on the site without barriers. There are multiple subscription plans designed to provide more substantial point quotas and exclusive discounts, catering to high-frequency and professional users. The platform also supports direct top-up of points for on-demand usage."
                }
              },
              {
                "@type": "Question",
                "name": "How does FuseAI work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The core of FuseAI lies in its powerful model integration. It seamlessly integrates industry-leading AI technologies, including ChatGPT, Claude, Gemini for dialogue and reasoning; Midjourney, Flux Kontext for image generation; Suno, ElevenLabs for audio processing; and Veo3, Runway, Luma, Sora for video generation. Through a unified, user-friendly interface, we integrate these scattered cutting-edge capabilities into a coherent workflow, providing you with a one-stop AI solution."
                }
              }
            ]
          })
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HeroSection = __nuxt_component_0;
      const _component_ImageGallery = __nuxt_component_1;
      const _component_FAQSection = __nuxt_component_2;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "homepage" }, _attrs))} data-v-a7256682>`);
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a7256682"]]);

export { index as default };
//# sourceMappingURL=index-CmwVV0ME.mjs.map
