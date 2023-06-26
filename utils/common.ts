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
