<script lang='ts' setup>
const directions = reactive([
  '0deg', '45deg', '90deg', '135deg', '180deg', '225deg', '270deg', '315deg',
])
</script>

<template>
  <div hw-full flex-center>
    <div cursor="pointer" carbon:thumbs-up-filled active="scale-75" transition-transform text="red 40px" />
    <div h-4px w-4px rounded-2px bg-red-300 />
  </div>
</template>

<style scoped></style>
