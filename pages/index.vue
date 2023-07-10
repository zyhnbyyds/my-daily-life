<script lang='ts' setup>
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
// const { data } = await useFetch<any>('/proxy/music/lyric', { params: { id: 1988564487 } })
const { data: songUrl } = await useFetch<any>('/proxy/music/song/url', { params: { id: 1988564487 } })
// const { data: song } = await useFetch<any>('/proxy/music/song/detail', { params: { ids: '1988564487' } })
// const { data } = await useFetch<any>('/proxy/music/likelist', { params: { uid: 1670075991 } })

// TODO ToDo
const { playing, currentTime, duration } = useMediaControls(audio, {
  src: songUrl.value ? songUrl.value.data[0].url : '',
})
</script>

<template>
  <div class="relative hw-full px-20">
    <span class="pl-7 text-6">
      Hi. My name is YuJie.Zhang. Nice to see you here. I am a frounted developer.
    </span>
    <!-- <div>
      {{ data ? data.lrc.lyric : '' }}
    </div> -->
    <PlayBar v-model:playing="playing" />
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
