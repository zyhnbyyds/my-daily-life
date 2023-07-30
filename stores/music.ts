import { defineStore } from 'pinia'

export const useMusicStore = defineStore('music-store', () => {
  const qrcodekeyGet = ref<string | null>(null)
  const isMusicLogin = ref(false)
  const qrcodeUrl = ref<string>('')

  // 轮询获取是否扫码登录
  const { pause, resume, isActive } = useIntervalFn(async () => {
    const { data } = await useFetch<{ code: number; cookie: string; message: string }>('/music/login/qr/check', { params: { key: qrcodekeyGet.value, timestamp: Date.now() } })
    if (data.value && (data.value.code === 800 || data.value.code === 400)) {
      pause()
    }
    else if (data.value && data.value.code === 803) {
      pause()
      isMusicLogin.value = true
    }
  }, 1000, { immediate: false })

  /**
   * 获取qrcode
   */
  async function getQrcodekey() {
    const { data: qrcodekey } = await useFetch<MusicApi.ApiRes<{ unikey: string; code: number }>>('/music/login/qr/key')

    if (qrcodekey.value && qrcodekey.value.code === 200 && qrcodekey.value.data)
      qrcodekeyGet.value = qrcodekey.value.data.unikey

    return qrcodekey.value ? qrcodekey.value.data : ''
  }

  /**
   * 获取登录二维码
   */
  async function getQrcodeUrl() {
    const { data } = await useFetch<MusicApi.ApiRes<Music.LoginQrcodeUrl>>('/music/login/qr/create', { params: { key: qrcodekeyGet.value } })

    if (data.value) {
      const { data: res, code } = data.value
      if (code === 200)
        qrcodeUrl.value = res.qrurl
    }
  }

  return {
    resume,
    pause,
    isActive,
    getQrcodekey,
    isMusicLogin,
    getQrcodeUrl,
    qrcodeUrl,
  }
})
