import { ref, withAsyncContext, computed, watch, mergeProps, unref, useSSRContext } from 'file://C:/project/fuseaitools-web/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr } from 'file://C:/project/fuseaitools-web/node_modules/vue/server-renderer/index.mjs';
import { u as useHead } from './v3-DXSoGrP9.mjs';
import { u as useFetch } from './fetch-CAoFjp9S.mjs';
import { _ as _export_sfc } from './server.mjs';
import '../_/renderer.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/ufo/dist/index.mjs';
import '../_/nitro.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/destr/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/hookable/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/ofetch/dist/node.mjs';
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
import 'file://C:/project/fuseaitools-web/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file://C:/project/fuseaitools-web/node_modules/nuxt/node_modules/perfect-debounce/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/unctx/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/vue-router/dist/vue-router.node.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useHead({
      title: "AI News & Updates - FuseAI Tools",
      meta: [
        { name: "description", content: "Stay updated with the latest AI trends, product updates, and industry insights from FuseAI Tools." },
        { name: "keywords", content: "AI news, artificial intelligence updates, AI trends, FuseAI tools news" }
      ]
    });
    const CATEGORY_LABELS = { 1: "Chat", 2: "Image", 3: "Audio", 4: "Video" };
    const CATEGORY_VALUES = { Chat: 1, Image: 2, Audio: 3, Video: 4 };
    const selectedCategory = ref("All");
    const currentPage = ref(1);
    const articlesPerPage = ref(10);
    const { data: newsData, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/news/list", {
      query: computed(() => {
        const categoryParam = selectedCategory.value !== "All" ? CATEGORY_VALUES[selectedCategory.value] : void 0;
        return {
          page: currentPage.value,
          size: articlesPerPage.value,
          ...categoryParam != null ? { category: categoryParam } : {}
        };
      })
    }, "$KJ9j-8Dhqy")), __temp = await __temp, __restore(), __temp);
    const apiFailed = computed(() => {
      var _a;
      return ((_a = newsData.value) == null ? void 0 : _a.errorCode) && newsData.value.errorCode !== "00000";
    });
    const articles = computed(() => {
      var _a, _b;
      if (apiFailed.value) return [];
      const raw = ((_b = (_a = newsData.value) == null ? void 0 : _a.data) == null ? void 0 : _b.records) || [];
      if (!Array.isArray(raw)) return [];
      return raw.map((r) => {
        var _a2, _b2;
        return {
          id: r.id,
          title: (r.title || "").trim(),
          slug: r.path || String(r.id),
          excerpt: r.description || "",
          category: (_a2 = CATEGORY_LABELS[r.category]) != null ? _a2 : r.category != null ? String(r.category) : "",
          image: r.image || void 0,
          publishDate: r.publishDate || null,
          readTime: (_b2 = r.readTime) != null ? _b2 : null
        };
      });
    });
    const categories = computed(() => ["All", "Chat", "Image", "Audio", "Video"]);
    const pagination = computed(() => {
      var _a;
      const d = (_a = newsData.value) == null ? void 0 : _a.data;
      if (!d) return { currentPage: 1, totalPages: 1, totalItems: 0, hasMore: false };
      const total = Number(d.total) || 0;
      const current = Number(d.current) || 1;
      const pages = Number(d.pages) || 1;
      return {
        currentPage: current,
        totalPages: pages,
        totalItems: total,
        hasMore: current < pages
      };
    });
    ref(false);
    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    const getVisiblePages = () => {
      const current = pagination.value.currentPage;
      const total = pagination.value.totalPages;
      const delta = 2;
      let start = Math.max(1, current - delta);
      let end = Math.min(total, current + delta);
      if (end - start < 4) {
        if (start === 1) {
          end = Math.min(total, start + 4);
        } else {
          start = Math.max(1, end - 4);
        }
      }
      const pages = [];
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    };
    watch(selectedCategory, () => {
      currentPage.value = 1;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "news-page" }, _attrs))} data-v-e3257690><section class="news-hero" data-v-e3257690><div class="simply-container" data-v-e3257690><div class="hero-content" data-v-e3257690><h1 class="hero-title" data-v-e3257690>AI News &amp; Updates</h1><p class="hero-subtitle" data-v-e3257690> Stay updated with the latest AI trends, product updates, and industry insights from FuseAI Tools. </p></div></div></section><section class="news-list-section" data-v-e3257690><div class="simply-container" data-v-e3257690>`);
      if (unref(pending)) {
        _push(`<div class="loading-state" data-v-e3257690><div class="loading-spinner" data-v-e3257690></div><p data-v-e3257690>Loading news articles...</p></div>`);
      } else if (unref(error)) {
        _push(`<div class="error-state" data-v-e3257690><h3 data-v-e3257690>Failed to load articles</h3><p data-v-e3257690>${ssrInterpolate(unref(error).message)}</p><button class="retry-btn" data-v-e3257690>Retry</button></div>`);
      } else if (unref(apiFailed)) {
        _push(`<div class="error-state" data-v-e3257690><h3 data-v-e3257690>Unable to load articles</h3><p data-v-e3257690>${ssrInterpolate(((_a = unref(newsData)) == null ? void 0 : _a.errorMessage) || "Please try again later.")}</p><button class="retry-btn" data-v-e3257690>Retry</button></div>`);
      } else {
        _push(`<div data-v-e3257690><div class="news-filters" data-v-e3257690><!--[-->`);
        ssrRenderList(unref(categories), (category) => {
          _push(`<button class="${ssrRenderClass(["filter-btn", { active: unref(selectedCategory) === category }])}" data-v-e3257690>${ssrInterpolate(category)}</button>`);
        });
        _push(`<!--]--></div><div class="news-list" data-v-e3257690><!--[-->`);
        ssrRenderList(unref(articles), (article) => {
          _push(`<article class="news-list-item" data-v-e3257690>`);
          if (article.image) {
            _push(`<div class="news-image" data-v-e3257690><img${ssrRenderAttr("src", article.image)}${ssrRenderAttr("alt", article.title)} data-v-e3257690></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="news-content" data-v-e3257690><div class="news-header" data-v-e3257690>`);
          if (article.category) {
            _push(`<span class="news-category" data-v-e3257690>${ssrInterpolate(article.category)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<span class="news-date" data-v-e3257690>${ssrInterpolate(formatDate(article.publishDate))}</span></div><h3 class="news-title" data-v-e3257690>${ssrInterpolate(article.title)}</h3><p class="news-excerpt" data-v-e3257690>${ssrInterpolate(article.excerpt)}</p><div class="news-meta" data-v-e3257690>`);
          if (article.readTime != null) {
            _push(`<span class="news-read-time" data-v-e3257690>${ssrInterpolate(article.readTime)} min read</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<i class="fas fa-arrow-right news-arrow" data-v-e3257690></i></div></div></article>`);
        });
        _push(`<!--]--></div>`);
        if (unref(pagination).totalPages > 1) {
          _push(`<div class="pagination-section" data-v-e3257690><div class="pagination-info" data-v-e3257690> Showing ${ssrInterpolate((unref(pagination).currentPage - 1) * unref(articlesPerPage) + 1)} to ${ssrInterpolate(Math.min(unref(pagination).currentPage * unref(articlesPerPage), unref(pagination).totalItems))} of ${ssrInterpolate(unref(pagination).totalItems)} articles </div><div class="pagination-buttons" data-v-e3257690><button class="pagination-btn"${ssrIncludeBooleanAttr(unref(pagination).currentPage === 1) ? " disabled" : ""} data-v-e3257690><i class="fas fa-chevron-left" data-v-e3257690></i> Previous </button><div class="page-numbers" data-v-e3257690><!--[-->`);
          ssrRenderList(getVisiblePages(), (page) => {
            _push(`<button class="${ssrRenderClass(["page-btn", { active: page === unref(pagination).currentPage }])}" data-v-e3257690>${ssrInterpolate(page)}</button>`);
          });
          _push(`<!--]--></div><button class="pagination-btn"${ssrIncludeBooleanAttr(unref(pagination).currentPage === unref(pagination).totalPages) ? " disabled" : ""} data-v-e3257690> Next <i class="fas fa-chevron-right" data-v-e3257690></i></button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/news/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e3257690"]]);

export { index as default };
//# sourceMappingURL=index-BqOU0gF_.mjs.map
