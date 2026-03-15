import { ref, reactive, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent, ssrLooseContain } from "vue/server-renderer";
import { publicAssetsURL } from "#internal/nuxt/paths";
import { U as UploadImage } from "./UploadImage-CdWm1sTQ.js";
import { u as useToast } from "./useToast-CATlmXE8.js";
import { u as useAuth } from "./useAuth-BT_C6798.js";
import { u as useBatchUploadUrl } from "./useBatchUploadUrl-Wq7pvxpv.js";
import { _ as _export_sfc } from "../server.mjs";
const _imports_0 = publicAssetsURL("/tools-logo/Ideogram.png");
const _sfc_main = {
  __name: "IdeogramTool",
  __ssrInlineRender: true,
  setup(__props) {
    const { showError } = useToast();
    useAuth();
    const batchUploadUrl = useBatchUploadUrl();
    const modeList = [
      { id: "v3-text-to-image", icon: "fas fa-keyboard" },
      { id: "v3-edit", icon: "fas fa-paint-brush" },
      { id: "v3-remix", icon: "fas fa-sync-alt" },
      { id: "v3-reframe", icon: "fas fa-crop-alt" },
      { id: "character", icon: "fas fa-user" },
      { id: "character-edit", icon: "fas fa-user-edit" },
      { id: "character-remix", icon: "fas fa-users" }
    ];
    const mode = ref("v3-text-to-image");
    const form = reactive({
      prompt: "",
      rendering_speed: "BALANCED",
      style: "AUTO",
      expand_prompt: true,
      image_size: "square_hd",
      seed: void 0,
      negative_prompt: "",
      image_url: "",
      mask_url: "",
      reference_image_urls: [],
      num_images: "1",
      strength: 0.8
    });
    const imageUploadRef = ref(null);
    const maskUploadRef = ref(null);
    const refsUploadRef = ref(null);
    const isUploadingImage = ref(false);
    const isUploadingMask = ref(false);
    const isUploadingRefs = ref(false);
    const isGenerating = ref(false);
    const results = ref([]);
    function needsPrompt(m) {
      return ["v3-text-to-image", "v3-edit", "v3-remix", "character", "character-edit", "character-remix"].includes(m);
    }
    function needsImageUrl(m) {
      return ["v3-edit", "v3-remix", "v3-reframe", "character-edit", "character-remix"].includes(m);
    }
    function needsImageSize(m) {
      return ["v3-text-to-image", "v3-remix", "v3-reframe", "character", "character-remix"].includes(m);
    }
    function needsNumImages(m) {
      return ["v3-remix", "v3-reframe", "character", "character-edit", "character-remix"].includes(m);
    }
    function needsReferenceImages(m) {
      return ["character", "character-edit", "character-remix"].includes(m);
    }
    function needsNegativePrompt(m) {
      return ["v3-text-to-image", "v3-remix", "character", "character-remix"].includes(m);
    }
    function isCharacterMode(m) {
      return ["character", "character-edit", "character-remix"].includes(m);
    }
    const getAuthToken = () => {
      return null;
    };
    const uploadFilesToUrls = async (files) => {
      var _a;
      if (!files || (Array.isArray(files) ? files.length === 0 : !files)) return [];
      const list = Array.isArray(files) ? files : [files];
      const fd = new FormData();
      list.forEach((f) => fd.append("file", f));
      const headers = { Accept: "application/json" };
      const auth = getAuthToken();
      if (auth) headers["Authorization"] = `Bearer ${auth}`;
      const res = await fetch(batchUploadUrl, { method: "POST", headers, body: fd, credentials: "include" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg = (err == null ? void 0 : err.errorMessage) || (err == null ? void 0 : err.message) || (err == null ? void 0 : err.userTip) || (err == null ? void 0 : err.error) || "Upload failed";
        throw new Error(typeof msg === "string" ? msg : "Upload failed");
      }
      const data = await res.json();
      const urls = ((_a = data == null ? void 0 : data.data) == null ? void 0 : _a.urls) || (data == null ? void 0 : data.fileUrls) || (Array.isArray(data == null ? void 0 : data.data) ? data.data : []);
      if (!Array.isArray(urls)) throw new Error("Invalid response: no URLs");
      return urls;
    };
    const handleImageUpdate = async (files) => {
      var _a, _b;
      if (!files || Array.isArray(files) && files.length === 0) {
        form.image_url = "";
        return;
      }
      isUploadingImage.value = true;
      try {
        const urls = await uploadFilesToUrls(Array.isArray(files) ? files : [files]);
        form.image_url = urls[0] || "";
      } catch (e) {
        showError(e.message || "Upload failed");
        form.image_url = "";
        (_b = (_a = imageUploadRef.value) == null ? void 0 : _a.clearFiles) == null ? void 0 : _b.call(_a);
      } finally {
        isUploadingImage.value = false;
      }
    };
    const handleMaskUpdate = async (files) => {
      var _a, _b;
      if (!files || Array.isArray(files) && files.length === 0) {
        form.mask_url = "";
        return;
      }
      isUploadingMask.value = true;
      try {
        const urls = await uploadFilesToUrls(Array.isArray(files) ? files : [files]);
        form.mask_url = urls[0] || "";
      } catch (e) {
        showError(e.message || "Upload failed");
        form.mask_url = "";
        (_b = (_a = maskUploadRef.value) == null ? void 0 : _a.clearFiles) == null ? void 0 : _b.call(_a);
      } finally {
        isUploadingMask.value = false;
      }
    };
    const handleRefsUpdate = async (files) => {
      var _a, _b;
      if (!files || Array.isArray(files) && files.length === 0) {
        form.reference_image_urls = [];
        return;
      }
      isUploadingRefs.value = true;
      try {
        const urls = await uploadFilesToUrls(Array.isArray(files) ? files : [files]);
        form.reference_image_urls = urls || [];
      } catch (e) {
        showError(e.message || "Upload failed");
        form.reference_image_urls = [];
        (_b = (_a = refsUploadRef.value) == null ? void 0 : _a.clearFiles) == null ? void 0 : _b.call(_a);
      } finally {
        isUploadingRefs.value = false;
      }
    };
    const canSubmit = computed(() => {
      var _a;
      if (mode.value === "v3-reframe") return !!form.image_url;
      if (!((_a = form.prompt) == null ? void 0 : _a.trim()) && needsPrompt(mode.value)) return false;
      if (needsImageUrl(mode.value) && !form.image_url) return false;
      if ((mode.value === "v3-edit" || mode.value === "character-edit") && !form.mask_url) return false;
      if (needsReferenceImages(mode.value) && (!form.reference_image_urls || form.reference_image_urls.length === 0)) return false;
      return true;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ideogram-tool" }, _attrs))} data-v-998bb9fe><div class="tool-header" data-v-998bb9fe><div class="tool-avatar" data-v-998bb9fe><img${ssrRenderAttr("src", _imports_0)} alt="Ideogram" data-v-998bb9fe></div><div class="tool-details" data-v-998bb9fe><h3 data-v-998bb9fe>Ideogram</h3><p class="tool-description" data-v-998bb9fe>Ideogram is image generation model, offering text-to-image, image editing, reframing, and remixing with improved consistency and creative control.</p></div></div><div class="mode-tabs" data-v-998bb9fe><!--[-->`);
      ssrRenderList(modeList, (m) => {
        _push(`<div class="${ssrRenderClass([{ active: mode.value === m.id }, "mode-tab"])}" data-v-998bb9fe><i class="${ssrRenderClass(m.icon)}" data-v-998bb9fe></i><span data-v-998bb9fe>${ssrInterpolate(m.id)}</span></div>`);
      });
      _push(`<!--]--></div><div class="main-content" data-v-998bb9fe><div class="config-panel" data-v-998bb9fe><div class="config-header" data-v-998bb9fe><h4 data-v-998bb9fe>${ssrInterpolate(mode.value)}</h4></div><form class="config-form" data-v-998bb9fe><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value) ? " disabled" : ""} data-v-998bb9fe>`);
      if (mode.value !== "v3-reframe") {
        _push(`<div class="form-group" data-v-998bb9fe><label data-v-998bb9fe>Prompt ${ssrInterpolate(needsPrompt(mode.value) ? "*" : "")}</label><textarea rows="4" maxlength="5000" placeholder="Describe the image or edit..." data-v-998bb9fe>${ssrInterpolate(form.prompt)}</textarea><div class="char-count" data-v-998bb9fe>${ssrInterpolate(form.prompt.length)}/5000</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (needsImageUrl(mode.value)) {
        _push(`<div class="form-group" data-v-998bb9fe><label data-v-998bb9fe>Image URL *</label>`);
        if (isUploadingImage.value) {
          _push(`<span class="form-hint" data-v-998bb9fe><i class="fas fa-spinner fa-spin" data-v-998bb9fe></i> Uploading...</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(UploadImage, {
          ref_key: "imageUploadRef",
          ref: imageUploadRef,
          "input-id": "ideogram-image",
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
      if (mode.value === "v3-edit" || mode.value === "character-edit") {
        _push(`<div class="form-group" data-v-998bb9fe><label data-v-998bb9fe>Mask URL *</label>`);
        if (isUploadingMask.value) {
          _push(`<span class="form-hint" data-v-998bb9fe><i class="fas fa-spinner fa-spin" data-v-998bb9fe></i> Uploading...</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(UploadImage, {
          ref_key: "maskUploadRef",
          ref: maskUploadRef,
          "input-id": "ideogram-mask",
          label: "",
          "upload-icon": "fas fa-mask",
          "upload-text": "Click to upload mask",
          "upload-hint": "Same dimensions as image. JPG, PNG, WEBP. Max 10MB.",
          "theme-color": "#6b7280",
          "max-files": 1,
          "max-file-size": 10 * 1024 * 1024,
          accept: "image/jpeg,image/png,image/webp",
          multiple: false,
          "onUpdate:files": handleMaskUpdate
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (needsReferenceImages(mode.value)) {
        _push(`<div class="form-group" data-v-998bb9fe><label data-v-998bb9fe>Reference image(s) *</label>`);
        if (isUploadingRefs.value) {
          _push(`<span class="form-hint" data-v-998bb9fe><i class="fas fa-spinner fa-spin" data-v-998bb9fe></i> Uploading...</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(UploadImage, {
          ref_key: "refsUploadRef",
          ref: refsUploadRef,
          "input-id": "ideogram-refs",
          label: "",
          "upload-icon": "fas fa-user",
          "upload-text": "Click to upload character reference",
          "upload-hint": "1 image. JPG, PNG, WEBP. Max 10MB.",
          "theme-color": "#3b82f6",
          "max-files": 1,
          "max-file-size": 10 * 1024 * 1024,
          accept: "image/jpeg,image/png,image/webp",
          multiple: false,
          "onUpdate:files": handleRefsUpdate
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-group" data-v-998bb9fe><label data-v-998bb9fe>Rendering speed</label><div class="tab-group" data-v-998bb9fe><button type="button" class="${ssrRenderClass([{ active: form.rendering_speed === "TURBO" }, "tab-option"])}" data-v-998bb9fe>Turbo</button><button type="button" class="${ssrRenderClass([{ active: form.rendering_speed === "BALANCED" }, "tab-option"])}" data-v-998bb9fe>Balanced</button><button type="button" class="${ssrRenderClass([{ active: form.rendering_speed === "QUALITY" }, "tab-option"])}" data-v-998bb9fe>Quality</button></div></div>`);
      if (mode.value !== "character-edit") {
        _push(`<div class="form-group" data-v-998bb9fe><label data-v-998bb9fe>Style</label><div class="tab-group tab-wrap" data-v-998bb9fe>`);
        if (isCharacterMode(mode.value)) {
          _push(`<!--[--><button type="button" class="${ssrRenderClass([{ active: form.style === "AUTO" }, "tab-option"])}" data-v-998bb9fe>AUTO</button><button type="button" class="${ssrRenderClass([{ active: form.style === "REALISTIC" }, "tab-option"])}" data-v-998bb9fe>REALISTIC</button><button type="button" class="${ssrRenderClass([{ active: form.style === "FICTION" }, "tab-option"])}" data-v-998bb9fe>FICTION</button><!--]-->`);
        } else {
          _push(`<!--[--><button type="button" class="${ssrRenderClass([{ active: form.style === "AUTO" }, "tab-option"])}" data-v-998bb9fe>Auto</button><button type="button" class="${ssrRenderClass([{ active: form.style === "GENERAL" }, "tab-option"])}" data-v-998bb9fe>General</button><button type="button" class="${ssrRenderClass([{ active: form.style === "REALISTIC" }, "tab-option"])}" data-v-998bb9fe>Realistic</button><button type="button" class="${ssrRenderClass([{ active: form.style === "DESIGN" }, "tab-option"])}" data-v-998bb9fe>Design</button><!--]-->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (needsImageSize(mode.value)) {
        _push(`<div class="form-group" data-v-998bb9fe><label data-v-998bb9fe>Image size ${ssrInterpolate(mode.value === "v3-reframe" ? "*" : "")}</label><div class="tab-group tab-wrap" data-v-998bb9fe><button type="button" class="${ssrRenderClass([{ active: form.image_size === "square" }, "tab-option"])}" data-v-998bb9fe>Square</button><button type="button" class="${ssrRenderClass([{ active: form.image_size === "square_hd" }, "tab-option"])}" data-v-998bb9fe>Square HD</button><button type="button" class="${ssrRenderClass([{ active: form.image_size === "portrait_4_3" }, "tab-option"])}" data-v-998bb9fe>Portrait 3:4</button><button type="button" class="${ssrRenderClass([{ active: form.image_size === "portrait_16_9" }, "tab-option"])}" data-v-998bb9fe>Portrait 9:16</button><button type="button" class="${ssrRenderClass([{ active: form.image_size === "landscape_4_3" }, "tab-option"])}" data-v-998bb9fe>Landscape 4:3</button><button type="button" class="${ssrRenderClass([{ active: form.image_size === "landscape_16_9" }, "tab-option"])}" data-v-998bb9fe>Landscape 16:9</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (needsPrompt(mode.value)) {
        _push(`<div class="form-group" data-v-998bb9fe><label class="checkbox-label" data-v-998bb9fe><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(form.expand_prompt) ? ssrLooseContain(form.expand_prompt, null) : form.expand_prompt) ? " checked" : ""} data-v-998bb9fe><span data-v-998bb9fe>Expand prompt (MagicPrompt)</span></label></div>`);
      } else {
        _push(`<!---->`);
      }
      if (needsNumImages(mode.value)) {
        _push(`<div class="form-group" data-v-998bb9fe><label data-v-998bb9fe>Number of images</label><div class="tab-group" data-v-998bb9fe><button type="button" class="${ssrRenderClass([{ active: form.num_images === "1" }, "tab-option"])}" data-v-998bb9fe>1</button><button type="button" class="${ssrRenderClass([{ active: form.num_images === "2" }, "tab-option"])}" data-v-998bb9fe>2</button><button type="button" class="${ssrRenderClass([{ active: form.num_images === "3" }, "tab-option"])}" data-v-998bb9fe>3</button><button type="button" class="${ssrRenderClass([{ active: form.num_images === "4" }, "tab-option"])}" data-v-998bb9fe>4</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (mode.value === "v3-remix" || mode.value === "character-remix") {
        _push(`<div class="form-group" data-v-998bb9fe><label data-v-998bb9fe>Strength</label><input type="range"${ssrRenderAttr("value", form.strength)} min="0.01" max="1" step="0.01" data-v-998bb9fe> ${ssrInterpolate(form.strength)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (needsNegativePrompt(mode.value)) {
        _push(`<div class="form-group" data-v-998bb9fe><label data-v-998bb9fe>Negative prompt</label><textarea rows="2" maxlength="5000" placeholder="What to exclude from the image" data-v-998bb9fe>${ssrInterpolate(form.negative_prompt)}</textarea></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-group" data-v-998bb9fe><label data-v-998bb9fe>Seed (optional)</label><input type="number"${ssrRenderAttr("value", form.seed)} placeholder="Leave empty for random" data-v-998bb9fe></div><div class="form-actions" data-v-998bb9fe><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(!canSubmit.value || isGenerating.value) ? " disabled" : ""} data-v-998bb9fe>`);
      if (isGenerating.value) {
        _push(`<i class="fas fa-spinner fa-spin" data-v-998bb9fe></i>`);
      } else {
        _push(`<i class="fas fa-magic" data-v-998bb9fe></i>`);
      }
      _push(` ${ssrInterpolate(isGenerating.value ? "Generating..." : "Generate")}</button></div></fieldset></form></div><div class="result-panel" data-v-998bb9fe><div class="result-header" data-v-998bb9fe><h4 data-v-998bb9fe>Result</h4>`);
      if (results.value.length > 0) {
        _push(`<button type="button" class="btn-secondary" data-v-998bb9fe><i class="fas fa-trash" data-v-998bb9fe></i> Clear</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="result-container" data-v-998bb9fe>`);
      if (results.value.length > 0) {
        _push(`<!--[-->`);
        ssrRenderList(results.value, (item, idx) => {
          _push(`<div class="result-item" data-v-998bb9fe>`);
          if (item.url) {
            _push(`<img${ssrRenderAttr("src", item.url)}${ssrRenderAttr("alt", "Output " + (idx + 1))} class="result-image" loading="lazy" data-v-998bb9fe>`);
          } else {
            _push(`<pre class="payload-json" data-v-998bb9fe>${ssrInterpolate(typeof item === "object" ? JSON.stringify(item, null, 2) : item)}</pre>`);
          }
          _push(`</div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<div class="empty-state" data-v-998bb9fe><i class="fas fa-image empty-icon" data-v-998bb9fe></i><p data-v-998bb9fe>Configure and click Generate.</p></div>`);
      }
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/IdeogramTool.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const IdeogramTool = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-998bb9fe"]]);
export {
  IdeogramTool as I
};
//# sourceMappingURL=IdeogramTool-_96Q5GiO.js.map
