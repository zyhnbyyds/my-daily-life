<script setup lang="ts">
const color = useColorMode()
const { next, state } = useCycleList(['light', 'dark'], { initialValue: color.value })

function toggleDark() {
  next()
  color.preference = state.value
}
</script>

<template>
  <button class="!outline-none" @click="toggleDark">
    <div class="i-line-md:moon-alt-to-sunny-outline-loop-transition dark:i-line-md:moon-alt-loop" />
  </button>
</template>
