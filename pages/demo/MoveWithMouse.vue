<script lang='ts' setup>
const [visible, toggle] = useToggle(false)
const popRef = ref<HTMLElement>()
const { width, height } = useWindowSize()

const activeShow = reactive({
  x: 0,
  y: 0,
})

function handleClickItem(e: MouseEvent) {
  if (!toValue(visible))
    toggle()

  const clickElement = e.target as HTMLElement

  nextTick(() => {
    if (!popRef.value)
      return
    const left = ((e.clientX - e.offsetX) + clickElement.offsetWidth - popRef.value.offsetWidth / 2)
    const top = (e.clientY - e.offsetY) - clickElement.offsetHeight

    activeShow.x = left < 0 ? 0 : (left > width.value - popRef.value.offsetWidth ? width.value - popRef.value.offsetWidth : left)
    activeShow.y = top < 0 ? 0 : (top > 0 && top < popRef.value.offsetHeight ? (top + popRef.value.offsetHeight) : top - clickElement.offsetHeight)
  })
}
</script>

<template>
  <div grid grid-cols-16 grid-rows-16 hw-full gap-2>
    <div
      v-for="item in 256" :key="item"
      hover="bg-light-200 text-dark-200 border-com" flex-center
      @click="handleClickItem"
    >
      {{ item }}
    </div>
    <div
      v-if="visible" ref="popRef"
      h-100px w-200px overflow-y-auto
      transition-all scrollbar
      :style="{ left: `${activeShow.x}px`, top: `${activeShow.y}px` }"
      class="absolute rounded-md bg-light-200 shadow-md border-com"
    >
      <div hw-full class="flex-center p-2">
        <div>
          <div>弹窗信息</div>
          <div class="btn" @click="toggle(false)">
            关闭
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
