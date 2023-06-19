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
