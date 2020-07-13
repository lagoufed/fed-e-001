// 链式调用：隐式调用 和 显示调用
const _ = require('lodash')

let employees = [
  { name: 'Jack', age: 25, salary: 20000 },
  { name: 'Tom', age: 30, salary: 30000 },
  { name: 'Jim', age: 26, salary: 25000 },
  { name: 'Carl', age: 25, salary: 22000 },
  { name: 'Abel', age: 32, salary: 32000 },
  { name: 'Gary', age: 31, salary: 28000 },
  { name: 'Kevin', age: 23, salary: 27000 }
]

// 计算年龄 >= 30 的员工工资的和
const r = _.chain(employees)
  .filter(e => e.age >= 30)
  .map(e => e.salary)
  .sum()
  .value()

// console.log(r)

// 隐式调用
// 对于只返回单个值的方法，会结束链式调用，去求值
// 通过 .value 终止链式调用
const r = _(employees)
  .filter(e => e.age >= 30)
  .map(e => e.salary)
  .sum()

console.log(r)