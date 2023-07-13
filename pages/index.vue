<script lang='ts' setup>
import type { LyricItem } from '@/components/LyricsList.vue'

// import { useQRCode } from '@vueuse/integrations/useQRCode'
// import { useAppStore } from '@/stores/app'

definePageMeta({
  layout: 'default',
})

const audio = ref<HTMLAudioElement | null>(null)
// const appStore = useAppStore()
// const { data: qrcodekey } = await useFetch<MusicApi.ApiRes<{ unikey: string; code: number }>>('/proxy/music/login/qr/key')

// appStore.qrcodeKey = qrcodekey.value?.data.unikey ?? ''

// const { data: qrcodeUrl } = await useFetch<MusicApi.ApiRes<{ qrurl: string; qrimg: string }>>('/proxy/music/login/qr/create', { params: { key: appStore.qrcodeKey } })

// const qrcodeUrltrans = useQRCode(qrcodeUrl.value?.data.qrurl ?? '无数据')

// appStore.resume()

// const { data } = await useFetch<any>('/proxy/music/user/account')
const { data } = await useFetch<any>('/proxy/music/lyric', { params: { id: 386844 } })
const { data: songUrl } = await useFetch<any>('/proxy/music/song/url', { params: { id: 386844 } })
const { data: song } = await useFetch<any>('/proxy/music/song/detail', { params: { ids: '386844' } })
// const { data: testList } = await useFetch<any>('/proxy/music/likelist', { params: { uid: 1670075991 } })
// 430685732 386844 1374701777 39637593 1841002409
// console.log(testList.value)

// TODO ToDo
const { playing, currentTime, duration } = useMediaControls(audio, {
  src: songUrl.value ? songUrl.value.data[0].url : '',
})

const lyrics = ref<LyricItem[]>([])

const parttern = /\[\d{2}:\d{2}\.\d{3}\]/

function handleLyric() {
  if (data.value) {
    const lyricArrays = (data.value.lrc.lyric as string).split('\n')
    lyrics.value = lyricArrays.map((item: string, index: number) => {
      const time = hadnleStringTimeToNumber(parttern.exec(item) ? parttern.exec(item)![0] : '')

      const nextItem = lyricArrays[index + 1]
      const nextTime = nextItem ? hadnleStringTimeToNumber(parttern.exec(nextItem) ? parttern.exec(nextItem)![0] : '') : -1

      const singleLyricduration = nextTime === -1 ? 2 : nextTime - time
      return { label: item.replace(parttern, ''), time, duration: Number.parseFloat(singleLyricduration.toFixed(3)) }
    })
  }
}
handleLyric()
</script>

<template>
  <div class="relative hw-full px-20">
    <span class="pl-7 text-6">
      Hi. My name is YuJie.Zhang. Nice to see you here. I am a frounted developer.
    </span>
    <PlayBar
      v-model:playing="playing"
      :current-time="currentTime"
      :song-name="song ? song.songs[0].name : '未知歌曲'"
      :lyrics="lyrics"
      :song-pic="song ? song.songs
        [0].al.picUrl : '/my.jpg'"
      :singer="song
        ? song.songs[0].ar.map((item: any) => item.name).join('/') : ''"
    />
    <!-- <input v-model="currentTime" type="number"> -->
    <audio ref="audio" />
    <!-- TODO task list <br>
      1. md file image preview [md文件的图片预览] done
      2. demo page thumbnail add [demo页面的缩略图预览]
      3. 音乐播放器的实现
    -->
  </div>
</template>

<style scoped></style>
