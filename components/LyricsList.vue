<script lang='ts' setup>
export interface LyricItem { label: string; time: number; duration: number }

const props = defineProps<{
  lyrics: { label: string; time: number; duration: number }[]
  currentTime: number
}>()

const { lyrics, currentTime } = toRefs(props)

const isShow = ref(false)
const lyricsRef = ref<HTMLElement | null>(null)
const lyricsListRef = ref<HTMLElement[] | null>(null)
const resizeLyricConRef = ref<HTMLElement | null>(null)

const tops = reactive<number[]>([])
const scroolActiveIndexLyric = ref<number | null>(null)
const activeLyric = ref<number | null>(null)

const { isScrolling, y } = useScroll(lyricsRef, { behavior: 'smooth' })
const { height } = useElementSize(resizeLyricConRef)

watch(() => isScrolling.value, (val) => {
  if (!val) {
    setTimeout(() => {
      isShow.value = false
      scroolActiveIndexLyric.value = null
    }, 1500)
  }
  else {
    isShow.value = true
  }
})

watch(() => y.value, async (val) => {
  await nextTick()

  if (val > 0 && val < 60)
    scroolActiveIndexLyric.value = 0

  const changeVal = val + toValue(height) / 2 - 20

  tops.forEach((item, index) => {
    if (index >= 1 && changeVal > tops[index - 1] && changeVal < item)
      scroolActiveIndexLyric.value = index
  })
})

watch(() => currentTime.value, (val) => {
  const fixedNum = Number.parseFloat(val.toFixed(3))
  const index = lyrics.value.findIndex((item) => {
    return item.time - fixedNum < 0.2 && item.time - fixedNum > -0.2
  })

  if (index !== -1) {
    activeLyric.value = index
    y.value = index * 40 + 50
  }
})

onMounted(() => {
  lyricsListRef.value?.forEach((item) => {
    tops.push(item.offsetTop)
  })
})
</script>

<template>
  <div ref="resizeLyricConRef" class="relative h-full">
    <div ref="lyricsRef" class="scroll-style relative h-full overflow-y-auto text-center">
      <div v-for="item, i in lyrics" ref="lyricsListRef" :key="i" class="leading-10 op-40" :class="{ 'font-bold op-55!': scroolActiveIndexLyric === i, 'font-blod op-100!': activeLyric === i }">
        {{ item.label }}
      </div>
    </div>
    <div class="absolute-0 h-full w-full -z-1">
      <div v-show="isShow" class="h-2px w-full bg-blue absolute-y-center" />
    </div>
  </div>
</template>

<style scoped></style>
