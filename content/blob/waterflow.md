---
title: '瀑布流相关思考'
createTime: '2023-6-24'
---

### 瀑布流思路

1. 根据屏幕分辩率分为三种（可根据需求来变化）
	- lg-1024px 三栏分布
	- md-768px 两栏分布
	- sm-640px 单栏分布
2.  根据宽度来自动适配高度（纵横比来控制）
	如果说提前知道图片宽高的话，可以根据**纵横比**来进行页面的宽度控制，并且保证每一次的插入都是先找到最低的那个元素再进行插入图片。瀑布流的元素宽度一般都是固定的，只是高度不同，我们可以根据高度的不同，每次插入图片到最低的那一个地方。
		
		下方图片为部分判断页面添加位置的代码(底部会放完整的页面代码)
``` typescript
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
```


---

### 具体代码实现

1. 定义大体布局(响应式布局)
		页面结构代码
``` typescript
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
```

2. 根据传入的数据，再根据数据源里面的本地图片地址获得具体的宽高和纵横，使用@nuxt/image的useImage()函数的getMeta函数来获取图片信息。
``` typescript
const { getMeta } = useImage()

  

const res = await Promise.all(props.data.map(async (item) => {

  const { height, width } = await getMeta(item.imgUrl)

  const reverseRatio = (height / width) * 1000

  

  return { ...item, reverseRatio, height, width } as WaterflowItemWithHW

}))
```

3. 根据页面大小改变动态改变列数，通过监听页面窗口大小
``` typescript
const { width } = useWindowSize() // vueuse工具库

const activeCol = ref<number>(4)

judgeCols(width.value) // 页面初始化

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
```

4. 根据响应式页面改变，动态改变数据源
``` typescript
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
```

代码仓库：[https://github.com/zhang771/my-daily-life/blob/main/components/Waterfall.vue](https://github.com/zhang771/my-daily-life/blob/main/components/Waterfall.vue)
