// 高阶函数-函数作为返回值

// function makeFn () {
//   let msg = 'Hello function'
//   return function () {
//     console.log(msg)
//   }
// }

// // const fn = makeFn()
// // fn()

// makeFn()()



// once
function once (fn) {
  let done = false
  return function () {
    if (!done) {
      done = true
      return fn.apply(this, arguments)
    }
  }
}

let pay = once(function (money) {
  console.log(`支付: ${money} RMB`)
})

pay(5)
pay(5)
pay(5)
pay(5)

