/**
 * 用户积分账户信息（GET /api/user/credits）
 *
 * 接口返回结构：
 * - availableCredits:    recharge + subscription 可用额度，主展示
 * - blockedCredits:      在途冻结（生成中任务已扣未结算）
 * - rechargeCredits:     充值账户分项
 * - subscriptionCredits: 订阅账户分项，到期/非订阅为 0
 * - isSubscription:      是否订阅用户（1/0）
 * - discount:            订阅折扣率，与计费同源；非订阅固定为 1
 *
 * 全局单例状态：顶栏头像右侧展示、悬停明细共享同一份数据；
 * 登录后自动拉取一次，窗口重新获得焦点时再刷新，保证余额接近实时。
 */
import { ref, computed } from 'vue'
import { useApi } from '~/composables/useApi'
import { useAuth } from '~/composables/useAuth'

// 全局单例状态：所有组件共享
const creditsState = ref(null)
const loading = ref(false)

// 数字格式化：整数不带小数位，小数最多保留 2 位（45.5 -> "45.5"，18 -> "18"）
function formatCredits(v) {
  if (v == null) return '—'
  const n = Number(v)
  if (!Number.isFinite(n)) return '—'
  return String(parseFloat(n.toFixed(2)))
}

function toNumber(v, fallback = 0) {
  const n = Number(v)
  return Number.isFinite(n) ? n : fallback
}

export function useUserCredits() {
  const { get } = useApi()
  const { isAuthenticated } = useAuth()

  /**
   * 拉取积分账户信息：
   * - 未登录时清空状态、不请求
   * - silent 请求，失败不打断页面（顶栏保持旧值）
   */
  const fetchUserCredits = async () => {
    if (!isAuthenticated.value) {
      creditsState.value = null
      return null
    }
    if (loading.value) return creditsState.value
    loading.value = true
    try {
      const data = await get('/api/user/credits', { silent: true })
      if (data && typeof data === 'object') {
        creditsState.value = data
      }
      return data
    } catch (e) {
      console.error('Fetch user credits failed:', e)
      return creditsState.value
    } finally {
      loading.value = false
    }
  }

  const hasData = computed(() => creditsState.value != null)

  const availableCredits = computed(() => toNumber(creditsState.value?.availableCredits))
  const blockedCredits = computed(() => toNumber(creditsState.value?.blockedCredits))
  const rechargeCredits = computed(() => toNumber(creditsState.value?.rechargeCredits))
  const subscriptionCredits = computed(() => toNumber(creditsState.value?.subscriptionCredits))

  // 是否订阅用户（isSubscription === 1）
  const isSubscription = computed(() => toNumber(creditsState.value?.isSubscription) === 1)

  // 订阅折扣率：与计费同源，无效值按 1（无折扣）处理
  const discount = computed(() => {
    const n = toNumber(creditsState.value?.discount, 1)
    return n > 0 ? n : 1
  })

  // 展示文本：未加载完成时显示 "—"
  const availableCreditsText = computed(() =>
    hasData.value ? formatCredits(availableCredits.value) : '—'
  )
  const blockedCreditsText = computed(() =>
    hasData.value ? formatCredits(blockedCredits.value) : '—'
  )
  const rechargeCreditsText = computed(() =>
    hasData.value ? formatCredits(rechargeCredits.value) : '—'
  )
  const subscriptionCreditsText = computed(() =>
    hasData.value ? formatCredits(subscriptionCredits.value) : '—'
  )

  // 头像外边框上的折扣徽标文本：
  // - 折扣 < 1 时展示实际支付比例（0.8 -> "80%"，与 credits 详情页 Discount 口径一致）
  // - 订阅但无折扣时展示 "SUB"
  const discountBadgeText = computed(() => {
    if (!isSubscription.value) return ''
    if (discount.value < 1) return `${Math.round(discount.value * 100)}%`
    return 'SUB'
  })

  return {
    credits: creditsState,
    loading,
    hasData,
    fetchUserCredits,
    availableCredits,
    blockedCredits,
    rechargeCredits,
    subscriptionCredits,
    isSubscription,
    discount,
    availableCreditsText,
    blockedCreditsText,
    rechargeCreditsText,
    subscriptionCreditsText,
    discountBadgeText
  }
}
