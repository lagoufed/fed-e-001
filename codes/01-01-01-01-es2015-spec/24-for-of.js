// for...of 循环

const arr = [100, 200, 300, 400]

// for (const item of arr) {
//   console.log(item)
// }

// for...of 循环可以替代 数组对象的 forEach 方法

// arr.forEach(item => {
//   console.log(item)
// })

// for (const item of arr) {
//   console.log(item)
//   if (item > 100) {
//     break
//   }
// }

// forEach 无法跳出循环，必须使用 some 或者 every 方法

// arr.forEach() // 不能跳出循环
// arr.some()
// arr.every()

// 遍历 Set 与遍历数组相同

// const s = new Set(['foo', 'bar'])

// for (const item of s) {
//   console.log(item)
// }

// 遍历 Map 可以配合数组结构语法，直接获取键值

// const m = new Map()
// m.set('foo', '123')
// m.set('bar', '345')

// for (const [key, value] of m) {
//   console.log(key, value)
// }

// 普通对象不能被直接 for...of 遍历

// const obj = { foo: 123, bar: 456 }

// for (const item of obj) {
//   console.log(item)
// }
