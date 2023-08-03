import { defineStore } from 'pinia'
import { handleLyric } from '@/utils/music'

export interface SongInfo {
  lyrics: {
    label: string
    time: number
    duration: number
  }[]
  playUrl: string
  likeList: Music.Song[]
  name: string
  pic: string
  singer: string
}

export const useMusicStore = defineStore('music-store', () => {
  const qrcodekeyGet = ref<string | null>(null)
  const isMusicLogin = ref(false)
  const qrcodeUrl = ref<string>('')
  const likeIds = ref<number[]>([])
  const songPlayUrl = ref<string>('')

  const somethingAboutSong = reactive<SongInfo>({
    lyrics: [],
    playUrl: '',
    likeList: [],
    name: '****',
    pic: '/my.jpg',
    singer: '',
  })

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

  /**
 * 初始化歌曲列表
 */
  async function loadData() {
    const { data: res } = await useFetch<Music.SongsLikeIdList>('/music/likelist', { params: { uid: 1670075991 } })
    likeIds.value = res.value ? res.value.ids : []
    const { data: song } = await useFetch<Music.SongDetailList>('/music/song/detail', { params: { ids: likeIds.value ? likeIds.value.join(',') : '' } })

    somethingAboutSong.likeList = song.value ? song.value.songs : []

    if (toValue(likeIds).length >= 1)
      handleSongChange(toValue(likeIds)[0])
  }

  /**
 * 点击进行歌曲切换
 * @param id 歌曲id
 * @param paly 切换后是否播放
 */
  async function handleSongChange(id: number) {
    const { data: lyrics } = await useFetch<Music.SongLyric>('/music/lyric', { params: { id } })
    const { data: playUrl } = await useFetch<Music.SongPlayUrl>('/music/song/url', { params: { id } })
    const { data: songDetail } = await useFetch<Music.SongDetailList>('/music/song/detail', { params: { ids: id } })

    const currentSong = songDetail.value ? songDetail.value.songs[0] : null
    songPlayUrl.value = playUrl.value ? playUrl.value.data[0].url : ''

    Object.assign(somethingAboutSong, {
      lyrics: lyrics.value ? handleLyric(lyrics.value.lrc.lyric) : [],
      name: currentSong ? currentSong.name : '***',
      pic: currentSong ? currentSong.al.picUrl : '/my.jpg',
      singer: currentSong ? currentSong.ar.map((item: any) => item.name).join('/') : '佚名',
    })
  }

  return {
    resume,
    pause,
    isActive,
    getQrcodekey,
    isMusicLogin,
    getQrcodeUrl,
    qrcodeUrl,
    loadData,
    handleSongChange,
    likeIds,
    songPlayUrl,
    somethingAboutSong,
  }
})
