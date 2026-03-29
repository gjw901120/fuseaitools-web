import { b as useRuntimeConfig } from "../server.mjs";
function getEffectiveApiBaseForClient(configApiBase) {
  return configApiBase || "";
}
function useBatchUploadUrl() {
  var _a;
  const config = useRuntimeConfig();
  getEffectiveApiBaseForClient(((_a = config.public) == null ? void 0 : _a.apiBase) || "");
  return "/api/common/batch-upload";
}
export {
  useBatchUploadUrl as u
};
//# sourceMappingURL=useBatchUploadUrl-_AVZ_-oO.js.map
