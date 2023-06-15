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
  <div class="h-60px bg-light-700">
    <div class="h-full items-center justify-between" flex="~">
      <img class="mx-10px h-8/10 rounded-30px transition-transform" hover="scale-110 cursor-pointer" src="/logo.jpg" alt="hello, dear">
      <div class="flex justify-around">
        <div v-for="item, i in props.paths" :key="i" class="w-50px cursor-pointer text-center" hover="text-#888">
          <NuxtLink :to="item.value" @click="handleChangeTab(item.value)">
            {{ item.label }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
