import { parseStandardApiJson } from '~/utils/parseStandardApiResponse.js'

const PRODUCTION_API_BASE = 'https://api.fuseaitools.com/api'

function getEffectiveApiBaseForClient(configApiBase) {
  if (typeof window === 'undefined') return configApiBase || ''
  const host = (window.location?.hostname || '').toLowerCase()
  if (host === 'www.fuseaitools.com' || host === 'fuseaitools.com') {
    if (!configApiBase || configApiBase.includes('127.0.0.1')) return PRODUCTION_API_BASE
  }
  return configApiBase || ''
}

/**
 * 返回 batch-upload 的请求地址。
 * 生产环境客户端直连后端（apiBase），避免 POST 经 CloudFront 时出现 403（静态站不处理 /api）。
 * 开发或 SSR 仍走同源 /api/common/batch-upload 代理。
 */
export function useBatchUploadUrl() {
  const config = useRuntimeConfig()
  const apiBase = getEffectiveApiBaseForClient(config.public?.apiBase || '')
  if (typeof window !== 'undefined' && apiBase && apiBase.startsWith('http')) {
    return `${apiBase.replace(/\/$/, '')}/common/batch-upload`
  }
  return '/api/common/batch-upload'
}

/**
 * 后端 batch-upload 成功时通常为 errorCode === '00000'；HTTP 200 仍可能返回业务错误（如 B0001）。
 * 与 useApi 共用 parseStandardApiJson；无标准字段时保留旧逻辑。
 */
export function assertBatchUploadSuccess(data) {
  const r = parseStandardApiJson(data)
  if (r.kind === 'success') return
  if (r.kind === 'business_error') throw new Error(r.errorMessage)
  if (!data || typeof data !== 'object') throw new Error('Invalid upload response')
  const code = data.errorCode
  if (code != null && String(code) !== '00000') {
    const msg = typeof data.errorMessage === 'string' && data.errorMessage.trim()
      ? data.errorMessage.trim()
      : 'Upload failed'
    throw new Error(msg)
  }
}

/**
 * 解析 batch-upload 的 fetch Response：统一处理 HTTP 错误与业务 errorCode，便于 showError。
 */
export async function parseBatchUploadFetchResponse(res) {
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const msg = (typeof data.errorMessage === 'string' && data.errorMessage.trim())
      ? data.errorMessage.trim()
      : (data?.message || res.statusText || 'Upload failed')
    throw new Error(msg)
  }
  assertBatchUploadSuccess(data)
  return data
}
