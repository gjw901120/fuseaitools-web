/**
 * Extend-list 请求前置：仅已登录用户才应调用 /api/records/extend-list
 */
export function useExtendListAuth() {
  const { isAuthenticated } = useAuth()

  function shouldFetchExtendList() {
    if (!process.client) return false
    return !!isAuthenticated.value
  }

  /**
   * @param {import('vue').Ref<Array>} extendListRef
   * @param {{ loadingRef?: import('vue').Ref<boolean>, hasLoadedRef?: import('vue').Ref<boolean> }} [options]
   * @returns {boolean} true 表示已登录，可继续请求
   */
  function guardExtendListFetch(extendListRef, options = {}) {
    const { loadingRef, hasLoadedRef } = options
    if (shouldFetchExtendList()) return true
    extendListRef.value = []
    if (loadingRef) loadingRef.value = false
    if (hasLoadedRef) hasLoadedRef.value = false
    return false
  }

  return { isAuthenticated, shouldFetchExtendList, guardExtendListFetch }
}
