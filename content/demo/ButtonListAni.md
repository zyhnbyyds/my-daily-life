---
desc: 关于按钮的实现，参考了😎TDesignVue的那个示例页面效果
createTime: 2023-07-02 11:40:45
updateTime: 2023-07-02 20:41:26
title: 带有动画效果的按钮集合
---

## 带有动画效果的按钮集合实现

### 序言

在看到TDesignVue的这个 [示例页面](https://tdesign.tencent.com/starter/vue-next/dashboard/base)的按钮动画效果的时候，被他的动效和思路吸引到了，我还😂特意下载了他们的演示界面，来找这个首页按钮集合的实现，但是并没有找到，索性自己封装了。自己的项目中也可以使用的到🎉。

### 1. 页面结构设计

结构如下:
![结构相关](/demo/shapes.png)

### 2. 具体实现

#### 注意事项

 根据字符数量来限制宽度。此处之前时使用padding撑开的，在点击的时候放大padding效果，但是会有问题，因为字体本身是有宽度的，如果说用padding的话，你的字越长，就会导致瞬间的那个形变越多，因为相当于直接是瞬间为元素添加了一个宽度，过渡效果是无法捕获的。

#### 模板页面

``` vue
<template>
  <div class="fixed bottom-10 left-1/2 rounded-30px bg-#999 bg-op-20 p-3 -translate-x-1/2">
    <div
      :style="{ width: `${btnListRef?.offsetWidth}px` || 'auto' }"
      class="overflow-hidden transition-height duration-300"
      :class="value === popupValue && isShowPopup ? 'h-70px' : 'h-0'"
    >
      <slot name="popup" />
    </div>
    <div ref="btnListRef" class="inline-flex gap-5">
	  // 渲染的按钮集合  
      <div
        v-for="item, i in props.list" :key="i"
        class="@hover:#333 flex-col-center transition-transform active:scale-105"
        @click="hadnleClickItem(item)"
        <div
          :style="{ width: item.value === value ? `${item.label.length * 16 + 100}px` : '40px' }"
          class="h-40px flex-center cursor-pointer border border-lightBlue-200 rounded-full py2 trans-all-300-ease"
		  // 图标使用       
          <Icon :name="item.icon" :size="typeof props.size === 'number' ? `${props.size}px` : props.size" />
          <div v-show="item.value === value" class="ml-2 truncate">
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
```

### 3. 逻辑实现

``` ts
interface Emits {
  (event: 'showAgain', tarBtn: string): void
}

const props = withDefaults(defineProps<Props>(), {
  size: '22px',
})

// 这是在重新点击按钮的执行操作，告诉上级页面触发更新操作
const emits = defineEmits<Emits>()
// 实验特性，尽量在自己的项目中使用，比较方便，简化了组件和页面直接的双向数据绑定
const value = defineModel<string>('value', { required: true })

const isShowPopup = ref(false)
const btnListRef = ref<HTMLElement | null>(null)
function hadnleClickItem(item: Components.BtnListItem) {
  // 处理第一个页面的向上弹出框
  if (item.value === props.popupValue)
    isShowPopup.value = !isShowPopup.value
  else
    isShowPopup.value = false
    
  // 当前已经是这个按钮，再次点击重新激活操作
  if (item.value === toValue(value))
    emits('showAgain', toValue(value) as string)
  value.value = item.value
}
```

预览页面：[artical](/artical)

