export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/home')
    navigateTo('/blob')
})
