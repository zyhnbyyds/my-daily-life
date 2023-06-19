<script lang='ts' setup>
const { data: blobDataList } = await useAsyncData('blobDataList', () => {
  return queryContent('blob').only(['_path', 'title', 'createTime']).find()
})
</script>

<template>
  <main class="mt-2 w-full flex justify-center">
    <div class="max-w-3xl w-full flex flex-col gap-2">
      <div v-for="item, i in blobDataList" :key="i" class="p-3 transition-transform duration-300" hover="text-#333 scale-99 dark:text-#e5e5e5">
        <NuxtLink :to="item._path ? item._path : '/'">
          <span class="flex items-center">
            <span>{{ item.title }}</span>
            <span v-if="item.createTime" class="pl-2 text-sm opacity-40">
              <span class="i-carbon:time inline-block align-middle" />
              <span class="align-middle dark:text-[#e5e5e5]">
                {{ item.createTime }}
              </span>
            </span>
          </span>
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
