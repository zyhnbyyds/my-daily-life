<script lang='ts' setup>
const { contact } = useAppConfig()
</script>

<template>
  <div class="flex gap-4">
    <NuxtLink :to="contact.github.url" target="_blank">
      <div i-carbon-logo-github />
    </NuxtLink>
    <DarkToggle />
  </div>
</template>

<style scoped></style>
