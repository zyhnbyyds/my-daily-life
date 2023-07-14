// const appStore = useAppStore()
// const { data: qrcodekey } = await useFetch<MusicApi.ApiRes<{ unikey: string; code: number }>>('/proxy/music/login/qr/key')

// appStore.qrcodeKey = qrcodekey.value?.data.unikey ?? ''

// const { data: qrcodeUrl } = await useFetch<MusicApi.ApiRes<{ qrurl: string; qrimg: string }>>('/proxy/music/login/qr/create', { params: { key: appStore.qrcodeKey } })

// const qrcodeUrltrans = useQRCode(qrcodeUrl.value?.data.qrurl ?? '无数据')

// appStore.resume()

// const { data } = await useFetch<any>('/proxy/music/user/account')
