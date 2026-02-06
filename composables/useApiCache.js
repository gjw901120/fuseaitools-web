/**
 * 本地缓存工具：用于 /api/common/models/tree、/api/common/models/price 等接口
 * 缓存时长 1 小时；读取时若无有效缓存则请求接口并写入缓存
 */
const CACHE_TTL_MS = 60 * 60 * 1000 // 1 小时
const STORAGE_PREFIX = 'api_cache_'

/**
 * 从 localStorage 读取缓存，若不存在或已过期返回 null
 * @param {string} key - 缓存键（不含前缀）
 * @returns {*} 缓存的数据，或 null
 */
function getCached(key) {
  if (!process.client || typeof localStorage === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key)
    if (!raw) return null
    const { data, expiresAt } = JSON.parse(raw)
    if (expiresAt != null && Date.now() > Number(expiresAt)) return null
    return data
  } catch {
    return null
  }
}

/**
 * 将数据写入 localStorage，过期时间为当前时间 + CACHE_TTL_MS
 * @param {string} key - 缓存键（不含前缀）
 * @param {*} data - 要缓存的数据（会被 JSON.stringify）
 */
function setCached(key, data) {
  if (!process.client || typeof localStorage === 'undefined') return
  try {
    const expiresAt = Date.now() + CACHE_TTL_MS
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify({ data, expiresAt }))
  } catch (e) {
    console.warn('ApiCache setCached failed:', e)
  }
}

/**
 * 带缓存的请求：先读缓存，有效则直接返回；否则执行 fetchFn，将结果写入缓存后返回
 * @param {string} key - 缓存键
 * @param {() => Promise<*>} fetchFn - 无参异步函数，返回接口数据
 * @returns {Promise<*>} 接口数据（来自缓存或请求）
 */
export async function fetchWithCache(key, fetchFn) {
  const cached = getCached(key)
  if (cached !== null) return cached
  const data = await fetchFn()
  setCached(key, data)
  return data
}

export function useApiCache() {
  return {
    CACHE_TTL_MS,
    getCached,
    setCached,
    fetchWithCache
  }
}
