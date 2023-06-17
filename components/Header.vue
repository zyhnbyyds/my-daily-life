<script lang='ts' setup>
interface RouteItem {
  label: string
  value: string
}

interface Props {
  paths: RouteItem[]
}

const props = defineProps<Props>()
const activeIndex = ref<string>('/home')

function handleChangeTab(path: string) {
  activeIndex.value = path
}
</script>

<template>
  <div class="border-b border-#e5e5e5">
    <div class="m-auto h-60px lg:w-10/12 sm:w-full">
      <div class="h-full items-center justify-between" flex="~">
        <div class="flex justify-around font-600">
          <div v-for="item, i in props.paths" :key="i" :class="activeIndex === item.value ? 'text-#1ad6ff' : ''">
            <NuxtLink class="cursor-pointer rounded-2 px-3 py-1 text-center" hover="bg-#e5e5e5 bg-opacity-20" :to="item.value" @click="handleChangeTab(item.value)">
              {{ item.label }}
            </NuxtLink>
          </div>
        </div>
        <DarkToggle />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
