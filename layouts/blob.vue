<script lang='ts' setup>
const listRef = ref<HTMLElement>()
const actDiv = ref<HTMLDivElement>()

const blobDataList = ref<any[]>([])
queryContent('blob').only(['_path', 'title', 'createTime']).find().then((res) => {
  blobDataList.value = res
})

const childrenNodes = computed(() => {
  if (!listRef.value)
    return
  return listRef.value.children
})

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

function mouseleave() {
  actDiv.value!.style.opacity = '0'
  setTimeout(() => {
    if (actDiv.value) {
      actDiv.value.style.transitionDuration = '0ms'
      actDiv.value!.style.opacity = '0'
    }
  }, 100)
}

onMounted(() => {
})
</script>

<template>
  <main class="w-full flex justify-center">
    <div ref="listRef" class="relative z-2 max-w-3xl w-full flex flex-col" @mouseleave="mouseleave">
      <div v-for="item, i in blobDataList" :key="i" class="relative z-10 transition-transform duration-300" hover="text-#333 dark:text-#e5e5e5" @mouseover="mouseover($event, i)">
        <NuxtLink class="leading-none" :to="item._path ? item._path : '/'">
          <span class="flex items-center px-3 py-3">
            <span>{{ item.title }}</span>
            <span v-if="item.createTime" class="pl-2 text-sm opacity-40">
              <span class="i-carbon:time inline-block align-middle" />
              <span class="align-middle dark:text-[#e5e5e5]">
                {{ item.createTime }}
              </span>
            </span>
          </span>
        </NuxtLink>
      </div>
      <div ref="actDiv" class="absolute h-40px w-full rounded-sm bg-my-20 opacity-0 transition-all -top-40px" />
    </div>
  </main>
</template>

<style scoped>
</style>
