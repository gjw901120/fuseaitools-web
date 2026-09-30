/**
 * 通用日期格式化工具
 *
 * 后端所有时刻字段均已改为 epoch 毫秒（number），前端统一用 new Date(epochMs) 渲染。
 * 日历日字段（subscription startDate/endDate 等）仍为 "yyyy-MM-dd" 字符串，原样展示即可。
 */

/**
 * epoch 毫秒 → 本地化日期时间（跟随浏览器时区）
 * @param {number|null|undefined} epochMs
 * @returns {string}
 */
export const formatDateTime = (epochMs) =>
  epochMs == null ? '' : new Date(epochMs).toLocaleString()

/**
 * epoch 毫秒 → 本地化日期（不含时间，跟随浏览器 locale）
 * @param {number|null|undefined} epochMs
 * @returns {string}
 */
export const formatDate = (epochMs) =>
  epochMs == null ? '' : new Date(epochMs).toLocaleDateString()

/**
 * epoch 毫秒 → 相对时间（24h 内显示"X ago"，超过 24h 显示本地化绝对时间）
 * 使用 Intl.RelativeTimeFormat 自动适配用户语言
 * @param {number|string|Date|null|undefined} timestamp - epoch ms / 可解析的值
 * @returns {string}
 */
export const formatRelativeTime = (timestamp) => {
  if (timestamp == null || timestamp === '') return ''
  const date = new Date(timestamp)
  if (Number.isNaN(date.getTime())) return ''
  const now = new Date()
  const diff = now - date
  const oneDayMs = 24 * 60 * 60 * 1000
  if (diff >= oneDayMs) {
    return date.toLocaleString()
  }
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' })
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  if (hours > 0) return rtf.format(-hours, 'hour')
  if (minutes > 0) return rtf.format(-minutes, 'minute')
  return rtf.format(0, 'second')
}

/**
 * 日历日原样展示（不做任何时区换算）
 * 用于 subscription startDate/endDate 等 "yyyy-MM-dd" 字符串字段
 * @param {string|null|undefined} val - "yyyy-MM-dd" 格式字符串
 * @returns {string}
 */
export const formatCalendarDate = (val) => {
  if (val == null) return ''
  return String(val)
}

/**
 * epoch 毫秒 → ISO-8601 字符串（用于 SEO 结构化数据等需要标准格式的场景）
 * @param {number|null|undefined} epochMs
 * @returns {string}
 */
export const epochToIsoString = (epochMs) => {
  if (epochMs == null) return ''
  const d = new Date(epochMs)
  return Number.isNaN(d.getTime()) ? '' : d.toISOString()
}

// Composable 形式（兼容模板中 useDateFormat() 调用）
export const useDateFormat = () => ({
  formatDateTime,
  formatDate,
  formatRelativeTime,
  formatCalendarDate,
  epochToIsoString
})
