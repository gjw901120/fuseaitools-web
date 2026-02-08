import { inject, reactive, ref, computed, watch, mergeProps, useSSRContext } from 'file://C:/project/fuseaitools-web/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderList } from 'file://C:/project/fuseaitools-web/node_modules/vue/server-renderer/index.mjs';
import { p as publicAssetsURL } from '../_/renderer.mjs';
import { useRouter, useRoute } from 'file://C:/project/fuseaitools-web/node_modules/vue-router/dist/vue-router.node.mjs';
import { u as useAuth } from './useAuth-ComhLj5o.mjs';
import { u as useToast } from './useToast-CATlmXE8.mjs';
import { u as useModelPrice } from './useModelPrice-BZpig2xf.mjs';
import { u as useRecordPolling } from './useRecordPolling-DxMEWIpb.mjs';
import { _ as _export_sfc } from './server.mjs';

const _imports_0 = publicAssetsURL("/tools-logo/Luma.png");
const _sfc_main = {
  __name: "LumaTool",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const route = useRoute();
    inject("addToUsageHistory");
    useAuth();
    const { getPrice, formatCredits } = useModelPrice();
    useToast();
    const { fetchRecordDetailOnce, pollRecordByStatus } = useRecordPolling();
    const formData = reactive({
      prompt: "",
      watermark: ""
    });
    const referenceVideo = ref("");
    const videoFile = ref(null);
    const uploadedVideoUrl = ref(null);
    const isUploadingVideo = ref(false);
    ref(null);
    const isGenerating = ref(false);
    const formatFileSize = (bytes) => {
      if (bytes == null || bytes === 0) return "0 B";
      const k = 1024;
      const sizes = ["B", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };
    const generatedVideos = ref([]);
    const routeRecordId = computed(() => route.query["record-id"] || "");
    const isDetailView = computed(() => !!routeRecordId.value);
    const detailData = ref(null);
    const loadingRecordId = ref(null);
    ref(null);
    computed(() => {
      var _a, _b, _c, _d, _e;
      if (isDetailView.value && ((_a = detailData.value) == null ? void 0 : _a.status) === 2 && ((_c = (_b = detailData.value) == null ? void 0 : _b.outputUrls) == null ? void 0 : _c.length)) {
        const url = typeof detailData.value.outputUrls[0] === "string" ? detailData.value.outputUrls[0] : (_d = detailData.value.outputUrls[0]) == null ? void 0 : _d.url;
        return [{ id: "detail", url, prompt: ((_e = detailData.value.originalData) == null ? void 0 : _e.prompt) || "", createdAt: (/* @__PURE__ */ new Date()).toISOString() }];
      }
      return generatedVideos.value;
    });
    function fillFormFromOriginalData(o) {
      if (!o || typeof o !== "object") return;
      Object.keys(formData).forEach((k) => {
        if (o[k] !== void 0) formData[k] = o[k];
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
        if (data != null && Number(data.status) === 1) pollRecordByStatus(recordId, { getIsCancelled: () => getRouteRecordId() !== recordId }).then((res) => {
          if (getRouteRecordId() !== recordId) return;
          detailData.value = res;
          if (res == null ? void 0 : res.originalData) fillFormFromOriginalData(res.originalData);
        }).catch(() => {
        });
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
    const lumaPriceText = computed(() => {
      const credits = getPrice("Luma");
      const str = formatCredits(credits);
      return str ? `(${str})` : "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "luma-tool" }, _attrs))} data-v-62cf1994><div class="tool-header" data-v-62cf1994><div class="tool-avatar" data-v-62cf1994><img${ssrRenderAttr("src", _imports_0)} alt="Luma" data-v-62cf1994></div><div class="tool-details" data-v-62cf1994><h3 data-v-62cf1994>Luma</h3><p data-v-62cf1994>Build and scale creative products with the world&#39;s most popular and intuitive Video and Image generation models with Luma.</p></div></div><div class="main-content" data-v-62cf1994><div class="config-panel" data-v-62cf1994><div class="config-header" data-v-62cf1994><h4 data-v-62cf1994>Video Modification Configuration</h4></div><form class="config-form" data-v-62cf1994><fieldset class="config-fieldset"${ssrIncludeBooleanAttr(isGenerating.value) ? " disabled" : ""} data-v-62cf1994><div class="form-group" data-v-62cf1994><label for="prompt" data-v-62cf1994>Modification Description *</label><textarea id="prompt" placeholder="Text prompt describing the desired video modification. Should be detailed and specific in describing the desired changes, describing the visual elements you want to add or modify. Important: English only." rows="4" required data-v-62cf1994>${ssrInterpolate(formData.prompt)}</textarea></div><div class="form-group" data-v-62cf1994><label class="form-label" data-v-62cf1994>Input Video *</label><div class="luma-video-upload" data-v-62cf1994><div class="${ssrRenderClass([{ "has-video": referenceVideo.value }, "luma-video-trigger"])}" data-v-62cf1994><input type="file" accept="video/*" class="luma-video-file-input" data-v-62cf1994><div class="luma-video-trigger-inner" data-v-62cf1994><i class="fas fa-cloud-upload-alt" data-v-62cf1994></i><span data-v-62cf1994>Click to upload video</span><small data-v-62cf1994>Supports MP4, MOV, AVI, max 500MB</small></div></div>`);
      if (isUploadingVideo.value) {
        _push(`<div class="luma-video-uploading" data-v-62cf1994><i class="fas fa-spinner fa-spin" data-v-62cf1994></i> Uploading video... </div>`);
      } else {
        _push(`<!---->`);
      }
      if (referenceVideo.value && !isUploadingVideo.value) {
        _push(`<div class="luma-video-display" data-v-62cf1994><div class="luma-video-preview-wrap" data-v-62cf1994><video${ssrRenderAttr("src", referenceVideo.value)} class="luma-video-preview" controls data-v-62cf1994></video><button type="button" class="luma-video-remove" title="Remove" data-v-62cf1994><i class="fas fa-times" data-v-62cf1994></i></button></div>`);
        if (videoFile.value) {
          _push(`<div class="luma-video-meta" data-v-62cf1994><span class="luma-video-name" data-v-62cf1994>${ssrInterpolate(videoFile.value.name)}</span><span class="luma-video-size" data-v-62cf1994>${ssrInterpolate(formatFileSize(videoFile.value.size))}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="form-hint" data-v-62cf1994> Input video for modification. Supports MP4, MOV, AVI formats, maximum 500MB, maximum 10 seconds. </div></div><div class="form-group" data-v-62cf1994><label for="watermark" data-v-62cf1994>Watermark Identifier</label><input id="watermark"${ssrRenderAttr("value", formData.watermark)} type="text" placeholder="your-watermark-id" data-v-62cf1994><div class="form-help" data-v-62cf1994> Optional parameter. If provided, a watermark will be added to the output video, which can be used for branding or identification purposes. </div></div><div class="form-actions" data-v-62cf1994><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(!((_a = formData.prompt) == null ? void 0 : _a.trim()) || !uploadedVideoUrl.value || isGenerating.value) ? " disabled" : ""} data-v-62cf1994>`);
      if (isGenerating.value) {
        _push(`<i class="fas fa-spinner fa-spin" data-v-62cf1994></i>`);
      } else {
        _push(`<i class="fas fa-magic" data-v-62cf1994></i>`);
      }
      _push(` ${ssrInterpolate(isGenerating.value ? "Modifying..." : "Modify Video")} `);
      if (lumaPriceText.value) {
        _push(`<span class="price-tag" data-v-62cf1994>${ssrInterpolate(lumaPriceText.value)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div></fieldset></form></div><div class="result-panel" data-v-62cf1994><div class="video-header" data-v-62cf1994><h4 data-v-62cf1994>Video Preview</h4>`);
      if (generatedVideos.value.length > 0) {
        _push(`<div class="video-actions" data-v-62cf1994><button class="btn-secondary" data-v-62cf1994><i class="fas fa-trash" data-v-62cf1994></i> Clear All </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="video-container" data-v-62cf1994>`);
      if (generatedVideos.value.length > 0) {
        _push(`<div class="video-showcase" data-v-62cf1994><!--[-->`);
        ssrRenderList(generatedVideos.value, (video, index) => {
          _push(`<div class="video-showcase-item" data-v-62cf1994><div class="video-player" data-v-62cf1994><video controls${ssrRenderAttr("src", video.url)}${ssrRenderAttr("poster", video.thumbnail)} data-v-62cf1994> Your browser does not support video playback </video></div><div class="video-details" data-v-62cf1994><div class="video-meta" data-v-62cf1994><span class="video-duration" data-v-62cf1994>${ssrInterpolate(video.duration)}</span><span class="video-size" data-v-62cf1994>${ssrInterpolate(video.size)}</span>`);
          if (video.watermark) {
            _push(`<span class="video-watermark" data-v-62cf1994>${ssrInterpolate(video.watermark)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="video-actions" data-v-62cf1994><button class="btn-icon" title="Download" data-v-62cf1994><i class="fas fa-download" data-v-62cf1994></i></button><button class="btn-icon" title="Share" data-v-62cf1994><i class="fas fa-share" data-v-62cf1994></i></button></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="empty-state" data-v-62cf1994><div class="empty-icon" data-v-62cf1994><i class="fas fa-magic" data-v-62cf1994></i></div><h3 data-v-62cf1994>Waiting to Modify Video</h3><p data-v-62cf1994>Enter video URL and modification description, click &quot;Modify Video&quot; button to start processing</p><div class="empty-features" data-v-62cf1994><div class="feature-item" data-v-62cf1994><i class="fas fa-cube" data-v-62cf1994></i><span data-v-62cf1994>3D Video Generation</span></div><div class="feature-item" data-v-62cf1994><i class="fas fa-edit" data-v-62cf1994></i><span data-v-62cf1994>Video Modification</span></div><div class="feature-item" data-v-62cf1994><i class="fas fa-eye" data-v-62cf1994></i><span data-v-62cf1994>Visual Effects</span></div></div></div>`);
      }
      _push(`</div></div></div><div class="usage-tips" data-v-62cf1994><div class="tip-item" data-v-62cf1994><span class="tip-icon" data-v-62cf1994>\u{1F310}</span><span data-v-62cf1994><strong data-v-62cf1994>English Description:</strong> All prompts must be in English, ensure description is accurate and clear</span></div><div class="tip-item" data-v-62cf1994><span class="tip-icon" data-v-62cf1994>\u{1F4DD}</span><span data-v-62cf1994><strong data-v-62cf1994>Detailed Description:</strong> Specifically describe the visual elements to add or modify</span></div><div class="tip-item" data-v-62cf1994><span class="tip-icon" data-v-62cf1994>\u{1F3A5}</span><span data-v-62cf1994><strong data-v-62cf1994>Video Requirements:</strong> Input video maximum 500MB, maximum 10 seconds</span></div><div class="tip-item" data-v-62cf1994><span class="tip-icon" data-v-62cf1994>\u{1F4C1}</span><span data-v-62cf1994><strong data-v-62cf1994>Format Support:</strong> Supports MP4, MOV, AVI formats</span></div><div class="tip-item" data-v-62cf1994><span class="tip-icon" data-v-62cf1994>\u{1F3AC}</span><span data-v-62cf1994><strong data-v-62cf1994>3D Effects:</strong> Focus on 3D scenes and three-dimensional visual effects</span></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/LumaTool.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const LumaTool = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-62cf1994"]]);

export { LumaTool as L };
//# sourceMappingURL=LumaTool-CBqJlv0D.mjs.map
