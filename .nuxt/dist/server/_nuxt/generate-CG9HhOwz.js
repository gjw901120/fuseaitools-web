import { _ as __nuxt_component_0 } from "./HomeLayout-CFv173Mv.js";
import { _ as __nuxt_component_1 } from "./ChatInterface-Cos3zynh.js";
import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { u as useToolSEO } from "./useToolSEO-CnGqkRSu.js";
import { u as useHead } from "./v3-DXSoGrP9.js";
import "./nuxt-link-BgkIFP7n.js";
import "C:/project/fuseaitools-web/node_modules/ufo/dist/index.mjs";
import "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "C:/project/fuseaitools-web/node_modules/hookable/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/unctx/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/project/fuseaitools-web/node_modules/radix3/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/defu/dist/defu.mjs";
import "./useAuth-ComhLj5o.js";
import "./client-only-BJZIIy-4.js";
import "C:/project/fuseaitools-web/node_modules/klona/dist/index.mjs";
import "./useToast-CATlmXE8.js";
import "C:/project/fuseaitools-web/node_modules/nuxt/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = {
  __name: "generate",
  __ssrInlineRender: true,
  setup(__props) {
    const seoConfig = useToolSEO({
      name: "Gemini",
      description: "Use Google Gemini AI for free online. Google's advanced conversational AI assistant for chat, analysis, multimodal understanding, and creative tasks. No signup required.",
      category: "chat",
      route: "/home/gemini/generate",
      keywords: ["Gemini", "Google Gemini", "Gemini AI", "AI chat", "conversational AI", "Google AI", "multimodal AI", "free Gemini"],
      applicationCategory: "ChatApplication",
      offers: { price: "0", priceCurrency: "USD" }
    });
    useHead(seoConfig);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HomeLayout = __nuxt_component_0;
      const _component_ChatInterface = __nuxt_component_1;
      _push(ssrRenderComponent(_component_HomeLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ChatInterface, {
              "tool-name": "Gemini",
              "tool-description": "Google AI assistant",
              "tool-icon": "/tools-logo/Gemini.png",
              "model-category": "Gemini"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ChatInterface, {
                "tool-name": "Gemini",
                "tool-description": "Google AI assistant",
                "tool-icon": "/tools-logo/Gemini.png",
                "model-category": "Gemini"
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home/gemini/generate.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=generate-CG9HhOwz.js.map
