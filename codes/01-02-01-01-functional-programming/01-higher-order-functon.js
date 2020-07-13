// 高阶函数-函数作为参数

function forEach (array, fn) {
  for (let i = 0; i < array.length; i++) {
    fn(array[i])
  }
}

// 测试
// let arr = [1, 3, 4, 7, 8]

// forEach(arr, function (item) {
//   console.log(item)
// })


// filter
function filter (array, fn) {
  let results = []
  for (let i = 0; i < array.length; i++) {
    if (fn(array[i])) {
      results.push(array[i])
    }
  }
  return results
}

// 测试
let arr = [1, 3, 4, 7, 8]
let r = filter(arr, function (item) {
  return item % 2 === 0
})

console.log(r)