import { _ as __nuxt_component_0 } from "./HomeLayout-BhPmJPes.js";
import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { Q as QwenTool } from "./QwenTool-CgS96IMa.js";
import { u as useToolSEO } from "./useToolSEO-Biuf6Haj.js";
import { u as useHead } from "./v3-DXSoGrP9.js";
import { _ as _export_sfc } from "../server.mjs";
import "./nuxt-link-BgkIFP7n.js";
import "C:/project/fuseaitools-web/node_modules/ufo/dist/index.mjs";
import "vue-router";
import "C:/project/fuseaitools-web/node_modules/hookable/dist/index.mjs";
import "./client-only-BJZIIy-4.js";
import "C:/project/fuseaitools-web/node_modules/klona/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/defu/dist/defu.mjs";
import "#internal/nuxt/paths";
import "./useAuth-BT_C6798.js";
import "./UploadImage-CdWm1sTQ.js";
import "./useToast-CATlmXE8.js";
import "./useRecordPolling-QI_mIuwF.js";
import "./useModelPrice-DcNReY6Y.js";
import "./useBatchUploadUrl-Wq7pvxpv.js";
import "C:/project/fuseaitools-web/node_modules/nuxt/node_modules/@unhead/vue/dist/index.mjs";
import "ofetch";
import "C:/project/fuseaitools-web/node_modules/unctx/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/radix3/dist/index.mjs";
const _sfc_main = {
  __name: "text-to-image",
  __ssrInlineRender: true,
  setup(__props) {
    const seoConfig = useToolSEO({
      name: "Qwen Text to Image",
      description: "Qwen Text to Image - Generate images from text. Size, steps, guidance scale, seed, output format.",
      category: "image",
      route: "/home/qwen/text-to-image",
      keywords: ["Qwen", "Text to Image", "AI image"],
      applicationCategory: "ImageApplication",
      offers: { price: "0", priceCurrency: "USD" }
    });
    useHead(seoConfig);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HomeLayout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_HomeLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="tool-page" data-v-c3512b24${_scopeId}>`);
            _push2(ssrRenderComponent(QwenTool, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "tool-page" }, [
                createVNode(QwenTool)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home/qwen/text-to-image.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const textToImage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c3512b24"]]);
export {
  textToImage as default
};
//# sourceMappingURL=text-to-image-KBribJEU.js.map
