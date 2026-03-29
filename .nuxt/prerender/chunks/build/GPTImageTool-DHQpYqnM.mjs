import { computed, ref, watch, reactive, mergeProps, useSSRContext } from 'file://C:/project/fuseaitools-web/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent, ssrRenderStyle, ssrRenderList } from 'file://C:/project/fuseaitools-web/node_modules/vue/server-renderer/index.mjs';
import { p as publicAssetsURL } from '../_/renderer.mjs';
import { useRouter, useRoute } from 'file://C:/project/fuseaitools-web/node_modules/vue-router/dist/vue-router.node.mjs';
import { U as UploadImage } from './UploadImage-D6DL1USQ.mjs';
import { u as useToast } from './useToast-CATlmXE8.mjs';
import { u as useApi } from './useApi-1a9EtG7k.mjs';
import { u as useAuth } from './useAuth-BT_C6798.mjs';
import { u as useRecordPolling } from './useRecordPolling-QI_mIuwF.mjs';
import { u as useModelPrice } from './useModelPrice-DCrt0_k3.mjs';
import { u as useBatchUploadUrl } from './useBatchUploadUrl-_AVZ_-oO.mjs';
import { _ as _export_sfc } from './server.mjs';

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
    async function loadDetailByRecordId(recordId) {
      if (!recordId || routeRecordId.value !== recordId) return;
      detailData.value = null;
      try {
        let data = await fetchRecordDetailOnce(recordId);
        if (routeRecordId.value !== recordId) return;
        detailData.value = data || null;
        if (data != null && Number(data.status) === 1) {
          const res = await pollRecordByStatus(recordId, { getIsCancelled: () => routeRecordId.value !== recordId });
          if (routeRecordId.value === recordId) detailData.value = res;
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
      var _a;
      const rate = Number((_a = discount == null ? void 0 : discount.value) != null ? _a : 1);
      if (Number.isNaN(rate) || rate <= 0 || rate === 1) return "";
      const percent = (rate * 100).toFixed(0);
      return ` \xB7 ${percent}%`;
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
    const uploadFilesToUrls = async (files) => {
      var _a, _b, _c;
      if (!files || (Array.isArray(files) ? files.length === 0 : !files)) return [];
      const list = Array.isArray(files) ? files : [files];
      const formDataUpload = new FormData();
      list.forEach((f) => formDataUpload.append("file", f));
      const headers = { Accept: "application/json" };
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
      var _a, _b, _c, _d;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "gpt-image-tool" }, _attrs))} data-v-c2d3e42b><div class="tool-header" data-v-c2d3e42b><div class="tool-avatar" data-v-c2d3e42b><img${ssrRenderAttr("src", _imports_0)} alt="GPT Image" data-v-c2d3e42b></div><div class="tool-details" data-v-c2d3e42b><h3 data-v-c2d3e42b>GPT Image</h3><p class="tool-description" data-v-c2d3e42b>GPT Image is OpenAI&#39;s flagship image generation model for high-quality image creation and precise image editing, with strong instruction following and improved text rendering.</p></div></div><div class="mode-tabs" data-v-c2d3e42b><div class="${ssrRenderClass([{ active: mode.value === "text-to-image" }, "mode-tab"])}" data-v-c2d3e42b><i class="fas fa-keyboard" data-v-c2d3e42b></i><span data-v-c2d3e42b>text-to-image</span></div><div class="${ssrRenderClass([{ active: mode.value === "image-to-image" }, "mode-tab"])}" data-v-c2d3e42b><i class="fas fa-image" data-v-c2d3e42b></i><span data-v-c2d3e42b>image-to-image</span></div></div><div class="main-content" data-v-c2d3e42b><div class="config-panel" data-v-c2d3e42b><div class="config-header" data-v-c2d3e42b><h4 data-v-c2d3e42b>${ssrInterpolate(mode.value === "text-to-image" ? "Text to Image" : "Image to Image")}</h4></div><form class="config-form" data-v-c2d3e42b><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-c2d3e42b>`);
      if (mode.value === "image-to-image") {
        _push(`<div class="form-group" data-v-c2d3e42b><label data-v-c2d3e42b>Reference Image *</label>`);
        if (isUploadingImage.value) {
          _push(`<span class="form-hint" data-v-c2d3e42b><i class="fas fa-spinner fa-spin" data-v-c2d3e42b></i> Uploading...</span>`);
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
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-group" data-v-c2d3e42b><label data-v-c2d3e42b>Prompt *</label><textarea rows="4" maxlength="3000"${ssrRenderAttr("placeholder", mode.value === "text-to-image" ? "Describe the image you want to generate..." : "Describe the edit you want (e.g. change clothing, style)...")} required data-v-c2d3e42b>${ssrInterpolate(form.prompt)}</textarea><div class="char-count" data-v-c2d3e42b>${ssrInterpolate(form.prompt.length)}/3000</div></div><div class="form-group" data-v-c2d3e42b><label data-v-c2d3e42b>Aspect Ratio *</label><div class="tab-group" data-v-c2d3e42b><button type="button" class="${ssrRenderClass([{ active: form.aspect_ratio === "1:1" }, "tab-option"])}" data-v-c2d3e42b> 1:1 </button><button type="button" class="${ssrRenderClass([{ active: form.aspect_ratio === "2:3" }, "tab-option"])}" data-v-c2d3e42b> 2:3 </button><button type="button" class="${ssrRenderClass([{ active: form.aspect_ratio === "3:2" }, "tab-option"])}" data-v-c2d3e42b> 3:2 </button></div></div><div class="form-group" data-v-c2d3e42b><label data-v-c2d3e42b>Quality *</label><div class="tab-group" data-v-c2d3e42b><button type="button" class="${ssrRenderClass([{ active: form.quality === "medium" }, "tab-option"])}" data-v-c2d3e42b> medium </button><button type="button" class="${ssrRenderClass([{ active: form.quality === "high" }, "tab-option"])}" data-v-c2d3e42b> high </button></div><div class="form-help" data-v-c2d3e42b><span data-v-c2d3e42b>medium = balanced; high = slower, more detail.</span>`);
      if (currentCredits.value !== null) {
        _push(`<span style="${ssrRenderStyle({ "margin-left": "8px", "font-weight": "500" })}" data-v-c2d3e42b> \xB7 ${ssrInterpolate(currentCredits.value)} credits`);
        if (discountText.value) {
          _push(`<span data-v-c2d3e42b>${ssrInterpolate(discountText.value)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(` / job </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="form-actions" data-v-c2d3e42b><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(!canSubmit.value || isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-c2d3e42b>`);
      if (isGenerating.value) {
        _push(`<i class="fas fa-spinner fa-spin" data-v-c2d3e42b></i>`);
      } else {
        _push(`<i class="fas fa-magic" data-v-c2d3e42b></i>`);
      }
      if (isGenerating.value) {
        _push(`<span data-v-c2d3e42b>Generating...</span>`);
      } else {
        _push(`<span data-v-c2d3e42b> Generate `);
        if (currentCredits.value !== null) {
          _push(`<span data-v-c2d3e42b>\xB7 ${ssrInterpolate(currentCredits.value)} credits`);
          if (discountText.value) {
            _push(`<span data-v-c2d3e42b>${ssrInterpolate(discountText.value)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span>`);
      }
      _push(`</button></div></fieldset></form></div><div class="result-panel" data-v-c2d3e42b><div class="result-header" data-v-c2d3e42b><h4 data-v-c2d3e42b>Result</h4>`);
      if (!isDetailView.value && results.value.length > 0) {
        _push(`<button type="button" class="btn-secondary" data-v-c2d3e42b><i class="fas fa-trash" data-v-c2d3e42b></i> Clear </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="result-container" data-v-c2d3e42b>`);
      if (isDetailView.value) {
        _push(`<!--[-->`);
        if (((_a = detailData.value) == null ? void 0 : _a.status) === 3) {
          _push(`<div class="detail-failure-state" data-v-c2d3e42b><i class="fas fa-exclamation-circle" data-v-c2d3e42b></i><p data-v-c2d3e42b>Generation failed.</p></div>`);
        } else if (!detailData.value || detailData.value.status === 1) {
          _push(`<div class="detail-loading-state" data-v-c2d3e42b><i class="fas fa-spinner fa-spin" data-v-c2d3e42b></i><p data-v-c2d3e42b>Generating...</p></div>`);
        } else if (((_b = detailData.value) == null ? void 0 : _b.status) === 2 && ((_d = (_c = detailData.value) == null ? void 0 : _c.outputUrls) == null ? void 0 : _d.length)) {
          _push(`<!--[-->`);
          ssrRenderList(detailData.value.outputUrls, (url, idx) => {
            _push(`<div class="result-item" data-v-c2d3e42b><img${ssrRenderAttr("src", typeof url === "string" ? url : url == null ? void 0 : url.url)}${ssrRenderAttr("alt", "Output " + (idx + 1))} class="result-image" loading="lazy" data-v-c2d3e42b></div>`);
          });
          _push(`<!--]-->`);
        } else {
          _push(`<div class="empty-state" data-v-c2d3e42b><i class="fas fa-image empty-icon" data-v-c2d3e42b></i><p data-v-c2d3e42b>No output yet.</p></div>`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!--[-->`);
        if (results.value.length > 0) {
          _push(`<!--[-->`);
          ssrRenderList(results.value, (item, idx) => {
            _push(`<div class="result-item" data-v-c2d3e42b>`);
            if (item.url) {
              _push(`<img${ssrRenderAttr("src", item.url)}${ssrRenderAttr("alt", "Output " + (idx + 1))} class="result-image" loading="lazy" data-v-c2d3e42b>`);
            } else {
              _push(`<pre class="payload-json" data-v-c2d3e42b>${ssrInterpolate(typeof item === "object" ? JSON.stringify(item, null, 2) : item)}</pre>`);
            }
            _push(`</div>`);
          });
          _push(`<!--]-->`);
        } else {
          _push(`<div class="empty-state" data-v-c2d3e42b><i class="fas fa-image empty-icon" data-v-c2d3e42b></i><p data-v-c2d3e42b>Configure and click Generate.</p></div>`);
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
const GPTImageTool = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c2d3e42b"]]);

export { GPTImageTool as G };
//# sourceMappingURL=GPTImageTool-DHQpYqnM.mjs.map
