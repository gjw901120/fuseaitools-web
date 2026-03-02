/**
 * 根据运行时配置与请求 Host 返回实际请求后端的 apiBase。
 * 当请求来自生产域名（www.fuseaitools.com / fuseaitools.com）时，强制使用 api.fuseaitools.com，
 * 避免因未设置 NODE_ENV 或 NUXT_PUBLIC_API_BASE 导致代理到 127.0.0.1 报错。
 */
export function getEffectiveApiBase(event) {
  const config = useRuntimeConfig()
  let apiBase = config.public.apiBase || ''

  let host = (getHeader(event, 'host') || getHeader(event, 'x-forwarded-host') || '').split(':')[0].toLowerCase()
  if (!host && getHeader(event, 'referer')) {
    try {
      const u = new URL(getHeader(event, 'referer'))
      host = u.hostname.toLowerCase()
    } catch (_) {}
  }
  const isProductionDomain = host === 'www.fuseaitools.com' || host === 'fuseaitools.com'

  if (isProductionDomain && (!apiBase || apiBase.includes('127.0.0.1'))) {
    return 'https://api.fuseaitools.com'
  }
  if (!apiBase) {
    return 'http://127.0.0.1:8080/api'
  }
  return apiBase
}
