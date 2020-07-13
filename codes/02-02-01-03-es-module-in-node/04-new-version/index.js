// Node v12 之后的版本，可以通过 package.json 中添加 type 字段为 module，
// 将默认模块系统修改为 ES Module
// 此时就不需要修改文件扩展名为 .mjs 了

import { foo, bar } from './module.js'

console.log(foo, bar)
