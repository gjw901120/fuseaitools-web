import { _ as __nuxt_component_0 } from "./HomeLayout-DmP_sp7g.js";
import { _ as __nuxt_component_1 } from "./ChatInterface-Bepkux6K.js";
import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { u as useToolSEO } from "./useToolSEO-Da7aGo7f.js";
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
import "./client-only-BJZIIy-4.js";
import "C:/project/fuseaitools-web/node_modules/klona/dist/index.mjs";
import "./useApi-1a9EtG7k.js";
import "./useAuth-BT_C6798.js";
import "./useToast-CATlmXE8.js";
import "./useBatchUploadUrl-_AVZ_-oO.js";
import "./useModelPrice-DCrt0_k3.js";
import "C:/project/fuseaitools-web/node_modules/nuxt/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = {
  __name: "generate",
  __ssrInlineRender: true,
  setup(__props) {
    const seoConfig = useToolSEO({
      name: "Claude",
      description: "Anthropic's Claude is built for nuanced conversation, long documents, and helpful, accurate outputs. Strong on coding, analysis, and multilingual dialogue, with vision to read PDFs, charts, and diagrams. Use Claude for free online. No signup required.",
      category: "chat",
      route: "/home/claude/generate",
      keywords: ["Claude", "Claude AI", "Anthropic", "AI chat", "conversational AI", "AI assistant", "free Claude", "Anthropic Claude"],
      applicationCategory: "ChatApplication",
      applicationSubCategory: "AI Chat",
      offers: { price: "0", priceCurrency: "USD" },
      offerDescription: "Credits-based pricing for Claude chat.",
      priceSpecification: { price: 650, minValue: 130, maxValue: 650, eligibleQuantityName: "Credits Required" }
    });
    useHead(seoConfig);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HomeLayout = __nuxt_component_0;
      const _component_ChatInterface = __nuxt_component_1;
      _push(ssrRenderComponent(_component_HomeLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ChatInterface, {
              "tool-name": "Claude",
              "tool-description": "Anthropic's Claude is built for nuanced conversation, long documents, and helpful, accurate outputs. Strong on coding, analysis, and multilingual dialogue, with vision to read PDFs, charts, and diagrams.",
              "tool-icon": "/tools-logo/Claude.png",
              "model-category": "Claude"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ChatInterface, {
                "tool-name": "Claude",
                "tool-description": "Anthropic's Claude is built for nuanced conversation, long documents, and helpful, accurate outputs. Strong on coding, analysis, and multilingual dialogue, with vision to read PDFs, charts, and diagrams.",
                "tool-icon": "/tools-logo/Claude.png",
                "model-category": "Claude"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home/claude/generate.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=generate-BFMA8JNe.js.map
