/**
 * 客户端 API 基地址解析（单一数据源）
 *
 * 与 server/utils/getApiBase.js 保持同一套规则：
 * - 生产域名下强制使用 https://api.fuseaitools.com/api（即使构建时误配了 127.0.0.1）
 * - 其他环境使用 runtimeConfig.public.apiBase
 *
 * 为什么客户端要直连后端而不是走同源 /api 代理：
 * 站点静态资源由 CloudFront 分发，它不处理 /api 路径（POST 会 403），
 * 因此浏览器端请求必须直达 api.fuseaitools.com；代理只服务本地开发与 SSR。
 */
export const PRODUCTION_API_BASE = 'https://api.fuseaitools.com/api'

export function getEffectiveApiBaseForClient(configApiBase) {
  if (typeof window === 'undefined') return configApiBase || ''
  const host = (window.location?.hostname || '').toLowerCase()
  if (host === 'www.fuseaitools.com' || host === 'fuseaitools.com') {
    if (!configApiBase || configApiBase.includes('127.0.0.1')) return PRODUCTION_API_BASE
  }
  return configApiBase || ''
}
