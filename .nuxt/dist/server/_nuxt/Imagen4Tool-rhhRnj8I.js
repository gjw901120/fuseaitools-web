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
    const displayResult = computed(() => {
      var _a, _b, _c, _d;
      if (isDetailView.value && ((_a = detailData.value) == null ? void 0 : _a.status) === 2 && ((_c = (_b = detailData.value) == null ? void 0 : _b.outputUrls) == null ? void 0 : _c.length)) {
        const url = typeof detailData.value.outputUrls[0] === "string" ? detailData.value.outputUrls[0] : (_d = detailData.value.outputUrls[0]) == null ? void 0 : _d.url;
        return { imageUrl: url };
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
        const status = Number(data == null ? void 0 : data.status);
        if (data == null || status === 0 || status === 1) {
          const res = await pollRecordByStatus(recordId, { getIsCancelled: () => routeRecordId.value !== recordId });
          if (routeRecordId.value === recordId) detailData.value = res;
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "imagen4-tool" }, _attrs))} data-v-f7e989bf><div class="tool-header" data-v-f7e989bf><div class="tool-avatar" data-v-f7e989bf><img${ssrRenderAttr("src", _imports_0)} alt="Imagen4" data-v-f7e989bf></div><div class="tool-details" data-v-f7e989bf><h3 data-v-f7e989bf>Imagen4</h3><p class="tool-description" data-v-f7e989bf>Google Imagen 4 series for high-quality text-to-image generation with fast and ultra variants.</p></div></div><div class="mode-tabs-wrap" data-v-f7e989bf><div class="mode-tabs" data-v-f7e989bf><!--[-->`);
      ssrRenderList(modeList, (m) => {
        _push(`<div class="${ssrRenderClass([{ active: mode.value === m.id }, "mode-tab"])}" data-v-f7e989bf><i class="${ssrRenderClass(m.icon)}" data-v-f7e989bf></i><span data-v-f7e989bf>${ssrInterpolate(m.label)}</span></div>`);
      });
      _push(`<!--]--></div></div><div class="main-content" data-v-f7e989bf><div class="config-panel" data-v-f7e989bf><div class="config-header" data-v-f7e989bf><h4 data-v-f7e989bf>Configuration</h4></div><form class="config-form" data-v-f7e989bf><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-f7e989bf><div class="form-group" data-v-f7e989bf><label class="form-label" data-v-f7e989bf>Prompt <span class="required" data-v-f7e989bf>*</span></label><textarea class="form-input" rows="4" maxlength="5000" placeholder="Prompt (max 5000)" required data-v-f7e989bf>${ssrInterpolate(formData.prompt)}</textarea>`);
      if (formData.prompt) {
        _push(`<div class="char-count" data-v-f7e989bf>${ssrInterpolate(formData.prompt.length)}/5000</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="form-group" data-v-f7e989bf><label class="form-label" data-v-f7e989bf>Negative Prompt</label><textarea class="form-input" rows="3" maxlength="5000" placeholder="Negative prompt (optional)" data-v-f7e989bf>${ssrInterpolate(formData.negativePrompt)}</textarea>`);
      if (formData.negativePrompt) {
        _push(`<div class="char-count" data-v-f7e989bf>${ssrInterpolate(formData.negativePrompt.length)}/5000</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="form-group" data-v-f7e989bf><label class="form-label" data-v-f7e989bf>Aspect Ratio</label><div class="tab-group" data-v-f7e989bf><!--[-->`);
      ssrRenderList(aspectRatios, (ratio) => {
        _push(`<button type="button" class="${ssrRenderClass([{ active: formData.aspectRatio === ratio }, "tab-option"])}" data-v-f7e989bf>${ssrInterpolate(ratio)}</button>`);
      });
      _push(`<!--]--></div></div>`);
      if (mode.value === "imagen4-fast") {
        _push(`<div class="form-group" data-v-f7e989bf><label class="form-label" data-v-f7e989bf>Num Images</label><div class="tab-group" data-v-f7e989bf><!--[-->`);
        ssrRenderList(["1", "2", "3", "4"], (n) => {
          _push(`<button type="button" class="${ssrRenderClass([{ active: formData.numImages === n }, "tab-option"])}" data-v-f7e989bf>${ssrInterpolate(n)}</button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-group" data-v-f7e989bf><label class="form-label" data-v-f7e989bf>Seed</label>`);
      if (mode.value === "imagen4-fast") {
        _push(`<input${ssrRenderAttr("value", formData.seedNumber)} type="number" class="form-input" placeholder="Optional integer seed" data-v-f7e989bf>`);
      } else {
        _push(`<input${ssrRenderAttr("value", formData.seedText)} type="text" class="form-input" maxlength="500" placeholder="Optional seed (max 500 chars)" data-v-f7e989bf>`);
      }
      _push(`</div><div class="form-actions" data-v-f7e989bf><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(!canGenerate.value || isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-f7e989bf>`);
      if (isGenerating.value) {
        _push(`<i class="fas fa-spinner fa-spin" data-v-f7e989bf></i>`);
      } else {
        _push(`<i class="fas fa-magic" data-v-f7e989bf></i>`);
      }
      _push(` ${ssrInterpolate(isGenerating.value ? "Generating..." : "Generate Image")} `);
      if (imagen4PriceText.value) {
        _push(`<span class="price-tag" data-v-f7e989bf>${ssrInterpolate(imagen4PriceText.value)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div></fieldset></form></div><div class="result-panel" data-v-f7e989bf>`);
      if (isDetailView.value && ((_a = detailData.value) == null ? void 0 : _a.status) === 3) {
        _push(`<div class="detail-failure-state" data-v-f7e989bf><div class="failure-icon" data-v-f7e989bf><i class="fas fa-exclamation-circle" data-v-f7e989bf></i></div><p class="failure-message" data-v-f7e989bf>Generation failed. You can try again with different parameters.</p></div>`);
      } else if (isDetailView.value && (!detailData.value || detailData.value.status === 1)) {
        _push(`<div class="detail-loading-state" data-v-f7e989bf><i class="fas fa-spinner fa-spin detail-spinner" data-v-f7e989bf></i><p data-v-f7e989bf>Generating...</p></div>`);
      } else if (!displayResult.value) {
        _push(`<div class="empty-state" data-v-f7e989bf><h4 data-v-f7e989bf>No image generated yet</h4><p data-v-f7e989bf>Fill in the form and click &quot;Generate Image&quot; to start.</p></div>`);
      } else {
        _push(`<div class="result-display" data-v-f7e989bf><div class="image-result" data-v-f7e989bf>`);
        if (displayResult.value.imageUrl) {
          _push(`<img${ssrRenderAttr("src", displayResult.value.imageUrl)} alt="Generated" class="result-image" data-v-f7e989bf>`);
        } else {
          _push(`<div class="image-placeholder" data-v-f7e989bf><i class="fas fa-spinner fa-spin" data-v-f7e989bf></i><p data-v-f7e989bf>Generating...</p></div>`);
        }
        if (displayResult.value.imageUrl) {
          _push(`<div class="image-actions" data-v-f7e989bf><button class="action-btn" data-v-f7e989bf><i class="fas fa-download" data-v-f7e989bf></i> Download</button></div>`);
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
const Imagen4Tool = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f7e989bf"]]);
export {
  Imagen4Tool as I
};
//# sourceMappingURL=Imagen4Tool-rhhRnj8I.js.map
