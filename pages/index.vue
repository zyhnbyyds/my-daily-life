<script lang='ts' setup>
import { handleLyric } from '@/utils/music'

interface SongInfo {
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

definePageMeta({
  layout: 'default',
})

const audio = ref<HTMLAudioElement | null>(null)

const somethingAboutSong = reactive<SongInfo>({
  lyrics: [],
  playUrl: '',
  likeList: [],
  name: '****',
  pic: '/my.jpg',
  singer: '',
})

const likeIds = ref<number[]>([])
const songPlayUrl = ref<string>('')

const { playing, currentTime, duration } = useMediaControls(audio, {
  src: songPlayUrl,
})

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
async function handleSongChange(id: number, play?: boolean) {
  playing.value = false
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

  nextTick(() => {
    if (play)
      playing.value = true
  })
}

loadData()
</script>

<template>
  <div class="relative hw-full">
    <div class="w-full">
      Hi. My name is YuJie.Zhang. Nice to see you here. I am a frounted developer.
    </div>

    <button class="border-com btn" @click="$router.push('/music/login')">
      登录
    </button>

    <PlayBar
      v-model:playing="playing"
      v-model:current-time="currentTime"
      :song-name="somethingAboutSong.name"
      :lyrics="somethingAboutSong.lyrics"
      :duration="duration"
      :song-pic="somethingAboutSong.pic"
      :singer="somethingAboutSong.singer"
      :song-list="somethingAboutSong.likeList"
      @song-change="handleSongChange($event, true)"
    />

    <audio ref="audio" />
  </div>
</template>

<style scoped></style>
