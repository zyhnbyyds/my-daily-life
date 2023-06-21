<script lang='ts' setup>
export interface NextItem {
  title: string
  _path: string
  [key: string]: any
}

interface Emits {
  (event: 'change', path: string): void
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

const emits = defineEmits<Emits>()

const { pre, next, preText, nextText } = props

function handleChange(btnObj: NextItem | null) {
  if (btnObj)
    emits('change', btnObj._path)
}
</script>

<template>
  <div class="flex justify-between text-14px">
    <NuxtLink :class="{ 'opacity-30': pre === null }" :to="pre ? pre._path : ''" hover="bg-my-20" class="w-40% border border-#e5e5e5 rounded-2 px-3 py-2 dark:border-#555" @click="handleChange(pre)">
      <div class="flex">
        <div class="mr-2" i-solar:square-alt-arrow-left-outline />
        <span>{{ preText }}</span>
      </div>
      <div style="text-overflow: ellipsis;" class="overflow-hidden whitespace-nowrap">
        {{ pre?.title || '无' }}
      </div>
    </NuxtLink>
    <NuxtLink :class="{ 'opacity-30': next === null }" class="w-40% border border-#e5e5e5 rounded-2 px-3 py-2 dark:border-#555" hover="bg-my-20" :to="next ? next._path : ''" @click="handleChange(next)">
      <div class="flex justify-end">
        <span class="mr-2">{{ nextText }}</span>
        <div i-solar:square-alt-arrow-right-outline />
      </div>
      <div style="text-overflow: ellipsis;" class="overflow-hidden whitespace-nowrap text-right">
        {{ next?.title || '无' }}
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped></style>
