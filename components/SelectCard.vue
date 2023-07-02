<script lang='ts' setup>
interface MutiSelectCardItem {
  label: string
  value: string
  [key: string]: any
}

interface Props {
  list: MutiSelectCardItem[]
  customClass?: string
  muti?: boolean
}

interface Emits {
  (event: 'change', e: string[]): void
}

const props = withDefaults(defineProps<Props>(), {
  customClass: 'shadow-com',
  muti: true,
})
const emits = defineEmits<Emits>()

const { list, customClass, muti } = toRefs(props)
const vals = ref<string[]>([])

function handleClickFn(targetItem: MutiSelectCardItem) {
  const valueS = toValue(vals)

  if (toValue(muti)) {
    const index = valueS.findIndex(item => item === targetItem.value)

    if (index === -1)
      valueS.push(targetItem.value)

    else
      valueS.splice(index, 1)
  }
  else {
    vals.value = []
    vals.value.push(targetItem.value)
  }
  emits('change', valueS)
}
</script>

<!-- 多选卡片组件 -->
<template>
  <div class="w-full flex flex-wrap gap-2 p-2">
    <div
      v-for="item, i in list"
      :key="i"
      class="cursor-pointer rounded-20px px-4 py-2 transition-all"
      :class="{ 'text-[rgb(26,214,255)] bg-gray-200 dark:bg-my-20': vals.includes(item.value), [customClass]: true }"
      @click="handleClickFn(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<style scoped></style>
