import { useMusicStore } from '@/stores/music'

export default defineNuxtRouteMiddleware((_to, from) => {
  const musicStore = useMusicStore()

  if (from) {
    if (from.path === '/music/login')
      musicStore.pause()
  }
})
