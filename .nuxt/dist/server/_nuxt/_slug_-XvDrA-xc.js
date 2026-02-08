import { _ as __nuxt_component_0 } from "./nuxt-link-BgkIFP7n.js";
import { withAsyncContext, watch, computed, ref, unref, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc, d as useRoute, u as useRouter } from "../server.mjs";
import "C:/project/fuseaitools-web/node_modules/hookable/dist/index.mjs";
import { u as useFetch } from "./fetch-CAoFjp9S.js";
import { u as useHead } from "./v3-DXSoGrP9.js";
import "C:/project/fuseaitools-web/node_modules/ufo/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "C:/project/fuseaitools-web/node_modules/unctx/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/project/fuseaitools-web/node_modules/radix3/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/defu/dist/defu.mjs";
import "C:/project/fuseaitools-web/node_modules/ohash/dist/index.mjs";
import "@vue/shared";
import "C:/project/fuseaitools-web/node_modules/nuxt/node_modules/perfect-debounce/dist/index.mjs";
import "./client-only-BJZIIy-4.js";
import "C:/project/fuseaitools-web/node_modules/nuxt/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = {
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    useRouter();
    const { data: articleData, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/api/news/${route.params.slug}`, {
      key: `article-${route.params.slug}`,
      server: true,
      // 服务器端渲染，SEO友好
      default: () => ({ article: null, relatedArticles: [] })
      // 默认值
    }, "$0FuVEBUyqQ")), __temp = await __temp, __restore(), __temp);
    watch(() => route.params.slug, async (newSlug, oldSlug) => {
    }, { immediate: false });
    watch(() => route.fullPath, async (newPath, oldPath) => {
    }, { immediate: false });
    const article = computed(() => {
      var _a;
      try {
        return ((_a = articleData.value) == null ? void 0 : _a.article) || null;
      } catch (error2) {
        console.warn("Error accessing article data:", error2);
        return null;
      }
    });
    const relatedArticles = computed(() => {
      var _a;
      try {
        return ((_a = articleData.value) == null ? void 0 : _a.relatedArticles) || [];
      } catch (error2) {
        console.warn("Error accessing related articles:", error2);
        return [];
      }
    });
    watch(article, (newArticle) => {
      if (newArticle) {
        useHead({
          title: `${newArticle.title} - FuseAI Tools News`,
          meta: [
            { name: "description", content: newArticle.excerpt || "" },
            { name: "keywords", content: `${newArticle.category}, AI news, ${newArticle.title}` },
            { property: "og:title", content: newArticle.title || "" },
            { property: "og:description", content: newArticle.excerpt || "" },
            { property: "og:image", content: newArticle.image || "" },
            { property: "og:type", content: "article" },
            { property: "og:url", content: `https://fuseaitools.com/news/${newArticle.slug || ""}` },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:title", content: newArticle.title || "" },
            { name: "twitter:description", content: newArticle.excerpt || "" },
            { name: "twitter:image", content: newArticle.image || "" }
          ],
          link: [
            { rel: "canonical", href: `https://fuseaitools.com/news/${newArticle.slug || ""}` }
          ],
          script: [
            {
              type: "application/ld+json",
              innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": newArticle.title || "",
                "description": newArticle.excerpt || "",
                "image": newArticle.image || "",
                "datePublished": newArticle.publishDate || "",
                "dateModified": newArticle.publishDate || "",
                "author": {
                  "@type": "Organization",
                  "name": "FuseAI Tools"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "FuseAI Tools",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://fuseaitools.com/favicon.ico"
                  }
                },
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": `https://fuseaitools.com/news/${newArticle.slug || ""}`
                },
                "articleSection": newArticle.category || "",
                "wordCount": (newArticle.readTime || 0) * 200
              })
            }
          ]
        });
      }
    }, { immediate: true });
    const email = ref("");
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      if (unref(article)) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "news-detail-page",
          key: unref(route).params.slug
        }, _attrs))} data-v-3a20ef96><section class="detail-hero" data-v-3a20ef96><div class="simply-container" data-v-3a20ef96><div class="breadcrumb" data-v-3a20ef96>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "breadcrumb-link home-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="fas fa-home" data-v-3a20ef96${_scopeId}></i> 首页 `);
            } else {
              return [
                createVNode("i", { class: "fas fa-home" }),
                createTextVNode(" 首页 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/news",
          class: "breadcrumb-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="fas fa-arrow-left" data-v-3a20ef96${_scopeId}></i> Back to News `);
            } else {
              return [
                createVNode("i", { class: "fas fa-arrow-left" }),
                createTextVNode(" Back to News ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="article-header" data-v-3a20ef96><div class="article-category" data-v-3a20ef96>${ssrInterpolate(unref(article).category)}</div><h1 class="article-title" data-v-3a20ef96>${ssrInterpolate(unref(article).title)}</h1><div class="article-meta" data-v-3a20ef96><span class="article-date" data-v-3a20ef96>${ssrInterpolate(formatDate(unref(article).publishDate))}</span><span class="article-read-time" data-v-3a20ef96>${ssrInterpolate(unref(article).readTime)} min read</span></div></div></div></section><section class="article-image-section" data-v-3a20ef96><div class="simply-container" data-v-3a20ef96><div class="article-image" data-v-3a20ef96><img${ssrRenderAttr("src", unref(article).image)}${ssrRenderAttr("alt", unref(article).title)} data-v-3a20ef96></div></div></section><section class="article-content-section" data-v-3a20ef96><div class="simply-container" data-v-3a20ef96><div class="content-wrapper" data-v-3a20ef96><article class="main-content" data-v-3a20ef96><div class="article-excerpt" data-v-3a20ef96>${ssrInterpolate(unref(article).excerpt)}</div><div class="article-body" data-v-3a20ef96><p data-v-3a20ef96> Artificial intelligence continues to reshape our world at an unprecedented pace. This comprehensive exploration delves into the latest developments and their implications for businesses, individuals, and society at large. </p><h2 data-v-3a20ef96>The Current State of AI Technology</h2><p data-v-3a20ef96> Recent advancements in machine learning and natural language processing have opened new possibilities for AI applications. Companies are leveraging these technologies to improve efficiency, enhance customer experiences, and drive innovation across various industries. </p><blockquote data-v-3a20ef96> &quot;The future of AI lies not just in technological advancement, but in how we responsibly integrate these tools into our daily lives and work processes.&quot; </blockquote><h3 data-v-3a20ef96>Key Developments in 2024</h3><ul data-v-3a20ef96><li data-v-3a20ef96>Enhanced multimodal AI capabilities</li><li data-v-3a20ef96>Improved reasoning and problem-solving</li><li data-v-3a20ef96>Better integration with existing workflows</li><li data-v-3a20ef96>Increased focus on AI safety and ethics</li></ul><p data-v-3a20ef96> These developments represent significant milestones in AI research and development. As we move forward, it&#39;s crucial to consider both the opportunities and challenges that these technologies present. </p><h3 data-v-3a20ef96>Industry Impact</h3><p data-v-3a20ef96> The business world is experiencing a transformation driven by AI adoption. Organizations are finding new ways to leverage AI for competitive advantage, from automating routine tasks to gaining insights from large datasets. </p><h2 data-v-3a20ef96>Looking Ahead</h2><p data-v-3a20ef96> As we continue to explore the potential of artificial intelligence, it&#39;s important to maintain a balanced perspective. While the opportunities are vast, we must also address concerns about job displacement, privacy, and the ethical use of AI. </p><p data-v-3a20ef96> The journey of AI development is far from over. With continued research, collaboration, and responsible implementation, we can harness the power of AI to create a better future for everyone. </p></div></article><aside class="sidebar" data-v-3a20ef96><div class="sidebar-section" data-v-3a20ef96><h3 data-v-3a20ef96>Related Articles</h3><div class="related-articles" data-v-3a20ef96><!--[-->`);
        ssrRenderList(unref(relatedArticles), (related) => {
          _push(`<div class="related-article" data-v-3a20ef96><img${ssrRenderAttr("src", related.image)}${ssrRenderAttr("alt", related.title)} data-v-3a20ef96><div class="related-content" data-v-3a20ef96><h4 data-v-3a20ef96>${ssrInterpolate(related.title)}</h4><span class="related-date" data-v-3a20ef96>${ssrInterpolate(formatDate(related.publishDate))}</span></div></div>`);
        });
        _push(`<!--]--></div></div><div class="sidebar-section" data-v-3a20ef96><h3 data-v-3a20ef96>Share This Article</h3><div class="share-buttons" data-v-3a20ef96><button class="share-btn twitter" data-v-3a20ef96><i class="fab fa-twitter" data-v-3a20ef96></i> Twitter </button><button class="share-btn linkedin" data-v-3a20ef96><i class="fab fa-linkedin" data-v-3a20ef96></i> LinkedIn </button><button class="share-btn facebook" data-v-3a20ef96><i class="fab fa-facebook" data-v-3a20ef96></i> Facebook </button></div></div></aside></div></div></section><section class="newsletter-section" data-v-3a20ef96><div class="simply-container" data-v-3a20ef96><div class="newsletter-content" data-v-3a20ef96><h3 data-v-3a20ef96>Stay Updated</h3><p data-v-3a20ef96>Get the latest AI news and insights delivered to your inbox.</p><div class="newsletter-form" data-v-3a20ef96><input type="email" placeholder="Enter your email address"${ssrRenderAttr("value", unref(email))} data-v-3a20ef96><button data-v-3a20ef96>Subscribe</button></div></div></div></section></div>`);
      } else if (unref(pending)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "loading-state" }, _attrs))} data-v-3a20ef96><div class="simply-container" data-v-3a20ef96><div class="loading-content" data-v-3a20ef96><div class="loading-spinner" data-v-3a20ef96></div><p data-v-3a20ef96>Loading article...</p></div></div></div>`);
      } else if (unref(error)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "error-state" }, _attrs))} data-v-3a20ef96><div class="simply-container" data-v-3a20ef96><div class="error-content" data-v-3a20ef96><h2 data-v-3a20ef96>Article Not Found</h2><p data-v-3a20ef96>The article you&#39;re looking for doesn&#39;t exist or has been removed.</p><button class="back-btn" data-v-3a20ef96> Back to News </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/news/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3a20ef96"]]);
export {
  _slug_ as default
};
//# sourceMappingURL=_slug_-XvDrA-xc.js.map
