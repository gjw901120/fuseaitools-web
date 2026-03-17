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
