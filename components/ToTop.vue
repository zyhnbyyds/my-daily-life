<!-- 超出展示 -->
<script lang='ts' setup>
defineProps<{ top: number }>()

const emits = defineEmits<{ (event: 'goTop'): void }>()

const { pageScroolTop } = useAppConfig()
</script>

<template>
  <Transition name="fade">
    <div v-if="top > pageScroolTop" class="i-solar:round-arrow-up-broken fixed bottom-3 right-4 z-10 h-7 w-7 flex-center cursor-pointer rounded-5 bg-my-20 bg-opacity-80 shadow-md transition-all duration-300" @click="emits('goTop')">
    </div>
  </Transition>
</template>

<style scoped></style>
