import { ref } from 'file://C:/project/fuseaitools-web/node_modules/vue/index.mjs';

async function fetchWithCache(key, fetchFn) {
  const data = await fetchFn();
  return data;
}
const useApi = () => {
  const getAuthToken = () => {
    return null;
  };
  const apiRequest = async (url, options = {}) => {
    var _a, _b;
    try {
      const token = getAuthToken();
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
      const response = await $fetch(url, fetchOptions);
      if (response && typeof response === "object" && "errorCode" in response) {
        if (response.errorCode === "00000") {
          return response.data;
        } else {
          const errorMessage = response.errorMessage || response.userTip || "Request failed";
          const err = new Error(errorMessage);
          err.__fromApi = true;
          throw err;
        }
      }
      return response;
    } catch (error) {
      console.error("API request error:", error);
      if (error.__fromApi) throw error;
      const errorMessage = ((_a = error.data) == null ? void 0 : _a.errorMessage) || ((_b = error.data) == null ? void 0 : _b.userTip) || error.message || "Network error. Please try again.";
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
const CACHE_KEY_PRICE = "api_common_models_price";
const priceDataCache = ref(null);
function useModelPrice() {
  const { get } = useApi();
  const fetchPrices = async () => {
    try {
      const data = await fetchWithCache(CACHE_KEY_PRICE, async () => {
        const res = await get("/api/common/models/price");
        return res && typeof res === "object" ? res : null;
      });
      priceDataCache.value = data;
      return priceDataCache.value;
    } catch (e) {
      console.warn("Failed to fetch model price:", e);
      return priceDataCache.value;
    }
  };
  const getPrice = (modelKey, formFields = {}) => {
    const data = priceDataCache.value;
    if (!data || !modelKey) return null;
    const item = data[modelKey];
    if (!item || typeof item !== "object") return null;
    if (item.type === "ONCE" && item.once != null) {
      const c = item.once.credits;
      return typeof c === "number" ? c : typeof c === "string" ? parseFloat(c) : null;
    }
    if (item.type === "RULE" && Array.isArray(item.rules) && item.rules.length > 0) {
      const match = item.rules.find((rule) => {
        return Object.keys(formFields).every((key) => {
          const formVal = formFields[key];
          if (formVal === void 0 || formVal === null) return true;
          const ruleVal = rule[key];
          return String(ruleVal) === String(formVal);
        });
      });
      if (match && typeof match.credits === "number") return match.credits;
      if (match && typeof match.credits === "string") return parseFloat(match.credits);
      if (match) return null;
      return null;
    }
    return null;
  };
  const formatCredits = (credits) => {
    if (credits == null || Number.isNaN(credits)) return "";
    const n = Number(credits);
    return n % 1 === 0 ? String(n) : n.toFixed(2);
  };
  return {
    priceData: priceDataCache,
    fetchPrices,
    getPrice,
    formatCredits
  };
}

export { useApi as a, useModelPrice as u };
//# sourceMappingURL=useModelPrice-BZpig2xf.mjs.map
