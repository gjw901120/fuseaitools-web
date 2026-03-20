/**
 * 根据 /api/common/models/price 返回的定价数据，按模型与表单字段计算并展示 credits
 * - type ONCE：直接使用 once.credits
 * - type RULE：用表单字段（duration, quality, size, batchSize, speed, scene）匹配 rules，取匹配规则的 credits
 * - 接口结果缓存到本地 1 小时，无有效缓存时再请求接口并写入缓存
 */
import { ref, computed } from 'vue'
import { fetchWithCache } from '~/composables/useApiCache'
import { useUserDetail } from '~/composables/useUserDetail'

const CACHE_KEY_PRICE = 'api_common_models_price'
const priceDataCache = ref(null)

/** 与 PRICING_MAPPING 一致：定价接口 key 可能为下划线或连字符，取不到时尝试互换后再查 */
function resolvePriceItem(data, modelKey) {
  if (!data || !modelKey) return null
  let item = data[modelKey]
  if (item && typeof item === 'object') return item
  const altKey = modelKey.includes('_')
    ? modelKey.replace(/_/g, '-')
    : modelKey.includes('-')
      ? modelKey.replace(/-/g, '_')
      : null
  if (altKey && altKey !== modelKey) {
    item = data[altKey]
    if (item && typeof item === 'object') return item
  }
  return null
}

/**
 * 根据 PRICING_MAPPING 与 price 接口结构，从原始数据中计算某模型的 credits 最小值与最大值（纯函数，可用于 SSR）
 * - ONCE：min = max = once.credits
 * - RULE：min = min(rules[].credits)，max = max(rules[].credits)
 * @param {Object} data - /api/common/models/price 返回的整份数据
 * @param {string} modelKey - 模型 key（以 PRICING_MAPPING 为准；接口若为连字符/下划线另一种，会做兼容查找）
 * @returns {{ minCredits: number|null, maxCredits: number|null }}
 */
export function getPriceRangeFromData(data, modelKey) {
  if (!data || !modelKey) return { minCredits: null, maxCredits: null }
  const item = resolvePriceItem(data, modelKey)
  if (!item) return { minCredits: null, maxCredits: null }

  const toNum = (c) => {
    if (c == null) return null
    const n = typeof c === 'number' ? c : parseFloat(c)
    return Number.isFinite(n) ? n : null
  }

  if (item.type === 'ONCE' && item.once != null) {
    const c = toNum(item.once.credits)
    return c != null ? { minCredits: c, maxCredits: c } : { minCredits: null, maxCredits: null }
  }

  if (item.type === 'RULE' && Array.isArray(item.rules) && item.rules.length > 0) {
    const values = item.rules.map((r) => toNum(r.credits)).filter((n) => n != null)
    if (values.length === 0) return { minCredits: null, maxCredits: null }
    return {
      minCredits: Math.min(...values),
      maxCredits: Math.max(...values)
    }
  }

  return { minCredits: null, maxCredits: null }
}

export function useModelPrice() {
  const { get } = useApi()
  const { discount } = useUserDetail()

  /**
   * 拉取价格数据（先读本地 1 小时缓存，无有效缓存时请求接口并写入缓存）
   * @returns {Promise<Object>} data 为 { [modelKey]: { type, once?, rules? } }
   */
  const fetchPrices = async () => {
    try {
      const data = await fetchWithCache(CACHE_KEY_PRICE, async () => {
        const res = await get('/api/common/models/price')
        return res && typeof res === 'object' ? res : null
      })
      priceDataCache.value = data
      return priceDataCache.value
    } catch (e) {
      console.warn('Failed to fetch model price:', e)
      return priceDataCache.value
    }
  }

  /**
   * 根据模型 key 和可选表单字段取 credits
   * @param {string} modelKey - 以 PRICING_MAPPING 为准；接口 key 若为下划线/连字符另一种，会做兼容查找
   * @param {Object} [formFields] - 仅 RULE 时需要，用于匹配 rules。字段与 rule 一致：duration, quality, size, batchSize, speed, scene 等
   * @returns {number|null} credits 或 null
   */
  const getPrice = (modelKey, formFields = {}) => {
    const data = priceDataCache.value
    if (!data || !modelKey) return null
    const item = resolvePriceItem(data, modelKey)
    if (!item) return null

    if (item.type === 'ONCE' && item.once != null) {
      const c = item.once.credits
      return typeof c === 'number' ? c : (typeof c === 'string' ? parseFloat(c) : null)
    }

    if (item.type === 'RULE' && Array.isArray(item.rules) && item.rules.length > 0) {
      const match = item.rules.find((rule) => {
        return Object.keys(formFields).every((key) => {
          const formVal = formFields[key]
          if (formVal === undefined || formVal === null) return true
          const ruleVal = rule[key]
          return String(ruleVal) === String(formVal)
        })
      })
      if (match && typeof match.credits === 'number') return match.credits
      if (match && typeof match.credits === 'string') return parseFloat(match.credits)
      if (match) return null
      return null
    }

    return null
  }

  /**
   * 根据 PRICING_MAPPING 与 price 接口结构，取某模型的 credits 最小值与最大值（用于 SEO 等）
   * - ONCE：min = max = once.credits
   * - RULE：min = min(rules[].credits)，max = max(rules[].credits)
   * @param {string} modelKey - 与接口 data 中的 key 一致
   * @param {Object} [priceData] - 可选，不传则用当前缓存的 priceDataCache；传则基于给定数据计算（如 SSR 拉取的 data）
   * @returns {{ minCredits: number|null, maxCredits: number|null }}
   */
  const getPriceRange = (modelKey, priceData) => getPriceRangeFromData(priceData ?? priceDataCache.value, modelKey)

  /**
   * 格式化 credits 用于按钮展示，如 20.0000 -> "20"
   * @param {number|null} credits
   * @returns {string}
   */
  const formatCredits = (credits) => {
    if (credits == null || Number.isNaN(credits)) return ''
    const n = Number(credits)
    return n % 1 === 0 ? String(n) : n.toFixed(2)
  }

  return {
    priceData: priceDataCache,
    fetchPrices,
    getPrice,
    getPriceRange,
    formatCredits,
    // 方便业务侧直接使用当前折扣系数做展示
    discount
  }
}
