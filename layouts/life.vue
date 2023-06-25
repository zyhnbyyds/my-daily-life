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
const img = useImage()
const { cloned } = useCloned(lifeDataList.value)

const backgroundStyles = computed(() => {
  const imgUrl = img('https://github.com/nuxt.png', { width: 100 })
  return { backgroundImage: `url('${imgUrl}')` }
})

watch(() => width.value, (newVal) => {
  if (newVal > 1024)
    activeCol.value = 4

  else if (newVal >= 768 && newVal < 1024)
    activeCol.value = 3

  else if (newVal >= 640 && newVal < 768)
    activeCol.value = 2

  else if (newVal < 640)
    activeCol.value = 2
})

// TODO fix show bug
const actShowList = computed(() => {
  const arr: LifeItem[][] = []
  for (let index = 0; index < activeCol.value; index++)
    arr.push([])

  cloned.value?.forEach((item, index) => {
    arr.forEach((_item, index2) => {
      if ((index + 1) % (index2 + 1) === 0)
        arr[index2].push(item as unknown as LifeItem)
    })
  })

  return arr
})
</script>

<template>
  <main class="m-auto mt-2 lg:w-10/12 sm:w-full sm:px-4">
    <div :style="backgroundStyles" />
    <div class="w-full px-3 lg:grid-cols-4 md:grid-cols-3" sm="grid-cols-2" grid="~ gap-4 cols-2">
      <div v-for="item, i in actShowList" :key="i">
        <div v-for="item2, idx2 in item" :key="idx2" class="mb-4">
          <NuxtLink :to="item2._path">
            <NuxtImg format="webp" hover="scale-102" class="rounded-md shadow-md transition-transform" :src="item2.imgUrl" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
