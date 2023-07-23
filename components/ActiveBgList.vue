<script lang='ts' setup>
interface ActiveBgListItem {
  label?: string
  value?: string
  [key: string]: any
}

interface Props {
  list: ActiveBgListItem[]
  labelField?: string
  valueField?: string
  isRoute?: boolean
  animate?: boolean
}

interface Emits {
  (event: 'change', id: any): void
}

const props = withDefaults(defineProps<Props>(), {
  labelField: 'label',
  valueField: 'value',
  isRoute: false,
  animate: true,
})
const emits = defineEmits<Emits>()

const { list, labelField, valueField, isRoute } = toRefs(props)
const listRef = ref<HTMLElement>()
const actDiv = ref<HTMLDivElement>()
const router = useRouter()

const childrenNodes = computed(() => {
  if (!listRef.value)
    return
  return listRef.value.children
})

function mouseleave() {
  actDiv.value!.style.opacity = '0'
  setTimeout(() => {
    if (actDiv.value) {
      actDiv.value.style.transitionDuration = '0ms'
      actDiv.value!.style.opacity = '0'
    }
  }, 100)
}

function mouseover(_ele: MouseEvent, index: number) {
  if (actDiv.value && childrenNodes.value) {
    actDiv.value.style.top = `${(childrenNodes.value[index] as any).offsetTop}px`
    setTimeout(() => {
      if (actDiv.value) {
        actDiv.value!.style.transitionDuration = '150ms'
        actDiv.value!.style.opacity = '1'
      }
    }, 100)
  }
}

function handleClickListItem(item: ActiveBgListItem, index: number) {
  if (toValue(isRoute)) {
    router.push(item._path ? item._path : '/')
    return
  }

  if (!valueField.value) {
    emits('change', index)
    return
  }
  const keys = valueField.value.split('.')

  if (keys.length === 1)
    emits('change', item[keys[0]])

  else if (keys.length === 2)
    emits('change', item[keys[0]][keys[1]])
}
</script>

<template>
  <div ref="listRef" class="relative z-2 max-w-3xl w-full flex flex-col" @mouseleave="mouseleave">
    <div
      v-for="item, i in list" :key="i"
      class="relative z-10 cursor-pointer transition-transform duration-300" hover="scale-101 delay-150" active="scale-99"
      @mouseover="mouseover($event, i)" @click="handleClickListItem(item, i)"
    >
      <span class="flex items-center px-3 py-3 leading-none">
        <span>{{ item[labelField] }}</span>
        <span v-if="item.createTime" class="pl-2 text-sm opacity-40">
          <span class="i-carbon:time mr-1 inline-block align-middle" />
          <span class="align-middle dark:text-[#e5e5e5]">
            {{ item.createTime }}
          </span>
        </span>
      </span>
    </div>
    <div ref="actDiv" class="absolute h-40px w-full rounded-sm bg-my-20 opacity-0 transition-all -top-40px" />
  </div>
</template>

<style scoped></style>
