<script lang='ts' setup>
const demos = reactive([
  {
    name: '瀑布流',
    createTime: '2023-06-24',
    path: '/demo/WaterFall',
    previewImg: '/my.jpg',
  },
  {
    name: '绘制元素大小',
    createTime: '2023-06-27',
    path: '/demo/ResizeElement',
    previewImg: '/my.jpg',
  },
  {
    name: '瀑布流',
    createTime: '2023-06-24',
    path: '/demo/WaterFall',
    previewImg: '/my.jpg',
  },
  {
    name: '瀑布流',
    createTime: '2023-06-24',
    path: '/demo/WaterFall',
    previewImg: '/my.jpg',
  },
])
</script>

<template>
  <div grid="~ cols-4" class="gap-10">
    <div v-for="item in demos" :key="item.path">
      <NuxtLink :to="item.path">
        <div class="h-70 w-full flex-center bg-light-blue-200 text-#333">
          {{ item.name }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped></style>
