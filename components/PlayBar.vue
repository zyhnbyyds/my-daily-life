<script lang='ts' setup>
import type { LyricItem } from '@/components/LyricsList.vue'

const props = defineProps<{
  duration?: number
  currentTime: number
  lyrics: LyricItem[]
  /** 专辑封面 */
  songPic: string
  /** 歌手 */
  singer: string
  /** 歌曲名 */
  songName: string
  songList: Music.Song[] | undefined
}>()

const emits = defineEmits<{
  (event: 'update:currentTime', val: number): void
  (event: 'songChange', id: number): void }
>()

const { duration, currentTime, lyrics, songPic, songName } = toRefs(props)

const currentTimeAct = computed({
  get() {
    return currentTime.value
  },
  set(val) {
    emits('update:currentTime', val)
  },
})

const playing = defineModel<boolean>('playing', { default: false })
const [isopen, toggole] = useToggle(true)
const maskRef = ref<HTMLElement | null>(null)
const [isShowSongs, toggoleSongShow] = useToggle(false)

function handleActiveChange(songId: number) {
  emits('songChange', songId)
}
</script>

<template>
  <div class="fixed bottom-3.4 absolute-x-center">
    <div h-72px flex-col-center inline-flex gap-21px rounded-full px-21px border-com shadow-com bg-com>
      <div class="flex gap-30px">
        <Icon size="26" name="fluent-emoji-high-contrast:fast-reverse-button" />
        <Icon v-show="playing" size="26" name="fluent-emoji-high-contrast:pause-button" @click="playing = !playing" />
        <Icon v-show="!playing" size="26" name="fluent-emoji-high-contrast:play-button" @click="playing = !playing" />
        <Icon size="26" name="fluent-emoji-high-contrast:fast-forward-button" />
      </div>
      <div class="h-48px min-w-366px flex-col-center justify-between rounded-8px bg-black bg-op25 px-6px py-5px">
        <div flex-col-center>
          <div relative h-33px w-33px rounded-6px @click="toggole()" @mouseleave="maskRef!.style.display = 'none'" @mouseover="maskRef!.style.display = 'flex'">
            <img class="h-full w-full" :src="songPic">
            <div ref="maskRef" absolute-0 hidden h-full w-full items-center justify-center bg-black bg-op20 transition-all dark:bg-op40>
              <Icon v-if="!isopen" animate-bounce name="solar:double-alt-arrow-up-outline" />
              <Icon v-else animate-bounce name="solar:double-alt-arrow-down-outline" />
            </div>
          </div>
          <div class="ml-10px flex-col justify-between font-300" flex="~">
            <div class="text-13px leading-17px">
              {{ songName }}
            </div>
            <div class="text-12px leading-15px">
              {{ singer }}
            </div>
          </div>
        </div>
        <div i-iconamoon:menu-kebab-horizontal-fill h-40px w-40px />
      </div>
      <div class="flex gap-34px">
        <Icon size="22" name="material-symbols:computer-outline-rounded" />
        <Icon size="22" name="material-symbols:format-list-bulleted-rounded" @click="toggoleSongShow()" />
        <Icon size="22" name="carbon:volume-up" />
      </div>
    </div>
    <div
      class="bottom-1/2 h-full w-9/8 overflow-hidden rounded-4 trans-300 absolute-x-center -z-10 shadow-com bg-com"
      :class="{ 'w-9/7! h-140! rounded-4!': isopen }"
    >
      <div class="scroll-style absolute-0 bottom-0 w-full overflow-y-auto p-4 pb-20">
        <div class="h-calc(100%-160px)">
          <Transition name="fade">
            <LyricsList v-if="isShowSongs" :current-time="currentTime" :lyrics="lyrics" />
            <ActiveBgList v-else :list="songList ?? []" label-field="name" value-field="id" @change="handleActiveChange" />
          </Transition>
        </div>
        <Progress v-model="currentTimeAct" :max="duration" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ddd {
  font-style: italic;
}
</style>
