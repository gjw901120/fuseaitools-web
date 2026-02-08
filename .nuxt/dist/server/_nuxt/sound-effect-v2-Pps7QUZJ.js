import { _ as __nuxt_component_0 } from "./HomeLayout-CFv173Mv.js";
import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { E as ElevenLabsTool } from "./ElevenLabsTool-C94H40kr.js";
import { u as useToolSEO } from "./useToolSEO-CnGqkRSu.js";
import { u as useHead } from "./v3-DXSoGrP9.js";
import { _ as _export_sfc } from "../server.mjs";
import "./nuxt-link-BgkIFP7n.js";
import "C:/project/fuseaitools-web/node_modules/ufo/dist/index.mjs";
import "vue-router";
import "./useAuth-ComhLj5o.js";
import "#internal/nuxt/paths";
import "./UploadAudio-oxGsi1Fq.js";
import "./useToast-CATlmXE8.js";
import "./useRecordPolling-DxMEWIpb.js";
import "C:/project/fuseaitools-web/node_modules/nuxt/node_modules/@unhead/vue/dist/index.mjs";
import "ofetch";
import "C:/project/fuseaitools-web/node_modules/hookable/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/unctx/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/radix3/dist/index.mjs";
import "C:/project/fuseaitools-web/node_modules/defu/dist/defu.mjs";
const _sfc_main = {
  __name: "sound-effect-v2",
  __ssrInlineRender: true,
  setup(__props) {
    const seoConfig = useToolSEO({
      name: "ElevenLabs Sound Effect v2",
      description: "ElevenLabs Sound Effect v2 - Generate sound effects. Use for free online.",
      category: "audio",
      route: "/home/elevenlabs/sound-effect-v2",
      keywords: ["ElevenLabs", "Sound Effect", "AI sound"],
      applicationCategory: "AudioApplication",
      offers: { price: "0", priceCurrency: "USD" }
    });
    useHead(seoConfig);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HomeLayout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_HomeLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="tool-page" data-v-0ed72b66${_scopeId}>`);
            _push2(ssrRenderComponent(ElevenLabsTool, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "tool-page" }, [
                createVNode(ElevenLabsTool)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home/elevenlabs/sound-effect-v2.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const soundEffectV2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0ed72b66"]]);
export {
  soundEffectV2 as default
};
//# sourceMappingURL=sound-effect-v2-Pps7QUZJ.js.map
