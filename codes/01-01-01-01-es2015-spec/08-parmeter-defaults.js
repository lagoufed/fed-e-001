// 函数参数的默认值

// function foo (enable) {
//   // 短路运算很多情况下是不适合判断默认参数的，例如 0 '' false null
//   // enable = enable || true
//   enable = enable === undefined ? true : enable
//   console.log('foo invoked - enable: ')
//   console.log(enable)
// }

// 默认参数一定是在形参列表的最后
function foo (enable = true) {
  console.log('foo invoked - enable: ')
  console.log(enable)
}

foo(false)
