<script setup lang="ts">
const color = useColorMode()
const { next, state } = useCycleList(['light', 'dark'])

function toggleDark() {
  next()
  color.preference = state.value
}
</script>

<template>
  <button class="!outline-none" @click="toggleDark">
    <div class="i-carbon-sun dark:i-carbon-moon" />
  </button>
</template>
