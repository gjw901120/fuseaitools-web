export function clampDescription(rawText, min = 120, max = 160, options = {}) {
  const {
    fallback = '',
    appendSentences = []
  } = options

  let text = String(rawText || '').replace(/\s+/g, ' ').trim()
  if (!text) text = String(fallback || '').replace(/\s+/g, ' ').trim()

  for (const sentence of appendSentences) {
    if (text.length >= min) break
    const extra = String(sentence || '').replace(/\s+/g, ' ').trim()
    if (extra) text += (text ? ' ' : '') + extra
  }

  if (text.length < min) {
    const generic = 'Use this page on FuseAI Tools with clear settings, stable results, and transparent credit usage.'
    if (text) text += ` ${generic}`
    else text = generic
  }

  if (text.length > max) {
    const clipped = text.slice(0, max)
    const lastSpace = clipped.lastIndexOf(' ')
    const safe = lastSpace > 0 ? clipped.slice(0, lastSpace).trim() : clipped.trim()
    text = safe.replace(/[,:;.\-]+$/g, '').trim() + '.'
  }

  return text
}
