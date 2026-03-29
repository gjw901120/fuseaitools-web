import { b as useRuntimeConfig } from './server.mjs';

function getEffectiveApiBaseForClient(configApiBase) {
  return configApiBase || "";
}
const useApi = () => {
  var _a;
  const runtimeConfig = useRuntimeConfig();
  const apiBase = getEffectiveApiBaseForClient(((_a = runtimeConfig.public) == null ? void 0 : _a.apiBase) || "");
  const getAuthToken = () => {
    return null;
  };
  const apiRequest = async (url, options = {}) => {
    var _a2, _b;
    try {
      const token = getAuthToken();
      let finalUrl = url;
      if (typeof url === "string" && !/^https?:\/\//i.test(url) && apiBase) {
        const base = apiBase.replace(/\/$/, "");
        if (url.startsWith("/api/")) {
          if (base.endsWith("/api")) {
            finalUrl = base + url.replace(/^\/api/, "");
          } else {
            finalUrl = base + url;
          }
        } else {
          finalUrl = base + url;
        }
      }
      const fetchOptions = {
        ...options,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          ...options.headers
        }
      };
      if (token) ;
      if (false) ;
      const response = await $fetch(finalUrl, fetchOptions);
      if (response && typeof response === "object" && "errorCode" in response) {
        if (response.errorCode === "00000") {
          return response.data;
        } else {
          const errorMessage = response.errorMessage || response.userTip || "Request failed";
          if (false) ;
          const err = new Error(errorMessage);
          err.__fromApi = true;
          throw err;
        }
      }
      return response;
    } catch (error) {
      console.error("API request error:", error);
      if (error.__fromApi) throw error;
      const errorMessage = ((_a2 = error.data) == null ? void 0 : _a2.errorMessage) || ((_b = error.data) == null ? void 0 : _b.userTip) || error.message || "Network error. Please try again.";
      throw new Error(errorMessage);
    }
  };
  const get = (url, options = {}) => {
    return apiRequest(url, {
      method: "GET",
      ...options
    });
  };
  const post = (url, body, options = {}) => {
    return apiRequest(url, {
      method: "POST",
      body,
      ...options
    });
  };
  const put = (url, body, options = {}) => {
    return apiRequest(url, {
      method: "PUT",
      body,
      ...options
    });
  };
  const del = (url, options = {}) => {
    return apiRequest(url, {
      method: "DELETE",
      ...options
    });
  };
  return {
    request: apiRequest,
    get,
    post,
    put,
    delete: del
  };
};

export { useApi as u };
//# sourceMappingURL=useApi-1a9EtG7k.mjs.map
