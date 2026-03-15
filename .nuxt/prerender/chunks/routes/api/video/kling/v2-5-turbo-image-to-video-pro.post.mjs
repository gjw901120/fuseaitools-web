import { defineEventHandler, readBody, getHeader, setResponseStatus, createError } from 'file://C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs';
import { g as getEffectiveApiBase } from '../../../../_/getApiBase.mjs';
import '../../../../_/nitro.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/destr/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/hookable/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/ofetch/dist/node.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/project/fuseaitools-web/node_modules/ufo/dist/index.mjs';
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

const v25TurboImageToVideoPro_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const apiBase = getEffectiveApiBase(event);
  const targetUrl = `${apiBase}/video/kling/v2-5-turbo-image-to-video-pro`;
  try {
    const authHeader = getHeader(event, "authorization");
    const headers = { "Content-Type": "application/json", Accept: "application/json" };
    if (authHeader) headers["Authorization"] = authHeader;
    const cookie = getHeader(event, "cookie");
    if (cookie) headers["Cookie"] = cookie;
    const response = await fetch(targetUrl, { method: "POST", headers, body: JSON.stringify(body) });
    const data = await response.json().catch(() => ({}));
    setResponseStatus(event, response.status);
    return data;
  } catch (error) {
    console.error("Kling v2-5-turbo-image-to-video-pro proxy error:", error);
    throw createError({ statusCode: 500, message: "Request failed: " + ((error == null ? void 0 : error.message) || "Unknown error") });
  }
});

export { v25TurboImageToVideoPro_post as default };
//# sourceMappingURL=v2-5-turbo-image-to-video-pro.post.mjs.map
