import { defineStore } from 'pinia'

export const useAppStore = defineStore('app-store', () => {
  const qrcodeKey = ref('')
  const cookie = useCookie('okok')

  const { pause, resume } = useIntervalFn(async () => {
    const { data } = await useFetch<{ code: number; cookie: string; message: string }>('/proxy/music/login/qr/check', { params: { key: qrcodeKey, timestamp: Date.now() } })
    if (data.value && (data.value.code === 800 || data.value.code === 400))
      pause()

    else if (data.value && data.value.code === 803)
      cookie.value = data.value.cookie
  }, 1000, { immediate: false })

  onBeforeUnmount(() => {
    pause()
  })

  return {
    resume,
    pause,
    qrcodeKey,
  }
})
