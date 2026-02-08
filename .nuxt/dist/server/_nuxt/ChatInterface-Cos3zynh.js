import { _ as __nuxt_component_0 } from "./client-only-BJZIIy-4.js";
import { inject, computed, ref, watch, mergeProps, withCtx, createBlock, createCommentVNode, openBlock, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useRoute } from "vue-router";
import "C:/project/fuseaitools-web/node_modules/hookable/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/klona/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/defu/dist/defu.mjs";
import "#internal/nuxt/paths";
import { u as useAuth } from "./useAuth-ComhLj5o.js";
import { u as useToast } from "./useToast-CATlmXE8.js";
import { _ as _export_sfc } from "../server.mjs";
const _sfc_main = {
  __name: "ChatInterface",
  __ssrInlineRender: true,
  props: {
    toolName: {
      type: String,
      required: true
    },
    toolDescription: {
      type: String,
      required: true
    },
    toolIcon: {
      type: String,
      required: true
    },
    modelCategory: {
      type: String,
      default: null
    }
  },
  setup(__props) {
    const props = __props;
    inject("addToUsageHistory", null);
    const route = useRoute();
    const { user } = useAuth();
    const userAvatar = computed(() => {
      var _a;
      if (((_a = user.value) == null ? void 0 : _a.avatar) && user.value.avatar.trim()) {
        return user.value.avatar;
      }
      return "/default-avatar.svg";
    });
    const userName = computed(() => {
      var _a;
      return ((_a = user.value) == null ? void 0 : _a.name) && user.value.name.trim() ? user.value.name : "User";
    });
    useToast();
    const inputMessage = ref("");
    const chatMessages = ref([]);
    const uploadedFiles = ref([]);
    ref([]);
    ref(false);
    const selectedModel = ref("");
    const modelsData = ref(null);
    ref(false);
    const conversationId = ref("");
    const isStreaming = ref(false);
    ref(false);
    computed(() => route.query["record-id"] || "");
    async function loadChatDetailByRecordId(recordId) {
      return;
    }
    watch(
      () => route.query["record-id"],
      (recordId) => {
        if (recordId) loadChatDetailByRecordId();
        else {
          chatMessages.value = [];
          conversationId.value = "";
        }
      },
      { immediate: true }
    );
    const availableModels = computed(() => {
      if (!modelsData.value || !props.modelCategory) return [];
      const categoryList = modelsData.value.categoryList || modelsData.value.category_list;
      if (!categoryList || !Array.isArray(categoryList)) {
        console.warn("categoryList is not available or not an array:", modelsData.value);
        return [];
      }
      const category = categoryList.find(
        (cat) => cat && cat.name === props.modelCategory
      );
      if (!category) {
        console.warn("Category not found:", props.modelCategory, "Available categories:", categoryList.map((c) => c == null ? void 0 : c.name));
        return [];
      }
      const modelList = category.modelList || category.model_list;
      if (!modelList || !Array.isArray(modelList)) {
        console.warn("modelList is not available or not an array for category:", category);
        return [];
      }
      return modelList.filter((model) => model && model.type === "CHAT");
    });
    computed(() => {
      if (!selectedModel.value || !availableModels.value.length) return null;
      const modelId = typeof selectedModel.value === "string" ? parseInt(selectedModel.value, 10) : selectedModel.value;
      return availableModels.value.find((model) => {
        const modelIdNum = typeof model.id === "string" ? parseInt(model.id, 10) : model.id;
        return modelIdNum === modelId;
      }) || null;
    });
    const formatTime = (date) => {
      if (!date) return "";
      const d = new Date(date);
      const hours = String(d.getHours()).padStart(2, "0");
      const minutes = String(d.getMinutes()).padStart(2, "0");
      return `${hours}:${minutes}`;
    };
    const isImageFile = (url) => {
      if (!url) return false;
      const lowerUrl = url.toLowerCase();
      const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".svg", ".ico"];
      const hasImageExtension = imageExtensions.some((ext) => {
        const urlPath = lowerUrl.split("?")[0];
        return urlPath.endsWith(ext);
      });
      const hasImagePath = lowerUrl.includes("/image/") || lowerUrl.includes("image/");
      return hasImageExtension || hasImagePath;
    };
    const getFileName = (url) => {
      if (!url) return "File";
      try {
        const urlObj = new URL(url);
        const pathname = urlObj.pathname;
        const fileName = pathname.split("/").pop() || "File";
        return decodeURIComponent(fileName);
      } catch (e) {
        const parts = url.split("/");
        return parts[parts.length - 1] || "File";
      }
    };
    const formatMessageText = (text) => {
      if (!text) return "";
      return text;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "chat-interface" }, _attrs))} data-v-f923aa6d><div class="chat-header" data-v-f923aa6d><div class="chat-tool-info" data-v-f923aa6d><div class="tool-avatar" data-v-f923aa6d><img${ssrRenderAttr("src", __props.toolIcon)}${ssrRenderAttr("alt", __props.toolName)} data-v-f923aa6d></div><div class="tool-details" data-v-f923aa6d><h3 data-v-f923aa6d>${ssrInterpolate(__props.toolName)}</h3><p data-v-f923aa6d>${ssrInterpolate(__props.toolDescription)}</p></div></div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div><div class="chat-messages" data-v-f923aa6d><!--[-->`);
      ssrRenderList(chatMessages.value, (message) => {
        _push(`<div class="${ssrRenderClass([message.role, "message"])}" data-v-f923aa6d><div class="message-avatar" data-v-f923aa6d>`);
        if (message.role === "user") {
          _push(`<img${ssrRenderAttr("src", userAvatar.value)}${ssrRenderAttr("alt", userName.value || "User")} data-v-f923aa6d>`);
        } else {
          _push(`<img${ssrRenderAttr("src", __props.toolIcon)}${ssrRenderAttr("alt", __props.toolName)} data-v-f923aa6d>`);
        }
        _push(`</div><div class="message-content" data-v-f923aa6d><div class="message-text" data-v-f923aa6d>${formatMessageText(message.text) ?? ""}</div>`);
        if (message.fileUrls && message.fileUrls.length > 0) {
          _push(`<div class="message-files" data-v-f923aa6d><!--[-->`);
          ssrRenderList(message.fileUrls, (fileUrl, index) => {
            _push(`<div class="message-file-item" data-v-f923aa6d>`);
            if (isImageFile(fileUrl)) {
              _push(`<img${ssrRenderAttr("src", fileUrl)}${ssrRenderAttr("alt", `Image ${index + 1}`)} class="message-image" data-v-f923aa6d>`);
            } else {
              _push(`<a${ssrRenderAttr("href", fileUrl)} target="_blank" class="message-document"${ssrRenderAttr("title", getFileName(fileUrl))} data-v-f923aa6d><i class="fas fa-file" data-v-f923aa6d></i><span class="document-name" data-v-f923aa6d>${ssrInterpolate(getFileName(fileUrl))}</span></a>`);
            }
            _push(`</div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="message-time" data-v-f923aa6d>${ssrInterpolate(formatTime(message.timestamp))}</div></div></div>`);
      });
      _push(`<!--]--></div><div class="chat-input" data-v-f923aa6d><div class="input-actions" data-v-f923aa6d>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.modelCategory) {
              _push2(`<div class="model-select-wrapper" data-v-f923aa6d${_scopeId}><select class="model-select" disabled data-v-f923aa6d${_scopeId}><option data-v-f923aa6d${_scopeId}>Loading...</option></select></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              __props.modelCategory ? (openBlock(), createBlock("div", {
                key: 0,
                class: "model-select-wrapper"
              }, [
                createVNode("select", {
                  class: "model-select",
                  disabled: ""
                }, [
                  createVNode("option", null, "Loading...")
                ])
              ])) : createCommentVNode("", true)
            ];
          }
        })
      }, _parent));
      _push(`<button class="action-btn"${ssrRenderAttr("title", props.modelCategory === "DeepSeek" ? "Supports various types of documents, with a maximum size of 8M." : "Supports images and various types of documents, with a maximum size of 8M.")} data-v-f923aa6d><i class="fas fa-paperclip" data-v-f923aa6d></i></button>`);
      if (uploadedFiles.value.length > 0) {
        _push(`<div class="uploaded-files" data-v-f923aa6d><!--[-->`);
        ssrRenderList(uploadedFiles.value, (file, index) => {
          _push(`<div class="file-item" data-v-f923aa6d><span class="file-name" data-v-f923aa6d>${ssrInterpolate(file.name)}</span><button class="file-delete-btn" title="Delete File" data-v-f923aa6d><i class="fas fa-times" data-v-f923aa6d></i></button></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="input-container" data-v-f923aa6d><textarea placeholder="Enter your question or request..." rows="3" data-v-f923aa6d>${ssrInterpolate(inputMessage.value)}</textarea><button class="send-btn"${ssrIncludeBooleanAttr(!inputMessage.value.trim() || isStreaming.value) ? " disabled" : ""} data-v-f923aa6d>`);
      if (!isStreaming.value) {
        _push(`<i class="fas fa-paper-plane" data-v-f923aa6d></i>`);
      } else {
        _push(`<span data-v-f923aa6d>Sending...</span>`);
      }
      _push(`</button></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ChatInterface.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f923aa6d"]]);
export {
  __nuxt_component_1 as _
};
//# sourceMappingURL=ChatInterface-Cos3zynh.js.map
