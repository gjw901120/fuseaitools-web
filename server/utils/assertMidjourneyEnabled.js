export function assertMidjourneyEnabled (event) {
  const cfg = useRuntimeConfig(event)
  if (!cfg.public?.midjourneyEnabled) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Midjourney is temporarily unavailable'
    })
  }
}
