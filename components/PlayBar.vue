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
}>()

const { duration, currentTime, lyrics, songPic, songName } = toRefs(props)

const playing = defineModel<boolean>('playing', { default: false })
const [isopen, toggole] = useToggle()
const maskRef = ref<HTMLElement | null>(null)
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
        <Icon size="22" name="material-symbols:format-list-bulleted-rounded" />
        <Icon size="22" name="carbon:volume-up" />
      </div>
    </div>
    <div
      class="bottom-1/2 h-full w-9/8 overflow-hidden rounded-4 trans-300 absolute-x-center -z-10 shadow-com bg-com"
      :class="{ 'w-9/7! h-140! rounded-4!': isopen }"
    >
      <div class="absolute-0 bottom-0 w-full p-4 pb-20">
        <LyricsList :current-time="currentTime" :lyrics="lyrics" />
        <Progress v-model="currentTime" :max="duration" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ddd {
  font-style: italic;
}
</style>
