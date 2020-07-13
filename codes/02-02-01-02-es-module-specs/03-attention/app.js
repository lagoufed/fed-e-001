// CommonJS 中是先将模块整体导入为一个对象，然后从对象中结构出需要的成员
// const { name, age } = require('./module.js')

// ES Module 中 { } 是固定语法，就是直接提取模块导出成员
import { name, age } from './module.js'

console.log(name, age)

// 导入成员并不是复制一个副本，
// 而是直接导入模块成员的引用地址，
// 也就是说 import 得到的变量与 export 导入的变量在内存中是同一块空间。
// 一旦模块中成员修改了，这里也会同时修改，
setTimeout(function () {
  console.log(name, age)
}, 1500)

// 导入模块成员变量是只读的
// name = 'tom' // 报错

// 但是需要注意如果导入的是一个对象，对象的属性读写不受影响
// name.xxx = 'xxx' // 正常
