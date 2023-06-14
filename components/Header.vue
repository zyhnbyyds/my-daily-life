<script lang='ts' setup>
const routes = ['首页', '博客', '生活']
</script>

<template>
  <div class="h-60px bg-light-700">
    <div class="h-full items-center justify-between" flex="~">
      <img class="mx-10px h-8/10 rounded-30px transition-transform" hover="scale-110 cursor-pointer" src="/logo.jpg" alt="hello, dear">
      <div class="flex justify-around">
        <div v-for="item, i in routes" :key="i" class="w-50px cursor-pointer text-center" hover="text-#888">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
