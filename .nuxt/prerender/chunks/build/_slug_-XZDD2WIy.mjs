import { _ as __nuxt_component_0 } from './nuxt-link-BgkIFP7n.mjs';
import { withAsyncContext, computed, watch, unref, mergeProps, withCtx, createVNode, createTextVNode, toValue, reactive, useSSRContext } from 'file://C:/project/fuseaitools-web/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'file://C:/project/fuseaitools-web/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc, d as useRoute, u as useRouter, i as fetchDefaults, j as useRequestFetch } from './server.mjs';
import { hash } from 'file://C:/project/fuseaitools-web/node_modules/ohash/dist/index.mjs';
import { isPlainObject } from 'file://C:/project/fuseaitools-web/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import { u as useAsyncData } from './asyncData-Dwv0HOxb.mjs';
import { u as useHead } from './v3-DXSoGrP9.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/ufo/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs';
import '../_/nitro.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/destr/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/hookable/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/unstorage/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/project/fuseaitools-web/node_modules/nuxt/dist/core/runtime/nitro/utils/cache-driver.js';
import 'file://C:/project/fuseaitools-web/node_modules/unstorage/drivers/fs-lite.mjs';
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
import 'file://C:/project/fuseaitools-web/node_modules/nuxt/node_modules/perfect-debounce/dist/index.mjs';

function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _request = computed(() => toValue(request));
  const key = computed(() => toValue(opts.key) || "$f" + hash([autoKey, typeof _request.value === "string" ? _request.value : "", ...generateOptionSegments(opts)]));
  if (!opts.baseURL && typeof _request.value === "string" && (_request.value[0] === "/" && _request.value[1] === "/")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick,
    watch: watchSources,
    immediate,
    getCachedData,
    deep,
    dedupe,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchDefaults,
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick,
    immediate,
    getCachedData,
    deep,
    dedupe,
    watch: watchSources === false ? [] : [...watchSources || [], _fetchOptions]
  };
  if (!immediate) {
    let setImmediate = function() {
      _asyncDataOptions.immediate = true;
    };
    watch(key, setImmediate, { flush: "sync", once: true });
    watch([...watchSources || [], _fetchOptions], setImmediate, { flush: "sync", once: true });
  }
  let controller;
  const asyncData = useAsyncData(watchSources === false ? key.value : key, () => {
    var _a;
    (_a = controller == null ? void 0 : controller.abort) == null ? void 0 : _a.call(controller, new DOMException("Request aborted as another request to the same endpoint was initiated.", "AbortError"));
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    const timeoutLength = toValue(opts.timeout);
    let timeoutId;
    if (timeoutLength) {
      timeoutId = setTimeout(() => controller.abort(new DOMException("Request aborted due to timeout.", "AbortError")), timeoutLength);
      controller.signal.onabort = () => clearTimeout(timeoutId);
    }
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch) {
      const isLocalFetch = typeof _request.value === "string" && _request.value[0] === "/" && (!toValue(opts.baseURL) || toValue(opts.baseURL)[0] === "/");
      if (isLocalFetch) {
        _$fetch = useRequestFetch();
      }
    }
    return _$fetch(_request.value, { signal: controller.signal, ..._fetchOptions }).finally(() => {
      clearTimeout(timeoutId);
    });
  }, _asyncDataOptions);
  return asyncData;
}
function generateOptionSegments(opts) {
  var _a;
  const segments = [
    ((_a = toValue(opts.method)) == null ? void 0 : _a.toUpperCase()) || "GET",
    toValue(opts.baseURL)
  ];
  for (const _obj of [opts.params || opts.query]) {
    const obj = toValue(_obj);
    if (!obj) {
      continue;
    }
    const unwrapped = {};
    for (const [key, value] of Object.entries(obj)) {
      unwrapped[toValue(key)] = toValue(value);
    }
    segments.push(unwrapped);
  }
  if (opts.body) {
    const value = toValue(opts.body);
    if (!value) {
      segments.push(hash(value));
    } else if (value instanceof ArrayBuffer) {
      segments.push(hash(Object.fromEntries([...new Uint8Array(value).entries()].map(([k, v]) => [k, v.toString()]))));
    } else if (value instanceof FormData) {
      const obj = {};
      for (const entry of value.entries()) {
        const [key, val] = entry;
        obj[key] = val instanceof File ? val.name : val;
      }
      segments.push(hash(obj));
    } else if (isPlainObject(value)) {
      segments.push(hash(reactive(value)));
    } else {
      try {
        segments.push(hash(value));
      } catch {
        console.warn("[useFetch] Failed to hash body", value);
      }
    }
  }
  return segments;
}
const _sfc_main = {
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    useRouter();
    const CATEGORY_LABELS = { 1: "Chat", 2: "Image", 3: "Audio", 4: "Video" };
    const { data: detailData, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/news/detail", {
      key: `article-${route.params.slug}`,
      query: computed(() => ({ path: route.params.slug })),
      server: true,
      default: () => ({ errorCode: "", data: null })
    }, "$0FuVEBUyqQ")), __temp = await __temp, __restore(), __temp);
    watch(() => route.params.slug, async (newSlug, oldSlug) => {
    }, { immediate: false });
    watch(() => route.fullPath, async (newPath, oldPath) => {
    }, { immediate: false });
    const apiFailed = computed(() => {
      const d = detailData.value;
      if (!d) return true;
      if (d.errorCode && d.errorCode !== "00000") return true;
      if (!d.data || d.data.isDel === 1) return true;
      return false;
    });
    const article = computed(() => {
      var _a2, _b;
      var _a;
      if (apiFailed.value) return null;
      const d = (_a = detailData.value) == null ? void 0 : _a.data;
      if (!d) return null;
      const firstImg = d.content && (d.content.match(/<img[^>]+src=["']([^"']+)["']/i) || [])[1];
      return {
        id: d.id,
        title: (d.title || "").trim(),
        slug: d.path,
        excerpt: d.description || "",
        category: (_a2 = CATEGORY_LABELS[d.category]) != null ? _a2 : d.category != null ? String(d.category) : "",
        image: d.image || firstImg || void 0,
        publishDate: d.gmtCreate || null,
        updatedAt: d.gmtModified || null,
        readTime: (_b = d.readTime) != null ? _b : null,
        keyword: d.keyword || "",
        content: d.content || "",
        prevPath: d.prevPath || "",
        nextPath: d.nextPath || ""
      };
    });
    const articleBodyHtml = computed(() => {
      var _a;
      const raw = (_a = article.value) == null ? void 0 : _a.content;
      if (!raw) return "";
      const bodyMatch = raw.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      if (bodyMatch) return bodyMatch[1].trim();
      const stripDoc = raw.replace(/<!DOCTYPE[^>]*>/gi, "").replace(/<\/?html[^>]*>/gi, "").replace(/<head[^>]*>[\s\S]*?<\/head>/gi, "").replace(/<\/?body[^>]*>/gi, "");
      return stripDoc.trim();
    });
    const prevSlug = computed(() => {
      var _a;
      return ((_a = article.value) == null ? void 0 : _a.prevPath) || "";
    });
    const nextSlug = computed(() => {
      var _a;
      return ((_a = article.value) == null ? void 0 : _a.nextPath) || "";
    });
    computed(() => {
      var _a, _b, _c;
      const list = ((_b = (_a = detailData.value) == null ? void 0 : _a.data) == null ? void 0 : _b.relatedList) || ((_c = detailData.value) == null ? void 0 : _c.relatedArticles);
      return Array.isArray(list) ? list : [];
    });
    const showNotFound = computed(() => !pending && (!!error || apiFailed.value));
    const notFoundMessage = computed(() => {
      var _a, _b;
      return ((_a = error.value) == null ? void 0 : _a.message) || ((_b = detailData.value) == null ? void 0 : _b.errorMessage) || "The article doesn't exist or has been removed.";
    });
    watch(article, (newArticle) => {
      if (newArticle) {
        useHead({
          title: `${newArticle.title} - FuseAI Tools News`,
          meta: [
            { name: "description", content: newArticle.excerpt || "" },
            { name: "keywords", content: newArticle.keyword || `${newArticle.category}, AI news, ${newArticle.title}` },
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
                "dateModified": newArticle.updatedAt || newArticle.publishDate || "",
                "author": { "@type": "Organization", "name": "FuseAI Tools" },
                "publisher": {
                  "@type": "Organization",
                  "name": "FuseAI Tools",
                  "logo": { "@type": "ImageObject", "url": "https://fuseaitools.com/favicon.ico" }
                },
                "mainEntityOfPage": { "@type": "WebPage", "@id": `https://fuseaitools.com/news/${newArticle.slug || ""}` },
                "articleSection": newArticle.category || "",
                "wordCount": (newArticle.readTime || 0) * 200
              })
            }
          ]
        });
      }
    }, { immediate: true });
    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_0;
      if (unref(article)) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "news-detail-page",
          key: unref(route).params.slug
        }, _attrs))} data-v-b001b4ad><section class="detail-hero" data-v-b001b4ad><div class="simply-container" data-v-b001b4ad><div class="breadcrumb" data-v-b001b4ad>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "breadcrumb-link home-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="fas fa-home" data-v-b001b4ad${_scopeId}></i>`);
            } else {
              return [
                createVNode("i", { class: "fas fa-home" })
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
              _push2(`<i class="fas fa-arrow-left" data-v-b001b4ad${_scopeId}></i> Back to News `);
            } else {
              return [
                createVNode("i", { class: "fas fa-arrow-left" }),
                createTextVNode(" Back to News ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="article-header" data-v-b001b4ad><h1 class="article-title" data-v-b001b4ad>${ssrInterpolate(unref(article).title)}</h1><div class="article-meta" data-v-b001b4ad><span class="article-date" data-v-b001b4ad>${ssrInterpolate(formatDate(unref(article).publishDate))}</span>`);
        if (unref(article).readTime != null) {
          _push(`<span class="article-read-time" data-v-b001b4ad>${ssrInterpolate(unref(article).readTime)} min read</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></section><section class="article-content-section" data-v-b001b4ad><div class="simply-container" data-v-b001b4ad><div class="content-wrapper" data-v-b001b4ad><article class="main-content" data-v-b001b4ad><div class="article-body html-content" data-v-b001b4ad>${(_a = unref(articleBodyHtml)) != null ? _a : ""}</div></article>`);
        if (unref(prevSlug) || unref(nextSlug)) {
          _push(`<nav class="article-nav" aria-label="Article navigation" data-v-b001b4ad>`);
          if (unref(prevSlug)) {
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/news/${unref(prevSlug)}`,
              class: "article-nav-link prev-link"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<i class="fas fa-arrow-left" data-v-b001b4ad${_scopeId}></i><span data-v-b001b4ad${_scopeId}>Previous article</span>`);
                } else {
                  return [
                    createVNode("i", { class: "fas fa-arrow-left" }),
                    createVNode("span", null, "Previous article")
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<div class="article-nav-placeholder" data-v-b001b4ad></div>`);
          }
          if (unref(nextSlug)) {
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/news/${unref(nextSlug)}`,
              class: "article-nav-link next-link"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<span data-v-b001b4ad${_scopeId}>Next article</span><i class="fas fa-arrow-right" data-v-b001b4ad${_scopeId}></i>`);
                } else {
                  return [
                    createVNode("span", null, "Next article"),
                    createVNode("i", { class: "fas fa-arrow-right" })
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</nav>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></section></div>`);
      } else if (unref(pending)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "loading-state" }, _attrs))} data-v-b001b4ad><div class="simply-container" data-v-b001b4ad><div class="loading-content" data-v-b001b4ad><div class="loading-spinner" data-v-b001b4ad></div><p data-v-b001b4ad>Loading article...</p></div></div></div>`);
      } else if (unref(showNotFound)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "error-state" }, _attrs))} data-v-b001b4ad><div class="simply-container" data-v-b001b4ad><div class="error-content" data-v-b001b4ad><h2 data-v-b001b4ad>Article Not Found</h2><p data-v-b001b4ad>${ssrInterpolate(unref(notFoundMessage))}</p><button class="back-btn" data-v-b001b4ad> Back to News </button></div></div></div>`);
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
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b001b4ad"]]);

export { _slug_ as default };
//# sourceMappingURL=_slug_-XZDD2WIy.mjs.map
