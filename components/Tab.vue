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
  isRoute?: boolean
}

interface Emits {
  (event: 'update:value', e: string | number): void
}

const props = withDefaults(defineProps<Props>(), {
  labelFiled: 'label',
  valueFiled: 'value',
  isRoute: false,
})

const emits = defineEmits<Emits>()
const isLoaded = ref(false)

const actTabVal = computed({
  get() {
    return props.value ? props.value : props.tabs[0].value
  },
  set(val) {
    emits('update:value', val)
  },
})

const tabsRef = ref<HTMLElement[]>()
const bgRef = ref<HTMLElement>()
const router = useRouter()

async function handleTabChange(value: string | number, index: number) {
  actTabVal.value = value
  if (props.isRoute)
    router.push(value as string)
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

onMounted(() => {
  if (!tabsRef.value)
    return
  const idx = handleGetIdxByObjAttr(props.tabs, props.valueFiled, props.value)
  moveBgPoi(tabsRef.value[(idx === -1 ? 0 : idx)])
  isLoaded.value = true
})
</script>

<template>
  <div class="shadow-self relative inline-flex gap-2 rounded-6 px-2 py-2 font-bold shadow-md dark:bg-#333">
    <div v-for="item, i in props.tabs" ref="tabsRef" :key="i" class="relative z-10">
      <div class="relative z-10 cursor-pointer rounded-3 px-4 py-1" hover="text-#1ad6ff text-opacity-60" :class="{ 'text-#1ad6ff': actTabVal === item.value }" @click="handleTabChange(item[props.valueFiled], i)">
        {{ item[props.labelFiled] }}
      </div>
    </div>
    <slot name="extra" />
    <div ref="bgRef" :class="{ 'transition-all duration-250': isLoaded }" class="shadow-style absolute top-2 z-1 h-8 w-16 rounded-4 bg-#e5e5e5 bg-opacity-40 transition-all duration-250 dark:bg-#444" />
  </div>
</template>

<style scoped>
.shadow-style {
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.3);
}
</style>
