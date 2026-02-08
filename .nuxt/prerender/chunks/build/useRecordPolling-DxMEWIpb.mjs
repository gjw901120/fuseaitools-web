function useRecordPolling() {
  const POLL_INTERVAL_MS = 10 * 1e3;
  const requestDetail = async (recordId) => {
    var _a;
    const url = `/api/records/detail?record-id=${encodeURIComponent(recordId)}`;
    const headers = { "Content-Type": "application/json", Accept: "application/json" };
    const response = await fetch(url, { method: "GET", headers, credentials: "include" });
    const raw = await response.json().catch(() => null);
    if (!raw || typeof raw !== "object") return null;
    const errorCode = (_a = raw.errorCode) != null ? _a : raw.error_code;
    const data = raw.data;
    if (errorCode === "00000" && data && typeof data === "object") return data;
    return null;
  };
  const fetchRecordDetailOnce = async (recordId) => {
    if (!recordId || typeof recordId !== "string") return null;
    return requestDetail(recordId);
  };
  const pollRecordByStatus = async (recordId, options = {}) => {
    var _a;
    const intervalMs = (_a = options.intervalMs) != null ? _a : POLL_INTERVAL_MS;
    const getIsCancelled = options.getIsCancelled;
    if (!recordId || typeof recordId !== "string") {
      throw new Error("recordId is required");
    }
    for (; ; ) {
      if (getIsCancelled == null ? void 0 : getIsCancelled()) return null;
      await new Promise((r) => setTimeout(r, intervalMs));
      if (getIsCancelled == null ? void 0 : getIsCancelled()) return null;
      const data = await requestDetail(recordId);
      if (getIsCancelled == null ? void 0 : getIsCancelled()) return null;
      if (data != null && Number(data.status) !== 1) return data;
    }
  };
  const pollRecordDetail = async (recordId, options = {}) => {
    var _a;
    const intervalMs = (_a = options.intervalMs) != null ? _a : POLL_INTERVAL_MS;
    if (!recordId || typeof recordId !== "string") {
      throw new Error("recordId is required");
    }
    for (; ; ) {
      const data = await requestDetail(recordId);
      if (data && Array.isArray(data.outputUrls) && data.outputUrls.length > 0) return data;
      await new Promise((r) => setTimeout(r, intervalMs));
    }
  };
  return {
    POLL_INTERVAL_MS,
    fetchRecordDetailOnce,
    pollRecordByStatus,
    pollRecordDetail
  };
}

export { useRecordPolling as u };
//# sourceMappingURL=useRecordPolling-DxMEWIpb.mjs.map
