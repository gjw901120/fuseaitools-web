import { defineEventHandler, readBody, getHeader, setResponseStatus, setHeader, createError } from 'file://C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs';
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

const chatgpt_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const apiBase = getEffectiveApiBase(event);
  const targetUrl = `${apiBase}/chat/chatgpt`;
  try {
    const authHeader = getHeader(event, "authorization");
    const clientAccept = getHeader(event, "accept") || "text/event-stream, application/json, */*";
    const headers = {
      "Content-Type": "application/json",
      Accept: clientAccept
    };
    if (authHeader) headers["Authorization"] = authHeader;
    const cookie = getHeader(event, "cookie");
    if (cookie) headers["Cookie"] = cookie;
    const response = await fetch(targetUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      setResponseStatus(event, response.status);
      const errorData = await response.json().catch(() => ({ error: "Request failed" }));
      return errorData;
    }
    setHeader(event, "Content-Type", "application/json");
    setHeader(event, "Cache-Control", "no-cache");
    setHeader(event, "Connection", "keep-alive");
    setHeader(event, "Transfer-Encoding", "chunked");
    return response.body;
  } catch (error) {
    console.error("Stream proxy error:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to stream chat: " + (error.message || "Unknown error")
    });
  }
});

export { chatgpt_post as default };
//# sourceMappingURL=chatgpt.post.mjs.map
