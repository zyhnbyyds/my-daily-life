<script lang='ts' setup>
export interface BtnListItem {
  label: string
  value: string
  icon: string
}

export type Positions = 'top' | 'left' | 'bottom' | 'right'

interface Props {
  list: BtnListItem[]
  place?: Positions
  value: string | number
}

const props = defineProps<Props>()

const value = defineModel<string | number>('value', { required: true })
</script>

<!-- 带有动画效果的按钮集合 -->
<template>
  <div
    class="fixed bottom-100 left-1/2 rounded-30px bg-#999 bg-op-20 p-3 -translate-x-1/2"
  >
    <div class="transition-height duration-300" :class="{ 'h-100px': value === 'code', 'h-0': value !== 'code' }" />
    <div class="flex gap-5">
      <div v-for="item, i in props.list" :key="i" class="@hover:#333 flex-col-center" @click="value = item.value">
        <div
          :style="{ width: item.value === value ? `${item.label.length * 16 + 100}px` : '40px' }"
          class="trans-all-300-ease h-40px flex-center cursor-pointer border border-lightBlue-200 rounded-full py2 transition-width"
        >
          <Icon :name="item.icon" size="22" />
          <div v-show="item.value === value" class="ml-2 truncate">
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
