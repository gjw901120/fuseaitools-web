import { ref, reactive, computed, watch, mergeProps, useSSRContext } from 'file://C:/project/fuseaitools-web/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent, ssrLooseContain, ssrLooseEqual } from 'file://C:/project/fuseaitools-web/node_modules/vue/server-renderer/index.mjs';
import { p as publicAssetsURL } from '../_/renderer.mjs';
import { useRouter, useRoute } from 'file://C:/project/fuseaitools-web/node_modules/vue-router/dist/vue-router.node.mjs';
import { U as UploadImage } from './UploadImage-CdWm1sTQ.mjs';
import { u as useToast } from './useToast-CATlmXE8.mjs';
import { u as useRecordPolling } from './useRecordPolling-QI_mIuwF.mjs';
import { u as useBatchUploadUrl } from './useBatchUploadUrl-Wq7pvxpv.mjs';
import { _ as _export_sfc } from './server.mjs';

const _imports_0 = publicAssetsURL("/tools-logo/Kling.png");
const ASPECT_16_9 = "16:9";
const ASPECT_9_16 = "9:16";
const ASPECT_1_1 = "1:1";
const _sfc_main = {
  __name: "KlingTool",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const route = useRoute();
    const { showError } = useToast();
    const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling();
    const batchUploadUrl = useBatchUploadUrl();
    const modeList = [
      { id: "v2-5-turbo-image-to-video-pro", label: "v2.5 Turbo I2V Pro", icon: "fas fa-image" },
      { id: "v2-5-turbo-text-to-video-pro", label: "v2.5 Turbo T2V Pro", icon: "fas fa-keyboard" },
      { id: "v2-6-text-to-video", label: "2.6 Text to Video", icon: "fas fa-font" },
      { id: "v2-6-image-to-video", label: "2.6 Image to Video", icon: "fas fa-image" },
      { id: "v2-6-motion-control", label: "2.6 Motion Control", icon: "fas fa-route" },
      { id: "ai-avatar-standard", label: "AI Avatar Standard", icon: "fas fa-user" },
      { id: "ai-avatar-pro", label: "AI Avatar Pro", icon: "fas fa-user-tie" },
      { id: "v3-0-video", label: "3.0 Video", icon: "fas fa-film" }
    ];
    const modeTabToPath = {
      "v2-5-turbo-image-to-video-pro": "/home/kling/v2-5-turbo-image-to-video-pro",
      "v2-5-turbo-text-to-video-pro": "/home/kling/v2-5-turbo-text-to-video-pro",
      "v2-6-text-to-video": "/home/kling/v2-6-text-to-video",
      "v2-6-image-to-video": "/home/kling/v2-6-image-to-video",
      "v2-6-motion-control": "/home/kling/v2-6-motion-control",
      "ai-avatar-standard": "/home/kling/ai-avatar-standard",
      "ai-avatar-pro": "/home/kling/ai-avatar-pro",
      "v3-0-video": "/home/kling/v3-0-video"
    };
    const pathToMode = {};
    Object.keys(modeTabToPath).forEach((k) => {
      pathToMode[modeTabToPath[k]] = k;
    });
    const mode = ref("v2-5-turbo-image-to-video-pro");
    const formData = reactive({
      prompt: "",
      image_url: "",
      tail_image_url: "",
      image_urls: [],
      duration: "5",
      aspect_ratio: "16:9",
      negative_prompt: "",
      cfg_scale: 0.5,
      sound: false,
      input_urls: [],
      video_urls: [],
      character_orientation: "video",
      mode: "720p",
      audio_url: "",
      kling_mode: "std",
      kling_image_urls: [],
      kling_end_frame_url: "",
      v3_multi_shots: false,
      v3_multi_prompt: [{ prompt: "", duration: 3, element: null }],
      v3_aspect_ratio: "1:1",
      kling_elements: []
    });
    const imageUploadRef = ref(null);
    const i2v26ImageRef = ref(null);
    const tailImageUploadRef = ref(null);
    const motionImageRef = ref(null);
    ref(null);
    const avatarImageRef = ref(null);
    ref(null);
    const kling30ImageRef = ref(null);
    const kling30EndImageRef = ref(null);
    ref({});
    const klingShotElementUploadRefs = ref({});
    const isUploadingImage = ref(false);
    const isUploadingTail = ref(false);
    const isUploadingMotionImage = ref(false);
    const isUploadingMotionVideo = ref(false);
    const isUploadingAvatarImage = ref(false);
    const isUploadingAvatarAudio = ref(false);
    const isUploadingKling30Image = ref(false);
    const isUploadingKling30EndImage = ref(false);
    const isUploadingKlingElement = ref(false);
    const result = ref(null);
    const isGenerating = ref(false);
    const routeRecordId = computed(() => route.query["record-id"] || "");
    const isDetailView = computed(() => !!routeRecordId.value);
    const detailData = ref(null);
    const showPrompt = computed(() => ["v2-5-turbo-image-to-video-pro", "v2-5-turbo-text-to-video-pro", "v2-6-text-to-video", "v2-6-image-to-video", "v2-6-motion-control", "ai-avatar-standard", "ai-avatar-pro"].includes(mode.value));
    const modeAvatar = computed(() => mode.value === "ai-avatar-standard" || mode.value === "ai-avatar-pro");
    const promptMaxLength = computed(() => modeAvatar.value ? 5e3 : 2500);
    const promptPlaceholder = computed(() => modeAvatar.value ? "Prompt for video generation (max 5000)" : "Text description for the video (max 2500)");
    function tabClass(modeId) {
      return { active: mode.value === modeId };
    }
    const aspectRatio16_9Class = computed(() => ({ active: formData.aspect_ratio === ASPECT_16_9 }));
    const aspectRatio9_16Class = computed(() => ({ active: formData.aspect_ratio === ASPECT_9_16 }));
    const aspectRatio1_1Class = computed(() => ({ active: formData.aspect_ratio === ASPECT_1_1 }));
    computed(() => formData.v3_aspect_ratio === "1:1");
    computed(() => formData.v3_aspect_ratio === "16:9");
    computed(() => formData.v3_aspect_ratio === "9:16");
    const v3AspectRatio1_1Class = computed(() => ({ active: formData.v3_aspect_ratio === "1:1" }));
    const v3AspectRatio16_9Class = computed(() => ({ active: formData.v3_aspect_ratio === "16:9" }));
    const v3AspectRatio9_16Class = computed(() => ({ active: formData.v3_aspect_ratio === "9:16" }));
    const v3DurationOptions = computed(() => formData.v3_multi_shots ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] : [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    const v3MultiShotsOffClass = computed(() => ({ active: formData.v3_multi_shots === false }));
    const v3MultiShotsOnClass = computed(() => ({ active: formData.v3_multi_shots === true }));
    computed(() => formData.sound === false);
    computed(() => formData.sound === true);
    const v3SoundOffClass = computed(() => ({ active: formData.sound === false }));
    const v3SoundOnClass = computed(() => ({ active: formData.sound === true }));
    function setKlingShotElementRef(i, el) {
      if (el) klingShotElementUploadRefs.value[i] = el;
    }
    function duration5Class() {
      return { active: formData.duration === "5" };
    }
    function duration10Class() {
      return { active: formData.duration === "10" };
    }
    function soundOffClass() {
      return { active: formData.sound === false };
    }
    function soundOnClass() {
      return { active: formData.sound === true };
    }
    function orientationImageClass() {
      return { active: formData.character_orientation === "image" };
    }
    function orientationVideoClass() {
      return { active: formData.character_orientation === "video" };
    }
    function mode720Class() {
      return { active: formData.mode === "720p" };
    }
    function mode1080Class() {
      return { active: formData.mode === "1080p" };
    }
    function klingModeStdClass() {
      return { active: formData.kling_mode === "std" };
    }
    function klingModeProClass() {
      return { active: formData.kling_mode === "pro" };
    }
    async function uploadOneFile(file, isVideo = false) {
      var _a, _b;
      const form = new FormData();
      form.append("file", file);
      const headers = { Accept: "application/json" };
      const token = typeof localStorage !== "undefined" ? localStorage.getItem("auth_token") : null;
      if (token) headers["Authorization"] = `Bearer ${token}`;
      const res = await fetch(batchUploadUrl, { method: "POST", headers, body: form, credentials: "include" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err == null ? void 0 : err.errorMessage) || (err == null ? void 0 : err.message) || "Upload failed");
      }
      const data = await res.json();
      const urls = ((_a = data == null ? void 0 : data.data) == null ? void 0 : _a.urls) || (data == null ? void 0 : data.fileUrls) || (Array.isArray(data == null ? void 0 : data.data) ? data.data : []);
      const url = Array.isArray(urls) && urls.length ? urls[0] : ((_b = data == null ? void 0 : data.data) == null ? void 0 : _b.url) || "";
      return typeof url === "string" ? url : "";
    }
    async function handleSingleImage(files) {
      var _a, _b;
      if (!(files == null ? void 0 : files.length)) {
        formData.image_url = "";
        return;
      }
      isUploadingImage.value = true;
      try {
        formData.image_url = await uploadOneFile(Array.isArray(files) ? files[0] : files);
      } catch (e) {
        showError((e == null ? void 0 : e.message) || "Upload failed");
        formData.image_url = "";
        (_b = (_a = imageUploadRef.value) == null ? void 0 : _a.clearFiles) == null ? void 0 : _b.call(_a);
      } finally {
        isUploadingImage.value = false;
      }
    }
    async function handleTailImage(files) {
      var _a, _b;
      if (!(files == null ? void 0 : files.length)) {
        formData.tail_image_url = "";
        return;
      }
      isUploadingTail.value = true;
      try {
        formData.tail_image_url = await uploadOneFile(Array.isArray(files) ? files[0] : files);
      } catch (e) {
        showError((e == null ? void 0 : e.message) || "Upload failed");
        formData.tail_image_url = "";
        (_b = (_a = tailImageUploadRef.value) == null ? void 0 : _a.clearFiles) == null ? void 0 : _b.call(_a);
      } finally {
        isUploadingTail.value = false;
      }
    }
    async function handleImageUrlsSingle(files) {
      var _a, _b;
      if (!(files == null ? void 0 : files.length)) {
        formData.image_urls = [];
        return;
      }
      isUploadingImage.value = true;
      try {
        const url = await uploadOneFile(Array.isArray(files) ? files[0] : files);
        formData.image_urls = url ? [url] : [];
      } catch (e) {
        showError((e == null ? void 0 : e.message) || "Upload failed");
        formData.image_urls = [];
        (_b = (_a = i2v26ImageRef.value) == null ? void 0 : _a.clearFiles) == null ? void 0 : _b.call(_a);
      } finally {
        isUploadingImage.value = false;
      }
    }
    async function handleMotionImage(files) {
      var _a, _b;
      if (!(files == null ? void 0 : files.length)) {
        formData.input_urls = [];
        return;
      }
      isUploadingMotionImage.value = true;
      try {
        const url = await uploadOneFile(Array.isArray(files) ? files[0] : files);
        formData.input_urls = url ? [url] : [];
      } catch (e) {
        showError((e == null ? void 0 : e.message) || "Upload failed");
        formData.input_urls = [];
        (_b = (_a = motionImageRef.value) == null ? void 0 : _a.clearFiles) == null ? void 0 : _b.call(_a);
      } finally {
        isUploadingMotionImage.value = false;
      }
    }
    async function handleAvatarImage(files) {
      var _a, _b;
      if (!(files == null ? void 0 : files.length)) return;
      isUploadingAvatarImage.value = true;
      try {
        formData.image_url = await uploadOneFile(Array.isArray(files) ? files[0] : files);
      } catch (e) {
        showError((e == null ? void 0 : e.message) || "Upload failed");
        formData.image_url = "";
        (_b = (_a = avatarImageRef.value) == null ? void 0 : _a.clearFiles) == null ? void 0 : _b.call(_a);
      } finally {
        isUploadingAvatarImage.value = false;
      }
    }
    async function handleKling30Image(files) {
      var _a, _b;
      if (!(files == null ? void 0 : files.length)) {
        formData.kling_image_urls = [];
        return;
      }
      isUploadingKling30Image.value = true;
      try {
        const url = await uploadOneFile(Array.isArray(files) ? files[0] : files);
        formData.kling_image_urls = url ? [url] : [];
      } catch (e) {
        showError((e == null ? void 0 : e.message) || "Upload failed");
        formData.kling_image_urls = [];
        (_b = (_a = kling30ImageRef.value) == null ? void 0 : _a.clearFiles) == null ? void 0 : _b.call(_a);
      } finally {
        isUploadingKling30Image.value = false;
      }
    }
    async function handleKling30EndImage(files) {
      var _a, _b;
      if (!(files == null ? void 0 : files.length)) {
        formData.kling_end_frame_url = "";
        return;
      }
      isUploadingKling30EndImage.value = true;
      try {
        formData.kling_end_frame_url = await uploadOneFile(Array.isArray(files) ? files[0] : files);
      } catch (e) {
        showError((e == null ? void 0 : e.message) || "Upload failed");
        formData.kling_end_frame_url = "";
        (_b = (_a = kling30EndImageRef.value) == null ? void 0 : _a.clearFiles) == null ? void 0 : _b.call(_a);
      } finally {
        isUploadingKling30EndImage.value = false;
      }
    }
    watch(() => formData.v3_multi_shots, (multi) => {
      var _a, _b, _c;
      if (!multi && formData.v3_multi_prompt.length > 1) {
        const first = formData.v3_multi_prompt[0];
        const d = (_a = Number(first == null ? void 0 : first.duration)) != null ? _a : 5;
        formData.v3_multi_prompt = [{ prompt: (_b = first == null ? void 0 : first.prompt) != null ? _b : "", duration: d >= 3 && d <= 15 ? d : 5, element: (_c = first == null ? void 0 : first.element) != null ? _c : null }];
      }
    }, { flush: "sync" });
    const v3MultiShotTotalDuration = computed(() => {
      return formData.v3_multi_prompt.reduce((sum, s) => sum + (Number(s.duration) || 0), 0);
    });
    async function handleKlingShotElementImages(shotIdx, files) {
      const shot = formData.v3_multi_prompt[shotIdx];
      if (!(shot == null ? void 0 : shot.element)) return;
      if (!(files == null ? void 0 : files.length)) {
        shot.element.element_input_urls = [];
        return;
      }
      isUploadingKlingElement.value = true;
      try {
        const fileList = Array.isArray(files) ? files : [files];
        if (fileList.length < 2 || fileList.length > 50) {
          showError("Element requires 2-50 images");
          return;
        }
        const urls = [];
        for (const f of fileList) {
          const url = await uploadOneFile(f);
          if (url) urls.push(url);
        }
        shot.element.element_input_urls = urls;
      } catch (e) {
        showError((e == null ? void 0 : e.message) || "Upload failed");
        shot.element.element_input_urls = [];
        const ref2 = klingShotElementUploadRefs.value[shotIdx];
        if (ref2 == null ? void 0 : ref2.clearFiles) ref2.clearFiles();
      } finally {
        isUploadingKlingElement.value = false;
      }
    }
    const canGenerate = computed(() => {
      const m = mode.value;
      const p = (formData.prompt || "").trim();
      if (m === "v2-5-turbo-image-to-video-pro") return p.length <= 2500 && !!formData.image_url;
      if (m === "v2-5-turbo-text-to-video-pro") return p.length <= 2500;
      if (m === "v2-6-text-to-video") return p.length <= 2500;
      if (m === "v2-6-image-to-video") return p.length <= 2500 && formData.image_urls.length > 0;
      if (m === "v2-6-motion-control") return formData.input_urls.length > 0 && formData.video_urls.length > 0;
      if (m === "ai-avatar-standard" || m === "ai-avatar-pro") return !!formData.image_url && !!formData.audio_url && p.length <= 5e3;
      if (m === "v3-0-video") {
        const shots = formData.v3_multi_prompt || [];
        if (formData.v3_multi_shots) {
          const total = shots.reduce((s, x) => s + (Number(x.duration) || 0), 0);
          const totalChars = shots.reduce((s, x) => s + (x.prompt || "").trim().length, 0);
          return shots.length >= 1 && shots.every((sh2) => (sh2.prompt || "").trim().length <= 500 && (Number(sh2.duration) || 0) >= 1 && (Number(sh2.duration) || 0) <= 12) && total >= 3 && total <= 15 && totalChars <= 2500;
        }
        const sh = shots[0];
        if (!sh) return false;
        const p2 = (sh.prompt || "").trim();
        const d = Number(sh.duration) || 0;
        return p2.length >= 1 && p2.length <= 2500 && d >= 3 && d <= 15;
      }
      return false;
    });
    const displayResult = computed(() => {
      var _a, _b, _c;
      if (isDetailView.value && detailData.value && Number(detailData.value.status) === 2) {
        const url = ((_a = detailData.value) == null ? void 0 : _a.outputUrl) || ((_b = detailData.value) == null ? void 0 : _b.videoUrl) || ((_c = detailData.value) == null ? void 0 : _c.outputUrls) && detailData.value.outputUrls[0];
        return url ? { videoUrl: url } : result.value;
      }
      return result.value;
    });
    const displayVideoUrl = computed(() => {
      const r = displayResult.value;
      return r && r.videoUrl || "";
    });
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
        console.error("Kling load record detail failed:", e);
      }
    }
    watch(() => route.query["record-id"], (recordId) => {
      if (recordId) loadDetailByRecordId(recordId);
      else detailData.value = null;
    }, { immediate: true });
    watch(() => route.path, (path) => {
      const next = pathToMode[path];
      if (next && mode.value !== next) mode.value = next;
    }, { immediate: true });
    watch(mode, (m) => {
      const path = modeTabToPath[m];
      if (path && route.path !== path) router.replace(path);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "kling-tool" }, _attrs))} data-v-276cdee5><div class="tool-header" data-v-276cdee5><div class="tool-avatar" data-v-276cdee5><img${ssrRenderAttr("src", _imports_0)} alt="Kling" data-v-276cdee5></div><div class="tool-details" data-v-276cdee5><h3 data-v-276cdee5>Kling</h3><p class="tool-description" data-v-276cdee5>Kling is the latest AI video generation model from Kuaishou Kling, designed for text-to-video and image-to-video creation. Compared to earlier versions, it features better prompt adherence, more fluid motion, consistent artistic styles, and realistic physics simulation.</p></div></div><div class="mode-tabs-wrap" data-v-276cdee5><div class="mode-tabs" data-v-276cdee5><!--[-->`);
      ssrRenderList(modeList, (m) => {
        _push(`<div class="${ssrRenderClass([tabClass(m.id), "mode-tab"])}" data-v-276cdee5><i class="${ssrRenderClass(m.icon)}" data-v-276cdee5></i><span data-v-276cdee5>${ssrInterpolate(m.label)}</span></div>`);
      });
      _push(`<!--]--></div></div><div class="main-content" data-v-276cdee5><div class="config-panel" data-v-276cdee5><div class="config-header" data-v-276cdee5><h4 data-v-276cdee5>Configuration</h4></div><form class="config-form" data-v-276cdee5><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value) ? " disabled" : ""} data-v-276cdee5>`);
      if (showPrompt.value) {
        _push(`<div class="form-group" data-v-276cdee5><label class="form-label" data-v-276cdee5>Prompt <span class="required" data-v-276cdee5>*</span></label><textarea class="form-input"${ssrRenderAttr("rows", modeAvatar.value ? 3 : 4)}${ssrRenderAttr("placeholder", promptPlaceholder.value)}${ssrRenderAttr("maxlength", promptMaxLength.value)} required data-v-276cdee5>${ssrInterpolate(formData.prompt)}</textarea>`);
        if (formData.prompt) {
          _push(`<div class="char-count" data-v-276cdee5>${ssrInterpolate(formData.prompt.length)}/${ssrInterpolate(promptMaxLength.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (mode.value === "v2-5-turbo-image-to-video-pro") {
        _push(`<div class="form-group" data-v-276cdee5><label class="form-label" data-v-276cdee5>Image URL <span class="required" data-v-276cdee5>*</span></label>`);
        _push(ssrRenderComponent(UploadImage, {
          ref_key: "imageUploadRef",
          ref: imageUploadRef,
          "input-id": "kling-i2v-pro-img",
          label: "",
          "upload-text": "Click to upload image",
          "upload-hint": "JPEG, PNG, WebP; max 10MB",
          "max-files": 1,
          "max-file-size": 10 * 1024 * 1024,
          accept: "image/jpeg,image/png,image/webp",
          multiple: false,
          "onUpdate:files": handleSingleImage
        }, null, _parent));
        if (isUploadingImage.value) {
          _push(`<span class="form-hint" data-v-276cdee5>Uploading...</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (mode.value === "v2-5-turbo-image-to-video-pro") {
        _push(`<div class="form-group" data-v-276cdee5><label class="form-label" data-v-276cdee5>Tail frame image (optional)</label>`);
        _push(ssrRenderComponent(UploadImage, {
          ref_key: "tailImageUploadRef",
          ref: tailImageUploadRef,
          "input-id": "kling-i2v-pro-tail",
          label: "",
          "upload-text": "Click to upload tail frame",
          "upload-hint": "Optional; JPEG, PNG, WebP; max 10MB",
          "max-files": 1,
          "max-file-size": 10 * 1024 * 1024,
          accept: "image/jpeg,image/png,image/webp",
          multiple: false,
          "onUpdate:files": handleTailImage
        }, null, _parent));
        if (isUploadingTail.value) {
          _push(`<span class="form-hint" data-v-276cdee5>Uploading...</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (mode.value === "v2-5-turbo-image-to-video-pro" || mode.value === "v2-5-turbo-text-to-video-pro") {
        _push(`<!--[--><div class="form-group" data-v-276cdee5><label class="form-label" data-v-276cdee5>Duration</label><div class="tab-group" data-v-276cdee5><button type="button" class="${ssrRenderClass([duration5Class(), "tab-option"])}" data-v-276cdee5>5s</button><button type="button" class="${ssrRenderClass([duration10Class(), "tab-option"])}" data-v-276cdee5>10s</button></div></div>`);
        if (mode.value === "v2-5-turbo-text-to-video-pro") {
          _push(`<div class="form-group" data-v-276cdee5><label class="form-label" data-v-276cdee5>Aspect ratio</label><div class="tab-group" data-v-276cdee5><button type="button" class="${ssrRenderClass([aspectRatio16_9Class.value, "tab-option"])}" data-v-276cdee5>16:9</button><button type="button" class="${ssrRenderClass([aspectRatio9_16Class.value, "tab-option"])}" data-v-276cdee5>9:16</button><button type="button" class="${ssrRenderClass([aspectRatio1_1Class.value, "tab-option"])}" data-v-276cdee5>1:1</button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="form-group" data-v-276cdee5><label class="form-label" data-v-276cdee5>Negative prompt (optional)</label><textarea class="form-input" rows="2"${ssrRenderAttr("maxlength", mode.value === "v2-5-turbo-image-to-video-pro" ? 2496 : 2500)} placeholder="Elements to avoid" data-v-276cdee5>${ssrInterpolate(formData.negative_prompt)}</textarea></div><div class="form-group" data-v-276cdee5><label class="form-label" data-v-276cdee5>CFG scale (0-1)</label><input${ssrRenderAttr("value", formData.cfg_scale)} type="number" min="0" max="1" step="0.1" class="form-input" data-v-276cdee5></div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (mode.value === "v2-6-text-to-video") {
        _push(`<!--[--><div class="form-group" data-v-276cdee5><label class="form-label" data-v-276cdee5>Sound</label><div class="tab-group" data-v-276cdee5><button type="button" class="${ssrRenderClass([soundOffClass(), "tab-option"])}" data-v-276cdee5>Off</button><button type="button" class="${ssrRenderClass([soundOnClass(), "tab-option"])}" data-v-276cdee5>On</button></div></div><div class="form-group" data-v-276cdee5><label class="form-label" data-v-276cdee5>Aspect ratio</label><div class="tab-group" data-v-276cdee5><button type="button" class="${ssrRenderClass([aspectRatio1_1Class.value, "tab-option"])}" data-v-276cdee5>1:1</button><button type="button" class="${ssrRenderClass([aspectRatio16_9Class.value, "tab-option"])}" data-v-276cdee5>16:9</button><button type="button" class="${ssrRenderClass([aspectRatio9_16Class.value, "tab-option"])}" data-v-276cdee5>9:16</button></div></div><div class="form-group" data-v-276cdee5><label class="form-label" data-v-276cdee5>Duration</label><div class="tab-group" data-v-276cdee5><button type="button" class="${ssrRenderClass([duration5Class(), "tab-option"])}" data-v-276cdee5>5s</button><button type="button" class="${ssrRenderClass([duration10Class(), "tab-option"])}" data-v-276cdee5>10s</button></div></div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (mode.value === "v2-6-image-to-video") {
        _push(`<!--[--><div class="form-group" data-v-276cdee5><label class="form-label" data-v-276cdee5>Image URLs <span class="required" data-v-276cdee5>*</span></label>`);
        _push(ssrRenderComponent(UploadImage, {
          ref_key: "i2v26ImageRef",
          ref: i2v26ImageRef,
          "input-id": "kling-26-i2v",
          label: "",
          "upload-text": "Click to upload image",
          "upload-hint": "JPEG, PNG, WebP; max 10MB",
          "max-files": 1,
          "max-file-size": 10 * 1024 * 1024,
          accept: "image/jpeg,image/png,image/webp",
          multiple: false,
          "onUpdate:files": handleImageUrlsSingle
        }, null, _parent));
        if (isUploadingImage.value) {
          _push(`<span class="form-hint" data-v-276cdee5>Uploading...</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-group" data-v-276cdee5><label class="form-label" data-v-276cdee5>Sound</label><div class="tab-group" data-v-276cdee5><button type="button" class="${ssrRenderClass([soundOffClass(), "tab-option"])}" data-v-276cdee5>Off</button><button type="button" class="${ssrRenderClass([soundOnClass(), "tab-option"])}" data-v-276cdee5>On</button></div></div><div class="form-group" data-v-276cdee5><label class="form-label" data-v-276cdee5>Duration</label><div class="tab-group" data-v-276cdee5><button type="button" class="${ssrRenderClass([duration5Class(), "tab-option"])}" data-v-276cdee5>5s</button><button type="button" class="${ssrRenderClass([duration10Class(), "tab-option"])}" data-v-276cdee5>10s</button></div></div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (mode.value === "v2-6-motion-control") {
        _push(`<!--[--><div class="form-group" data-v-276cdee5><label class="form-label" data-v-276cdee5>Reference image <span class="required" data-v-276cdee5>*</span></label>`);
        _push(ssrRenderComponent(UploadImage, {
          ref_key: "motionImageRef",
          ref: motionImageRef,
          "input-id": "kling-motion-img",
          label: "",
          "upload-text": "Click to upload reference image",
          "upload-hint": "JPG/PNG, max 10MB, min 300px",
          "max-files": 1,
          "max-file-size": 10 * 1024 * 1024,
          accept: "image/jpeg,image/png,image/jpg",
          multiple: false,
          "onUpdate:files": handleMotionImage
        }, null, _parent));
        if (isUploadingMotionImage.value) {
          _push(`<span class="form-hint" data-v-276cdee5>Uploading...</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-group" data-v-276cdee5><label class="form-label" data-v-276cdee5>Reference video <span class="required" data-v-276cdee5>*</span></label><input type="file" accept="video/mp4,video/quicktime,video/x-matroska" class="file-input-hidden" data-v-276cdee5><div class="upload-area" data-v-276cdee5>`);
        if (isUploadingMotionVideo.value) {
          _push(`<span data-v-276cdee5>Uploading...</span>`);
        } else if (formData.video_urls.length) {
          _push(`<span data-v-276cdee5>Video uploaded</span>`);
        } else {
          _push(`<span data-v-276cdee5>Click to upload video (MP4/MOV/MKV, max 100MB)</span>`);
        }
        _push(`</div></div><div class="form-group" data-v-276cdee5><label class="form-label" data-v-276cdee5>Character orientation</label><div class="tab-group" data-v-276cdee5><button type="button" class="${ssrRenderClass([orientationImageClass(), "tab-option"])}" data-v-276cdee5>Image</button><button type="button" class="${ssrRenderClass([orientationVideoClass(), "tab-option"])}" data-v-276cdee5>Video</button></div></div><div class="form-group" data-v-276cdee5><label class="form-label" data-v-276cdee5>Resolution</label><div class="tab-group" data-v-276cdee5><button type="button" class="${ssrRenderClass([mode720Class(), "tab-option"])}" data-v-276cdee5>720p</button><button type="button" class="${ssrRenderClass([mode1080Class(), "tab-option"])}" data-v-276cdee5>1080p</button></div></div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (modeAvatar.value) {
        _push(`<!--[--><div class="form-group" data-v-276cdee5><label class="form-label" data-v-276cdee5>Avatar image <span class="required" data-v-276cdee5>*</span></label>`);
        _push(ssrRenderComponent(UploadImage, {
          ref_key: "avatarImageRef",
          ref: avatarImageRef,
          "input-id": "kling-avatar-img",
          label: "",
          "upload-text": "Click to upload avatar image",
          "upload-hint": "JPEG, PNG, WebP; max 10MB",
          "max-files": 1,
          "max-file-size": 10 * 1024 * 1024,
          accept: "image/jpeg,image/png,image/webp",
          multiple: false,
          "onUpdate:files": handleAvatarImage
        }, null, _parent));
        if (isUploadingAvatarImage.value) {
          _push(`<span class="form-hint" data-v-276cdee5>Uploading...</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-group" data-v-276cdee5><label class="form-label" data-v-276cdee5>Audio URL <span class="required" data-v-276cdee5>*</span></label><input type="file" accept="audio/mpeg,audio/wav,audio/x-wav,audio/aac,audio/mp4,audio/ogg" class="file-input-hidden" data-v-276cdee5><div class="upload-area" data-v-276cdee5>`);
        if (isUploadingAvatarAudio.value) {
          _push(`<span data-v-276cdee5>Uploading...</span>`);
        } else if (formData.audio_url) {
          _push(`<span data-v-276cdee5>Audio uploaded</span>`);
        } else {
          _push(`<span data-v-276cdee5>Click to upload audio (MP3/WAV/AAC/OGG, max 10MB)</span>`);
        }
        _push(`</div></div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (mode.value === "v3-0-video") {
        _push(`<div data-v-276cdee5><div class="form-group" data-v-276cdee5><label class="form-label" data-v-276cdee5>Generation mode</label><div class="tab-group" data-v-276cdee5><button type="button" class="${ssrRenderClass([klingModeStdClass(), "tab-option"])}" data-v-276cdee5>std</button><button type="button" class="${ssrRenderClass([klingModeProClass(), "tab-option"])}" data-v-276cdee5>pro</button></div></div><div class="form-group" data-v-276cdee5><label class="form-label" data-v-276cdee5>Multi-shot</label><div class="tab-group" data-v-276cdee5><button type="button" class="${ssrRenderClass([v3MultiShotsOffClass.value, "tab-option"])}" data-v-276cdee5>Single shot</button><button type="button" class="${ssrRenderClass([v3MultiShotsOnClass.value, "tab-option"])}" data-v-276cdee5>Multi-shot</button></div><p class="form-hint" data-v-276cdee5>Single: one prompt, 3-15s. Multi-shot: up to 5 shots, each 1-12s, total 3-15s; sound must be On.</p></div><div class="form-group" data-v-276cdee5><label class="form-label" data-v-276cdee5>Start frame image (optional)</label>`);
        _push(ssrRenderComponent(UploadImage, {
          ref_key: "kling30ImageRef",
          ref: kling30ImageRef,
          "input-id": "kling-30-img",
          label: "",
          "upload-text": "Click to upload image",
          "upload-hint": "PNG, JPG, JPEG",
          "max-files": 1,
          "max-file-size": 10 * 1024 * 1024,
          accept: "image/png,image/jpeg,image/jpg",
          multiple: false,
          "onUpdate:files": handleKling30Image
        }, null, _parent));
        if (isUploadingKling30Image.value) {
          _push(`<span class="form-hint" data-v-276cdee5>Uploading...</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (!formData.v3_multi_shots) {
          _push(`<div class="form-group" data-v-276cdee5><label class="form-label" data-v-276cdee5>End frame image (optional, single shot)</label>`);
          _push(ssrRenderComponent(UploadImage, {
            ref_key: "kling30EndImageRef",
            ref: kling30EndImageRef,
            "input-id": "kling-30-end-img",
            label: "",
            "upload-text": "Click to upload end frame",
            "upload-hint": "PNG, JPG, JPEG",
            "max-files": 1,
            "max-file-size": 10 * 1024 * 1024,
            accept: "image/png,image/jpeg,image/jpg",
            multiple: false,
            "onUpdate:files": handleKling30EndImage
          }, null, _parent));
          if (isUploadingKling30EndImage.value) {
            _push(`<span class="form-hint" data-v-276cdee5>Uploading...</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="form-group" data-v-276cdee5><label class="form-label" data-v-276cdee5>Shots + Element</label><p class="form-hint" data-v-276cdee5>Add groups. Each: prompt + duration + optional element. Total duration 3-15s.</p><div class="shots-list" data-v-276cdee5><!--[-->`);
        ssrRenderList(formData.v3_multi_prompt, (shot, idx) => {
          _push(`<div class="shot-card" data-v-276cdee5><div class="shot-title" data-v-276cdee5>Shot ${ssrInterpolate(idx + 1)}</div><textarea class="shot-text" rows="3"${ssrRenderAttr("placeholder", "Describe this shot...")} maxlength="500" data-v-276cdee5>${ssrInterpolate(shot.prompt)}</textarea><div class="shot-footer" data-v-276cdee5><div class="duration-input" data-v-276cdee5><select class="duration-field duration-select" data-v-276cdee5><!--[-->`);
          ssrRenderList(v3DurationOptions.value, (d) => {
            _push(`<option${ssrRenderAttr("value", d)} data-v-276cdee5${ssrIncludeBooleanAttr(Array.isArray(shot.duration) ? ssrLooseContain(shot.duration, d) : ssrLooseEqual(shot.duration, d)) ? " selected" : ""}>${ssrInterpolate(d)}</option>`);
          });
          _push(`<!--]--></select><span class="duration-s" data-v-276cdee5>s</span></div>`);
          if (formData.v3_multi_shots && formData.v3_multi_prompt.length > 1) {
            _push(`<button type="button" class="shot-delete" title="Delete shot" data-v-276cdee5><i class="fas fa-trash" data-v-276cdee5></i></button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (shot.element) {
            _push(`<div class="v3-shot-element" data-v-276cdee5><div class="shot-element-label" data-v-276cdee5>Element for this shot</div><input${ssrRenderAttr("value", shot.element.name)} type="text" class="shot-text shot-text-single" placeholder="Element name (e.g. element_dog)" data-v-276cdee5><textarea class="shot-text shot-text-desc" rows="2" placeholder="Description (optional)" data-v-276cdee5>${ssrInterpolate(shot.element.description)}</textarea>`);
            _push(ssrRenderComponent(UploadImage, {
              ref_for: true,
              ref: (el) => setKlingShotElementRef(idx, el),
              "input-id": "kling-shot-el-" + idx,
              label: "",
              "upload-text": "2-50 images",
              "upload-hint": "JPG/PNG, 2-50 images",
              "max-files": 50,
              "max-file-size": 10 * 1024 * 1024,
              accept: "image/jpeg,image/jpg,image/png",
              multiple: true,
              "onUpdate:files": (files) => handleKlingShotElementImages(idx, files)
            }, null, _parent));
            _push(`<button type="button" class="btn-secondary" data-v-276cdee5>Remove element</button></div>`);
          } else {
            _push(`<button type="button" class="btn-secondary add-element-btn" data-v-276cdee5>+ Add element for this shot</button>`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
        if (formData.v3_multi_shots && formData.v3_multi_prompt.length < 5) {
          _push(`<button type="button" class="add-shot" data-v-276cdee5><i class="fas fa-plus" data-v-276cdee5></i> Add shot </button>`);
        } else {
          _push(`<!---->`);
        }
        if (formData.v3_multi_shots) {
          _push(`<p class="form-hint" data-v-276cdee5>Total: ${ssrInterpolate(v3MultiShotTotalDuration.value)}s (must be 3-15s).</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (!formData.v3_multi_shots) {
          _push(`<div data-v-276cdee5><div class="form-group" data-v-276cdee5><label class="form-label" data-v-276cdee5>Aspect ratio</label><div class="tab-group" data-v-276cdee5><button type="button" class="${ssrRenderClass([v3AspectRatio1_1Class.value, "tab-option"])}" data-v-276cdee5>1:1</button><button type="button" class="${ssrRenderClass([v3AspectRatio16_9Class.value, "tab-option"])}" data-v-276cdee5>16:9</button><button type="button" class="${ssrRenderClass([v3AspectRatio9_16Class.value, "tab-option"])}" data-v-276cdee5>9:16</button></div></div><div class="form-group" data-v-276cdee5><label class="form-label" data-v-276cdee5>Sound</label><div class="tab-group" data-v-276cdee5><button type="button" class="${ssrRenderClass([v3SoundOffClass.value, "tab-option"])}" data-v-276cdee5>Off</button><button type="button" class="${ssrRenderClass([v3SoundOnClass.value, "tab-option"])}" data-v-276cdee5>On</button></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-actions" data-v-276cdee5><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(!canGenerate.value || isGenerating.value) ? " disabled" : ""} data-v-276cdee5>`);
      if (isGenerating.value) {
        _push(`<i class="fas fa-spinner fa-spin" data-v-276cdee5></i>`);
      } else {
        _push(`<i class="fas fa-play" data-v-276cdee5></i>`);
      }
      _push(` ${ssrInterpolate(isGenerating.value ? "Generating..." : "Generate Video")}</button></div></fieldset></form></div><div class="result-panel" data-v-276cdee5>`);
      if (isDetailView.value && detailData.value && detailData.value.status === 3) {
        _push(`<div class="detail-failure-state" data-v-276cdee5><div class="failure-icon" data-v-276cdee5><i class="fas fa-exclamation-circle" data-v-276cdee5></i></div><p class="failure-message" data-v-276cdee5>Generation failed. You can try again with different parameters.</p></div>`);
      } else if (isDetailView.value && (!detailData.value || detailData.value.status === 1)) {
        _push(`<div class="detail-loading-state" data-v-276cdee5><i class="fas fa-spinner fa-spin detail-spinner" data-v-276cdee5></i><p data-v-276cdee5>Generating...</p></div>`);
      } else if (displayVideoUrl.value) {
        _push(`<div class="video-result" data-v-276cdee5><div class="video-player" data-v-276cdee5><video${ssrRenderAttr("src", displayVideoUrl.value)} controls class="video-element" data-v-276cdee5></video></div><div class="video-actions" data-v-276cdee5><button class="action-btn" data-v-276cdee5><i class="fas fa-download" data-v-276cdee5></i> Download</button></div></div>`);
      } else {
        _push(`<div class="empty-state" data-v-276cdee5><h4 data-v-276cdee5>No video generated yet</h4><p data-v-276cdee5>Fill in the form and click &quot;Generate Video&quot; to start.</p></div>`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/KlingTool.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const KlingTool = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-276cdee5"]]);

export { KlingTool as K };
//# sourceMappingURL=KlingTool-CN4Umoxm.mjs.map
