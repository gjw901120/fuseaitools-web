import { ref, computed } from 'file://C:/project/fuseaitools-web/node_modules/vue/index.mjs';
import { u as useAuth } from './useAuth-BT_C6798.mjs';
import { u as useApi } from './useApi-1a9EtG7k.mjs';

async function fetchWithCache(key, fetchFn) {
  const data = await fetchFn();
  return data;
}
const CACHE_KEY_USER_DETAIL = "api_user_detail";
const userDetailRef = ref(null);
const loaded = ref(false);
const loading = ref(false);
function useUserDetail() {
  const { get } = useApi();
  const { isAuthenticated } = useAuth();
  const loadUserDetail = async () => {
    if (!isAuthenticated.value) {
      userDetailRef.value = null;
      loaded.value = true;
      return null;
    }
    try {
      const data = await fetchWithCache(CACHE_KEY_USER_DETAIL, async () => {
        const res = await get("/api/user/detail");
        return res && typeof res === "object" ? res : null;
      });
      userDetailRef.value = data;
      loaded.value = true;
      return data;
    } catch (e) {
      if (!loaded.value) {
        userDetailRef.value = null;
      }
      return userDetailRef.value;
    }
  };
  const ensureUserDetail = async () => {
    if (!isAuthenticated.value) return null;
    if (userDetailRef.value != null) return userDetailRef.value;
    if (loading.value) return userDetailRef.value;
    loading.value = true;
    try {
      return await loadUserDetail();
    } finally {
      loading.value = false;
    }
  };
  const discount = computed(() => {
    var _a;
    const raw = (_a = userDetailRef.value) == null ? void 0 : _a.discount;
    const n = Number(raw);
    if (Number.isNaN(n) || n <= 0) return 1;
    return n;
  });
  return {
    userDetail: userDetailRef,
    discount,
    loaded,
    loading,
    loadUserDetail,
    ensureUserDetail
  };
}
const CACHE_KEY_PRICE = "api_common_models_price";
const priceDataCache = ref(null);
function resolvePriceItem(data, modelKey) {
  if (!data || !modelKey) return null;
  let item = data[modelKey];
  if (item && typeof item === "object") return item;
  const altKey = modelKey.includes("_") ? modelKey.replace(/_/g, "-") : modelKey.includes("-") ? modelKey.replace(/-/g, "_") : null;
  if (altKey && altKey !== modelKey) {
    item = data[altKey];
    if (item && typeof item === "object") return item;
  }
  return null;
}
function getPriceRangeFromData(data, modelKey) {
  if (!data || !modelKey) return { minCredits: null, maxCredits: null };
  const item = resolvePriceItem(data, modelKey);
  if (!item) return { minCredits: null, maxCredits: null };
  const toNum = (c) => {
    if (c == null) return null;
    const n = typeof c === "number" ? c : parseFloat(c);
    return Number.isFinite(n) ? n : null;
  };
  if (item.type === "ONCE" && item.once != null) {
    const c = toNum(item.once.credits);
    return c != null ? { minCredits: c, maxCredits: c } : { minCredits: null, maxCredits: null };
  }
  if (item.type === "RULE" && Array.isArray(item.rules) && item.rules.length > 0) {
    const values = item.rules.map((r) => toNum(r.credits)).filter((n) => n != null);
    if (values.length === 0) return { minCredits: null, maxCredits: null };
    return {
      minCredits: Math.min(...values),
      maxCredits: Math.max(...values)
    };
  }
  return { minCredits: null, maxCredits: null };
}
function useModelPrice() {
  const { get } = useApi();
  const { discount } = useUserDetail();
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
    const item = resolvePriceItem(data, modelKey);
    if (!item) return null;
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
  const getPriceRange = (modelKey, priceData) => getPriceRangeFromData(priceData != null ? priceData : priceDataCache.value, modelKey);
  const formatCredits = (credits) => {
    if (credits == null || Number.isNaN(credits)) return "";
    const n = Number(credits);
    return n % 1 === 0 ? String(n) : n.toFixed(2);
  };
  return {
    priceData: priceDataCache,
    fetchPrices,
    getPrice,
    getPriceRange,
    formatCredits,
    // 方便业务侧直接使用当前折扣系数做展示
    discount
  };
}

export { getPriceRangeFromData as g, useModelPrice as u };
//# sourceMappingURL=useModelPrice-DCrt0_k3.mjs.map
