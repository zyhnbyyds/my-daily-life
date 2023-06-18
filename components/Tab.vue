<script lang='ts' setup>
export interface TabItem {
  label: string
  value: string
  [key: string]: any
}

interface Props {
  value: string | number
  tabs: TabItem[]
  labelFiled?: string
  valueFiled?: string
}

interface Emits {
  (event: 'update:value', e: string | number): void
}

const props = withDefaults(defineProps<Props>(), {
  labelFiled: 'label',
  valueFiled: 'value',
})

const emits = defineEmits<Emits>()

const actTabVal = computed({
  get() {
    return props.value
  },
  set(val) {
    emits('update:value', val)
  },
})

const tabsRef = ref<HTMLElement[]>()
const bgRef = ref<HTMLElement>()

async function handleTabChange(value: string | number, index: number) {
  actTabVal.value = value
  await nextTick()
  if (!tabsRef.value)
    return
  moveBgPoi(tabsRef.value![index])
}

function moveBgPoi(ele: HTMLElement) {
  if (!bgRef.value)
    return
  bgRef.value.style.height = `${ele.offsetHeight}px`
  bgRef.value.style.width = `${ele.offsetWidth}px`
  bgRef.value.style.left = `${ele.offsetLeft}px`
}
</script>

<template>
  <div class="relative inline-flex px-3 py-2 shadow-md">
    <div v-for="item, i in props.tabs" ref="tabsRef" :key="i" class="relative z-10" @click="handleTabChange(item[props.valueFiled], i)">
      <div class="cursor-pointer p-2">
        {{ item[props.labelFiled] }}
      </div>
    </div>
    <div ref="bgRef" class="absolute h-40px w-48px bg-red transition-all duration-300 -z-1" />
  </div>
</template>

<style scoped>
</style>
