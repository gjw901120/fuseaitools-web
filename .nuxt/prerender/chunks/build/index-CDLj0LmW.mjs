import { ref, withAsyncContext, computed, watch, mergeProps, unref, useSSRContext } from 'file://C:/project/fuseaitools-web/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr } from 'file://C:/project/fuseaitools-web/node_modules/vue/server-renderer/index.mjs';
import { u as useHead } from './v3-DXSoGrP9.mjs';
import { u as useAsyncData } from './asyncData-Dwv0HOxb.mjs';
import { u as useApi } from './useApi-1a9EtG7k.mjs';
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
    const { data: newsData, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("news-list", async () => {
      const { get } = useApi();
      const categoryParam = selectedCategory.value !== "All" ? CATEGORY_VALUES[selectedCategory.value] : void 0;
      const query = {
        page: currentPage.value,
        size: articlesPerPage.value,
        ...categoryParam != null ? { category: categoryParam } : {}
      };
      const queryString = new URLSearchParams(Object.entries(query).filter(([, v]) => v != null)).toString();
      const url = `/api/news/list?${queryString}`;
      return await get(url);
    })), __temp = await __temp, __restore(), __temp);
    const apiFailed = computed(() => false);
    const articles = computed(() => {
      var _a;
      if (apiFailed.value) return [];
      const raw = ((_a = newsData.value) == null ? void 0 : _a.records) || [];
      if (!Array.isArray(raw)) return [];
      return raw.map((r) => {
        var _a2, _b;
        return {
          id: r.id,
          title: (r.title || "").trim(),
          slug: r.path || String(r.id),
          excerpt: r.description || "",
          category: (_a2 = CATEGORY_LABELS[r.category]) != null ? _a2 : r.category != null ? String(r.category) : "",
          image: r.image || void 0,
          publishDate: r.publishDate || null,
          readTime: (_b = r.readTime) != null ? _b : null
        };
      });
    });
    const categories = computed(() => ["All", "Chat", "Image", "Audio", "Video"]);
    const pagination = computed(() => {
      const d = newsData.value;
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "news-page" }, _attrs))} data-v-b1a3d7fa><section class="news-hero" data-v-b1a3d7fa><div class="simply-container" data-v-b1a3d7fa><div class="hero-content" data-v-b1a3d7fa><h1 class="hero-title" data-v-b1a3d7fa>AI News &amp; Updates</h1><p class="hero-subtitle" data-v-b1a3d7fa> Stay updated with the latest AI trends, product updates, and industry insights from FuseAI Tools. </p></div></div></section><section class="news-list-section" data-v-b1a3d7fa><div class="simply-container" data-v-b1a3d7fa>`);
      if (unref(pending)) {
        _push(`<div class="loading-state" data-v-b1a3d7fa><div class="loading-spinner" data-v-b1a3d7fa></div><p data-v-b1a3d7fa>Loading news articles...</p></div>`);
      } else if (unref(error)) {
        _push(`<div class="error-state" data-v-b1a3d7fa><h3 data-v-b1a3d7fa>Failed to load articles</h3><p data-v-b1a3d7fa>${ssrInterpolate(unref(error).message)}</p><button class="retry-btn" data-v-b1a3d7fa>Retry</button></div>`);
      } else if (unref(apiFailed)) {
        _push(`<div class="error-state" data-v-b1a3d7fa><h3 data-v-b1a3d7fa>Unable to load articles</h3><p data-v-b1a3d7fa>${ssrInterpolate(((_a = unref(newsData)) == null ? void 0 : _a.errorMessage) || "Please try again later.")}</p><button class="retry-btn" data-v-b1a3d7fa>Retry</button></div>`);
      } else {
        _push(`<div data-v-b1a3d7fa><div class="news-filters" data-v-b1a3d7fa><!--[-->`);
        ssrRenderList(unref(categories), (category) => {
          _push(`<button class="${ssrRenderClass(["filter-btn", { active: unref(selectedCategory) === category }])}" data-v-b1a3d7fa>${ssrInterpolate(category)}</button>`);
        });
        _push(`<!--]--></div><div class="news-list" data-v-b1a3d7fa><!--[-->`);
        ssrRenderList(unref(articles), (article) => {
          _push(`<article class="news-list-item" data-v-b1a3d7fa>`);
          if (article.image) {
            _push(`<div class="news-image" data-v-b1a3d7fa><img${ssrRenderAttr("src", article.image)}${ssrRenderAttr("alt", article.title)} data-v-b1a3d7fa></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="news-content" data-v-b1a3d7fa><div class="news-header" data-v-b1a3d7fa>`);
          if (article.category) {
            _push(`<span class="news-category" data-v-b1a3d7fa>${ssrInterpolate(article.category)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<span class="news-date" data-v-b1a3d7fa>${ssrInterpolate(formatDate(article.publishDate))}</span></div><h3 class="news-title" data-v-b1a3d7fa>${ssrInterpolate(article.title)}</h3><p class="news-excerpt" data-v-b1a3d7fa>${ssrInterpolate(article.excerpt)}</p><div class="news-meta" data-v-b1a3d7fa>`);
          if (article.readTime != null) {
            _push(`<span class="news-read-time" data-v-b1a3d7fa>${ssrInterpolate(article.readTime)} min read</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<i class="fas fa-arrow-right news-arrow" data-v-b1a3d7fa></i></div></div></article>`);
        });
        _push(`<!--]--></div>`);
        if (unref(pagination).totalPages > 1) {
          _push(`<div class="pagination-section" data-v-b1a3d7fa><div class="pagination-info" data-v-b1a3d7fa> Showing ${ssrInterpolate((unref(pagination).currentPage - 1) * unref(articlesPerPage) + 1)} to ${ssrInterpolate(Math.min(unref(pagination).currentPage * unref(articlesPerPage), unref(pagination).totalItems))} of ${ssrInterpolate(unref(pagination).totalItems)} articles </div><div class="pagination-buttons" data-v-b1a3d7fa><button class="pagination-btn"${ssrIncludeBooleanAttr(unref(pagination).currentPage === 1) ? " disabled" : ""} data-v-b1a3d7fa><i class="fas fa-chevron-left" data-v-b1a3d7fa></i> Previous </button><div class="page-numbers" data-v-b1a3d7fa><!--[-->`);
          ssrRenderList(getVisiblePages(), (page) => {
            _push(`<button class="${ssrRenderClass(["page-btn", { active: page === unref(pagination).currentPage }])}" data-v-b1a3d7fa>${ssrInterpolate(page)}</button>`);
          });
          _push(`<!--]--></div><button class="pagination-btn"${ssrIncludeBooleanAttr(unref(pagination).currentPage === unref(pagination).totalPages) ? " disabled" : ""} data-v-b1a3d7fa> Next <i class="fas fa-chevron-right" data-v-b1a3d7fa></i></button></div></div>`);
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b1a3d7fa"]]);

export { index as default };
//# sourceMappingURL=index-CDLj0LmW.mjs.map
