const _ = require('lodash')

var users = [
  { 'user': 'barney',  'age': 36 },
  { 'user': 'fred',    'age': 40 },
  { 'user': 'pebbles', 'age': 1 }
];
 
// 1. chain
// var youngest = _
//   .chain(users)
//   .sortBy('age')
//   .map(function(o) {
//     return o.user + ' is ' + o.age;
//   })
//   .head()

// // ajax....
//   // youngest.value()


// console.log(youngest)

// 2. tap
// const r = _.chain([1, 2, 3])
//  .tap(function(array) {
//   // 改变传入的数组
//    array.pop();
//  })
//  .reverse()
//  .value()
// // => [2, 1]
// console.log(r)


// 3. thru
const r = _.chain('   abc  ')
 .trim()
 .thru(function(value) {
   return [value];
 })
 .value();
// => ['abc']

console.log(r)