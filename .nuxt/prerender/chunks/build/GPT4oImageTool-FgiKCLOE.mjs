import { computed, reactive, ref, watch, mergeProps, useSSRContext } from 'file://C:/project/fuseaitools-web/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent, ssrLooseContain, ssrRenderList } from 'file://C:/project/fuseaitools-web/node_modules/vue/server-renderer/index.mjs';
import { p as publicAssetsURL } from '../_/renderer.mjs';
import { U as UploadImage } from './UploadImage-CdWm1sTQ.mjs';
import { useRouter, useRoute } from 'file://C:/project/fuseaitools-web/node_modules/vue-router/dist/vue-router.node.mjs';
import { u as useAuth } from './useAuth-BT_C6798.mjs';
import { u as useToast } from './useToast-CATlmXE8.mjs';
import { u as useModelPrice } from './useModelPrice-DcNReY6Y.mjs';
import { u as useRecordPolling } from './useRecordPolling-QI_mIuwF.mjs';
import { u as useBatchUploadUrl } from './useBatchUploadUrl-Wq7pvxpv.mjs';
import { _ as _export_sfc } from './server.mjs';

const _imports_0 = publicAssetsURL("/tools-logo/ChatGPT4OImage.png");
const _sfc_main = {
  __name: "GPT4oImageTool",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const route = useRoute();
    useAuth();
    const { showError } = useToast();
    const { getPrice, formatCredits } = useModelPrice();
    const batchUploadUrl = useBatchUploadUrl();
    const gpt4oImagePriceText = computed(() => {
      const credits = getPrice("GPT_4o_image");
      const str = formatCredits(credits);
      return str ? `(${str})` : "";
    });
    const formData = reactive({
      size: "1:1",
      prompt: "",
      filesUrl: [],
      isEnhance: false
    });
    const isGenerating = ref(false);
    const isUploadingRefs = ref(false);
    const generatedImages = ref([]);
    const uploadedFiles = ref([]);
    const referenceImagesUploadRef = ref(null);
    const getAuthToken = () => {
      return null;
    };
    const handleReferenceImages = async (files) => {
      var _a, _b, _c, _d;
      if (!Array.isArray(files) || files.length === 0) {
        uploadedFiles.value = [];
        formData.filesUrl = [];
        return;
      }
      isUploadingRefs.value = true;
      try {
        const formDataUpload = new FormData();
        files.forEach((file) => formDataUpload.append("file", file));
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
        let urls = [];
        if (data.errorCode === "00000" && ((_a = data.data) == null ? void 0 : _a.urls) && Array.isArray(data.data.urls)) {
          urls = data.data.urls;
        } else if (((_b = data.data) == null ? void 0 : _b.urls) && Array.isArray(data.data.urls)) {
          urls = data.data.urls;
        } else if (data.fileUrls && Array.isArray(data.fileUrls)) {
          urls = data.fileUrls;
        }
        if (urls.length === 0) {
          throw new Error("Invalid response: file URLs not found");
        }
        formData.filesUrl = urls;
        uploadedFiles.value = files.map((file, i) => ({
          name: file.name,
          file,
          url: urls[i] || URL.createObjectURL(file)
        }));
      } catch (error) {
        console.error("Reference images upload error:", error);
        showError(error.message || "Failed to upload reference images", 5e3);
        uploadedFiles.value = [];
        formData.filesUrl = [];
        (_d = (_c = referenceImagesUploadRef.value) == null ? void 0 : _c.clearFiles) == null ? void 0 : _d.call(_c);
      } finally {
        isUploadingRefs.value = false;
      }
    };
    const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling();
    const routeRecordId = computed(() => route.query["record-id"] || "");
    const isDetailView = computed(() => !!routeRecordId.value);
    const detailData = ref(null);
    const detailLoading = ref(false);
    const loadingRecordId = ref(null);
    const detailOutputImages = computed(() => {
      var _a;
      if (!detailData.value || !Array.isArray(detailData.value.outputUrls)) return [];
      const urls = detailData.value.outputUrls;
      const size = ((_a = detailData.value.originalData) == null ? void 0 : _a.size) || "1:1";
      return urls.map((url, i) => {
        var _a3, _b;
        var _a2;
        return {
          id: `detail-${i}`,
          url: typeof url === "string" ? url : (_b = (_a3 = url == null ? void 0 : url.url) != null ? _a3 : url == null ? void 0 : url.imageUrl) != null ? _b : "",
          size,
          timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
          prompt: (_a2 = detailData.value.originalData) == null ? void 0 : _a2.prompt
        };
      }).filter((img) => img.url);
    });
    function fillFormFromOriginalData(originalData) {
      if (!originalData || typeof originalData !== "object") return;
      if (originalData.size) formData.size = originalData.size;
      if (typeof originalData.prompt === "string") formData.prompt = originalData.prompt;
      if (Array.isArray(originalData.imageUrls)) formData.filesUrl = [...originalData.imageUrls];
      if (typeof originalData.isEnhance === "boolean") formData.isEnhance = originalData.isEnhance;
    }
    function getRouteRecordId() {
      return route.query["record-id"] || "";
    }
    async function loadDetailByRecordId(recordId) {
      if (!recordId) return;
      if (getRouteRecordId() !== recordId) return;
      if (loadingRecordId.value === recordId) return;
      loadingRecordId.value = recordId;
      detailLoading.value = true;
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
        detailLoading.value = false;
      }
    }
    watch(
      () => route.query["record-id"],
      (recordId) => {
        if (recordId) loadDetailByRecordId(recordId);
        else {
          loadingRecordId.value = null;
          detailData.value = null;
        }
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "gpt4o-image-tool" }, _attrs))} data-v-adcce118><div class="tool-header" data-v-adcce118><div class="header-left" data-v-adcce118><div class="tool-icon" data-v-adcce118><img${ssrRenderAttr("src", _imports_0)} alt="GPT-4o Image" data-v-adcce118></div><div class="tool-info" data-v-adcce118><h3 data-v-adcce118>GPT 4o Image</h3><p class="tool-description" data-v-adcce118>ChatGPT 4o Image, is OpenAI&#39;s latest AI image generation model. It understands both text and visual context, allowing developers to create and edit images with remarkable accuracy. Unlike traditional diffusion models, ChatGPT 4o Image follows instructions precisely, supports consistent styles, and renders legible text \u2014 making it ideal for applications in design, marketing, and creative automation.</p></div></div></div><div class="main-content" data-v-adcce118><div class="config-panel" data-v-adcce118><div class="config-header" data-v-adcce118><h4 data-v-adcce118>Image Generation Configuration</h4></div><form class="config-form" data-v-adcce118><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-adcce118><div class="form-group" data-v-adcce118><label data-v-adcce118>Image Aspect Ratio *</label><div class="tab-group" data-v-adcce118><div class="${ssrRenderClass([{ active: formData.size === "1:1" }, "tab-option"])}" data-v-adcce118><span data-v-adcce118>1:1</span></div><div class="${ssrRenderClass([{ active: formData.size === "3:2" }, "tab-option"])}" data-v-adcce118><i class="fas fa-rectangle-wide" data-v-adcce118></i><span data-v-adcce118>3:2</span></div><div class="${ssrRenderClass([{ active: formData.size === "2:3" }, "tab-option"])}" data-v-adcce118><i class="fas fa-rectangle-portrait" data-v-adcce118></i><span data-v-adcce118>2:3</span></div></div></div><div class="form-group" data-v-adcce118><label data-v-adcce118>Prompt *</label><textarea placeholder="Describe the image content you want to generate..." rows="4" class="form-input" required data-v-adcce118>${ssrInterpolate(formData.prompt)}</textarea><div class="input-hint" data-v-adcce118>At least one of Reference Images and prompt is required</div></div><div class="form-group" data-v-adcce118>`);
      _push(ssrRenderComponent(UploadImage, {
        ref_key: "referenceImagesUploadRef",
        ref: referenceImagesUploadRef,
        "input-id": "gpt4o-reference-images",
        label: "Reference Images (Optional)",
        "upload-icon": "fas fa-cloud-upload-alt",
        "upload-text": "Click to upload reference images",
        "upload-hint": "Supports .jfif, .jpeg, .jpg, .png, .webp (max 5 images)",
        "max-files": 5,
        "max-file-size": 10 * 1024 * 1024,
        "additional-hint": "Upload reference images to guide generation direction",
        "theme-color": "#667eea",
        "onUpdate:files": handleReferenceImages
      }, null, _parent));
      if (isUploadingRefs.value) {
        _push(`<div class="uploading-hint" data-v-adcce118><i class="fas fa-spinner fa-spin" data-v-adcce118></i> Uploading reference images... </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="form-group" data-v-adcce118><label class="checkbox-label" data-v-adcce118><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(formData.isEnhance) ? ssrLooseContain(formData.isEnhance, null) : formData.isEnhance) ? " checked" : ""} data-v-adcce118><span class="checkmark" data-v-adcce118></span> Prompt Enhancement (Suitable for 3D images and specific scenarios) </label></div><button type="submit"${ssrIncludeBooleanAttr(isGenerating.value || !formData.prompt.trim()) ? " disabled" : ""} class="generate-btn" data-v-adcce118>`);
      if (isGenerating.value) {
        _push(`<i class="fas fa-spinner fa-spin" data-v-adcce118></i>`);
      } else {
        _push(`<i class="fas fa-magic" data-v-adcce118></i>`);
      }
      _push(` ${ssrInterpolate(isGenerating.value ? "Generating..." : "Generate Image")}${ssrInterpolate(gpt4oImagePriceText.value)}</button></fieldset></form></div><div class="image-display-panel" data-v-adcce118><div class="image-header" data-v-adcce118><h4 data-v-adcce118>Image Preview</h4>`);
      if (!isDetailView.value && generatedImages.value.length > 0) {
        _push(`<div class="image-actions" data-v-adcce118><button class="btn-secondary" data-v-adcce118><i class="fas fa-trash" data-v-adcce118></i> Clear </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="image-container" data-v-adcce118>`);
      if (isDetailView.value && detailData.value && detailData.value.status === 2 && detailOutputImages.value.length > 0) {
        _push(`<div class="image-showcase" data-v-adcce118><!--[-->`);
        ssrRenderList(detailOutputImages.value, (image, index) => {
          _push(`<div class="image-item" data-v-adcce118><div class="image-wrapper" data-v-adcce118><img${ssrRenderAttr("src", image.url)}${ssrRenderAttr("alt", `Generated image ${index + 1}`)} data-v-adcce118><div class="image-overlay" data-v-adcce118><button class="action-btn" data-v-adcce118><i class="fas fa-download" data-v-adcce118></i></button><button class="action-btn" data-v-adcce118><i class="fas fa-copy" data-v-adcce118></i></button></div></div><div class="image-info" data-v-adcce118><span class="image-size" data-v-adcce118>${ssrInterpolate(image.size)}</span><span class="image-time" data-v-adcce118>${ssrInterpolate(image.timestamp)}</span></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (isDetailView.value && detailData.value && detailData.value.status === 3) {
        _push(`<div class="detail-failure-state" data-v-adcce118><div class="failure-icon" data-v-adcce118><i class="fas fa-exclamation-circle" data-v-adcce118></i></div><p class="failure-message" data-v-adcce118>Generation failed. You can debug the parameters and try generating again. Generation failure will not consume credits.</p></div>`);
      } else if (isDetailView.value && (!detailData.value || detailData.value.status === 1)) {
        _push(`<div class="detail-loading-state" data-v-adcce118><i class="fas fa-spinner fa-spin detail-spinner" data-v-adcce118></i><p data-v-adcce118>Generating...</p></div>`);
      } else if (isDetailView.value) {
        _push(`<div class="detail-loading-state" data-v-adcce118><p data-v-adcce118>No output images</p></div>`);
      } else if (!isDetailView.value && generatedImages.value.length > 0) {
        _push(`<div class="image-showcase" data-v-adcce118><!--[-->`);
        ssrRenderList(generatedImages.value, (image, index) => {
          _push(`<div class="image-item" data-v-adcce118><div class="image-wrapper" data-v-adcce118><img${ssrRenderAttr("src", image.url)}${ssrRenderAttr("alt", `Generated image ${index + 1}`)} data-v-adcce118><div class="image-overlay" data-v-adcce118><button class="action-btn" data-v-adcce118><i class="fas fa-download" data-v-adcce118></i></button><button class="action-btn" data-v-adcce118><i class="fas fa-copy" data-v-adcce118></i></button></div></div><div class="image-info" data-v-adcce118><span class="image-size" data-v-adcce118>${ssrInterpolate(image.size)}</span><span class="image-time" data-v-adcce118>${ssrInterpolate(image.timestamp)}</span></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (!isDetailView.value) {
        _push(`<div class="empty-state" data-v-adcce118><div class="empty-icon" data-v-adcce118><i class="fas fa-image" data-v-adcce118></i></div><h3 data-v-adcce118>Waiting for Image Generation</h3><p data-v-adcce118>Configure parameters and click the &quot;Generate Image&quot; button to start creating your AI image</p><div class="empty-features" data-v-adcce118><div class="feature-item" data-v-adcce118><i class="fas fa-palette" data-v-adcce118></i><span data-v-adcce118>Multiple Aspect Ratios</span></div><div class="feature-item" data-v-adcce118><i class="fas fa-upload" data-v-adcce118></i><span data-v-adcce118>Support Image Upload</span></div><div class="feature-item" data-v-adcce118><i class="fas fa-magic" data-v-adcce118></i><span data-v-adcce118>Intelligent Prompt Enhancement</span></div><div class="feature-item" data-v-adcce118><i class="fas fa-shield-alt" data-v-adcce118></i><span data-v-adcce118>Fallback Mechanism</span></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="usage-tips" data-v-adcce118><div class="tip-item" data-v-adcce118><span class="tip-icon" data-v-adcce118>\u2728</span><span data-v-adcce118>Provide detailed descriptive prompts for better results</span></div><div class="tip-item" data-v-adcce118><span class="tip-icon" data-v-adcce118>\u{1F5BC}\uFE0F</span><span data-v-adcce118>Upload reference images to guide generation direction</span></div><div class="tip-item" data-v-adcce118><span class="tip-icon" data-v-adcce118>\u{1F4D0}</span><span data-v-adcce118>Support multiple aspect ratios, choose the appropriate ratio</span></div><div class="tip-item" data-v-adcce118><span class="tip-icon" data-v-adcce118>\u{1F504}</span><span data-v-adcce118>Enable the fallback mechanism to improve generation success rate</span></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/GPT4oImageTool.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const GPT4oImageTool = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-adcce118"]]);

export { GPT4oImageTool as G };
//# sourceMappingURL=GPT4oImageTool-FgiKCLOE.mjs.map
