---
title: 'js根据对象某一属性排序的简单封装'
---

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

