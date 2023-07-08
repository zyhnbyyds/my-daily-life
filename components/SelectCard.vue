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

// const values = ref(toValue(list).length > 0 ? [toValue(list)[0].value] : [])
const values = defineModel<string[]>('values')

function handleClickFn(targetItem: MutiSelectCardItem) {
  if (!values.value)
    return

  if (toValue(muti)) {
    const index = values.value.findIndex(item => item === targetItem.value)

    if (index === -1)
      values.value.push(targetItem.value)

    else
      values.value.splice(index, 1)
  }
  else {
    values.value = [targetItem.value]
  }
  emits('change', values.value)
}
</script>

<!-- 多选卡片组件 -->
<template>
  <div class="w-full flex flex-wrap gap-2 p-2">
    <div
      v-for="item, i in list"
      :key="i"
      class="cursor-pointer rounded-20px px-4 py-2 transition-all"
      :class="{ 'text-[rgb(26,214,255)] bg-gray-200 dark:bg-my-20': values ? values.includes(item.value) : false, [customClass]: true }"
      @click="handleClickFn(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<style scoped></style>
