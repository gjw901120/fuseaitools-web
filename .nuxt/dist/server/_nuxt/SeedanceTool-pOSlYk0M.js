import { ref, watch, reactive, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { publicAssetsURL } from "#internal/nuxt/paths";
import { useRouter, useRoute } from "vue-router";
import { U as UploadImage } from "./UploadImage-D6DL1USQ.js";
import { u as useToast } from "./useToast-CATlmXE8.js";
import { u as useApi } from "./useApi-1a9EtG7k.js";
import { u as useRecordPolling } from "./useRecordPolling-QI_mIuwF.js";
import { u as useModelPrice } from "./useModelPrice-DCrt0_k3.js";
import { u as useBatchUploadUrl } from "./useBatchUploadUrl-_AVZ_-oO.js";
import { _ as _export_sfc } from "../server.mjs";
const _imports_0 = publicAssetsURL("/tools-logo/Seedance.png");
const _sfc_main = {
  __name: "SeedanceTool",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const route = useRoute();
    const { showError } = useToast();
    useApi();
    const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling();
    const { getPrice, formatCredits, discount } = useModelPrice();
    const batchUploadUrl = useBatchUploadUrl();
    const modeList = [
      { id: "v1-lite-text-to-video", label: "v1 Lite T2V", icon: "fas fa-font" },
      { id: "v1-lite-image-to-video", label: "v1 Lite I2V", icon: "fas fa-image" },
      { id: "v1-pro-text-to-video", label: "v1 Pro T2V", icon: "fas fa-font" },
      { id: "v1-pro-image-to-video", label: "v1 Pro I2V", icon: "fas fa-image" },
      { id: "v1-pro-fast-image-to-video", label: "v1 Pro Fast I2V", icon: "fas fa-bolt" },
      { id: "v1-5-pro", label: "v1.5 Pro", icon: "fas fa-video" }
    ];
    const modeTabToPath = {
      "v1-lite-text-to-video": "/home/seedance/v1-lite-text-to-video",
      "v1-lite-image-to-video": "/home/seedance/v1-lite-image-to-video",
      "v1-pro-text-to-video": "/home/seedance/v1-pro-text-to-video",
      "v1-pro-image-to-video": "/home/seedance/v1-pro-image-to-video",
      "v1-pro-fast-image-to-video": "/home/seedance/v1-pro-fast-image-to-video",
      "v1-5-pro": "/home/seedance/v1-5-pro"
    };
    const pathToMode = {};
    Object.keys(modeTabToPath).forEach((k) => {
      pathToMode[modeTabToPath[k]] = k;
    });
    const mode = ref("v1-lite-text-to-video");
    watch(() => route.path, (path) => {
      const m = pathToMode[path];
      if (m && mode.value !== m) mode.value = m;
    }, { immediate: true });
    const formData = reactive({
      prompt: "",
      imageUrl: "",
      endImageUrl: "",
      aspectRatio: "16:9",
      resolution: "720p",
      duration: "5",
      cameraFixed: false,
      inputUrls: [],
      fixedLens: false,
      generateAudio: false,
      seed: -1,
      enableSafetyChecker: true
    });
    const discountText = computed(() => {
      const rate = Number((discount == null ? void 0 : discount.value) ?? 1);
      if (Number.isNaN(rate) || rate <= 0 || rate === 1) return "";
      const percent = (rate * 100).toFixed(0);
      return ` · ${percent}%`;
    });
    const seedancePriceModelKeyMap = {
      "v1-lite-text-to-video": "seedance-v1-lite-text-to-video",
      "v1-lite-image-to-video": "seedance-v1-lite-image-to-video",
      "v1-pro-text-to-video": "seedance-v1-pro-text-to-video",
      "v1-pro-image-to-video": "seedance-v1-pro-image-to-video",
      "v1-pro-fast-image-to-video": "seedance-v1-pro-fast-image-to-video",
      "v1-5-pro": "seedance-1.5-pro"
    };
    const seedancePriceText = computed(() => {
      const modelKey = seedancePriceModelKeyMap[mode.value];
      if (!modelKey) return "";
      const priceFields = {
        duration: formData.duration,
        quality: formData.resolution
      };
      if (mode.value === "v1-5-pro") {
        priceFields.scene = formData.generateAudio ? "with_sound" : "without_sound";
      }
      const credits = getPrice(modelKey, priceFields);
      const str = formatCredits(credits);
      if (!str) return "";
      return `· ${str} credits${discountText.value}`;
    });
    const imageUploadRef = ref(null);
    const endImageUploadRef = ref(null);
    const pro15ImageUploadRef = ref(null);
    const isUploadingImage = ref(false);
    const isUploadingEndImage = ref(false);
    const isUploadingPro15Images = ref(false);
    const result = ref(null);
    const isGenerating = ref(false);
    const routeRecordId = computed(() => route.query["record-id"] || "");
    const isDetailView = computed(() => !!routeRecordId.value);
    const detailData = ref(null);
    const isTextToVideoMode = computed(() => mode.value === "v1-lite-text-to-video" || mode.value === "v1-pro-text-to-video");
    const isImageMode = computed(() => [
      "v1-lite-image-to-video",
      "v1-pro-image-to-video",
      "v1-pro-fast-image-to-video"
    ].includes(mode.value));
    const promptMaxLength = computed(() => mode.value === "v1-5-pro" ? 2500 : 1e4);
    const promptPlaceholder = computed(
      () => mode.value === "v1-5-pro" ? "Prompt for Seedance 1.5 Pro (3-2500 characters)" : "The text prompt used to generate the video (max 10000 characters)"
    );
    async function uploadFileToUrl(file) {
      var _a;
      if (!file) return "";
      const form = new FormData();
      form.append("file", file);
      const headers = { Accept: "application/json" };
      const token = typeof localStorage !== "undefined" ? localStorage.getItem("auth_token") : null;
      if (token) headers["Authorization"] = `Bearer ${token}`;
      const res = await fetch(batchUploadUrl, {
        method: "POST",
        headers,
        body: form,
        credentials: "include"
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err == null ? void 0 : err.errorMessage) || (err == null ? void 0 : err.message) || "Upload failed");
      }
      const data = await res.json();
      const urls = ((_a = data == null ? void 0 : data.data) == null ? void 0 : _a.urls) || (data == null ? void 0 : data.fileUrls) || (Array.isArray(data == null ? void 0 : data.data) ? data.data : []);
      const url = Array.isArray(urls) && urls.length ? urls[0] : "";
      return typeof url === "string" ? url : (url == null ? void 0 : url.url) || "";
    }
    async function handleImageFile(files) {
      var _a, _b;
      if (!(files == null ? void 0 : files.length)) {
        formData.imageUrl = "";
        return;
      }
      const file = Array.isArray(files) ? files[0] : files;
      isUploadingImage.value = true;
      try {
        formData.imageUrl = await uploadFileToUrl(file);
      } catch (e) {
        showError((e == null ? void 0 : e.message) || "Upload failed");
        formData.imageUrl = "";
        (_b = (_a = imageUploadRef.value) == null ? void 0 : _a.clearFiles) == null ? void 0 : _b.call(_a);
      } finally {
        isUploadingImage.value = false;
      }
    }
    async function handleEndImageFile(files) {
      var _a, _b;
      if (!(files == null ? void 0 : files.length)) {
        formData.endImageUrl = "";
        return;
      }
      const file = Array.isArray(files) ? files[0] : files;
      isUploadingEndImage.value = true;
      try {
        formData.endImageUrl = await uploadFileToUrl(file);
      } catch (e) {
        showError((e == null ? void 0 : e.message) || "Upload failed");
        formData.endImageUrl = "";
        (_b = (_a = endImageUploadRef.value) == null ? void 0 : _a.clearFiles) == null ? void 0 : _b.call(_a);
      } finally {
        isUploadingEndImage.value = false;
      }
    }
    async function handlePro15ImageFiles(files) {
      var _a, _b;
      if (!(files == null ? void 0 : files.length)) {
        formData.inputUrls = [];
        return;
      }
      isUploadingPro15Images.value = true;
      try {
        const list = Array.isArray(files) ? files.slice(0, 2) : [files];
        const urls = [];
        for (const f of list) {
          const url = await uploadFileToUrl(f);
          if (url) urls.push(url);
        }
        formData.inputUrls = urls;
      } catch (e) {
        showError((e == null ? void 0 : e.message) || "Upload failed");
        formData.inputUrls = [];
        (_b = (_a = pro15ImageUploadRef.value) == null ? void 0 : _a.clearFiles) == null ? void 0 : _b.call(_a);
      } finally {
        isUploadingPro15Images.value = false;
      }
    }
    const canGenerate = computed(() => {
      const p = (formData.prompt || "").trim();
      if (mode.value === "v1-5-pro") {
        if (p.length < 3 || p.length > 2500) return false;
        return formData.inputUrls.length <= 2;
      }
      if (!p || p.length > 1e4) return false;
      if (isImageMode.value) return !!formData.imageUrl;
      return true;
    });
    function pickDetailVideoUrl(d) {
      if (!d || typeof d !== "object") return "";
      let url = d.outputUrl || d.videoUrl;
      if (url) return typeof url === "string" ? url : (url == null ? void 0 : url.url) || "";
      const ou = d.outputUrls;
      if (typeof ou === "string" && ou) return ou;
      if (Array.isArray(ou) && ou.length) {
        const first = ou[0];
        return typeof first === "string" ? first : (first == null ? void 0 : first.url) || "";
      }
      return "";
    }
    const displayResult = computed(() => {
      if (isDetailView.value && detailData.value && Number(detailData.value.status) === 2) {
        const url = pickDetailVideoUrl(detailData.value);
        if (url) return { videoUrl: url };
      }
      return result.value;
    });
    function fillFormFromOriginalData(originalData) {
      if (!originalData || typeof originalData !== "object") return;
      const o = originalData;
      if (o.prompt != null) formData.prompt = String(o.prompt);
      if (o.aspectRatio) formData.aspectRatio = String(o.aspectRatio);
      if (o.resolution) formData.resolution = String(o.resolution);
      if (o.duration != null) formData.duration = String(o.duration);
      if (mode.value === "v1-5-pro") {
        if (Array.isArray(o.inputUrls)) formData.inputUrls = [...o.inputUrls];
        if ("fixedLens" in o) formData.fixedLens = !!o.fixedLens;
        if ("generateAudio" in o) formData.generateAudio = !!o.generateAudio;
        return;
      }
      if ("cameraFixed" in o) formData.cameraFixed = !!o.cameraFixed;
      if (o.seed != null && o.seed !== "") {
        const n = Number(o.seed);
        if (!Number.isNaN(n)) formData.seed = n;
      }
      if ("enableSafetyChecker" in o) formData.enableSafetyChecker = !!o.enableSafetyChecker;
      if (o.imageUrl) formData.imageUrl = String(o.imageUrl);
      if (o.endImageUrl) formData.endImageUrl = String(o.endImageUrl);
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
        console.error("Seedance load record detail failed:", e);
      }
    }
    watch(() => route.query["record-id"], (recordId) => {
      if (recordId) loadDetailByRecordId(recordId);
      else detailData.value = null;
    }, { immediate: true });
    watch(mode, (m) => {
      if (m === "v1-5-pro") {
        formData.aspectRatio = "1:1";
        formData.resolution = "720p";
        formData.duration = "8";
        formData.fixedLens = false;
        formData.generateAudio = false;
      }
      const path = modeTabToPath[m];
      if (path && route.path !== path) router.replace(path);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "seedance-tool" }, _attrs))} data-v-c858fcb0><div class="tool-header" data-v-c858fcb0><div class="tool-avatar" data-v-c858fcb0><img${ssrRenderAttr("src", _imports_0)} alt="Seedance" data-v-c858fcb0></div><div class="tool-details" data-v-c858fcb0><h3 data-v-c858fcb0>Seedance</h3><p class="tool-description" data-v-c858fcb0>Seedance is a multimodal AI video model by ByteDance that generates consistent, cinematic videos with strong multi-shot consistency and native audio using text, image, video, and audio references.</p></div></div><div class="mode-tabs-wrap" data-v-c858fcb0><div class="mode-tabs" data-v-c858fcb0><!--[-->`);
      ssrRenderList(modeList, (m) => {
        _push(`<div class="${ssrRenderClass([{ active: mode.value === m.id }, "mode-tab"])}" data-v-c858fcb0><i class="${ssrRenderClass(m.icon)}" data-v-c858fcb0></i><span data-v-c858fcb0>${ssrInterpolate(m.label)}</span></div>`);
      });
      _push(`<!--]--></div></div><div class="main-content" data-v-c858fcb0><div class="config-panel" data-v-c858fcb0><div class="config-header" data-v-c858fcb0><h4 data-v-c858fcb0>Configuration</h4></div><form class="config-form" data-v-c858fcb0><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-c858fcb0><div class="form-group" data-v-c858fcb0><label for="seedance-prompt" class="form-label" data-v-c858fcb0> Prompt <span class="required" data-v-c858fcb0>*</span></label><textarea id="seedance-prompt" class="form-input" rows="4"${ssrRenderAttr("placeholder", promptPlaceholder.value)}${ssrRenderAttr("maxlength", promptMaxLength.value)} required data-v-c858fcb0>${ssrInterpolate(formData.prompt)}</textarea>`);
      if (formData.prompt) {
        _push(`<div class="char-count" data-v-c858fcb0>${ssrInterpolate(formData.prompt.length)}/${ssrInterpolate(promptMaxLength.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (isImageMode.value) {
        _push(`<div class="form-group" data-v-c858fcb0><label class="form-label" data-v-c858fcb0> Image URL <span class="required" data-v-c858fcb0>*</span></label>`);
        _push(ssrRenderComponent(UploadImage, {
          ref_key: "imageUploadRef",
          ref: imageUploadRef,
          "input-id": "seedance-image-upload",
          label: "",
          "upload-text": "Click to upload image",
          "upload-hint": "JPEG, PNG, WebP; max 10MB",
          "max-files": 1,
          "max-file-size": 10 * 1024 * 1024,
          accept: "image/jpeg,image/png,image/webp",
          multiple: false,
          "onUpdate:files": handleImageFile
        }, null, _parent));
        if (isUploadingImage.value) {
          _push(`<span class="form-hint" data-v-c858fcb0>Uploading...</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (mode.value === "v1-lite-image-to-video") {
        _push(`<div class="form-group" data-v-c858fcb0><label class="form-label" data-v-c858fcb0>End Image URL (optional)</label>`);
        _push(ssrRenderComponent(UploadImage, {
          ref_key: "endImageUploadRef",
          ref: endImageUploadRef,
          "input-id": "seedance-end-image-upload",
          label: "",
          "upload-text": "Click to upload end frame image",
          "upload-hint": "Optional; JPEG, PNG, WebP; max 10MB",
          "max-files": 1,
          "max-file-size": 10 * 1024 * 1024,
          accept: "image/jpeg,image/png,image/webp",
          multiple: false,
          "onUpdate:files": handleEndImageFile
        }, null, _parent));
        if (isUploadingEndImage.value) {
          _push(`<span class="form-hint" data-v-c858fcb0>Uploading...</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (mode.value === "v1-5-pro") {
        _push(`<div class="form-group" data-v-c858fcb0><label class="form-label" data-v-c858fcb0>Input Image URLs (optional, 0-2)</label>`);
        _push(ssrRenderComponent(UploadImage, {
          ref_key: "pro15ImageUploadRef",
          ref: pro15ImageUploadRef,
          "input-id": "seedance-pro15-image-upload",
          label: "",
          "upload-text": "Click to upload image(s)",
          "upload-hint": "JPEG, PNG, WebP; max 10MB each; up to 2 images",
          "max-files": 2,
          "max-file-size": 10 * 1024 * 1024,
          accept: "image/jpeg,image/png,image/webp",
          multiple: true,
          "onUpdate:files": handlePro15ImageFiles
        }, null, _parent));
        if (isUploadingPro15Images.value) {
          _push(`<span class="form-hint" data-v-c858fcb0>Uploading...</span>`);
        } else {
          _push(`<!---->`);
        }
        if (isDetailView.value && ((_a = formData.inputUrls) == null ? void 0 : _a.length)) {
          _push(`<div class="detail-input-urls" data-v-c858fcb0><span class="form-label" data-v-c858fcb0>Input images (this task)</span><div class="detail-input-urls-links" data-v-c858fcb0><!--[-->`);
          ssrRenderList(formData.inputUrls, (u, idx) => {
            _push(`<a${ssrRenderAttr("href", u)} target="_blank" rel="noopener noreferrer" class="detail-input-url-link" data-v-c858fcb0>Image ${ssrInterpolate(idx + 1)}</a>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isTextToVideoMode.value || mode.value === "v1-5-pro") {
        _push(`<div class="form-group" data-v-c858fcb0><label for="seedance-aspect" class="form-label" data-v-c858fcb0>Aspect Ratio</label><div class="select-with-arrow" data-v-c858fcb0><select id="seedance-aspect" class="form-input" data-v-c858fcb0>`);
        if (mode.value === "v1-5-pro") {
          _push(`<!--[--><option value="1:1" data-v-c858fcb0${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "1:1") : ssrLooseEqual(formData.aspectRatio, "1:1")) ? " selected" : ""}>1:1</option><option value="4:3" data-v-c858fcb0${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "4:3") : ssrLooseEqual(formData.aspectRatio, "4:3")) ? " selected" : ""}>4:3</option><option value="3:4" data-v-c858fcb0${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "3:4") : ssrLooseEqual(formData.aspectRatio, "3:4")) ? " selected" : ""}>3:4</option><option value="16:9" data-v-c858fcb0${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "16:9") : ssrLooseEqual(formData.aspectRatio, "16:9")) ? " selected" : ""}>16:9</option><option value="9:16" data-v-c858fcb0${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "9:16") : ssrLooseEqual(formData.aspectRatio, "9:16")) ? " selected" : ""}>9:16</option><option value="21:9" data-v-c858fcb0${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "21:9") : ssrLooseEqual(formData.aspectRatio, "21:9")) ? " selected" : ""}>21:9</option><!--]-->`);
        } else if (mode.value === "v1-lite-text-to-video") {
          _push(`<!--[--><option value="16:9" data-v-c858fcb0${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "16:9") : ssrLooseEqual(formData.aspectRatio, "16:9")) ? " selected" : ""}>16:9</option><option value="4:3" data-v-c858fcb0${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "4:3") : ssrLooseEqual(formData.aspectRatio, "4:3")) ? " selected" : ""}>4:3</option><option value="1:1" data-v-c858fcb0${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "1:1") : ssrLooseEqual(formData.aspectRatio, "1:1")) ? " selected" : ""}>1:1</option><option value="3:4" data-v-c858fcb0${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "3:4") : ssrLooseEqual(formData.aspectRatio, "3:4")) ? " selected" : ""}>3:4</option><option value="9:16" data-v-c858fcb0${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "9:16") : ssrLooseEqual(formData.aspectRatio, "9:16")) ? " selected" : ""}>9:16</option><option value="9:21" data-v-c858fcb0${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "9:21") : ssrLooseEqual(formData.aspectRatio, "9:21")) ? " selected" : ""}>9:21</option><!--]-->`);
        } else {
          _push(`<!--[--><option value="21:9" data-v-c858fcb0${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "21:9") : ssrLooseEqual(formData.aspectRatio, "21:9")) ? " selected" : ""}>21:9</option><option value="16:9" data-v-c858fcb0${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "16:9") : ssrLooseEqual(formData.aspectRatio, "16:9")) ? " selected" : ""}>16:9</option><option value="4:3" data-v-c858fcb0${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "4:3") : ssrLooseEqual(formData.aspectRatio, "4:3")) ? " selected" : ""}>4:3</option><option value="1:1" data-v-c858fcb0${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "1:1") : ssrLooseEqual(formData.aspectRatio, "1:1")) ? " selected" : ""}>1:1</option><option value="3:4" data-v-c858fcb0${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "3:4") : ssrLooseEqual(formData.aspectRatio, "3:4")) ? " selected" : ""}>3:4</option><option value="9:16" data-v-c858fcb0${ssrIncludeBooleanAttr(Array.isArray(formData.aspectRatio) ? ssrLooseContain(formData.aspectRatio, "9:16") : ssrLooseEqual(formData.aspectRatio, "9:16")) ? " selected" : ""}>9:16</option><!--]-->`);
        }
        _push(`</select><i class="fas fa-chevron-down select-arrow-icon" data-v-c858fcb0></i></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-group" data-v-c858fcb0><label class="form-label" data-v-c858fcb0>Resolution</label><div class="tab-group" data-v-c858fcb0>`);
      if (mode.value !== "v1-pro-fast-image-to-video") {
        _push(`<button type="button" class="${ssrRenderClass([{ active: formData.resolution === "480p" }, "tab-option"])}" data-v-c858fcb0>480p</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="button" class="${ssrRenderClass([{ active: formData.resolution === "720p" }, "tab-option"])}" data-v-c858fcb0>720p</button><button type="button" class="${ssrRenderClass([{ active: formData.resolution === "1080p" }, "tab-option"])}" data-v-c858fcb0>1080p</button></div></div><div class="form-group" data-v-c858fcb0><label class="form-label" data-v-c858fcb0>Duration</label><div class="tab-group" data-v-c858fcb0>`);
      if (mode.value === "v1-5-pro") {
        _push(`<!--[--><button type="button" class="${ssrRenderClass([{ active: formData.duration === "4" }, "tab-option"])}" data-v-c858fcb0>4s</button><button type="button" class="${ssrRenderClass([{ active: formData.duration === "8" }, "tab-option"])}" data-v-c858fcb0>8s</button><button type="button" class="${ssrRenderClass([{ active: formData.duration === "12" }, "tab-option"])}" data-v-c858fcb0>12s</button><!--]-->`);
      } else {
        _push(`<!--[--><button type="button" class="${ssrRenderClass([{ active: formData.duration === "5" }, "tab-option"])}" data-v-c858fcb0>5s</button><button type="button" class="${ssrRenderClass([{ active: formData.duration === "10" }, "tab-option"])}" data-v-c858fcb0>10s</button><!--]-->`);
      }
      _push(`</div></div>`);
      if (mode.value !== "v1-pro-fast-image-to-video" && mode.value !== "v1-5-pro") {
        _push(`<!--[--><div class="form-group" data-v-c858fcb0><label class="checkbox-label" data-v-c858fcb0><input${ssrIncludeBooleanAttr(Array.isArray(formData.cameraFixed) ? ssrLooseContain(formData.cameraFixed, null) : formData.cameraFixed) ? " checked" : ""} type="checkbox" data-v-c858fcb0><span data-v-c858fcb0>Camera fixed</span></label></div><div class="form-group" data-v-c858fcb0><label for="seedance-seed" class="form-label" data-v-c858fcb0>Seed</label><input id="seedance-seed"${ssrRenderAttr("value", formData.seed)} type="number" class="form-input" placeholder="-1 for random" min="-1"${ssrRenderAttr("max", 2147483647)} data-v-c858fcb0><div class="form-hint" data-v-c858fcb0>Use -1 for random.</div></div>`);
        if (isTextToVideoMode.value || mode.value === "v1-pro-image-to-video") {
          _push(`<div class="form-group" data-v-c858fcb0><label class="checkbox-label" data-v-c858fcb0><input${ssrIncludeBooleanAttr(Array.isArray(formData.enableSafetyChecker) ? ssrLooseContain(formData.enableSafetyChecker, null) : formData.enableSafetyChecker) ? " checked" : ""} type="checkbox" data-v-c858fcb0><span data-v-c858fcb0>Enable safety checker</span></label></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (mode.value === "v1-5-pro") {
        _push(`<!--[--><div class="form-group" data-v-c858fcb0><label class="checkbox-label" data-v-c858fcb0><input${ssrIncludeBooleanAttr(Array.isArray(formData.fixedLens) ? ssrLooseContain(formData.fixedLens, null) : formData.fixedLens) ? " checked" : ""} type="checkbox" data-v-c858fcb0><span data-v-c858fcb0>Fixed lens</span></label><div class="form-hint" data-v-c858fcb0>Dynamic camera movement feature. Enable to lock camera and produce stable static shots.</div></div><div class="form-group" data-v-c858fcb0><label class="checkbox-label" data-v-c858fcb0><input${ssrIncludeBooleanAttr(Array.isArray(formData.generateAudio) ? ssrLooseContain(formData.generateAudio, null) : formData.generateAudio) ? " checked" : ""} type="checkbox" data-v-c858fcb0><span data-v-c858fcb0>Generate audio</span></label><div class="form-hint" data-v-c858fcb0>Generate audio for the video. Enabling audio increases generation cost.</div></div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-actions" data-v-c858fcb0><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(!canGenerate.value || isGenerating.value || isDetailView.value) ? " disabled" : ""} data-v-c858fcb0>`);
      if (isGenerating.value) {
        _push(`<i class="fas fa-spinner fa-spin" data-v-c858fcb0></i>`);
      } else {
        _push(`<i class="fas fa-play" data-v-c858fcb0></i>`);
      }
      _push(` ${ssrInterpolate(isGenerating.value ? "Generating..." : "Generate Video")} `);
      if (seedancePriceText.value) {
        _push(`<span class="price-tag" data-v-c858fcb0>${ssrInterpolate(seedancePriceText.value)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div></fieldset></form></div><div class="result-panel" data-v-c858fcb0><div class="video-header" data-v-c858fcb0><h4 data-v-c858fcb0>Result Preview</h4>`);
      if (result.value && !isDetailView.value) {
        _push(`<div class="video-actions" data-v-c858fcb0><button type="button" class="btn-secondary" data-v-c858fcb0><i class="fas fa-trash" data-v-c858fcb0></i> Clear </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (!isDetailView.value && unref(route).path === "/home/seedance/v1-5-pro") {
        _push(`<div class="tutorial-showcase" data-v-c858fcb0><p class="tutorial-showcase-title" data-v-c858fcb0>🎬 Tutorial Showcase</p><div class="tutorial-showcase-links" data-v-c858fcb0><a href="/news/seedance-nezha-i2v-props-race-tutorial" class="tutorial-link" data-v-c858fcb0> From Images to Video: Seedance I2V — Props Race &amp; Fight (Nezha &amp; Ao Bing) — sample workflow &amp; video </a></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="video-container" data-v-c858fcb0>`);
      if (isDetailView.value && Number((_b = detailData.value) == null ? void 0 : _b.status) === 3) {
        _push(`<div class="detail-failure-state" data-v-c858fcb0><div class="failure-icon" data-v-c858fcb0><i class="fas fa-exclamation-circle" data-v-c858fcb0></i></div><p class="failure-message" data-v-c858fcb0>Generation failed. You can try again with different parameters.</p></div>`);
      } else if (isDetailView.value && (!detailData.value || [0, 1].includes(Number(detailData.value.status)))) {
        _push(`<div class="detail-loading-state" data-v-c858fcb0><i class="fas fa-spinner fa-spin detail-spinner" data-v-c858fcb0></i><p data-v-c858fcb0>Generating...</p></div>`);
      } else if (!displayResult.value) {
        _push(`<div class="empty-state" data-v-c858fcb0><h4 data-v-c858fcb0>No video generated yet</h4><p data-v-c858fcb0>Fill in the form and click &quot;Generate Video&quot; to start.</p></div>`);
      } else {
        _push(`<div class="result-display" data-v-c858fcb0><div class="video-result" data-v-c858fcb0><div class="video-player" data-v-c858fcb0>`);
        if (displayResult.value.videoUrl) {
          _push(`<video${ssrRenderAttr("src", displayResult.value.videoUrl)} controls class="video-element" data-v-c858fcb0></video>`);
        } else {
          _push(`<div class="video-placeholder" data-v-c858fcb0><i class="fas fa-spinner fa-spin" data-v-c858fcb0></i><p data-v-c858fcb0>Generating...</p></div>`);
        }
        _push(`</div><div class="video-actions" data-v-c858fcb0>`);
        if (displayResult.value.videoUrl) {
          _push(`<button class="action-btn" data-v-c858fcb0><i class="fas fa-download" data-v-c858fcb0></i> Download </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      }
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/SeedanceTool.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SeedanceTool = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c858fcb0"]]);
export {
  SeedanceTool as S
};
//# sourceMappingURL=SeedanceTool-pOSlYk0M.js.map
