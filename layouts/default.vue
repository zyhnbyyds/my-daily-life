<script lang='ts' setup>
const paths = reactive([
  {
    label: '生活',
    value: '/life',
  },
  {
    label: '博客',
    value: '/blob',
  },
])
const activeIndex = ref<string>('/life')

function handleChange(path: string) {
  activeIndex.value = path
}
</script>

<template>
  <div>
    <Header :paths="paths" @change="handleChange" />
    <main class="m-auto mt-2 lg:w-10/12 sm:w-full">
      <slot />
    </main>
  </div>
</template>

<style scoped></style>
