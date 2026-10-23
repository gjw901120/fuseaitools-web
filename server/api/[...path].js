/**
 * 通用 API 代理（catch-all）
 *
 * 历史上后端每个接口在 server/api 下都有一个样板文件（149 个 POST / 11 个 GET），
 * 逻辑完全一致：转发 Authorization/Cookie、透传状态码与 JSON 响应，合计约 4000 行重复代码。
 * 现在统一由本文件处理；白名单见 server/utils/apiProxyRoutes.js。
 *
 * 以下路径因为行为有差异，仍保留独立文件（静态路由优先于 catch-all）：
 * - chat/*            SSE 流式响应（直接返回 response.body）
 * - common/batch-upload   multipart 重组（后端要求 part 名为 file）
 * - common/models/price   进程内 TTL 缓存 + 未登录时的服务端凭证
 * - records/*、news/*、user/credits-detail  查询参数校验与默认值
 * - user/login-by-email 等 $fetch 系列  依赖 $fetch 的 HTTP 错误映射
 *
 * 安全：只代理 API_PROXY_ROUTES 中登记的 `METHOD /path`，避免把后端 /api 全量暴露给公网。
 * 新增后端接口时：在白名单加一行即可，不需要再建代理文件。
 */
import { API_PROXY_ROUTES } from '~~/server/utils/apiProxyRoutes.js'

const PASS_THROUGH_RESPONSE_HEADERS = ['content-type', 'content-disposition', 'cache-control', 'location']

export default defineEventHandler(async (event) => {
  const method = event.method
  const path = '/' + (getRouterParam(event, 'path') || '').replace(/^\/+/, '')
  const routeKey = `${method} ${path}`

  if (!API_PROXY_ROUTES.has(routeKey)) {
    throw createError({
      statusCode: 404,
      statusMessage: `Unknown API route: ${routeKey}`
    })
  }

  const apiBase = getEffectiveApiBase(event).replace(/\/$/, '')
  const targetUrl = `${apiBase}${path}${getRequestURL(event).search}`

  const headers = {
    Accept: getHeader(event, 'accept') || 'application/json'
  }
  const authHeader = getHeader(event, 'authorization')
  if (authHeader) headers.Authorization = authHeader
  const cookie = getHeader(event, 'cookie')
  if (cookie) headers.Cookie = cookie
  const contentType = getHeader(event, 'content-type')
  if (contentType) headers['Content-Type'] = contentType

  // 原样转发请求体：JSON 与 multipart 都无需解析再序列化，避免丢字段/改边界
  let body
  if (method !== 'GET' && method !== 'HEAD') {
    const raw = await readRawBody(event, false)
    if (raw && raw.length > 0) body = raw
  }

  let upstream
  try {
    upstream = await fetch(targetUrl, { method, headers, body })
  } catch (error) {
    console.error(`[api-proxy] ${routeKey} -> ${targetUrl} failed:`, error)
    throw createError({
      statusCode: 502,
      statusMessage: 'Upstream request failed'
    })
  }

  setResponseStatus(event, upstream.status)
  for (const name of PASS_THROUGH_RESPONSE_HEADERS) {
    const value = upstream.headers.get(name)
    if (value) setHeader(event, name, value)
  }
  const setCookies = upstream.headers.getSetCookie?.() || []
  if (setCookies.length > 0) setHeader(event, 'Set-Cookie', setCookies)

  // 附件/图片等二进制响应没有可读的 content-type 时按字节流返回
  const upstreamType = upstream.headers.get('content-type') || ''
  if (upstreamType.includes('text/event-stream')) {
    return upstream.body
  }
  if (upstream.status === 204 || upstream.status === 304 || method === 'HEAD') {
    return null
  }

  const buffer = Buffer.from(await upstream.arrayBuffer())
  return buffer.length > 0 ? buffer : null
})
