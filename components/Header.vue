<script lang='ts' setup>
interface RouteItem {
  label: string
  value: string
}

interface Props {
  paths: RouteItem[]
}

const props = defineProps<Props>()

const { path } = useRoute()

const activeIndex = ref<string>(handlePathGetFirst(path))

function handleChangeTab(path: string) {
  activeIndex.value = path
}
</script>

<template>
  <div class="my-4 flex justify-center font-600">
    <div class="inline-flex rounded-6 bg-#fff px-5 py-3 shadow-md dark:bg-#333 dark:bg-opacity-40">
      <div v-for="item, i in props.paths" :key="i" :class="activeIndex === item.value ? 'text-#1ad6ff' : ''">
        <NuxtLink class="cursor-pointer rounded-3 px-3 py-1 text-center" hover="bg-#e5e5e5 bg-opacity-20" :to="item.value" @click="handleChangeTab(item.value)">
          {{ item.label }}
        </NuxtLink>
      </div>
      <DarkToggle class="mx-2" />
    </div>
  </div>
</template>

<style scoped></style>
