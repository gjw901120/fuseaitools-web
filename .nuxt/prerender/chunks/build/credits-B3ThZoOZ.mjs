import { ref, computed, mergeProps, unref, useSSRContext } from 'file://C:/project/fuseaitools-web/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrRenderTeleport } from 'file://C:/project/fuseaitools-web/node_modules/vue/server-renderer/index.mjs';
import { u as useHead } from './v3-DXSoGrP9.mjs';
import { _ as _export_sfc, u as useRouter } from './server.mjs';
import { u as useToast } from './useToast-CATlmXE8.mjs';
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
import 'file://C:/project/fuseaitools-web/node_modules/unctx/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/vue-router/dist/vue-router.node.mjs';

const historyPageSize = 10;
const rechargeRulerMax = 1e4;
const _sfc_main = {
  __name: "credits",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Credits - FuseAI Tools",
      meta: [
        { name: "description", content: "View your credits balance and consumption history." }
      ]
    });
    useRouter();
    const loading = ref(false);
    const refundLoading = ref(false);
    useToast();
    const rechargeRefundModal = ref(false);
    const rechargeRefundAmount = ref(0);
    const rechargeRefundSubmitting = ref(false);
    const subscriptionRefundModal = ref(false);
    const subscriptionRefundAmount = ref(0);
    const subscriptionRefundSubmitting = ref(false);
    const isSubscription = ref(0);
    const isRecharge = ref(0);
    const subscriptionDetail = ref({
      isCancel: 0,
      refundStatus: 0,
      credits: 0,
      remainingCredits: 0,
      ratio: 0,
      startDate: null,
      endDate: null,
      packageType: "",
      discount: 1,
      type: ""
    });
    const rechargeDetail = ref({ remainingCredits: 0, totalCredits: 0, refundStatus: 0 });
    const creditsDetails = ref([]);
    const historyPage = ref(1);
    const hasNextPage = computed(() => creditsDetails.value.length >= historyPageSize);
    function formatDatePart(val) {
      if (val == null) return "";
      if (typeof val === "string") return val;
      if (!Array.isArray(val) || val.length < 3) return "";
      const [y, m, d] = val;
      return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    }
    const subscriptionRatioPercent = computed(() => {
      const d = subscriptionDetail.value;
      if (d.ratio != null) return Math.round(d.ratio * 100);
      if (d.credits <= 0) return 0;
      return Math.round(d.remainingCredits / d.credits * 100);
    });
    const subscriptionDetailFormatted = computed(() => {
      const d = subscriptionDetail.value;
      return {
        startDateFormatted: d.startDate ? formatDatePart(d.startDate) : "",
        endDateFormatted: d.endDate ? formatDatePart(d.endDate) : ""
      };
    });
    const subscriptionPackageLabel = computed(() => {
      const d = subscriptionDetail.value;
      if (d.packageType && d.type) return `${d.packageType} (${d.type})`;
      return d.packageType || d.type || "";
    });
    const rechargeRulerTicks = [2e3, 5e3, 8e3, 1e4];
    const rechargeRemainingBarPercent = computed(() => {
      const remaining = Number(rechargeDetail.value.remainingCredits) || 0;
      return Math.min(remaining / rechargeRulerMax * 100, 100);
    });
    const rechargeRemainingBarPercentText = computed(() => {
      const remaining = Number(rechargeDetail.value.remainingCredits) || 0;
      return Math.min(Math.round(remaining / rechargeRulerMax * 100), 100);
    });
    const rechargeOverflow = computed(() => (Number(rechargeDetail.value.remainingCredits) || 0) > rechargeRulerMax);
    function formatDiscount(v) {
      if (v == null) return "\u2014";
      if (v >= 1) return "100%";
      return (v * 100).toFixed(0) + "%";
    }
    function formatCreditsNum(v) {
      if (v == null) return "\u2014";
      const n = Number(v);
      return n % 1 === 0 ? n : n.toFixed(2);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "credits-page" }, _attrs))} data-v-8a5f0a7d><section class="hero-section" data-v-8a5f0a7d><div class="simply-container" data-v-8a5f0a7d><h1 class="page-title" data-v-8a5f0a7d>Credits</h1></div></section><section class="credits-content" data-v-8a5f0a7d><div class="simply-container" data-v-8a5f0a7d>`);
      if (unref(isSubscription) && unref(subscriptionDetail).discount != null) {
        _push(`<div class="discount-banner" data-v-8a5f0a7d><span class="discount-value" data-v-8a5f0a7d>Discount ${ssrInterpolate(formatDiscount(unref(subscriptionDetail).discount))}</span><span class="discount-desc" data-v-8a5f0a7d>This discount applies to both subscription and recharge.</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(isSubscription)) {
        _push(`<div class="progress-section" data-v-8a5f0a7d><div class="progress-card" data-v-8a5f0a7d><div class="progress-label" data-v-8a5f0a7d><span class="progress-title" data-v-8a5f0a7d> Subscription Credits (Remaining) `);
        if (unref(subscriptionDetailFormatted).startDateFormatted || unref(subscriptionDetailFormatted).endDateFormatted) {
          _push(`<span class="title-dates" data-v-8a5f0a7d>${ssrInterpolate(unref(subscriptionDetailFormatted).startDateFormatted)} \u2013 ${ssrInterpolate(unref(subscriptionDetailFormatted).endDateFormatted)}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(subscriptionPackageLabel)) {
          _push(`<span class="title-package" data-v-8a5f0a7d> \xB7 ${ssrInterpolate(unref(subscriptionPackageLabel))}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span><div class="progress-tail-actions" data-v-8a5f0a7d>`);
        if (unref(subscriptionDetail).refundStatus === 0) {
          _push(`<!--[-->`);
          if (unref(subscriptionDetail).isCancel === 1) {
            _push(`<!--[--><button type="button" class="btn-refund btn-secondary"${ssrIncludeBooleanAttr(unref(refundLoading)) ? " disabled" : ""} data-v-8a5f0a7d>Cancel Subscription</button><button type="button" class="btn-refund btn-primary"${ssrIncludeBooleanAttr(unref(refundLoading)) ? " disabled" : ""} data-v-8a5f0a7d>Cancel &amp; Refund</button><!--]-->`);
          } else {
            _push(`<!--[--><span class="refund-status-text" data-v-8a5f0a7d>Subscription Terminated</span><button type="button" class="btn-refund btn-primary"${ssrIncludeBooleanAttr(unref(refundLoading)) ? " disabled" : ""} data-v-8a5f0a7d>Cancel &amp; Refund</button><!--]-->`);
          }
          _push(`<!--]-->`);
        } else if (unref(subscriptionDetail).refundStatus === 1) {
          _push(`<span class="refund-status-text" data-v-8a5f0a7d>Refund Applied</span>`);
        } else if (unref(subscriptionDetail).refundStatus === 2) {
          _push(`<span class="refund-status-text" data-v-8a5f0a7d>Refund In Progress</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="progress-bar-wrap" data-v-8a5f0a7d><div class="progress-track" data-v-8a5f0a7d><div class="progress-fill subscription" style="${ssrRenderStyle({ width: unref(subscriptionRatioPercent) + "%" })}" data-v-8a5f0a7d></div></div></div><div class="progress-meta progress-meta-ends" data-v-8a5f0a7d><span class="progress-meta-left" data-v-8a5f0a7d>${ssrInterpolate(unref(subscriptionDetail).remainingCredits)} / ${ssrInterpolate(unref(subscriptionDetail).credits)} credits</span><span class="progress-meta-right" data-v-8a5f0a7d>${ssrInterpolate(unref(subscriptionRatioPercent))}% remaining</span></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(isRecharge)) {
        _push(`<div class="progress-section" data-v-8a5f0a7d><div class="progress-card recharge-card" data-v-8a5f0a7d><div class="progress-label" data-v-8a5f0a7d><span class="progress-title" data-v-8a5f0a7d>Recharge Credits</span><div class="progress-tail-actions" data-v-8a5f0a7d>`);
        if (unref(rechargeDetail).refundStatus === 0) {
          _push(`<button type="button" class="btn-refund btn-primary"${ssrIncludeBooleanAttr(unref(refundLoading)) ? " disabled" : ""} data-v-8a5f0a7d>Refund</button>`);
        } else if (unref(rechargeDetail).refundStatus === 1) {
          _push(`<span class="refund-status-text" data-v-8a5f0a7d>Refund Applied</span>`);
        } else if (unref(rechargeDetail).refundStatus === 2) {
          _push(`<span class="refund-status-text" data-v-8a5f0a7d>Refund In Progress</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="recharge-ruler" data-v-8a5f0a7d><!--[-->`);
        ssrRenderList(rechargeRulerTicks, (t) => {
          _push(`<span class="ruler-tick" style="${ssrRenderStyle({ left: t / rechargeRulerMax * 100 + "%" })}" data-v-8a5f0a7d>${ssrInterpolate((t / 1e3).toFixed(0))}k</span>`);
        });
        _push(`<!--]--></div><div class="progress-bar-wrap" data-v-8a5f0a7d><div class="progress-track recharge-track" data-v-8a5f0a7d><div class="progress-fill recharge" style="${ssrRenderStyle({ width: unref(rechargeRemainingBarPercent) + "%" })}" data-v-8a5f0a7d></div>`);
        if (unref(rechargeRemainingBarPercent) >= 100) {
          _push(`<div class="energy-effect" title="Your credits are full and overflowing!" data-v-8a5f0a7d></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="progress-meta progress-meta-ends" data-v-8a5f0a7d><span class="progress-meta-left" data-v-8a5f0a7d>${ssrInterpolate(formatCreditsNum(unref(rechargeDetail).remainingCredits))} / ${ssrInterpolate(rechargeRulerMax)} credits</span><span class="progress-meta-right" data-v-8a5f0a7d>${ssrInterpolate(unref(rechargeRemainingBarPercentText))}%`);
        if (unref(rechargeOverflow)) {
          _push(`<span class="overflow-plus" data-v-8a5f0a7d>+</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(` remaining</span></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="history-section" data-v-8a5f0a7d><h2 class="section-title" data-v-8a5f0a7d>Consumption History</h2>`);
      if (unref(loading)) {
        _push(`<div class="loading-state" data-v-8a5f0a7d><i class="fas fa-spinner fa-spin" data-v-8a5f0a7d></i><span data-v-8a5f0a7d>Loading...</span></div>`);
      } else if (!unref(creditsDetails).length) {
        _push(`<div class="empty-state" data-v-8a5f0a7d><i class="fas fa-history" data-v-8a5f0a7d></i><p data-v-8a5f0a7d>No consumption records yet</p></div>`);
      } else {
        _push(`<div class="history-table-wrap" data-v-8a5f0a7d><table class="history-table" data-v-8a5f0a7d><thead data-v-8a5f0a7d><tr data-v-8a5f0a7d><th data-v-8a5f0a7d>Model</th><th data-v-8a5f0a7d>Title</th><th data-v-8a5f0a7d>Credits</th><th data-v-8a5f0a7d>Discount</th><th data-v-8a5f0a7d>Discount Credits</th><th data-v-8a5f0a7d>Status</th><th data-v-8a5f0a7d>Completed Date</th></tr></thead><tbody data-v-8a5f0a7d><!--[-->`);
        ssrRenderList(unref(creditsDetails), (row, index) => {
          _push(`<tr class="history-row" data-v-8a5f0a7d><td data-v-8a5f0a7d>${ssrInterpolate(row.modelCategory)} \xB7 ${ssrInterpolate(row.model)}</td><td data-v-8a5f0a7d>${ssrInterpolate(row.title)}</td><td data-v-8a5f0a7d>${ssrInterpolate(formatCreditsNum(row.credits))}</td><td data-v-8a5f0a7d><span class="badge discount" data-v-8a5f0a7d>${ssrInterpolate(formatDiscount(row.discount))}</span></td><td data-v-8a5f0a7d>${ssrInterpolate(row.discountCredits != null ? formatCreditsNum(row.discountCredits) : "\u2014")}</td><td data-v-8a5f0a7d><span class="${ssrRenderClass(["badge", "status-" + (row.status || "").toLowerCase()])}" data-v-8a5f0a7d>${ssrInterpolate(row.status || "\u2014")}</span></td><td data-v-8a5f0a7d>${ssrInterpolate(row.completedDate || "\u2014")}</td></tr>`);
        });
        _push(`<!--]--></tbody></table><div class="pagination-bar" data-v-8a5f0a7d><button type="button" class="page-btn"${ssrIncludeBooleanAttr(unref(historyPage) <= 1) ? " disabled" : ""} data-v-8a5f0a7d>Previous</button><span class="page-info" data-v-8a5f0a7d>Page ${ssrInterpolate(unref(historyPage))}</span>`);
        if (unref(hasNextPage)) {
          _push(`<button type="button" class="page-btn" data-v-8a5f0a7d>Next</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      }
      _push(`</div></div></section>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(rechargeRefundModal)) {
          _push2(`<div class="refund-modal-overlay" data-v-8a5f0a7d><div class="refund-modal" data-v-8a5f0a7d><h3 class="refund-modal-title" data-v-8a5f0a7d>Recharge Refund</h3><p class="refund-modal-amount" data-v-8a5f0a7d>Refundable amount: <strong data-v-8a5f0a7d>$${ssrInterpolate(unref(rechargeRefundAmount))}</strong></p><div class="refund-modal-actions" data-v-8a5f0a7d><button type="button" class="btn-refund btn-secondary"${ssrIncludeBooleanAttr(unref(rechargeRefundSubmitting)) ? " disabled" : ""} data-v-8a5f0a7d>Cancel</button><button type="button" class="btn-refund btn-primary"${ssrIncludeBooleanAttr(unref(rechargeRefundSubmitting)) ? " disabled" : ""} data-v-8a5f0a7d>Confirm Refund</button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(subscriptionRefundModal)) {
          _push2(`<div class="refund-modal-overlay" data-v-8a5f0a7d><div class="refund-modal" data-v-8a5f0a7d><h3 class="refund-modal-title" data-v-8a5f0a7d>Subscription Refund</h3><p class="refund-modal-amount" data-v-8a5f0a7d>Refundable amount: <strong data-v-8a5f0a7d>$${ssrInterpolate(unref(subscriptionRefundAmount))}</strong></p><div class="refund-modal-actions" data-v-8a5f0a7d><button type="button" class="btn-refund btn-secondary"${ssrIncludeBooleanAttr(unref(subscriptionRefundSubmitting)) ? " disabled" : ""} data-v-8a5f0a7d>Cancel</button><button type="button" class="btn-refund btn-primary"${ssrIncludeBooleanAttr(unref(subscriptionRefundSubmitting)) ? " disabled" : ""} data-v-8a5f0a7d>Confirm Refund</button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/credits.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const credits = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8a5f0a7d"]]);

export { credits as default };
//# sourceMappingURL=credits-B3ThZoOZ.mjs.map
