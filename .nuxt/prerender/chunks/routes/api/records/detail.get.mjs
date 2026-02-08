import { defineEventHandler, getQuery, createError, getHeader } from 'file://C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs';
import { a as useRuntimeConfig } from '../../../_/nitro.mjs';
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

const detail_get = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;
  const query = getQuery(event);
  const recordId = query["record-id"] || query.recordId;
  if (!recordId || typeof recordId !== "string") {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing record-id"
    });
  }
  const targetUrl = `${apiBase}/records/detail?record-id=${encodeURIComponent(recordId)}`;
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
  };
  const authHeader = getHeader(event, "authorization");
  if (authHeader) headers["Authorization"] = authHeader;
  try {
    const response = await $fetch(targetUrl, { method: "GET", headers });
    return response;
  } catch (error) {
    console.error("Records detail proxy error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || "Failed to fetch record detail"
    });
  }
});

export { detail_get as default };
//# sourceMappingURL=detail.get.mjs.map
