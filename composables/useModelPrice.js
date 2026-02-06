/**
 * 根据 /api/common/models/price 返回的定价数据，按模型与表单字段计算并展示 credits
 * - type ONCE：直接使用 once.credits
 * - type RULE：用表单字段（duration, quality, size, batchSize, speed, scene）匹配 rules，取匹配规则的 credits
 * - 接口结果缓存到本地 1 小时，无有效缓存时再请求接口并写入缓存
 */
import { ref, computed } from 'vue'
import { fetchWithCache } from '~/composables/useApiCache'

const CACHE_KEY_PRICE = 'api_common_models_price'
const priceDataCache = ref(null)

export function useModelPrice() {
  const { get } = useApi()

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
   * @param {string} modelKey - 与接口 data 中的 key 一致，如 'nano-banana', 'sora-2-text-to-video', 'runway_generate'
   * @param {Object} [formFields] - 仅 RULE 时需要，用于匹配 rules。字段与 rule 一致：duration, quality, size, batchSize, speed, scene 等
   * @returns {number|null} credits 或 null
   */
  const getPrice = (modelKey, formFields = {}) => {
    const data = priceDataCache.value
    if (!data || !modelKey) return null
    const item = data[modelKey]
    if (!item || typeof item !== 'object') return null

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
    formatCredits
  }
}
