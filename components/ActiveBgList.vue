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
}

const props = withDefaults(defineProps<Props>(), {
  labelField: 'label',
  valueField: 'value',
})

const { list, labelField, valueField } = toRefs(props)
const listRef = ref<HTMLElement>()
const actDiv = ref<HTMLDivElement>()

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
</script>

<template>
  <div ref="listRef" class="relative z-2 max-w-3xl w-full flex flex-col" @mouseleave="mouseleave">
    <div
      v-for="item, i in list" :key="i"
      class="relative z-10 transition-transform duration-300" hover="text-#333 dark:text-#e5e5e5" active="scale-99"
      @mouseover="mouseover($event, i)"
    >
      <NuxtLink class="leading-none" :to="item._path ? item._path : '/'">
        <span class="flex items-center px-3 py-3">
          <span>{{ item[labelField] }}</span>
          <span v-if="item.createTime" class="pl-2 text-sm opacity-40">
            <span class="i-carbon:time mr-1 inline-block align-middle" />
            <span class="align-middle dark:text-[#e5e5e5]">
              {{ item.createTime }}
            </span>
          </span>
        </span>
      </NuxtLink>
    </div>
    <div ref="actDiv" class="absolute h-40px w-full rounded-sm bg-my-20 opacity-0 transition-all -top-40px" />
  </div>
</template>

<style scoped></style>
