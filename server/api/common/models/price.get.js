/**
 * 价格接口代理：GET /api/common/models/price
 * 仅透传 Authorization，无其他参数
 */
let _cacheValue = null
let _cacheExpireAt = 0

export default defineEventHandler(async (event) => {
  const apiBase = getEffectiveApiBase(event)
  const targetUrl = `${apiBase}/common/models/price`

  // TTL 缓存（进程内内存缓存）：默认 10 分钟，可用 PRICE_MODELS_TTL_SECONDS 覆盖
  // 注意：该接口返回的是「模型定价配置」，通常不涉及用户私有数据，因此可安全做全局缓存。
  // 若未来接入“按用户/订阅等级返回不同定价”，需改为按 Authorization 分桶缓存或关闭缓存。
  const ttlSecondsRaw = process.env.PRICE_MODELS_TTL_SECONDS
  const ttlSeconds = (() => {
    const n = Number(ttlSecondsRaw)
    return Number.isFinite(n) && n > 0 ? n : 600
  })()
  const now = Date.now()
  if (_cacheValue && _cacheExpireAt > now) {
    return _cacheValue
  }

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
  const authHeader = getHeader(event, 'authorization')
  if (authHeader) {
    headers['Authorization'] = authHeader
  } else {
    // SEO/未登录场景：如果上游 price 接口需要鉴权，可通过环境变量提供服务端固定凭证
    // - PRICE_MODELS_AUTHORIZATION: 直接传完整 Authorization 值（如 "Bearer xxx"）
    // - PRICE_MODELS_BEARER_TOKEN: 只传 token，本处会补 "Bearer "
    const serverAuth = process.env.PRICE_MODELS_AUTHORIZATION
    const serverToken = process.env.PRICE_MODELS_BEARER_TOKEN
    if (serverAuth) {
      headers['Authorization'] = serverAuth
    } else if (serverToken) {
      headers['Authorization'] = `Bearer ${serverToken}`
    }
  }

  try {
    const response = await $fetch(targetUrl, {
      method: 'GET',
      headers
    })
    _cacheValue = response
    _cacheExpireAt = now + ttlSeconds * 1000
    return response
  } catch (error) {
    console.error('Price proxy error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to fetch price'
    })
  }
})
