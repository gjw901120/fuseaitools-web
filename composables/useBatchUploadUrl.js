/**
 * 返回 batch-upload 的请求地址。
 * 生产环境客户端直连后端（apiBase），避免 POST 经 CloudFront 时出现 403（静态站不处理 /api）。
 * 开发或 SSR 仍走同源 /api/common/batch-upload 代理。
 */
export function useBatchUploadUrl() {
  const config = useRuntimeConfig()
  const apiBase = config.public?.apiBase || ''
  if (typeof window !== 'undefined' && apiBase && apiBase.startsWith('http')) {
    return `${apiBase.replace(/\/$/, '')}/common/batch-upload`
  }
  return '/api/common/batch-upload'
}
