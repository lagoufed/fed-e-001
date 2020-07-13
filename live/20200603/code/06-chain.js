const fp = require('lodash/fp')

class MyWrapper {
  constructor (value) {
    this._wrapped = value
    this._actions = []
  }

  chain (value) {
    this._wrapped = value
    return this
  }

  filter (fn) {
    this._actions.push(fp.filter(fn))
    return this
  }

  map (fn) {
    this._actions.push(fp.map(fn))
    return this
  }

  sum () {
    this._actions.push(fp.sum)
    return this
  }

  value () {
    // fp.flowRight()
    // fp.compose()
    let fn = fp.compose(...this._actions.reverse())
    return fn(this._wrapped)
  }
}

let _ = {
  chain: function chain (value) {
    return new MyWrapper(value)
  }
}

let employees = [
  { name: 'Jack', age: 25, sex: 'male', salary: 20000 },
  { name: 'Tom', age: 30, sex: 'male', salary: 30000 },
  { name: 'Jim', age: 26, sex: 'male', salary: 25000 },
  { name: 'Carl', age: 25, sex: 'male', salary: 22000 },
  { name: 'Abel', age: 32, sex: 'male', salary: 32000 },
  { name: 'Gary', age: 31, sex: 'male', salary: 28000 },
  { name: 'Kevin', age: 23, sex: 'male', salary: 27000 }
]

let salary = _.chain(employees)
  .filter(e => e.age >= 30)
  .map(e => e.salary)
  .sum()
  .value()
console.log(salary)