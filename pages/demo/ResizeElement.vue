<script lang='ts' setup>
const obj = ref<any>({
  tree: [
    {
      k: '颜色', // skuKeyName：规格类目名称
      k_s: 's1', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
      v: [
        {
          id: '1', // skuValueId：规格值 id
          name: '红色', // skuValueName：规格值名称
          imgUrl: 'https://img01.yzcdn.cn/1.jpg', // 规格类目图片，只有第一个规格类目可以定义图片
          previewImgUrl: 'https://img01.yzcdn.cn/1p.jpg', // 用于预览显示的规格类目图片
        },
        {
          id: '2',
          name: '蓝色',
          imgUrl: 'https://img01.yzcdn.cn/2.jpg',
          previewImgUrl: 'https://img01.yzcdn.cn/2p.jpg',
        },
      ],
      largeImageMode: true, //  是否展示大图模式
    },
    {
      k: '型号', // skuKeyName：规格类目名称
      k_s: 's2', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
      v: [
        {
          id: '1', // skuValueId：规格值 id
          name: 'v1', // skuValueName：规格值名称
          imgUrl: 'https://img01.yzcdn.cn/1.jpg', // 规格类目图片，只有第一个规格类目可以定义图片
          previewImgUrl: 'https://img01.yzcdn.cn/1p.jpg', // 用于预览显示的规格类目图片
        },
        {
          id: '2',
          name: 'v2',
          imgUrl: 'https://img01.yzcdn.cn/2.jpg',
          previewImgUrl: 'https://img01.yzcdn.cn/2p.jpg',
        },
      ],
      largeImageMode: true, //  是否展示大图模式
    },
    // {
    //   k: '大小', // skuKeyName：规格类目名称
    //   k_s: 's3', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
    //   v: [
    //     {
    //       id: '1', // skuValueId：规格值 id
    //       name: 's1', // skuValueName：规格值名称
    //       imgUrl: 'https://img01.yzcdn.cn/1.jpg', // 规格类目图片，只有第一个规格类目可以定义图片
    //       previewImgUrl: 'https://img01.yzcdn.cn/1p.jpg', // 用于预览显示的规格类目图片
    //     },
    //     {
    //       id: '2',
    //       name: 's2',
    //       imgUrl: 'https://img01.yzcdn.cn/2.jpg',
    //       previewImgUrl: 'https://img01.yzcdn.cn/2p.jpg',
    //     },
    //   ],
    //   largeImageMode: true, //  是否展示大图模式
    // },
  ],
  // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
  list: [
    {
      id: 2259, // skuId
      s1: '1', // 规格类目 k_s 为 s1 的对应规格值 id
      s2: '1', // 规格类目 k_s 为 s2 的对应规格值 id
      price: 100, // 价格（单位分）
      stock_num: 110, // 当前 sku 组合对应的库存
    },
    {
      id: 2259, // skuId
      s1: '1', // 规格类目 k_s 为 s1 的对应规格值 id
      s2: '2', // 规格类目 k_s 为 s2 的对应规格值 id
      price: 100, // 价格（单位分）
      stock_num: 110, // 当前 sku 组合对应的库存
    },
    {
      id: 2259, // skuId
      s1: '2', // 规格类目 k_s 为 s1 的对应规格值 id
      s2: '1', // 规格类目 k_s 为 s2 的对应规格值 id
      price: 100, // 价格（单位分）
      stock_num: 0, // 当前 sku 组合对应的库存
    },
    {
      id: 2259, // skuId
      s1: '2', // 规格类目 k_s 为 s1 的对应规格值 id
      s2: '2', // 规格类目 k_s 为 s2 的对应规格值 id
      price: 100, // 价格（单位分）
      stock_num: 110, // 当前 sku 组合对应的库存
    },
  ],
})

obj.value.tree.map((item: any) => {
  return item.v.map((item2: any) => {
    item2.disabled = false
    item2.checked = false
    return item2
  })
})

const data = {
  app_id: 8, // 应用id
  app_name: '测试应用', // 应用名称
  img: '', // 应用主图
  sku: {
    tree: [{
      k: '版本', // 属性名称
      k_s: 's1',
      v: [{
        id: 12,
        name: '基础版',
      },
      {
        id: 13,
        name: '入门版',
      },
      {
        id: 14,
        name: '高级版',
      },
      ],
    },
    {
      k: '时间', // 属性名称
      k_s: 's2',
      v: [{
        id: 37,
        name: '一年',
      },
      ],
    },
    ],
    list: [{
      id: 35,
      name: '基础版,一年',
      price: '1.00', // 售价
      original_price: '2.00', // 原价
      default: 1, // 默认1=是  0=否
      s1: '12',
      s2: '37',
    },
    {
      id: 36,
      name: '入门版,一年',
      price: '2.00', // 售价
      original_price: '4.00', // 原价
      default: 0, // 默认1=是  0=否
      s1: '13',
      s2: '37',
    },
    {
      id: 37,
      name: '高级版,一年',
      price: '6.00', // 售价
      original_price: '10.00', // 原价
      default: 0, // 默认1=是  0=否
      s1: '14',
      s2: '37',
    },
    ],
  }, // 属性规格
}

const activeObj = ref<any>({})

obj.value.tree.forEach((item1: any) => {
  activeObj.value[item1.k_s] = ''
})

const activeThing = ref<any>()

watch(() => activeObj.value, (val) => {
  const item2 = obj.value.list.find((item: any) => {
    const flag = Reflect.ownKeys(activeObj.value).every((key2) => {
      return item[key2] === val[key2]
    })
    return flag
  })
  activeThing.value = item2
}, { deep: true })

function cleanChecked(val1: number) {
  obj.value.tree[val1].v.map((item: any) => {
    item.checked = false
    return item
  })
}

function changeVal(val1: number, val2: number) {
  cleanChecked(val1)

  const target1 = obj.value.tree[val1]
  const target2 = obj.value.tree[val1].v[val2]
  target2.checked = !target2.checked

  activeObj.value[target1.k_s] = target2.id
}

function handleDisabled() {
  // Reflect.ownKeys(obj2.value).forEach((key) => {
  //   Reflect.ownKeys(obj2.value).forEach((key2) => {
  //     console.log(key, key2)
  //   })
  // })
  // const length = Reflect.ownKeys(obj2.value).length

  // for (let index = 0; index < length; index++) {
  //   Reflect.ownKeys(obj2.value).forEach((key) => {
  //     console.log(key)
  //   })
  // }
}

handleDisabled()
</script>

<template>
  <div>
    <div v-for="item, i in obj.tree" :key="i">
      {{ item.k }}
      <div class="flex">
        <div v-for="item2, i2 in item.v" :key="i2" class="mr-2 p-3" :class="{ 'bg-red!': item2.checked }" @click="changeVal(i, i2)">
          {{ item2.name }}
        </div>
      </div>
    </div>
    <div>
      {{ activeThing ?? '无数据' }}
    </div>
  </div>
</template>

<style scoped></style>
