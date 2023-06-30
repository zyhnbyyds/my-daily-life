<script lang='ts' setup>
const circleRef = ref<HTMLElement>()

const curSlide = ref(0)

function handleSlideChange(e: any) {
  curSlide.value = e.activeIndex
}
</script>

<template>
  <div class="relative h-600px w-390px overflow-hidden bg-black pt-30">
    <div
      ref="circleRef"
      :class=" {
        '-rotate-z-20': curSlide === 0,
        'rotate-z-0': curSlide === 1,
        'rotate-z-20': curSlide === 2,
      }"
      class="absolute-x-center z-100 h-5xl w-5xl rotate-x-64 border-3px border-white rounded-full text-white trans-all-300-ease -top-43em"
    >
      <div class="absolute-x-center rotate-x-80 rotate-y-10 -bottom-10" after="h-2 w-2">
        白银
      </div>
      <div class="absolute bottom-0 left-34% rotate-x-100 rotate-z-20">
        青铜
      </div>
      <div class="absolute bottom-0 left-63% rotate-x-100 -rotate-z-20">
        铂金
      </div>
    </div>
    <Swiper class="h-100px" @slideChange="handleSlideChange">
      <SwiperSlide v-for="item in 3" :key="item" bg-cool-gray>
        {{ item }}
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped></style>
