/**
 * 记录详情：单次拉取与按 status 轮询
 * - fetchRecordDetailOnce: 请求一次，返回 data（含 status、originalData、outputUrls）
 * - pollRecordByStatus: 每 10 秒请求一次，直到 status !== 1（1=进行中，2=成功，3=失败），返回 data
 * - pollRecordDetail: 每 10 秒请求一次，直到 outputUrls 存在（兼容旧用法）
 */
export function useRecordPolling() {
  const POLL_INTERVAL_MS = 10 * 1000 // 10 秒

  const getToken = () => {
    if (!process.client) return null
    try {
      const { token } = useAuth()
      if (token?.value) return token.value
      return localStorage.getItem('auth_token')
    } catch {
      return localStorage.getItem('auth_token')
    }
  }

  const requestDetail = async (recordId) => {
    const url = `/api/records/detail?record-id=${encodeURIComponent(recordId)}`
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
    const token = getToken()
    if (token) headers['Authorization'] = `Bearer ${token}`
    const response = await fetch(url, { method: 'GET', headers, credentials: 'include' })
    const raw = await response.json().catch(() => null)
    if (!raw || typeof raw !== 'object') return null
    const errorCode = raw.errorCode ?? raw.error_code
    const data = raw.data
    if (errorCode === '00000' && data && typeof data === 'object') return data
    return null
  }

  /** 单次拉取记录详情，返回 data 或 null */
  const fetchRecordDetailOnce = async (recordId) => {
    if (!recordId || typeof recordId !== 'string') return null
    return requestDetail(recordId)
  }

  /**
   * 按 status 轮询：先等间隔再请求，避免与调用方已执行的 fetchRecordDetailOnce 重复（进行中时只发 1 次）
   * options.getIsCancelled: () => boolean，为 true 时立即停止轮询
   * @returns {Promise<Object|null>} data 或取消时 null
   */
  const pollRecordByStatus = async (recordId, options = {}) => {
    const intervalMs = options.intervalMs ?? POLL_INTERVAL_MS
    const getIsCancelled = options.getIsCancelled
    if (!recordId || typeof recordId !== 'string') {
      throw new Error('recordId is required')
    }
    for (;;) {
      if (getIsCancelled?.()) return null
      await new Promise(r => setTimeout(r, intervalMs))
      if (getIsCancelled?.()) return null
      const data = await requestDetail(recordId)
      if (getIsCancelled?.()) return null
      if (data != null && Number(data.status) !== 1) return data
    }
  }

  /** 轮询直到 outputUrls 存在（兼容旧用法） */
  const pollRecordDetail = async (recordId, options = {}) => {
    const intervalMs = options.intervalMs ?? POLL_INTERVAL_MS
    if (!recordId || typeof recordId !== 'string') {
      throw new Error('recordId is required')
    }
    for (;;) {
      const data = await requestDetail(recordId)
      if (data && Array.isArray(data.outputUrls) && data.outputUrls.length > 0) return data
      await new Promise(r => setTimeout(r, intervalMs))
    }
  }

  return {
    POLL_INTERVAL_MS,
    fetchRecordDetailOnce,
    pollRecordByStatus,
    pollRecordDetail
  }
}
