<script setup lang="ts">
const color = useColorMode()

function toggleDark() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button class="!outline-none" @click="toggleDark">
    <div class="i-line-md:moon-alt-to-sunny-outline-loop-transition dark:i-line-md:moon-alt-loop" />
  </button>
</template>
