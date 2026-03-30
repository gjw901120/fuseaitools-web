import { computed, ref, watch, reactive, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { publicAssetsURL } from "#internal/nuxt/paths";
import { useRouter, useRoute } from "vue-router";
import { U as UploadImage } from "./UploadImage-D6DL1USQ.js";
import { u as useToast } from "./useToast-CATlmXE8.js";
import { u as useApi } from "./useApi-1a9EtG7k.js";
import { u as useAuth } from "./useAuth-BT_C6798.js";
import { u as useRecordPolling } from "./useRecordPolling-QI_mIuwF.js";
import { u as useModelPrice } from "./useModelPrice-DCrt0_k3.js";
import { u as useBatchUploadUrl } from "./useBatchUploadUrl-_AVZ_-oO.js";
import { _ as _export_sfc } from "../server.mjs";
const _imports_0 = publicAssetsURL("/tools-logo/GPTImage.png");
const _sfc_main = {
  __name: "GPTImageTool",
  __ssrInlineRender: true,
  setup(__props) {
    const { showError } = useToast();
    useApi();
    useAuth();
    const batchUploadUrl = useBatchUploadUrl();
    useRouter();
    const route = useRoute();
    const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling();
    const { discount } = useModelPrice();
    const routeRecordId = computed(() => route.query["record-id"] || "");
    const isDetailView = computed(() => !!routeRecordId.value);
    const detailData = ref(null);
    const detailImageUrls = computed(() => {
      const d = detailData.value;
      if (!d || Number(d.status) !== 2) return [];
      const single = d.outputUrl || d.imageUrl;
      if (single) {
        const u = typeof single === "string" ? single : (single == null ? void 0 : single.url) || "";
        return u ? [u] : [];
      }
      const ou = d.outputUrls;
      if (!Array.isArray(ou)) return [];
      return ou.map((x) => typeof x === "string" ? x : (x == null ? void 0 : x.url) || (x == null ? void 0 : x.imageUrl) || "").filter(Boolean);
    });
    function fillFormFromOriginalData(o) {
      if (!o || typeof o !== "object") return;
      if (o.prompt != null) form.prompt = String(o.prompt);
      if (o.aspectRatio) form.aspect_ratio = String(o.aspectRatio);
      if (o.aspect_ratio) form.aspect_ratio = String(o.aspect_ratio);
      if (o.quality) form.quality = String(o.quality);
      if (Array.isArray(o.inputUrls)) form.input_urls = [...o.inputUrls];
      else if (Array.isArray(o.input_urls)) form.input_urls = [...o.input_urls];
    }
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
        console.error("GPT Image load record detail failed:", e);
      }
    }
    watch(() => route.query["record-id"], (recordId) => {
      if (recordId) loadDetailByRecordId(recordId);
      else detailData.value = null;
    }, { immediate: true });
    const modeTabToPath = {
      "text-to-image": "/home/gpt-image/text-to-image",
      "image-to-image": "/home/gpt-image/image-to-image"
    };
    const pathToMode = {};
    Object.keys(modeTabToPath).forEach((k) => {
      pathToMode[modeTabToPath[k]] = k;
    });
    const mode = ref("text-to-image");
    watch(() => route.path, (path) => {
      const m = pathToMode[path];
      if (m && mode.value !== m) mode.value = m;
    }, { immediate: true });
    const form = reactive({
      prompt: "",
      aspect_ratio: "1:1",
      quality: "medium",
      input_urls: []
    });
    const discountText = computed(() => {
      const rate = Number((discount == null ? void 0 : discount.value) ?? 1);
      if (Number.isNaN(rate) || rate <= 0 || rate === 1) return "";
      const percent = (rate * 100).toFixed(0);
      return ` · ${percent}%`;
    });
    const modelPricing = reactive({
      "gpt-image-1.5-image-to-image": {
        type: "RULE",
        rules: [
          { size: "medium", credits: 12 },
          { size: "high", credits: 36 }
        ]
      },
      "gpt-image-1.5-text-to-image": {
        type: "RULE",
        rules: [
          { size: "medium", credits: 6 },
          { size: "high", credits: 36 }
        ]
      }
    });
    const currentModelKey = computed(
      () => mode.value === "text-to-image" ? "gpt-image-1.5-text-to-image" : "gpt-image-1.5-image-to-image"
    );
    const currentCredits = computed(() => {
      const key = currentModelKey.value;
      const cfg = modelPricing[key];
      if (!cfg || !Array.isArray(cfg.rules)) return null;
      const rule = cfg.rules.find((r) => r.size === form.quality);
      return rule ? rule.credits : null;
    });
    const imageUploadRef = ref(null);
    const isUploadingImage = ref(false);
    const isGenerating = ref(false);
    const results = ref([]);
    const getAuthToken = () => {
      return null;
    };
    const uploadFilesToUrls = async (files) => {
      var _a, _b, _c;
      if (!files || (Array.isArray(files) ? files.length === 0 : !files)) return [];
      const list = Array.isArray(files) ? files : [files];
      const formDataUpload = new FormData();
      list.forEach((f) => formDataUpload.append("file", f));
      const headers = { Accept: "application/json" };
      const authToken = getAuthToken();
      if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
      const response = await fetch(batchUploadUrl, {
        method: "POST",
        headers,
        body: formDataUpload,
        credentials: "include"
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const msg = typeof (errorData == null ? void 0 : errorData.errorMessage) === "string" && ((_a = errorData.errorMessage) == null ? void 0 : _a.trim()) ? errorData.errorMessage.trim() : typeof (errorData == null ? void 0 : errorData.message) === "string" && ((_b = errorData.message) == null ? void 0 : _b.trim()) ? errorData.message.trim() : (errorData == null ? void 0 : errorData.userTip) || (errorData == null ? void 0 : errorData.error) || (errorData == null ? void 0 : errorData.message) || "Upload failed";
        throw new Error(msg);
      }
      const data = await response.json();
      const urls = ((_c = data == null ? void 0 : data.data) == null ? void 0 : _c.urls) || (data == null ? void 0 : data.fileUrls) || (Array.isArray(data == null ? void 0 : data.data) ? data.data : []);
      if (!Array.isArray(urls)) throw new Error("Invalid response: file URLs not found");
      return urls;
    };
    const handleImageUpdate = async (files) => {
      var _a, _b;
      if (!files || Array.isArray(files) && files.length === 0) {
        form.input_urls = [];
        return;
      }
      const list = Array.isArray(files) ? files : [files];
      isUploadingImage.value = true;
      try {
        form.input_urls = await uploadFilesToUrls(list);
      } catch (e) {
        showError(e.message || "Failed to upload image");
        form.input_urls = [];
        (_b = (_a = imageUploadRef.value) == null ? void 0 : _a.clearFiles) == null ? void 0 : _b.call(_a);
      } finally {
        isUploadingImage.value = false;
      }
    };
    const canSubmit = computed(() => {
      if (!form.prompt || !form.prompt.trim()) return false;
      if (mode.value === "image-to-image") {
        return Array.isArray(form.input_urls) && form.input_urls.length > 0;
      }
      return true;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "gpt-image-tool" }, _attrs))} data-v-821fabec><div class="tool-header" data-v-821fabec><div class="tool-avatar" data-v-821fabec><img${ssrRenderAttr("src", _imports_0)} alt="GPT Image" data-v-821fabec></div><div class="tool-details" data-v-821fabec><h3 data-v-821fabec>GPT Image</h3><p class="tool-description" data-v-821fabec>GPT Image is OpenAI&#39;s flagship image generation model for high-quality image creation and precise image editing, with strong instruction following and improved text rendering.</p></div></div><div class="mode-tabs" data-v-821fabec><div class="${ssrRenderClass([{ active: mode.value === "text-to-image" }, "mode-tab"])}" data-v-821fabec><i class="fas fa-keyboard" data-v-821fabec></i><span data-v-821fabec>text-to-image</span></div><div class="${ssrRenderClass([{ active: mode.value === "image-to-image" }, "mode-tab"])}" data-v-821fabec><i class="fas fa-image" data-v-821fabec></i><span data-v-821fabec>image-to-image</span></div></div><div class="main-content" data-v-821fabec><div class="config-panel" data-v-821fabec><div class="config-header" data-v-821fabec><h4 data-v-821fabec>${ssrInterpolate(mode.value === "text-to-image" ? "Text to Image" : "Image to Image")}</h4></div><form class="config-form" data-v-821fabec><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-821fabec>`);
      if (mode.value === "image-to-image") {
        _push(`<div class="form-group" data-v-821fabec><label data-v-821fabec>Reference Image *</label>`);
        if (isUploadingImage.value) {
          _push(`<span class="form-hint" data-v-821fabec><i class="fas fa-spinner fa-spin" data-v-821fabec></i> Uploading...</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(UploadImage, {
          ref_key: "imageUploadRef",
          ref: imageUploadRef,
          "input-id": "gpt-image-upload",
          label: "",
          "upload-icon": "fas fa-cloud-upload-alt",
          "upload-text": "Click to upload image",
          "upload-hint": "JPG, PNG, WEBP. Max 10MB.",
          "theme-color": "#3b82f6",
          "max-files": 1,
          "max-file-size": 10 * 1024 * 1024,
          accept: "image/jpeg,image/png,image/webp",
          multiple: false,
          "onUpdate:files": handleImageUpdate
        }, null, _parent));
        if (isDetailView.value && mode.value === "image-to-image" && ((_a = form.input_urls) == null ? void 0 : _a.length)) {
          _push(`<div class="detail-ref-urls" data-v-821fabec><label data-v-821fabec>Reference (this task)</label><div class="detail-ref-urls-links" data-v-821fabec><!--[-->`);
          ssrRenderList(form.input_urls, (u, idx) => {
            _push(`<a${ssrRenderAttr("href", u)} target="_blank" rel="noopener noreferrer" class="detail-ref-link" data-v-821fabec>Image ${ssrInterpolate(idx + 1)}</a>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-group" data-v-821fabec><label data-v-821fabec>Prompt *</label><textarea rows="4" maxlength="3000"${ssrRenderAttr("placeholder", mode.value === "text-to-image" ? "Describe the image you want to generate..." : "Describe the edit you want (e.g. change clothing, style)...")} required data-v-821fabec>${ssrInterpolate(form.prompt)}</textarea><div class="char-count" data-v-821fabec>${ssrInterpolate(form.prompt.length)}/3000</div></div><div class="form-group" data-v-821fabec><label data-v-821fabec>Aspect Ratio *</label><div class="tab-group" data-v-821fabec><button type="button" class="${ssrRenderClass([{ active: form.aspect_ratio === "1:1" }, "tab-option"])}" data-v-821fabec> 1:1 </button><button type="button" class="${ssrRenderClass([{ active: form.aspect_ratio === "2:3" }, "tab-option"])}" data-v-821fabec> 2:3 </button><button type="button" class="${ssrRenderClass([{ active: form.aspect_ratio === "3:2" }, "tab-option"])}" data-v-821fabec> 3:2 </button></div></div><div class="form-group" data-v-821fabec><label data-v-821fabec>Quality *</label><div class="tab-group" data-v-821fabec><button type="button" class="${ssrRenderClass([{ active: form.quality === "medium" }, "tab-option"])}" data-v-821fabec> medium </button><button type="button" class="${ssrRenderClass([{ active: form.quality === "high" }, "tab-option"])}" data-v-821fabec> high </button></div><div class="form-help" data-v-821fabec><span data-v-821fabec>medium = balanced; high = slower, more detail.</span>`);
      if (currentCredits.value !== null) {
        _push(`<span style="${ssrRenderStyle({ "margin-left": "8px", "font-weight": "500" })}" data-v-821fabec> · ${ssrInterpolate(currentCredits.value)} credits`);
        if (discountText.value) {
          _push(`<span data-v-821fabec>${ssrInterpolate(discountText.value)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(` / job </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="form-actions" data-v-821fabec><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(!canSubmit.value || isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-821fabec>`);
      if (isGenerating.value) {
        _push(`<i class="fas fa-spinner fa-spin" data-v-821fabec></i>`);
      } else {
        _push(`<i class="fas fa-magic" data-v-821fabec></i>`);
      }
      if (isGenerating.value) {
        _push(`<span data-v-821fabec>Generating...</span>`);
      } else {
        _push(`<span data-v-821fabec> Generate `);
        if (currentCredits.value !== null) {
          _push(`<span data-v-821fabec>· ${ssrInterpolate(currentCredits.value)} credits`);
          if (discountText.value) {
            _push(`<span data-v-821fabec>${ssrInterpolate(discountText.value)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span>`);
      }
      _push(`</button></div></fieldset></form></div><div class="result-panel" data-v-821fabec><div class="result-header" data-v-821fabec><h4 data-v-821fabec>Result</h4>`);
      if (!isDetailView.value && results.value.length > 0) {
        _push(`<button type="button" class="btn-secondary" data-v-821fabec><i class="fas fa-trash" data-v-821fabec></i> Clear </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="result-container" data-v-821fabec>`);
      if (isDetailView.value) {
        _push(`<!--[-->`);
        if (Number((_b = detailData.value) == null ? void 0 : _b.status) === 3) {
          _push(`<div class="detail-failure-state" data-v-821fabec><i class="fas fa-exclamation-circle" data-v-821fabec></i><p data-v-821fabec>Generation failed.</p></div>`);
        } else if (!detailData.value || [0, 1].includes(Number(detailData.value.status))) {
          _push(`<div class="detail-loading-state" data-v-821fabec><i class="fas fa-spinner fa-spin" data-v-821fabec></i><p data-v-821fabec>Generating...</p></div>`);
        } else if (Number((_c = detailData.value) == null ? void 0 : _c.status) === 2 && detailImageUrls.value.length) {
          _push(`<!--[-->`);
          ssrRenderList(detailImageUrls.value, (url, idx) => {
            _push(`<div class="result-item" data-v-821fabec><img${ssrRenderAttr("src", url)}${ssrRenderAttr("alt", "Output " + (idx + 1))} class="result-image" loading="lazy" data-v-821fabec></div>`);
          });
          _push(`<!--]-->`);
        } else {
          _push(`<div class="empty-state" data-v-821fabec><i class="fas fa-image empty-icon" data-v-821fabec></i><p data-v-821fabec>No output yet.</p></div>`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!--[-->`);
        if (results.value.length > 0) {
          _push(`<!--[-->`);
          ssrRenderList(results.value, (item, idx) => {
            _push(`<div class="result-item" data-v-821fabec>`);
            if (item.url) {
              _push(`<img${ssrRenderAttr("src", item.url)}${ssrRenderAttr("alt", "Output " + (idx + 1))} class="result-image" loading="lazy" data-v-821fabec>`);
            } else {
              _push(`<pre class="payload-json" data-v-821fabec>${ssrInterpolate(typeof item === "object" ? JSON.stringify(item, null, 2) : item)}</pre>`);
            }
            _push(`</div>`);
          });
          _push(`<!--]-->`);
        } else {
          _push(`<div class="empty-state" data-v-821fabec><i class="fas fa-image empty-icon" data-v-821fabec></i><p data-v-821fabec>Configure and click Generate.</p></div>`);
        }
        _push(`<!--]-->`);
      }
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/GPTImageTool.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const GPTImageTool = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-821fabec"]]);
export {
  GPTImageTool as G
};
//# sourceMappingURL=GPTImageTool-Kipx2jty.js.map
