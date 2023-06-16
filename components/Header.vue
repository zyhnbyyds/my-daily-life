<script lang='ts' setup>
interface RouteItem {
  label: string
  value: string
}

interface Props {
  paths: RouteItem[]
}

interface Emits {
  (event: 'change', val: string): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

function handleChangeTab(val: string) {
  emits('change', val)
}
</script>

<template>
  <div class="border-b border-#e5e5e5">
    <div class="m-auto h-60px lg:w-10/12 sm:w-full">
      <div class="h-full items-center justify-between" flex="~">
        <div class="flex justify-around">
          <div v-for="item, i in props.paths" :key="i" class="cursor-pointer rounded-2 px-3 py-1 text-center" hover="bg-#e5e5e5 bg-opacity-50">
            <NuxtLink :to="item.value" @click="handleChangeTab(item.value)">
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
