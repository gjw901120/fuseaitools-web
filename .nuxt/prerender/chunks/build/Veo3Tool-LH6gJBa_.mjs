import { inject, reactive, ref, watch, computed, mergeProps, useSSRContext } from 'file://C:/project/fuseaitools-web/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderComponent } from 'file://C:/project/fuseaitools-web/node_modules/vue/server-renderer/index.mjs';
import { p as publicAssetsURL } from '../_/renderer.mjs';
import { U as UploadImage } from './UploadImage-a1UOMv8U.mjs';
import { u as useAuth } from './useAuth-ComhLj5o.mjs';
import { u as useToast } from './useToast-CATlmXE8.mjs';
import { u as useModelPrice, a as useApi } from './useModelPrice-BZpig2xf.mjs';
import { u as useRecordPolling } from './useRecordPolling-DxMEWIpb.mjs';
import { useRouter, useRoute } from 'file://C:/project/fuseaitools-web/node_modules/vue-router/dist/vue-router.node.mjs';
import { _ as _export_sfc } from './server.mjs';

const _imports_0 = publicAssetsURL("/tools-logo/Veo.png");
const EXTEND_LIST_MODEL = "veo3";
const _sfc_main = {
  __name: "Veo3Tool",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const route = useRoute();
    inject("addToUsageHistory");
    const veo3PathToTab = {
      "/home/veo3/text-to-video": "TEXT_2_VIDEO",
      "/home/veo3/first-and-last-to-video": "FIRST_AND_LAST_FRAMES_2_VIDEO",
      "/home/veo3/reference-to-video": "REFERENCE_2_VIDEO",
      "/home/veo3/extend": "VIDEO_EXTEND"
    };
    const { getPrice, formatCredits } = useModelPrice();
    useAuth();
    const { showError } = useToast();
    const { get } = useApi();
    const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling();
    const uploadFilesToUrls = async (files) => {
      var _a, _b, _c;
      if (!files || (Array.isArray(files) ? files.length === 0 : !files)) return [];
      const list = Array.isArray(files) ? files : [files];
      const formDataUpload = new FormData();
      list.forEach((f) => formDataUpload.append("file", f));
      const headers = { Accept: "application/json" };
      const response = await fetch("/api/common/batch-upload", {
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
    const formData = reactive({
      prompt: "",
      imageUrls: [],
      model: "veo3_fast",
      generationType: "TEXT_2_VIDEO",
      watermark: "",
      aspectRatio: "16:9",
      seeds: null,
      enableTranslation: true,
      taskId: ""
    });
    const extendList = ref([]);
    const loadingExtendList = ref(false);
    const fetchExtendList = async () => {
      loadingExtendList.value = true;
      try {
        const data = await get(`/api/records/extend-list?model=${encodeURIComponent(EXTEND_LIST_MODEL)}`);
        extendList.value = Array.isArray(data) ? data : [];
      } catch {
        extendList.value = [];
      } finally {
        loadingExtendList.value = false;
      }
    };
    watch(() => formData.generationType, (type) => {
      if (type === "VIDEO_EXTEND") fetchExtendList();
    }, { immediate: true });
    const result = ref(null);
    watch(() => route.path, (path) => {
      const tab = veo3PathToTab[path];
      if (tab && formData.generationType !== tab) {
        formData.generationType = tab;
      }
    }, { immediate: true });
    const isGenerating = ref(false);
    const extendPrompt = ref("");
    const imageUploadRef = ref(null);
    const isUploadingImages = ref(false);
    const routeRecordId = computed(() => route.query["record-id"] || "");
    const isDetailView = computed(() => !!routeRecordId.value);
    const detailData = ref(null);
    const loadingRecordId = ref(null);
    const detailDelayTimer = ref(null);
    const displayResult = computed(() => {
      var _a2;
      var _a, _b, _c, _d;
      if (isDetailView.value && ((_a = detailData.value) == null ? void 0 : _a.status) === 2 && ((_c = (_b = detailData.value) == null ? void 0 : _b.outputUrls) == null ? void 0 : _c.length)) {
        const url = typeof detailData.value.outputUrls[0] === "string" ? detailData.value.outputUrls[0] : (_d = detailData.value.outputUrls[0]) == null ? void 0 : _d.url;
        const od = detailData.value.originalData || {};
        return { videoUrl: url, taskId: (_a2 = detailData.value.taskId) != null ? _a2 : od.taskId, ...od };
      }
      return result.value;
    });
    function fillFormFromOriginalData(originalData) {
      if (!originalData || typeof originalData !== "object") return;
      Object.keys(formData).forEach((k) => {
        if (originalData[k] !== void 0 && k in formData) formData[k] = originalData[k];
      });
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
          pollRecordByStatus(recordId, { getIsCancelled: () => getRouteRecordId() !== recordId }).then((res) => {
            if (getRouteRecordId() !== recordId) return;
            detailData.value = res;
            if (res == null ? void 0 : res.originalData) fillFormFromOriginalData(res.originalData);
          }).catch(() => {
          });
        }
      } catch (e) {
        console.error("Load record detail failed:", e);
      }
    }
    watch(() => route.query["record-id"], (recordId) => {
      if (detailDelayTimer.value) {
        clearTimeout(detailDelayTimer.value);
        detailDelayTimer.value = null;
      }
      if (recordId) {
        detailDelayTimer.value = setTimeout(() => {
          detailDelayTimer.value = null;
          loadDetailByRecordId(recordId);
        }, DETAIL_DELAY_MS);
      } else {
        detailData.value = null;
      }
    }, { immediate: true });
    const veo3PriceText = computed(() => {
      const key = formData.generationType === "VIDEO_EXTEND" ? "veo3_extend" : formData.model || "veo3_fast";
      const credits = getPrice(key);
      const str = formatCredits(credits);
      return str ? `(${str})` : "";
    });
    const DEFAULT_PLACEHOLDER_NAMES = ["veo3_start.webp", "veo3_end.webp", "veo3_i2v_one.webp", "veo3_i2v_two.webp", "veo3_i2v_three.webp"];
    watch(() => formData.generationType, async (newType) => {
      if (imageUploadRef.value) {
        imageUploadRef.value.clearFiles();
      }
      formData.imageUrls = [];
      if (newType === "FIRST_AND_LAST_FRAMES_2_VIDEO") {
        try {
          const startResponse = await fetch("/tools-example/veo3_start.webp");
          const endResponse = await fetch("/tools-example/veo3_end.webp");
          if (startResponse.ok && endResponse.ok) {
            const startBlob = await startResponse.blob();
            const endBlob = await endResponse.blob();
            const startFile = new File([startBlob], "veo3_start.webp", { type: "image/webp" });
            const endFile = new File([endBlob], "veo3_end.webp", { type: "image/webp" });
            await loadImagesToComponent([startFile, endFile]);
          }
        } catch (error) {
          console.error("Failed to load default placeholder images:", error);
        }
      } else if (newType === "REFERENCE_2_VIDEO") {
        formData.model = "veo3_fast";
        formData.aspectRatio = "16:9";
        try {
          const oneResponse = await fetch("/tools-example/veo3_i2v_one.webp");
          const twoResponse = await fetch("/tools-example/veo3_i2v_two.webp");
          const threeResponse = await fetch("/tools-example/veo3_i2v_three.webp");
          if (oneResponse.ok && twoResponse.ok && threeResponse.ok) {
            const oneBlob = await oneResponse.blob();
            const twoBlob = await twoResponse.blob();
            const threeBlob = await threeResponse.blob();
            const oneFile = new File([oneBlob], "veo3_i2v_one.webp", { type: "image/webp" });
            const twoFile = new File([twoBlob], "veo3_i2v_two.webp", { type: "image/webp" });
            const threeFile = new File([threeBlob], "veo3_i2v_three.webp", { type: "image/webp" });
            await loadImagesToComponent([oneFile, twoFile, threeFile]);
          }
        } catch (error) {
          console.error("Failed to load default placeholder images:", error);
        }
      } else if (newType === "TEXT_2_VIDEO") ;
      else if (newType === "VIDEO_EXTEND") {
        result.value = null;
      }
    });
    const loadImagesToComponent = async (files) => {
      var _a;
      try {
        const dataTransfer = new DataTransfer();
        files.forEach((file) => dataTransfer.items.add(file));
        if ((_a = imageUploadRef.value) == null ? void 0 : _a.$el) {
          const input = imageUploadRef.value.$el.querySelector('input[type="file"]');
          if (input) {
            input.files = dataTransfer.files;
            input.dispatchEvent(new Event("change", { bubbles: true }));
          }
        }
      } catch (error) {
        console.error("Failed to load placeholder images into component:", error);
      }
    };
    const canGenerate = computed(() => {
      if (!formData.prompt.trim()) return false;
      if (formData.generationType === "FIRST_AND_LAST_FRAMES_2_VIDEO") {
        return formData.imageUrls.length >= 1 && formData.imageUrls.length <= 2;
      } else if (formData.generationType === "REFERENCE_2_VIDEO") {
        return formData.imageUrls.length >= 1 && formData.imageUrls.length <= 3;
      } else if (formData.generationType === "VIDEO_EXTEND") {
        return formData.taskId.trim().length > 0;
      }
      return true;
    });
    const handleImageUpdate = async (files) => {
      var _a, _b;
      if (!files || Array.isArray(files) && files.length === 0) {
        formData.imageUrls = [];
        return;
      }
      const list = Array.isArray(files) ? files : [files];
      const isOnlyPlaceholders = list.every((f) => DEFAULT_PLACEHOLDER_NAMES.includes(f.name));
      if (isOnlyPlaceholders) {
        formData.imageUrls = [];
        return;
      }
      const maxCount = formData.generationType === "FIRST_AND_LAST_FRAMES_2_VIDEO" ? 2 : 3;
      if (list.length > maxCount) {
        showError(`Maximum ${maxCount} image(s) for this mode`);
        return;
      }
      isUploadingImages.value = true;
      try {
        formData.imageUrls = await uploadFilesToUrls(list);
      } catch (e) {
        showError(e.message || "Failed to upload images");
        formData.imageUrls = [];
        (_b = (_a = imageUploadRef.value) == null ? void 0 : _a.clearFiles) == null ? void 0 : _b.call(_a);
      } finally {
        isUploadingImages.value = false;
      }
    };
    const getImageUploadHint = () => {
      if (formData.generationType === "FIRST_AND_LAST_FRAMES_2_VIDEO") {
        return "1 image: revolve around this image; 2 images: first image as the first frame, second image as the last frame, generate transition video";
      } else if (formData.generationType === "REFERENCE_2_VIDEO") {
        return "Upload 1-3 reference images, AI will generate video content based on these images";
      }
      return "Upload reference images";
    };
    const getUploadHint = () => {
      if (formData.generationType === "FIRST_AND_LAST_FRAMES_2_VIDEO") {
        return "Supports 1-2 images, JPG/PNG format";
      } else if (formData.generationType === "REFERENCE_2_VIDEO") {
        return "Supports 1-3 images, JPG/PNG format";
      }
      return "Supports 1-3 images, JPG/PNG format";
    };
    const getPromptPlaceholder = () => {
      if (formData.generationType === "VIDEO_EXTEND") {
        return "Describe in detail how you want the video to extend, including actions, scene changes, styles, etc.";
      } else if (formData.generationType === "FIRST_AND_LAST_FRAMES_2_VIDEO") {
        return 'The camera performs a smooth 180-degree arc shot, starting with the front-facing view of the singer and circling around her to seamlessly end on the POV shot from behind her on stage. The singer sings "when you look me in the eyes, I can see a million stars.';
      } else if (formData.generationType === "REFERENCE_2_VIDEO") {
        return "Close up shot of woman with sunglasses on top of her head, gold hood earrings, is walking in the garden, she is lost and asks where everyone is and what's going on.";
      }
      return "A keyboard whose keys are made of different types of candy. Typing makes sweet, crunchy sounds. Audio: Crunchy, sugary typing sounds, delighted giggles.";
    };
    const getPromptHint = () => {
      if (formData.generationType === "VIDEO_EXTEND") {
        return "";
      }
      return "";
    };
    const getPreviewVideoSrc = () => {
      if (formData.generationType === "FIRST_AND_LAST_FRAMES_2_VIDEO") {
        return "/tools-example/veo3_frames.mp4";
      } else if (formData.generationType === "REFERENCE_2_VIDEO") {
        return "/tools-example/veo3_i2v.mp4";
      }
      return "/tools-example/veo3_t2v.mp4";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "veo3-tool" }, _attrs))} data-v-53871a0b><div class="tool-header" data-v-53871a0b><div class="tool-avatar" data-v-53871a0b><img${ssrRenderAttr("src", _imports_0)} alt="Veo3" data-v-53871a0b></div><div class="tool-details" data-v-53871a0b><h3 data-v-53871a0b>Veo 3</h3><p data-v-53871a0b>Google Veo 3 is a next-generation AI video generation model developed by Google DeepMind. It supports both text-to-video and image-to-video creation, producing high-fidelity, cinematic visuals with advanced scene understanding and natural motion simulation. users can access Veo 3 Fast for rapid, cost-efficient workflows or Veo 3 Quality for premium output, all with transparent pricing and stable infrastructure.</p></div></div><div class="mode-section" data-v-53871a0b><div class="mode-tabs" data-v-53871a0b><div class="${ssrRenderClass([{ active: formData.generationType === "TEXT_2_VIDEO" }, "mode-tab"])}" data-v-53871a0b><i class="fas fa-font" data-v-53871a0b></i><span data-v-53871a0b>Text to Video</span><div class="mode-info-icon" title="using only text prompts" data-v-53871a0b><i class="fas fa-info-circle" data-v-53871a0b></i></div></div><div class="${ssrRenderClass([{ active: formData.generationType === "FIRST_AND_LAST_FRAMES_2_VIDEO" }, "mode-tab"])}" data-v-53871a0b><i class="fas fa-images" data-v-53871a0b></i><span data-v-53871a0b>First And Last Frames to Video</span><div class="mode-info-icon" title="Generate a transition video using two images" data-v-53871a0b><i class="fas fa-info-circle" data-v-53871a0b></i></div></div><div class="${ssrRenderClass([{ active: formData.generationType === "REFERENCE_2_VIDEO" }, "mode-tab"])}" data-v-53871a0b><i class="fas fa-image" data-v-53871a0b></i><span data-v-53871a0b>Image to Video</span><div class="mode-info-icon" title="Generated based on source images (only supports Fast model and 16:9 aspect ratio)" data-v-53871a0b><i class="fas fa-info-circle" data-v-53871a0b></i></div></div><div class="${ssrRenderClass([{ active: formData.generationType === "VIDEO_EXTEND" }, "mode-tab"])}" data-v-53871a0b><i class="fas fa-expand-arrows-alt" data-v-53871a0b></i><span data-v-53871a0b>Video Extend</span><div class="mode-info-icon" title="This feature allows you to extend the duration or content of a video based on existing video clips and through prompt word descriptions." data-v-53871a0b><i class="fas fa-info-circle" data-v-53871a0b></i></div></div></div></div><div class="main-content" data-v-53871a0b><div class="config-panel" data-v-53871a0b><div class="config-header" data-v-53871a0b><h4 data-v-53871a0b>Video Generation Configuration</h4></div><form class="config-form" data-v-53871a0b><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-53871a0b>`);
      if (formData.generationType === "VIDEO_EXTEND") {
        _push(`<div class="form-group" data-v-53871a0b><label for="taskId" class="form-label" data-v-53871a0b> Original Task <span class="required" data-v-53871a0b>*</span></label><div class="select-with-arrow" data-v-53871a0b><select id="taskId" class="form-input" required${ssrIncludeBooleanAttr(loadingExtendList.value) ? " disabled" : ""} data-v-53871a0b><option value="" data-v-53871a0b${ssrIncludeBooleanAttr(Array.isArray(formData.taskId) ? ssrLooseContain(formData.taskId, "") : ssrLooseEqual(formData.taskId, "")) ? " selected" : ""}>Please select original task</option><!--[-->`);
        ssrRenderList(extendList.value, (item) => {
          _push(`<option${ssrRenderAttr("value", item.taskId)} data-v-53871a0b${ssrIncludeBooleanAttr(Array.isArray(formData.taskId) ? ssrLooseContain(formData.taskId, item.taskId) : ssrLooseEqual(formData.taskId, item.taskId)) ? " selected" : ""}>${ssrInterpolate(item.title || item.taskId)}</option>`);
        });
        _push(`<!--]--></select><i class="fas fa-chevron-down select-arrow-icon" aria-hidden="true" data-v-53871a0b></i></div>`);
        if (!loadingExtendList.value && extendList.value.length === 0) {
          _push(`<div class="form-hint input-hint-warn" data-v-53871a0b> Only tasks completed with Veo3 video generation can be used. </div>`);
        } else {
          _push(`<div class="form-hint" data-v-53871a0b> Select the original video generation task to extend. Note: Videos after 1080P generation cannot be extended </div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-group" data-v-53871a0b><label for="prompt" class="form-label" data-v-53871a0b>`);
      if (formData.generationType === "VIDEO_EXTEND") {
        _push(`<span data-v-53871a0b>Extension Description</span>`);
      } else {
        _push(`<span data-v-53871a0b>Generation prompt</span>`);
      }
      _push(`<span class="required" data-v-53871a0b>*</span></label><textarea id="prompt" class="form-input" rows="4"${ssrRenderAttr("placeholder", getPromptPlaceholder())} maxlength="1000" required data-v-53871a0b>${ssrInterpolate(formData.prompt)}</textarea>`);
      if (formData.prompt) {
        _push(`<div class="char-count" data-v-53871a0b>${ssrInterpolate(formData.prompt.length)}/1000</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-hint" data-v-53871a0b>${ssrInterpolate(getPromptHint())}</div></div>`);
      if (formData.generationType === "VIDEO_EXTEND") {
        _push(`<!--[--><div class="form-group" data-v-53871a0b><label for="seeds" class="form-label" data-v-53871a0b>Random Seed</label><input id="seeds"${ssrRenderAttr("value", formData.seeds)} type="number" class="form-input" placeholder="10000-99999" min="10000" max="99999" data-v-53871a0b><div class="form-hint" data-v-53871a0b> Range 10000-99999, same seed generates similar content, system auto-assigns if not filled </div></div><div class="form-group" data-v-53871a0b><label for="watermark" class="form-label" data-v-53871a0b>Watermark Text</label><input id="watermark"${ssrRenderAttr("value", formData.watermark)} type="text" class="form-input" placeholder="Optional, add watermark to generated video" data-v-53871a0b><div class="form-hint" data-v-53871a0b> Optional, will add watermark to generated video if provided </div></div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (formData.generationType === "FIRST_AND_LAST_FRAMES_2_VIDEO" || formData.generationType === "REFERENCE_2_VIDEO") {
        _push(`<div class="form-group" data-v-53871a0b><label class="form-label" data-v-53871a0b> Reference Images <span class="required" data-v-53871a0b>*</span>`);
        if (formData.generationType === "FIRST_AND_LAST_FRAMES_2_VIDEO") {
          _push(`<span class="mode-hint" data-v-53871a0b>(1-2 images)</span>`);
        } else {
          _push(`<!---->`);
        }
        if (formData.generationType === "REFERENCE_2_VIDEO") {
          _push(`<span class="mode-hint" data-v-53871a0b>(1-3 images)</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</label>`);
        if (isUploadingImages.value) {
          _push(`<span class="form-hint" data-v-53871a0b>Uploading images...</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(UploadImage, {
          ref_key: "imageUploadRef",
          ref: imageUploadRef,
          "input-id": "veo3-image-upload",
          label: "",
          "upload-icon": "fas fa-cloud-upload-alt",
          "upload-text": "Click to upload images",
          "upload-hint": getUploadHint(),
          "additional-hint": getImageUploadHint(),
          "theme-color": "#3b82f6",
          "max-files": formData.generationType === "FIRST_AND_LAST_FRAMES_2_VIDEO" ? 2 : 3,
          "max-file-size": 10 * 1024 * 1024,
          accept: "image/*",
          multiple: true,
          "onUpdate:files": handleImageUpdate
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (formData.generationType !== "VIDEO_EXTEND") {
        _push(`<div class="form-group" data-v-53871a0b><label class="form-label" data-v-53871a0b>Model Type</label><div class="option-tabs two-columns" data-v-53871a0b><button type="button" class="${ssrRenderClass([{ active: formData.model === "veo3" }, "option-tab"])}" data-v-53871a0b><i class="fas fa-star" data-v-53871a0b></i><span data-v-53871a0b>Standard</span></button><button type="button" class="${ssrRenderClass([{ active: formData.model === "veo3_fast" }, "option-tab"])}" data-v-53871a0b><i class="fas fa-bolt" data-v-53871a0b></i><span data-v-53871a0b>Fast</span></button></div><div class="form-hint" data-v-53871a0b> Standard model has higher quality, fast model generates faster </div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (formData.generationType !== "VIDEO_EXTEND" && formData.generationType !== "REFERENCE_2_VIDEO") {
        _push(`<div class="form-group" data-v-53871a0b><label class="form-label" data-v-53871a0b>Video Aspect Ratio</label><div class="option-tabs three-columns" data-v-53871a0b><button type="button" class="${ssrRenderClass([{ active: formData.aspectRatio === "16:9" }, "option-tab"])}" title="Supports 1080P" data-v-53871a0b><i class="fas fa-expand" data-v-53871a0b></i><span data-v-53871a0b>16:9</span></button><button type="button" class="${ssrRenderClass([{ active: formData.aspectRatio === "9:16" }, "option-tab"])}" data-v-53871a0b><i class="fas fa-compress" data-v-53871a0b></i><span data-v-53871a0b>9:16</span></button><button type="button" class="${ssrRenderClass([{ active: formData.aspectRatio === "Auto" }, "option-tab"])}" data-v-53871a0b><i class="fas fa-magic" data-v-53871a0b></i><span data-v-53871a0b>Auto</span></button></div><div class="form-hint" data-v-53871a0b> 16:9 supports 1080P HD video generation </div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (formData.generationType !== "VIDEO_EXTEND") {
        _push(`<div class="form-group" data-v-53871a0b><label for="watermark" class="form-label" data-v-53871a0b>Watermark Text</label><input id="watermark"${ssrRenderAttr("value", formData.watermark)} type="text" class="form-input" placeholder="Optional, add watermark to video" data-v-53871a0b></div>`);
      } else {
        _push(`<!---->`);
      }
      if (formData.generationType !== "VIDEO_EXTEND") {
        _push(`<div class="form-group" data-v-53871a0b><label for="seeds" class="form-label" data-v-53871a0b>Random Seed</label><input id="seeds"${ssrRenderAttr("value", formData.seeds)} type="number" min="10000" max="99999" class="form-input" placeholder="10000-99999, same seed generates similar content" data-v-53871a0b><div class="form-hint" data-v-53871a0b> Optional, used to control randomness of generated content </div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (formData.generationType !== "VIDEO_EXTEND") {
        _push(`<div class="form-group" data-v-53871a0b><label class="checkbox-label" for="enableTranslation" data-v-53871a0b><input id="enableTranslation"${ssrIncludeBooleanAttr(Array.isArray(formData.enableTranslation) ? ssrLooseContain(formData.enableTranslation, null) : formData.enableTranslation) ? " checked" : ""} type="checkbox" data-v-53871a0b><span class="checkmark" data-v-53871a0b></span> Enable Translation to English </label><div class="form-hint" data-v-53871a0b> Automatically translate prompts to English for better generation results </div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-actions" data-v-53871a0b><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(!canGenerate.value || isGenerating.value) ? " disabled" : ""} data-v-53871a0b>`);
      if (isGenerating.value) {
        _push(`<i class="fas fa-spinner fa-spin" data-v-53871a0b></i>`);
      } else {
        _push(`<i class="fas fa-play" data-v-53871a0b></i>`);
      }
      _push(` ${ssrInterpolate(isGenerating.value ? "Generating..." : "Generate Video")} `);
      if (veo3PriceText.value) {
        _push(`<span class="price-tag" data-v-53871a0b>${ssrInterpolate(veo3PriceText.value)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div></fieldset></form></div><div class="result-panel" data-v-53871a0b>`);
      if (isDetailView.value && detailData.value && detailData.value.status === 3) {
        _push(`<div class="detail-failure-state" data-v-53871a0b><div class="failure-icon" data-v-53871a0b><i class="fas fa-exclamation-circle" data-v-53871a0b></i></div><p class="failure-message" data-v-53871a0b>Generation failed. You can debug the parameters and try generating again. Generation failure will not consume credits.</p></div>`);
      } else if (isDetailView.value && (!detailData.value || detailData.value.status === 1)) {
        _push(`<div class="detail-loading-state" data-v-53871a0b><i class="fas fa-spinner fa-spin detail-spinner" data-v-53871a0b></i><p data-v-53871a0b>Generating...</p></div>`);
      } else if (!displayResult.value) {
        _push(`<div class="empty-state" data-v-53871a0b>`);
        if (formData.generationType !== "VIDEO_EXTEND") {
          _push(`<div class="preview-video-container" data-v-53871a0b><video${ssrRenderAttr("src", getPreviewVideoSrc())} controls class="preview-video" muted data-v-53871a0b></video></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<h4 data-v-53871a0b>No video generated yet</h4><p data-v-53871a0b>Enter video description and click &quot;Generate Video&quot; to start creating</p></div>`);
      } else {
        _push(`<div class="result-display" data-v-53871a0b><div class="video-result" data-v-53871a0b><div class="video-player" data-v-53871a0b>`);
        if (displayResult.value.videoUrl) {
          _push(`<video${ssrRenderAttr("src", displayResult.value.videoUrl)} controls class="video-element" data-v-53871a0b></video>`);
        } else {
          _push(`<div class="video-placeholder" data-v-53871a0b><i class="fas fa-video" data-v-53871a0b></i><p data-v-53871a0b>Video generating...</p></div>`);
        }
        _push(`</div><div class="video-info" data-v-53871a0b><h5 data-v-53871a0b>${ssrInterpolate(displayResult.value.taskId || "Video Generation Task")}</h5><div class="video-meta" data-v-53871a0b><span data-v-53871a0b><i class="fas fa-clock" data-v-53871a0b></i> ${ssrInterpolate(displayResult.value.duration || "Unknown duration")}</span><span data-v-53871a0b><i class="fas fa-expand" data-v-53871a0b></i> ${ssrInterpolate(displayResult.value.aspectRatio || "16:9")}</span><span data-v-53871a0b><i class="fas fa-cog" data-v-53871a0b></i> ${ssrInterpolate(displayResult.value.model || "veo3_fast")}</span></div></div><div class="video-actions" data-v-53871a0b><button class="action-btn" data-v-53871a0b><i class="fas fa-download" data-v-53871a0b></i> Download Video </button><button class="action-btn" data-v-53871a0b><i class="fas fa-share" data-v-53871a0b></i> Share Video </button>`);
        if (!isDetailView.value && displayResult.value.taskId) {
          _push(`<button class="action-btn" data-v-53871a0b><i class="fas fa-hd-video" data-v-53871a0b></i> Get 1080P </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        if (!isDetailView.value && displayResult.value.taskId) {
          _push(`<div class="video-extend" data-v-53871a0b><h6 data-v-53871a0b>Video Extension</h6><div class="extend-form" data-v-53871a0b><textarea class="form-input" rows="2" placeholder="Describe how to extend the video content..." data-v-53871a0b>${ssrInterpolate(extendPrompt.value)}</textarea><button class="extend-btn"${ssrIncludeBooleanAttr(!extendPrompt.value.trim()) ? " disabled" : ""} data-v-53871a0b><i class="fas fa-expand-arrows-alt" data-v-53871a0b></i> Extend Video </button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div></div><div class="usage-tips" data-v-53871a0b><div class="tip-item" data-v-53871a0b><span class="tip-icon" data-v-53871a0b>\u{1F3AC}</span><span data-v-53871a0b>Text to Video: Describe video content in detail, including actions, scenes, styles, etc.</span></div><div class="tip-item" data-v-53871a0b><span class="tip-icon" data-v-53871a0b>\u{1F5BC}\uFE0F</span><span data-v-53871a0b>Image to Video: Upload 1-3 reference images, supports multiple generation modes</span></div><div class="tip-item" data-v-53871a0b><span class="tip-icon" data-v-53871a0b>\u26A1</span><span data-v-53871a0b>Fast Model: Fast generation speed, suitable for quick previews and testing</span></div><div class="tip-item" data-v-53871a0b><span class="tip-icon" data-v-53871a0b>\u{1F3AF}</span><span data-v-53871a0b>Standard Model: Higher quality, suitable for final production</span></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/Veo3Tool.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Veo3Tool = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-53871a0b"]]);

export { Veo3Tool as V };
//# sourceMappingURL=Veo3Tool-LH6gJBa_.mjs.map
