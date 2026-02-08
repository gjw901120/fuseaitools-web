import { _ as __nuxt_component_0 } from './HomeLayout-CFv173Mv.mjs';
import { _ as __nuxt_component_0$1 } from './client-only-BJZIIy-4.mjs';
import { withCtx, createVNode, useSSRContext } from 'file://C:/project/fuseaitools-web/node_modules/vue/index.mjs';
import { ssrRenderComponent, ssrRenderStyle } from 'file://C:/project/fuseaitools-web/node_modules/vue/server-renderer/index.mjs';
import { S as SoraTool } from './SoraTool-C_jJclwW.mjs';
import { u as useToolSEO } from './useToolSEO-CnGqkRSu.mjs';
import { u as useHead } from './v3-DXSoGrP9.mjs';
import { _ as _export_sfc } from './server.mjs';
import './nuxt-link-BgkIFP7n.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/ufo/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/vue-router/dist/vue-router.node.mjs';
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
import './UploadImage-a1UOMv8U.mjs';
import './useAuth-ComhLj5o.mjs';
import './useToast-CATlmXE8.mjs';
import './useModelPrice-BZpig2xf.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/unctx/dist/index.mjs';

const _sfc_main = {
  __name: "text-to-video",
  __ssrInlineRender: true,
  setup(__props) {
    const seoConfig = useToolSEO({
      name: "Sora - Text to Video",
      description: "Use Sora 2 for free online. Text-to-video AI video generation. Control aspect ratio, frames, quality, and watermark options.",
      category: "video",
      route: "/home/sora/text-to-video",
      keywords: ["Sora", "Sora 2", "text-to-video", "AI video generation", "OpenAI Sora"],
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
            _push2(`<div class="tool-page" data-v-9804c475${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ClientOnly, null, {
              fallback: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div style="${ssrRenderStyle({ "padding": "20px", "text-align": "center" })}" data-v-9804c475${_scopeId2}>Loading Sora Tool...</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home/sora/text-to-video.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const textToVideo = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9804c475"]]);

export { textToVideo as default };
//# sourceMappingURL=text-to-video-CMdwuwb2.mjs.map
