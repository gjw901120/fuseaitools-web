import { ref, computed, mergeProps, useSSRContext } from 'file://C:/project/fuseaitools-web/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderStyle } from 'file://C:/project/fuseaitools-web/node_modules/vue/server-renderer/index.mjs';
import { u as useToast } from './useToast-CATlmXE8.mjs';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = {
  __name: "UploadAudio",
  __ssrInlineRender: true,
  props: {
    inputId: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: "\u4E0A\u4F20\u97F3\u9891\u6587\u4EF6"
    },
    uploadIcon: {
      type: String,
      default: "fas fa-cloud-upload-alt"
    },
    uploadText: {
      type: String,
      default: "Click to upload audio file"
    },
    uploadHint: {
      type: String,
      default: "Supports MP3, WAV, M4A formats"
    },
    additionalHint: {
      type: String,
      default: ""
    },
    themeColor: {
      type: String,
      default: "#10b981"
    },
    maxDuration: {
      type: Number,
      default: null
      // 最大时长（秒）
    },
    maxFileSize: {
      type: Number,
      default: 10 * 1024 * 1024
      // 默认10MB
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:files"],
  setup(__props, { emit: __emit }) {
    useToast();
    ref(null);
    ref(null);
    const uploadedFile = ref(null);
    const isPlaying = ref(false);
    const currentTime = ref(0);
    const duration = ref(0);
    const progress = computed(() => {
      return duration.value > 0 ? currentTime.value / duration.value * 100 : 0;
    });
    const formatFileSize = (bytes) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };
    const formatTime = (seconds) => {
      if (isNaN(seconds)) return "0:00";
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _cssVars = { style: {
        ":--bdcb0a2e": __props.themeColor
      } };
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "uploaded-audio" }, _attrs, _cssVars))} data-v-dafeea89><div class="upload-container" data-v-dafeea89><input${ssrRenderAttr("id", __props.inputId)} type="file" accept="audio/*" class="file-input" data-v-dafeea89><div class="upload-area" data-v-dafeea89><div class="upload-content" data-v-dafeea89><div class="upload-icon" data-v-dafeea89><i class="${ssrRenderClass(__props.uploadIcon)}" data-v-dafeea89></i></div><div class="upload-text" data-v-dafeea89><span class="upload-title" data-v-dafeea89>${ssrInterpolate(__props.uploadText)}</span><small class="upload-subtitle" data-v-dafeea89>${ssrInterpolate(__props.uploadHint)}</small></div></div></div></div>`);
      if (uploadedFile.value) {
        _push(`<div class="uploaded-audio-display" data-v-dafeea89><div class="audio-file-info" data-v-dafeea89><i class="fas fa-file-audio audio-icon" data-v-dafeea89></i><div class="file-details" data-v-dafeea89><span class="file-name" data-v-dafeea89>${ssrInterpolate(uploadedFile.value.name)}</span><span class="file-size" data-v-dafeea89>${ssrInterpolate(formatFileSize(uploadedFile.value.size))}</span></div><button type="button" class="remove-btn" title="Remove file" data-v-dafeea89><i class="fas fa-times" data-v-dafeea89></i></button></div><div class="audio-player" data-v-dafeea89><button type="button" class="${ssrRenderClass([{ playing: isPlaying.value }, "play-pause-btn"])}"${ssrRenderAttr("title", isPlaying.value ? "Pause" : "Play")} data-v-dafeea89><i class="${ssrRenderClass(isPlaying.value ? "fas fa-pause" : "fas fa-play")}" data-v-dafeea89></i></button><div class="progress-container" data-v-dafeea89><div class="progress-bar" style="${ssrRenderStyle({ width: progress.value + "%" })}" data-v-dafeea89></div></div><span class="time-display" data-v-dafeea89>${ssrInterpolate(formatTime(currentTime.value))} / ${ssrInterpolate(formatTime(duration.value))}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.additionalHint) {
        _push(`<div class="additional-hint" data-v-dafeea89>${ssrInterpolate(__props.additionalHint)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<audio data-v-dafeea89></audio></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tools/common/UploadAudio.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const UploadAudio = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dafeea89"]]);

export { UploadAudio as U };
//# sourceMappingURL=UploadAudio-CGq6L9QH.mjs.map
