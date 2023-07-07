<script lang='ts' setup>
interface Props {
  src: string
  height?: number | string
  width?: number | string
}

const props = defineProps<Props>()

const { src } = toRefs(props)
// 弹出框flag
const modalVisible = ref(false)
// 旋转
const rotateDeg = ref(0)
// 缩放
const scaleLevel = ref(1)
const cursorStyle = ref<'grab' | 'grabbing'>('grab')

const imgStyle = computed(() => {
  return {
    transform: `rotate(${rotateDeg.value}deg) scale(${toValue(scaleLevel)})`,
    cursor: toValue(cursorStyle),
  }
})

const { x, y } = useMouse()

/** 点击进行缩放 */
function handleScale(flag: '-' | '+' | 'reset') {
  if (flag === '+' && toValue(scaleLevel) <= 3)
    scaleLevel.value += 0.5

  else if (flag === '-' && toValue(scaleLevel) >= 0.4)
    scaleLevel.value -= 0.3

  else if (flag === 'reset')
    scaleLevel.value = 1
}
</script>

<template>
  <div>
    {{ `x: ${x}, y": ${y}` }}
    <nuxt-img
      cursor-pointer
      :src="src"
      @click="modalVisible = true"
    />
    <Modal v-model:model-visible="modalVisible" top="20%" :bg-transparent="true">
      <img
        :dropzone="true"
        :draggable="true"
        :style="imgStyle"
        class="duration-300 transition-ease"
        :src="src"
      >
      <template #footer>
        <div class="bottom-10 flex gap-7 rounded-6 bg-#334 bg-op-20 bg-op-20 px-3 py-2 text-28px text-#fff absolute-x-center">
          <Icon class="cursor-pointer" name="solar:rounded-magnifer-zoom-in-outline" @click="handleScale('+')" />
          <Icon class="cursor-pointer" name="solar:refresh-circle-outline" @click="handleScale('reset')" />
          <Icon class="cursor-pointer" name="solar:rounded-magnifer-zoom-out-outline" @click="handleScale('-')" />
          <Icon class="cursor-pointer" name="iconoir:undo-circle" @click="rotateDeg -= 90" />
          <Icon class="cursor-pointer" name="iconoir:redo-circle" @click="rotateDeg += 90" />
        </div>
      </template>
    </Modal>
  </div>
</template>

<style scoped></style>
