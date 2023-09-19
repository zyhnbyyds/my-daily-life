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
  {
    name: '旋转音乐头像',
    path: '/demo/RotateMusicAva',
  },
  {
    name: '聊天界面',
    path: '/demo/ChatRoom',
  },
  {
    name: '基于icons和富文本编辑器的表情输入',
    path: '/demo/Emoji',
  },
  {
    name: '跟随鼠标移动的弹出框实现',
    path: '/demo/MoveWithMouse',
  },
])
</script>

<template>
  <div grid="~ cols-10 rows-7" class="hw-full gap-5">
    <div v-for="item in demos" :key="item.path">
      <NuxtLink :to="item.path">
        <div class="h-full w-full flex-center rounded-md bg-light-blue-100 text-14px text-#333 trans-300 hover:scale-105">
          {{ item.name }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
</style>
