<script lang='ts' setup>
const paths = reactive([
  {
    label: '生活',
    value: '/life',
  },
  {
    label: '博客',
    value: '/blob',
  },
])
const activeIndex = ref<string>('/life')

function handleChange(path: string) {
  activeIndex.value = path
}
</script>

<template>
  <div class="m-auto lg:w-10/12 sm:w-full">
    <Header :paths="paths" @change="handleChange" />
    <ContentList v-slot="{ list }" :path="activeIndex">
      <div v-for="item, i in list" :key="i">
        <RouterLink :to="item._path">
          {{ item.title }}
        </RouterLink>
      </div>
    </ContentList>
  </div>
</template>

<style scoped></style>
