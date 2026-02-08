import { _ as __nuxt_component_0 } from "./HomeLayout-CFv173Mv.js";
import { _ as __nuxt_component_0$1 } from "./client-only-BJZIIy-4.js";
import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { S as SoraTool } from "./SoraTool-C_jJclwW.js";
import { u as useToolSEO } from "./useToolSEO-CnGqkRSu.js";
import { u as useHead } from "./v3-DXSoGrP9.js";
import { _ as _export_sfc } from "../server.mjs";
import "./nuxt-link-BgkIFP7n.js";
import "C:/project/fuseaitools-web/node_modules/ufo/dist/index.mjs";
import "vue-router";
import "./useAuth-ComhLj5o.js";
import "C:/project/fuseaitools-web/node_modules/hookable/dist/index.mjs";
import "#internal/nuxt/paths";
import "./UploadImage-a1UOMv8U.js";
import "./useToast-CATlmXE8.js";
import "./useModelPrice-BZpig2xf.js";
import "C:/project/fuseaitools-web/node_modules/nuxt/node_modules/@unhead/vue/dist/index.mjs";
import "ofetch";
import "C:/project/fuseaitools-web/node_modules/unctx/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/radix3/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/defu/dist/defu.mjs";
const _sfc_main = {
  __name: "watermark-remover",
  __ssrInlineRender: true,
  setup(__props) {
    const seoConfig = useToolSEO({
      name: "Sora - Watermark Remover",
      description: "Use Sora watermark remover for free online. Remove watermarks from generated videos.",
      category: "video",
      route: "/home/sora/watermark-remover",
      keywords: ["Sora", "watermark remover", "AI video", "OpenAI Sora"],
      applicationCategory: "VideoApplication",
      offers: { price: "0", priceCurrency: "USD" }
    });
    useHead(seoConfig);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HomeLayout = __nuxt_component_0;
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_HomeLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="tool-page" data-v-d9980791${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ClientOnly, null, {
              fallback: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div style="${ssrRenderStyle({ "padding": "20px", "text-align": "center" })}" data-v-d9980791${_scopeId2}>Loading Sora Tool...</div>`);
                } else {
                  return [
                    createVNode("div", { style: { "padding": "20px", "text-align": "center" } }, "Loading Sora Tool...")
                  ];
                }
              })
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "tool-page" }, [
                createVNode(_component_ClientOnly, null, {
                  fallback: withCtx(() => [
                    createVNode("div", { style: { "padding": "20px", "text-align": "center" } }, "Loading Sora Tool...")
                  ]),
                  default: withCtx(() => [
                    createVNode(SoraTool)
                  ]),
                  _: 1
                })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home/sora/watermark-remover.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const watermarkRemover = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d9980791"]]);
export {
  watermarkRemover as default
};
//# sourceMappingURL=watermark-remover-CC6b0hWa.js.map
