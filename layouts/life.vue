<script lang='ts' setup>
const query = queryContent('/life')
const { data: navigation } = await useAsyncData('navigation', () => {
  return fetchContentNavigation(query)
})
</script>

<template>
  <main class="m-auto mt-2 lg:w-10/12 sm:w-full">
    <div class="lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1" grid="~ gap-4">
      <div v-for="item, i in (navigation ? navigation[0].children : [])" :key="i" class="h-60 cursor-pointer rounded-md bg-light-700 p-3 transition-transform dark:bg-dark-50" hover="scale-105">
        <NuxtLink :to="item._path">
          <h2 class="mb-2.5">
            {{ item.title }}
          </h2>
          <img class="h-[calc(100%-44px)] w-full" :src="item.imgUrl ? item.imgUrl : '/blob/no-img.jpg'" alt="">
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
