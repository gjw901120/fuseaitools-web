import { ref, watch, computed, reactive, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent, ssrLooseContain } from "vue/server-renderer";
import { publicAssetsURL } from "#internal/nuxt/paths";
import { U as UploadImage } from "./UploadImage-D6DL1USQ.js";
import { u as useToast } from "./useToast-CATlmXE8.js";
import { u as useApi } from "./useApi-1a9EtG7k.js";
import { u as useAuth } from "./useAuth-BT_C6798.js";
import { u as useModelPrice } from "./useModelPrice-DCrt0_k3.js";
import { useRouter, useRoute } from "vue-router";
import { u as useRecordPolling } from "./useRecordPolling-QI_mIuwF.js";
import { u as useBatchUploadUrl } from "./useBatchUploadUrl-_AVZ_-oO.js";
import { _ as _export_sfc } from "../server.mjs";
const _imports_0 = publicAssetsURL("/tools-logo/Ideogram.png");
const _sfc_main = {
  __name: "IdeogramTool",
  __ssrInlineRender: true,
  setup(__props) {
    const { showError } = useToast();
    useApi();
    useAuth();
    const { getPrice, formatCredits, discount } = useModelPrice();
    const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling();
    const batchUploadUrl = useBatchUploadUrl();
    useRouter();
    const route = useRoute();
    const modeList = [
      { id: "v3-text-to-image", icon: "fas fa-keyboard" },
      { id: "v3-edit", icon: "fas fa-paint-brush" },
      { id: "v3-remix", icon: "fas fa-sync-alt" },
      { id: "v3-reframe", icon: "fas fa-crop-alt" },
      { id: "character", icon: "fas fa-user" },
      { id: "character-edit", icon: "fas fa-user-edit" },
      { id: "character-remix", icon: "fas fa-users" }
    ];
    const modeTabToPath = {
      "v3-text-to-image": "/home/ideogram/v3-text-to-image",
      "v3-edit": "/home/ideogram/v3-edit",
      "v3-remix": "/home/ideogram/v3-remix",
      "v3-reframe": "/home/ideogram/v3-reframe",
      "character": "/home/ideogram/character",
      "character-edit": "/home/ideogram/character-edit",
      "character-remix": "/home/ideogram/character-remix"
    };
    const pathToMode = {};
    Object.keys(modeTabToPath).forEach((k) => {
      pathToMode[modeTabToPath[k]] = k;
    });
    const mode = ref("v3-text-to-image");
    watch(() => route.path, (path) => {
      const m = pathToMode[path];
      if (m && mode.value !== m) mode.value = m;
    }, { immediate: true });
    const routeRecordId = computed(() => route.query["record-id"] || "");
    const isDetailView = computed(() => !!routeRecordId.value);
    const detailData = ref(null);
    const loadingRecordId = ref(null);
    const detailOutputItems = computed(() => {
      if (!detailData.value || Number(detailData.value.status) !== 2) return [];
      const urls = Array.isArray(detailData.value.outputUrls) ? detailData.value.outputUrls : [];
      return urls.map((u) => typeof u === "string" ? u : (u == null ? void 0 : u.url) ?? (u == null ? void 0 : u.imageUrl) ?? "").filter(Boolean).map((url) => ({ url }));
    });
    function getRouteRecordId() {
      return route.query["record-id"] || "";
    }
    function fillFormFromOriginalData(originalData) {
      if (!originalData || typeof originalData !== "object") return;
      const o = originalData;
      if (o.prompt != null) form.prompt = String(o.prompt);
      if (o.rendering_speed) form.rendering_speed = String(o.rendering_speed);
      else if (o.renderingSpeed) form.rendering_speed = String(o.renderingSpeed);
      if (o.style) form.style = String(o.style);
      if ("expand_prompt" in o) form.expand_prompt = !!o.expand_prompt;
      else if ("expandPrompt" in o) form.expand_prompt = !!o.expandPrompt;
      if (o.image_size) form.image_size = String(o.image_size);
      else if (o.imageSize) form.image_size = String(o.imageSize);
      if (o.seed !== void 0 && o.seed !== null) form.seed = o.seed;
      if (o.negative_prompt != null) form.negative_prompt = String(o.negative_prompt);
      else if (o.negativePrompt != null) form.negative_prompt = String(o.negativePrompt);
      if (o.image_url) form.image_url = String(o.image_url);
      else if (o.imageUrl) form.image_url = String(o.imageUrl);
      if (o.mask_url) form.mask_url = String(o.mask_url);
      else if (o.maskUrl) form.mask_url = String(o.maskUrl);
      if (Array.isArray(o.reference_image_urls)) form.reference_image_urls = [...o.reference_image_urls];
      else if (Array.isArray(o.referenceImageUrls)) form.reference_image_urls = [...o.referenceImageUrls];
      if (o.num_images != null) form.num_images = String(o.num_images);
      else if (o.numImages != null) form.num_images = String(o.numImages);
      if (o.strength != null && o.strength !== "") {
        const n = Number(o.strength);
        if (!Number.isNaN(n)) form.strength = n;
      }
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
        const st = Number(data == null ? void 0 : data.status);
        if (data != null && (st === 0 || st === 1)) {
          pollRecordByStatus(recordId, {
            getIsCancelled: () => getRouteRecordId() !== recordId
          }).then((res) => {
            if (getRouteRecordId() !== recordId) return;
            detailData.value = res;
            if (res == null ? void 0 : res.originalData) fillFormFromOriginalData(res.originalData);
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
    const discountText = computed(() => {
      const rate = Number((discount == null ? void 0 : discount.value) ?? 1);
      if (Number.isNaN(rate) || rate <= 0 || rate === 1) return "";
      const percent = (rate * 100).toFixed(0);
      return ` · ${percent}%`;
    });
    const IDEOGRAM_PRICE_KEY_BY_MODE = {
      "v3-text-to-image": "ideogram-v3-text-to-image",
      "v3-edit": "ideogram-v3-edit",
      "v3-remix": "ideogram-v3-remix",
      "v3-reframe": "ideogram-v3-reframe",
      "character": "ideogram-character",
      "character-edit": "ideogram-character-edit",
      "character-remix": "ideogram-character-remix"
    };
    const ideogramCreditsText = computed(() => {
      const key = IDEOGRAM_PRICE_KEY_BY_MODE[mode.value];
      if (!key) return "";
      const credits = getPrice(key, {
        speed: form.rendering_speed,
        scene: "generate"
      });
      const str = formatCredits(credits);
      return str ? `· ${str} credits${discountText.value}` : "";
    });
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
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ideogram-tool" }, _attrs))} data-v-66b80ab8><div class="tool-header" data-v-66b80ab8><div class="tool-avatar" data-v-66b80ab8><img${ssrRenderAttr("src", _imports_0)} alt="Ideogram" data-v-66b80ab8></div><div class="tool-details" data-v-66b80ab8><h3 data-v-66b80ab8>Ideogram</h3><p class="tool-description" data-v-66b80ab8>Ideogram is image generation model, offering text-to-image, image editing, reframing, and remixing with improved consistency and creative control.</p></div></div><div class="mode-tabs" data-v-66b80ab8><!--[-->`);
      ssrRenderList(modeList, (m) => {
        _push(`<div class="${ssrRenderClass([{ active: mode.value === m.id }, "mode-tab"])}" data-v-66b80ab8><i class="${ssrRenderClass(m.icon)}" data-v-66b80ab8></i><span data-v-66b80ab8>${ssrInterpolate(m.id)}</span></div>`);
      });
      _push(`<!--]--></div><div class="main-content" data-v-66b80ab8><div class="config-panel" data-v-66b80ab8><div class="config-header" data-v-66b80ab8><h4 data-v-66b80ab8>${ssrInterpolate(mode.value)}</h4></div><form class="config-form" data-v-66b80ab8><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-66b80ab8>`);
      if (mode.value !== "v3-reframe") {
        _push(`<div class="form-group" data-v-66b80ab8><label data-v-66b80ab8>Prompt ${ssrInterpolate(needsPrompt(mode.value) ? "*" : "")}</label><textarea rows="4" maxlength="5000" placeholder="Describe the image or edit..." data-v-66b80ab8>${ssrInterpolate(form.prompt)}</textarea><div class="char-count" data-v-66b80ab8>${ssrInterpolate(form.prompt.length)}/5000</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (needsImageUrl(mode.value)) {
        _push(`<div class="form-group" data-v-66b80ab8><label data-v-66b80ab8>Image URL *</label>`);
        if (isUploadingImage.value) {
          _push(`<span class="form-hint" data-v-66b80ab8><i class="fas fa-spinner fa-spin" data-v-66b80ab8></i> Uploading...</span>`);
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
        if (isDetailView.value && form.image_url) {
          _push(`<div class="detail-ref-row" data-v-66b80ab8><a${ssrRenderAttr("href", form.image_url)} target="_blank" rel="noopener noreferrer" data-v-66b80ab8>Source image (this task)</a></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (mode.value === "v3-edit" || mode.value === "character-edit") {
        _push(`<div class="form-group" data-v-66b80ab8><label data-v-66b80ab8>Mask URL *</label>`);
        if (isUploadingMask.value) {
          _push(`<span class="form-hint" data-v-66b80ab8><i class="fas fa-spinner fa-spin" data-v-66b80ab8></i> Uploading...</span>`);
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
        if (isDetailView.value && form.mask_url) {
          _push(`<div class="detail-ref-row" data-v-66b80ab8><a${ssrRenderAttr("href", form.mask_url)} target="_blank" rel="noopener noreferrer" data-v-66b80ab8>Mask (this task)</a></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (needsReferenceImages(mode.value)) {
        _push(`<div class="form-group" data-v-66b80ab8><label data-v-66b80ab8>Reference image(s) *</label>`);
        if (isUploadingRefs.value) {
          _push(`<span class="form-hint" data-v-66b80ab8><i class="fas fa-spinner fa-spin" data-v-66b80ab8></i> Uploading...</span>`);
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
        if (isDetailView.value && ((_a = form.reference_image_urls) == null ? void 0 : _a.length)) {
          _push(`<div class="detail-ref-row" data-v-66b80ab8><!--[-->`);
          ssrRenderList(form.reference_image_urls, (u, idx) => {
            _push(`<a${ssrRenderAttr("href", u)} target="_blank" rel="noopener noreferrer" data-v-66b80ab8>Reference ${ssrInterpolate(idx + 1)}</a>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-group" data-v-66b80ab8><label data-v-66b80ab8>Rendering speed</label><div class="tab-group" data-v-66b80ab8><button type="button" class="${ssrRenderClass([{ active: form.rendering_speed === "TURBO" }, "tab-option"])}" data-v-66b80ab8>Turbo</button><button type="button" class="${ssrRenderClass([{ active: form.rendering_speed === "BALANCED" }, "tab-option"])}" data-v-66b80ab8>Balanced</button><button type="button" class="${ssrRenderClass([{ active: form.rendering_speed === "QUALITY" }, "tab-option"])}" data-v-66b80ab8>Quality</button></div></div>`);
      if (mode.value !== "character-edit") {
        _push(`<div class="form-group" data-v-66b80ab8><label data-v-66b80ab8>Style</label><div class="tab-group tab-wrap" data-v-66b80ab8>`);
        if (isCharacterMode(mode.value)) {
          _push(`<!--[--><button type="button" class="${ssrRenderClass([{ active: form.style === "AUTO" }, "tab-option"])}" data-v-66b80ab8>AUTO</button><button type="button" class="${ssrRenderClass([{ active: form.style === "REALISTIC" }, "tab-option"])}" data-v-66b80ab8>REALISTIC</button><button type="button" class="${ssrRenderClass([{ active: form.style === "FICTION" }, "tab-option"])}" data-v-66b80ab8>FICTION</button><!--]-->`);
        } else {
          _push(`<!--[--><button type="button" class="${ssrRenderClass([{ active: form.style === "AUTO" }, "tab-option"])}" data-v-66b80ab8>Auto</button><button type="button" class="${ssrRenderClass([{ active: form.style === "GENERAL" }, "tab-option"])}" data-v-66b80ab8>General</button><button type="button" class="${ssrRenderClass([{ active: form.style === "REALISTIC" }, "tab-option"])}" data-v-66b80ab8>Realistic</button><button type="button" class="${ssrRenderClass([{ active: form.style === "DESIGN" }, "tab-option"])}" data-v-66b80ab8>Design</button><!--]-->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (needsImageSize(mode.value)) {
        _push(`<div class="form-group" data-v-66b80ab8><label data-v-66b80ab8>Image size ${ssrInterpolate(mode.value === "v3-reframe" ? "*" : "")}</label><div class="tab-group tab-wrap" data-v-66b80ab8><button type="button" class="${ssrRenderClass([{ active: form.image_size === "square" }, "tab-option"])}" data-v-66b80ab8>Square</button><button type="button" class="${ssrRenderClass([{ active: form.image_size === "square_hd" }, "tab-option"])}" data-v-66b80ab8>Square HD</button><button type="button" class="${ssrRenderClass([{ active: form.image_size === "portrait_4_3" }, "tab-option"])}" data-v-66b80ab8>Portrait 3:4</button><button type="button" class="${ssrRenderClass([{ active: form.image_size === "portrait_16_9" }, "tab-option"])}" data-v-66b80ab8>Portrait 9:16</button><button type="button" class="${ssrRenderClass([{ active: form.image_size === "landscape_4_3" }, "tab-option"])}" data-v-66b80ab8>Landscape 4:3</button><button type="button" class="${ssrRenderClass([{ active: form.image_size === "landscape_16_9" }, "tab-option"])}" data-v-66b80ab8>Landscape 16:9</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (needsPrompt(mode.value)) {
        _push(`<div class="form-group" data-v-66b80ab8><label class="checkbox-label" data-v-66b80ab8><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(form.expand_prompt) ? ssrLooseContain(form.expand_prompt, null) : form.expand_prompt) ? " checked" : ""} data-v-66b80ab8><span data-v-66b80ab8>Expand prompt (MagicPrompt)</span></label></div>`);
      } else {
        _push(`<!---->`);
      }
      if (needsNumImages(mode.value)) {
        _push(`<div class="form-group" data-v-66b80ab8><label data-v-66b80ab8>Number of images</label><div class="tab-group" data-v-66b80ab8><button type="button" class="${ssrRenderClass([{ active: form.num_images === "1" }, "tab-option"])}" data-v-66b80ab8>1</button><button type="button" class="${ssrRenderClass([{ active: form.num_images === "2" }, "tab-option"])}" data-v-66b80ab8>2</button><button type="button" class="${ssrRenderClass([{ active: form.num_images === "3" }, "tab-option"])}" data-v-66b80ab8>3</button><button type="button" class="${ssrRenderClass([{ active: form.num_images === "4" }, "tab-option"])}" data-v-66b80ab8>4</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (mode.value === "v3-remix" || mode.value === "character-remix") {
        _push(`<div class="form-group" data-v-66b80ab8><label data-v-66b80ab8>Strength</label><input type="range"${ssrRenderAttr("value", form.strength)} min="0.01" max="1" step="0.01" data-v-66b80ab8> ${ssrInterpolate(form.strength)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (needsNegativePrompt(mode.value)) {
        _push(`<div class="form-group" data-v-66b80ab8><label data-v-66b80ab8>Negative prompt</label><textarea rows="2" maxlength="5000" placeholder="What to exclude from the image" data-v-66b80ab8>${ssrInterpolate(form.negative_prompt)}</textarea></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-group" data-v-66b80ab8><label data-v-66b80ab8>Seed (optional)</label><input type="number"${ssrRenderAttr("value", form.seed)} placeholder="Leave empty for random" data-v-66b80ab8></div><div class="form-actions" data-v-66b80ab8><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(!canSubmit.value || isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-66b80ab8>`);
      if (isGenerating.value) {
        _push(`<i class="fas fa-spinner fa-spin" data-v-66b80ab8></i>`);
      } else {
        _push(`<i class="fas fa-magic" data-v-66b80ab8></i>`);
      }
      if (isGenerating.value) {
        _push(`<span data-v-66b80ab8>Generating...</span>`);
      } else {
        _push(`<span data-v-66b80ab8> Generate `);
        if (ideogramCreditsText.value) {
          _push(`<span class="price-tag" data-v-66b80ab8>${ssrInterpolate(ideogramCreditsText.value)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span>`);
      }
      _push(`</button></div></fieldset></form></div><div class="result-panel" data-v-66b80ab8><div class="result-header" data-v-66b80ab8><h4 data-v-66b80ab8>Result</h4>`);
      if (results.value.length > 0) {
        _push(`<button type="button" class="btn-secondary" data-v-66b80ab8><i class="fas fa-trash" data-v-66b80ab8></i> Clear</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="result-container" data-v-66b80ab8>`);
      if (isDetailView.value && (loadingRecordId.value || !detailData.value && routeRecordId.value)) {
        _push(`<div class="empty-state" data-v-66b80ab8><i class="fas fa-spinner fa-spin empty-icon" data-v-66b80ab8></i><p data-v-66b80ab8>Loading record...</p></div>`);
      } else if (isDetailView.value && detailData.value && Number(detailData.value.status) === 1) {
        _push(`<div class="empty-state" data-v-66b80ab8><i class="fas fa-spinner fa-spin empty-icon" data-v-66b80ab8></i><p data-v-66b80ab8>Generating...</p></div>`);
      } else if (isDetailView.value && detailData.value && Number(detailData.value.status) === 3) {
        _push(`<div class="empty-state" data-v-66b80ab8><i class="fas fa-exclamation-circle empty-icon" data-v-66b80ab8></i><p data-v-66b80ab8>Generation failed.</p></div>`);
      } else if (isDetailView.value && detailData.value && Number(detailData.value.status) === 2) {
        _push(`<!--[-->`);
        if (detailOutputItems.value.length > 0) {
          _push(`<!--[-->`);
          ssrRenderList(detailOutputItems.value, (item, idx) => {
            _push(`<div class="result-item" data-v-66b80ab8><img${ssrRenderAttr("src", item.url)}${ssrRenderAttr("alt", "Output " + (idx + 1))} class="result-image" loading="lazy" data-v-66b80ab8></div>`);
          });
          _push(`<!--]-->`);
        } else {
          _push(`<div class="result-item" data-v-66b80ab8><pre class="payload-json" data-v-66b80ab8>${ssrInterpolate(JSON.stringify(detailData.value, null, 2))}</pre></div>`);
        }
        _push(`<!--]-->`);
      } else if (results.value.length > 0) {
        _push(`<!--[-->`);
        ssrRenderList(results.value, (item, idx) => {
          _push(`<div class="result-item" data-v-66b80ab8>`);
          if (item.url) {
            _push(`<img${ssrRenderAttr("src", item.url)}${ssrRenderAttr("alt", "Output " + (idx + 1))} class="result-image" loading="lazy" data-v-66b80ab8>`);
          } else {
            _push(`<pre class="payload-json" data-v-66b80ab8>${ssrInterpolate(typeof item === "object" ? JSON.stringify(item, null, 2) : item)}</pre>`);
          }
          _push(`</div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<div class="empty-state" data-v-66b80ab8><i class="fas fa-image empty-icon" data-v-66b80ab8></i><p data-v-66b80ab8>Configure and click Generate.</p></div>`);
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
const IdeogramTool = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-66b80ab8"]]);
export {
  IdeogramTool as I
};
//# sourceMappingURL=IdeogramTool-DuhEQ7ad.js.map
