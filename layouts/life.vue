<script lang='ts' setup>
const lifeDataList = await queryContent('life').only(['_path', 'title', 'createTime', 'imgUrl']).find()

const { width } = useWindowSize()
const activeCol = ref<number>(3)

watch(() => width.value, (newVal) => {
  if (newVal > 1024)
    activeCol.value = 3

  else if (newVal >= 560 && newVal < 1024)
    activeCol.value = 2

  else if (newVal < 560)
    activeCol.value = 1
})
</script>

<template>
  <main class="m-auto mt-2 lg:w-10/12 sm:w-full sm:px-4">
    <div class="w-full px-3 lg:grid-cols-4 md:grid-cols-3" sm="grid-cols-2" grid="~ gap-4 cols-1">
      <div v-for="item, i in lifeDataList" :key="i" class="h-60 cursor-pointer border-2 rounded-md p-3 shadow-md transition-transform dark:bg-dark-50" dark="border-dark-100" hover="scale-102">
        <NuxtLink :to="item._path ? item._path : '/'">
          <img class="w-full" :src="item.imgUrl ? item.imgUrl : '/blob/no-img.jpg'">
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
