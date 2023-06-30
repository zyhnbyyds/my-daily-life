---
desc: 
title: 根据对象的某一属性值来进行数组的排序
createTime: 2023-06-17 21:17:21
updateTime: 2023-06-29 22:10:02
---

## 根据对象的某一属性值来进行数组的排序

使用typescript, 接收一个泛型参数T, 暂时只支持数字属性的排序。

话不多说上代码：

```typescript
/**
 * 简单的排序函数的实现
 * @param arr 要排序的数组
 * @param target 所排序的参数
 * @returns 排序后的数组
 */
export function sortByNumber<T>(arr: T[], target: keyof T) {
  return arr.sort((a: T, b: T) => {
    return Number(a[target]) - Number(b[target]);
  });
}

```