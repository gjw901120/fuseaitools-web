import { ref, computed, reactive, watch, mergeProps, useSSRContext } from 'file://C:/project/fuseaitools-web/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderComponent, ssrLooseEqual } from 'file://C:/project/fuseaitools-web/node_modules/vue/server-renderer/index.mjs';
import { p as publicAssetsURL } from '../_/renderer.mjs';
import { useRouter, useRoute } from 'file://C:/project/fuseaitools-web/node_modules/vue-router/dist/vue-router.node.mjs';
import { U as UploadImage } from './UploadImage-D6DL1USQ.mjs';
import { u as useAuth } from './useAuth-BT_C6798.mjs';
import { u as useToast } from './useToast-CATlmXE8.mjs';
import { u as useApi } from './useApi-1a9EtG7k.mjs';
import { u as useModelPrice } from './useModelPrice-DCrt0_k3.mjs';
import { u as useRecordPolling } from './useRecordPolling-QI_mIuwF.mjs';
import { u as useBatchUploadUrl } from './useBatchUploadUrl-_AVZ_-oO.mjs';
import { _ as _export_sfc } from './server.mjs';

const _imports_0 = publicAssetsURL("/tools-logo/FluxKontext.png");
const _sfc_main = {
  __name: "FluxKontextTool",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const route = useRoute();
    useAuth();
    const { showError } = useToast();
    useApi();
    const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling();
    const { getPrice, formatCredits, discount } = useModelPrice();
    const batchUploadUrl = useBatchUploadUrl();
    const tabList = [
      { id: "generate", label: "Generate", icon: "fas fa-wand-magic-sparkles" },
      { id: "flux-2-text-to-image", label: "Flux 2 T2I", icon: "fas fa-font" },
      { id: "flux-2-image-to-image", label: "Flux 2 I2I", icon: "fas fa-image" },
      { id: "flux-2-pro-text-to-image", label: "Flux 2 Pro T2I", icon: "fas fa-pen-ruler" },
      { id: "flux-2-pro-image-to-image", label: "Flux 2 Pro I2I", icon: "fas fa-layer-group" }
    ];
    const tabToPath = {
      generate: "/home/flux-kontext/generate",
      "flux-2-text-to-image": "/home/flux-kontext/flux-2-text-to-image",
      "flux-2-image-to-image": "/home/flux-kontext/flux-2-image-to-image",
      "flux-2-pro-text-to-image": "/home/flux-kontext/flux-2-pro-text-to-image",
      "flux-2-pro-image-to-image": "/home/flux-kontext/flux-2-pro-image-to-image"
    };
    const pathToTab = {};
    Object.keys(tabToPath).forEach((k) => {
      pathToTab[tabToPath[k]] = k;
    });
    const activeTab = ref("generate");
    const discountText = computed(() => {
      var _a;
      const rate = Number((_a = discount == null ? void 0 : discount.value) != null ? _a : 1);
      if (Number.isNaN(rate) || rate <= 0 || rate === 1) return "";
      const percent = (rate * 100).toFixed(0);
      return ` \xB7 ${percent}%`;
    });
    const fluxKontextPriceText = computed(() => {
      if (activeTab.value !== "generate") {
        const modelKey2 = activeTab.value;
        const credits2 = getPrice(modelKey2, {
          quality: flux2Form.resolution,
          scene: "generate"
        });
        const str2 = formatCredits(credits2);
        if (!str2) return "";
        return `\xB7 ${str2} credits${discountText.value}`;
      }
      const model = formData.model || "flux-kontext-pro";
      const modelKey = model === "flux-kontext-max" ? "flux_kontext_max" : "flux_kontext_pro";
      const credits = getPrice(modelKey);
      const str = formatCredits(credits);
      if (!str) return "";
      return `\xB7 ${str} credits${discountText.value}`;
    });
    const formData = reactive({
      prompt: "",
      enableTranslation: true,
      inputImage: "",
      inputImageFile: null,
      imageUrl: "",
      // 编辑模式上传后的 URL
      aspectRatio: "16:9",
      outputFormat: "jpeg",
      promptUpsampling: false,
      model: "flux-kontext-pro",
      safetyTolerance: 2,
      watermark: ""
    });
    const flux2Form = reactive({
      prompt: "",
      inputUrls: [],
      aspectRatio: "1:1",
      resolution: "1K"
    });
    const flux2AspectRatios = ["1:1", "4:3", "3:4", "16:9", "9:16", "3:2", "2:3", "auto"];
    const mode = ref("generate");
    const isGenerating = ref(false);
    const isUploadingImage = ref(false);
    const isUploadingFlux2Images = ref(false);
    const generatedImages = ref([]);
    const inputImageUploadRef = ref(null);
    const flux2InputImagesUploadRef = ref(null);
    const routeRecordId = computed(() => route.query["record-id"] || "");
    const isDetailView = computed(() => !!routeRecordId.value);
    const detailData = ref(null);
    const loadingRecordId = ref(null);
    const aspectRatioReverseMap = {
      RATIO_21_9: "21:9",
      RATIO_16_9: "16:9",
      RATIO_4_3: "4:3",
      RATIO_1_1: "1:1",
      RATIO_3_4: "3:4",
      RATIO_9_16: "9:16"
    };
    const detailOutputImages = computed(() => {
      if (!detailData.value || !Array.isArray(detailData.value.outputUrls)) return [];
      const urls = detailData.value.outputUrls;
      const od = detailData.value.originalData || {};
      const aspectRatio = aspectRatioReverseMap[od.aspectRatio] || od.aspectRatio || "16:9";
      const format = (od.outputFormat || "JPEG").toLowerCase() === "png" ? "png" : "jpeg";
      const prompt = od.prompt || "";
      return urls.map((url, i) => {
        var _a, _b;
        return {
          url: typeof url === "string" ? url : (_b = (_a = url == null ? void 0 : url.url) != null ? _a : url == null ? void 0 : url.imageUrl) != null ? _b : "",
          aspectRatio,
          format,
          prompt
        };
      }).filter((img) => img.url);
    });
    const isFlux2ImageToImage = computed(() => ["flux-2-image-to-image", "flux-2-pro-image-to-image"].includes(activeTab.value));
    function fillFormFromOriginalData(originalData) {
      var _a;
      if (!originalData || typeof originalData !== "object") return;
      const o = originalData;
      if (o.prompt != null) formData.prompt = o.prompt;
      if (typeof o.enableTranslation === "boolean") formData.enableTranslation = o.enableTranslation;
      if (o.imageUrl) {
        formData.imageUrl = o.imageUrl;
        mode.value = "edit";
      } else {
        mode.value = "generate";
      }
      if (o.aspectRatio) formData.aspectRatio = aspectRatioReverseMap[o.aspectRatio] || o.aspectRatio || formData.aspectRatio;
      if (o.outputFormat) formData.outputFormat = (o.outputFormat || "JPEG").toLowerCase() === "png" ? "png" : "jpeg";
      if (typeof o.promptUpsampling === "boolean") formData.promptUpsampling = o.promptUpsampling;
      if (o.model) formData.model = o.model === "flux_kontext_max" ? "flux-kontext-max" : o.model === "flux_kontext_pro" ? "flux-kontext-pro" : formData.model;
      if (o.safetyTolerance != null) formData.safetyTolerance = (_a = Number(o.safetyTolerance)) != null ? _a : 2;
      if (o.watermark != null) formData.watermark = String(o.watermark || "");
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
      }
    }
    watch(() => route.query["record-id"], (recordId) => {
      if (recordId) loadDetailByRecordId(recordId);
      else {
        loadingRecordId.value = null;
        detailData.value = null;
      }
    }, { immediate: true });
    watch(() => route.path, (path) => {
      const tab = pathToTab[path];
      if (tab) activeTab.value = tab;
    }, { immediate: true });
    const getAuthToken = () => {
      return null;
    };
    const handleInputImage = async (files) => {
      var _a, _b, _c, _d, _e;
      if (!files || files.length === 0) {
        formData.inputImageFile = null;
        formData.inputImage = "";
        formData.imageUrl = "";
        (_b = (_a = inputImageUploadRef.value) == null ? void 0 : _a.clearFiles) == null ? void 0 : _b.call(_a);
        return;
      }
      const file = files[0] || files;
      const fileObj = Array.isArray(file) ? file[0] : file;
      if (!fileObj) {
        formData.imageUrl = "";
        return;
      }
      formData.inputImageFile = fileObj;
      formData.inputImage = URL.createObjectURL(fileObj);
      isUploadingImage.value = true;
      try {
        const formDataUpload = new FormData();
        formDataUpload.append("file", fileObj);
        const headers = { Accept: "application/json" };
        const authToken = getAuthToken();
        if (authToken) ;
        const response = await fetch(batchUploadUrl, {
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
        const urls = ((_c = data == null ? void 0 : data.data) == null ? void 0 : _c.urls) || (data == null ? void 0 : data.fileUrls) || (Array.isArray(data == null ? void 0 : data.data) ? data.data : []);
        if (Array.isArray(urls) && urls[0]) {
          formData.imageUrl = urls[0];
        } else {
          throw new Error("Invalid response: file URL not found");
        }
      } catch (error) {
        console.error("Input image upload error:", error);
        showError(error.message || "Failed to upload image", 5e3);
        formData.imageUrl = "";
        formData.inputImageFile = null;
        formData.inputImage = "";
        (_e = (_d = inputImageUploadRef.value) == null ? void 0 : _d.clearFiles) == null ? void 0 : _e.call(_d);
      } finally {
        isUploadingImage.value = false;
      }
    };
    const uploadFilesAndGetUrls = async (files) => {
      var _a;
      const fileList = Array.isArray(files) ? files : [files];
      const urls = [];
      for (const fileObj of fileList) {
        if (!fileObj) continue;
        const formDataUpload = new FormData();
        formDataUpload.append("file", fileObj);
        const headers = { Accept: "application/json" };
        const response = await fetch(batchUploadUrl, {
          method: "POST",
          headers,
          body: formDataUpload,
          credentials: "include"
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error((errorData == null ? void 0 : errorData.errorMessage) || (errorData == null ? void 0 : errorData.message) || "Upload failed");
        }
        const data = await response.json();
        const uploaded = ((_a = data == null ? void 0 : data.data) == null ? void 0 : _a.urls) || (data == null ? void 0 : data.fileUrls) || (Array.isArray(data == null ? void 0 : data.data) ? data.data : []);
        if (Array.isArray(uploaded) && uploaded[0]) urls.push(uploaded[0]);
      }
      return urls;
    };
    const handleFlux2InputImages = async (files) => {
      var _a, _b;
      if (!files || files.length === 0) {
        flux2Form.inputUrls = [];
        return;
      }
      isUploadingFlux2Images.value = true;
      try {
        const selected = (Array.isArray(files) ? files : [files]).slice(0, 8);
        const urls = await uploadFilesAndGetUrls(selected);
        flux2Form.inputUrls = urls;
      } catch (error) {
        showError(error.message || "Failed to upload image(s)", 5e3);
        flux2Form.inputUrls = [];
        (_b = (_a = flux2InputImagesUploadRef.value) == null ? void 0 : _a.clearFiles) == null ? void 0 : _b.call(_a);
      } finally {
        isUploadingFlux2Images.value = false;
      }
    };
    const canGenerate = computed(() => {
      if (activeTab.value !== "generate") {
        const p = (flux2Form.prompt || "").trim();
        if (p.length < 3 || p.length > 5e3) return false;
        if (isFlux2ImageToImage.value) return flux2Form.inputUrls.length >= 1 && flux2Form.inputUrls.length <= 8;
        return true;
      }
      if (!formData.prompt.trim()) return false;
      if (mode.value === "edit") return !!formData.imageUrl;
      return true;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flux-kontext-tool" }, _attrs))} data-v-7106f299><div class="tool-header" data-v-7106f299><div class="tool-avatar" data-v-7106f299><img${ssrRenderAttr("src", _imports_0)} alt="Flux Kontext" data-v-7106f299></div><div class="tool-details" data-v-7106f299><h3 data-v-7106f299>Flux Kontext</h3><p class="tool-description" data-v-7106f299>Flux is Black Forest Labs&#39; advanced image generation model that delivers photoreal detail, strong multi-reference consistency, and accurate text rendering with flexible control.</p></div></div><div class="mode-tabs-wrap" data-v-7106f299><div class="mode-tabs" data-v-7106f299><!--[-->`);
      ssrRenderList(tabList, (tab) => {
        _push(`<div class="${ssrRenderClass([{ active: activeTab.value === tab.id }, "mode-tab"])}" data-v-7106f299><i class="${ssrRenderClass(tab.icon)}" data-v-7106f299></i><span data-v-7106f299>${ssrInterpolate(tab.label)}</span></div>`);
      });
      _push(`<!--]--></div></div><div class="main-content" data-v-7106f299><div class="config-panel" data-v-7106f299><div class="config-header" data-v-7106f299><h4 data-v-7106f299>Image Generation Configuration</h4></div><form class="config-form" data-v-7106f299><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-7106f299>`);
      if (activeTab.value === "generate") {
        _push(`<!--[--><div class="form-group" data-v-7106f299><label class="form-label" data-v-7106f299>Mode Selection *</label><div class="mode-switch" data-v-7106f299><button type="button" class="${ssrRenderClass([{ active: mode.value === "generate" }, "mode-btn"])}" data-v-7106f299><i class="fas fa-image" data-v-7106f299></i> Image Generation </button><button type="button" class="${ssrRenderClass([{ active: mode.value === "edit" }, "mode-btn"])}" data-v-7106f299><i class="fas fa-edit" data-v-7106f299></i> Image Editing </button></div></div><div class="form-group" data-v-7106f299><label for="prompt" class="form-label" data-v-7106f299> Prompt <span class="required" data-v-7106f299>*</span></label><textarea id="prompt" class="form-input" rows="4" placeholder="Describe in detail the image content you want to generate, including scenes, styles, colors, etc... (English only)" required data-v-7106f299>${ssrInterpolate(formData.prompt)}</textarea><div class="form-hint" data-v-7106f299> Example: &quot;A serene mountain landscape at sunset with a lake reflecting the orange sky&quot; </div></div><div class="form-group" data-v-7106f299><label class="checkbox-label" for="enable-translation" data-v-7106f299><input id="enable-translation" type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(formData.enableTranslation) ? ssrLooseContain(formData.enableTranslation, null) : formData.enableTranslation) ? " checked" : ""} data-v-7106f299><span class="checkmark" data-v-7106f299></span> Enable Auto Translation </label><div class="form-hint" data-v-7106f299> Automatically translate non-English prompts to English </div></div>`);
        if (mode.value === "edit") {
          _push(`<div class="form-group" data-v-7106f299>`);
          _push(ssrRenderComponent(UploadImage, {
            ref_key: "inputImageUploadRef",
            ref: inputImageUploadRef,
            "input-id": "flux-kontext-input-image",
            label: "Upload Image *",
            "upload-icon": "fas fa-cloud-upload-alt",
            "upload-text": "Click to upload image",
            "upload-hint": "Supports .jfif, .jpeg, .jpg, .png, .webp",
            multiple: false,
            "max-file-size": 10 * 1024 * 1024,
            "additional-hint": "Must be a valid image file for edit mode",
            "theme-color": "#667eea",
            "onUpdate:files": handleInputImage
          }, null, _parent));
          if (isUploadingImage.value) {
            _push(`<div class="uploading-hint" data-v-7106f299><i class="fas fa-spinner fa-spin" data-v-7106f299></i> Uploading image... </div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="form-group" data-v-7106f299><label class="form-label" data-v-7106f299>Aspect Ratio</label><div class="tab-group" data-v-7106f299><div class="tab-row" data-v-7106f299><button type="button" class="${ssrRenderClass([{ active: formData.aspectRatio === "21:9" }, "tab-option"])}" data-v-7106f299><span data-v-7106f299>21:9</span><span class="tab-label" data-v-7106f299>Ultra Wide</span></button><button type="button" class="${ssrRenderClass([{ active: formData.aspectRatio === "16:9" }, "tab-option"])}" data-v-7106f299><span data-v-7106f299>16:9</span><span class="tab-label" data-v-7106f299>Wide</span></button><button type="button" class="${ssrRenderClass([{ active: formData.aspectRatio === "4:3" }, "tab-option"])}" data-v-7106f299><span data-v-7106f299>4:3</span><span class="tab-label" data-v-7106f299>Standard</span></button></div><div class="tab-row" data-v-7106f299><button type="button" class="${ssrRenderClass([{ active: formData.aspectRatio === "1:1" }, "tab-option"])}" data-v-7106f299><span data-v-7106f299>1:1</span><span class="tab-label" data-v-7106f299>Square</span></button><button type="button" class="${ssrRenderClass([{ active: formData.aspectRatio === "3:4" }, "tab-option"])}" data-v-7106f299><span data-v-7106f299>3:4</span><span class="tab-label" data-v-7106f299>Portrait</span></button><button type="button" class="${ssrRenderClass([{ active: formData.aspectRatio === "9:16" }, "tab-option"])}" data-v-7106f299><span data-v-7106f299>9:16</span><span class="tab-label" data-v-7106f299>Mobile</span></button></div></div></div><div class="form-group" data-v-7106f299><label class="form-label" data-v-7106f299>Output Format</label><div class="tab-group" data-v-7106f299><div class="tab-options" data-v-7106f299><button type="button" class="${ssrRenderClass([{ active: formData.outputFormat === "jpeg" }, "tab-option"])}" data-v-7106f299><span data-v-7106f299>JPEG</span></button><button type="button" class="${ssrRenderClass([{ active: formData.outputFormat === "png" }, "tab-option"])}" data-v-7106f299><span data-v-7106f299>PNG</span></button></div></div></div><div class="form-group" data-v-7106f299><label class="checkbox-label" for="prompt-upsampling" data-v-7106f299><input id="prompt-upsampling" type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(formData.promptUpsampling) ? ssrLooseContain(formData.promptUpsampling, null) : formData.promptUpsampling) ? " checked" : ""} data-v-7106f299><span class="checkmark" data-v-7106f299></span> Prompt Enhancement </label><div class="form-hint" data-v-7106f299> Enhance the prompt, may increase processing time </div></div><div class="form-group" data-v-7106f299><label for="model" class="form-label" data-v-7106f299>Model Version</label><select id="model" class="form-input" data-v-7106f299><option value="flux-kontext-pro" data-v-7106f299${ssrIncludeBooleanAttr(Array.isArray(formData.model) ? ssrLooseContain(formData.model, "flux-kontext-pro") : ssrLooseEqual(formData.model, "flux-kontext-pro")) ? " selected" : ""}>Flux Kontext Pro - Performance Balanced</option><option value="flux-kontext-max" data-v-7106f299${ssrIncludeBooleanAttr(Array.isArray(formData.model) ? ssrLooseContain(formData.model, "flux-kontext-max") : ssrLooseEqual(formData.model, "flux-kontext-max")) ? " selected" : ""}>Flux Kontext Max - Advanced Features</option></select><div class="form-hint" data-v-7106f299> Max version has higher quality and detail, suitable for complex tasks </div></div><div class="form-group" data-v-7106f299><label for="safety-tolerance" class="form-label" data-v-7106f299> Safety Tolerance (${ssrInterpolate(formData.safetyTolerance)}) </label><input id="safety-tolerance"${ssrRenderAttr("value", formData.safetyTolerance)} type="range" min="0" max="6" class="form-slider" data-v-7106f299><div class="slider-labels" data-v-7106f299><span data-v-7106f299>Strictest (0)</span><span data-v-7106f299>More Relaxed (6)</span></div></div><div class="form-group" data-v-7106f299><label for="watermark" class="form-label" data-v-7106f299>Watermark Identifier</label><input id="watermark"${ssrRenderAttr("value", formData.watermark)} type="text" class="form-input" placeholder="your-watermark-id" data-v-7106f299><div class="form-hint" data-v-7106f299> Optional, if provided will add a watermark to the output image </div></div><!--]-->`);
      } else {
        _push(`<!--[--><div class="form-group" data-v-7106f299><label class="form-label" data-v-7106f299>Prompt <span class="required" data-v-7106f299>*</span></label><textarea class="form-input" rows="4" maxlength="5000" placeholder="Prompt (3-5000 characters)" required data-v-7106f299>${ssrInterpolate(flux2Form.prompt)}</textarea></div>`);
        if (isFlux2ImageToImage.value) {
          _push(`<div class="form-group" data-v-7106f299>`);
          _push(ssrRenderComponent(UploadImage, {
            ref_key: "flux2InputImagesUploadRef",
            ref: flux2InputImagesUploadRef,
            "input-id": "flux2-input-images",
            label: "Input Image(s) *",
            "upload-icon": "fas fa-cloud-upload-alt",
            "upload-text": "Click to upload image(s)",
            "upload-hint": "Supports .jpeg, .jpg, .png, .webp; max 10MB each",
            multiple: true,
            "max-files": 8,
            "max-file-size": 10 * 1024 * 1024,
            "additional-hint": "Upload 1-8 reference images",
            "theme-color": "#667eea",
            "onUpdate:files": handleFlux2InputImages
          }, null, _parent));
          if (isUploadingFlux2Images.value) {
            _push(`<div class="uploading-hint" data-v-7106f299><i class="fas fa-spinner fa-spin" data-v-7106f299></i> Uploading image(s)... </div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="form-group" data-v-7106f299><label class="form-label" data-v-7106f299>Aspect Ratio</label><div class="tab-group" data-v-7106f299><div class="tab-options" data-v-7106f299><!--[-->`);
        ssrRenderList(flux2AspectRatios, (ratio) => {
          _push(`<button type="button" class="${ssrRenderClass([{ active: flux2Form.aspectRatio === ratio }, "tab-option"])}" data-v-7106f299><span data-v-7106f299>${ssrInterpolate(ratio)}</span></button>`);
        });
        _push(`<!--]--></div></div></div><div class="form-group" data-v-7106f299><label class="form-label" data-v-7106f299>Resolution</label><div class="tab-group" data-v-7106f299><div class="tab-options" data-v-7106f299><button type="button" class="${ssrRenderClass([{ active: flux2Form.resolution === "1K" }, "tab-option"])}" data-v-7106f299><span data-v-7106f299>1K</span></button><button type="button" class="${ssrRenderClass([{ active: flux2Form.resolution === "2K" }, "tab-option"])}" data-v-7106f299><span data-v-7106f299>2K</span></button></div></div></div><!--]-->`);
      }
      _push(`<div class="generate-btn-container" data-v-7106f299><button type="submit" class="generate-btn"${ssrIncludeBooleanAttr(!canGenerate.value || isGenerating.value) ? " disabled" : ""} data-v-7106f299>`);
      if (isGenerating.value) {
        _push(`<i class="fas fa-spinner fa-spin" data-v-7106f299></i>`);
      } else {
        _push(`<i class="fas fa-magic" data-v-7106f299></i>`);
      }
      _push(` ${ssrInterpolate(isGenerating.value ? "Generating..." : "Generate Image")} <span class="price-tag" data-v-7106f299>${ssrInterpolate(fluxKontextPriceText.value)}</span></button></div></fieldset></form></div><div class="result-panel" data-v-7106f299><div class="result-header" data-v-7106f299><h4 data-v-7106f299>Generation Result</h4>`);
      if (!isDetailView.value && generatedImages.value.length > 0) {
        _push(`<button class="clear-btn" data-v-7106f299><i class="fas fa-trash" data-v-7106f299></i> Clear Results </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="result-content" data-v-7106f299>`);
      if (isDetailView.value && detailData.value && detailData.value.status === 2 && detailOutputImages.value.length > 0) {
        _push(`<div class="image-grid" data-v-7106f299><!--[-->`);
        ssrRenderList(detailOutputImages.value, (image, index) => {
          _push(`<div class="image-item" data-v-7106f299><div class="image-container" data-v-7106f299><img${ssrRenderAttr("src", image.url)}${ssrRenderAttr("alt", `Generated image ${index + 1}`)} data-v-7106f299><div class="image-overlay" data-v-7106f299><button class="action-btn" data-v-7106f299><i class="fas fa-download" data-v-7106f299></i></button><button class="action-btn" data-v-7106f299><i class="fas fa-copy" data-v-7106f299></i></button></div></div><div class="image-info" data-v-7106f299><div class="image-meta" data-v-7106f299><span class="image-size" data-v-7106f299>${ssrInterpolate(image.aspectRatio)}</span><span class="image-format" data-v-7106f299>${ssrInterpolate(image.format.toUpperCase())}</span></div><div class="image-prompt" data-v-7106f299>${ssrInterpolate(image.prompt)}</div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (isDetailView.value && detailData.value && detailData.value.status === 3) {
        _push(`<div class="detail-failure-state" data-v-7106f299><div class="failure-icon" data-v-7106f299><i class="fas fa-exclamation-circle" data-v-7106f299></i></div><p class="failure-message" data-v-7106f299>Generation failed. You can debug the parameters and try generating again. Generation failure will not consume credits.</p></div>`);
      } else if (isDetailView.value && (!detailData.value || detailData.value.status === 1)) {
        _push(`<div class="detail-loading-state" data-v-7106f299><i class="fas fa-spinner fa-spin detail-spinner" data-v-7106f299></i><p data-v-7106f299>Generating...</p></div>`);
      } else if (isDetailView.value) {
        _push(`<div class="detail-loading-state" data-v-7106f299><p data-v-7106f299>No output images</p></div>`);
      } else if (generatedImages.value.length === 0) {
        _push(`<div class="empty-state" data-v-7106f299><i class="fas fa-image" data-v-7106f299></i><p data-v-7106f299>No image generated yet</p><span data-v-7106f299>Configure parameters and click &quot;Generate Image&quot; to start creating</span></div>`);
      } else {
        _push(`<div class="image-grid" data-v-7106f299><!--[-->`);
        ssrRenderList(generatedImages.value, (image, index) => {
          _push(`<div class="image-item" data-v-7106f299><div class="image-container" data-v-7106f299><img${ssrRenderAttr("src", image.url)}${ssrRenderAttr("alt", `Generated image ${index + 1}`)} data-v-7106f299><div class="image-overlay" data-v-7106f299><button class="action-btn" data-v-7106f299><i class="fas fa-download" data-v-7106f299></i></button><button class="action-btn" data-v-7106f299><i class="fas fa-copy" data-v-7106f299></i></button></div></div><div class="image-info" data-v-7106f299><div class="image-meta" data-v-7106f299><span class="image-size" data-v-7106f299>${ssrInterpolate(image.aspectRatio)}</span><span class="image-format" data-v-7106f299>${ssrInterpolate(image.format.toUpperCase())}</span></div><div class="image-prompt" data-v-7106f299>${ssrInterpolate(image.prompt)}</div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/FluxKontextTool.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const FluxKontextTool = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7106f299"]]);

export { FluxKontextTool as F };
//# sourceMappingURL=FluxKontextTool-7397lJdC.mjs.map
