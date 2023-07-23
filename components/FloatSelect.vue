<script lang='ts' setup>
export interface SelectItem {
  label: string
  value: string | number
  [key: string]: any
}

interface Props {
  options: SelectItem[]
}

const props = defineProps<Props>()
const emits = defineEmits<{ change: [value: SelectItem]; isFocusFn: [value: boolean] }>()

const [isShowList, toggle] = useToggle()

const active = defineModel<string | number>('value', { default: '0' })

watch(() => isShowList.value, (val) => {
  emits('isFocusFn', val)
})

function handleSelect(item: SelectItem) {
  active.value = item.value
  isShowList.value = false
  emits('change', item)
}
</script>

<template>
  <FloatInput v-model:value="active" autocomplete="off" @focus="isShowList = true" @blur="isShowList = false">
    <template #suffix>
      <div :style="{ transform: isShowList ? 'scaleY(1)' : 'scaleY(-1)' }" class="i-carbon:chevron-up absolute right-20px top-15px h-25px w-25px cursor-pointer font-bold transition-all duration-300" @click="toggle()" />
    </template>
    <template #default>
      <Transition name="fade">
        <div v-show="isShowList" class="select-con absolute left-0 top-60px z-10 max-h-376px w-full w-full overflow-y-scroll rounded-12px bg-#fff p-4px">
          <div v-for="(item, i) in props.options" :key="`${item.value}-${i}-${item.phonePrefix}`" class="mx-4px my-2px h-32px cursor-pointer items-center rounded-6px p-4px text-14px" active="scale-97" hover="bg-[rgba(0,0,0,0.06666666666666667)]" @click="handleSelect(item)">
            <slot name="perfix" :data="item" />
            <div class="float-left h-24px font-500 leading-24px text-black">
              {{ item.label }}
            </div>
            <slot name="suffix" :data="item" />
          </div>
        </div>
      </Transition>
    </template>
  </FloatInput>
</template>

<style scoped>
.select-con {
  box-shadow: rgba(114, 114, 114, 0.25) 0px 4px 8px 2px;
}

.select-con::-webkit-scrollbar {
  width: 6px;
}

.select-con::-webkit-scrollbar:hover {
  width: 6px;
}

/* 修改滚动条滑块的样式 */
.select-con::-webkit-scrollbar-thumb {
  background-color: rgba(0,0,0,0.1); /* 设置滑块颜色 */
  border-radius: 3px; /* 设置滑块圆角 */
}

/* 修改滚动条轨道背景的样式 */
.select-con::-webkit-scrollbar-track {
  background-color: none; /* 设置轨道背景颜色 */
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.15s;
  transition-timing-function: cubic-bezier(0.2, 0, 0.2, 1), cubic-bezier(0.2, 0, 0.2, 1);
  transition-property: opacity, transform;
  transform-origin: center
}

.fade-enter-from
{
  opacity: 0.3;
  transform: scale(0.97);
}
.fade-leave-to  {
  transform: scale(0.97);
  opacity: 0;
}
</style>
