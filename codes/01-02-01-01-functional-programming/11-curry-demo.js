// 柯里化案例
// ''.match(/\s+/g)
// ''.match(/\d+/g)

const _ = require('lodash')

const match = _.curry(function (reg, str) {
  return str.match(reg)
})

const haveSpace = match(/\s+/g)
const haveNumber = match(/\d+/g)

const filter = _.curry(function (func, array) {
  return array.filter(func)
})

const findSpace = filter(haveSpace)

// console.log(haveSpace('helloworld'))
// console.log(haveNumber('abc'))



console.log(filter(haveSpace, ['John Connor', 'John_Donne']))


console.log(findSpace(['John Connor', 'John_Donne']))