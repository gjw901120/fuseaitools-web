import { ref, watch, reactive, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { publicAssetsURL } from "#internal/nuxt/paths";
import { useRouter, useRoute } from "vue-router";
import { u as useToast } from "./useToast-CATlmXE8.js";
import { u as useApi } from "./useApi-1a9EtG7k.js";
import { u as useRecordPolling } from "./useRecordPolling-QI_mIuwF.js";
import { u as useModelPrice } from "./useModelPrice-DCrt0_k3.js";
import { _ as _export_sfc } from "../server.mjs";
const _imports_0 = publicAssetsURL("/tools-logo/Imagen4.png");
const _sfc_main = {
  __name: "Imagen4Tool",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const route = useRoute();
    useToast();
    useApi();
    const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling();
    const { getPrice, formatCredits, discount } = useModelPrice();
    const modeList = [
      { id: "imagen4-generate", label: "Imagen4 Generate", icon: "fas fa-image" },
      { id: "imagen4-fast", label: "Imagen4 Fast", icon: "fas fa-bolt" },
      { id: "imagen4-ultra", label: "Imagen4 Ultra", icon: "fas fa-star" }
    ];
    const modeTabToPath = {
      "imagen4-generate": "/home/imagen4/imagen4-generate",
      "imagen4-fast": "/home/imagen4/imagen4-fast",
      "imagen4-ultra": "/home/imagen4/imagen4-ultra"
    };
    const pathToMode = {};
    Object.keys(modeTabToPath).forEach((k) => {
      pathToMode[modeTabToPath[k]] = k;
    });
    const mode = ref("imagen4-generate");
    watch(() => route.path, (path) => {
      const m = pathToMode[path];
      if (m && mode.value !== m) {
        mode.value = m;
      }
    }, { immediate: true });
    watch(mode, (m) => {
      if (m === "imagen4-fast") {
        formData.aspectRatio = "16:9";
      } else {
        formData.aspectRatio = "1:1";
      }
    });
    const aspectRatios = ["1:1", "16:9", "9:16", "3:4", "4:3"];
    const formData = reactive({
      prompt: "",
      negativePrompt: "",
      aspectRatio: "1:1",
      numImages: "1",
      seedText: "",
      seedNumber: null
    });
    const discountText = computed(() => {
      const rate = Number((discount == null ? void 0 : discount.value) ?? 1);
      if (Number.isNaN(rate) || rate <= 0 || rate === 1) return "";
      return ` · ${(rate * 100).toFixed(0)}%`;
    });
    const imagen4PriceText = computed(() => {
      const key = mode.value;
      const credits = key === "imagen4-ultra" ? getPrice("imagen4-ultra") : getPrice(key);
      const str = formatCredits(credits);
      if (!str) return "";
      return `· ${str} credits${discountText.value}`;
    });
    const result = ref(null);
    const isGenerating = ref(false);
    const routeRecordId = computed(() => route.query["record-id"] || "");
    const isDetailView = computed(() => !!routeRecordId.value);
    const detailData = ref(null);
    const canGenerate = computed(() => {
      const p = (formData.prompt || "").trim();
      if (p.length === 0 || p.length > 5e3) return false;
      return true;
    });
    function fillFormFromOriginalData(o) {
      if (!o || typeof o !== "object") return;
      if (o.prompt != null) formData.prompt = String(o.prompt);
      if (o.negativePrompt != null) formData.negativePrompt = String(o.negativePrompt);
      if (o.aspectRatio) formData.aspectRatio = String(o.aspectRatio);
      if (o.numImages != null) formData.numImages = String(o.numImages);
      if (o.seed != null && o.seed !== "") {
        const n = Number(o.seed);
        if (!Number.isNaN(n) && String(o.seed).trim() !== "") {
          formData.seedNumber = n;
          formData.seedText = "";
        } else {
          formData.seedText = String(o.seed);
          formData.seedNumber = null;
        }
      }
    }
    function pickDetailImageUrl(d) {
      if (!d || typeof d !== "object") return "";
      let url = d.outputUrl || d.imageUrl;
      if (url) return typeof url === "string" ? url : (url == null ? void 0 : url.url) || "";
      const ou = d.outputUrls;
      if (typeof ou === "string" && ou) return ou;
      if (Array.isArray(ou) && ou.length) {
        const first = ou[0];
        return typeof first === "string" ? first : (first == null ? void 0 : first.url) || "";
      }
      return "";
    }
    const displayResult = computed(() => {
      if (isDetailView.value && detailData.value && Number(detailData.value.status) === 2) {
        const url = pickDetailImageUrl(detailData.value);
        if (url) return { imageUrl: url };
      }
      return result.value;
    });
    async function loadDetailByRecordId(recordId) {
      if (!recordId || routeRecordId.value !== recordId) return;
      detailData.value = null;
      try {
        let data = await fetchRecordDetailOnce(recordId);
        if (routeRecordId.value !== recordId) return;
        detailData.value = data || null;
        if (data == null ? void 0 : data.originalData) fillFormFromOriginalData(data.originalData);
        const status = Number(data == null ? void 0 : data.status);
        if (data == null || status === 0 || status === 1) {
          const res = await pollRecordByStatus(recordId, { getIsCancelled: () => routeRecordId.value !== recordId });
          if (routeRecordId.value === recordId) {
            detailData.value = res;
            if (res == null ? void 0 : res.originalData) fillFormFromOriginalData(res.originalData);
          }
        }
      } catch (e) {
        console.error("Imagen4 load record detail failed:", e);
      }
    }
    watch(() => route.query["record-id"], (recordId) => {
      if (recordId) loadDetailByRecordId(recordId);
      else detailData.value = null;
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "imagen4-tool" }, _attrs))} data-v-9d445f92><div class="tool-header" data-v-9d445f92><div class="tool-avatar" data-v-9d445f92><img${ssrRenderAttr("src", _imports_0)} alt="Imagen4" data-v-9d445f92></div><div class="tool-details" data-v-9d445f92><h3 data-v-9d445f92>Imagen4</h3><p class="tool-description" data-v-9d445f92>Google Imagen 4 series for high-quality text-to-image generation with fast and ultra variants.</p></div></div><div class="mode-tabs-wrap" data-v-9d445f92><div class="mode-tabs" data-v-9d445f92><!--[-->`);
      ssrRenderList(modeList, (m) => {
        _push(`<div class="${ssrRenderClass([{ active: mode.value === m.id }, "mode-tab"])}" data-v-9d445f92><i class="${ssrRenderClass(m.icon)}" data-v-9d445f92></i><span data-v-9d445f92>${ssrInterpolate(m.label)}</span></div>`);
      });
      _push(`<!--]--></div></div><div class="main-content" data-v-9d445f92><div class="config-panel" data-v-9d445f92><div class="config-header" data-v-9d445f92><h4 data-v-9d445f92>Configuration</h4></div><form class="config-form" data-v-9d445f92><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-9d445f92><div class="form-group" data-v-9d445f92><label class="form-label" data-v-9d445f92>Prompt <span class="required" data-v-9d445f92>*</span></label><textarea class="form-input" rows="4" maxlength="5000" placeholder="Prompt (max 5000)" required data-v-9d445f92>${ssrInterpolate(formData.prompt)}</textarea>`);
      if (formData.prompt) {
        _push(`<div class="char-count" data-v-9d445f92>${ssrInterpolate(formData.prompt.length)}/5000</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="form-group" data-v-9d445f92><label class="form-label" data-v-9d445f92>Negative Prompt</label><textarea class="form-input" rows="3" maxlength="5000" placeholder="Negative prompt (optional)" data-v-9d445f92>${ssrInterpolate(formData.negativePrompt)}</textarea>`);
      if (formData.negativePrompt) {
        _push(`<div class="char-count" data-v-9d445f92>${ssrInterpolate(formData.negativePrompt.length)}/5000</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="form-group" data-v-9d445f92><label class="form-label" data-v-9d445f92>Aspect Ratio</label><div class="tab-group" data-v-9d445f92><!--[-->`);
      ssrRenderList(aspectRatios, (ratio) => {
        _push(`<button type="button" class="${ssrRenderClass([{ active: formData.aspectRatio === ratio }, "tab-option"])}" data-v-9d445f92>${ssrInterpolate(ratio)}</button>`);
      });
      _push(`<!--]--></div></div>`);
      if (mode.value === "imagen4-fast") {
        _push(`<div class="form-group" data-v-9d445f92><label class="form-label" data-v-9d445f92>Num Images</label><div class="tab-group" data-v-9d445f92><!--[-->`);
        ssrRenderList(["1", "2", "3", "4"], (n) => {
          _push(`<button type="button" class="${ssrRenderClass([{ active: formData.numImages === n }, "tab-option"])}" data-v-9d445f92>${ssrInterpolate(n)}</button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-group" data-v-9d445f92><label class="form-label" data-v-9d445f92>Seed</label>`);
      if (mode.value === "imagen4-fast") {
        _push(`<input${ssrRenderAttr("value", formData.seedNumber)} type="number" class="form-input" placeholder="Optional integer seed" data-v-9d445f92>`);
      } else {
        _push(`<input${ssrRenderAttr("value", formData.seedText)} type="text" class="form-input" maxlength="500" placeholder="Optional seed (max 500 chars)" data-v-9d445f92>`);
      }
      _push(`</div><div class="form-actions" data-v-9d445f92><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(!canGenerate.value || isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-9d445f92>`);
      if (isGenerating.value) {
        _push(`<i class="fas fa-spinner fa-spin" data-v-9d445f92></i>`);
      } else {
        _push(`<i class="fas fa-magic" data-v-9d445f92></i>`);
      }
      _push(` ${ssrInterpolate(isGenerating.value ? "Generating..." : "Generate Image")} `);
      if (imagen4PriceText.value) {
        _push(`<span class="price-tag" data-v-9d445f92>${ssrInterpolate(imagen4PriceText.value)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div></fieldset></form></div><div class="result-panel" data-v-9d445f92>`);
      if (isDetailView.value && Number((_a = detailData.value) == null ? void 0 : _a.status) === 3) {
        _push(`<div class="detail-failure-state" data-v-9d445f92><div class="failure-icon" data-v-9d445f92><i class="fas fa-exclamation-circle" data-v-9d445f92></i></div><p class="failure-message" data-v-9d445f92>Generation failed. You can try again with different parameters.</p></div>`);
      } else if (isDetailView.value && (!detailData.value || [0, 1].includes(Number(detailData.value.status)))) {
        _push(`<div class="detail-loading-state" data-v-9d445f92><i class="fas fa-spinner fa-spin detail-spinner" data-v-9d445f92></i><p data-v-9d445f92>Generating...</p></div>`);
      } else if (!displayResult.value) {
        _push(`<div class="empty-state" data-v-9d445f92><h4 data-v-9d445f92>No image generated yet</h4><p data-v-9d445f92>Fill in the form and click &quot;Generate Image&quot; to start.</p></div>`);
      } else {
        _push(`<div class="result-display" data-v-9d445f92><div class="image-result" data-v-9d445f92>`);
        if (displayResult.value.imageUrl) {
          _push(`<img${ssrRenderAttr("src", displayResult.value.imageUrl)} alt="Generated" class="result-image" data-v-9d445f92>`);
        } else {
          _push(`<div class="image-placeholder" data-v-9d445f92><i class="fas fa-spinner fa-spin" data-v-9d445f92></i><p data-v-9d445f92>Generating...</p></div>`);
        }
        if (displayResult.value.imageUrl) {
          _push(`<div class="image-actions" data-v-9d445f92><button class="action-btn" data-v-9d445f92><i class="fas fa-download" data-v-9d445f92></i> Download</button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/Imagen4Tool.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Imagen4Tool = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9d445f92"]]);
export {
  Imagen4Tool as I
};
//# sourceMappingURL=Imagen4Tool-CFZ-bQeX.js.map
