<script lang='ts' setup>
interface MutiSelectCardItem {
  label: string
  value: string | number
  [key: string]: any
}

interface Props {
  list: MutiSelectCardItem[]
  /** 激活状态下的文字颜色 */
  activeColor?: string
  /** 非激活状态下的文字颜色 */
  inactiveColor?: string
  activeBgColor?: string
  inactiveBgColor?: string
}

type ValueType = (string | number)[]

interface Emits {
  (event: 'change', e: ValueType): void
}

const props = withDefaults(defineProps<Props>(), {
  inactiveBgColor: '#e5e5e5',
  inactiveColor: '#fff',
  activeBgColor: '#a9e9e9',
  activeColor: 'red',
})
const emits = defineEmits<Emits>()

const { inactiveBgColor, activeBgColor, activeColor, inactiveColor, list } = toRefs(props)
const vals = reactive<ValueType>([])

function judgeIsActive(val: string | number) {
  const isInclude = vals.includes(val)
  return {
    background: isInclude ? activeBgColor.value : inactiveBgColor.value,
    color: isInclude ? activeColor.value : inactiveColor.value,
  }
}

function handleClickFn(targetItem: MutiSelectCardItem) {
  const index = vals.findIndex(item => item === targetItem.value)
  if (index === -1)
    vals.push(targetItem.value)

  else
    vals.splice(index, 1)
  emits('change', vals)
}
</script>

<!-- 多选卡片组件 -->
<template>
  <div class="w-full flex flex-wrap gap-2 p-2">
    <div
      v-for="item, i in list"
      :key="i"
      class="cursor-pointer rounded-20px bg-op-20 px-3 py-2 hover:ring-2"
      :style="judgeIsActive(item.value)"
      @click="handleClickFn(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<style scoped></style>
