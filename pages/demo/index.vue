<script lang='ts' setup>
const demos = reactive([
  {
    name: '瀑布流',
    path: '/demo/Waterfall',
    previewImg: '/my.jpg',
  },
  {
    name: '绘制元素',
    path: '/demo/ResizeElement',
    previewImg: '/my.jpg',
  },
  {
    name: '动画按钮',
    path: '/demo/ButtonListAni',
  },
])
</script>

<template>
  <div grid="~ cols-10 rows-7" class="hw-full gap-5">
    <div v-for="item in demos" :key="item.path">
      <NuxtLink :to="item.path">
        <div class="trans-300 h-full w-full flex-center rounded-md bg-light-blue-100 text-14px text-#333 hover:scale-105">
          {{ item.name }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
</style>
