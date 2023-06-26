---
title: '瀑布流相关思考'
createTime: '2023-6-24'
---

## 瀑布流思路

1. 根据屏幕分辩率分为三种（可根据需求来变化）
	- lg-1024px 三栏分布
	- md-768px 两栏分布
	- sm-640px 单栏分布
2. 根据宽度来自动适配高度（纵横比来控制）
	如果说提前知道图片宽高的话，可以根据纵横比来进行页面的宽度控制，并且保证每一次的插入都是先找到最低的那个元素再进行插入图片。
3. 获取的数据

```
<script lang='ts' setup>
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
  width: number
  height: number
}
const props = withDefaults(defineProps<Props>(), {
  emptyImgUrl: '/preview.jpg',
  pathRedirect: '/',
})

const { getMeta } = useImage()

const res = await Promise.all(props.data.map(async (item) => {
  const res = await getMeta(item.imgUrl)
  return { ...item, ...res } as WaterflowItemWithHW
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
  for (let index = 0; index < activeCol.value; index++)
    arr.push([])

  const num = Math.floor(dataLength / activeCol.value)
  for (let index = 0; index < num; index++) {
    const arr2 = lifeDataList.value.slice(index * activeCol.value, (index + 1) * activeCol.value)
    arr.map((item, index) => {
      item.push(arr2[index])
      return item
    })
  }
  if (dataLength % activeCol.value !== 0) {
    const num2 = dataLength % activeCol.value
    const toPushArr = lifeDataList.value.slice(num * activeCol.value, dataLength)
    for (let index = 0; index < num2; index++) {
      arr.map((item, idx) => {
        if (idx === index)
          item.push(toPushArr[index])
        return item
      })
    }
  }
  return arr
})
</script>

<template>
  <div class="w-full px-3 lg:grid-cols-4 md:grid-cols-3" sm="grid-cols-2" grid="~ gap-4 cols-2">
    <div v-for="item, i in actShowList" :key="i">
      <div v-for="item2, idx2 in item" :key="idx2" class="mb-4">
        <img
          hover="scale-102" class="grid-rows-2 rounded-md shadow-md transition-transform"
          :src="(item2 ?? {}).imgUrl || props.emptyImgUrl"
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
```
