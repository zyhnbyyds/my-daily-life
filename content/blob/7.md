---
title: 'table表单的数据导出(execl)'
---

### 1. 下载xlsx包文件

```
pnpm add xlsx -D
```

### 2. 引入工具函数 utils和writeFileXLSX

```typescript
import { utils, writeFileXLSX } from 'xlsx';
```

### 3. 处理表单数据

​		将表单数据简单的处理一下，下面有一个简单的例子：

​		目标数据：

​		![](C:\Users\19939\Pictures\Saved Pictures\微信截图_20221227120023.png)

```
// 需要传入的数据格式
[
	{
		id: **,
		温度: **,
		湿度: **,
		时间: **
	},
	...
]
```

可以将以下代码绑定到一个按钮上，作为函数使用，可以直接导出文件。

```typescript
// 将表单数据转为sheet数据
const ws = utils.json_to_sheet(table);
// 商城一个workBook
const wb = utils.book_new();
// 将sheet数据加到workBook中
utils.book_append_sheet(wb, ws, 'Data');
// 写入数据到xlsx并且导出文件
writeFileXLSX(wb, `${exportDevice.value}.xlsx`)
```

演示gif![](D:\download\edge\2022-12-27 13-53-55.gif)

