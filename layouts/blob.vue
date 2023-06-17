<script lang='ts' setup>
const query = queryContent('/blob')
const { data: navigation } = await useAsyncData('navigation', () => {
  return fetchContentNavigation(query)
})
</script>

<template>
  <main class="m-auto mt-2 flex flex-col gap-5 lg:w-10/12 sm:w-full">
    <div v-for="item, i in (navigation ? navigation[0].children : [])" :key="i" class="cursor-pointer border-b border-light-500 p-3 transition-transform duration-300" hover="scale-101">
      <NuxtLink :to="item._path">
        <h2>
          {{ item.title }}
        </h2>
      </NuxtLink>
    </div>
  </main>
</template>

<style scoped></style>
