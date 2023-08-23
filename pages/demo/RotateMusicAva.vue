<!-- 旋转的音乐头像 -->
<script lang='ts' setup>
const [isRotate, toggole] = useToggle()
const rotateDeg = ref(0)

const { pause, resume } = useIntervalFn(() => {
  if (rotateDeg.value < 360)
    rotateDeg.value += 1

  else if (rotateDeg.value === 360)
    rotateDeg.value = 0
}, 6)

watch(() => isRotate.value, () => {
  const flag = toValue(isRotate)
  if (flag)
    pause()
  else
    resume()
})

onBeforeUnmount(() => {
  pause()
})
</script>

<template>
  <div hw-full flex-center @click="toggole()">
    <div flex="~ col" class="items-center">
      <div mb-5>
        点击任何位置切换状态
      </div>
      <div h-30 w-30 flex-center rounded-full bg-green200>
        <div carbon:face-wink-filled :style="{ transform: `rotate(${rotateDeg}deg)` }" text="80px red" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
