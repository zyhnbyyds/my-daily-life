<!-- 超出展示 -->
<script lang='ts' setup>
defineProps<{ top: number }>()

const emits = defineEmits<{ (event: 'goTop'): void }>()

const { pageScroolTop } = useAppConfig()
</script>

<template>
  <div v-show="top > pageScroolTop" class="flex-center bg-my-20 fixed bottom-30 right-1/20 z-10 h-10 w-10 cursor-pointer rounded-5 shadow-md transition-all duration-300" @click="emits('goTop')">
    <div i-solar:map-arrow-up-broken />
  </div>
</template>

<style scoped></style>
