import { defineEventHandler, readBody, getHeader, setResponseStatus, setHeader, createError } from 'file://C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs';

const claude_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const backendUrl = "http://127.0.0.1:8080/api/chat/claude";
  try {
    const authHeader = getHeader(event, "authorization");
    const clientAccept = getHeader(event, "accept") || "text/event-stream, application/json, */*";
    const headers = {
      "Content-Type": "application/json",
      "Accept": clientAccept
    };
    if (authHeader) {
      headers["Authorization"] = authHeader;
      console.log("Forwarding Authorization header to backend");
    } else {
      console.warn("No Authorization header found in request");
    }
    console.log("Proxying request to:", backendUrl);
    console.log("Request body:", JSON.stringify(body));
    const response = await fetch(backendUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    });
    console.log("Backend response status:", response.status);
    if (!response.ok) {
      setResponseStatus(event, response.status);
      const errorData = await response.json().catch(() => ({ error: "Request failed" }));
      console.error("Backend error:", errorData);
      return errorData;
    }
    setHeader(event, "Content-Type", "application/json");
    setHeader(event, "Cache-Control", "no-cache");
    setHeader(event, "Connection", "keep-alive");
    setHeader(event, "Transfer-Encoding", "chunked");
    console.log("Streaming response to client");
    return response.body;
  } catch (error) {
    console.error("Stream proxy error:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to stream chat: " + (error.message || "Unknown error")
    });
  }
});

export { claude_post as default };
//# sourceMappingURL=claude.post.mjs.map
