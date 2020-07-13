// JavaScript 弱类型产生的问题

// 1. 异常需要等到运行时才能发现

// const obj = {}

// // obj.foo()

// setTimeout(() => {
//   obj.foo()
// }, 1000000)

// =========================================

// 2. 函数功能可能发生改变

// function sum (a, b) {
//   return a + b
// }

// console.log(sum(100, 100))
// console.log(sum(100, '100'))

// =========================================

// 3. 对象索引器的错误用法

const obj = {}

obj[true] = 100 // 属性名会自动转换为字符串

console.log(obj['true'])
