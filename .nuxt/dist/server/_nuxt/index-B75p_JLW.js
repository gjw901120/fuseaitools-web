import { ref, withAsyncContext, computed, watch, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { u as useHead } from "./v3-DXSoGrP9.js";
import { u as useFetch } from "./fetch-CAoFjp9S.js";
import "C:/project/fuseaitools-web/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import "C:/project/fuseaitools-web/node_modules/nuxt/node_modules/@unhead/vue/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/ohash/dist/index.mjs";
import "@vue/shared";
import "C:/project/fuseaitools-web/node_modules/nuxt/node_modules/perfect-debounce/dist/index.mjs";
import "./client-only-BJZIIy-4.js";
import "ofetch";
import "#internal/nuxt/paths";
import "C:/project/fuseaitools-web/node_modules/unctx/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/project/fuseaitools-web/node_modules/radix3/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/defu/dist/defu.mjs";
import "C:/project/fuseaitools-web/node_modules/ufo/dist/index.mjs";
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
    const selectedCategory = ref("All");
    const currentPage = ref(1);
    const articlesPerPage = ref(10);
    ref([]);
    const { data: newsData, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/news", {
      query: computed(() => ({
        page: currentPage.value,
        limit: articlesPerPage.value,
        category: selectedCategory.value
      }))
    }, "$KJ9j-8Dhqy")), __temp = await __temp, __restore(), __temp);
    const articles = computed(() => {
      var _a;
      return ((_a = newsData.value) == null ? void 0 : _a.articles) || [];
    });
    const categories = computed(() => {
      var _a;
      return ((_a = newsData.value) == null ? void 0 : _a.categories) || [];
    });
    const pagination = computed(() => {
      var _a;
      return ((_a = newsData.value) == null ? void 0 : _a.pagination) || {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        hasMore: false
      };
    });
    ref(false);
    const formatDate = (dateString) => {
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "news-page" }, _attrs))} data-v-20305c12><section class="news-hero" data-v-20305c12><div class="simply-container" data-v-20305c12><div class="hero-content" data-v-20305c12><h1 class="hero-title" data-v-20305c12>AI News &amp; Updates</h1><p class="hero-subtitle" data-v-20305c12> Stay updated with the latest AI trends, product updates, and industry insights from FuseAI Tools. </p></div></div></section><section class="news-list-section" data-v-20305c12><div class="simply-container" data-v-20305c12>`);
      if (unref(pending)) {
        _push(`<div class="loading-state" data-v-20305c12><div class="loading-spinner" data-v-20305c12></div><p data-v-20305c12>Loading news articles...</p></div>`);
      } else if (unref(error)) {
        _push(`<div class="error-state" data-v-20305c12><h3 data-v-20305c12>Failed to load articles</h3><p data-v-20305c12>${ssrInterpolate(unref(error).message)}</p><button class="retry-btn" data-v-20305c12>Retry</button></div>`);
      } else {
        _push(`<div data-v-20305c12><div class="news-filters" data-v-20305c12><!--[-->`);
        ssrRenderList(unref(categories), (category) => {
          _push(`<button class="${ssrRenderClass(["filter-btn", { active: unref(selectedCategory) === category }])}" data-v-20305c12>${ssrInterpolate(category)}</button>`);
        });
        _push(`<!--]--></div><div class="news-list" data-v-20305c12><!--[-->`);
        ssrRenderList(unref(articles), (article) => {
          _push(`<article class="news-list-item" data-v-20305c12><div class="news-image" data-v-20305c12><img${ssrRenderAttr("src", article.image)}${ssrRenderAttr("alt", article.title)} data-v-20305c12></div><div class="news-content" data-v-20305c12><div class="news-header" data-v-20305c12><span class="news-category" data-v-20305c12>${ssrInterpolate(article.category)}</span><span class="news-date" data-v-20305c12>${ssrInterpolate(formatDate(article.publishDate))}</span></div><h3 class="news-title" data-v-20305c12>${ssrInterpolate(article.title)}</h3><p class="news-excerpt" data-v-20305c12>${ssrInterpolate(article.excerpt)}</p><div class="news-meta" data-v-20305c12><span class="news-read-time" data-v-20305c12>${ssrInterpolate(article.readTime)} min read</span><i class="fas fa-arrow-right news-arrow" data-v-20305c12></i></div></div></article>`);
        });
        _push(`<!--]--></div>`);
        if (unref(pagination).totalPages > 1) {
          _push(`<div class="pagination-section" data-v-20305c12><div class="pagination-info" data-v-20305c12> Showing ${ssrInterpolate((unref(pagination).currentPage - 1) * unref(articlesPerPage) + 1)} to ${ssrInterpolate(Math.min(unref(pagination).currentPage * unref(articlesPerPage), unref(pagination).totalItems))} of ${ssrInterpolate(unref(pagination).totalItems)} articles </div><div class="pagination-buttons" data-v-20305c12><button class="pagination-btn"${ssrIncludeBooleanAttr(unref(pagination).currentPage === 1) ? " disabled" : ""} data-v-20305c12><i class="fas fa-chevron-left" data-v-20305c12></i> Previous </button><div class="page-numbers" data-v-20305c12><!--[-->`);
          ssrRenderList(getVisiblePages(), (page) => {
            _push(`<button class="${ssrRenderClass(["page-btn", { active: page === unref(pagination).currentPage }])}" data-v-20305c12>${ssrInterpolate(page)}</button>`);
          });
          _push(`<!--]--></div><button class="pagination-btn"${ssrIncludeBooleanAttr(unref(pagination).currentPage === unref(pagination).totalPages) ? " disabled" : ""} data-v-20305c12> Next <i class="fas fa-chevron-right" data-v-20305c12></i></button></div></div>`);
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-20305c12"]]);
export {
  index as default
};
//# sourceMappingURL=index-B75p_JLW.js.map
