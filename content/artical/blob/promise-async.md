---
desc: 
title: 通过Promise.all()同步获取循环模式下的promise数据集合
createTime: 2023-06-17 21:17:21
updateTime: 2023-06-29 22:12:33
---

## 通过Promise.all()同步获取循环模式下的promise数据集合

```typescript
import axios from 'axios'
let result: any[] = []
await Promise.all(
  [1, 2, 3].map(async () => {
    const res = await axios.post('/api/login', {
      username: 'admin',
      password: 'admin'
    })
    result.push(res)
  })
)
console.log(result)
```