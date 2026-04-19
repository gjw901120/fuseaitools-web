/**
 * 与后端约定一致的 JSON：{ errorCode?, error_code?, errorMessage?, data?, userTip? }
 * 纯解析，不负责 Toast；供 useApi、同源 /api 轮询、batch-upload 等共用。
 */

/**
 * @param {unknown} raw - 已解析的 JSON
 * @returns {{ kind: 'success', data: unknown } | { kind: 'business_error', errorCode: string, errorMessage: string } | { kind: 'nonstandard', value: unknown }}
 */
export function parseStandardApiJson(raw) {
  if (raw == null || typeof raw !== 'object') {
    return { kind: 'nonstandard', value: raw }
  }
  if (!('errorCode' in raw || 'error_code' in raw)) {
    return { kind: 'nonstandard', value: raw }
  }
  const codeRaw = raw.errorCode ?? raw.error_code
  const errorMessage =
    (typeof raw.errorMessage === 'string' && raw.errorMessage.trim())
      ? raw.errorMessage.trim()
      : (typeof raw.userTip === 'string' && raw.userTip.trim())
        ? raw.userTip.trim()
        : (typeof raw.error_message === 'string' && raw.error_message.trim())
          ? raw.error_message.trim()
          : 'Request failed'
  if (String(codeRaw) === '00000') {
    return { kind: 'success', data: raw.data }
  }
  return {
    kind: 'business_error',
    errorCode: codeRaw == null ? '' : String(codeRaw),
    errorMessage
  }
}

/**
 * $fetch / ofetch 抛错时的统一文案（网络或非 2xx）
 * @param {unknown} error
 * @returns {string}
 */
export function getFetchErrorMessage(error) {
  const d = error?.data
  if (d && typeof d === 'object') {
    if (typeof d.errorMessage === 'string' && d.errorMessage.trim()) return d.errorMessage.trim()
    if (typeof d.userTip === 'string' && d.userTip.trim()) return d.userTip.trim()
  }
  const msg = error?.message
  if (typeof msg === 'string' && msg.trim()) return msg.trim()
  return 'Network error. Please try again.'
}
