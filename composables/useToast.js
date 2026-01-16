/**
 * Toast 通知管理（全局单例）
 */
// 全局状态，确保所有组件共享同一个 toasts 数组
const globalToasts = ref([])
let globalToastId = 0

export const useToast = () => {
  const toasts = globalToasts
  let toastId = globalToastId

  /**
   * 显示 Toast 通知
   * @param {string} message - 消息内容
   * @param {string} type - 类型：error, success, warning, info
   * @param {number} duration - 显示时长（毫秒），0 表示不自动关闭
   */
  const showToast = (message, type = 'error', duration = 3000) => {
    if (!message) {
      console.warn('Toast message is empty')
      return
    }

    const id = ++globalToastId
    const toast = {
      id,
      message,
      type,
      duration
    }

    globalToasts.value.push(toast)
    console.log('Toast added:', toast, 'Total toasts:', globalToasts.value.length)

    // 如果设置了自动关闭，在指定时间后移除
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }

  /**
   * 移除 Toast
   * @param {number} id - Toast ID
   */
  const removeToast = (id) => {
    const index = globalToasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      globalToasts.value.splice(index, 1)
    }
  }

  /**
   * 显示错误消息
   */
  const showError = (message, duration = 3000) => {
    return showToast(message, 'error', duration)
  }

  /**
   * 显示成功消息
   */
  const showSuccess = (message, duration = 3000) => {
    return showToast(message, 'success', duration)
  }

  /**
   * 显示警告消息
   */
  const showWarning = (message, duration = 3000) => {
    return showToast(message, 'warning', duration)
  }

  /**
   * 显示信息消息
   */
  const showInfo = (message, duration = 3000) => {
    return showToast(message, 'info', duration)
  }

  /**
   * 清除所有 Toast
   */
  const clearAll = () => {
    globalToasts.value = []
  }

  return {
    toasts: readonly(toasts),
    showToast,
    showError,
    showSuccess,
    showWarning,
    showInfo,
    removeToast,
    clearAll
  }
}

