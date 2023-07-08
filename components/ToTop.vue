<!-- 超出展示 -->
<script lang='ts' setup>
defineProps<{ top: number }>()

const emits = defineEmits<{ (event: 'goTop'): void }>()

const { pageScroolTop } = useAppConfig()
</script>

<template>
  <Transition name="fade">
    <div v-if="top > pageScroolTop" class="fixed bottom-30 right-1/20 z-10 h-10 w-10 flex-center cursor-pointer rounded-5 bg-my-20 bg-opacity-40 shadow-md transition-all duration-300" @click="emits('goTop')">
      <div i-solar:map-arrow-up-broken />
    </div>
  </Transition>
</template>

<style scoped></style>
