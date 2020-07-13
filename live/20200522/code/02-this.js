// this 问题
// 'use strict'

// function foo () {
//   console.log(this)
// }

// // 1. 普通调用
// foo() // => 全局对象，严格模式 undefined
// // 2. new 调用
// new foo() // => foo {}
// // 3. call / apply / bind
// foo.call('123') // => '123'

// + this 的指向取决于调用，而不是定义
// p.s. 注意严格模式问题
// 总结：沿着作用域向上找最近的一个 function，看这个 function 最终是怎样执行的。

// -----------------------------------------------------------------------------

// const obj1 = {
//   foo: function () {
//     console.log(this)
//   }
// }

// obj1.foo()

// const fn = obj1.foo
// fn()


// -----------------------------------------------------------------------------

// const obj2 = {
//   foo: function () {
//     function bar () {
//       console.log(this)
//     }
//     bar()
//   }
// }

// obj2.foo()



// -----------------------------------------------------------------------------

// 总结：沿着作用域向上找最近的一个 function，看这个 function 最终是怎样执行的。
// const obj2 = {
//   foo: function () {
//     console.log(this)
//     const bar = () => {
//       console.log(this)
//     }
//     bar()
//   }
// }

// obj2.foo()


// const obj2 = {
//   foo () {
//     const bar = () => {
//       console.log(this)
//     }
//     bar()
//   }
// }

// obj2.foo()


// const bar = () => {
//   console.log(this)
// }

// console.log(this)