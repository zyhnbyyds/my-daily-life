<script lang='ts' setup>
import { handleObjStyleToElement } from '@/utils/common'

const props = withDefaults(defineProps<{
  max?: number
  vertical?: boolean
  /** 高度或者宽度 */
  heitOrWid?: number
}>(), { max: 100, vertical: false, heitOrWid: 10 })

const { max, vertical, heitOrWid } = toRefs(props)

const value = defineModel<number>({ default: 0 })
const bar = ref<HTMLElement | null>(null)
const dotRef = ref<HTMLElement | null>(null)
const isMouseDown = ref(false)

const { width, height, left, top } = useElementBounding(bar)

const movePlace = reactive({
  startX: 0,
  startY: 0,
  move: 0,
  rate: 1,
})

const barHW = computed(() => {
  if (!bar.value)
    return 0
  return vertical.value ? height.value : width.value
})

const barPoiXY = computed(() => {
  if (!bar.value)
    return 0
  return vertical.value ? top.value : left.value
})

const dotHWStyle = computed(() => {
  return vertical.value
    ? {
        height: `${value.value / max.value * barHW.value}px`,
        width: '100%',
      }
    : {
        height: '100%',
        width: `${value.value / max.value * barHW.value}px`,
      }
})

useEventListener(dotRef, 'mousedown', (e: MouseEvent) => {
  isMouseDown.value = true
  movePlace.startX = e.offsetX
  movePlace.startY = e.offsetY
})

useEventListener('mousemove', (eMove: MouseEvent) => {
  if (!bar.value)
    return
  if (isMouseDown.value)
    value.value = ((vertical.value ? eMove.y : eMove.x) - barPoiXY.value - (vertical.value ? movePlace.startY : movePlace.startX)) / barHW.value * toValue(max)
})

useEventListener('mouseup', () => {
  isMouseDown.value = false
})

watch(() => value.value, (val) => {
  if (val > toValue(max))
    value.value = toValue(max)

  else if (val < 0)
    value.value = 0

  movePlace.move = val / toValue(max)
}, { immediate: true })

// watch(() => movePlace.move, (val) => {
//   if (!bar.value)
//     return
//   if (val < 0)
//     movePlace.move = 0
//   else if (val > 1)
//     movePlace.move = 1

//   value.value = movePlace.move * max.value
// })

onMounted(() => {
  if (!bar.value || !dotRef.value)
    return

  movePlace.move = toValue(value) / toValue(max)

  const hw = `${heitOrWid.value * 1.5}px`

  const topLeft = (flag: boolean) => {
    return flag ? `-${(heitOrWid.value * 1.5 - heitOrWid.value) / 2}px` : `-${heitOrWid.value * 1.5 / 2}px`
  }

  const dotStyle = {
    height: hw,
    width: hw,
    left: topLeft(vertical.value),
    top: topLeft(!vertical.value),
  }

  handleObjStyleToElement(dotStyle, dotRef)
})
</script>

<template>
  <div
    ref="bar" class="relative rounded-full border-com bg-com"
    :style="{
      height: vertical ? '100%' : `${heitOrWid}px`,
      width: vertical ? `${heitOrWid}px` : '100%',
    }"
  >
    <div
      class="absolute-0 rounded-full bg-lightBlue"
      :style="dotHWStyle"
    />
    <div
      ref="dotRef"
      class="absolute rounded-full bg-blue border-com"
      :style="{ transform: `translate${vertical ? 'Y' : 'X'}(${value / max * barHW}px)` }"
      @dragstart="(e) => e.preventDefault()"
      @mouseup="isMouseDown = false"
    />
  </div>
</template>

<style scoped></style>
