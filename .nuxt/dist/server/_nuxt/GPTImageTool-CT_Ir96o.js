import { ref, reactive, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { publicAssetsURL } from "#internal/nuxt/paths";
import { U as UploadImage } from "./UploadImage-CdWm1sTQ.js";
import { u as useToast } from "./useToast-CATlmXE8.js";
import { u as useAuth } from "./useAuth-BT_C6798.js";
import { u as useBatchUploadUrl } from "./useBatchUploadUrl-Wq7pvxpv.js";
import { _ as _export_sfc } from "../server.mjs";
const _imports_0 = publicAssetsURL("/tools-logo/GPTImage.png");
const _sfc_main = {
  __name: "GPTImageTool",
  __ssrInlineRender: true,
  setup(__props) {
    const { showError } = useToast();
    useAuth();
    const batchUploadUrl = useBatchUploadUrl();
    const mode = ref("text-to-image");
    const form = reactive({
      prompt: "",
      aspect_ratio: "1:1",
      quality: "medium",
      input_urls: []
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "gpt-image-tool" }, _attrs))} data-v-3681d0be><div class="tool-header" data-v-3681d0be><div class="tool-avatar" data-v-3681d0be><img${ssrRenderAttr("src", _imports_0)} alt="GPT Image" data-v-3681d0be></div><div class="tool-details" data-v-3681d0be><h3 data-v-3681d0be>GPT Image</h3><p class="tool-description" data-v-3681d0be>GPT Image is OpenAI&#39;s flagship image generation model for high-quality image creation and precise image editing, with strong instruction following and improved text rendering.</p></div></div><div class="mode-tabs" data-v-3681d0be><div class="${ssrRenderClass([{ active: mode.value === "text-to-image" }, "mode-tab"])}" data-v-3681d0be><i class="fas fa-keyboard" data-v-3681d0be></i><span data-v-3681d0be>text-to-image</span></div><div class="${ssrRenderClass([{ active: mode.value === "image-to-image" }, "mode-tab"])}" data-v-3681d0be><i class="fas fa-image" data-v-3681d0be></i><span data-v-3681d0be>image-to-image</span></div></div><div class="main-content" data-v-3681d0be><div class="config-panel" data-v-3681d0be><div class="config-header" data-v-3681d0be><h4 data-v-3681d0be>${ssrInterpolate(mode.value === "text-to-image" ? "Text to Image" : "Image to Image")}</h4></div><form class="config-form" data-v-3681d0be><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value) ? " disabled" : ""} data-v-3681d0be>`);
      if (mode.value === "image-to-image") {
        _push(`<div class="form-group" data-v-3681d0be><label data-v-3681d0be>Reference Image *</label>`);
        if (isUploadingImage.value) {
          _push(`<span class="form-hint" data-v-3681d0be><i class="fas fa-spinner fa-spin" data-v-3681d0be></i> Uploading...</span>`);
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
      _push(`<div class="form-group" data-v-3681d0be><label data-v-3681d0be>Prompt *</label><textarea rows="4" maxlength="3000"${ssrRenderAttr("placeholder", mode.value === "text-to-image" ? "Describe the image you want to generate..." : "Describe the edit you want (e.g. change clothing, style)...")} required data-v-3681d0be>${ssrInterpolate(form.prompt)}</textarea><div class="char-count" data-v-3681d0be>${ssrInterpolate(form.prompt.length)}/3000</div></div><div class="form-group" data-v-3681d0be><label data-v-3681d0be>Aspect Ratio *</label><div class="tab-group" data-v-3681d0be><button type="button" class="${ssrRenderClass([{ active: form.aspect_ratio === "1:1" }, "tab-option"])}" data-v-3681d0be> 1:1 </button><button type="button" class="${ssrRenderClass([{ active: form.aspect_ratio === "2:3" }, "tab-option"])}" data-v-3681d0be> 2:3 </button><button type="button" class="${ssrRenderClass([{ active: form.aspect_ratio === "3:2" }, "tab-option"])}" data-v-3681d0be> 3:2 </button></div></div><div class="form-group" data-v-3681d0be><label data-v-3681d0be>Quality *</label><div class="tab-group" data-v-3681d0be><button type="button" class="${ssrRenderClass([{ active: form.quality === "medium" }, "tab-option"])}" data-v-3681d0be> medium </button><button type="button" class="${ssrRenderClass([{ active: form.quality === "high" }, "tab-option"])}" data-v-3681d0be> high </button></div><div class="form-help" data-v-3681d0be>medium = balanced; high = slower, more detail.</div></div><div class="form-actions" data-v-3681d0be><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(!canSubmit.value || isGenerating.value) ? " disabled" : ""} data-v-3681d0be>`);
      if (isGenerating.value) {
        _push(`<i class="fas fa-spinner fa-spin" data-v-3681d0be></i>`);
      } else {
        _push(`<i class="fas fa-magic" data-v-3681d0be></i>`);
      }
      _push(` ${ssrInterpolate(isGenerating.value ? "Generating..." : "Generate")}</button></div></fieldset></form></div><div class="result-panel" data-v-3681d0be><div class="result-header" data-v-3681d0be><h4 data-v-3681d0be>Result</h4>`);
      if (results.value.length > 0) {
        _push(`<button type="button" class="btn-secondary" data-v-3681d0be><i class="fas fa-trash" data-v-3681d0be></i> Clear </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="result-container" data-v-3681d0be>`);
      if (results.value.length > 0) {
        _push(`<!--[-->`);
        ssrRenderList(results.value, (item, idx) => {
          _push(`<div class="result-item" data-v-3681d0be>`);
          if (item.url) {
            _push(`<img${ssrRenderAttr("src", item.url)}${ssrRenderAttr("alt", "Output " + (idx + 1))} class="result-image" loading="lazy" data-v-3681d0be>`);
          } else {
            _push(`<pre class="payload-json" data-v-3681d0be>${ssrInterpolate(typeof item === "object" ? JSON.stringify(item, null, 2) : item)}</pre>`);
          }
          _push(`</div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<div class="empty-state" data-v-3681d0be><i class="fas fa-image empty-icon" data-v-3681d0be></i><p data-v-3681d0be>Configure and click Generate.</p></div>`);
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
const GPTImageTool = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3681d0be"]]);
export {
  GPTImageTool as G
};
//# sourceMappingURL=GPTImageTool-CT_Ir96o.js.map
