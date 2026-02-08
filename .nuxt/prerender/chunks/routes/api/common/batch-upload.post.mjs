import { defineEventHandler, readMultipartFormData, createError, getHeader, setResponseStatus } from 'file://C:/project/fuseaitools-web/node_modules/h3/dist/index.mjs';

const batchUpload_post = defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);
  if (!formData || formData.length === 0) {
    throw createError({
      statusCode: 400,
      message: "No files provided"
    });
  }
  const backendUrl = "http://127.0.0.1:8080/api/common/batch-upload";
  try {
    const authHeader = getHeader(event, "authorization");
    const forwardFormData = new FormData();
    let filePartCount = 0;
    formData.forEach((item, index) => {
      var _a, _b;
      const isFilePart = item.name === "file" || item.filename;
      const hasData = item.data && ((_b = (_a = item.data.length) != null ? _a : item.data.byteLength) != null ? _b : 0) > 0;
      if (isFilePart && hasData) {
        const blob = new Blob([item.data], { type: item.type || "application/octet-stream" });
        const filename = item.filename && item.filename.trim() ? item.filename : `file_${index}`;
        forwardFormData.append("file", blob, filename);
        filePartCount += 1;
      }
    });
    if (filePartCount === 0) {
      throw createError({
        statusCode: 400,
        message: "No file part in request. Ensure form field name is 'file' and multipart body is sent."
      });
    }
    const headers = {
      "Accept": "application/json"
    };
    if (authHeader) {
      headers["Authorization"] = authHeader;
      console.log("Forwarding Authorization header to backend");
    } else {
      console.warn("No Authorization header found in request");
    }
    console.log("Proxying batch upload request to:", backendUrl, `Files: ${formData.length}`);
    const response = await fetch(backendUrl, {
      method: "POST",
      headers,
      body: forwardFormData
    });
    console.log("Backend response status:", response.status);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Backend upload error:", errorData);
      const msg = errorData && typeof errorData.errorMessage === "string" && errorData.errorMessage.trim() ? errorData.errorMessage.trim() : (errorData == null ? void 0 : errorData.message) || (errorData == null ? void 0 : errorData.userTip) || (errorData == null ? void 0 : errorData.error) || "Upload failed";
      throw createError({
        statusCode: response.status,
        message: msg
      });
    }
    const data = await response.json();
    setResponseStatus(event, response.status);
    return data;
  } catch (error) {
    console.error("Upload proxy error:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to upload files: " + (error.message || "Unknown error")
    });
  }
});

export { batchUpload_post as default };
//# sourceMappingURL=batch-upload.post.mjs.map
