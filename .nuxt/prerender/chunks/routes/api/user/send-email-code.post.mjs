import { defineEventHandler, readBody, setResponseStatus, createError } from 'file://C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs';

const sendEmailCode_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const backendUrl = "http://127.0.0.1:8080/api/user/send-email-code";
  try {
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    setResponseStatus(event, response.status);
    return data;
  } catch (error) {
    console.error("Proxy error:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to send email code"
    });
  }
});

export { sendEmailCode_post as default };
//# sourceMappingURL=send-email-code.post.mjs.map
