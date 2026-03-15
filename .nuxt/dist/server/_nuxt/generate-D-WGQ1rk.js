import { _ as __nuxt_component_0 } from "./HomeLayout-BhPmJPes.js";
import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { G as GPT4oImageTool } from "./GPT4oImageTool-FgiKCLOE.js";
import { useRouter } from "vue-router";
import { u as useToolSEO } from "./useToolSEO-Biuf6Haj.js";
import { u as useHead } from "./v3-DXSoGrP9.js";
import { _ as _export_sfc } from "../server.mjs";
import "./nuxt-link-BgkIFP7n.js";
import "C:/project/fuseaitools-web/node_modules/ufo/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/hookable/dist/index.mjs";
import "./client-only-BJZIIy-4.js";
import "C:/project/fuseaitools-web/node_modules/klona/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/defu/dist/defu.mjs";
import "#internal/nuxt/paths";
import "./useAuth-BT_C6798.js";
import "./UploadImage-CdWm1sTQ.js";
import "./useToast-CATlmXE8.js";
import "./useModelPrice-DcNReY6Y.js";
import "./useRecordPolling-QI_mIuwF.js";
import "./useBatchUploadUrl-Wq7pvxpv.js";
import "C:/project/fuseaitools-web/node_modules/nuxt/node_modules/@unhead/vue/dist/index.mjs";
import "ofetch";
import "C:/project/fuseaitools-web/node_modules/unctx/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/radix3/dist/index.mjs";
const _sfc_main = {
  __name: "generate",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const seoConfig = useToolSEO({
      name: "GPT 4o Image",
      description: "ChatGPT 4o Image, is OpenAI's latest AI image generation model. It understands both text and visual context, allowing developers to create and edit images with remarkable accuracy. Unlike traditional diffusion models, ChatGPT 4o Image follows instructions precisely, supports consistent styles, and renders legible text — making it ideal for applications in design, marketing, and creative automation.",
      category: "image",
      route: "/home/gpt-4o-image/generate",
      keywords: ["GPT 4o Image", "GPT-4o Image", "GPT-Image-1", "AI image generation", "OpenAI", "ChatGPT 4o Image", "image creation", "AI tools", "image generator", "AI art"],
      applicationCategory: "GraphicsApplication",
      offers: { price: "0", priceCurrency: "USD" }
    });
    useHead(seoConfig);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HomeLayout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_HomeLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="tool-page" data-v-36c023a5${_scopeId}>`);
            _push2(ssrRenderComponent(GPT4oImageTool, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "tool-page" }, [
                createVNode(GPT4oImageTool)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home/gpt-4o-image/generate.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const generate = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-36c023a5"]]);
export {
  generate as default
};
//# sourceMappingURL=generate-D-WGQ1rk.js.map
