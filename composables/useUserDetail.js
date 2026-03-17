/**
 * 用户详情（含 discount）缓存与获取
 *
 * 需求：
 * - 通过 /api/user/detail 获取用户详情，其中包含 discount（折扣系数）
 * - 结果在本地缓存 1 小时，过期后下次再请求接口并更新缓存
 * - 工具页需要参与 credits 计算时，如果内存中没有数据，则触发一次加载逻辑
 */
import { ref, computed } from 'vue'
import { fetchWithCache } from '~/composables/useApiCache'

const CACHE_KEY_USER_DETAIL = 'api_user_detail'

// 全局单例状态：所有组件共享
const userDetailRef = ref(null)
const loaded = ref(false)
const loading = ref(false)

export function useUserDetail() {
  const { get } = useApi()

  /**
   * 通过缓存获取用户详情：
   * - 先读 localStorage（1 小时 TTL）
   * - 无缓存或已过期时，请求 /api/user/detail 并写入缓存
   */
  const loadUserDetail = async () => {
    try {
      const data = await fetchWithCache(CACHE_KEY_USER_DETAIL, async () => {
        const res = await get('/api/user/detail')
        return res && typeof res === 'object' ? res : null
      })
      userDetailRef.value = data
      loaded.value = true
      return data
    } catch (e) {
      // 接口失败时不影响主流程，仅保持当前状态
      if (!loaded.value) {
        userDetailRef.value = null
      }
      return userDetailRef.value
    }
  }

  /**
   * 工具页需要用户信息时调用：
   * - 如果内存里已有 userDetail，则直接返回
   * - 如果没有，则触发一次 loadUserDetail（内部带 1 小时缓存）
   */
  const ensureUserDetail = async () => {
    if (userDetailRef.value != null) return userDetailRef.value
    // 避免并发重复请求
    if (loading.value) return userDetailRef.value
    loading.value = true
    try {
      return await loadUserDetail()
    } finally {
      loading.value = false
    }
  }

  /**
   * 折扣系数：后端返回 BigDecimal，前端统一转为 number
   * - null/无效值时默认为 1（无折扣）
   */
  const discount = computed(() => {
    const raw = userDetailRef.value?.discount
    const n = Number(raw)
    if (Number.isNaN(n) || n <= 0) return 1
    return n
  })

  // 当在工具页面等位置首次使用该 composable 且参数为空时，
  // 触发一次异步加载（不阻塞调用方），后续计算会自动使用最新的 discount。
  if (process.client && !loaded.value && !loading.value) {
    loading.value = true
    loadUserDetail().finally(() => {
      loading.value = false
    })
  }

  return {
    userDetail: userDetailRef,
    discount,
    loaded,
    loading,
    loadUserDetail,
    ensureUserDetail
  }
}

