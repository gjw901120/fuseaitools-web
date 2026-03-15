import { b as useRuntimeConfig } from "../server.mjs";
function useBatchUploadUrl() {
  var _a;
  const config = useRuntimeConfig();
  ((_a = config.public) == null ? void 0 : _a.apiBase) || "";
  return "/api/common/batch-upload";
}
export {
  useBatchUploadUrl as u
};
//# sourceMappingURL=useBatchUploadUrl-Wq7pvxpv.js.map
