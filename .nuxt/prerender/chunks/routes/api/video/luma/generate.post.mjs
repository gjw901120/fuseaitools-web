import { defineEventHandler, readBody, getHeader, setResponseStatus, createError } from 'file://C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs';

const generate_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const backendUrl = "http://127.0.0.1:8080/api/video/luma/generate";
  try {
    const authHeader = getHeader(event, "authorization");
    const headers = { "Content-Type": "application/json", Accept: "application/json" };
    if (authHeader) headers["Authorization"] = authHeader;
    const response = await fetch(backendUrl, { method: "POST", headers, body: JSON.stringify(body) });
    const data = await response.json().catch(() => ({}));
    setResponseStatus(event, response.status);
    return data;
  } catch (error) {
    console.error("Luma generate proxy error:", error);
    throw createError({ statusCode: 500, message: "Request failed: " + (error.message || "Unknown error") });
  }
});

export { generate_post as default };
//# sourceMappingURL=generate.post.mjs.map
