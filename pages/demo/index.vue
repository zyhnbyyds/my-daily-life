<script lang='ts' setup>
const demos = reactive([
  {
    name: '瀑布流',
    path: '/demo/Waterfall',
    previewImg: '/my.jpg',
  },
  {
    name: '绘制元素大小',
    path: '/demo/ResizeElement',
    previewImg: '/my.jpg',
  },
  {
    name: '带有动画效果的按钮集合',
    path: '/demo/ButtonListAni',
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

<style scoped>
</style>
