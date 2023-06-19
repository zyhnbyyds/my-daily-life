<script lang='ts' setup>
interface NextItem {
  title: string
  _path: string
}

const props = withDefaults(defineProps<{
  pre: null | NextItem
  next: null | NextItem
  preText?: string
  nextText?: string
}>(), {
  preText: '上一篇',
  nextText: '下一篇',
})

const { pre, next, preText, nextText } = props
</script>

<template>
  <div class="flex justify-between text-14px">
    <NuxtLink :to="pre ? pre._path : ''" hover="bg-my-20" class="w-40% border border-#e5e5e5 rounded-3 px-3 py-2 dark:border-#555">
      <div class="flex">
        <div class="mr-2" i-solar:square-alt-arrow-left-outline />
        <span>{{ preText }}</span>
      </div>
      <div style="text-overflow: ellipsis;" class="overflow-ellipsis overflow-hidden whitespace-nowrap">
        {{ pre?.title }}
      </div>
    </NuxtLink>
    <NuxtLink class="w-40% border border-#e5e5e5 rounded-3 px-3 py-2 dark:border-#555" hover="bg-my-20" :to="next ? next._path : ''">
      <div class="flex justify-end">
        <span class="mr-2">{{ nextText }}</span>
        <div i-solar:square-alt-arrow-right-outline />
      </div>
      <div style="text-overflow: ellipsis;" class="overflow-ellipsis overflow-hidden whitespace-nowrap text-right">
        {{ next?.title }}
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped></style>
