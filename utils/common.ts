export function handlePathGetFirst(path: string) {
  const arrs = path.split('/')
  return arrs.length >= 2 ? `/${arrs[1]}` : ''
}

/**
 * 根据对象某一唯一属性返回对应index
 * @param array 目标的数组对象
 * @param key 属性key值
 * @param target
 * @returns 对应的index值
 */
export function handleGetIdxByObjAttr<T>(array: T[], key: keyof T, target: any) {
  return array.findIndex((item) => {
    return item[key] === target
  })
}

/**
 * 找出数组中最小或者最大的一个, 须保证数组的唯一性
 * @param array 寻找的数组
 * @param isBigFlg
 * @returns 返回的值
 */
export function arrFindNum(array: number[], isBigFlg = false) {
  // 数组去重
  const setArr = Array.from(new Set(array))
  const sortedArr = setArr.sort((a, b) => {
    return !isBigFlg ? b - a : a - b
  })

  return array.findIndex(item => item === sortedArr[sortedArr.length - 1])
}

/**
 * 样式类型收窄
 * @param judageAttribute 要收窄的属性
 * @returns 返回对应的数据
 */
export function styleTypeReduce(judageAttributeVal: string | number) {
  return typeof judageAttributeVal === 'number' ? `${judageAttributeVal}px` : judageAttributeVal
}

/**
 * 将对象格式的样式块填充到html元素中
 * @param targetObj 目标对象像是块
 * @param ele 目标填充元素
 */
export function handleObjStyleToElement<T extends object>(targetObj: T, ele: Ref<HTMLElement | null>) {
  if (!ele.value)
    return
  type Keys = keyof typeof targetObj
  Object.keys(targetObj).forEach((key: any) => {
    ele.value!.style[key] = targetObj[key as Keys]
  })
}

/**
 * 保证laoding加载时间不少于(duration)默认一秒，避免一闪而过
 * @author zhang_yu_jie
 * @param fn promise请求函数
 * @param status 要绑定的loading状态Ref<boolean>
 * @param extraFn 额外的执行操作
 * @param duration 持续时间
 */
export async function loadingKeep(fn: () => Promise<void>, status: Ref<boolean>, extraFn?: () => any, duration = 1000) {
  status.value = true

  const beforDate = Date.now()
  await fn()
  const afterDate = Date.now()

  const spend = afterDate - beforDate

  if (spend > duration) {
    if (extraFn)
      extraFn()

    status.value = false
  }
  else {
    setTimeout(() => {
      if (extraFn)
        extraFn()
      status.value = false
    }, duration - spend)
  }
}
