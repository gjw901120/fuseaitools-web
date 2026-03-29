import { _ as __nuxt_component_0 } from './HomeLayout-DmP_sp7g.mjs';
import { withAsyncContext, withCtx, createVNode, useSSRContext } from 'file://C:/project/fuseaitools-web/node_modules/vue/index.mjs';
import { ssrRenderComponent } from 'file://C:/project/fuseaitools-web/node_modules/vue/server-renderer/index.mjs';
import { E as ElevenLabsTool } from './ElevenLabsTool-BQXprj-C.mjs';
import { a as useToolSEOAsync } from './useToolSEO-Da7aGo7f.mjs';
import { u as useHead } from './v3-DXSoGrP9.mjs';
import { _ as _export_sfc } from './server.mjs';
import './nuxt-link-BgkIFP7n.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/ufo/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/vue-router/dist/vue-router.node.mjs';
import './useApi-1a9EtG7k.mjs';
import './useAuth-BT_C6798.mjs';
import '../_/renderer.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs';
import '../_/nitro.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/destr/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/hookable/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/ofetch/dist/node.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/unstorage/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/project/fuseaitools-web/node_modules/nuxt/dist/core/runtime/nitro/utils/cache-driver.js';
import 'file://C:/project/fuseaitools-web/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/ohash/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/klona/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/defu/dist/defu.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/scule/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/project/fuseaitools-web/node_modules/pathe/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/unhead/dist/server.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/devalue/index.js';
import 'file://C:/project/fuseaitools-web/node_modules/unhead/dist/utils.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/unhead/dist/plugins.mjs';
import './UploadAudio-CGq6L9QH.mjs';
import './useToast-CATlmXE8.mjs';
import './useRecordPolling-QI_mIuwF.mjs';
import './useModelPrice-DCrt0_k3.mjs';
import './useBatchUploadUrl-_AVZ_-oO.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/unctx/dist/index.mjs';

const _sfc_main = {
  __name: "multilingual-v2",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const seoConfig = ([__temp, __restore] = withAsyncContext(() => useToolSEOAsync({
      name: "ElevenLabs Multilingual v2 TTS",
      description: "Multilingual voice synthesis in 100+ languages with ElevenLabs. 20 credits per 1K characters.",
      category: "audio",
      route: "/home/elevenlabs/multilingual-v2",
      keywords: ["ElevenLabs", "Multilingual v2", "voice synthesis", "TTS", "multilingual voice"],
      applicationCategory: "MultimediaApplication",
      applicationSubCategory: "Audio Processing",
      offers: { price: "0", priceCurrency: "USD" },
      offerDescription: "20 credits per 1K characters.",
      priceFromApi: { modelKey: "elevenlabs_text_to_speech_multilingual", eligibleQuantityName: "Credits per 1K characters" },
      priceSpecification: { price: 20, minValue: 20, maxValue: 20, eligibleQuantityName: "Credits per 1K characters" }
    })), __temp = await __temp, __restore(), __temp);
    useHead(seoConfig);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HomeLayout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_HomeLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="tool-page" data-v-58d9d781${_scopeId}>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home/elevenlabs/multilingual-v2.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const multilingualV2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-58d9d781"]]);

export { multilingualV2 as default };
//# sourceMappingURL=multilingual-v2-CXwiioSK.mjs.map
