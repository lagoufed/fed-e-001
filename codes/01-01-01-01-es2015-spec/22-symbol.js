// Symbol 数据类型

// 场景1：扩展对象，属性名冲突问题

// // shared.js ====================================

// const cache = {}

// // a.js =========================================

// cache['a_foo'] = Math.random()

// // b.js =========================================

// cache['b_foo'] = '123'

// console.log(cache)

// =========================================================

// const s = Symbol()
// console.log(s)
// console.log(typeof s)

// 两个 Symbol 永远不会相等

// console.log(
//   Symbol() === Symbol()
// )

// Symbol 描述文本

// console.log(Symbol('foo'))
// console.log(Symbol('bar'))
// console.log(Symbol('baz'))

// 使用 Symbol 为对象添加用不重复的键

// const obj = {}
// obj[Symbol()] = '123'
// obj[Symbol()] = '456'
// console.log(obj)

// 也可以在计算属性名中使用

// const obj = {
//   [Symbol()]: 123
// }
// console.log(obj)

// =========================================================

// 案例2：Symbol 模拟实现私有成员

// a.js ======================================

const name = Symbol()
const person = {
  [name]: 'zce',
  say () {
    console.log(this[name])
  }
}
// 只对外暴露 person

// b.js =======================================

// 由于无法创建出一样的 Symbol 值，
// 所以无法直接访问到 person 中的「私有」成员
// person[Symbol()]
person.say()
