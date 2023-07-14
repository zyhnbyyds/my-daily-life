<script lang='ts' setup>
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

// import { useQRCode } from '@vueuse/integrations/useQRCode'
// import { useAppStore } from '@/stores/app'

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

const parttern = /\[\d{2}:\d{2}\.\d{3}\]/

const { playing, currentTime, duration } = useMediaControls(audio, {
  src: songPlayUrl,
})

function handleLyric(lyricGet: string | undefined) {
  if (!lyricGet)
    return []
  const lyricArrays = lyricGet.split('\n')
  return lyricArrays.map((item: string, index: number) => {
    const time = hadnleStringTimeToNumber(parttern.exec(item) ? parttern.exec(item)![0] : '')

    const nextItem = lyricArrays[index + 1]
    const nextTime = nextItem ? hadnleStringTimeToNumber(parttern.exec(nextItem) ? parttern.exec(nextItem)![0] : '') : -1

    const singleLyricduration = nextTime === -1 ? 2 : nextTime - time
    return { label: item.replace(parttern, ''), time, duration: Number.parseFloat(singleLyricduration.toFixed(3)) }
  })
}

async function loadData() {
  const { data: res } = await useFetch<Music.SongsLikeIdList>('/proxy/music/likelist', { params: { uid: 1670075991 } })
  likeIds.value = res.value ? res.value.ids : []
  const { data: song } = await useFetch<Music.SongDetailList>('/proxy/music/song/detail', { params: { ids: likeIds.value ? likeIds.value.join(',') : '' } })

  somethingAboutSong.likeList = song.value ? song.value.songs : []

  if (toValue(likeIds).length >= 1)
    handleSongChange(toValue(likeIds)[0])
}

async function handleSongChange(id: number) {
  playing.value = false
  const { data: lyrics } = await useFetch<Music.SongLyric>('/proxy/music/lyric', { params: { id } })
  const { data: playUrl } = await useFetch<Music.SongPlayUrl>('/proxy/music/song/url', { params: { id } })
  const { data: songDetail } = await useFetch<Music.SongDetailList>('/proxy/music/song/detail', { params: { ids: id } })

  const currentSong = songDetail.value ? songDetail.value.songs[0] : null
  songPlayUrl.value = playUrl.value ? playUrl.value.data[0].url : ''

  Object.assign(somethingAboutSong, {
    lyrics: lyrics.value ? handleLyric(lyrics.value.lrc.lyric) : [],
    name: currentSong ? currentSong.name : '***',
    pic: currentSong ? currentSong.al.picUrl : '/my.jpg',
    singer: currentSong ? currentSong.ar.map((item: any) => item.name).join('/') : '佚名',
  })

  nextTick(() => {
    playing.value = true
  })
}

loadData()
</script>

<template>
  <div class="relative hw-full px-20">
    <span class="pl-7 text-6">
      Hi. My name is YuJie.Zhang. Nice to see you here. I am a frounted developer.
    </span>
    <PlayBar
      v-model:playing="playing"
      v-model:current-time="currentTime"
      :song-name="somethingAboutSong.name"
      :lyrics="somethingAboutSong.lyrics"
      :duration="duration"
      :song-pic="somethingAboutSong.pic"
      :singer="somethingAboutSong.singer"
      :song-list="somethingAboutSong.likeList"
      @song-change="handleSongChange"
    />
    <audio ref="audio" />
    <!-- TODO task list <br>
      1. md file image preview [md文件的图片预览] done
      2. demo page thumbnail add [demo页面的缩略图预览]
      3. 音乐播放器的实现
    -->
  </div>
</template>

<style scoped></style>
