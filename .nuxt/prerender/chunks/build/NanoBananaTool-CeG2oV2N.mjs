import { ref, watch, computed, reactive, mergeProps, useSSRContext } from 'file://C:/project/fuseaitools-web/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from 'file://C:/project/fuseaitools-web/node_modules/vue/server-renderer/index.mjs';
import { p as publicAssetsURL } from '../_/renderer.mjs';
import { useRouter, useRoute } from 'file://C:/project/fuseaitools-web/node_modules/vue-router/dist/vue-router.node.mjs';
import { U as UploadImage } from './UploadImage-a1UOMv8U.mjs';
import { u as useAuth } from './useAuth-ComhLj5o.mjs';
import { u as useToast } from './useToast-CATlmXE8.mjs';
import { u as useModelPrice } from './useModelPrice-BZpig2xf.mjs';
import { u as useRecordPolling } from './useRecordPolling-DxMEWIpb.mjs';
import { _ as _export_sfc } from './server.mjs';

const _imports_0 = publicAssetsURL("/tools-logo/NanoBanana.png");
const _sfc_main = {
  __name: "NanoBananaTool",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const route = useRoute();
    useAuth();
    const { showError } = useToast();
    const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling();
    const activeTab = ref("nano-banana");
    const nanoBananaPathToTab = {
      "/home/nano-banana/generate": "nano-banana",
      "/home/nano-banana/edit": "nano-banana-edit",
      "/home/nano-banana/pro-generate": "nano-banana-pro"
    };
    watch(() => route.path, (path) => {
      const tab = nanoBananaPathToTab[path];
      if (tab) activeTab.value = tab;
      else if (path.startsWith("/home/nano-banana")) activeTab.value = "nano-banana";
    }, { immediate: true });
    const functionOptions = ref([
      { id: "nano-banana", name: "Nano Banana", description: "Text to Image", icon: "fas fa-image" },
      { id: "nano-banana-edit", name: "Nano Banana Edit", description: "Image to Image", icon: "fas fa-edit" },
      { id: "nano-banana-pro", name: "Nano Banana Pro", description: "Advanced Image Generation", icon: "fas fa-star" }
    ]);
    const configHeaderTitle = computed(() => {
      if (activeTab.value === "nano-banana") return "Nano Banana Configuration";
      if (activeTab.value === "nano-banana-edit") return "Nano Banana Edit Configuration";
      return "Nano Banana Pro Configuration";
    });
    const INIT_NANO_BANANA_FORM = {
      prompt: "",
      output_format: "png",
      image_size: "1:1"
    };
    const formData = reactive({ ...INIT_NANO_BANANA_FORM });
    const INIT_NANO_BANANA_EDIT_FORM = {
      prompt: "",
      image_urls: [],
      output_format: "png",
      image_size: "1:1"
    };
    const editFormData = reactive({ ...INIT_NANO_BANANA_EDIT_FORM });
    const INIT_NANO_BANANA_PRO_FORM = {
      prompt: "",
      image_input: [],
      aspect_ratio: "1:1",
      resolution: "1K",
      output_format: "png"
    };
    const proFormData = reactive({ ...INIT_NANO_BANANA_PRO_FORM });
    watch(activeTab, (tab) => {
      if (tab === "nano-banana") Object.assign(formData, INIT_NANO_BANANA_FORM);
      else if (tab === "nano-banana-edit") Object.assign(editFormData, INIT_NANO_BANANA_EDIT_FORM);
      else if (tab === "nano-banana-pro") Object.assign(proFormData, INIT_NANO_BANANA_PRO_FORM);
    });
    const aspectRatios = ["1:1", "2:3", "3:2", "3:4", "4:3", "4:5", "5:4", "9:16", "16:9", "21:9", "auto"];
    const resolutions = ["1K", "2K", "4K"];
    const isGenerating = ref(false);
    const isUploadingEdit = ref(false);
    const isUploadingPro = ref(false);
    const generatedImages = ref([]);
    const editImageUploadRef = ref(null);
    const proImageUploadRef = ref(null);
    const routeRecordId = computed(() => route.query["record-id"] || "");
    const isDetailView = computed(() => !!routeRecordId.value);
    const detailData = ref(null);
    const loadingRecordId = ref(null);
    const detailOutputImages = computed(() => {
      if (!detailData.value || !Array.isArray(detailData.value.outputUrls)) return [];
      const urls = detailData.value.outputUrls;
      const od = detailData.value.originalData || {};
      const size = od.imageSize || od.image_size || "1:1";
      const fmt = od.outputFormat || od.output_format || "png";
      return urls.map((url, i) => {
        var _a, _b;
        return {
          id: `detail-${i}`,
          url: typeof url === "string" ? url : (_b = (_a = url == null ? void 0 : url.url) != null ? _a : url == null ? void 0 : url.imageUrl) != null ? _b : "",
          image_size: size,
          output_format: fmt,
          timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString()
        };
      }).filter((img) => img.url);
    });
    function fillFormFromOriginalData(originalData) {
      if (!originalData || typeof originalData !== "object") return;
      const o = originalData;
      if (o.model === "nano-banana-pro" || o.imageInput || o.image_input != null || o.resolution) {
        activeTab.value = "nano-banana-pro";
        if (o.prompt != null) proFormData.prompt = o.prompt;
        if (Array.isArray(o.imageInput)) proFormData.image_input = [...o.imageInput];
        else if (Array.isArray(o.image_input)) proFormData.image_input = [...o.image_input];
        if (o.aspect_ratio) proFormData.aspect_ratio = o.aspect_ratio;
        if (o.imageSize) proFormData.aspect_ratio = o.imageSize;
        if (o.resolution) proFormData.resolution = o.resolution;
        if (o.outputFormat) proFormData.output_format = o.outputFormat === "jpeg" ? "jpg" : o.outputFormat || "png";
        if (o.output_format) proFormData.output_format = o.output_format === "jpeg" ? "jpg" : o.output_format || "png";
      } else if (o.model === "nano-banana-edit" || Array.isArray(o.imageUrls) && o.imageUrls.length || Array.isArray(o.image_urls) && o.image_urls.length) {
        activeTab.value = "nano-banana-edit";
        if (o.prompt != null) editFormData.prompt = o.prompt;
        if (Array.isArray(o.imageUrls)) editFormData.image_urls = [...o.imageUrls];
        if (Array.isArray(o.image_urls)) editFormData.image_urls = [...o.image_urls];
        if (o.outputFormat) editFormData.output_format = o.outputFormat === "jpg" ? "jpeg" : o.outputFormat || "png";
        if (o.output_format) editFormData.output_format = o.output_format === "jpg" ? "jpeg" : o.output_format || "png";
        if (o.imageSize) editFormData.image_size = o.imageSize;
        if (o.image_size) editFormData.image_size = o.image_size;
      } else {
        activeTab.value = "nano-banana";
        if (o.prompt != null) formData.prompt = o.prompt;
        if (o.outputFormat) formData.output_format = o.outputFormat === "jpg" ? "jpeg" : o.outputFormat || "png";
        if (o.output_format) formData.output_format = o.output_format === "jpg" ? "jpeg" : o.output_format || "png";
        if (o.imageSize) formData.image_size = o.imageSize;
        if (o.image_size) formData.image_size = o.image_size;
      }
    }
    function getRouteRecordId() {
      return route.query["record-id"] || "";
    }
    async function loadDetailByRecordId(recordId) {
      if (!recordId) return;
      if (getRouteRecordId() !== recordId) return;
      if (loadingRecordId.value === recordId) return;
      loadingRecordId.value = recordId;
      detailData.value = null;
      try {
        const data = await fetchRecordDetailOnce(recordId);
        if (getRouteRecordId() !== recordId) return;
        detailData.value = data || null;
        if (data == null ? void 0 : data.originalData) fillFormFromOriginalData(data.originalData);
        if (data != null && Number(data.status) === 1) {
          pollRecordByStatus(recordId, { getIsCancelled: () => getRouteRecordId() !== recordId }).then((result) => {
            if (getRouteRecordId() !== recordId) return;
            detailData.value = result;
            if (result == null ? void 0 : result.originalData) fillFormFromOriginalData(result.originalData);
          }).catch(() => {
          });
        }
      } catch (e) {
        console.error("Load record detail failed:", e);
      } finally {
        if (loadingRecordId.value === recordId) loadingRecordId.value = null;
      }
    }
    watch(() => route.query["record-id"], (recordId) => {
      if (recordId) loadDetailByRecordId(recordId);
      else {
        loadingRecordId.value = null;
        detailData.value = null;
      }
    }, { immediate: true });
    const { getPrice, formatCredits } = useModelPrice();
    const nanoBananaPriceText = computed(() => {
      const credits = getPrice("nano-banana");
      const str = formatCredits(credits);
      return str ? `(${str})` : "";
    });
    const nanoBananaEditPriceText = computed(() => {
      const credits = getPrice("nano-banana-edit");
      const str = formatCredits(credits);
      return str ? `(${str})` : "";
    });
    const nanoBananaProPriceText = computed(() => {
      const credits = getPrice("nano-banana-pro", {
        quality: proFormData.resolution,
        duration: 0,
        size: "",
        batchSize: 1,
        speed: "none",
        scene: "generate"
      });
      const str = formatCredits(credits);
      return str ? `(${str})` : "";
    });
    const uploadFilesToUrls = async (files, onProgress) => {
      var _a;
      if (!files || files.length === 0) return [];
      const formDataUpload = new FormData();
      const fileList = Array.isArray(files) ? files : [files];
      fileList.forEach((f) => formDataUpload.append("file", f));
      const headers = { Accept: "application/json" };
      const response = await fetch("/api/common/batch-upload", {
        method: "POST",
        headers,
        body: formDataUpload,
        credentials: "include"
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const msg = typeof (errorData == null ? void 0 : errorData.errorMessage) === "string" && errorData.errorMessage.trim() ? errorData.errorMessage.trim() : typeof (errorData == null ? void 0 : errorData.message) === "string" && errorData.message.trim() ? errorData.message.trim() : (errorData == null ? void 0 : errorData.userTip) || (errorData == null ? void 0 : errorData.error) || (errorData == null ? void 0 : errorData.message) || "Upload failed";
        throw new Error(msg);
      }
      const data = await response.json();
      const urls = ((_a = data == null ? void 0 : data.data) == null ? void 0 : _a.urls) || (data == null ? void 0 : data.fileUrls) || (Array.isArray(data == null ? void 0 : data.data) ? data.data : []);
      if (!Array.isArray(urls) || urls.length === 0) throw new Error("Invalid response: file URLs not found");
      return urls;
    };
    const canGenerate = computed(() => !!formData.prompt.trim());
    const canGenerateEdit = computed(() => {
      if (!editFormData.prompt.trim()) return false;
      return editFormData.image_urls.length >= 1 && editFormData.image_urls.length <= 10;
    });
    const canGeneratePro = computed(() => {
      const promptOk = proFormData.prompt.trim().length > 0;
      const imagesOk = proFormData.image_input.length >= 1 && proFormData.image_input.length <= 10;
      return promptOk && imagesOk;
    });
    const getPromptPlaceholder = () => "Describe the image content you want to generate...";
    const getPromptHint = () => "Provide detailed image content description, supports up to 5000 characters";
    const handleEditImageUpdate = async (files) => {
      var _a, _b, _c, _d;
      if (!files || Array.isArray(files) && files.length === 0) {
        editFormData.image_urls = [];
        (_b = (_a = editImageUploadRef.value) == null ? void 0 : _a.clearFiles) == null ? void 0 : _b.call(_a);
        return;
      }
      const fileList = Array.isArray(files) ? files : [files];
      if (fileList.length > 10) {
        showError("Image files must contain 1 to 10 images");
        return;
      }
      isUploadingEdit.value = true;
      try {
        editFormData.image_urls = await uploadFilesToUrls(fileList);
      } catch (error) {
        console.error("Edit images upload error:", error);
        showError(error.message || "Failed to upload images");
        editFormData.image_urls = [];
        (_d = (_c = editImageUploadRef.value) == null ? void 0 : _c.clearFiles) == null ? void 0 : _d.call(_c);
      } finally {
        isUploadingEdit.value = false;
      }
    };
    const handleProImageUpdate = async (files) => {
      var _a, _b, _c, _d;
      if (!files || Array.isArray(files) && files.length === 0) {
        proFormData.image_input = [];
        (_b = (_a = proImageUploadRef.value) == null ? void 0 : _a.clearFiles) == null ? void 0 : _b.call(_a);
        return;
      }
      const fileList = Array.isArray(files) ? files : [files];
      if (fileList.length > 10) {
        showError("Image files must contain 1 to 10 images");
        return;
      }
      isUploadingPro.value = true;
      try {
        proFormData.image_input = await uploadFilesToUrls(fileList);
      } catch (error) {
        console.error("Pro images upload error:", error);
        showError(error.message || "Failed to upload images");
        proFormData.image_input = [];
        (_d = (_c = proImageUploadRef.value) == null ? void 0 : _c.clearFiles) == null ? void 0 : _d.call(_c);
      } finally {
        isUploadingPro.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "nano-banana-tool" }, _attrs))} data-v-2329e421><div class="tool-header" data-v-2329e421><div class="header-left" data-v-2329e421><div class="tool-icon" data-v-2329e421><img${ssrRenderAttr("src", _imports_0)} alt="Nano Banana" data-v-2329e421></div><div class="tool-info" data-v-2329e421><h3 data-v-2329e421>Nano Banana</h3><p data-v-2329e421>Lightweight AI image generation tool</p></div></div></div><div class="function-selection-section" data-v-2329e421><div class="function-tabs" data-v-2329e421><!--[-->`);
      ssrRenderList(functionOptions.value, (func) => {
        _push(`<div class="${ssrRenderClass([{ active: activeTab.value === func.id }, "function-tab"])}" data-v-2329e421><div class="function-icon" data-v-2329e421><i class="${ssrRenderClass(func.icon)}" data-v-2329e421></i></div><div class="function-info" data-v-2329e421><div class="function-name" data-v-2329e421>${ssrInterpolate(func.name)}</div><div class="function-description" data-v-2329e421>${ssrInterpolate(func.description)}</div></div></div>`);
      });
      _push(`<!--]--></div></div><div class="main-content" data-v-2329e421><div class="config-panel" data-v-2329e421><div class="config-header" data-v-2329e421><h4 data-v-2329e421>${ssrInterpolate(configHeaderTitle.value)}</h4></div>`);
      if (activeTab.value === "nano-banana") {
        _push(`<form class="config-form" data-v-2329e421><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-2329e421><div class="form-group" data-v-2329e421><label data-v-2329e421>Prompt *</label><textarea${ssrRenderAttr("placeholder", getPromptPlaceholder())} rows="4" maxlength="5000" class="form-input" required data-v-2329e421>${ssrInterpolate(formData.prompt)}</textarea><div class="char-count" data-v-2329e421>${ssrInterpolate(formData.prompt.length)}/5000</div><div class="input-hint" data-v-2329e421>${ssrInterpolate(getPromptHint())}</div></div><div class="form-group" data-v-2329e421><label data-v-2329e421>Output Format</label><div class="tab-group" data-v-2329e421><div class="${ssrRenderClass([{ active: formData.output_format === "png" }, "tab-option"])}" data-v-2329e421><i class="fas fa-file-image" data-v-2329e421></i><span data-v-2329e421>PNG</span></div><div class="${ssrRenderClass([{ active: formData.output_format === "jpeg" }, "tab-option"])}" data-v-2329e421><i class="fas fa-file-image" data-v-2329e421></i><span data-v-2329e421>JPEG</span></div></div></div><div class="form-group" data-v-2329e421><label data-v-2329e421>Image Size</label><div class="tab-group" data-v-2329e421><div class="${ssrRenderClass([{ active: formData.image_size === "1:1" }, "tab-option"])}" data-v-2329e421><i class="fas fa-square" data-v-2329e421></i><span data-v-2329e421>1:1</span></div><div class="${ssrRenderClass([{ active: formData.image_size === "9:16" }, "tab-option"])}" data-v-2329e421><i class="fas fa-mobile-alt" data-v-2329e421></i><span data-v-2329e421>9:16</span></div><div class="${ssrRenderClass([{ active: formData.image_size === "16:9" }, "tab-option"])}" data-v-2329e421><i class="fas fa-desktop" data-v-2329e421></i><span data-v-2329e421>16:9</span></div><div class="${ssrRenderClass([{ active: formData.image_size === "3:4" }, "tab-option"])}" data-v-2329e421><i class="fas fa-mobile-alt" data-v-2329e421></i><span data-v-2329e421>3:4</span></div><div class="${ssrRenderClass([{ active: formData.image_size === "4:3" }, "tab-option"])}" data-v-2329e421><i class="fas fa-square" data-v-2329e421></i><span data-v-2329e421>4:3</span></div><div class="${ssrRenderClass([{ active: formData.image_size === "3:2" }, "tab-option"])}" data-v-2329e421><i class="fas fa-rectangle-wide" data-v-2329e421></i><span data-v-2329e421>3:2</span></div><div class="${ssrRenderClass([{ active: formData.image_size === "2:3" }, "tab-option"])}" data-v-2329e421><i class="fas fa-mobile-alt" data-v-2329e421></i><span data-v-2329e421>2:3</span></div><div class="${ssrRenderClass([{ active: formData.image_size === "5:4" }, "tab-option"])}" data-v-2329e421><i class="fas fa-rectangle-wide" data-v-2329e421></i><span data-v-2329e421>5:4</span></div><div class="${ssrRenderClass([{ active: formData.image_size === "4:5" }, "tab-option"])}" data-v-2329e421><i class="fas fa-mobile-alt" data-v-2329e421></i><span data-v-2329e421>4:5</span></div><div class="${ssrRenderClass([{ active: formData.image_size === "21:9" }, "tab-option"])}" data-v-2329e421><i class="fas fa-tv" data-v-2329e421></i><span data-v-2329e421>21:9</span></div><div class="${ssrRenderClass([{ active: formData.image_size === "auto" }, "tab-option"])}" data-v-2329e421><i class="fas fa-magic" data-v-2329e421></i><span data-v-2329e421>auto</span></div></div></div><button type="submit"${ssrIncludeBooleanAttr(isGenerating.value || !canGenerate.value) ? " disabled" : ""} class="generate-btn" data-v-2329e421>`);
        if (isGenerating.value) {
          _push(`<i class="fas fa-spinner fa-spin" data-v-2329e421></i>`);
        } else {
          _push(`<i class="fas fa-magic" data-v-2329e421></i>`);
        }
        _push(` ${ssrInterpolate(isGenerating.value ? "Generating..." : "Generate Image")} `);
        if (nanoBananaPriceText.value) {
          _push(`<span class="price-tag" data-v-2329e421>${ssrInterpolate(nanoBananaPriceText.value)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button></fieldset></form>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "nano-banana-edit") {
        _push(`<form class="config-form" data-v-2329e421><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-2329e421><div class="form-group" data-v-2329e421><label data-v-2329e421>Upload Image * (1-10)</label>`);
        _push(ssrRenderComponent(UploadImage, {
          ref_key: "editImageUploadRef",
          ref: editImageUploadRef,
          "input-id": "nano-banana-edit-image-upload",
          label: "",
          "upload-icon": "fas fa-cloud-upload-alt",
          "upload-text": "Click to upload image",
          "upload-hint": "Supports JPG, PNG, WEBP formats, maximum 10MB",
          "additional-hint": "Upload images to edit, up to 10 images",
          "theme-color": "#667eea",
          "max-files": 10,
          "max-file-size": 10 * 1024 * 1024,
          accept: "image/jpeg,image/png,image/webp",
          multiple: true,
          "onUpdate:files": handleEditImageUpdate
        }, null, _parent));
        if (isUploadingEdit.value) {
          _push(`<div class="uploading-hint" data-v-2329e421><i class="fas fa-spinner fa-spin" data-v-2329e421></i> Uploading images... </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-group" data-v-2329e421><label data-v-2329e421>Prompt *</label><textarea placeholder="Describe the edits you want to make to the image..." rows="4" maxlength="5000" class="form-input" required data-v-2329e421>${ssrInterpolate(editFormData.prompt)}</textarea><div class="char-count" data-v-2329e421>${ssrInterpolate(editFormData.prompt.length)}/5000</div></div><div class="form-group" data-v-2329e421><label data-v-2329e421>Output Format</label><div class="tab-group" data-v-2329e421><div class="${ssrRenderClass([{ active: editFormData.output_format === "png" }, "tab-option"])}" data-v-2329e421><i class="fas fa-file-image" data-v-2329e421></i><span data-v-2329e421>PNG</span></div><div class="${ssrRenderClass([{ active: editFormData.output_format === "jpeg" }, "tab-option"])}" data-v-2329e421><i class="fas fa-file-image" data-v-2329e421></i><span data-v-2329e421>JPEG</span></div></div></div><div class="form-group" data-v-2329e421><label data-v-2329e421>Image Size</label><div class="tab-group" data-v-2329e421><div class="${ssrRenderClass([{ active: editFormData.image_size === "1:1" }, "tab-option"])}" data-v-2329e421><i class="fas fa-square" data-v-2329e421></i><span data-v-2329e421>1:1</span></div><div class="${ssrRenderClass([{ active: editFormData.image_size === "9:16" }, "tab-option"])}" data-v-2329e421><i class="fas fa-mobile-alt" data-v-2329e421></i><span data-v-2329e421>9:16</span></div><div class="${ssrRenderClass([{ active: editFormData.image_size === "16:9" }, "tab-option"])}" data-v-2329e421><i class="fas fa-desktop" data-v-2329e421></i><span data-v-2329e421>16:9</span></div><div class="${ssrRenderClass([{ active: editFormData.image_size === "3:4" }, "tab-option"])}" data-v-2329e421><i class="fas fa-mobile-alt" data-v-2329e421></i><span data-v-2329e421>3:4</span></div><div class="${ssrRenderClass([{ active: editFormData.image_size === "4:3" }, "tab-option"])}" data-v-2329e421><i class="fas fa-square" data-v-2329e421></i><span data-v-2329e421>4:3</span></div><div class="${ssrRenderClass([{ active: editFormData.image_size === "3:2" }, "tab-option"])}" data-v-2329e421><i class="fas fa-rectangle-wide" data-v-2329e421></i><span data-v-2329e421>3:2</span></div><div class="${ssrRenderClass([{ active: editFormData.image_size === "2:3" }, "tab-option"])}" data-v-2329e421><i class="fas fa-mobile-alt" data-v-2329e421></i><span data-v-2329e421>2:3</span></div><div class="${ssrRenderClass([{ active: editFormData.image_size === "5:4" }, "tab-option"])}" data-v-2329e421><i class="fas fa-rectangle-wide" data-v-2329e421></i><span data-v-2329e421>5:4</span></div><div class="${ssrRenderClass([{ active: editFormData.image_size === "4:5" }, "tab-option"])}" data-v-2329e421><i class="fas fa-mobile-alt" data-v-2329e421></i><span data-v-2329e421>4:5</span></div><div class="${ssrRenderClass([{ active: editFormData.image_size === "21:9" }, "tab-option"])}" data-v-2329e421><i class="fas fa-tv" data-v-2329e421></i><span data-v-2329e421>21:9</span></div><div class="${ssrRenderClass([{ active: editFormData.image_size === "auto" }, "tab-option"])}" data-v-2329e421><i class="fas fa-magic" data-v-2329e421></i><span data-v-2329e421>auto</span></div></div></div><button type="submit"${ssrIncludeBooleanAttr(isGenerating.value || !canGenerateEdit.value) ? " disabled" : ""} class="generate-btn" data-v-2329e421>`);
        if (isGenerating.value) {
          _push(`<i class="fas fa-spinner fa-spin" data-v-2329e421></i>`);
        } else {
          _push(`<i class="fas fa-images" data-v-2329e421></i>`);
        }
        _push(` ${ssrInterpolate(isGenerating.value ? "Generating..." : "Generate from Image")} `);
        if (nanoBananaEditPriceText.value) {
          _push(`<span class="price-tag" data-v-2329e421>${ssrInterpolate(nanoBananaEditPriceText.value)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button></fieldset></form>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "nano-banana-pro") {
        _push(`<form class="config-form" data-v-2329e421><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-2329e421><div class="form-group" data-v-2329e421><label data-v-2329e421>Prompt *</label><textarea placeholder="A text description of the image you want to generate" rows="6" maxlength="5000" class="form-input" required data-v-2329e421>${ssrInterpolate(proFormData.prompt)}</textarea><div class="char-count" data-v-2329e421>${ssrInterpolate(proFormData.prompt.length)}/5000</div><div class="input-hint" data-v-2329e421>Provide detailed image description, supports up to 5000 characters</div></div><div class="form-group" data-v-2329e421><label data-v-2329e421>Input Images * (1-10)</label>`);
        _push(ssrRenderComponent(UploadImage, {
          ref_key: "proImageUploadRef",
          ref: proImageUploadRef,
          "input-id": "nano-banana-pro-image-upload",
          label: "",
          "upload-icon": "fas fa-cloud-upload-alt",
          "upload-text": "Click to upload images",
          "upload-hint": "Supports JPG, PNG, WEBP formats, maximum 30MB per image",
          "additional-hint": "Upload up to 8 images as reference or for transformation",
          "theme-color": "#667eea",
          "max-files": 8,
          "max-file-size": 30 * 1024 * 1024,
          accept: "image/jpeg,image/png,image/webp",
          multiple: true,
          "onUpdate:files": handleProImageUpdate
        }, null, _parent));
        if (isUploadingPro.value) {
          _push(`<div class="uploading-hint" data-v-2329e421><i class="fas fa-spinner fa-spin" data-v-2329e421></i> Uploading images... </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-group" data-v-2329e421><label data-v-2329e421>Aspect Ratio</label><div class="tab-group" data-v-2329e421><!--[-->`);
        ssrRenderList(aspectRatios, (ratio) => {
          _push(`<div class="${ssrRenderClass([{ active: proFormData.aspect_ratio === ratio }, "tab-option"])}" data-v-2329e421><span data-v-2329e421>${ssrInterpolate(ratio)}</span></div>`);
        });
        _push(`<!--]--></div></div><div class="form-group" data-v-2329e421><label data-v-2329e421>Resolution</label><div class="tab-group" data-v-2329e421><!--[-->`);
        ssrRenderList(resolutions, (res) => {
          _push(`<div class="${ssrRenderClass([{ active: proFormData.resolution === res }, "tab-option"])}" data-v-2329e421><span data-v-2329e421>${ssrInterpolate(res)}</span></div>`);
        });
        _push(`<!--]--></div></div><div class="form-group" data-v-2329e421><label data-v-2329e421>Output Format</label><div class="tab-group" data-v-2329e421><div class="${ssrRenderClass([{ active: proFormData.output_format === "png" }, "tab-option"])}" data-v-2329e421><i class="fas fa-file-image" data-v-2329e421></i><span data-v-2329e421>PNG</span></div><div class="${ssrRenderClass([{ active: proFormData.output_format === "jpeg" }, "tab-option"])}" data-v-2329e421><i class="fas fa-file-image" data-v-2329e421></i><span data-v-2329e421>JPEG</span></div></div></div><button type="submit"${ssrIncludeBooleanAttr(isGenerating.value || !canGeneratePro.value) ? " disabled" : ""} class="generate-btn" data-v-2329e421>`);
        if (isGenerating.value) {
          _push(`<i class="fas fa-spinner fa-spin" data-v-2329e421></i>`);
        } else {
          _push(`<i class="fas fa-magic" data-v-2329e421></i>`);
        }
        _push(` ${ssrInterpolate(isGenerating.value ? "Generating..." : "Generate Image")} `);
        if (nanoBananaProPriceText.value) {
          _push(`<span class="price-tag" data-v-2329e421>${ssrInterpolate(nanoBananaProPriceText.value)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button></fieldset></form>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="image-display-panel" data-v-2329e421><div class="image-header" data-v-2329e421><h4 data-v-2329e421>Image Preview</h4>`);
      if (!isDetailView.value && generatedImages.value.length > 0) {
        _push(`<div class="image-actions" data-v-2329e421><button class="btn-secondary" data-v-2329e421><i class="fas fa-trash" data-v-2329e421></i> Clear </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="image-container" data-v-2329e421>`);
      if (isDetailView.value && detailData.value && detailData.value.status === 2 && detailOutputImages.value.length > 0) {
        _push(`<div class="image-showcase" data-v-2329e421><!--[-->`);
        ssrRenderList(detailOutputImages.value, (image, index) => {
          _push(`<div class="image-item" data-v-2329e421><div class="image-wrapper" data-v-2329e421><img${ssrRenderAttr("src", image.url)}${ssrRenderAttr("alt", `Generated image ${index + 1}`)} data-v-2329e421><div class="image-overlay" data-v-2329e421><button class="action-btn" data-v-2329e421><i class="fas fa-download" data-v-2329e421></i></button><button class="action-btn" data-v-2329e421><i class="fas fa-copy" data-v-2329e421></i></button></div></div><div class="image-info" data-v-2329e421><div class="image-meta" data-v-2329e421><span class="image-size" data-v-2329e421>${ssrInterpolate(image.image_size)}</span><span class="image-format" data-v-2329e421>${ssrInterpolate((image.output_format || "png").toUpperCase())}</span></div><div class="image-time" data-v-2329e421>${ssrInterpolate(image.timestamp)}</div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (isDetailView.value && detailData.value && detailData.value.status === 3) {
        _push(`<div class="detail-failure-state" data-v-2329e421><div class="failure-icon" data-v-2329e421><i class="fas fa-exclamation-circle" data-v-2329e421></i></div><p class="failure-message" data-v-2329e421>Generation failed. You can debug the parameters and try generating again. Generation failure will not consume credits.</p></div>`);
      } else if (isDetailView.value && (!detailData.value || detailData.value.status === 1)) {
        _push(`<div class="detail-loading-state" data-v-2329e421><i class="fas fa-spinner fa-spin detail-spinner" data-v-2329e421></i><p data-v-2329e421>Generating...</p></div>`);
      } else if (isDetailView.value) {
        _push(`<div class="detail-loading-state" data-v-2329e421><p data-v-2329e421>No output images</p></div>`);
      } else if (generatedImages.value.length > 0) {
        _push(`<div class="image-showcase" data-v-2329e421><!--[-->`);
        ssrRenderList(generatedImages.value, (image, index) => {
          _push(`<div class="image-item" data-v-2329e421><div class="image-wrapper" data-v-2329e421><img${ssrRenderAttr("src", image.url)}${ssrRenderAttr("alt", `Generated image ${index + 1}`)} data-v-2329e421><div class="image-overlay" data-v-2329e421><button class="action-btn" data-v-2329e421><i class="fas fa-download" data-v-2329e421></i></button><button class="action-btn" data-v-2329e421><i class="fas fa-copy" data-v-2329e421></i></button></div></div><div class="image-info" data-v-2329e421><div class="image-meta" data-v-2329e421><span class="image-size" data-v-2329e421>${ssrInterpolate(image.image_size)}</span><span class="image-format" data-v-2329e421>${ssrInterpolate(image.output_format.toUpperCase())}</span></div><div class="image-time" data-v-2329e421>${ssrInterpolate(image.timestamp)}</div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="empty-state" data-v-2329e421><div class="empty-icon" data-v-2329e421><i class="fas fa-banana" data-v-2329e421></i></div><h3 data-v-2329e421>Waiting for Image Generation</h3><p data-v-2329e421>Enter a prompt and select parameters, click &quot;Generate Image&quot; to start creating your AI image</p><div class="empty-features" data-v-2329e421><div class="feature-item" data-v-2329e421><i class="fas fa-magic" data-v-2329e421></i><span data-v-2329e421>Fast Generation</span></div><div class="feature-item" data-v-2329e421><i class="fas fa-palette" data-v-2329e421></i><span data-v-2329e421>Multiple Sizes</span></div><div class="feature-item" data-v-2329e421><i class="fas fa-file-image" data-v-2329e421></i><span data-v-2329e421>Format Options</span></div><div class="feature-item" data-v-2329e421><i class="fas fa-bolt" data-v-2329e421></i><span data-v-2329e421>Lightweight</span></div></div></div>`);
      }
      _push(`</div></div></div>`);
      if (activeTab.value === "nano-banana") {
        _push(`<div class="usage-tips" data-v-2329e421><div class="tip-item" data-v-2329e421><span class="tip-icon" data-v-2329e421>\u270D\uFE0F</span><span data-v-2329e421><strong data-v-2329e421>Text to Image:</strong> Describe the image content you want to generate</span></div><div class="tip-item" data-v-2329e421><span class="tip-icon" data-v-2329e421>\u{1F4DD}</span><span data-v-2329e421><strong data-v-2329e421>Character Limit:</strong> Prompt supports up to 5000 characters</span></div><div class="tip-item" data-v-2329e421><span class="tip-icon" data-v-2329e421>\u{1F5BC}\uFE0F</span><span data-v-2329e421><strong data-v-2329e421>Format Selection:</strong> PNG supports transparent background, JPEG files are smaller</span></div><div class="tip-item" data-v-2329e421><span class="tip-icon" data-v-2329e421>\u{1F4D0}</span><span data-v-2329e421><strong data-v-2329e421>Size Selection:</strong> Choose the appropriate aspect ratio or select auto for AI to decide</span></div><div class="tip-item" data-v-2329e421><span class="tip-icon" data-v-2329e421>\u26A1</span><span data-v-2329e421><strong data-v-2329e421>Lightweight:</strong> Nano Banana is optimized for fast generation</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "nano-banana-edit") {
        _push(`<div class="usage-tips" data-v-2329e421><div class="tip-item" data-v-2329e421><span class="tip-icon" data-v-2329e421>\u{1F4E4}</span><span data-v-2329e421><strong data-v-2329e421>Image to Image:</strong> Upload 1\u201310 images in JPG/PNG/WEBP format to edit</span></div><div class="tip-item" data-v-2329e421><span class="tip-icon" data-v-2329e421>\u270D\uFE0F</span><span data-v-2329e421><strong data-v-2329e421>Edit Prompt:</strong> Describe the edits you want to make to the uploaded images</span></div><div class="tip-item" data-v-2329e421><span class="tip-icon" data-v-2329e421>\u{1F4DD}</span><span data-v-2329e421><strong data-v-2329e421>Character Limit:</strong> Prompt supports up to 5000 characters</span></div><div class="tip-item" data-v-2329e421><span class="tip-icon" data-v-2329e421>\u{1F5BC}\uFE0F</span><span data-v-2329e421><strong data-v-2329e421>Format &amp; Size:</strong> Choose output format and aspect ratio for the result</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "nano-banana-pro") {
        _push(`<div class="usage-tips" data-v-2329e421><div class="tip-item" data-v-2329e421><span class="tip-icon" data-v-2329e421>\u270D\uFE0F</span><span data-v-2329e421><strong data-v-2329e421>Prompt:</strong> Provide detailed image descriptions, supports up to 20000 characters for complex scenes</span></div><div class="tip-item" data-v-2329e421><span class="tip-icon" data-v-2329e421>\u{1F5BC}\uFE0F</span><span data-v-2329e421><strong data-v-2329e421>Input Images:</strong> Upload up to 8 images as reference or for transformation, max 30MB per image</span></div><div class="tip-item" data-v-2329e421><span class="tip-icon" data-v-2329e421>\u{1F4D0}</span><span data-v-2329e421><strong data-v-2329e421>Aspect Ratio:</strong> Choose the appropriate aspect ratio for your use case, or select &quot;auto&quot; for automatic selection</span></div><div class="tip-item" data-v-2329e421><span class="tip-icon" data-v-2329e421>\u{1F3AF}</span><span data-v-2329e421><strong data-v-2329e421>Resolution:</strong> Select 1K, 2K, or 4K resolution based on your quality requirements</span></div><div class="tip-item" data-v-2329e421><span class="tip-icon" data-v-2329e421>\u{1F4BE}</span><span data-v-2329e421><strong data-v-2329e421>Output Format:</strong> PNG supports transparent background, JPG files are smaller in size</span></div><div class="tip-item" data-v-2329e421><span class="tip-icon" data-v-2329e421>\u2B50</span><span data-v-2329e421><strong data-v-2329e421>Pro Features:</strong> Nano Banana Pro offers enhanced image generation capabilities with higher quality output</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/NanoBananaTool.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const NanoBananaTool = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2329e421"]]);

export { NanoBananaTool as N };
//# sourceMappingURL=NanoBananaTool-CeG2oV2N.mjs.map
