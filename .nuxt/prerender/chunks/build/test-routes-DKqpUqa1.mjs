import { mergeProps, useSSRContext } from 'file://C:/project/fuseaitools-web/node_modules/vue/index.mjs';
import { ssrRenderAttrs } from 'file://C:/project/fuseaitools-web/node_modules/vue/server-renderer/index.mjs';
import { u as useHead } from './v3-DXSoGrP9.mjs';
import { _ as _export_sfc } from './server.mjs';
import '../_/renderer.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/ufo/dist/index.mjs';
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
import 'file://C:/project/fuseaitools-web/node_modules/unctx/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/vue-router/dist/vue-router.node.mjs';

const _sfc_main = {
  __name: "test-routes",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Route Testing - FuseAI Tools",
      meta: [
        {
          name: "description",
          content: "Test whether all tool routing functions work properly."
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "test-page" }, _attrs))} data-v-3fe56d72><h1 data-v-3fe56d72>\u8DEF\u7531\u6D4B\u8BD5\u9875\u9762</h1><div class="test-links" data-v-3fe56d72><a href="/home/elevenlabs" class="test-link" data-v-3fe56d72>ElevenLabs \u4E3B\u9875</a><a href="/home/elevenlabs/multilingual-v2" class="test-link" data-v-3fe56d72>ElevenLabs Multilingual v2</a><a href="/home/elevenlabs/turbo-2-5" class="test-link" data-v-3fe56d72>ElevenLabs Turbo 2.5</a><a href="/home/nano-banana" class="test-link" data-v-3fe56d72>Nano Banana \u4E3B\u9875</a><a href="/home/gpt-4o-image/generate" class="test-link" data-v-3fe56d72>GPT 4o Image \u4E3B\u9875</a></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/test-routes.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const testRoutes = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3fe56d72"]]);

export { testRoutes as default };
//# sourceMappingURL=test-routes-DKqpUqa1.mjs.map
