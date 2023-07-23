<script lang='ts' setup>
const props = defineProps<{ text: string }>()

const { text } = toRefs(props)
</script>

<template>
  <div class="overflow-hidden bg-green p-10 text-white">
    <div class="text-animate text-nowrap">
      {{ text }}
    </div>
  </div>
</template>

<style scoped>
@keyframes text-over-animate {
  0% {
    transform: translateX(0);
  }
  33.3% {
    transform: translateX(-100%);
  }
  66.7% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

.text-animate {
  animation: text-over-animate linear infinite 5s;
}
</style>
