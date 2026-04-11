export default defineNuxtRouteMiddleware((to) => {
  if (useRuntimeConfig().public.midjourneyEnabled) return
  const path = to.path || ''
  if (path === '/home/midjourney' || path.startsWith('/home/midjourney/')) {
    return navigateTo('/home')
  }
})
