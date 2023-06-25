<script lang='ts' setup>
interface LifeItem {
  title: string
  imgUrl: string
  _path: string
  createTime?: string
}

const { data: lifeDataList } = await useAsyncData('lifeDataList', () => queryContent<LifeItem>('life').only(['_path', 'title', 'createTime', 'imgUrl']).find(),
)

const { width } = useWindowSize()
const activeCol = ref<number>(4)
judgeCols(width.value)

watch(() => width.value, (newVal) => {
  judgeCols(newVal)
})

function judgeCols(windowWidth: number) {
  if (windowWidth > 1024)
    activeCol.value = 4

  else if (windowWidth >= 768 && windowWidth < 1024)
    activeCol.value = 3

  else if (windowWidth < 768)
    activeCol.value = 2
}

// TODO => fix show bug
const actShowList = computed(() => {
  if (!lifeDataList.value || lifeDataList.value.length === 0)
    return [[]]
  const dataLength = lifeDataList.value.length

  const arr: LifeItem[][] = []
  for (let index = 0; index < activeCol.value; index++)
    arr.push([])

  const num = Math.floor(dataLength / activeCol.value)
  for (let index = 0; index < num; index++) {
    const arr2 = lifeDataList.value.slice(index * activeCol.value, (index + 1) * activeCol.value)
    arr.map((item, index) => {
      item.push(arr2[index] as unknown as LifeItem)
      return item
    })
  }
  if (dataLength % activeCol.value !== 0) {
    const num2 = dataLength % activeCol.value
    const toPushArr = lifeDataList.value.slice(num * activeCol.value, dataLength)
    for (let index = 0; index < num2; index++) {
      arr.map((item, idx) => {
        if (idx === index)
          item.push(toPushArr[index] as unknown as LifeItem)
        return item
      })
    }
  }
  return arr
})
</script>

<template>
  <main class="m-auto mt-2 lg:w-10/12 sm:w-full sm:px-4">
    <div class="w-full px-3 lg:grid-cols-4 md:grid-cols-3" sm="grid-cols-2" grid="~ gap-4 cols-2">
      <div v-for="item, i in actShowList" :key="i">
        <!-- {{ item }} -->
        <div v-for="item2, idx2 in item" :key="idx2" class="mb-4">
          <NuxtLink :to="(item2 ?? {})._path || '/'">
            <img hover="scale-102" class="grid-rows-2 rounded-md shadow-md transition-transform" :src="(item2 ?? {}).imgUrl || '/preview.jpg'">
            <!-- <NuxtImg format="webp" :src="(item2 ?? {}).imgUrl || '/preview.jpg'" /> -->
          </NuxtLink>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
