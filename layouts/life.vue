<script lang='ts' setup>
const { data: lifeDataList } = await useAsyncData('lifeDataList', () => {
  return queryContent('life').only(['_path', 'title', 'createTime', 'imgUrl']).find()
})
</script>

<template>
  <main class="m-auto mt-2 lg:w-10/12 sm:w-full">
    <div class="lm:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1" grid="~ gap-4">
      <div v-for="item, i in lifeDataList" :key="i" class="h-60 cursor-pointer border-2 rounded-md p-3 shadow-md transition-transform dark:bg-dark-50" dark="border-dark-100" hover="scale-102">
        <NuxtLink :to="item._path ? item._path : '/'">
          <h2 class="mb-2.5">
            {{ item.title }}
          </h2>
          <div class="h-[calc(100%-44px)] w-full overflow-hidden">
            <img class="w-full" :src="item.imgUrl ? item.imgUrl : '/blob/no-img.jpg'">
          </div>
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
