import { defineEventHandler, getHeader, readBody, createError } from 'file://C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs';
import { g as getEffectiveApiBase } from '../../../_/getApiBase.mjs';
import '../../../_/nitro.mjs';
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

const cancelSubscription_post = defineEventHandler(async (event) => {
  const apiBase = getEffectiveApiBase(event);
  const targetUrl = `${apiBase}/refund/cancel-subscription`;
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
  };
  const authHeader = getHeader(event, "authorization");
  if (authHeader) headers["Authorization"] = authHeader;
  const body = await readBody(event).catch(() => ({}));
  try {
    const response = await $fetch(targetUrl, {
      method: "POST",
      headers,
      body
    });
    return response;
  } catch (error) {
    console.error("Cancel subscription proxy error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || "Failed to cancel subscription"
    });
  }
});

export { cancelSubscription_post as default };
//# sourceMappingURL=cancel-subscription.post.mjs.map
