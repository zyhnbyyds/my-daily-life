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
</script>

<template>
  <div class="flex justify-center py-4 font-600">
    <Tab v-model:value="activeIndex" :is-route="true" :tabs="props.paths">
      <template #extra>
        <DarkToggle class="px-2" />
      </template>
    </Tab>
    <!-- <div class="relative inline-flex rounded-6 bg-#fff px-5 py-3 shadow-md dark:bg-#333 dark:bg-opacity-40">
      <div v-for="item, i in props.paths" :key="i">
        <NuxtLink :class="activeIndex === item.value ? 'text-#1ad6ff' : ''" class="rounded-3 px-3 py-1 text-center" hover="bg-#e5e5e5 bg-opacity-20" :to="item.value" @click="handleChangeTab(item.value)">
          {{ item.label }}
        </NuxtLink>
      </div>
    </div> -->
  </div>
</template>

<style scoped></style>
