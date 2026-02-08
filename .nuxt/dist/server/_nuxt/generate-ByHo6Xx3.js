import { _ as __nuxt_component_0 } from "./HomeLayout-CFv173Mv.js";
import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { G as GPT4oImageTool } from "./GPT4oImageTool-DsDrJcLq.js";
import { useRouter } from "vue-router";
import { u as useToolSEO } from "./useToolSEO-CnGqkRSu.js";
import { u as useHead } from "./v3-DXSoGrP9.js";
import { _ as _export_sfc } from "../server.mjs";
import "./nuxt-link-BgkIFP7n.js";
import "C:/project/fuseaitools-web/node_modules/ufo/dist/index.mjs";
import "./useAuth-ComhLj5o.js";
import "#internal/nuxt/paths";
import "./UploadImage-a1UOMv8U.js";
import "./useToast-CATlmXE8.js";
import "./useModelPrice-BZpig2xf.js";
import "./useRecordPolling-DxMEWIpb.js";
import "C:/project/fuseaitools-web/node_modules/nuxt/node_modules/@unhead/vue/dist/index.mjs";
import "ofetch";
import "C:/project/fuseaitools-web/node_modules/hookable/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/unctx/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/radix3/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/defu/dist/defu.mjs";
const _sfc_main = {
  __name: "generate",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const seoConfig = useToolSEO({
      name: "GPT 4o Image",
      description: "Use GPT 4o Image for free online. Generate high-quality AI images using OpenAI's GPT 4o Image model, supporting multiple styles, scenes, and creative expressions. Easy-to-use image generation tool with advanced AI capabilities.",
      category: "image",
      route: "/home/gpt-4o-image/generate",
      keywords: ["GPT 4o Image", "GPT-4o Image", "AI image generation", "OpenAI", "artificial intelligence", "image creation", "AI tools", "DALL-E", "image generator", "AI art"],
      applicationCategory: "GraphicsApplication",
      offers: { price: "0", priceCurrency: "USD" }
    });
    useHead(seoConfig);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HomeLayout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_HomeLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="tool-page" data-v-2ef0ecfb${_scopeId}>`);
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
const generate = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2ef0ecfb"]]);
export {
  generate as default
};
//# sourceMappingURL=generate-ByHo6Xx3.js.map
