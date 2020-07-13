// ES2020

// + 空值合并运算符 ==============================================================

// function foo (options) {
//   // 只有 size = null 或者 undefined 
//   options.size = options.size ?? 100
//   console.log(options)
// }

// foo({ size: 0 })

// + 可选链运算符 ================================================================

// const list = [
//   {
//     title: 'foo',
//     author: {
//       name: 'zce',
//       email: 'w@zce.me'
//     }
//   },
//   {
//     title: 'bar'
//   }
// ]

// list.forEach(item => {
//   console.log(item.author?.name)
// })

// obj?.prop
// obj?.[expr]
// arr?.[index]
// func?.(args)