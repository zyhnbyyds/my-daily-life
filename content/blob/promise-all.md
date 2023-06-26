---
title: '通过promise.all中使用map实现同步循环执行多个请求(promise)'
---

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



