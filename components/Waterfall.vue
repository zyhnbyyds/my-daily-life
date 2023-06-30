<script lang='ts' setup>
import { arrFindNum } from '~/utils/common'

export interface Props {
  emptyImgUrl?: string
  data: WaterflowItem[]
  /** 没有_path地址的时候的重定向位置 */
  pathRedirect?: string
}

export interface WaterflowItem {
  title: string
  imgUrl: string
  _path: string
  createTime?: string
}

interface WaterflowItemWithHW extends WaterflowItem {
  reverseRatio: number
}
const props = withDefaults(defineProps<Props>(), {
  emptyImgUrl: '/preview.jpg',
  pathRedirect: '/',
})

const { getMeta } = useImage()

const res = await Promise.all(props.data.map(async (item) => {
  const { height, width } = await getMeta(item.imgUrl)
  const reverseRatio = (height / width) * 1000

  return { ...item, reverseRatio } as WaterflowItemWithHW
}))

const lifeDataList = ref(res)

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

const actShowList = computed(() => {
  if (!lifeDataList.value || lifeDataList.value.length === 0)
    return [[]]
  const dataLength = lifeDataList.value.length

  const arr: WaterflowItem[][] = []
  const remHeight: number[] = []
  for (let index = 0; index < activeCol.value; index++) {
    remHeight.push(0)
    arr.push([])
  }

  if (dataLength < activeCol.value) {
    for (let index = 0; index < dataLength; index++)
      arr[index].push(lifeDataList.value[index])
  }
  else {
    lifeDataList.value.forEach((item, index) => {
      if (index <= activeCol.value - 1) {
        arr[index].push(item)
        remHeight[index] += item.reverseRatio
      }
      else {
        const idx = arrFindNum(remHeight)
        if (arr[idx]) {
          arr[idx].push(item)
          remHeight[idx] += item.reverseRatio
        }
      }
    })
  }
  return arr
})
</script>

<template>
  <div class="w-full px-3 lg:grid-cols-4 md:grid-cols-3" sm="grid-cols-2" grid="~ gap-4 cols-2">
    <div v-for="item, i in actShowList" :key="i">
      <div v-for="item2, idx2 in item" :key="idx2" class="mb-4">
        <NuxtImg
          quality="80"
          format="webp"
          hover="scale-102" class="grid-rows-2 rounded-md shadow-md transition-transform"
          :src="(item2 ?? {}).imgUrl || props.emptyImgUrl"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
