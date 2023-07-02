<script lang='ts' setup>
export type Positions = 'top' | 'left' | 'bottom' | 'right'

interface Props {
  list: Components.BtnListItem[]
  place?: Positions
  value: string | number
  position?: [number, number, number, number]
  size?: number | string
  popupValue?: string
}

interface Emits {
  (event: 'showAgain', tarBtn: string): void
}

const props = withDefaults(defineProps<Props>(), {
  size: '22px',
})
const emits = defineEmits<Emits>()

const value = defineModel<string | number>('value', { required: true })

const isShowPopup = ref(false)
const btnListRef = ref<HTMLElement | null>(null)

function hadnleClickItem(item: Components.BtnListItem) {
  if (item.value === props.popupValue)
    isShowPopup.value = !isShowPopup.value
  else
    isShowPopup.value = false

  // 当前已经是这个按钮，再次点击重新激活操作
  if (item.value === toValue(value))
    emits('showAgain', toValue(value) as string)

  value.value = item.value
}
</script>

<!-- 带有动画效果的按钮集合 -->
<template>
  <div class="fixed bottom-10 left-1/2 rounded-30px bg-#999 bg-op-20 p-3 -translate-x-1/2">
    <div
      :style="{ width: `${btnListRef?.offsetWidth}px` || 'auto' }"
      class="overflow-hidden transition-height duration-300"
      :class="value === popupValue && isShowPopup ? 'h-70px' : 'h-0'"
    >
      <slot name="popup" />
    </div>
    <div ref="btnListRef" class="inline-flex gap-5">
      <div
        v-for="item, i in props.list" :key="i"
        class="@hover:#333 flex-col-center transition-transform active:scale-105"
        @click="hadnleClickItem(item)"
      >
        <div
          :style="{ width: item.value === value ? `${item.label.length * 16 + 100}px` : '40px' }"
          class="h-40px flex-center cursor-pointer border border-lightBlue-200 rounded-full py2 trans-all-300-ease"
        >
          <Icon :name="item.icon" :size="typeof props.size === 'number' ? `${props.size}px` : props.size" />
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
